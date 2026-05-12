"use client";

import { ThemeProvider } from "next-themes";
import React, { createContext, useContext, useState, useEffect } from "react";

// Reading Context for Font Size
type ReadingContextType = {
  fontSizeOffset: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
};

const ReadingContext = createContext<ReadingContextType | undefined>(undefined);

export function useReading() {
  const context = useContext(ReadingContext);
  if (!context) throw new Error("useReading must be used within ReadingProvider");
  return context;
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [fontSizeOffset, setFontSizeOffset] = useState(0);

  // Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("fontSizeOffset");
    if (saved) setFontSizeOffset(Number(saved));
  }, []);

  const updateFontSize = (newOffset: number) => {
    setFontSizeOffset(newOffset);
    localStorage.setItem("fontSizeOffset", newOffset.toString());
  };

  const increaseFontSize = () => {
    if (fontSizeOffset < 4) updateFontSize(fontSizeOffset + 1);
  };

  const decreaseFontSize = () => {
    if (fontSizeOffset > -2) updateFontSize(fontSizeOffset - 1);
  };

  return (
    <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ReadingContext.Provider value={{ fontSizeOffset, increaseFontSize, decreaseFontSize }}>
        {/* We use a div wrapper to apply the font size scaling via CSS variable */}
        <div style={{ "--font-scale": 1 + fontSizeOffset * 0.1 } as React.CSSProperties}>
          {children}
        </div>
      </ReadingContext.Provider>
    </ThemeProvider>
  );
}
