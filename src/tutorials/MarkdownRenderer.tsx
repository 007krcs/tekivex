import React, { useMemo } from 'react';
import { marked } from 'marked';

// Configure marked once
marked.setOptions({
  breaks: true,
  gfm: true,
});

interface MarkdownRendererProps {
  markdown: string;
}

export function MarkdownRenderer({ markdown }: MarkdownRendererProps) {
  const html = useMemo(() => {
    return marked.parse(markdown) as string;
  }, [markdown]);

  return (
    <div
      className="markdown-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
