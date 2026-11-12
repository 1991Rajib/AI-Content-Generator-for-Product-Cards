import React, { useState } from 'react';
import { Sparkles, Wand2, Tag, Layers, RefreshCw, Lightbulb, AlertCircle } from 'lucide-react';

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
  { name: 'Aura Wireless ANC Headphones', category: 'Electronics', tone: 'luxury' },
  { name: 'ErgoRest Bamboo Standing Desk', category: 'Home & Kitchen', tone: 'minimalist' },
  { name: 'HydraSilk Bio-Peptide Serum', category: 'Beauty & Personal Care', tone: 'persuasive' },
  { name: 'AeroPulse Ultralight Running Shoes', category: 'Health & Fitness', tone: 'playful' }
];

const TONES = [
  { id: 'persuasive', label: 'Persuasive & High-Converting', desc: 'Focus on benefits, urgency & ROI' },
  { id: 'luxury', label: 'Luxury & Elegant', desc: 'Prestige, craftsmanship & exclusivity' },
  { id: 'minimalist', label: 'Minimalist & Direct', desc: 'Clean, understated & factual' },
  { id: 'playful', label: 'Playful & Engaging', desc: 'Warm, vibrant & charismatic' }
];

export default function ProductForm({ onGenerate, isLoading, error }) {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('Electronics');
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
    <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-slate-800 shadow-xl relative overflow-hidden">
      {/* Decorative gradient blur */}
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-white flex items-center gap-2 font-display">
            <Wand2 className="w-5 h-5 text-indigo-400" />
            Product Input Details
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Enter product info to generate an AI-powered e-commerce card
          </p>
        </div>
      </div>

      {/* Preset Quick Fill Pills */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-2">
          <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
          <span>Quick Inspiration Presets:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 text-slate-300 hover:text-white transition-all text-left flex items-center gap-1.5"
            >
              <span>{preset.name}</span>
              <span className="text-[10px] text-slate-500 font-mono">({preset.category})</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name (Required) */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Product Name <span className="text-rose-400">*</span>
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
              if (validationError) setValidationError('');
            }}
            placeholder="e.g., Lumina Pro Ergonomic Wireless Keyboard"
            className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
            disabled={isLoading}
          />
        </div>

        {/* Category (Required) */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Category <span className="text-rose-400">*</span>
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all appearance-none cursor-pointer"
              disabled={isLoading}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-900 text-white">
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
              <Layers className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Tone of Voice */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
            Copywriting Tone
          </label>
          <div className="grid grid-cols-2 gap-2">
            {TONES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTone(t.id)}
                disabled={isLoading}
                className={`p-2.5 rounded-xl text-left border transition-all text-xs ${
                  tone === t.id
                    ? 'bg-indigo-600/20 border-indigo-500 text-white shadow-sm'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-semibold">{t.label}</div>
                <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Optional Key Highlights */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5 flex items-center justify-between">
            <span>Key Highlights (Optional)</span>
            <span className="text-[11px] text-slate-500 font-normal">Features, specs, materials</span>
          </label>
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            placeholder="e.g., 40hr battery, active noise cancelling, memory foam earcups"
            className="w-full px-4 py-2 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all"
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
          className="w-full mt-2 py-3 px-5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating AI Details...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              <span>Generate Details</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}

