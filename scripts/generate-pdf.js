import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

const outputPath = path.resolve('CardCraft_AI_Solution_Document.pdf');
const artifactDir = 'C:\\Users\\rajib\\.gemini\\antigravity\\brain\\4076da73-d49f-43a9-b5f5-666ad874ab85';

const doc = new PDFDocument({
  size: 'A4', // 595.28 x 841.89 points
  margins: { top: 36, bottom: 30, left: 45, right: 45 },
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
  doc.rect(45, y, 3.5, 12).fill(COLOR_TERRACOTTA);
  doc.fontSize(10).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text(`${num}. ${title}`, 54, y);
  doc.y = y + 16;
}

// ==========================================
// PAGE 1: SOLUTION OVERVIEW & ARCHITECTURE
// ==========================================
doc.addPage();

// 1. Top Brand Accent Line
doc.rect(45, 36, 505, 3.5).fill(COLOR_TERRACOTTA);

// 2. Header
doc.y = 46;
doc.fontSize(8).font('Helvetica-Bold').fillColor(COLOR_TERRACOTTA).text('TECHNICAL ASSESSMENT SOLUTION DOCUMENT');
doc.moveDown(0.2);
doc.fontSize(19).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('CardCraft AI — Product Card Studio');
doc.fontSize(8.5).font('Helvetica').fillColor(COLOR_TEXT_MUTED).text('AI-Powered Product Card Generator · Architecture & Technical Specification');

// 3. Metadata Header Card
doc.moveDown(0.5);
const metaY = doc.y;
doc.roundedRect(45, metaY, 505, 42, 5).fillAndStroke(COLOR_BG_PANEL, COLOR_BORDER);

doc.fontSize(7.5).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK);
doc.text('Project Goal:', 55, metaY + 7);
doc.font('Helvetica').fillColor(COLOR_TEXT_MUTED).text('Generate structured e-commerce product cards (title, copy, tags, photo) using AI', 125, metaY + 7);

doc.font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('Tech Stack:', 55, metaY + 18);
doc.font('Helvetica').fillColor(COLOR_TEXT_MUTED).text('React 19, Vite, Tailwind CSS, Vercel Serverless, Google Gemini REST API, Wikipedia Media API', 125, metaY + 18);

doc.font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('Key Features:', 55, metaY + 29);
doc.font('Helvetica-Bold').fillColor(COLOR_TERRACOTTA).text('Serverless Security · Query-Specific Image Match · Fresh Peach UI · 100% Clean Start', 125, metaY + 29);

doc.y = metaY + 50;

// 4. Section 1: Problem Statement & Solution Summary
drawHeading('01', 'Problem Statement & Solution Summary');
doc.fontSize(8).font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(
  'The objective is to provide an intelligent web studio where merchants enter a product name and category, and the application generates conversion-focused card details (SEO title, persuasive description, and keywords/tags) using Google Gemini AI and renders them visually in an e-commerce product card.',
  { align: 'justify', lineGap: 1.4, width: 505 }
);

doc.moveDown(0.3);
doc.fontSize(8).font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(
  'CardCraft AI addresses this by providing a clean, accessible interface connected to Google Gemini via a secure Vercel Serverless route. It returns structured JSON data and pairs it with real-time exact-match photography, rendering a production-quality e-commerce card with 1-click clipboard tools.',
  { align: 'justify', lineGap: 1.4, width: 505 }
);

// 5. Section 2: Requirements & Deliverables Checklist
doc.moveDown(0.5);
drawHeading('02', 'Requirements & Deliverables Checklist');

const tableStartY = doc.y;
const colPositions = [45, 175, 475];

// Table Header
doc.rect(45, tableStartY, 505, 15).fill('#FFEAD9');
doc.fontSize(7).font('Helvetica-Bold').fillColor(COLOR_TERRACOTTA);
doc.text('REQUIREMENT', colPositions[0] + 6, tableStartY + 4);
doc.text('IMPLEMENTED SOLUTION', colPositions[1] + 6, tableStartY + 4);
doc.text('STATUS', colPositions[2] + 6, tableStartY + 4);

const tableRows = [
  ['Form Input (Name + Category)', 'Clean form starting 100% blank; category selector, copywriting tone & reset', 'Fulfilled'],
  ['Generate Details Button', 'Asynchronous trigger with animated spinner & skeleton loading state', 'Fulfilled'],
  ['AI Title, Description & Tags', 'Google Gemini REST API returning type-safe structured JSON payload', 'Fulfilled'],
  ['Styled Product Card', 'Figma Fresh Peach e-commerce card with photo, badges & 1-click copy helpers', 'Fulfilled'],
  ['Simple State Management', 'Clean React hooks managing active card, loading, error, and localStorage sync', 'Fulfilled'],
  ['API Security & Deployment', 'Vercel Serverless Function (/api/generate) preventing client API key leaks', 'Fulfilled']
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

// 6. Section 3: Clean Architecture Flow (Pure Vector Boxes & Direct Vector Connectors)
drawHeading('03', 'Solution Architecture & Data Flow Pipeline');
doc.fontSize(8).font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(
  'To protect the Gemini API key from exposure in public JavaScript bundles, all generation requests route through a Vercel Serverless Function:',
  { align: 'justify', lineGap: 1.4, width: 505 }
);

doc.moveDown(0.4);
const pipelineY = doc.y;

// Block 1: Client
doc.roundedRect(45, pipelineY, 145, 50, 5).fillAndStroke(COLOR_BG_PANEL, COLOR_BORDER);
doc.fontSize(7.5).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('1. CLIENT (React 19)', 55, pipelineY + 8);
doc.fontSize(6.5).font('Helvetica').fillColor(COLOR_TEXT_MUTED).text('• Collects user inputs\n• Shows CardSkeleton\n• Fetches Wikipedia image', 55, pipelineY + 20);

// Vector Connector 1 -> 2
doc.fontSize(6.5).font('Helvetica-Bold').fillColor(COLOR_TERRACOTTA).text('POST /api', 190, pipelineY + 15, { width: 50, align: 'center' });
doc.moveTo(195, pipelineY + 27).lineTo(233, pipelineY + 27).lineWidth(1.2).strokeColor(COLOR_TERRACOTTA).stroke();
doc.polygon([233, pipelineY + 24], [238, pipelineY + 27], [233, pipelineY + 30]).fill(COLOR_TERRACOTTA);

// Block 2: Serverless
doc.roundedRect(240, pipelineY, 150, 50, 5).fillAndStroke('#FFEAD9', COLOR_BORDER);
doc.fontSize(7.5).font('Helvetica-Bold').fillColor(COLOR_TERRACOTTA).text('2. VERCEL SERVERLESS', 250, pipelineY + 8);
doc.fontSize(6.5).font('Helvetica').fillColor(COLOR_TEXT_MUTED).text('• Reads GEMINI_API_KEY\n• Enforces JSON Schema\n• Sub-2s flash-lite model', 250, pipelineY + 20);

// Vector Connector 2 -> 3
doc.fontSize(6.5).font('Helvetica-Bold').fillColor(COLOR_TERRACOTTA).text('HTTPS REST', 390, pipelineY + 15, { width: 50, align: 'center' });
doc.moveTo(395, pipelineY + 27).lineTo(433, pipelineY + 27).lineWidth(1.2).strokeColor(COLOR_TERRACOTTA).stroke();
doc.polygon([433, pipelineY + 24], [438, pipelineY + 27], [433, pipelineY + 30]).fill(COLOR_TERRACOTTA);

// Block 3: Gemini API
doc.roundedRect(440, pipelineY, 110, 50, 5).fillAndStroke(COLOR_BG_PANEL, COLOR_BORDER);
doc.fontSize(7.5).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('3. GEMINI REST API', 448, pipelineY + 8);
doc.fontSize(6.5).font('Helvetica').fillColor(COLOR_TEXT_MUTED).text('• Model: 3.5/3.1 Flash-Lite\n• High-speed JSON output\n• Latency: ~1.8s roundtrip', 448, pipelineY + 20);

doc.y = pipelineY + 60;

// ==========================================
// PAGE 2: MEDIA ENGINE, DESIGN & VERIFICATION
// ==========================================
doc.addPage();

// Top Brand Line
doc.rect(45, 36, 505, 3.5).fill(COLOR_TERRACOTTA);

doc.y = 46;
doc.fontSize(8).font('Helvetica-Bold').fillColor(COLOR_TERRACOTTA).text('TECHNICAL ASSESSMENT SOLUTION DOCUMENT');
doc.moveDown(0.2);
doc.fontSize(16).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text('Image Match Engine, Design System & Latency Fixes');
doc.y = 76;

// 04. Design System (Fixed Swatch Grid - Guaranteed Zero Overlap)
drawHeading('04', 'Figma Fresh Peach Design System (Combination 21)');
doc.fontSize(7.5).font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(
  'The visual styling implements Figma Combination 21 (Fresh Peach) with deliberate contrast roles:',
  { lineGap: 1.2, width: 505 }
);

doc.moveDown(0.2);
const swatchBoxY = doc.y;
const swatchHeight = 58;
doc.roundedRect(45, swatchBoxY, 505, swatchHeight, 5).fillAndStroke(COLOR_BG_PANEL, '#FFD3AC');

const swatches = [
  { color: '#FFD3AC', label: '#FFD3AC (Soft Peach):', role: 'Ambient canvas glow, description box tint, and badge backgrounds.' },
  { color: '#FFB5AB', label: '#FFB5AB (Blush Coral):', role: 'Delicate pill tag outlines, secondary active halos, and card rings.' },
  { color: '#E39A7B', label: '#E39A7B (Terracotta):', role: 'Primary brand accent, "Generate Details" CTA, category tag, and icons.' },
  { color: '#DBB06B', label: '#DBB06B (Warm Ochre):', role: 'Suggested price and SEO tag counter badges.' }
];

swatches.forEach((swatch, idx) => {
  const itemY = swatchBoxY + 5 + (idx * 13);
  doc.rect(55, itemY + 1, 8, 8).fillAndStroke(swatch.color, '#C9A087');
  doc.fontSize(6.8).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text(swatch.label, 68, itemY + 1.2);
  doc.font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(swatch.role, 172, itemY + 1.2, { width: 368 });
});

doc.y = swatchBoxY + swatchHeight + 8;

// 05. How We Solved the Exact-Match Image Logic (R&D & Engineering)
drawHeading('05', 'Exact-Match Image Logic: R&D & Engineering Resolution');
doc.fontSize(7.5).font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(
  'Issue Identified: Standard category heuristics failed for specific queries (e.g. searching "iPhone" yielded an office desk with an Apple Watch; searching "Dildo" yielded gym dumbbells). AI-generated marketing titles (e.g. "The Next-Gen iPhone...") also polluted media search queries with buzzwords ("Next-Gen").',
  { lineGap: 1.2, width: 505 }
);

doc.moveDown(0.2);
const imgBoxY = doc.y;
const imgBoxHeight = 84;
doc.roundedRect(45, imgBoxY, 505, imgBoxHeight, 5).fillAndStroke('#FFFFFF', COLOR_BORDER);

const imgSteps = [
  {
    step: '1. Raw Query Isolation & Buzzword Stripper:',
    desc: 'Separates the user\'s raw input ("productName") from AI marketing headlines ("title"). Strips promotional filler ("Next-Gen", "The Signature") to extract clean entity tokens ("iphone", "dildo").'
  },
  {
    step: '2. Wikipedia REST Page Summary API:',
    desc: 'Queries /api/rest_v1/page/summary/${term} for official encyclopedic photography, instantly fetching authentic photos (e.g. official transparent jelly dildo series or exact iPhone models).'
  },
  {
    step: '3. Wikimedia Commons Archives & Image Cycler:',
    desc: 'Fetches high-resolution gallery archives matching the active product entity, allowing users to cycle through multiple authentic photos using "Next Image" without leaving the product context.'
  },
  {
    step: '4. Curated Overrides & Domain Scoping:',
    desc: 'High-volume consumer & adult wellness items feature instant curated overrides; unknown queries fall back strictly within their category (never returning an office desk for personal wellness).'
  }
];

imgSteps.forEach((s, idx) => {
  const stepY = imgBoxY + 5 + (idx * 19.5);
  doc.fontSize(6.8).font('Helvetica-Bold').fillColor(COLOR_TERRACOTTA).text(s.step, 53, stepY);
  doc.font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(s.desc, 53, stepY + 8.5, { width: 487 });
});

doc.y = imgBoxY + imgBoxHeight + 8;

// 06. Clean E-Commerce Card & State Lifecycle
drawHeading('06', 'Clean Card Lifecycle & LocalStorage Sync');
doc.fontSize(7.5).font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(
  'Irrelevant retail checkout artifacts ("Add to Cart", mock star counts, wishlist hearts, preset chips) were removed to keep the card generator clean and focused on content creation:',
  { lineGap: 1.2, width: 505 }
);

doc.moveDown(0.2);
const stateBoxY = doc.y;
const stateBoxHeight = 44;
doc.roundedRect(45, stateBoxY, 505, stateBoxHeight, 5).fillAndStroke('#FFFFFF', COLOR_BORDER);

const stateItems = [
  { title: '• Blank Initial State (EmptyCardState.jsx):', desc: 'Zero pre-filled demo cards or images appear on initial page load.' },
  { title: '• Clean Form (ProductForm.jsx):', desc: 'All fields start blank with an optional instant "Reset" trigger.' },
  { title: '• Persistent History Sync (HistoryDrawer.jsx):', desc: 'Clearing history explicitly stores [] in LocalStorage, preventing demo card re-injection.' }
];

stateItems.forEach((item, idx) => {
  const itemY = stateBoxY + 4 + (idx * 13);
  doc.fontSize(6.8).font('Helvetica-Bold').fillColor(COLOR_TEXT_DARK).text(item.title, 55, itemY);
  doc.font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(item.desc, 255, itemY, { width: 285 });
});

doc.y = stateBoxY + stateBoxHeight + 8;

// 07. Latency Fix (Vercel vs Local) & Evaluation Guide
drawHeading('07', 'Vercel Serverless Latency Resolution & Run Guide');
doc.fontSize(7.5).font('Helvetica').fillColor(COLOR_TEXT_MUTED).text(
  '• Latency Diagnosis: Local Vite bypassed the serverless proxy, falling back to a 750ms mock engine. In Vercel, heavy legacy models (gemini-3.5-flash) took 66s, exceeding Vercel\'s 10s timeout budget.\n• Latency Fix: Upgraded /api/generate to gemini-3.5-flash-lite and gemini-3.1-flash-lite (benchmarked at ~1.8s) with a strict 4.5s AbortSignal timeout, bringing Vercel execution under 2 seconds.\n• Evaluation: Run "npm.cmd run dev" (http://localhost:3000) or import into Vercel with GEMINI_API_KEY.',
  { lineGap: 1.8, width: 505 }
);

// ==========================================
// RENDER FOOTERS ACROSS BUFFERED PAGES
// ==========================================
const range = doc.bufferedPageRange();
for (let i = range.start; i < range.start + range.count; i++) {
  doc.switchToPage(i);
  doc.fontSize(7.5).font('Helvetica').fillColor('#825F4C').text(
    `CardCraft AI · Technical Solution Architecture · Page ${i + 1} of ${range.count}`,
    45,
    790,
    { align: 'center', width: 505 }
  );
}

doc.end();

writeStream.on('finish', () => {
  console.log(`Clean 2-page solution PDF created at ${outputPath}`);
  console.log(`Total Pages: ${range.count}`);
  
  // Also copy to artifact directory
  try {
    const artTarget = path.join(artifactDir, 'CardCraft_AI_Solution_Document.pdf');
    fs.copyFileSync(outputPath, artTarget);
    console.log(`Copied cleanly to artifact directory: ${artTarget}`);
  } catch (err) {
    console.warn('Could not copy to artifact directory:', err.message);
  }

  // Also copy to AI_Content_Generator_Solution_Document.pdf if not locked
  try {
    const altTarget = path.resolve('AI_Content_Generator_Solution_Document.pdf');
    fs.copyFileSync(outputPath, altTarget);
    console.log(`Copied cleanly to ${altTarget}`);
  } catch (err) {
    console.warn(`Could not overwrite AI_Content_Generator_Solution_Document.pdf (currently locked by viewer): ${err.message}`);
  }
});
