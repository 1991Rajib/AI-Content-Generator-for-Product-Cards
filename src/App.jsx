import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ProductForm from './components/ProductForm';
import ProductCard from './components/ProductCard';
import CardSkeleton from './components/CardSkeleton';
import HistoryDrawer from './components/HistoryDrawer';
import ApiKeyModal from './components/ApiKeyModal';
import { generateProductDetails } from './services/aiService';
import { getProductImage } from './utils/imageMapper';
import { Sparkles, Layers, ShieldCheck, Zap, Info } from 'lucide-react';

const INITIAL_CARD = {
  id: 'demo-init-1',
  title: 'Aura Studio Pro Wireless ANC Headphones',
  shortDescription: 'Immerse yourself in precision-tuned acoustic clarity. Engineered with 40mm beryllium drivers, active hybrid noise cancellation, and ultra-soft memory foam cushions for all-day listening luxury.',
  tags: ['WirelessAudio', 'ActiveNoiseCancelling', 'HighFidelity', 'Bluetooth5.3', 'ErgonomicFit', 'StudioGrade'],
  category: 'Electronics',
  estimatedPrice: '$189.00',
  bulletPoints: [
    'Up to 45 hours playtime with rapid USB-C fast charging',
    'Customizable sound profiles via multi-platform companion app',
    'Aircraft-grade lightweight aluminum frame with fold-flat hinge'
  ],
  badge: 'Best Seller',
  imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  timestamp: Date.now()
};

export default function App() {
  const [activeCard, setActiveCard] = useState(INITIAL_CARD);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [generationSource, setGenerationSource] = useState('gemini-api');
  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [customApiKey, setCustomApiKey] = useState('');
  const [history, setHistory] = useState([]);

  // Load custom API key and history from localStorage
  useEffect(() => {
    try {
      const savedKey = localStorage.getItem('cardcraft_api_key');
      if (savedKey) setCustomApiKey(savedKey);

      const savedHistory = localStorage.getItem('cardcraft_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      } else {
        setHistory([INITIAL_CARD]);
      }
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  const handleSaveCustomKey = (key) => {
    setCustomApiKey(key);
    if (key) {
      localStorage.setItem('cardcraft_api_key', key);
    } else {
      localStorage.removeItem('cardcraft_api_key');
    }
  };

  const handleClearCustomKey = () => {
    setCustomApiKey('');
    localStorage.removeItem('cardcraft_api_key');
  };

  const handleGenerate = async ({ productName, category, tone, features }) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await generateProductDetails({
        productName,
        category,
        tone,
        features,
        customApiKey
      });

      const dynamicImage = getProductImage(productName, category);

      const newCard = {
        id: `card-${Date.now()}`,
        ...result.data,
        imageUrl: dynamicImage, // Dynamic image matching generated product
        timestamp: Date.now()
      };

      setActiveCard(newCard);
      setGenerationSource(result.source || 'gemini-api');

      // Update History
      const updatedHistory = [newCard, ...history.filter(h => h.id !== newCard.id)].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem('cardcraft_history', JSON.stringify(updatedHistory));

    } catch (err) {
      console.error('Generation failed:', err);
      setError(err.message || 'Failed to generate product details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setHistory([]);
    localStorage.removeItem('cardcraft_history');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 bg-mesh selection:bg-indigo-500 selection:text-white flex flex-col justify-between">
      
      {/* Top Header */}
      <div>
        <Header
          onOpenKeyModal={() => setIsKeyModalOpen(true)}
          hasCustomKey={Boolean(customApiKey)}
          generationSource={generationSource}
        />

        {/* Main Content Area */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          
          {/* Hero Banner */}
          <div className="mb-8 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Assignment 2 · AI Content Generator for Product Cards</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-display">
              Turn Product Ideas into <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400">High-Converting Cards</span>
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-2 max-w-3xl leading-relaxed">
              Enter any product name and category to generate optimized SEO titles, persuasive marketing copy, and high-impact keyword tags powered by Google Gemini AI.
            </p>
          </div>

          {/* Grid Layout: Input Form (Left) & Visual Card Preview (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Form Column (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <ProductForm
                onGenerate={handleGenerate}
                isLoading={isLoading}
                error={error}
              />
            </div>

            {/* Preview Column (7 Cols) */}
            <div className="lg:col-span-7">
              {isLoading ? (
                <CardSkeleton />
              ) : (
                <ProductCard
                  cardData={activeCard}
                  source={generationSource}
                />
              )}
            </div>

          </div>

          {/* History Drawer */}
          <HistoryDrawer
            history={history}
            onSelectCard={(item) => setActiveCard(item)}
            onClearHistory={handleClearHistory}
            activeCardId={activeCard?.id}
          />

        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 mt-12 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Indus Net Technologies Assessment · Developed by Rajib</p>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Vercel Serverless Ready</span>
            </span>
            <span>·</span>
            <span>Google Gemini REST API</span>
          </div>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isKeyModalOpen}
        onClose={() => setIsKeyModalOpen(false)}
        currentKey={customApiKey}
        onSaveKey={handleSaveCustomKey}
        onClearKey={handleClearCustomKey}
      />

    </div>
  );
}

