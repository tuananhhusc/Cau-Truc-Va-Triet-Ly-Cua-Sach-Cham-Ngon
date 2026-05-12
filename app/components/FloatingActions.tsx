"use client";

import { useState, useEffect } from "react";
import { ArrowUp, List, X } from "lucide-react";
import TableOfContents from "./TableOfContents";
import type { TOCItem } from "../lib/parseMarkdown";

interface FloatingActionsProps {
  tocItems: TOCItem[];
}

export default function FloatingActions({ tocItems }: FloatingActionsProps) {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isTocOpen, setIsTocOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
        {/* Mobile TOC Button */}
        <button
          onClick={() => setIsTocOpen(true)}
          className="lg:hidden p-3 rounded-full shadow-lg bg-[var(--color-ivory)] text-[var(--color-burgundy)] border border-[var(--color-gold)] hover:bg-[var(--color-parchment)] transition-colors"
          aria-label="Mở mục lục"
        >
          <List size={20} />
        </button>

        {/* Back to Top Button */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full shadow-lg bg-[var(--color-gold)] text-[var(--color-ivory)] hover:bg-[var(--color-gold-dark)] transition-colors animate-fade-in-up"
            aria-label="Trở lên đầu trang"
          >
            <ArrowUp size={20} />
          </button>
        )}
      </div>

      {/* Mobile TOC Drawer Overlay */}
      {isTocOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm"
          onClick={() => setIsTocOpen(false)}
        />
      )}

      {/* Mobile TOC Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-72 max-w-[85vw] bg-[var(--color-ivory)] border-l border-[var(--color-gold)] shadow-2xl z-[70] transform transition-transform duration-300 ease-in-out lg:hidden ${
          isTocOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[1.1rem] font-bold text-[var(--color-burgundy)]" style={{ fontFamily: "var(--font-heading)" }}>
              MỤC LỤC
            </h2>
            <button 
              onClick={() => setIsTocOpen(false)}
              className="p-2 text-[var(--color-text-secondary)] hover:text-[var(--color-pentecost-red)] rounded-full hover:bg-[var(--color-parchment)] transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto pr-2" onClick={() => setIsTocOpen(false)}>
            <TableOfContents items={tocItems} />
          </div>
        </div>
      </div>
    </>
  );
}
