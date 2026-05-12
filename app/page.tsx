import { promises as fs } from "fs";
import path from "path";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import TableOfContents from "./components/TableOfContents";
import MarkdownRenderer from "./components/MarkdownRenderer";
import References from "./components/References";
import Footer from "./components/Footer";
import FloatingActions from "./components/FloatingActions";
import { parseMarkdownContent } from "./lib/parseMarkdown";

export default async function Home() {
  // Read the markdown file at build/render time (RSC)
  const filePath = path.join(process.cwd(), "public", "khonngoan.md");
  const rawContent = await fs.readFile(filePath, "utf-8");

  // Parse the content into structured sections
  const { articleBody, references, tocItems } =
    parseMarkdownContent(rawContent);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header />

      {/* Hero */}
      <HeroSection />

      {/* Main Content Area */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="flex gap-8 lg:gap-12">
            {/* Sticky TOC sidebar (Desktop only) */}
            <aside className="hidden lg:block w-64 shrink-0">
              <TableOfContents items={tocItems} />
            </aside>

            {/* Article content */}
            <div className="flex-1 min-w-0 max-w-[800px] mx-auto lg:mx-0">
              {/* Top ornamental frame */}
              <div className="ornament-line">
                <span
                  className="text-[var(--color-gold)] select-none"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  ✦
                </span>
              </div>

              {/* Introduction paragraph (part of article body) */}
              <MarkdownRenderer content={articleBody} referencesContent={references} />

              {/* References Section */}
              {references && <References content={references} />}

              {/* Bottom ornamental frame */}
              <div className="ornament-line mt-16">
                <span
                  className="text-[var(--color-gold)] select-none"
                  style={{ fontFamily: "var(--font-accent)" }}
                >
                  ✦
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <FloatingActions tocItems={tocItems} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
