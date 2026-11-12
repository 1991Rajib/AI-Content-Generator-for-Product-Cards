// Intelligent Exact-Match Image Service
// Multi-tier pipeline:
// 1. Wikipedia Page Summary API (Exact encyclopedic match)
// 2. Wikipedia OpenSearch + Summary (Semantic candidate matching)
// 3. Wikimedia Commons Media Search (Real photo archives)
// 4. Curated Exact Keyword Mappings (Instant high-res overrides for popular products)
// 5. Category-Specific Semantic Fallbacks (Guaranteed zero category mismatch)

const CURATED_FALLBACKS = {
  // Adult & Intimate Wellness
  dildo: [
    'https://upload.wikimedia.org/wikipedia/commons/0/0f/Clear_jelly_dildo_series.png',
    'https://upload.wikimedia.org/wikipedia/commons/5/53/Dildo_PICT3774_small.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/3/38/Dildo_Stildo.jpg'
  ],
  vibrator: [
    'https://upload.wikimedia.org/wikipedia/commons/a/ac/Vibratoren_bunt_DSCF7424.jpg',
    'https://upload.wikimedia.org/wikipedia/commons/f/f6/Spielzeug_bunt_DSCF7403.jpg'
  ],
  condom: [
    'https://upload.wikimedia.org/wikipedia/commons/0/04/Kondom.jpg',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80'
  ],

  // Mobile & Consumer Tech
  iphone: [
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=800&q=80',
    'https://upload.wikimedia.org/wikipedia/commons/5/59/IPhone_4_Mock_No_Shadow_PSD.png'
  ],
  watch: [
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
  ],
  smartwatch: [
    'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=800&q=80'
  ],
  airpods: [
    'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?auto=format&fit=crop&w=800&q=80'
  ],
  headphones: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
  ],
  macbook: [
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80'
  ],
  laptop: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
  ],
  keyboard: [
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
  ],
  desk: [
    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1580481077114-118f67e7eb17?auto=format&fit=crop&w=800&q=80'
  ],

  // Apparel & Lifestyle
  shoes: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80'
  ],
  sneakers: [
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1607522370275-f14206abe5d3?auto=format&fit=crop&w=800&q=80'
  ],
  tshirt: [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80'
  ],

  // Cosmetics & Kitchen
  coffee: [
    'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
  ],
  serum: [
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80'
  ],
  skincare: [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=800&q=80'
  ]
};

const CATEGORY_FALLBACKS = {
  'Electronics': [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'
  ],
  'Fashion & Apparel': [
    'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'
  ],
  'Home & Kitchen': [
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80'
  ],
  'Health & Fitness': [
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80'
  ],
  'Beauty & Personal Care': [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80'
  ],
  'Books & Stationery': [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=800&q=80'
  ],
  'default': [
    'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
  ]
};

// Memory cache for fetched query images
const queryCache = new Map();

/**
 * Extracts the primary keyword from a user input or marketing title.
 * E.g., "The Next-Gen iPhone 16 Pro Max — High Performance" -> "iPhone"
 */
function extractCoreTerm(query = '') {
  let text = query.trim().toLowerCase();
  
  // Direct checks for priority exact matches
  if (text.includes('iphone')) return 'iphone';
  if (text.includes('apple watch')) return 'apple watch';
  if (text.includes('airpod')) return 'airpods';
  if (text.includes('macbook')) return 'macbook';
  if (text.includes('dildo')) return 'dildo';
  if (text.includes('vibrator')) return 'vibrator';
  if (text.includes('condom')) return 'condom';
  if (text.includes('keyboard')) return 'keyboard';
  if (text.includes('sneaker') || text.includes('shoes')) return 'shoes';
  if (text.includes('serum')) return 'serum';
  if (text.includes('coffee')) return 'coffee';

  // Strip common marketing buzzwords
  text = text.replace(/^(the|a|an|pro|next-gen|supercharged|signature|sleek|essential)\s+/i, '');
  text = text.replace(/\s*—.*$/, '');
  text = text.replace(/\s*-.*$/, '');
  text = text.replace(/\s*\bedition\b.*$/i, '');
  text = text.replace(/\s*\bseries\b.*$/i, '');
  
  return text.trim();
}

/**
 * Validates whether an image URL is a suitable product photo
 */
function isValidProductImage(url = '') {
  if (!url) return false;
  const lower = url.toLowerCase();
  return !lower.includes('disambig') &&
         !lower.includes('flag') &&
         !lower.includes('map') &&
         !lower.includes('painting') &&
         !lower.includes('coat_of_arms') &&
         !lower.includes('symbol');
}

/**
 * Searches real-time image sources for the EXACT product query.
 * Returns an array of matched images specific to this product.
 */
export async function fetchImagesForProduct(searchQuery = '', category = '') {
  const cleanTerm = extractCoreTerm(searchQuery) || (searchQuery || '').trim();
  const cacheKey = `${cleanTerm.toLowerCase()}::${category.toLowerCase()}`;

  if (queryCache.has(cacheKey)) {
    return queryCache.get(cacheKey);
  }

  const results = [];
  const lowerTerm = cleanTerm.toLowerCase();

  // Tier 0: Direct Curated Match (Highest quality high-res for targeted top products)
  for (const [key, list] of Object.entries(CURATED_FALLBACKS)) {
    if (lowerTerm.includes(key)) {
      results.push(...list);
      break;
    }
  }

  // Tier 1: Wikipedia Page Summary API (Exact Encyclopedic Image)
  try {
    const summaryUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cleanTerm)}`;
    const res = await fetch(summaryUrl);
    if (res.ok) {
      const data = await res.json();
      const img = data.originalimage?.source || data.thumbnail?.source;
      if (isValidProductImage(img)) {
        results.unshift(img); // Put authentic encyclopedic image first
      }
    }
  } catch (err) {
    // Non-blocking
  }

  // Tier 2: Wikipedia OpenSearch + Summary (Semantic candidate matching)
  try {
    const openUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${encodeURIComponent(cleanTerm)}&limit=4&namespace=0&format=json&origin=*`;
    const openRes = await fetch(openUrl);
    if (openRes.ok) {
      const openData = await openRes.json();
      const titles = openData[1] || [];
      for (const t of titles) {
        if (t.toLowerCase().includes('disambiguation') || t.toLowerCase().includes('newfoundland')) continue;
        try {
          const sUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(t)}`;
          const sRes = await fetch(sUrl);
          if (sRes.ok) {
            const sData = await sRes.json();
            const sImg = sData.originalimage?.source || sData.thumbnail?.source;
            if (isValidProductImage(sImg) && !results.includes(sImg)) {
              results.push(sImg);
            }
          }
        } catch (e) {}
      }
    }
  } catch (err) {
    // Non-blocking
  }

  // Tier 3: Wikimedia Commons Media Search (High-res photo archive)
  try {
    const commonsUrl = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(cleanTerm)}&gsrnamespace=6&prop=imageinfo&iiprop=url&iiurlwidth=800&format=json&origin=*`;
    const cRes = await fetch(commonsUrl);
    if (cRes.ok) {
      const cData = await cRes.json();
      const pages = cData.query?.pages || {};
      for (const p of Object.values(pages)) {
        const info = p.imageinfo?.[0];
        const img = info?.thumburl || info?.url;
        if (isValidProductImage(img) && !results.includes(img)) {
          results.push(img);
        }
      }
    }
  } catch (err) {
    // Non-blocking
  }

  // Tier 4: Category-Specific Fallback if no specific photos found
  if (results.length === 0) {
    const catImages = CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.default;
    results.push(...catImages);
  }

  // Deduplicate
  const uniqueImages = [...new Set(results)].filter(Boolean);
  queryCache.set(cacheKey, uniqueImages);
  return uniqueImages;
}

/**
 * Synchronous initial image getter while async search resolves
 */
export function getImmediateProductImage(searchQuery = '', category = '') {
  const cleanTerm = extractCoreTerm(searchQuery) || (searchQuery || '').trim();
  const lower = cleanTerm.toLowerCase();

  for (const [key, fallbackList] of Object.entries(CURATED_FALLBACKS)) {
    if (lower.includes(key)) {
      return fallbackList[0];
    }
  }

  const catList = CATEGORY_FALLBACKS[category] || CATEGORY_FALLBACKS.default;
  return catList[0];
}
