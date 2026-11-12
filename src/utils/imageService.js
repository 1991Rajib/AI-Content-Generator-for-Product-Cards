// Intelligent Product Image Finder
// Combines real-time Wikipedia image search (for high exact-match accuracy)
// with high-res curated e-commerce photography fallback.

const CURATED_FALLBACKS = {
  condom: [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80'
  ],
  headphones: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
  ],
  watch: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
  ],
  shoes: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
  ],
  keyboard: [
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
  ],
  desk: [
    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1580481077114-118f67e7eb17?auto=format&fit=crop&w=800&q=80'
  ],
  coffee: [
    'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
  ],
  serum: [
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
  ],
  default: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'
  ]
};

// Memory cache for fetched query images
const queryCache = new Map();

/**
 * Searches real-time image sources for the EXACT product query.
 * Returns an array of matched images specific to this product.
 */
export async function fetchImagesForProduct(productName = '', category = '') {
  const cleanName = (productName || '').trim();
  const cacheKey = cleanName.toLowerCase();

  if (queryCache.has(cacheKey)) {
    return queryCache.get(cacheKey);
  }

  const results = [];

  // 1. Try Wikipedia Media Search for high accuracy matching
  try {
    // Simplify product name into primary search keyword (e.g. "Condom", "Mechanical keyboard", "Standing desk")
    const searchTerms = [
      cleanName,
      cleanName.split(' ').slice(0, 2).join(' ')
    ];

    for (const term of searchTerms) {
      if (!term || term.length < 2) continue;
      const url = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(term)}&gsrlimit=6&prop=pageimages&pithumbsize=900&format=json&origin=*`;
      
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        const pages = data.query?.pages;
        if (pages) {
          const imgs = Object.values(pages)
            .map(p => p.thumbnail?.source)
            .filter(Boolean)
            .filter(src => {
              const lower = src.toLowerCase();
              return !lower.includes('disambig') && 
                     !lower.includes('flag') && 
                     !lower.includes('map') && 
                     !lower.includes('art') &&
                     !lower.includes('painting');
            });

          if (imgs.length > 0) {
            results.push(...imgs);
            break;
          }
        }
      }
    }
  } catch (err) {
    console.warn('Live image search error, falling back:', err);
  }

  // 2. Add curated high-match fallback images for this specific query
  const lower = cleanName.toLowerCase();
  for (const [key, fallbackList] of Object.entries(CURATED_FALLBACKS)) {
    if (lower.includes(key)) {
      results.push(...fallbackList);
      break;
    }
  }

  // 3. Fallback if still empty
  if (results.length === 0) {
    results.push(...CURATED_FALLBACKS.default);
  }

  // Deduplicate
  const uniqueImages = [...new Set(results)];
  queryCache.set(cacheKey, uniqueImages);
  return uniqueImages;
}

/**
 * Synchronous initial image getter while async search resolves
 */
export function getImmediateProductImage(productName = '', category = '') {
  const lower = (productName || '').toLowerCase();
  for (const [key, fallbackList] of Object.entries(CURATED_FALLBACKS)) {
    if (lower.includes(key)) {
      return fallbackList[0];
    }
  }
  return CURATED_FALLBACKS.default[0];
}

