import React, { useState, useEffect } from 'react';
import { fetchImagesForProduct, getImmediateProductImage } from '../utils/imageService';
import { 
  Copy, 
  Check, 
  Tag, 
  Code2, 
  RotateCw,
  Image as ImageIcon,
  Flame,
  CheckCircle2
} from 'lucide-react';

export default function ProductCard({ cardData }) {
  const [copiedType, setCopiedType] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState('');

  if (!cardData) return null;

  const {
    title,
    shortDescription,
    tags = [],
    category,
    estimatedPrice = '$24.99',
    bulletPoints = [],
    badge = 'Top Rated'
  } = cardData;

  // Whenever the card's product title changes, search for images matching THIS product
  useEffect(() => {
    let isMounted = true;
    const initialImg = getImmediateProductImage(title, category);
    setProductImages([initialImg]);
    setCurrentImageIndex(0);
    setCustomImageUrl('');

    fetchImagesForProduct(title, category).then((imgs) => {
      if (isMounted && imgs && imgs.length > 0) {
        setProductImages(imgs);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [title, category]);

  const activeImage = customImageUrl || productImages[currentImageIndex % productImages.length] || getImmediateProductImage(title, category);

  const handleCycleImage = () => {
    setCustomImageUrl('');
    setCurrentImageIndex((prev) => (prev + 1) % productImages.length);
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
    const text = `Product: ${title}\nCategory: ${category}\nEstimated Price: ${estimatedPrice}\n\nDescription:\n${shortDescription}\n\nKey Highlights:\n${bulletPoints.map(b => `• ${b}`).join('\n')}\n\nKeywords: ${tags.map(t => `#${t}`).join(', ')}`;
    navigator.clipboard.writeText(text);
    setCopiedType('full');
    setTimeout(() => setCopiedType(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Top Quick Actions Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
            Generated Card Preview
          </span>
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 font-medium">
            Live Preview
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopyJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs border border-zinc-800 transition-all cursor-pointer"
            title="Copy structured JSON data"
          >
            {copiedType === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Code2 className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copiedType === 'json' ? 'Copied JSON!' : 'Copy JSON'}</span>
          </button>

          <button
            onClick={handleCopyFullText}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs border border-zinc-800 transition-all cursor-pointer"
            title="Copy full formatted card text"
          >
            {copiedType === 'full' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
            <span>{copiedType === 'full' ? 'Copied All!' : 'Copy Card Content'}</span>
          </button>
        </div>
      </div>

      {/* Main Product Card */}
      <div className="glass-card rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl transition-all duration-300 relative group">
        
        {/* Card Header Media */}
        <div className="relative h-64 w-full overflow-hidden bg-zinc-950 flex items-center justify-center">
          <img
            src={activeImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e1015] via-transparent to-black/30"></div>

          {/* Badges & Image Switcher */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-950/85 backdrop-blur-md border border-amber-500/30 text-xs font-semibold text-amber-400 shadow-md">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>{badge}</span>
            </div>

            {/* Cycle Image Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCycleImage}
                className="px-2.5 py-1 rounded-full bg-zinc-950/85 backdrop-blur-md border border-zinc-700/80 flex items-center gap-1.5 text-[11px] font-medium text-zinc-300 hover:text-white hover:border-amber-500/50 transition-colors shadow-md cursor-pointer"
                title={`Cycle to next image for "${title}" (${(currentImageIndex % (productImages.length || 1)) + 1}/${productImages.length || 1})`}
              >
                <RotateCw className="w-3 h-3 text-amber-400" />
                <span>Next Image ({productImages.length > 1 ? `${(currentImageIndex % productImages.length) + 1}/${productImages.length}` : '1'})</span>
              </button>

              <button
                onClick={() => setIsEditingUrl(!isEditingUrl)}
                className="px-2.5 py-1 rounded-full bg-zinc-950/85 backdrop-blur-md border border-zinc-700/80 flex items-center gap-1 text-[11px] font-medium text-zinc-300 hover:text-white hover:border-amber-500/50 transition-colors shadow-md cursor-pointer"
                title="Paste a custom image URL"
              >
                <ImageIcon className="w-3 h-3 text-amber-400" />
                <span>Custom URL</span>
              </button>
            </div>
          </div>

          {/* Optional Custom Image URL Bar */}
          {isEditingUrl && (
            <div className="absolute inset-x-3 bottom-12 p-2 rounded-xl bg-zinc-950/95 backdrop-blur-md border border-zinc-700 z-10 animate-in fade-in">
              <form onSubmit={handleSetCustomUrl} className="flex gap-2">
                <input
                  type="url"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="Paste direct image URL (https://...)"
                  className="flex-1 px-3 py-1.5 rounded-lg bg-zinc-900 text-white text-xs border border-zinc-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 text-xs font-bold cursor-pointer"
                >
                  Apply
                </button>
              </form>
            </div>
          )}

          {/* Category Tag overlay */}
          <div className="absolute bottom-3 left-4">
            <span className="text-xs font-medium px-2.5 py-1 rounded-md bg-amber-500/90 text-zinc-950 font-bold backdrop-blur-md">
              {category}
            </span>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-6 space-y-4">
          
          {/* Product Title (with Copy Title) */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-bold text-white tracking-tight leading-snug font-display hover:text-amber-400 transition-colors">
              {title}
            </h3>
            <button
              onClick={() => handleCopy(title, 'title')}
              className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all shrink-0 cursor-pointer"
              title="Copy Title"
            >
              {copiedType === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Product Short Description */}
          <div className="relative p-4 rounded-xl bg-zinc-900/80 border border-zinc-800">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-amber-500/90 mb-1.5">
              Short Description:
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed pr-6">
              {shortDescription}
            </p>
            <button
              onClick={() => handleCopy(shortDescription, 'desc')}
              className="absolute top-3 right-3 p-1 rounded-md text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all cursor-pointer"
              title="Copy Description"
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
              <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Key Highlights:
              </div>
              <ul className="space-y-1">
                {bulletPoints.map((point, index) => (
                  <li key={index} className="text-xs text-zinc-300 flex items-start gap-2">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Keywords / Tags */}
          <div className="space-y-2 pt-2 border-t border-zinc-800/80">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-amber-500" />
                <span>SEO Keywords & Tags ({tags.length})</span>
              </span>
              <button
                onClick={() => handleCopy(tags.map(t => `#${t}`).join(' '), 'tags')}
                className="text-[11px] text-amber-400 hover:text-amber-300 flex items-center gap-1 cursor-pointer"
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
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-amber-400 hover:bg-zinc-850 hover:text-amber-300 hover:border-amber-500/40 cursor-pointer transition-all"
                  title="Click to copy hashtag"
                >
                  <span className="text-amber-500/70">#</span>
                  <span>{tag}</span>
                  {copiedType === `tag-${idx}` && <Check className="w-3 h-3 text-emerald-400 ml-0.5" />}
                </span>
              ))}
            </div>
          </div>

          {/* Suggested Price Footer */}
          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-zinc-500 uppercase tracking-wider block">Suggested Retail Price</span>
              <span className="text-xl font-bold text-white font-display">{estimatedPrice}</span>
            </div>
            <div className="text-xs text-zinc-400">
              <span className="px-2.5 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-zinc-300 text-[11px]">
                {tags.length} SEO Tags Generated
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
