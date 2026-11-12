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
    <div className="glass-panel rounded-2xl p-6 sm:p-7 border border-[#F5DFCE] shadow-sm relative overflow-hidden bg-white/95">
      {/* Decorative Fresh Peach ambient blur */}
      <div className="absolute -top-16 -right-16 w-44 h-44 bg-[#FFD3AC]/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-[#2D1A0E] flex items-center gap-2 font-display">
            <Wand2 className="w-5 h-5 text-[#ED6F00]" />
            Product Details Generator
          </h2>
          <p className="text-xs text-[#785642] mt-0.5">
            AI-driven copy & SEO tags tailored to your product
          </p>
        </div>
      </div>

      {/* Preset Quick Fill Pills */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-xs text-[#785642] mb-2 font-medium">
          <Lightbulb className="w-3.5 h-3.5 text-[#ED6F00]" />
          <span>Quick Inspiration Presets:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="text-xs px-2.5 py-1 rounded-lg bg-[#FFF5ED] hover:bg-[#FFEAD9] border border-[#F3DAC8] text-[#4A2E1B] hover:text-[#2D1A0E] transition-all text-left flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span className="font-medium">{preset.name}</span>
              <span className="text-[10px] text-[#A67C52] font-mono">({preset.category})</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name (Required) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2E1B] mb-1.5">
            Product Name <span className="text-[#ED6F00]">*</span>
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
              if (validationError) setValidationError('');
            }}
            placeholder="e.g., Ultra-Thin Latex Condom 12-Pack"
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F3DAC8] text-[#2D1A0E] placeholder-[#A68875] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF881E]/30 focus:border-[#ED6F00] transition-all shadow-2xs"
            disabled={isLoading}
          />
        </div>

        {/* Category (Required) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2E1B] mb-1.5">
            Category <span className="text-[#ED6F00]">*</span>
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#F3DAC8] text-[#2D1A0E] text-sm focus:outline-none focus:ring-2 focus:ring-[#FF881E]/30 focus:border-[#ED6F00] transition-all appearance-none cursor-pointer shadow-2xs font-medium"
              disabled={isLoading}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-white text-[#2D1A0E]">
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#A67C52]">
              <Layers className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Tone of Voice */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2E1B] mb-1.5">
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
                    ? 'bg-[#FFEAD9] border-[#ED6F00] text-[#2D1A0E] shadow-xs'
                    : 'bg-white border-[#F3DAC8] text-[#5C3E28] hover:text-[#2D1A0E] hover:border-[#FFBA7D]'
                }`}
              >
                <div className="font-bold">{t.label}</div>
                <div className="text-[11px] text-[#785642] mt-0.5 line-clamp-1">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Optional Key Highlights */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2E1B] mb-1.5 flex items-center justify-between">
            <span>Key Highlights (Optional)</span>
            <span className="text-[11px] text-[#A67C52] font-normal">Specs, materials, features</span>
          </label>
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            placeholder="e.g., Ultra-sensitive, premium silicone lubricant, reservoir tip"
            className="w-full px-4 py-2 rounded-xl bg-white border border-[#F3DAC8] text-[#2D1A0E] placeholder-[#A68875] text-xs focus:outline-none focus:ring-2 focus:ring-[#FF881E]/30 focus:border-[#ED6F00] transition-all shadow-2xs"
            disabled={isLoading}
          />
        </div>

        {/* Error Banners */}
        {(validationError || error) && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{validationError || error}</span>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#ED6F00] via-[#FF881E] to-[#FFA14D] hover:from-[#BE5900] hover:to-[#ED6F00] text-white font-bold text-sm shadow-md shadow-orange-500/25 flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-white" />
              <span>Generating AI Details...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-white" />
              <span>Generate Details</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
}
