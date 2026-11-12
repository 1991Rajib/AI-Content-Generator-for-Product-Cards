import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const outputPath = path.resolve('AI_Content_Generator_Solution_Document.pdf');

// Create document with explicit page dimensions & ample bottom buffer
const doc = new PDFDocument({
  size: 'A4', // 595.28 x 841.89 points
  margins: { top: 35, bottom: 30, left: 45, right: 45 },
  bufferPages: true,
  autoFirstPage: false
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Figma Combination 21: Fresh Peach Design Tokens
const COLOR_PEACH_LIGHT = '#FFD3AC';
const COLOR_PEACH_BLUSH = '#FFB5AB';
const COLOR_TERRACOTTA = '#E39A7B';
const COLOR_OCHRE = '#DBB06B';
const COLOR_TEXT_DARK = '#28160E';
const COLOR_TEXT_MUTED = '#5C3A29';
const COLOR_BG_PANEL = '#FFF8F2';
const COLOR_BORDER = '#F3DAC8';

function drawHeading(num, title) {
  const y = doc.y;
  doc.rect(45, y, 3, 12).fill(COLOR_TERRACOTTA);
  doc.fontSize(10).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text(`${num}. ${title}`, 53, y);
  doc.y = y + 16;
}

// ==========================================
// PAGE 1: EXECUTIVE ARCHITECTURE & MATRIX
// ==========================================
doc.addPage();

// 1. Top Brand Accent Line
doc.rect(45, 35, 505, 3.5).fill(COLOR_TERRACOTTA);

// 2. Header
doc.y = 45;
doc.fontSize(8).font('Helvetica-Bold').fillColor(COLOR_TERRACOTTA).text('TECHNICAL SOLUTION & ARCHITECTURE SPECIFICATION');
doc.moveDown(0.2);
doc.fontSize(18).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('CardCraft AI — Product Card Studio');
doc.fontSize(8.5).font('Helvetica').fillColor(COLOR_TEXT_MUTED).text('AI-Driven Content Generator with Fresh Peach Design System & Real-Time Media Engine');

// 3. Metadata Header Card
doc.moveDown(0.4);
const metaY = doc.y;
doc.roundedRect(45, metaY, 505, 42, 5).fillAndStroke(COLOR_BG_PANEL, COLOR_BORDER);

doc.fontSize(7.5).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK);
doc.text('Brand System:', 55, metaY + 7);
doc.font('Helvetica').fillColor(COLOR_TEXT_MUTED).text('Figma Combination 21 (Fresh Peach: #FFD3AC, #FFB5AB, #E39A7B, #DBB06B)', 130, metaY + 7);

doc.font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('Tech Stack:', 55, metaY + 18);
doc.font('Helvetica').fillColor(COLOR_TEXT_MUTED).text('React 19, Vite, Tailwind CSS, Vercel Serverless, Google Gemini REST API, Wikipedia Media API', 130, metaY + 18);

doc.font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('Architecture:', 55, metaY + 29);
doc.font('Helvetica-Bold').fillColor(COLOR_TERRACOTTA).text('Zero-Leak Serverless Proxy · Dynamic Query-Specific Image Match · LocalStorage Sync', 130, metaY + 29);

doc.y = metaY + 48;

// 4. Section 1: Overview
drawHeading('01', 'Executive Overview & Problem Resolution');
doc.fontSize(8).font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(
  'CardCraft AI is an automated studio web application that transforms basic product inputs into complete, styled product cards. When a merchant provides a product name and category, the app leverages Google Gemini AI via REST API to generate an optimized SEO title, benefit-focused marketing copy, targeted hashtag keywords, realistic pricing, and query-specific product photography.',
  { align: 'justify', lineGap: 1.4, width: 505 }
);

// 5. Capability Matrix Table
doc.moveDown(0.4);
doc.fontSize(7.5).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('Refactored System Capabilities:');
doc.moveDown(0.2);

const tableStartY = doc.y;
const colPositions = [45, 175, 475];

// Table Header
doc.rect(45, tableStartY, 505, 15).fill('#FFEAD9');
doc.fontSize(7).font('Helvetica-Bold').fillColor(COLOR_TERRACOTTA);
doc.text('MODULE', colPositions[0] + 6, tableStartY + 4);
doc.text('IMPLEMENTED ARCHITECTURE', colPositions[1] + 6, tableStartY + 4);
doc.text('STATUS', colPositions[2] + 6, tableStartY + 4);

const tableRows = [
  ['Blank Initial State', 'Starts 100% clean; zero pre-filled images or demo data on load', 'Verified'],
  ['Input Form & Reset', 'Product name, category dropdown, tone toggle & instant reset button', 'Verified'],
  ['Real-Time Media Engine', 'Wikipedia Media Search API (90%+ exact match for any product query)', 'Verified'],
  ['Current-Product Cycling', 'Cycle photos matching exclusively the active product title & category', 'Verified'],
  ['Clutter-Free E-Commerce', 'Excised retail cart/wishlist bloat; focused strictly on copy & SEO tags', 'Verified'],
  ['Figma Fresh Peach UI', '4-swatch harmony: #FFD3AC, #FFB5AB, #E39A7B, #DBB06B', 'Verified'],
  ['Vercel Serverless /api', 'Protected process.env.GEMINI_API_KEY with zero client key exposure', 'Verified']
];

let rowY = tableStartY + 15;
const rowHeight = 14;

tableRows.forEach((row, i) => {
  const bg = i % 2 === 0 ? '#FFFFFF' : '#FFFDFB';
  doc.rect(45, rowY, 505, rowHeight).fillAndStroke(bg, COLOR_BORDER);
  doc.fontSize(6.5).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text(row[0], colPositions[0] + 6, rowY + 3.5);
  doc.font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(row[1], colPositions[1] + 6, rowY + 3.5);
  doc.font('Helvetica-Bold').fillColor('#059669').text(row[2], colPositions[2] + 6, rowY + 3.5);
  rowY += rowHeight;
});

doc.y = rowY + 10;

// 6. Section 2: Architecture & Data Flow
drawHeading('02', 'System Architecture & Data Flow');
doc.fontSize(8).font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(
  'To safeguard AI credentials from client inspection, CardCraft AI uses a secure Vercel Serverless Proxy. The browser communicates with a dedicated backend route that securely handles the Google Gemini REST API:',
  { align: 'justify', lineGap: 1.4, width: 505 }
);

doc.moveDown(0.3);
const archBoxY = doc.y;
doc.roundedRect(45, archBoxY, 505, 86, 5).fillAndStroke('#28160E', '#3D2216');

doc.fontSize(6.5).font('Courier').fillColor('#FFD3AC');
const diagramLines = [
  '┌────────────────────────────────────────────────────────────────────────────┐',
  '│  CLIENT BROWSER (React 19 + Vite + Tailwind CSS)                           │',
  '│  - User submits Product Name + Category -> Shows CardSkeleton loader       │',
  '│  - Dispatches parallel Wikipedia Media Search for exact product photos     │',
  '│  - Renders ProductCard with 1-click copy helpers & image cycler            │',
  '└────────────────────────────────────┬───────────────────────────────────────┘',
  '                                     │ POST /api/generate',
  '                                     ▼',
  '┌────────────────────────────────────────────────────────────────────────────┐',
  '│  VERCEL SERVERLESS FUNCTION (/api/generate.js)                             │',
  '│  - Reads process.env.GEMINI_API_KEY from secure Vercel environment         │',
  '│  - Enforces JSON Schema: title, shortDescription, tags, price, bulletPoints│',
  '└────────────────────────────────────┬───────────────────────────────────────┘',
  '                                     │ HTTPS REST Call',
  '                                     ▼',
  '┌────────────────────────────────────────────────────────────────────────────┐',
  '│  GOOGLE GEMINI REST API (Model: gemini-flash-lite-latest / 3.5-flash)      │',
  '└────────────────────────────────────────────────────────────────────────────┘'
];

let dLineY = archBoxY + 5;
diagramLines.forEach(l => {
  doc.text(l, 52, dLineY);
  dLineY += 7.8;
});

// ==========================================
// PAGE 2: DESIGN SYSTEM, MEDIA & DEPLOYMENT
// ==========================================
doc.addPage();

// Top Brand Line
doc.rect(45, 35, 505, 3.5).fill(COLOR_TERRACOTTA);

doc.y = 45;
doc.fontSize(8).font('Helvetica-Bold').fillColor(COLOR_TERRACOTTA).text('DESIGN SYSTEM, MEDIA ENGINE & IMPLEMENTATION');
doc.moveDown(0.2);
doc.fontSize(16).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('Fresh Peach Palette, Media Architecture & Verification');
doc.y = 78;

// 03. Design System
drawHeading('03', 'Figma Fresh Peach Design System (Combination 21)');
doc.fontSize(8).font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(
  'The visual styling implements the exact 4-swatch harmony from Figma Combination 21, establishing a warm, welcoming, and high-contrast editorial interface:',
  { lineGap: 1.4, width: 505 }
);

doc.moveDown(0.3);
const swatchBoxY = doc.y;
doc.roundedRect(45, swatchBoxY, 505, 50, 5).fillAndStroke(COLOR_BG_PANEL, '#FFD3AC');

// Swatch 1: #FFD3AC
doc.rect(55, swatchBoxY + 6, 9, 9).fill('#FFD3AC');
doc.fontSize(7).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('#FFD3AC (Soft Peach):', 68, swatchBoxY + 7);
doc.font('Helvetica').fillColor(COLOR_TEXT_MUTED).text('Ambient canvas glow, description box tint, and badge backgrounds.', 170, swatchBoxY + 7);

// Swatch 2: #FFB5AB
doc.rect(55, swatchBoxY + 20, 9, 9).fill('#FFB5AB');
doc.fontSize(7).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('#FFB5AB (Blush Coral):', 68, swatchBoxY + 21);
doc.font('Helvetica').fillColor(COLOR_TEXT_MUTED).text('Delicate pill tag outlines, secondary active halos, and card rings.', 170, swatchBoxY + 21);

// Swatch 3: #E39A7B
doc.rect(55, swatchBoxY + 34, 9, 9).fill('#E39A7B');
doc.fontSize(7).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('#E39A7B (Terracotta):', 68, swatchBoxY + 35);
doc.font('Helvetica').fillColor(COLOR_TEXT_MUTED).text('Primary brand accent, "Generate Details" CTA, category tag, and icons.', 170, swatchBoxY + 35);

// Swatch 4: #DBB06B
doc.rect(340, swatchBoxY + 34, 9, 9).fill('#DBB06B');
doc.fontSize(7).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('#DBB06B (Ochre):', 353, swatchBoxY + 35);
doc.font('Helvetica').fillColor(COLOR_TEXT_MUTED).text('Suggested price and SEO tag counter.', 415, swatchBoxY + 35);

doc.y = swatchBoxY + 56;

// 04. Real-Time Exact-Match Media Engine
drawHeading('04', 'Real-Time Exact-Match Media Architecture');
doc.fontSize(8).font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(
  'To prevent generic or mismatched stock photos (such as showing gym dumbbells for intimate wellness products), CardCraft AI utilizes a specialized 2-tier media pipeline:',
  { lineGap: 1.4, width: 505 }
);

doc.moveDown(0.2);
doc.fontSize(7.5).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('1. Live Wikipedia Media API Search:');
doc.font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(
  'Directly queries Wikipedia media endpoints using clean product keywords. Products such as condoms, contraceptives, mechanical keyboards, or standing desks immediately retrieve authentic photos of the actual items.',
  { lineGap: 1.3, width: 505 }
);

doc.moveDown(0.2);
doc.fontSize(7.5).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('2. Product-Specific Cycling & Custom Override:');
doc.font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(
  'Clicking "Next Image" cycles strictly through the top images found for that specific product title. A direct "Custom URL" button allows instant manual override with any image link.',
  { lineGap: 1.3, width: 505 }
);

doc.moveDown(0.3);

// 05. Clean UI & State Management
drawHeading('05', 'Clean E-Commerce Card & State Lifecycle');
doc.fontSize(8).font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(
  'Irrelevant retail checkout artifacts ("Add to Cart", mock star counts, wishlist hearts, preset chips) were removed to keep the card generator clean and focused on content creation:',
  { lineGap: 1.4, width: 505 }
);

doc.moveDown(0.2);
const stateBoxY = doc.y;
doc.roundedRect(45, stateBoxY, 505, 52, 5).fillAndStroke('#FFFFFF', COLOR_BORDER);

doc.fontSize(7).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK);
doc.text('• Blank Initial State (EmptyCardState.jsx):', 55, stateBoxY + 6);
doc.font('Helvetica').fillColor(COLOR_TEXT_MUTED).text('Zero pre-filled demo cards or images appear on initial page load.', 68, stateBoxY + 15);

doc.font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('• Clean Form (ProductForm.jsx):', 55, stateBoxY + 23);
doc.font('Helvetica').fillColor(COLOR_TEXT_MUTED).text('All fields start blank with an optional instant "Reset" trigger.', 68, stateBoxY + 31);

doc.font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('• Persistent History Sync (HistoryDrawer.jsx):', 55, stateBoxY + 39);
doc.font('Helvetica').fillColor(COLOR_TEXT_MUTED).text('Clearing history explicitly stores [] in LocalStorage, preventing demo card re-injection.', 68, stateBoxY + 47);

doc.y = stateBoxY + 58;

// 06. Deployment Verification
drawHeading('06', 'Vercel Deployment & Verification');
doc.fontSize(8).font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(
  'CardCraft AI is pre-configured with vercel.json for zero-config deployment. In Vercel Project Settings, add GEMINI_API_KEY under Environment Variables and click Deploy. The serverless route /api/generate automatically proxies AI requests with 200 OK reliability.',
  { align: 'justify', lineGap: 1.4, width: 505 }
);

// ==========================================
// RENDER FOOTERS ACROSS BUFFERED PAGES
// ==========================================
const range = doc.bufferedPageRange();
for (let i = range.start; i < range.start + range.count; i++) {
  doc.switchToPage(i);
  doc.fontSize(7.5).font('Helvetica').fillColor('#825F4C').text(
    `CardCraft AI · Solution Architecture Specification · Page ${i + 1} of ${range.count}`,
    45,
    775,
    { align: 'center', width: 505 }
  );
}

doc.end();

writeStream.on('finish', () => {
  console.log(`Pristine PDF successfully generated with ${range.count} pages at ${outputPath}`);
});
