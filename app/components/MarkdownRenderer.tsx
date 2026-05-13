import React, { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
  referencesContent?: string;
}

// Function to process text and convert footnotes (e.g., 37, 2, etc.) into tooltip components
const processReferences = (text: string, refs: Record<string, string>) => {
  if (typeof text !== "string") return text;

  // Improved Regex (Cross-browser compatible, avoiding lookbehinds which break older Safari):
  // 1. ([^\s:\-\d]) captures the preceding character. We ensure it's not a space, colon, hyphen, or digit.
  //    This avoids catching the number in "4:23", "24-25", "Verse 3", "300"
  // 2. (\d{1,2}) captures 1-2 digits (the actual reference number).
  // 3. Lookahead (?=[.,:;\])\s]|$) ensures it's followed by punctuation, bracket, space, or end of string.
  const refRegex = /([^\s:\-\d])(\d{1,2})(?=[.,:;\])\s]|$)/gu;
  
  const parts = [];
  let lastIndex = 0;
  let match;

  while ((match = refRegex.exec(text)) !== null) {
    const precedingChar = match[1];
    const refNum = match[2];
    
    // Push preceding text (everything up to the match index, PLUS the preceding character)
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index) + precedingChar);
    } else {
      // Edge case: match is at the very beginning of the string
      parts.push(precedingChar);
    }

    // Push the reference as a specialized component if it exists in our references map
    if (refs[refNum]) {
      parts.push(
        <span key={`${refNum}-${match.index}`} className="group relative inline-block">
          <sup className="text-[var(--color-penance-purple)] font-bold text-[0.75em] cursor-help px-0.5 hover:text-[var(--color-pentecost-red)] transition-colors">
            {refNum}
          </sup>
          <span className="invisible group-hover:visible absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-[var(--color-ivory-dark)] border border-[var(--color-gold)] rounded shadow-xl text-xs text-[var(--color-text-secondary)] leading-relaxed z-[100] transition-opacity opacity-0 group-hover:opacity-100 backdrop-blur-sm">
            <span className="block font-bold text-[var(--color-burgundy)] mb-1 border-b border-[var(--color-gold)] border-opacity-20 pb-1">
              Chú thích {refNum}
            </span>
            {refs[refNum]}
            <span className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-[var(--color-gold)] opacity-20" />
          </span>
        </span>
      );
    } else {
      // If no ref found, keep it as text
      parts.push(refNum);
    }
    
    lastIndex = refRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

// Recursive helper to handle nested React elements (like strong, em inside paragraphs)
const renderTextWithRefs = (nodes: React.ReactNode, refs: Record<string, string>): React.ReactNode => {
  return React.Children.map(nodes, (child) => {
    if (typeof child === "string") {
      return processReferences(child, refs);
    }
    if (React.isValidElement(child)) {
      const element = child as React.ReactElement<{ children?: React.ReactNode }>;
      if (element.props.children) {
        return React.cloneElement(element, {
          children: renderTextWithRefs(element.props.children, refs),
        });
      }
    }
    return child;
  });
};

const slugify = (text: string) => {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
};

const getTextContent = (children: React.ReactNode): string => {
  return React.Children.toArray(children)
    .map((child) => {
      if (typeof child === "string" || typeof child === "number") return child.toString();
      if (React.isValidElement(child)) {
        const element = child as React.ReactElement<{ children?: React.ReactNode }>;
        if (element.props.children) return getTextContent(element.props.children);
      }
      return "";
    })
    .join("");
};

export default function MarkdownRenderer({ content, referencesContent }: MarkdownRendererProps) {
  // Parse references into a map for fast lookup
  const refsMap = useMemo(() => {
    if (!referencesContent) return {};
    const map: Record<string, string> = {};
    const lines = referencesContent.split("\n");
    lines.forEach((line) => {
      const match = line.match(/^(\d+)\.\s+(.+)$/);
      if (match) {
        map[match[1]] = match[2].split(", http")[0]; // Clean up URL for tooltip
      }
    });
    return map;
  }, [referencesContent]);

  const components = useMemo(() => {
    const wrap = (children: React.ReactNode) => renderTextWithRefs(children, refsMap);

    return {
      h2: ({ children, ...props }: any) => {
        const text = getTextContent(children);
        const id = slugify(text);
        return <h2 id={id} {...props}>{wrap(children)}</h2>;
      },
      h3: ({ children, ...props }: any) => {
        const text = getTextContent(children);
        const id = slugify(text);
        return <h3 id={id} {...props}>{wrap(children)}</h3>;
      },
      table: ({ children, ...props }: any) => (
        <div className="my-8 rounded-lg shadow-sm border border-[var(--color-gold)] border-opacity-20 overflow-visible">
          <div className="overflow-x-auto">
            <table {...props} className="min-w-full divide-y divide-[var(--color-gold)] divide-opacity-20">
              {children}
            </table>
          </div>
        </div>
      ),
      th: ({ children, ...props }: any) => (
        <th {...props} className="px-4 py-3 bg-[var(--color-parchment)] text-left text-sm font-semibold text-[var(--color-burgundy)] uppercase tracking-wider border-b border-[var(--color-gold)] border-opacity-20">
          {wrap(children)}
        </th>
      ),
      td: ({ children, ...props }: any) => (
        <td {...props} className="px-4 py-3 text-sm text-[var(--color-text-body)] border-b border-[var(--color-gold)] border-opacity-10">
          {wrap(children)}
        </td>
      ),
      li: ({ children, ...props }: any) => <li {...props}>{wrap(children)}</li>,
      blockquote: ({ children, ...props }: any) => <blockquote {...props}>{wrap(children)}</blockquote>,
      p: ({ children, ...props }: any) => <p {...props}>{wrap(children)}</p>,
      strong: ({ children, ...props }: any) => <strong {...props}>{wrap(children)}</strong>,
      em: ({ children, ...props }: any) => <em {...props}>{wrap(children)}</em>,
    };
  }, [refsMap]);

  return (
    <article className="prose md:prose-lg prose-liturgical max-w-none">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </article>
  );
}
