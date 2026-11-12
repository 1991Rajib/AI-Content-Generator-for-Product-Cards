// Intelligent dynamic image mapper based on category and product keywords

const PRODUCT_IMAGE_COLLECTION = {
  // Electronics & Gadgets
  headphones: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
  ],
  watch: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'
  ],
  keyboard: [
    'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=800&q=80'
  ],
  phone: [
    'https://images.unsplash.com/photo-1511707171634-5f897ff02560?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
  ],
  laptop: [
    'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80'
  ],
  speaker: [
    'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=800&q=80'
  ],
  camera: [
    'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&w=800&q=80'
  ],

  // Fashion & Footwear
  shoes: [
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=800&q=80'
  ],
  bag: [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
  ],
  jacket: [
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
  ],
  sunglasses: [
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=800&q=80'
  ],

  // Home & Kitchen
  chair: [
    'https://images.unsplash.com/photo-1580481077114-118f67e7eb17?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&w=800&q=80'
  ],
  desk: [
    'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80'
  ],
  coffee: [
    'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80'
  ],
  cookware: [
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
  ],
  bottle: [
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80'
  ],

  // Beauty & Skincare
  serum: [
    'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1608248597359-e93297a73187?auto=format&fit=crop&w=800&q=80'
  ],
  perfume: [
    'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=800&q=80'
  ],
  cream: [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80'
  ],

  // Fitness
  fitness: [
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'
  ],

  // Stationery
  stationery: [
    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=800&q=80'
  ]
};

const CATEGORY_DEFAULT_IMAGES = {
  'Electronics': 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
  'Fashion & Apparel': 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=800&q=80',
  'Home & Kitchen': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
  'Health & Fitness': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
  'Beauty & Personal Care': 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
  'Books & Stationery': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
  'Sports & Outdoors': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
  'Automotive & Gadgets': 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
};

export function getProductImage(productName = '', category = '') {
  const query = `${productName} ${category}`.toLowerCase();

  // Keyword check
  if (query.includes('headphone') || query.includes('earphone') || query.includes('earbud') || query.includes('audio')) {
    return PRODUCT_IMAGE_COLLECTION.headphones[0];
  }
  if (query.includes('watch') || query.includes('smartwatch') || query.includes('band')) {
    return PRODUCT_IMAGE_COLLECTION.watch[0];
  }
  if (query.includes('keyboard') || query.includes('mouse') || query.includes('keycap')) {
    return PRODUCT_IMAGE_COLLECTION.keyboard[0];
  }
  if (query.includes('phone') || query.includes('mobile') || query.includes('smartphone')) {
    return PRODUCT_IMAGE_COLLECTION.phone[0];
  }
  if (query.includes('laptop') || query.includes('macbook') || query.includes('computer')) {
    return PRODUCT_IMAGE_COLLECTION.laptop[0];
  }
  if (query.includes('speaker') || query.includes('soundbar') || query.includes('boombox')) {
    return PRODUCT_IMAGE_COLLECTION.speaker[0];
  }
  if (query.includes('camera') || query.includes('lens') || query.includes('dslr')) {
    return PRODUCT_IMAGE_COLLECTION.camera[0];
  }
  if (query.includes('shoe') || query.includes('sneaker') || query.includes('boot') || query.includes('footwear') || query.includes('runner')) {
    return PRODUCT_IMAGE_COLLECTION.shoes[0];
  }
  if (query.includes('bag') || query.includes('backpack') || query.includes('wallet') || query.includes('tote')) {
    return PRODUCT_IMAGE_COLLECTION.bag[0];
  }
  if (query.includes('jacket') || query.includes('hoodie') || query.includes('coat') || query.includes('shirt')) {
    return PRODUCT_IMAGE_COLLECTION.jacket[0];
  }
  if (query.includes('sunglass') || query.includes('glasses') || query.includes('eyewear')) {
    return PRODUCT_IMAGE_COLLECTION.sunglasses[0];
  }
  if (query.includes('chair') || query.includes('seating') || query.includes('sofa') || query.includes('stool')) {
    return PRODUCT_IMAGE_COLLECTION.chair[0];
  }
  if (query.includes('desk') || query.includes('table') || query.includes('stand')) {
    return PRODUCT_IMAGE_COLLECTION.desk[0];
  }
  if (query.includes('coffee') || query.includes('espresso') || query.includes('mug') || query.includes('brewer')) {
    return PRODUCT_IMAGE_COLLECTION.coffee[0];
  }
  if (query.includes('bottle') || query.includes('flask') || query.includes('tumbler')) {
    return PRODUCT_IMAGE_COLLECTION.bottle[0];
  }
  if (query.includes('cook') || query.includes('pan') || query.includes('knife') || query.includes('kitchen') || query.includes('pot')) {
    return PRODUCT_IMAGE_COLLECTION.cookware[0];
  }
  if (query.includes('serum') || query.includes('peptide') || query.includes('oil') || query.includes('dropper')) {
    return PRODUCT_IMAGE_COLLECTION.serum[0];
  }
  if (query.includes('perfume') || query.includes('cologne') || query.includes('fragrance')) {
    return PRODUCT_IMAGE_COLLECTION.perfume[0];
  }
  if (query.includes('cream') || query.includes('lotion') || query.includes('moisturizer') || query.includes('skin')) {
    return PRODUCT_IMAGE_COLLECTION.cream[0];
  }
  if (query.includes('fitness') || query.includes('yoga') || query.includes('dumbbell') || query.includes('gym')) {
    return PRODUCT_IMAGE_COLLECTION.fitness[0];
  }
  if (query.includes('book') || query.includes('notebook') || query.includes('pen') || query.includes('journal') || query.includes('planner')) {
    return PRODUCT_IMAGE_COLLECTION.stationery[0];
  }

  // Category fallback
  return CATEGORY_DEFAULT_IMAGES[category] || CATEGORY_DEFAULT_IMAGES['Electronics'];
}

export function getAlternativeImages(productName = '', category = '') {
  const allImages = Object.values(PRODUCT_IMAGE_COLLECTION).flat();
  return allImages;
}
