/**
 * Tekivex AI Support Chat Widget
 *
 * A floating, zero-API chat assistant that answers questions about
 * all Tekivex products using the local knowledge base + TF-IDF engine.
 *
 * Features:
 *  - Floating button fixed to bottom-right corner
 *  - Full chat bubble UI with markdown rendering
 *  - Typing indicator animation
 *  - Suggested/related questions
 *  - Category badge on answers
 *  - Dark/light theme aware
 *  - Fully keyboard accessible
 */

import React from 'react';
import { ask, type AssistantResponse } from './ai-assistant';
import { STARTER_QUESTIONS, CATEGORY_META } from './knowledge-base';

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  response?: AssistantResponse;
  timestamp: Date;
}

// ─────────────────────────────────────────────
// SIMPLE MARKDOWN RENDERER
// Supports: **bold**, `code`, [link](url), bullet lists, numbered lists, headings, tables
// ─────────────────────────────────────────────

function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let keyCounter = 0;
  const key = () => String(keyCounter++);

  function inlineRender(line: string): React.ReactNode[] {
    // Pattern: **bold**, `code`, [text](url)
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let localKey = 0;
    while (remaining.length > 0) {
      // Bold
      const boldMatch = remaining.match(/\*\*(.+?)\*\*/);
      // Inline code
      const codeMatch = remaining.match(/`([^`]+?)`/);
      // Link
      const linkMatch = remaining.match(/\[([^\]]+)\]\(([^)]+)\)/);

      // Find the earliest match
      const matches = [
        boldMatch ? { idx: boldMatch.index!, type: 'bold', match: boldMatch } : null,
        codeMatch ? { idx: codeMatch.index!, type: 'code', match: codeMatch } : null,
        linkMatch ? { idx: linkMatch.index!, type: 'link', match: linkMatch } : null,
      ].filter(Boolean) as Array<{ idx: number; type: string; match: RegExpMatchArray }>;

      if (matches.length === 0) {
        if (remaining) parts.push(<React.Fragment key={localKey++}>{remaining}</React.Fragment>);
        break;
      }

      matches.sort((a, b) => a.idx - b.idx);
      const first = matches[0]!;

      // Text before match
      if (first.idx > 0) {
        parts.push(<React.Fragment key={localKey++}>{remaining.slice(0, first.idx)}</React.Fragment>);
      }

      if (first.type === 'bold') {
        parts.push(<strong key={localKey++}>{first.match[1]}</strong>);
        remaining = remaining.slice(first.idx + first.match[0].length);
      } else if (first.type === 'code') {
        parts.push(<code key={localKey++} className="ai-inline-code">{first.match[1]}</code>);
        remaining = remaining.slice(first.idx + first.match[0].length);
      } else if (first.type === 'link') {
        parts.push(
          <a key={localKey++} href={first.match[2]} target="_blank" rel="noopener noreferrer" className="ai-link">
            {first.match[1]}
          </a>
        );
        remaining = remaining.slice(first.idx + first.match[0].length);
      }
    }
    return parts;
  }

  while (i < lines.length) {
    const line = lines[i]!;

    // Fenced code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i]!.startsWith('```')) {
        codeLines.push(lines[i]!);
        i++;
      }
      elements.push(
        <div key={key()} className="ai-code-block">
          {lang && <div className="ai-code-lang">{lang}</div>}
          <pre><code>{codeLines.join('\n')}</code></pre>
        </div>
      );
      i++;
      continue;
    }

    // Headings
    if (line.startsWith('### ')) {
      elements.push(<h4 key={key()} className="ai-h4">{inlineRender(line.slice(4))}</h4>);
      i++; continue;
    }
    if (line.startsWith('## ')) {
      elements.push(<h3 key={key()} className="ai-h3">{inlineRender(line.slice(3))}</h3>);
      i++; continue;
    }
    if (line.startsWith('# ')) {
      elements.push(<h2 key={key()} className="ai-h2">{inlineRender(line.slice(2))}</h2>);
      i++; continue;
    }

    // Horizontal rule
    if (/^[-*_]{3,}$/.test(line.trim())) {
      elements.push(<hr key={key()} className="ai-hr" />);
      i++; continue;
    }

    // Table
    if (line.includes('|') && lines[i + 1]?.includes('---')) {
      const headers = line.split('|').map(s => s.trim()).filter(Boolean);
      i += 2; // skip header + separator
      const rows: string[][] = [];
      while (i < lines.length && lines[i]!.includes('|')) {
        rows.push(lines[i]!.split('|').map(s => s.trim()).filter(Boolean));
        i++;
      }
      elements.push(
        <div key={key()} className="ai-table-wrapper">
          <table className="ai-table">
            <thead>
              <tr>{headers.map((h, hi) => <th key={hi}>{inlineRender(h)}</th>)}</tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri}>{row.map((cell, ci) => <td key={ci}>{inlineRender(cell)}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Unordered list
    if (/^[-*•] /.test(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^[-*•] /.test(lines[i]!)) {
        items.push(<li key={i}>{inlineRender(lines[i]!.replace(/^[-*•] /, ''))}</li>);
        i++;
      }
      elements.push(<ul key={key()} className="ai-ul">{items}</ul>);
      continue;
    }

    // Ordered list
    if (/^\d+\. /.test(line)) {
      const items: React.ReactNode[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i]!)) {
        items.push(<li key={i}>{inlineRender(lines[i]!.replace(/^\d+\. /, ''))}</li>);
        i++;
      }
      elements.push(<ol key={key()} className="ai-ol">{items}</ol>);
      continue;
    }

    // Blank line = paragraph break
    if (!line.trim()) {
      i++; continue;
    }

    // Regular paragraph
    elements.push(<p key={key()} className="ai-p">{inlineRender(line)}</p>);
    i++;
  }

  return <>{elements}</>;
}

// ─────────────────────────────────────────────
// CHAT MESSAGE BUBBLE
// ─────────────────────────────────────────────

function MessageBubble({ message, onRelatedClick }: {
  message: ChatMessage;
  onRelatedClick: (q: string) => void;
}) {
  const isUser = message.role === 'user';
  const cat = message.response ? CATEGORY_META[message.response.category] : null;

  return (
    <div className={`ai-msg ai-msg--${isUser ? 'user' : 'assistant'}`}>
      {!isUser && (
        <div className="ai-msg-avatar" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 11a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1zm6 0a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1z"/>
          </svg>
        </div>
      )}

      <div className="ai-msg-body">
        {/* Category badge */}
        {cat && !isUser && (
          <div className="ai-msg-category" style={{ color: cat.color }}>
            <span>{cat.emoji}</span>
            <span>{cat.label}</span>
            {message.response?.confidence === 'high' && (
              <span className="ai-confidence-dot" title="High confidence" />
            )}
          </div>
        )}

        {/* Content */}
        <div className="ai-msg-content">
          {isUser
            ? <p className="ai-p">{message.content}</p>
            : renderMarkdown(message.content)
          }
        </div>

        {/* Related questions */}
        {!isUser && message.response && message.response.relatedQuestions.length > 0 && (
          <div className="ai-related">
            <div className="ai-related-label">Related questions</div>
            <div className="ai-related-list">
              {message.response.relatedQuestions.map((q) => (
                <button
                  key={q}
                  className="ai-related-btn"
                  onClick={() => onRelatedClick(q)}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// TYPING INDICATOR
// ─────────────────────────────────────────────

function TypingIndicator() {
  return (
    <div className="ai-msg ai-msg--assistant">
      <div className="ai-msg-avatar" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 11a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1zm6 0a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1z"/>
        </svg>
      </div>
      <div className="ai-msg-body">
        <div className="ai-typing">
          <span className="ai-typing-dot" />
          <span className="ai-typing-dot" />
          <span className="ai-typing-dot" />
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN CHAT WIDGET
// ─────────────────────────────────────────────

export function AiChatWidget() {
  const [open, setOpen] = React.useState(false);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [input, setInput] = React.useState('');
  const [typing, setTyping] = React.useState(false);
  const [pulse, setPulse] = React.useState(true);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLTextAreaElement>(null);
  const chatId = React.useId();

  // Initial greeting
  React.useEffect(() => {
    if (open && messages.length === 0) {
      const greeting: ChatMessage = {
        id: 'greeting',
        role: 'assistant',
        content: `Hi! 👋 I'm the **Tekivex AI Assistant** — here to help you with any questions about our products.

I know everything about **GridStorm**, **PDF Toolkit**, **NexaRecruit**, **NexaCare**, and more. What would you like to know?`,
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }
  }, [open, messages.length]);

  // Stop pulsing after first open
  React.useEffect(() => {
    if (open) setPulse(false);
  }, [open]);

  // Auto-scroll to bottom
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Focus input when opened
  React.useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  const sendMessage = React.useCallback((text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    // Simulate thinking delay (50–250ms)
    const delay = 60 + Math.random() * 180;
    setTimeout(() => {
      const response = ask(trimmed);
      const assistantMsg: ChatMessage = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: response.answer,
        response,
        timestamp: new Date(),
      };
      setTyping(false);
      setMessages((prev) => [...prev, assistantMsg]);
    }, delay);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleClear = () => {
    setMessages([]);
    // Re-show greeting
    setTimeout(() => {
      const greeting: ChatMessage = {
        id: 'greeting-' + Date.now(),
        role: 'assistant',
        content: `Hi! 👋 I'm the **Tekivex AI Assistant**. How can I help you today?`,
        timestamp: new Date(),
      };
      setMessages([greeting]);
    }, 50);
  };

  const showStarters = messages.length <= 1;

  return (
    <>
      {/* Floating button */}
      <button
        className={`ai-fab ${pulse ? 'ai-fab--pulse' : ''} ${open ? 'ai-fab--open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? 'Close AI Support' : 'Open AI Support'}
        aria-expanded={open}
        aria-controls={chatId}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 11a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1zm6 0a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1z"/>
          </svg>
        )}
        {!open && <span className="ai-fab-label">AI Support</span>}
      </button>

      {/* Chat panel */}
      <div
        id={chatId}
        className={`ai-chat-panel ${open ? 'ai-chat-panel--open' : ''}`}
        role="dialog"
        aria-label="Tekivex AI Support"
        aria-modal="true"
      >
        {/* Header */}
        <div className="ai-chat-header">
          <div className="ai-chat-header-info">
            <div className="ai-chat-avatar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2zM9 11a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1zm6 0a1 1 0 0 0-1 1v1a1 1 0 0 0 2 0v-1a1 1 0 0 0-1-1z"/>
              </svg>
            </div>
            <div>
              <div className="ai-chat-title">Tekivex AI Support</div>
              <div className="ai-chat-subtitle">
                <span className="ai-status-dot" />
                Always available · Free · No API key
              </div>
            </div>
          </div>
          <div className="ai-chat-header-actions">
            <button
              className="ai-icon-btn"
              onClick={handleClear}
              title="Clear conversation"
              aria-label="Clear conversation"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" />
              </svg>
            </button>
            <button
              className="ai-icon-btn"
              onClick={() => setOpen(false)}
              title="Close"
              aria-label="Close chat"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="ai-chat-messages" aria-live="polite" aria-atomic="false">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              onRelatedClick={sendMessage}
            />
          ))}
          {typing && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Starter questions */}
        {showStarters && (
          <div className="ai-starters">
            {STARTER_QUESTIONS.slice(0, 4).map((q) => (
              <button
                key={q}
                className="ai-starter-btn"
                onClick={() => sendMessage(q)}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form className="ai-chat-input-row" onSubmit={handleSubmit}>
          <textarea
            ref={inputRef}
            className="ai-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about Tekivex products…"
            rows={1}
            aria-label="Type your question"
          />
          <button
            type="submit"
            className="ai-send-btn"
            disabled={!input.trim() || typing}
            aria-label="Send message"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>

        <div className="ai-chat-footer">
          Powered by Tekivex · No data sent to any server
        </div>
      </div>
    </>
  );
}
