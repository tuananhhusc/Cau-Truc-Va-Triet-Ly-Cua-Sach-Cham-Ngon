"use client";

import { useEffect, useState } from "react";

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  items: TOCItem[];
}

export default function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible entry
        const visibleEntries = entries.filter((e) => e.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    items.forEach((item) => {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <nav className="toc-container" aria-label="Mục lục bài viết">
      <div className="mb-4">
        <h2
          className="text-[0.7rem] font-bold tracking-[0.2em] uppercase mb-1"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-burgundy)",
          }}
        >
          Mục Lục
        </h2>
        <div
          style={{
            width: "40px",
            height: "2px",
            background: "var(--color-gold)",
          }}
        />
      </div>

      <ul className="space-y-0.5">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`toc-link ${item.level === 3 ? "toc-link-sub" : ""} ${
                activeId === item.id ? "active" : ""
              }`}
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById(item.id);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                  setActiveId(item.id);
                }
              }}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
