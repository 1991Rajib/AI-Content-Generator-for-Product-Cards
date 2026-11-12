import React, { useState } from 'react';
import { Sparkles, Wand2, Layers, RefreshCw, Lightbulb, AlertCircle } from 'lucide-react';

const CATEGORIES = [
  'Electronics',
  'Fashion & Apparel',
  'Home & Kitchen',
  'Health & Fitness',
  'Beauty & Personal Care',
  'Books & Stationery',
  'Sports & Outdoors',
  'Automotive & Gadgets'
];

const PRESETS = [
  { name: 'Ultra-Thin Latex Protection Pack', category: 'Health & Fitness', tone: 'persuasive' },
  { name: 'Aura Wireless ANC Headphones', category: 'Electronics', tone: 'luxury' },
  { name: 'ErgoRest Bamboo Standing Desk', category: 'Home & Kitchen', tone: 'minimalist' },
  { name: 'HydraSilk Bio-Peptide Serum', category: 'Beauty & Personal Care', tone: 'persuasive' }
];

const TONES = [
  { id: 'persuasive', label: 'Persuasive & Converting', desc: 'Benefits, clarity & conversion' },
  { id: 'luxury', label: 'Luxury & Elegant', desc: 'Craftsmanship, prestige & detail' },
  { id: 'minimalist', label: 'Minimalist & Direct', desc: 'Clean, essential utility' },
  { id: 'playful', label: 'Playful & Engaging', desc: 'Charismatic, lively & warm' }
];

export default function ProductForm({ onGenerate, isLoading, error }) {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Health & Fitness');
  const [tone, setTone] = useState('persuasive');
  const [features, setFeatures] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName.trim()) {
      setValidationError('Please enter a product name to generate details.');
      return;
    }
    setValidationError('');
    onGenerate({
      productName: productName.trim(),
      category,
      tone,
      features: features.trim()
    });
  };

  const handleApplyPreset = (preset) => {
    setProductName(preset.name);
    setCategory(preset.category);
    setTone(preset.tone);
    setValidationError('');
  };

  return (
    <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-zinc-800 shadow-xl relative overflow-hidden">
      {/* Decorative warm ambient blur */}
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-amber-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <Wand2 className="w-5 h-5 text-amber-500" />
            Product Details Generator
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            AI-driven copy & SEO tags tailored to your product
          </p>
        </div>
      </div>

      {/* Preset Quick Fill Pills */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-xs text-zinc-400 mb-2">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Inspiration Presets:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="text-xs px-2.5 py-1 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white transition-all text-left flex items-center gap-1.5 cursor-pointer"
            >
              <span>{preset.name}</span>
              <span className="text-[10px] text-zinc-500 font-mono">({preset.category})</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name (Required) */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
            Product Name <span className="text-amber-500">*</span>
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
              if (validationError) setValidationError('');
            }}
            placeholder="e.g., Ultra-Thin Latex Condom 12-Pack"
            className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/90 border border-zinc-800 text-white placeholder-zinc-500 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
            disabled={isLoading}
          />
        </div>

        {/* Category (Required) */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
            Category <span className="text-amber-500">*</span>
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-zinc-950/90 border border-zinc-800 text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all appearance-none cursor-pointer"
              disabled={isLoading}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-zinc-900 text-white">
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Tone of Voice */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5">
            Copywriting Tone
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TONES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTone(t.id)}
                disabled={isLoading}
                className={`p-2.5 rounded-xl text-left border transition-all text-xs cursor-pointer ${
                  tone === t.id
                    ? 'bg-amber-500/15 border-amber-500/70 text-white shadow-sm'
                    : 'bg-zinc-950/50 border-zinc-850 text-zinc-400 hover:text-zinc-300 hover:border-zinc-750'
                }`}
              >
                <div className="font-semibold">{t.label}</div>
                <div className="text-[11px] text-zinc-400 mt-0.5 line-clamp-1">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Optional Key Highlights */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-1.5 flex items-center justify-between">
            <span>Key Highlights (Optional)</span>
            <span className="text-[11px] text-zinc-500 font-normal">Specs, materials, features</span>
          </label>
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            placeholder="e.g., Ultra-sensitive, premium silicone lubricant, reservoir tip"
            className="w-full px-4 py-2 rounded-xl bg-zinc-950/90 border border-zinc-800 text-white placeholder-zinc-500 text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/40 focus:border-amber-500 transition-all"
            disabled={isLoading}
          />
        </div>

        {/* Error Banners */}
        {(validationError || error) && (
          <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{validationError || error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3 px-5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-zinc-950 font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-zinc-950" />
              <span>Generating AI Details...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-zinc-950" />
              <span>Generate Details</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
