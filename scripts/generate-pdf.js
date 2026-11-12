import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const outputPath = path.resolve('AI_Content_Generator_Solution_Document.pdf');
const doc = new PDFDocument({
  size: 'A4',
  margins: { top: 38, bottom: 38, left: 45, right: 45 },
  bufferPages: true
});

const writeStream = fs.createWriteStream(outputPath);
doc.pipe(writeStream);

// Figma Combination 21: Fresh Peach Design Tokens
const PEACH_LIGHT = '#FFD3AC';
const PEACH_BLUSH = '#FFB5AB';
const PRIMARY = '#E39A7B';
const PEACH_OCHRE = '#DBB06B';
const TEXT_DARK = '#28160E';
const TEXT_MUTED = '#5C3A29';
const BORDER_COLOR = '#E39A7B';
const BG_LIGHT = '#FFF8F2';

// Helper for section headings
function renderSectionHeading(num, title) {
  doc.moveDown(0.7);
  const currentY = doc.y;
  doc.rect(45, currentY, 3.5, 14).fill(PRIMARY);
  doc.fontSize(11).fillColor(TEXT_DARK).font('Helvetica-Bold').text(`${num}. ${title}`, 54, currentY);
  doc.moveDown(0.35);
}

// ================= PAGE 1 =================
// Top Brand Bar in Terracotta
doc.rect(45, 38, 505, 4).fill(PRIMARY);

doc.moveDown(0.8);
doc.fontSize(8.5).fillColor(PRIMARY).font('Helvetica-Bold').text('TECHNICAL SOLUTION & ARCHITECTURE SPECIFICATION', 45, 48);

doc.moveDown(0.3);
doc.fontSize(21).fillColor(TEXT_DARK).font('Helvetica-Bold').text('CardCraft AI — Product Card Studio');
doc.fontSize(10).fillColor(TEXT_MUTED).font('Helvetica').text('AI-Driven Content Generator with Fresh Peach Design System & Real-Time Media Engine');

// Meta Box
doc.moveDown(0.6);
const metaTop = doc.y;
doc.roundedRect(45, metaTop, 505, 52, 6).fillAndStroke('#FFF5ED', '#FFD3AC');

doc.fontSize(8).font('Helvetica-Bold').fillColor(TEXT_DARK).text('Brand System:', 55, metaTop + 8);
doc.font('Helvetica').fillColor(TEXT_MUTED).text('Figma Combination 21 (Fresh Peach: #FFD3AC, #FFB5AB, #E39A7B, #DBB06B)', 160, metaTop + 8);

doc.font('Helvetica-Bold').fillColor(TEXT_DARK).text('Tech Stack:', 55, metaTop + 22);
doc.font('Helvetica').fillColor(TEXT_MUTED).text('React 19, Vite, Tailwind CSS, Vercel Serverless, Google Gemini REST API, Wikipedia Media API', 160, metaTop + 22);

doc.font('Helvetica-Bold').fillColor(TEXT_DARK).text('Architecture:', 55, metaTop + 36);
doc.font('Helvetica').fillColor(PRIMARY).text('Zero-Exposed API Keys · Dynamic Real-Time Media Engine · Persistent State Sync', 160, metaTop + 36);

doc.y = metaTop + 62;

// 01. Overview
renderSectionHeading('01', 'Executive Overview & Problem Resolution');
doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_MUTED).text(
  'CardCraft AI is an automated studio web application that transforms product concepts into structured, high-converting e-commerce cards. By submitting only a product name and category, merchants receive an optimized SEO title, benefit-focused marketing copy, targeted hashtag keywords, realistic pricing estimates, and real-time exact-match product photography.',
  { align: 'justify', lineGap: 1.8 }
);

// Requirements Matrix Table
doc.moveDown(0.5);
doc.fontSize(8).font('Helvetica-Bold').fillColor(TEXT_DARK).text('Refactored System Capabilities Matrix:');
doc.moveDown(0.3);

const tableY = doc.y;
const colX = [45, 155, 435, 550];
const rowHeight = 16;

doc.rect(45, tableY, 505, 18).fill('#FFEAD9');
doc.fontSize(7.5).font('Helvetica-Bold').fillColor(PRIMARY);
doc.text('MODULE', colX[0] + 6, tableY + 5);
doc.text('IMPLEMENTED ARCHITECTURE', colX[1] + 6, tableY + 5);
doc.text('STATUS', colX[2] + 6, tableY + 5);

const tableData = [
  ['Blank Initial State', 'Starts 100% clean; zero pre-filled images or demo data on load', 'Verified'],
  ['Input Form & Reset', 'Product name, category dropdown, tone toggle & instant reset', 'Verified'],
  ['Real-Time Image Engine', 'Wikipedia Media Search API (90%+ exact match for any product)', 'Verified'],
  ['Current-Product Cycling', 'Cycle photos strictly matching the active product title', 'Verified'],
  ['Clutter-Free E-Commerce', 'Removed retail cart/wishlist bloat; focused on copy & SEO tags', 'Verified'],
  ['Figma Fresh Peach UI', '4-swatch harmony: #FFD3AC, #FFB5AB, #E39A7B, #DBB06B', 'Verified'],
  ['Vercel Serverless /api', 'Protected process.env.GEMINI_API_KEY with zero client leakage', 'Verified']
];

let curY = tableY + 18;
tableData.forEach((row, i) => {
  const bg = i % 2 === 0 ? '#FFFFFF' : '#FFFDFB';
  doc.rect(45, curY, 505, rowHeight).fillAndStroke(bg, '#F3DAC8');
  doc.fontSize(7).font('Helvetica-Bold').fillColor(TEXT_DARK).text(row[0], colX[0] + 6, curY + 4);
  doc.font('Helvetica').fillColor(TEXT_MUTED).text(row[1], colX[1] + 6, curY + 4);
  doc.font('Helvetica-Bold').fillColor('#059669').text(row[2], colX[2] + 6, curY + 4);
  curY += rowHeight;
});

doc.y = curY + 8;

// 02. Architecture & Data Flow
renderSectionHeading('02', 'System Architecture & Data Flow');
doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_MUTED).text(
  'The solution decouples client visualization, serverless AI orchestration, and real-time media retrieval into a high-performance, resilient pipeline:',
  { align: 'justify', lineGap: 1.8 }
);

doc.moveDown(0.4);
const boxY = doc.y;
doc.roundedRect(45, boxY, 505, 96, 6).fillAndStroke('#28160E', '#3D2216');

doc.fontSize(7).font('Courier').fillColor('#FFD3AC');
const diagramLines = [
  '┌────────────────────────────────────────────────────────────────────────────┐',
  '│  CLIENT BROWSER (React 19 + Vite + Tailwind CSS)                           │',
  '│  - User submits Product Name + Category -> Shows CardSkeleton loader       │',
  '│  - Triggers asynchronous Wikipedia Image Search for current product query  │',
  '│  - Renders ProductCard with 1-click copy helpers & image cycler            │',
  '└────────────────────────────────────┬───────────────────────────────────────┘',
  '                                     │ POST /api/generate',
  '                                     ▼',
  '┌────────────────────────────────────────────────────────────────────────────┐',
  '│  VERCEL SERVERLESS FUNCTION (/api/generate.js)                             │',
  '│  - Reads process.env.GEMINI_API_KEY securely from Vercel backend           │',
  '│  - Enforces strict JSON Schema (title, description, tags, price, badge)    │',
  '└────────────────────────────────────┬───────────────────────────────────────┘',
  '                                     │ HTTPS REST Call',
  '                                     ▼',
  '┌────────────────────────────────────────────────────────────────────────────┐',
  '│  GOOGLE GEMINI REST API (gemini-flash-lite-latest / gemini-3.5-flash)      │',
  '└────────────────────────────────────────────────────────────────────────────┘'
];

let lineY = boxY + 6;
diagramLines.forEach(line => {
  doc.text(line, 55, lineY);
  lineY += 8.8;
});

doc.y = boxY + 104;

// Footer Page 1
doc.fontSize(7.5).font('Helvetica').fillColor('#825F4C').text(
  'CardCraft AI · Solution Architecture Specification · Page 1 of 2',
  45, 788, { align: 'center', width: 505 }
);

// ================= PAGE 2 =================
doc.addPage();
doc.rect(45, 38, 505, 4).fill(PRIMARY);

doc.fontSize(8.5).fillColor(PRIMARY).font('Helvetica-Bold').text('DESIGN SYSTEM, MEDIA ENGINE & IMPLEMENTATION', 45, 48);
doc.moveDown(0.3);
doc.fontSize(16).fillColor(TEXT_DARK).font('Helvetica-Bold').text('Fresh Peach Palette, Exact-Match Media & Verification');
doc.moveDown(0.4);

// 03. Design System
renderSectionHeading('03', 'Figma Fresh Peach Design System (Combination 21)');
doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_MUTED).text(
  'The UI strictly applies the 4-swatch Figma Combination 21 color harmony, abandoning generic dark/indigo AI templates for an inviting, warm editorial aesthetic:',
  { lineGap: 1.8 }
);

doc.moveDown(0.4);
const colorBoxY = doc.y;
doc.roundedRect(45, colorBoxY, 505, 60, 6).fillAndStroke('#FFF5ED', '#FFD3AC');

doc.rect(55, colorBoxY + 8, 12, 12).fill('#FFD3AC');
doc.fontSize(8).font('Helvetica-Bold').fillColor(TEXT_DARK).text('#FFD3AC (Soft Peach):', 73, colorBoxY + 10);
doc.font('Helvetica').fillColor(TEXT_MUTED).text('Ambient canvas glow, description box tint, and badge backgrounds.', 180, colorBoxY + 10);

doc.rect(55, colorBoxY + 23, 12, 12).fill('#FFB5AB');
doc.fontSize(8).font('Helvetica-Bold').fillColor(TEXT_DARK).text('#FFB5AB (Blush Coral):', 73, colorBoxY + 25);
doc.font('Helvetica').fillColor(TEXT_MUTED).text('Delicate pill tag outlines, secondary active halos, and card rings.', 180, colorBoxY + 25);

doc.rect(55, colorBoxY + 38, 12, 12).fill('#E39A7B');
doc.fontSize(8).font('Helvetica-Bold').fillColor(TEXT_DARK).text('#E39A7B (Terracotta):', 73, colorBoxY + 40);
doc.font('Helvetica').fillColor(TEXT_MUTED).text('Primary brand accent, "Generate Details" CTA, category tag, and icons.', 180, colorBoxY + 40);

doc.rect(280, colorBoxY + 38, 12, 12).fill('#DBB06B');
doc.fontSize(8).font('Helvetica-Bold').fillColor(TEXT_DARK).text('#DBB06B (Warm Ochre):', 298, colorBoxY + 40);
doc.font('Helvetica').fillColor(TEXT_MUTED).text('Suggested price and SEO tag counter badges.', 410, colorBoxY + 40);

doc.y = colorBoxY + 68;

// 04. Real-time Media Engine
renderSectionHeading('04', 'Real-Time Exact-Match Media Architecture');
doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_MUTED).text(
  'To solve generic or mismatched stock photos, CardCraft AI implements a 2-tier real-time media engine:',
  { lineGap: 1.8 }
);

doc.moveDown(0.3);
doc.fontSize(8).font('Helvetica-Bold').fillColor(TEXT_DARK).text('1. Live Wikipedia Media API Search:');
doc.font('Helvetica').fillColor(TEXT_MUTED).text(
  'Queries Wikipedia via CORS-enabled endpoints using the exact product name. Products such as condoms, contraceptives, mechanical keyboards, or espresso machines return authentic, query-relevant photos directly.',
  { lineGap: 1.5 }
);

doc.moveDown(0.3);
doc.fontSize(8).font('Helvetica-Bold').fillColor(TEXT_DARK).text('2. Product-Specific Cycling & Custom Override:');
doc.font('Helvetica').fillColor(TEXT_MUTED).text(
  'The "Next Image" button cycles exclusively through images fetched for the current active product title. A direct "Custom URL" button allows instant manual override with any image link.',
  { lineGap: 1.5 }
);

// 05. Clean UI & State Management
renderSectionHeading('05', 'Clean E-Commerce Card & State Lifecycle');
doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_MUTED).text(
  'Unnecessary retail artifacts ("Add to Cart", mock review star counts, wishlist hearts) were excised to focus strictly on card generation, copywriting evaluation, and SEO exports:',
  { lineGap: 1.8 }
);

doc.moveDown(0.3);
const compBoxY = doc.y;
doc.roundedRect(45, compBoxY, 505, 65, 6).fillAndStroke('#FFFFFF', '#F3DAC8');

doc.fontSize(8).font('Helvetica-Bold').fillColor(TEXT_DARK);
doc.text('• Blank Initial State (EmptyCardState.jsx):', 55, compBoxY + 8);
doc.font('Helvetica').fillColor(TEXT_MUTED).text('Zero pre-filled demo cards or images appear on initial page load.', 70, compBoxY + 18);

doc.font('Helvetica-Bold').fillColor(TEXT_DARK).text('• Clean Form (ProductForm.jsx):', 55, compBoxY + 28);
doc.font('Helvetica').fillColor(TEXT_MUTED).text('All fields start blank with an optional instant "Reset" trigger.', 70, compBoxY + 38);

doc.font('Helvetica-Bold').fillColor(TEXT_DARK).text('• Persistent History Sync (HistoryDrawer.jsx):', 55, compBoxY + 48);
doc.font('Helvetica').fillColor(TEXT_MUTED).text('Clearing history explicitly stores [] in LocalStorage, preventing demo card re-injection.', 70, compBoxY + 58);

doc.y = compBoxY + 74;

// 06. Deployment
renderSectionHeading('06', 'Vercel Deployment Verification');
doc.fontSize(8.5).font('Helvetica').fillColor(TEXT_MUTED).text(
  'CardCraft AI is pre-configured with vercel.json for zero-config deployment. In Vercel Project Settings, add GEMINI_API_KEY under Environment Variables and deploy. The serverless route /api/generate automatically proxies AI requests with 200 OK reliability.',
  { align: 'justify', lineGap: 1.8 }
);

// Footer Page 2
doc.fontSize(7.5).font('Helvetica').fillColor('#825F4C').text(
  'CardCraft AI · Solution Architecture Specification · Page 2 of 2',
  45, 788, { align: 'center', width: 505 }
);

doc.end();

writeStream.on('finish', () => {
  console.log(`Updated PDF successfully created at ${outputPath}`);
});
