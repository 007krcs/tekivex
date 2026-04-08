import React, { useCallback } from 'react';

// ─── Lightweight Syntax Tokenizer ───
// Uses existing .hljs-* CSS classes from styles.css (Catppuccin theme)

interface Token { text: string; className?: string }

const JS_KEYWORDS = new Set([
  'const','let','var','function','return','if','else','for','while','do','switch','case','break',
  'continue','new','this','class','extends','import','export','from','default','async','await',
  'try','catch','finally','throw','typeof','instanceof','in','of','yield','void','delete',
  'interface','type','enum','implements','abstract','public','private','protected','readonly',
  'static','super','constructor','get','set','null','undefined','true','false','as','is',
]);

const PY_KEYWORDS = new Set([
  'def','class','return','if','elif','else','for','while','import','from','as','try','except',
  'finally','raise','with','yield','lambda','pass','break','continue','and','or','not','in',
  'is','None','True','False','self','async','await','print','range','len','list','dict','tuple',
]);

function tokenize(code: string, language: string): Token[] {
  const tokens: Token[] = [];
  const kw = language === 'python' || language === 'py' ? PY_KEYWORDS : JS_KEYWORDS;
  let i = 0;
  const src = code;

  while (i < src.length) {
    // Comments
    if (src[i] === '/' && src[i + 1] === '/') {
      const end = src.indexOf('\n', i);
      const text = end === -1 ? src.slice(i) : src.slice(i, end);
      tokens.push({ text, className: 'hljs-comment' });
      i += text.length;
      continue;
    }
    if (src[i] === '#' && (language === 'python' || language === 'py' || language === 'bash' || language === 'shell')) {
      const end = src.indexOf('\n', i);
      const text = end === -1 ? src.slice(i) : src.slice(i, end);
      tokens.push({ text, className: 'hljs-comment' });
      i += text.length;
      continue;
    }
    if (src[i] === '/' && src[i + 1] === '*') {
      const end = src.indexOf('*/', i + 2);
      const text = end === -1 ? src.slice(i) : src.slice(i, end + 2);
      tokens.push({ text, className: 'hljs-comment' });
      i += text.length;
      continue;
    }

    // Strings
    if (src[i] === '"' || src[i] === "'" || src[i] === '`') {
      const q = src[i];
      let j = i + 1;
      while (j < src.length && src[j] !== q) {
        if (src[j] === '\\') j++;
        j++;
      }
      const text = src.slice(i, j + 1);
      tokens.push({ text, className: 'hljs-string' });
      i = j + 1;
      continue;
    }

    // Numbers
    if (/\d/.test(src[i]) && (i === 0 || /[\s(,=+\-*/<>[\]{};:!]/.test(src[i - 1]))) {
      let j = i;
      while (j < src.length && /[\d.xXa-fA-F_eEn]/.test(src[j])) j++;
      tokens.push({ text: src.slice(i, j), className: 'hljs-number' });
      i = j;
      continue;
    }

    // Words (keywords, types, identifiers)
    if (/[a-zA-Z_$@]/.test(src[i])) {
      let j = i;
      while (j < src.length && /[a-zA-Z0-9_$]/.test(src[j])) j++;
      const word = src.slice(i, j);
      if (kw.has(word)) {
        tokens.push({ text: word, className: 'hljs-keyword' });
      } else if (/^[A-Z][a-zA-Z0-9]*$/.test(word) && word.length > 1) {
        tokens.push({ text: word, className: 'hljs-type' });
      } else if (j < src.length && src[j] === '(') {
        tokens.push({ text: word, className: 'hljs-title function_' });
      } else {
        tokens.push({ text: word });
      }
      i = j;
      continue;
    }

    // JSX/HTML tags
    if (src[i] === '<' && /[a-zA-Z/]/.test(src[i + 1] || '')) {
      const end = src.indexOf('>', i);
      if (end !== -1) {
        tokens.push({ text: src.slice(i, end + 1), className: 'hljs-tag' });
        i = end + 1;
        continue;
      }
    }

    // Default character
    tokens.push({ text: src[i] });
    i++;
  }

  return tokens;
}

interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

export function CodeBlock({ code, language, title }: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, [code]);

  const tokens = tokenize(code.trim(), language);

  return (
    <div className="code-block-wrapper">
      <div className="code-block-header">
        <span className="code-block-lang">{title || language}</span>
        <button className="code-block-copy" onClick={handleCopy} aria-label="Copy code">
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre>
        <code className="hljs">
          {tokens.map((t, i) =>
            t.className
              ? <span key={i} className={t.className}>{t.text}</span>
              : t.text
          )}
        </code>
      </pre>
    </div>
  );
}
