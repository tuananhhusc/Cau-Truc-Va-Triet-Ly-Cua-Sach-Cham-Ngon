# Báo Cáo Nghiên Cứu Chuyên Sâu: Sách Châm Ngôn & Minh Triết Cổ Đại

Một nền tảng đọc bài báo khoa học (Long-read Article) chuyên sâu về Sách Châm Ngôn, được thiết kế với phong cách học thuật hiện đại kết hợp với thẩm mỹ nghệ thuật Phụng vụ (Liturgical Art).

![Website Preview](https://images.unsplash.com/photo-1544640808-32cb4f5b5b06?w=1200&h=630&fit=crop)

## 🌟 Tổng quan Dự án

Dự án này là một ứng dụng web Single-page được xây dựng trên nền tảng Next.js 15, nhằm trình bày báo cáo nghiên cứu: **"Phân Tích Cấu Trúc Và Triết Lý Của Sách Châm Ngôn: Ứng Dụng Minh Triết Cổ Đại Vào Bối Cảnh Thời Đại Số Và Xã Hội Hiện Đại"**. 

Mục tiêu cốt lõi là tạo ra một trải nghiệm đọc không gây xao nhãng, tôn trọng giá trị học thuật và thần học, đồng thời tích hợp các công nghệ web tiên tiến nhất để tối ưu hóa khả năng tiếp cận và tương tác.

## 🛠️ Công nghệ sử dụng

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/) - Tận dụng tối đa Server Components để tối ưu hiệu suất.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) với plugin `@tailwindcss/typography` (Prose).
- **Content Engine:** [React Markdown](https://github.com/remarkjs/react-markdown) & [Remark GFM](https://github.com/remarkjs/remark-gfm).
- **Theme Management:** [Next Themes](https://github.com/pacocoursey/next-themes) - Hỗ trợ các chế độ Sáng (Light), Tối (Dark) và Giấy cũ (Sepia).
- **Icons:** [Lucide React](https://lucide.dev/).
- **Animation:** CSS Animations & Tailwind Transitions.

## ✨ Tính năng nổi bật

### 1. Hệ thống Chú thích Thông minh (Footnote Tooltips)
Sử dụng bộ xử lý đệ quy (Recursive Parser) tùy chỉnh để nhận diện các con số chú thích trong văn bản Markdown. Khi di chuột (hoặc chạm trên di động), một hộp thoại Tooltip sẽ hiện ra hiển thị chi tiết nguồn trích dẫn mà không làm gián đoạn luồng đọc.

### 2. Trải nghiệm Đọc tùy chỉnh (Reading UX)
- **Cân chỉnh kích cỡ chữ:** Người dùng có thể tăng/giảm kích thước văn bản trực tiếp trên thanh công cụ. Toàn bộ nội dung bài viết, danh sách và bảng biểu sẽ tự động điều chỉnh theo tỷ lệ vàng.
- **Chế độ hiển thị:** Ba chế độ màu (Sáng, Tối, Sepia) giúp bảo vệ mắt và phù hợp với nhiều điều kiện ánh sáng khác nhau.
- **Thanh tiến trình (Progress Bar):** Theo dõi tiến độ đọc bài viết theo thời gian thực.

### 3. Mục lục tương tác (Active TOC)
- Mục lục tự động làm nổi bật chương đang đọc (Intersection Observer API).
- Hỗ trợ Sidebar cố định trên Desktop và Ngăn kéo (Drawer) tiện lợi trên Mobile.

### 4. Tối ưu hóa SEO & Mobile
- **SEO Ready:** Tích hợp đầy đủ Metadata, Open Graph, Twitter Cards và JSON-LD (Schema.org) cho các bài báo khoa học.
- **Responsive:** Giao diện được tối ưu hóa cho mọi loại màn hình, từ điện thoại nhỏ đến màn hình 4K. Bảng biểu hỗ trợ cuộn ngang thông minh.

## 📁 Cấu trúc thư mục

```text
├── app/
│   ├── components/       # Các thành phần giao diện (Header, Footer, Renderer...)
│   ├── lib/              # Tiện ích xử lý nội dung Markdown
│   ├── providers.tsx     # Quản lý trạng thái (Theme, Font Size)
│   ├── layout.tsx        # Cấu trúc khung trang và SEO
│   └── page.tsx          # Trang chủ (Server Component)
├── public/
│   └── khonngoan.md      # File nội dung chính (Single source of truth)
└── globals.css           # Hệ thống thiết kế (Design System) và Typography
```

## 🚀 Hướng dẫn cài đặt & Chạy cục bộ

1. **Clone dự án:**
   ```bash
   git clone <repository-url>
   cd chamngonhiennay
   ```

2. **Cài đặt thư viện:**
   ```bash
   npm install
   ```

3. **Chạy môi trường phát triển:**
   ```bash
   npm run dev
   ```
   Truy cập `http://localhost:3000` để xem kết quả.

4. **Build sản phẩm:**
   ```bash
   npm run build
   npm run start
   ```

## 📄 Nội dung & Bản quyền

Dữ liệu nội dung bài viết được lưu trữ tại `public/khonngoan.md`. Mọi thay đổi về văn bản hoặc thuật ngữ chuyên môn chỉ cần cập nhật tại file này, hệ thống sẽ tự động đồng bộ hóa trên toàn trang web.

---

**AD MAIOREM DEI GLORIAM**
*Phát triển bởi Thư Viện Minh Triết • 2024*
