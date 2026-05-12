"use client";

export default function Footer() {
  return (
    <footer className="site-footer py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand/Title Section */}
          <div className="text-center md:text-left">
            <h3 className="text-sm font-bold text-[var(--color-burgundy)] tracking-[0.1em] mb-1" style={{ fontFamily: "var(--font-heading)" }}>
              BÁO CÁO NGHIÊN CỨU CHUYÊN SÂU
            </h3>
            <p className="text-[0.7rem] text-[var(--color-text-secondary)]" style={{ fontFamily: "var(--font-body)" }}>
              Phân Tích Cấu Trúc Và Triết Lý Của Sách Châm Ngôn
            </p>
          </div>

          {/* Center Cross Ornament */}
          <div className="hidden md:flex flex-col items-center gap-1">
            <span className="text-[var(--color-gold)] text-xl select-none">✝</span>
            <div className="w-px h-6 bg-gradient-to-b from-[var(--color-gold)] to-transparent opacity-30" />
          </div>

          {/* Quote Section */}
          <div className="text-center md:text-right max-w-xs">
            <p className="text-[0.7rem] italic text-[var(--color-text-secondary)] mb-2" style={{ fontFamily: "var(--font-body)" }}>
              &ldquo;Kính sợ Đức Chúa là bước đầu của khôn ngoan&rdquo;
            </p>
            <p className="text-[0.6rem] font-bold text-[var(--color-gold-dark)] tracking-[0.2em] uppercase">
              Ad Maiorem Dei Gloriam
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-[var(--color-gold)] border-opacity-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[0.6rem] text-[var(--color-text-secondary)] opacity-70 tracking-wider font-medium">
          <p className="uppercase">© 2024 Thư Viện Minh Triết • Dự án Nghiên cứu Học thuật</p>
          <div className="flex gap-6 uppercase">
            <a href="#" className="hover:text-[var(--color-burgundy)] transition-colors">Trang chủ</a>
            <a href="#nguon-trich-dan" className="hover:text-[var(--color-burgundy)] transition-colors">Tài liệu</a>
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }} 
              className="hover:text-[var(--color-burgundy)] transition-colors"
            >
              Lên đầu trang
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
