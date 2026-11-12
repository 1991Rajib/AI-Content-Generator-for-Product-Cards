import React, { useState } from 'react';
import { Sparkles, Wand2, Layers, RefreshCw, Lightbulb, AlertCircle, RotateCcw } from 'lucide-react';

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

export default function ProductForm({ onGenerate, onReset, isLoading, error }) {
  // All fields blank at initial
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [tone, setTone] = useState('persuasive');
  const [features, setFeatures] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleResetForm = () => {
    setProductName('');
    setCategory('');
    setTone('persuasive');
    setFeatures('');
    setValidationError('');
    if (onReset) onReset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName.trim()) {
      setValidationError('Please enter a product name.');
      return;
    }
    if (!category.trim()) {
      setValidationError('Please select a product category.');
      return;
    }
    setValidationError('');
    onGenerate({
      productName: productName.trim(),
      category: category.trim(),
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
    <div className="peach-panel rounded-2xl p-6 sm:p-7 relative overflow-hidden bg-white/95">
      {/* Decorative Fresh Peach ambient glow */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-[#FFD3AC]/40 rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-lg font-bold text-[#28160E] flex items-center gap-2 font-display">
            <Wand2 className="w-5 h-5 text-[#E39A7B]" />
            Product Details Generator
          </h2>
          <p className="text-xs text-[#825F4C] mt-0.5">
            Fill in the fields to generate a styled product card
          </p>
        </div>

        {/* Reset / Blank Form Button */}
        {(productName || category || features) && (
          <button
            type="button"
            onClick={handleResetForm}
            className="text-xs text-[#825F4C] hover:text-[#E39A7B] flex items-center gap-1 font-semibold px-2 py-1 rounded-lg border border-[#E39A7B]/20 hover:border-[#E39A7B] transition-all cursor-pointer"
            title="Reset all fields to blank"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* Preset Quick Fill Pills */}
      <div className="mb-6">
        <div className="flex items-center gap-1.5 text-xs text-[#825F4C] mb-2 font-semibold">
          <Lightbulb className="w-3.5 h-3.5 text-[#DBB06B]" />
          <span>Quick Inspiration Presets (Optional):</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((preset, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleApplyPreset(preset)}
              className="text-xs px-2.5 py-1 rounded-lg bg-[#FFD3AC]/25 hover:bg-[#FFB5AB]/35 border border-[#FFB5AB]/50 text-[#5C3A29] hover:text-[#28160E] transition-all text-left flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span className="font-semibold">{preset.name}</span>
              <span className="text-[10px] text-[#A3735B] font-mono">({preset.category})</span>
            </button>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Name (Required) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2C1D] mb-1.5">
            Product Name <span className="text-[#E39A7B]">*</span>
          </label>
          <input
            type="text"
            value={productName}
            onChange={(e) => {
              setProductName(e.target.value);
              if (validationError) setValidationError('');
            }}
            placeholder="Enter product name (e.g., Wireless Gaming Mouse)..."
            className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E39A7B]/30 text-[#28160E] placeholder-[#B5917D] text-sm focus:outline-none focus:ring-2 focus:ring-[#E39A7B]/25 focus:border-[#E39A7B] transition-all shadow-2xs"
            disabled={isLoading}
          />
        </div>

        {/* Category (Required) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2C1D] mb-1.5">
            Category <span className="text-[#E39A7B]">*</span>
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                if (validationError) setValidationError('');
              }}
              className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#E39A7B]/30 text-[#28160E] text-sm focus:outline-none focus:ring-2 focus:ring-[#E39A7B]/25 focus:border-[#E39A7B] transition-all appearance-none cursor-pointer shadow-2xs font-semibold"
              disabled={isLoading}
            >
              <option value="" disabled className="text-zinc-400">
                Select a category...
              </option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-white text-[#28160E]">
                  {cat}
                </option>
              ))}
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#E39A7B]">
              <Layers className="w-4 h-4" />
            </div>
          </div>
        </div>

        {/* Tone of Voice */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2C1D] mb-1.5">
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
                    ? 'bg-[#FFD3AC]/45 border-[#E39A7B] text-[#28160E] shadow-xs'
                    : 'bg-white border-[#E39A7B]/25 text-[#6B4B3B] hover:text-[#28160E] hover:border-[#FFB5AB]'
                }`}
              >
                <div className="font-bold">{t.label}</div>
                <div className="text-[11px] text-[#825F4C] mt-0.5 line-clamp-1">{t.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Optional Key Highlights */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4A2C1D] mb-1.5 flex items-center justify-between">
            <span>Key Highlights (Optional)</span>
            <span className="text-[11px] text-[#A3735B] font-normal">Features, specs, materials</span>
          </label>
          <input
            type="text"
            value={features}
            onChange={(e) => setFeatures(e.target.value)}
            placeholder="e.g., Ergonomic grip, 80hr battery, RGB backlighting"
            className="w-full px-4 py-2 rounded-xl bg-white border border-[#E39A7B]/30 text-[#28160E] placeholder-[#B5917D] text-xs focus:outline-none focus:ring-2 focus:ring-[#E39A7B]/25 focus:border-[#E39A7B] transition-all shadow-2xs"
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
          className="w-full mt-2 py-3 px-5 rounded-xl btn-peach-gradient font-bold text-sm flex items-center justify-center gap-2 transition-all transform active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
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
