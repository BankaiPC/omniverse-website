import type { FC, ReactNode } from 'react';

// Mini-highlighter sin dependencias: tokeniza por línea y colorea por
// categoría (string, comentario de tipo entre paréntesis, booleano,
// número). Suficiente para legibilidad de Arguments/Result/Examples
// sin añadir una librería al bundle.

const SECTION_KEYWORDS = new Set([
  'Arguments:',
  'Result:',
  'bResult:',
  'Examples:',
  'Note:',
]);

const TOKEN_RE = /("(?:[^"\\]|\\.)*")|(\([^)]*\))|(\btrue\b|\bfalse\b)|(\b\d+\.\d+\b|\b\d+\b)/g;

function highlightInline(line: string, keyPrefix: string) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  TOKEN_RE.lastIndex = 0;

  while ((match = TOKEN_RE.exec(line)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(line.slice(lastIndex, match.index));
    }
    const [full, str, paren, bool, num] = match;
    if (str) {
      nodes.push(
        <span key={`${keyPrefix}-${i}`} style={{ color: '#7CFFB2' }}>
          {str}
        </span>
      );
    } else if (paren) {
      nodes.push(
        <span key={`${keyPrefix}-${i}`} style={{ color: '#71717A', fontStyle: 'italic' }}>
          {paren}
        </span>
      );
    } else if (bool) {
      nodes.push(
        <span key={`${keyPrefix}-${i}`} style={{ color: '#39FF8E' }}>
          {bool}
        </span>
      );
    } else if (num) {
      nodes.push(
        <span key={`${keyPrefix}-${i}`} style={{ color: '#9CC9FF' }}>
          {num}
        </span>
      );
    } else {
      nodes.push(full);
    }
    lastIndex = match.index + full.length;
    i++;
  }
  if (lastIndex < line.length) {
    nodes.push(line.slice(lastIndex));
  }
  return nodes;
}

const CodeBlock: FC<{ text: string; className?: string }> = ({ text, className = '' }) => {
  const lines = text.split('\n');

  return (
    <pre
      className={`bg-[#06120D] border border-[#1C3A2E] p-3 overflow-x-auto whitespace-pre-wrap text-[#A7C4B5] ${className}`}
    >
      {lines.map((line, idx) => {
        const trimmed = line.trim();

        if (SECTION_KEYWORDS.has(trimmed)) {
          return (
            <div key={idx} style={{ color: '#39FF8E', fontWeight: 700 }}>
              {line}
            </div>
          );
        }

        if (trimmed.startsWith('>')) {
          const promptIdx = line.indexOf('>');
          const before = line.slice(0, promptIdx);
          const after = line.slice(promptIdx + 1);
          return (
            <div key={idx}>
              {before}
              <span style={{ color: '#6D9EFF' }}>{'>'}</span>
              {highlightInline(after, `l${idx}`)}
            </div>
          );
        }

        return <div key={idx}>{highlightInline(line, `l${idx}`)}</div>;
      })}
    </pre>
  );
};

export default CodeBlock;
