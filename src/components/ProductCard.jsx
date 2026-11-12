import React, { useState, useEffect } from 'react';
import { fetchImagesForProduct, getImmediateProductImage } from '../utils/imageService';
import { 
  Copy, 
  Check, 
  Tag, 
  Code2, 
  RotateCw,
  Image as ImageIcon,
  Flame
} from 'lucide-react';

export default function ProductCard({ cardData }) {
  const [copiedType, setCopiedType] = useState(null);
  const [productImages, setProductImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [customImageUrl, setCustomImageUrl] = useState('');

  if (!cardData) return null;

  const {
    productName = '',
    title = '',
    shortDescription,
    tags = [],
    category,
    estimatedPrice = '$24.99',
    bulletPoints = [],
    badge = 'Top Rated'
  } = cardData;

  // Prioritize raw product name entered by user, fallback to title
  const searchQuery = productName || title;

  // Search for images matching THIS product
  useEffect(() => {
    let isMounted = true;
    const initialImg = getImmediateProductImage(searchQuery, category);
    setProductImages([initialImg]);
    setCurrentImageIndex(0);
    setCustomImageUrl('');

    fetchImagesForProduct(searchQuery, category).then((imgs) => {
      if (isMounted && imgs && imgs.length > 0) {
        setProductImages(imgs);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [searchQuery, category]);

  const activeImage = customImageUrl || productImages[currentImageIndex % productImages.length] || getImmediateProductImage(searchQuery, category);

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
          <span className="text-xs font-bold uppercase tracking-wider text-[#825F4C]">
            Generated Card Preview
          </span>
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FFD3AC]/40 text-[#853E23] border border-[#FFB5AB] font-bold">
            Live Preview
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleCopyJson}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#FFD3AC]/20 text-[#5C3A29] hover:text-[#28160E] text-xs font-semibold border border-[#E39A7B]/30 transition-all cursor-pointer shadow-2xs"
            title="Copy structured JSON data"
          >
            {copiedType === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Code2 className="w-3.5 h-3.5 text-[#E39A7B]" />}
            <span>{copiedType === 'json' ? 'Copied JSON!' : 'Copy JSON'}</span>
          </button>

          <button
            onClick={handleCopyFullText}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-[#FFD3AC]/20 text-[#5C3A29] hover:text-[#28160E] text-xs font-semibold border border-[#E39A7B]/30 transition-all cursor-pointer shadow-2xs"
            title="Copy full formatted card text"
          >
            {copiedType === 'full' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#E39A7B]" />}
            <span>{copiedType === 'full' ? 'Copied All!' : 'Copy Card Content'}</span>
          </button>
        </div>
      </div>

      {/* Main Product Card */}
      <div className="peach-card rounded-2xl overflow-hidden transition-all duration-300 relative group bg-white">
        
        {/* Card Header Media */}
        <div className="relative h-64 w-full overflow-hidden bg-[#FFD3AC]/20 flex items-center justify-center">
          <img
            src={activeImage}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20"></div>

          {/* Badges & Image Switcher */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#FFB5AB] text-xs font-bold text-[#853E23] shadow-sm">
              <Flame className="w-3.5 h-3.5 text-[#E39A7B]" />
              <span>{badge}</span>
            </div>

            {/* Cycle Image Controls */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handleCycleImage}
                className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E39A7B]/30 flex items-center gap-1.5 text-[11px] font-semibold text-[#5C3A29] hover:text-[#E39A7B] hover:border-[#E39A7B] transition-colors shadow-sm cursor-pointer"
                title={`Cycle to next image for "${title}" (${(currentImageIndex % (productImages.length || 1)) + 1}/${productImages.length || 1})`}
              >
                <RotateCw className="w-3 h-3 text-[#E39A7B]" />
                <span>Next Image ({productImages.length > 1 ? `${(currentImageIndex % productImages.length) + 1}/${productImages.length}` : '1'})</span>
              </button>

              <button
                onClick={() => setIsEditingUrl(!isEditingUrl)}
                className="px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md border border-[#E39A7B]/30 flex items-center gap-1 text-[11px] font-semibold text-[#5C3A29] hover:text-[#E39A7B] hover:border-[#E39A7B] transition-colors shadow-sm cursor-pointer"
                title="Paste a custom image URL"
              >
                <ImageIcon className="w-3 h-3 text-[#E39A7B]" />
                <span>Custom URL</span>
              </button>
            </div>
          </div>

          {/* Optional Custom Image URL Bar */}
          {isEditingUrl && (
            <div className="absolute inset-x-3 bottom-12 p-2 rounded-xl bg-white/98 backdrop-blur-md border border-[#E39A7B]/40 z-10 animate-in fade-in shadow-md">
              <form onSubmit={handleSetCustomUrl} className="flex gap-2">
                <input
                  type="url"
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="Paste direct image URL (https://...)"
                  className="flex-1 px-3 py-1.5 rounded-lg bg-[#FFF8F2] text-[#28160E] text-xs border border-[#E39A7B]/30 focus:outline-none focus:ring-1 focus:ring-[#E39A7B]"
                />
                <button
                  type="submit"
                  className="px-3.5 py-1.5 rounded-lg bg-[#E39A7B] hover:bg-[#D48866] text-white text-xs font-bold cursor-pointer"
                >
                  Apply
                </button>
              </form>
            </div>
          )}

          {/* Category Tag overlay */}
          <div className="absolute bottom-3 left-4">
            <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-[#E39A7B] text-white shadow-sm">
              {category}
            </span>
          </div>
        </div>

        {/* Card Content Body */}
        <div className="p-6 space-y-4">
          
          {/* Product Title (with Copy Title) */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-xl font-bold text-[#28160E] tracking-tight leading-snug font-display hover:text-[#E39A7B] transition-colors">
              {title}
            </h3>
            <button
              onClick={() => handleCopy(title, 'title')}
              className="p-1.5 rounded-lg bg-[#FFD3AC]/30 border border-[#E39A7B]/30 text-[#825F4C] hover:text-[#28160E] hover:border-[#E39A7B] transition-all shrink-0 cursor-pointer shadow-2xs"
              title="Copy Title"
            >
              {copiedType === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#E39A7B]" />}
            </button>
          </div>

          {/* Product Short Description */}
          <div className="relative p-4 rounded-xl bg-[#FFD3AC]/15 border border-[#E39A7B]/25">
            <div className="text-[10px] font-bold uppercase tracking-wider text-[#E39A7B] mb-1.5">
              Short Description:
            </div>
            <p className="text-sm text-[#381F14] leading-relaxed pr-6 font-medium">
              {shortDescription}
            </p>
            <button
              onClick={() => handleCopy(shortDescription, 'desc')}
              className="absolute top-3 right-3 p-1 rounded-md text-[#825F4C] hover:text-[#28160E] hover:bg-[#FFD3AC]/40 transition-all cursor-pointer"
              title="Copy Description"
            >
              {copiedType === 'desc' ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-[#E39A7B]" />
              )}
            </button>
          </div>

          {/* Bullet Points / Key Highlights */}
          {bulletPoints.length > 0 && (
            <div className="space-y-1.5 pt-1">
              <div className="text-xs font-bold uppercase tracking-wider text-[#825F4C]">
                Key Highlights:
              </div>
              <ul className="space-y-1">
                {bulletPoints.map((point, index) => (
                  <li key={index} className="text-xs text-[#4A2C1D] flex items-start gap-2">
                    <span className="text-[#E39A7B] mt-0.5 font-bold">•</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Keywords / Tags */}
          <div className="space-y-2 pt-2 border-t border-[#E39A7B]/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#825F4C] flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-[#E39A7B]" />
                <span>SEO Keywords & Tags ({tags.length})</span>
              </span>
              <button
                onClick={() => handleCopy(tags.map(t => `#${t}`).join(' '), 'tags')}
                className="text-[11px] text-[#E39A7B] hover:text-[#C77854] font-bold flex items-center gap-1 cursor-pointer"
              >
                {copiedType === 'tags' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedType === 'tags' ? 'Copied Tags' : 'Copy All Tags'}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag, idx) => (
                <span
                  key={idx}
                  onClick={() => handleCopy(`#${tag}`, `tag-${idx}`)}
                  className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-lg bg-[#FFD3AC]/35 border border-[#FFB5AB] text-[#7A3219] hover:bg-[#FFB5AB]/40 hover:text-[#52200E] cursor-pointer transition-all font-semibold shadow-2xs"
                  title="Click to copy hashtag"
                >
                  <span className="text-[#E39A7B]">#</span>
                  <span>{tag}</span>
                  {copiedType === `tag-${idx}` && <Check className="w-3 h-3 text-emerald-600 ml-0.5" />}
                </span>
              ))}
            </div>
          </div>

          {/* Suggested Price Footer */}
          <div className="pt-3 border-t border-[#E39A7B]/20 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#825F4C] uppercase tracking-wider font-bold block">Suggested Retail Price</span>
              <span className="text-xl font-bold text-[#28160E] font-display">{estimatedPrice}</span>
            </div>
            <div className="text-xs">
              <span className="px-2.5 py-1 rounded-md bg-[#DBB06B]/20 border border-[#DBB06B]/40 text-[#7A5418] text-[11px] font-bold">
                {tags.length} SEO Tags Generated
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
