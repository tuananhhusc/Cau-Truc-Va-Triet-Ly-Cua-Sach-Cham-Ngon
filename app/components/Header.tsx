"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useReading } from "../providers";
import { Moon, Sun, Type, Minus, Plus } from "lucide-react";

export default function Header() {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const { theme, setTheme } = useTheme();
  const { decreaseFontSize, increaseFontSize } = useReading();

  useEffect(() => {
    setMounted(true);
    
    const handleScroll = () => {
      // Calculate scroll progress percentage
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setProgress(scrolled);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="site-header sticky top-0 z-50">
      {/* Progress Bar */}
      <div 
        className="absolute bottom-0 left-0 h-[2px] bg-[var(--color-gold)] transition-all duration-150 z-50"
        style={{ width: `${progress}%` }}
      />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <span className="text-[var(--color-gold)] text-2xl select-none">✝</span>
            <div className="hidden sm:flex flex-col">
              <span className="text-sm font-semibold tracking-wider text-[var(--color-burgundy)] uppercase" style={{ fontFamily: "var(--font-heading)" }}>
                Báo Cáo Nghiên Cứu Chuyên Sâu
              </span>
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Font Adjuster */}
            {mounted && (
              <div className="flex items-center gap-1 border border-[var(--color-gold)] border-opacity-30 rounded-md p-1 bg-[var(--color-ivory)]">
                <button onClick={decreaseFontSize} className="p-1 text-[var(--color-text-secondary)] hover:text-[var(--color-burgundy)] hover:bg-[var(--color-ivory-dark)] rounded transition-colors" title="Giảm cỡ chữ">
                  <Minus size={14} />
                </button>
                <div className="px-1 flex items-center justify-center text-[var(--color-text-primary)]">
                  <Type size={14} />
                </div>
                <button onClick={increaseFontSize} className="p-1 text-[var(--color-text-secondary)] hover:text-[var(--color-burgundy)] hover:bg-[var(--color-ivory-dark)] rounded transition-colors" title="Tăng cỡ chữ">
                  <Plus size={14} />
                </button>
              </div>
            )}

            {/* Theme Toggle */}
            {mounted && (
              <div className="flex items-center gap-1 border border-[var(--color-gold)] border-opacity-30 rounded-md p-1 bg-[var(--color-ivory)]">
                <button 
                  onClick={() => setTheme("light")} 
                  className={`p-1 rounded transition-colors ${theme === "light" ? "bg-[var(--color-gold)] text-[var(--color-ivory)]" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-ivory-dark)]"}`}
                  title="Sáng"
                >
                  <Sun size={14} />
                </button>
                <button 
                  onClick={() => setTheme("sepia")} 
                  className={`p-1 rounded transition-colors ${theme === "sepia" ? "bg-[var(--color-gold)] text-[var(--color-ivory)]" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-ivory-dark)]"}`}
                  title="Giấy cũ"
                >
                  <div className={`w-3.5 h-3.5 rounded-full ${theme === "sepia" ? "bg-white" : "bg-[#dccba8]"} border ${theme === "sepia" ? "border-white" : "border-[#a37c17]"}`} />
                </button>
                <button 
                  onClick={() => setTheme("dark")} 
                  className={`p-1 rounded transition-colors ${theme === "dark" ? "bg-[var(--color-gold)] text-[var(--color-ivory)]" : "text-[var(--color-text-secondary)] hover:bg-[var(--color-ivory-dark)]"}`}
                  title="Tối"
                >
                  <Moon size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
