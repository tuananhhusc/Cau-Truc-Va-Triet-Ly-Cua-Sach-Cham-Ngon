export default function HeroSection() {
  return (
    <section className="hero-section py-16 sm:py-24 lg:py-32 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top ornament */}
        <div className="ornament mb-8 animate-fade-in-up">
          ✦ ✦ ✦
        </div>

        {/* Subtitle */}
        <p
          className="text-[0.75rem] sm:text-xs tracking-[0.3em] uppercase mb-6 animate-fade-in-up"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-text-secondary)",
            animationDelay: "0.1s",
            opacity: 0,
          }}
        >
          Báo Cáo Nghiên Cứu Chuyên Sâu
        </p>

        {/* Main Title */}
        <h1
          className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.75rem] leading-tight sm:leading-tight md:leading-tight font-bold mb-6 animate-fade-in-up"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-burgundy)",
            animationDelay: "0.2s",
            opacity: 0,
          }}
        >
          Phân Tích Cấu Trúc Và Triết Lý
          <br />
          Của Sách Châm Ngôn
        </h1>

        {/* Gold line */}
        <div
          className="mx-auto mb-8 animate-fade-in-up"
          style={{
            width: "160px",
            height: "3px",
            background:
              "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
            animationDelay: "0.3s",
            opacity: 0,
          }}
        />

        {/* Sub-title description */}
        <p
          className="text-base sm:text-lg md:text-xl max-w-2xl mx-auto animate-fade-in-up"
          style={{
            fontFamily: "var(--font-body)",
            color: "var(--color-text-secondary)",
            lineHeight: "1.8",
            animationDelay: "0.4s",
            opacity: 0,
          }}
        >
          Ứng Dụng Minh Triết Cổ Đại Vào Bối Cảnh
          <br className="hidden sm:block" />
          Thời Đại Số Và Xã Hội Hiện Đại
        </p>

        {/* Disclaimer */}
        <div
          className="mt-10 inline-block px-5 py-3 rounded-lg animate-fade-in-up"
          style={{
            background: "rgba(212, 175, 55, 0.08)",
            border: "1px solid rgba(212, 175, 55, 0.2)",
            animationDelay: "0.5s",
            opacity: 0,
          }}
        >
          <p
            className="text-[0.72rem] sm:text-xs italic"
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-secondary)",
            }}
          >
            Báo cáo này chỉ mang tính chất thông tin. Để được tư vấn y tế tâm
            lý hoặc chẩn đoán,
            <br className="hidden sm:block" />
            vui lòng tham khảo ý kiến chuyên gia y tế chuyên trách.
          </p>
        </div>

        {/* Bottom ornament */}
        <div
          className="ornament mt-12 animate-fade-in-up"
          style={{ animationDelay: "0.6s", opacity: 0 }}
        >
          ❧
        </div>
      </div>
    </section>
  );
}
