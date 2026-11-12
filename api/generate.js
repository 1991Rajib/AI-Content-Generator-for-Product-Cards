// Vercel Serverless Function: /api/generate
// Handles AI REST API requests using Gemini API key stored securely in process.env.GEMINI_API_KEY
// Also supports client-passed API key for testing

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

    // If an API key is available, call the Gemini REST API
    if (apiKey && apiKey.trim() !== '') {
      const prompt = `You are an expert e-commerce copywriter and SEO specialist.
Generate compelling product card details for the following product:
- Product Name: "${productName}"
- Category: "${category}"
- Desired Tone: "${tone}"
${features ? `- Key Highlights/Features: "${features}"` : ''}

You MUST return ONLY a valid, raw JSON object (without markdown code blocks, backticks, or other text) with this exact schema:
{
  "title": "A captivating, benefit-driven product title (under 60 characters)",
  "shortDescription": "A persuasive, punchy description highlighting key benefits and value proposition (approx 25-45 words)",
  "tags": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5", "keyword6"],
  "category": "${category}",
  "estimatedPrice": "$49.99",
  "bulletPoints": [
    "Compelling feature 1",
    "Compelling feature 2",
    "Compelling feature 3"
  ],
  "badge": "Best Seller"
}`;

      // Try gemini-flash-lite-latest first for lightning speed & high uptime, then gemini-3.5-flash
      const candidateModels = ['gemini-flash-lite-latest', 'gemini-3.5-flash', 'gemini-flash-latest'];
      
      for (const model of candidateModels) {
        try {
          const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
          const response = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              contents: [{ role: 'user', parts: [{ text: prompt }] }],
              generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
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
          console.warn(`Model ${model} attempt failed:`, mErr.message);
        }
      }
    }

    // Smart Fallback Generator (Active if no API key is provided or for offline demo)
    const fallbackData = generateSmartFallback(productName, category, tone, features);
    return res.status(200).json({
      success: true,
      source: apiKey ? 'fallback-after-error' : 'smart-demo-engine',
      notice: apiKey ? 'Gemini call failed; generated via fallback engine.' : 'Generated using Smart Demo Engine. Configure GEMINI_API_KEY in Vercel for live LLM calls.',
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

