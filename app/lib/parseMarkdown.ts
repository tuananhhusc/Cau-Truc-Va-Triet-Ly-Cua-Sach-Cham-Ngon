export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Parse markdown content and extract structured sections:
 * - title (first line)
 * - disclaimer (second line)
 * - introduction (paragraphs before first heading)
 * - articleBody (from first heading to "Nguồn trích dẫn")
 * - references (from "Nguồn trích dẫn" to end)
 * - tocItems (h2 and h3 headings with IDs)
 */
export function parseMarkdownContent(raw: string) {
  const lines = raw.split(/\r?\n/);

  // First line = title
  const title = lines[0]?.trim() || "";
  // Second line = disclaimer
  const disclaimer = lines[1]?.trim() || "";

  // Find the first real content heading (not the title)
  // Headings in the content don't have markdown # syntax, they are plain text lines
  // We need to convert them to proper markdown headings

  // Parse the document structure based on the actual content
  // The md file uses plain text without # markers - we need to identify headings by their content

  // Known heading patterns (from the document analysis)
  const majorHeadings = [
    "Nền Tảng Nhận Thức Luận Và Lời Kêu Gọi Của Sự Khôn Ngoan (Chương 1-9)",
    "Đạo Đức Thực Hành, Ngôn Ngữ Và Liệu Pháp Tâm Lý (Chương 10-22:16)",
    "Phân Tích \"Ba Mươi Lời Dạy Của Người Khôn Ngoan\" (Chương 22:17 - 24:34)",
    "Nghệ Thuật Lãnh Đạo Và Quản Trị Công Bằng (Chương 25-29)",
    "Chủ Nghĩa Tối Giản Và Phê Phán Văn Hóa Tiêu Dùng (Chương 30)",
    "Tái Định Nghĩa Hình Tượng Phụ Nữ: Lãnh Đạo, Doanh Nhân Và Nghệ Thuật Cân Bằng (Chương 31)",
    "Kết Luận",
    "Nguồn trích dẫn",
  ];

  const minorHeadings = [
    "Sự Giao Thoa Giữa Tri Thức Và Sự Kính Sợ Đấng Tạo Hóa",
    "Cơ Chế Bảo Vệ Tâm Trí Trước \"Nền Kinh Tế Chú Ý\" (Châm Ngôn 4:23)",
    "Quyền Năng Của Ngôn Từ Và Khởi Thủy Của Liệu Pháp Tâm Lý",
    "Đạo Đức Kinh Doanh, Lòng Rộng Rãi Và Sự Chính Trực",
    "Ảo Ảnh Của Sự Giàu Có Và Cạm Bẫy Tín Dụng",
    "Sự Tiết Độ Và Cảnh Báo Về Các Chứng Nghiện",
    "Tầm Nhìn, Sự Công Lý Và Trách Nhiệm Xã Hội",
    "Tính Khiêm Nhường, Trí Tuệ Cảm Xúc Và Nghệ Thuật Lắng Nghe",
    "Sự Băng Hoại Của Chủ Nghĩa Tiêu Dùng",
    "Giải Pháp Tối Giản (Minimalism) Và Quản Gia Trung Tín",
    "Nữ Giám Đốc Điều Hành (CEO) Độc Lập Và Khôn Ngoan",
    "Nghệ Thuật Cân Bằng (Work-Life Balance) Và Nền Tảng Tâm Linh",
  ];

  // Table header rows (these are part of table structures, not headings)
  const tableHeaders = [
    "Tiêu Chí So Sánh",
    "Sự Khôn Ngoan (Wisdom) Theo Sách Châm Ngôn",
    "Thông Tin (Information) Trong Thời Đại Số",
    "Bản chất cốt lõi",
    "Nguồn gốc",
    "Hệ quả của sự tích lũy",
    "Đích đến tối hậu",
    "Nguyên Lý Châm Ngôn 12:25",
    "Nguyên Lý Trị Liệu Nhận Thức - Hành Vi (CBT)",
    "Ứng Dụng Trong Chăm Sóc Sức Khỏe Tâm Thần Đương Đại",
  ];

  // Convert plain text to markdown with proper heading levels
  let convertedLines: string[] = [];
  let inTable = false;
  let tableBuffer: string[] = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    // Skip title and disclaimer (lines 0 and 1)
    if (i === 0 || i === 1) {
      continue;
    }

    // Check if this is a major heading
    if (majorHeadings.includes(trimmed)) {
      // Flush any table buffer
      if (tableBuffer.length > 0) {
        convertedLines.push(...buildMarkdownTable(tableBuffer));
        tableBuffer = [];
        inTable = false;
      }
      convertedLines.push(`## ${trimmed}`);
      continue;
    }

    // Check if this is a minor heading
    if (minorHeadings.includes(trimmed)) {
      if (tableBuffer.length > 0) {
        convertedLines.push(...buildMarkdownTable(tableBuffer));
        tableBuffer = [];
        inTable = false;
      }
      convertedLines.push(`### ${trimmed}`);
      continue;
    }

    // Check if this is a table header row
    if (tableHeaders.includes(trimmed)) {
      // Start or continue table
      if (!inTable) {
        inTable = true;
      }
      tableBuffer.push(trimmed);
      continue;
    }

    // Check for table data rows (shorter lines that follow table headers)
    if (inTable && trimmed.length > 0) {
      tableBuffer.push(trimmed);
      continue;
    }

    // Empty line while in table = end of table
    if (inTable && trimmed.length === 0) {
      if (tableBuffer.length > 0) {
        convertedLines.push(...buildMarkdownTable(tableBuffer));
        tableBuffer = [];
      }
      inTable = false;
      convertedLines.push("");
      continue;
    }

    // Regular content
    convertedLines.push(lines[i]);
  }

  // Flush remaining table buffer
  if (tableBuffer.length > 0) {
    convertedLines.push(...buildMarkdownTable(tableBuffer));
  }

  const fullMarkdown = convertedLines.join("\n");

  // Split into article body and references
  const refIndex = fullMarkdown.indexOf("## Nguồn trích dẫn");
  let articleBody = fullMarkdown;
  let references = "";

  if (refIndex !== -1) {
    articleBody = fullMarkdown.slice(0, refIndex).trim();
    references = fullMarkdown.slice(refIndex).trim();
  }

  // Extract TOC items from the article body
  const tocItems: TOCItem[] = [];
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  let match;

  while ((match = headingRegex.exec(articleBody)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    tocItems.push({
      id: slugify(text),
      text,
      level,
    });
  }

  return {
    title,
    disclaimer,
    articleBody,
    references,
    tocItems,
  };
}

function buildMarkdownTable(rows: string[]): string[] {
  // Try to identify table structure from the raw rows
  // The first table: 4 columns with headers on rows[0-2], data on rows[3+]
  // The second table: 3 columns with headers on rows[0-2], data on rows[3+]

  // Detect table 1 (4 columns: Tiêu Chí, Khôn Ngoan, Thông Tin)
  if (rows[0] === "Tiêu Chí So Sánh") {
    return buildComparisonTable1(rows);
  }

  // Detect table 2 (3 columns: Châm Ngôn, CBT, Ứng dụng)
  if (rows[0] === "Nguyên Lý Châm Ngôn 12:25") {
    return buildComparisonTable2(rows);
  }

  // Fallback: return as paragraphs
  return rows.map((r) => r);
}

function buildComparisonTable1(rows: string[]): string[] {
  // Headers: Tiêu Chí So Sánh | Sự Khôn Ngoan | Thông Tin
  // Data rows come in triplets: criteria, wisdom value, information value
  const result: string[] = [""];
  result.push(
    `| Tiêu Chí So Sánh | Sự Khôn Ngoan (Wisdom) Theo Sách Châm Ngôn | Thông Tin (Information) Trong Thời Đại Số |`
  );
  result.push(`| :--- | :--- | :--- |`);

  // Skip the 3 header rows, then process data in groups of 3
  const dataRows = rows.slice(3);
  for (let i = 0; i < dataRows.length; i += 3) {
    const col1 = dataRows[i] || "";
    const col2 = dataRows[i + 1] || "";
    const col3 = dataRows[i + 2] || "";
    result.push(`| **${col1}** | ${col2} | ${col3} |`);
  }

  result.push("");
  return result;
}

function buildComparisonTable2(rows: string[]): string[] {
  // Headers: Nguyên Lý Châm Ngôn 12:25 | Nguyên Lý CBT | Ứng Dụng
  // Data rows come in triplets
  const result: string[] = [""];
  result.push(
    `| Nguyên Lý Châm Ngôn 12:25 | Nguyên Lý Trị Liệu Nhận Thức - Hành Vi (CBT) | Ứng Dụng Trong Chăm Sóc Sức Khỏe Tâm Thần Đương Đại |`
  );
  result.push(`| :--- | :--- | :--- |`);

  const dataRows = rows.slice(3);
  for (let i = 0; i < dataRows.length; i += 3) {
    const col1 = dataRows[i] || "";
    const col2 = dataRows[i + 1] || "";
    const col3 = dataRows[i + 2] || "";
    result.push(`| **${col1}** | ${col2} | ${col3} |`);
  }

  result.push("");
  return result;
}
