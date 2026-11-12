// Intelligent dynamic image mapper based on product name and keywords

const PRODUCT_IMAGE_COLLECTION = {
  // Sexual Wellness, Contraception & Intimate Health
  wellness: [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=800&q=80'
  ],

  // Medical, Pharmacy & Supplements
  supplements: [
    'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1576602976047-174e57a47881?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&w=800&q=80'
  ],

  // Audio & Acoustics
  headphones: [
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80'
  ],

  // Smartwatches & Jewelry
  watch: [
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80'
  ],

  jewelry: [
    'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
  ],

  // Computing & Tech
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

  // Footwear & Apparel
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

  // Furniture & Home
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
  bottle: [
    'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=800&q=80'
  ],
  cookware: [
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80'
  ],

  // Skincare, Cosmetics & Hygiene
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

  // Fitness & Gym Equipment
  fitness: [
    'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=800&q=80'
  ],

  // Books & Stationery
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
  const nameLower = (productName || '').toLowerCase();
  const categoryLower = (category || '').toLowerCase();

  // 1. Sexual Health, Condoms, Contraceptives, Intimate Wellness
  if (
    nameLower.includes('condom') || 
    nameLower.includes('contraceptive') || 
    nameLower.includes('latex') || 
    nameLower.includes('durex') || 
    nameLower.includes('skyn') || 
    nameLower.includes('manforce') || 
    nameLower.includes('lubricant') || 
    nameLower.includes('lube') || 
    nameLower.includes('intimate') || 
    nameLower.includes('wellness')
  ) {
    return PRODUCT_IMAGE_COLLECTION.wellness[0];
  }

  // 2. Pharmacy, Medicine, Supplements, Vitamins
  if (
    nameLower.includes('pill') || 
    nameLower.includes('tablet') || 
    nameLower.includes('capsule') || 
    nameLower.includes('vitamin') || 
    nameLower.includes('supplement') || 
    nameLower.includes('protein powder') || 
    nameLower.includes('whey') || 
    nameLower.includes('creatine')
  ) {
    return PRODUCT_IMAGE_COLLECTION.supplements[0];
  }

  // 3. Audio & Acoustics
  if (nameLower.includes('headphone') || nameLower.includes('earphone') || nameLower.includes('earbud') || nameLower.includes('audio') || nameLower.includes('airpods')) {
    return PRODUCT_IMAGE_COLLECTION.headphones[0];
  }

  // 4. Watches & Wearables
  if (nameLower.includes('watch') || nameLower.includes('smartwatch') || nameLower.includes('band')) {
    return PRODUCT_IMAGE_COLLECTION.watch[0];
  }

  // 5. Jewelry & Accessories
  if (nameLower.includes('ring') || nameLower.includes('necklace') || nameLower.includes('bracelet') || nameLower.includes('jewelry') || nameLower.includes('gold') || nameLower.includes('silver')) {
    return PRODUCT_IMAGE_COLLECTION.jewelry[0];
  }

  // 6. Keyboards & Computing
  if (nameLower.includes('keyboard') || nameLower.includes('mouse') || nameLower.includes('keycap')) {
    return PRODUCT_IMAGE_COLLECTION.keyboard[0];
  }
  if (nameLower.includes('phone') || nameLower.includes('mobile') || nameLower.includes('smartphone') || nameLower.includes('iphone')) {
    return PRODUCT_IMAGE_COLLECTION.phone[0];
  }
  if (nameLower.includes('laptop') || nameLower.includes('macbook') || nameLower.includes('computer') || nameLower.includes('pc')) {
    return PRODUCT_IMAGE_COLLECTION.laptop[0];
  }
  if (nameLower.includes('speaker') || nameLower.includes('soundbar') || nameLower.includes('boombox')) {
    return PRODUCT_IMAGE_COLLECTION.speaker[0];
  }
  if (nameLower.includes('camera') || nameLower.includes('lens') || nameLower.includes('dslr')) {
    return PRODUCT_IMAGE_COLLECTION.camera[0];
  }

  // 7. Shoes & Footwear
  if (nameLower.includes('shoe') || nameLower.includes('sneaker') || nameLower.includes('boot') || nameLower.includes('footwear') || nameLower.includes('runner') || nameLower.includes('sandal')) {
    return PRODUCT_IMAGE_COLLECTION.shoes[0];
  }

  // 8. Bags & Luggage
  if (nameLower.includes('bag') || nameLower.includes('backpack') || nameLower.includes('wallet') || nameLower.includes('tote') || nameLower.includes('luggage')) {
    return PRODUCT_IMAGE_COLLECTION.bag[0];
  }

  // 9. Apparel & Clothing
  if (nameLower.includes('jacket') || nameLower.includes('hoodie') || nameLower.includes('coat') || nameLower.includes('shirt') || nameLower.includes('t-shirt') || nameLower.includes('dress') || nameLower.includes('pants')) {
    return PRODUCT_IMAGE_COLLECTION.jacket[0];
  }
  if (nameLower.includes('sunglass') || nameLower.includes('glasses') || nameLower.includes('eyewear') || nameLower.includes('shades')) {
    return PRODUCT_IMAGE_COLLECTION.sunglasses[0];
  }

  // 10. Furniture
  if (nameLower.includes('chair') || nameLower.includes('seating') || nameLower.includes('sofa') || nameLower.includes('stool')) {
    return PRODUCT_IMAGE_COLLECTION.chair[0];
  }
  if (nameLower.includes('desk') || nameLower.includes('table') || nameLower.includes('stand')) {
    return PRODUCT_IMAGE_COLLECTION.desk[0];
  }

  // 11. Kitchen & Beverages
  if (nameLower.includes('coffee') || nameLower.includes('espresso') || nameLower.includes('mug') || nameLower.includes('brewer') || nameLower.includes('tea')) {
    return PRODUCT_IMAGE_COLLECTION.coffee[0];
  }
  if (nameLower.includes('bottle') || nameLower.includes('flask') || nameLower.includes('tumbler') || nameLower.includes('shaker')) {
    return PRODUCT_IMAGE_COLLECTION.bottle[0];
  }
  if (nameLower.includes('cook') || nameLower.includes('pan') || nameLower.includes('knife') || nameLower.includes('pot') || nameLower.includes('blender')) {
    return PRODUCT_IMAGE_COLLECTION.cookware[0];
  }

  // 12. Skincare & Perfume
  if (nameLower.includes('serum') || nameLower.includes('peptide') || nameLower.includes('oil') || nameLower.includes('dropper')) {
    return PRODUCT_IMAGE_COLLECTION.serum[0];
  }
  if (nameLower.includes('perfume') || nameLower.includes('cologne') || nameLower.includes('fragrance') || nameLower.includes('scent')) {
    return PRODUCT_IMAGE_COLLECTION.perfume[0];
  }
  if (nameLower.includes('cream') || nameLower.includes('lotion') || nameLower.includes('moisturizer') || nameLower.includes('cleanser') || nameLower.includes('facewash')) {
    return PRODUCT_IMAGE_COLLECTION.cream[0];
  }

  // 13. Fitness Equipment (Gym only if fitness equipment is explicitly mentioned!)
  if (nameLower.includes('dumbbell') || nameLower.includes('barbell') || nameLower.includes('treadmill') || nameLower.includes('gym equipment') || nameLower.includes('kettlebell')) {
    return PRODUCT_IMAGE_COLLECTION.fitness[0];
  }

  // 14. Stationery
  if (nameLower.includes('book') || nameLower.includes('notebook') || nameLower.includes('pen') || nameLower.includes('journal') || nameLower.includes('planner')) {
    return PRODUCT_IMAGE_COLLECTION.stationery[0];
  }

  // Fallback to Category
  return CATEGORY_DEFAULT_IMAGES[category] || CATEGORY_DEFAULT_IMAGES['Electronics'];
}

export function getAlternativeImages(productName = '', category = '') {
  const current = getProductImage(productName, category);
  const allImages = Object.values(PRODUCT_IMAGE_COLLECTION).flat();
  return [current, ...allImages.filter(img => img !== current)];
}
