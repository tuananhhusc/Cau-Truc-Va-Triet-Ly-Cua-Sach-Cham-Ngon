import type { Metadata, Viewport } from "next";
import { Providers } from "./providers";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f8f5e6" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1614" }
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: "Phân Tích Cấu Trúc Và Triết Lý Của Sách Châm Ngôn",
  description:
    "Báo cáo nghiên cứu học thuật chuyên sâu: Ứng Dụng Minh Triết Cổ Đại Vào Bối Cảnh Thời Đại Số Và Xã Hội Hiện Đại. Phân tích toàn diện Sách Châm Ngôn từ góc nhìn thần học, triết học và tâm lý học.",
  keywords: [
    "Sách Châm Ngôn",
    "Proverbs",
    "Minh Triết",
    "Thần Học",
    "Kinh Thánh",
    "Nghiên Cứu Học Thuật",
    "Tâm Lý Học",
  ],
  authors: [{ name: "Báo Cáo Nghiên Cứu Chuyên Sâu" }],
  creator: "Thư Viện Minh Triết",
  openGraph: {
    title: "Sách Châm Ngôn: Minh Triết Cổ Đại & Thời Đại Số",
    description:
      "Nghiên cứu chuyên sâu về sự khôn ngoan, bảo vệ tâm trí, đạo đức kinh doanh và lãnh đạo trong sách Châm Ngôn.",
    url: "https://tuananhhusc.github.io/Cau-Truc-Va-Triet-Ly-Cua-Sach-Cham-Ngon",
    siteName: "Báo Cáo Nghiên Cứu Chuyên Sâu",
    type: "article",
    locale: "vi_VN",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544640808-32cb4f5b5b06?w=1200&h=630&fit=crop", // placeholder book image
        width: 1200,
        height: 630,
        alt: "Sách Châm Ngôn",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phân Tích Cấu Trúc Và Triết Lý Của Sách Châm Ngôn",
    description: "Ứng dụng minh triết cổ đại vào bối cảnh thời đại số và xã hội hiện đại.",
    images: ["https://images.unsplash.com/photo-1544640808-32cb4f5b5b06?w=1200&h=630&fit=crop"],
  },
  alternates: {
    canonical: "https://tuananhhusc.github.io/Cau-Truc-Va-Triet-Ly-Cua-Sach-Cham-Ngon",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400..700;1,400..700&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ScholarlyArticle",
              headline: "Phân Tích Cấu Trúc Và Triết Lý Của Sách Châm Ngôn",
              description: "Ứng Dụng Minh Triết Cổ Đại Vào Bối Cảnh Thời Đại Số Và Xã Hội Hiện Đại",
              author: {
                "@type": "Organization",
                name: "Báo Cáo Nghiên Cứu Chuyên Sâu"
              },
              inLanguage: "vi-VN"
            })
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
