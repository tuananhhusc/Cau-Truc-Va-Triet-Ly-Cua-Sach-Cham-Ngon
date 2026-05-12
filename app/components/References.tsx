interface ReferencesProps {
  content: string;
}

export default function References({ content }: ReferencesProps) {
  // Parse reference lines (skip the heading)
  const lines = content
    .split("\n")
    .filter((line) => line.trim().length > 0 && !line.startsWith("## "));

  return (
    <section className="mt-16 pt-8" id="nguon-trich-dan">
      {/* Section header */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="flex-1"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
          }}
        />
        <h2
          className="text-lg tracking-[0.15em] uppercase"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-burgundy)",
            fontWeight: 600,
          }}
        >
          Nguồn Trích Dẫn
        </h2>
        <div
          className="flex-1"
          style={{
            height: "1px",
            background:
              "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
          }}
        />
      </div>

      {/* Reference list */}
      <ol className="space-y-3">
        {lines.map((line, index) => {
          // Try to split title and URL, also remove leading numbers like "1. "
          const cleanLine = line.replace(/^\d+\.\s*/, "");
          const urlMatch = cleanLine.match(
            /^(.+?),?\s*(https?:\/\/\S+)\s*$/
          );

          return (
            <li
              key={index}
              className="flex gap-3 text-sm leading-relaxed"
              style={{
                fontFamily: "var(--font-body)",
                color: "var(--color-text-secondary)",
              }}
            >
              <span
                className="shrink-0 mt-0.5 text-xs font-semibold w-6 h-6 flex items-center justify-center rounded-full"
                style={{
                  background: "rgba(212, 175, 55, 0.12)",
                  color: "var(--color-gold-dark)",
                  fontFamily: "var(--font-heading)",
                }}
              >
                {index + 1}
              </span>
              <div className="min-w-0">
                {urlMatch ? (
                  <>
                    <span>{urlMatch[1].replace(/,\s*$/, "")}</span>
                    <br />
                    <a
                      href={urlMatch[2]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--color-penance-purple)] text-xs break-all hover:text-[var(--color-penance-purple-light)] transition-colors"
                    >
                      {urlMatch[2]}
                    </a>
                  </>
                ) : (
                  <span className="break-words">{cleanLine}</span>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
