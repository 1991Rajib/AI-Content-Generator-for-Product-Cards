// Client-side AI service orchestrator
// Tries Vercel Serverless Function (/api/generate) first.
// If running in local Vite mode without serverless runtime, directly calls Gemini REST API or falls back smoothly.

export async function generateProductDetails({ productName, category, tone, features, customApiKey }) {
  // 1. First, attempt to call the serverless API endpoint (works on Vercel deployment)
  try {
    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productName, category, tone, features, customApiKey })
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success && result.data) {
        return {
          data: result.data,
          source: result.source || 'vercel-serverless',
          notice: result.notice
        };
      }
    }
  } catch (err) {
    console.log('Serverless /api/generate unavailable (running in local client mode). Using client fallback pipeline.', err);
  }

  // 2. Client-side direct call to Gemini REST API if customApiKey or VITE_GEMINI_API_KEY is present
  const apiKey = customApiKey || import.meta.env.VITE_GEMINI_API_KEY;

  if (apiKey && apiKey.trim() !== '') {
    const candidateModels = ['gemini-flash-lite-latest', 'gemini-3.5-flash', 'gemini-flash-latest'];
    
    for (const model of candidateModels) {
      try {
        const prompt = `You are an expert e-commerce copywriter.
Generate compelling product card details for:
- Product Name: "${productName}"
- Category: "${category}"
- Desired Tone: "${tone}"
${features ? `- Key Highlights/Features: "${features}"` : ''}

Return ONLY a raw JSON object with this exact structure:
{
  "title": "A captivating, benefit-driven product title (under 60 characters)",
  "shortDescription": "A persuasive, punchy description highlighting key benefits and value proposition (approx 25-45 words)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"],
  "category": "${category}",
  "estimatedPrice": "$59.99",
  "bulletPoints": ["Feature 1", "Feature 2", "Feature 3"],
  "badge": "Top Rated"
}`;

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
            return {
              data: parsed,
              source: 'gemini-direct-rest',
              modelUsed: model,
              notice: `Generated via live Gemini REST API (${model})`
            };
          }
        }
      } catch (apiErr) {
        console.warn(`Direct Gemini REST call with ${model} failed, trying next:`, apiErr.message);
      }
    }
  }

  // 3. Simulated Intelligent Engine (Fallback for zero-friction demo)
  // Simulate network latency of 700ms for realistic UI response
  await new Promise((resolve) => setTimeout(resolve, 750));

  const sampleImages = {
    'Electronics': 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80',
    'Fashion & Apparel': 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
    'Home & Kitchen': 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80',
    'Health & Fitness': 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
    'Beauty & Personal Care': 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    'Books & Stationery': 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80'
  };

  const tones = {
    persuasive: 'Engineered for exceptional performance, effortless comfort, and lasting reliability in every use.',
    luxury: 'Meticulously crafted from the finest materials for discerning connoisseurs of understated elegance.',
    minimalist: 'Thoughtfully stripped of excess to deliver essential utility, quiet aesthetics, and everyday harmony.',
    playful: 'Bursting with energy, bright character, and clever surprises to elevate your daily routine.'
  };

  const badges = ['Best Seller', 'Editor’s Choice', 'Trending Now', 'Top Rated', 'Eco Certified', 'New Release'];
  const randomBadge = badges[Math.floor(Math.random() * badges.length)];

  const categoryTags = {
    'Electronics': ['SmartTech', 'NextGenAudio', 'WirelessFreedom', 'FastCharge', 'NoiseCancelling', 'HighFidelity'],
    'Fashion & Apparel': ['TailoredFit', 'SustainableFabric', 'AllDayComfort', 'UrbanChic', 'BreathableWeave', 'CapsuleWardrobe'],
    'Home & Kitchen': ['CulinaryGrade', 'SpaceSaving', 'DishwasherSafe', 'SmartKitchen', 'DurableSteel', 'ModernAesthetics'],
    'Health & Fitness': ['PeakPerformance', 'ErgonomicGrip', 'SweatResistant', 'RecoveryTech', 'DailyWellness', 'UltraLight'],
    'Beauty & Personal Care': ['CleanBeauty', 'DeepHydration', 'CrueltyFree', 'DermApproved', 'VeganFormula', 'RadiantGlow'],
    'Books & Stationery': ['AcidFreePaper', 'CreativeFlow', 'FountainFriendly', 'LayFlatBinding', 'MindfulFocus', 'ArchivalQuality']
  };

  const defaultTags = ['TopRated', 'VerifiedQuality', 'BestValue', 'MustHave', 'Trending', 'CustomerFavorite'];
  const tags = categoryTags[category] || defaultTags;

  return {
    data: {
      title: `${productName} — ${category} Edition`,
      shortDescription: `Experience the difference with ${productName}. ${tones[tone] || tones.persuasive} ${features ? `Featuring ${features}.` : 'Engineered to inspire confidence and exceed everyday expectations.'}`,
      tags: tags,
      category: category,
      estimatedPrice: '$69.99',
      bulletPoints: [
        `Premium grade construction optimized for ${category.toLowerCase()}`,
        'Precision performance tested for durability and effortless usability',
        'Includes complimentary customer support and manufacturer warranty'
      ],
      badge: randomBadge,
      imageUrl: sampleImages[category] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
    },
    source: 'smart-demo-engine',
    notice: 'Demo mode active. Add your GEMINI_API_KEY in Vercel or settings to enable live AI generation.'
  };
}

