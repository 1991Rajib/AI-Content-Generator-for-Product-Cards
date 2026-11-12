import React, { useState } from 'react';
import { getProductImage, getAlternativeImages } from '../utils/imageMapper';
import { 
  Star, 
  Copy, 
  Check, 
  Share2, 
  Tag, 
  Sparkles, 
  ShoppingCart, 
  Heart, 
  CheckCircle2, 
  Code2, 
  Download,
  Flame,
  ExternalLink,
  Image as ImageIcon,
  RotateCw
} from 'lucide-react';

export default function ProductCard({ cardData, source, onSaveToHistory }) {
  const [copiedType, setCopiedType] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState('');

  if (!cardData) return null;

  const defaultImg = getProductImage(cardData.title, cardData.category);

  const {
    title,
    shortDescription,
    tags = [],
    category,
    estimatedPrice = '$79.99',
    bulletPoints = [],
    badge = 'Featured Pick',
    imageUrl = defaultImg
  } = cardData;

  const allAlternatives = [imageUrl, ...getAlternativeImages(title, category).filter(img => img !== imageUrl)];
  const displayImage = customImageUrl || allAlternatives[currentImageIndex % allAlternatives.length] || defaultImg;

  const handleNextImage = () => {
    setCustomImageUrl('');
    setCurrentImageIndex((prev) => (prev + 1) % allAlternatives.length);
  };

  const handleSetCustomUrl = (e) => {
    e.preventDefault();
    if (customImageUrl.trim()) {
      setIsEditingUrl(false);
    }
  };

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(cardData, null, 2));
    setCopiedType('json');
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleCopyFullText = () => {
    const text = `Product: ${title}\nCategory: ${category}\nPrice: ${estimatedPrice}\n\nDescription:\n${shortDescription}\n\nKey Highlights:\n${bulletPoints.map(b => `• ${b}`).join('\n')}\n\nKeywords: ${tags.map(t => `#${t}`).join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopiedType('full');
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Top Quick Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Generated Card Preview
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            Live Preview
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopyJson}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs border border-slate-700 transition-all"
            title="Copy structured JSON data"
          >
            {copiedType === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code2 className="w-3.5 h-3.5 text-indigo-400" />}
            <span>{copiedType === 'json' ? 'Copied JSON!' : 'Copy JSON'}</span>
          </button>

          <button
            onClick={handleCopyFullText}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-xs border border-slate-700 transition-all"
            title="Copy full formatted card text"
          >
            {copiedType === 'full' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-indigo-400" />}
            <span>{copiedType === 'full' ? 'Copied All!' : 'Copy Card Text'}</span>
          </button>
        </div>
      </div>

      {/* Main E-Commerce Product Card */}
      <div className="glass-card rounded-2xl overflow-hidden border border-slate-750 shadow-2xl hover:border-slate-700 transition-all duration-300 relative group">
        
        {/* Card Header Media */}
        <div className="relative h-60 w-full overflow-hidden bg-slate-900">
          <img
            src={displayImage}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>

          {/* Badge & Favorite */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 text-xs font-semibold text-amber-300 shadow-md">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{badge}</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handleNextImage}
                className="px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white transition-colors shadow-md"
                title="Change or cycle product photo"
              >
                <RotateCw className="w-3 h-3 text-indigo-400" />
                <span>Shuffle Photo</span>
              </button>

              <button
                onClick={() => setIsEditingUrl(!isEditingUrl)}
                className="px-2 py-1 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 flex items-center gap-1 text-[11px] font-medium text-slate-300 hover:text-white transition-colors shadow-md"
                title="Paste a custom image link"
              >
                <ImageIcon className="w-3 h-3 text-indigo-400" />
                <span>URL</span>
              </button>

              <button
                onClick={() => setIsLiked(!isLiked)}
                className="w-8 h-8 rounded-full bg-slate-900/80 backdrop-blur-md border border-slate-700/60 flex items-center justify-center text-slate-300 hover:text-rose-400 transition-colors shadow-md"
                title="Add to wishlist"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
              </button>
            </div>
          </div>

          {/* Optional Custom Image URL Bar */}
          {isEditingUrl && (
            <div className="absolute inset-x-3 bottom-12 p-2 rounded-xl bg-slate-900/95 backdrop-blur-md border border-slate-700 z-10 animate-in fade-in">
              <form onSubmit={handleSetCustomUrl} className="flex gap-2">
                <input
                  type="url"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="Paste direct image URL (https://...)"
                  className="flex-1 px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs border border-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold"
                >
                  Apply
                </button>
              </form>
            </div>
          )}

          {/* Category Tag overlay */}
          <div className="absolute bottom-3 left-4">
            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-indigo-500/80 backdrop-blur-md text-white border border-indigo-400/30">
              {category}
            </span>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-6 space-y-4">
          
          {/* Rating and Reviews */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-bold text-white">4.9</span>
              <span className="text-xs text-slate-400">(320+ reviews)</span>
            </div>
            
            <div className="text-xs text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>In Stock</span>
            </div>
          </div>

          {/* Product Title */}
          <div>
            <h3 className="text-xl font-bold text-white tracking-tight leading-snug font-display hover:text-indigo-300 transition-colors">
              {title}
            </h3>
          </div>

          {/* Product Short Description */}
          <div className="relative p-3.5 rounded-xl bg-slate-900/70 border border-slate-800/80">
            <p className="text-sm text-slate-300 leading-relaxed">
              {shortDescription}
            </p>
            <button
              onClick={() => handleCopy(shortDescription, 'desc')}
              className="absolute top-2.5 right-2.5 p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
              title="Copy description"
            >
              {copiedType === 'desc' ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Bullet Points / Key Highlights */}
          {bulletPoints.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Key Highlights:
              </div>
              <ul className="space-y-1">
                {bulletPoints.map((point, index) => (
                  <li key={index} className="text-xs text-slate-300 flex items-start gap-2">
                    <span className="text-indigo-400 mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Keywords / Tags */}
          <div className="space-y-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-indigo-400" />
                <span>SEO Keywords & Tags ({tags.length})</span>
              </span>
              <button
                onClick={() => handleCopy(tags.map(t => `#${t}`).join(' '), 'tags')}
                className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
              >
                {copiedType === 'tags' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copiedType === 'tags' ? 'Copied Tags' : 'Copy All Tags'}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  onClick={() => handleCopy(`#${tag}`, `tag-${idx}`)}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-indigo-950/40 border border-indigo-800/40 text-indigo-300 hover:bg-indigo-900/50 hover:text-white cursor-pointer transition-all"
                  title="Click to copy hashtag"
                >
                  <span className="text-indigo-400/80">#</span>
                  <span>{tag}</span>
                  {copiedType === `tag-${idx}` && <Check className="w-3 h-3 text-emerald-400 ml-0.5" />}
                </span>
              ))}
            </div>
          </div>

          {/* Card Footer: Price & CTA */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Suggested Price</span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold text-white font-display">{estimatedPrice}</span>
                <span className="text-xs text-slate-400 line-through">
                  ${(parseFloat(estimatedPrice.replace(/[^0-9.]/g, '')) * 1.35 || 99.99).toFixed(2)}
                </span>
              </div>
            </div>

            <button
              onClick={() => alert(`Added "${title}" to e-commerce showcase!`)}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 flex items-center gap-2 transition-all cursor-pointer"
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Store</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

