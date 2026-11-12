// Vercel Serverless Function: /api/generate
// Handles AI REST API requests using Gemini API key stored securely in process.env.GEMINI_API_KEY
// Optimized for lightning-fast sub-2s responses & zero client key exposure

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  try {
    const { productName, category, tone = 'persuasive', features = '', customApiKey } = req.body || {};

    if (!productName || !category) {
      return res.status(400).json({ error: 'Product name and category are required.' });
    }

    const apiKey = customApiKey || process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

    // If an API key is available, call the high-speed Gemini REST API
    if (apiKey && apiKey.trim() !== '') {
      const prompt = `You are an expert e-commerce copywriter.
Generate compelling product card details for:
- Product: "${productName}"
- Category: "${category}"
- Desired Tone: "${tone}"
${features ? `- Key Highlights: "${features}"` : ''}

You MUST return ONLY a valid, raw JSON object (without markdown code blocks, backticks, or other text) with this schema:
{
  "title": "A captivating, benefit-driven product title (under 60 characters)",
  "shortDescription": "A persuasive description highlighting benefits (approx 25-45 words)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"],
  "category": "${category}",
  "estimatedPrice": "$49.99",
  "bulletPoints": [
    "Compelling feature 1",
    "Compelling feature 2",
    "Compelling feature 3"
  ],
  "badge": "Best Seller"
}`;

      // Ultra-fast lightweight models (sub-2s latency on Google Cloud)
      const candidateModels = [
        'gemini-3.5-flash-lite',
        'gemini-3.1-flash-lite',
        'gemini-flash-lite-latest'
      ];
      
      for (const model of candidateModels) {
        try {
          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
          
          // Enforce 4.5s timeout per model so Vercel never exceeds its execution budget
          const response = await fetch(geminiUrl, {
            method: 'POST',
            signal: AbortSignal.timeout(4500),
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 600,
                responseMimeType: 'application/json'
              }
            })
          });

          if (response.ok) {
            const data = await response.json();
            const candidate = data?.candidates?.[0]?.content?.parts?.[0]?.text;
            if (candidate) {
              const cleaned = candidate.replace(/```json/gi, '').replace(/```/g, '').trim();
              const parsed = JSON.parse(cleaned);
              return res.status(200).json({
                success: true,
                source: 'gemini-api',
                modelUsed: model,
                data: parsed
              });
            }
          }
        } catch (mErr) {
          console.warn(`Model ${model} attempt timed out or failed (${mErr.message}), trying next...`);
        }
      }
    }

    // Smart Fallback Generator (Instant response if no API key is set or if upstream API spikes)
    const fallbackData = generateSmartFallback(productName, category, tone, features);
    return res.status(200).json({
      success: true,
      source: apiKey ? 'fallback-after-error' : 'smart-demo-engine',
      notice: apiKey ? 'Generated via fallback engine (upstream API latency spike).' : 'Generated using Smart Demo Engine. Configure GEMINI_API_KEY in Vercel for live LLM calls.',
      data: fallbackData
    });
  } catch (error) {
    console.error('Serverless function error:', error);
    return res.status(500).json({
      error: 'Failed to generate product details',
      details: error.message
    });
  }
}

function generateSmartFallback(name, category, tone, features) {
  const tones = {
    persuasive: 'Engineered for exceptional performance and daily reliability.',
    luxury: 'Crafted with premium materials for discerning individuals who value timeless elegance.',
    minimalist: 'Clean lines, effortless function, and thoughtful design that fits seamlessly into your life.',
    playful: 'Fun, vibrant, and packed with personality to brighten up every moment.'
  };

  const selectedTone = tones[tone] || tones.persuasive;
  
  const categoryTags = {
    'Electronics': ['SmartTech', 'HighPerformance', 'NextGen', 'Wireless', 'FastCharging', 'ModernLife'],
    'Fashion & Apparel': ['SustainableStyle', 'PremiumComfort', 'EverydayEssential', 'ModernFit', 'Breathable', 'Trendsetter'],
    'Home & Kitchen': ['SmartHome', 'SpaceSaving', 'DurableBuild', 'CulinaryGrade', 'EasyClean', 'ModernLiving'],
    'Health & Fitness': ['PeakPerformance', 'DailyWellness', 'Ergonomic', 'ProGrade', 'ActiveLifestyle', 'Vitality'],
    'Beauty & Personal Care': ['CleanFormula', 'DermatologistApproved', 'NaturalGlow', 'CrueltyFree', 'Nourishing', 'SelfCare'],
    'Books & Stationery': ['FocusFlow', 'CreativeMind', 'PremiumPaper', 'ThoughtfulGift', 'OrganizedLife', 'Inspiration']
  };

  const defaultTags = ['TopRated', 'VerifiedQuality', 'BestValue', 'MustHave', 'Trending', 'CustomerFavorite'];
  const tags = categoryTags[category] || defaultTags;

  const titlePrefixes = {
    luxury: 'The Signature',
    persuasive: 'Next-Gen',
    minimalist: 'The Essential',
    playful: 'Supercharged'
  };

  const prefix = titlePrefixes[tone] || 'Pro';

  return {
    title: `${prefix} ${name} — High Performance Series`,
    shortDescription: `Discover the perfect balance of innovation and craftsmanship with ${name}. ${selectedTone} ${features ? `Built with ${features}.` : 'Designed to deliver outstanding results from day one.'}`,
    tags: tags.slice(0, 6),
    category: category,
    estimatedPrice: '$79.99',
    bulletPoints: [
      `Precision-engineered for superior ${category.toLowerCase()} performance`,
      `Ergonomic, user-centric design with premium durable materials`,
      `Includes 1-year comprehensive warranty and 30-day money-back guarantee`
    ],
    badge: 'Popular Choice'
  };
}
