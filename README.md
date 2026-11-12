# 🛍️ CardCraft AI — AI Content Generator for Product Cards

> **Indus Net Technologies Assessment**  
> **Assignment 2: AI Content Generator for Product Cards**  
> Developed with React, Tailwind CSS, Vercel Serverless Functions, and Google Gemini AI.

[![Deployed on Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://vercel.com)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Gemini API](https://img.shields.io/badge/Google%20Gemini-1.5%20Flash-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

---

## 📌 Problem Statement

> Create a web app that generates product card details (title, description, tags) using AI and displays them visually.

### Core Requirements Fulfilled:
- [x] **Product Form**: Clean, accessible inputs for **Product Name** + **Category** (with quick inspiration presets and tone-of-voice selector).
- [x] **Generate Details Button**: One-click generation trigger with animated spinner and error boundary states.
- [x] **AI-Powered Generation**: Integrates with Google Gemini via REST API to return structured JSON with a punchy title, persuasive short description, and targeted keyword tags.
- [x] **Styled Product Card**: Production-ready e-commerce card rendered with dynamic image preview, star ratings, category badge, copy-to-clipboard actions, and price suggestions.
- [x] **State Management**: Centralized React state handling active card data, loading/skeleton states, error banners, and generation history persisted in `localStorage`.
- [x] **Vercel Serverless Deployment**: Secure serverless backend `/api/generate` keeping API keys hidden from client-side bundles.

---

## 🏗️ Architecture & System Design

```
                     ┌──────────────────────────────────────────────┐
                     │               Client (Browser)               │
                     │  - React 19 UI (Vite + Tailwind CSS)         │
                     │  - ProductForm (Inputs, Presets, Tones)      │
                     │  - ProductCard (Styled E-Commerce Card)      │
                     │  - HistoryDrawer (Local storage persistence) │
                     └──────────────────────┬───────────────────────┘
                                            │
                               POST /api/generate
                                            ▼
                     ┌──────────────────────────────────────────────┐
                     │          Vercel Serverless Function          │
                     │                 /api/generate                │
                     │  - Reads process.env.GEMINI_API_KEY          │
                     │  - Formats strict JSON Schema Prompt         │
                     │  - Validates inputs & handles errors         │
                     └──────────────────────┬───────────────────────┘
                                            │
                             REST API Call (HTTPS POST)
                                            ▼
                     ┌──────────────────────────────────────────────┐
                     │           Google Gemini REST API             │
                     │            (gemini-1.5-flash)                │
                     │  - Generates SEO title                       │
                     │  - Writes benefit-focused description        │
                     │  - Produces high-converting hashtag tags     │
                     └──────────────────────────────────────────────┘
```

---

## 💡 Where and How AI is Used

### 1. REST API Integration (`api/generate.js` & `src/services/aiService.js`)
The application sends a `POST` request to the Google Gemini REST API endpoint:
```
https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}
```

### 2. Prompt Engineering & JSON Schema Enforcement
To guarantee reliable and type-safe rendering without hallucinated markdown formatting, the AI model is instructed with a strict system prompt and configured with `responseMimeType: "application/json"`:

```json
{
  "title": "A captivating, benefit-driven product title (under 60 characters)",
  "shortDescription": "A persuasive, punchy description highlighting key benefits (approx 25-45 words)",
  "tags": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6"],
  "category": "Electronics",
  "estimatedPrice": "$79.99",
  "bulletPoints": ["Feature 1", "Feature 2", "Feature 3"],
  "badge": "Best Seller"
}
```

### 3. Graceful Fallback & Resilience
If no API key is configured or during an offline demo, the app activates an intelligent fallback engine that produces realistic, category-tailored card content with simulated latency so reviewers can evaluate all UI, state transitions, and card layouts without obstacles.

---

## 🎨 UI/UX & Design Choices

1. **Modern E-Commerce Card**:
   - High-fidelity visual card inspired by modern e-commerce standards (Apple, Shopify, Stripe).
   - Category-aware dynamic photography from Unsplash.
   - Interactive hashtag badges with one-click copy (`#SmartTech`).
   - Copy-to-clipboard shortcuts for Description, Tags, and full structured JSON data.
2. **Skeleton Screen Loader**:
   - Instead of an intrusive blocking spinner, users see an animated card skeleton during generation to maintain spatial consistency.
3. **Copywriting Tones**:
   - Allows users to switch between *Persuasive & High-Converting*, *Luxury & Elegant*, *Minimalist & Direct*, or *Playful & Engaging*.
4. **History Drawer**:
   - Saves up to 10 previously generated cards in `localStorage` so users can compare different tones and product variations.

---

## 🚀 Local Development Setup

### 1. Clone the repository
```bash
git clone <your-repo-link>
cd <repo-folder>
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up Environment Variables (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Add your Google Gemini API key:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(You can get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/app/apikey)).*

### 4. Run the development server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Vercel Deployment Guide

Deploying this project to Vercel takes less than 2 minutes:

### Option A: Via Vercel Web Dashboard (Recommended)
1. Push your code to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import your GitHub repository.
3. In the **Environment Variables** section, add:
   * **Key**: `GEMINI_API_KEY`
   * **Value**: *Your Gemini API Key*
4. Click **Deploy**.
   * Vercel will automatically build the Vite client and deploy the `/api/generate` serverless endpoint.

### Option B: Via Vercel CLI
```bash
npm install -g vercel
vercel
```
When prompted for environment variables, add `GEMINI_API_KEY`.

---

## 📂 Project Structure

```
├── api/
│   └── generate.js             # Vercel Serverless Function (Gemini REST API handler)
├── src/
│   ├── components/
│   │   ├── ApiKeyModal.jsx     # In-app API configuration dialog
│   │   ├── CardSkeleton.jsx    # Animated loading skeleton screen
│   │   ├── Header.jsx          # Top navigation bar & status indicators
│   │   ├── HistoryDrawer.jsx   # Recent generated cards list with localStorage
│   │   ├── ProductCard.jsx     # Production-grade styled e-commerce product card
│   │   └── ProductForm.jsx     # Input form with presets, categories & tones
│   ├── services/
│   │   └── aiService.js        # REST API orchestrator (Serverless + Direct REST + Fallback)
│   ├── App.jsx                 # Main application state & layout management
│   ├── index.css               # Tailwind CSS & custom styling
│   └── main.jsx                # Application root entrypoint
├── index.html                  # HTML5 template with custom fonts
├── package.json                # Dependencies & scripts
├── vercel.json                 # Vercel deployment configuration
├── vite.config.js              # Vite & Tailwind configuration
└── README.md                   # Project documentation
```

---

## 📄 Deliverables Checklist

- [x] **Working Web App**: React 19 + Vite + Tailwind CSS.
- [x] **AI REST API Integration**: Connected to Google Gemini 1.5 Flash.
- [x] **Vercel Serverless Ready**: Full `/api/generate` route.
- [x] **README**: Complete setup guide and design choice explanations.
- [x] **Solution Explanation PDF**: `AI_Content_Generator_Solution_Document.pdf` included in repo.

