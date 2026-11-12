import fs from 'fs';
import path from 'path';

function loadEnv() {
  const envPath = path.resolve('.env.local');
  if (!fs.existsSync(envPath)) throw new Error('.env.local not found');
  const content = fs.readFileSync(envPath, 'utf-8');
  const env = {};
  content.split('\n').forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#')) {
      const idx = trimmed.indexOf('=');
      if (idx !== -1) env[trimmed.substring(0, idx).trim()] = trimmed.substring(idx + 1).trim();
    }
  });
  return env;
}

async function testGeminiAPI() {
  const env = loadEnv();
  const apiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY;

  console.log(`Using API Key: ${apiKey.substring(0, 8)}...${apiKey.substring(apiKey.length - 4)}`);

  const prompt = `You are an expert e-commerce copywriter.
Generate compelling product card details for:
- Product Name: "Aura Studio Pro ANC Headphones"
- Category: "Electronics"
- Desired Tone: "luxury"

Return ONLY a raw JSON object with this exact structure:
{
  "title": "A captivating product title (under 60 chars)",
  "shortDescription": "Persuasive description (25-45 words)",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5", "tag6"],
  "category": "Electronics",
  "estimatedPrice": "$199.99",
  "bulletPoints": ["Feature 1", "Feature 2", "Feature 3"],
  "badge": "Top Rated"
}`;

  const candidateModels = [
    'gemini-flash-latest',
    'gemini-3.5-flash',
    'gemini-3.8-flash',
    'gemini-flash-lite-latest'
  ];

  for (const model of candidateModels) {
    console.log(`Testing model: ${model}...`);
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ role: 'user', parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 800,
            responseMimeType: 'application/json'
          }
        })
      });

      console.log(`Status for ${model}: ${response.status} ${response.statusText}`);

      if (response.ok) {
        const data = await response.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        const parsed = JSON.parse(text);
        console.log(`\n🎉 SUCCESS with model: ${model}!`);
        console.log('--- Real-time AI Generated Product Card ---');
        console.log(JSON.stringify(parsed, null, 2));
        return model;
      } else {
        const err = await response.text();
        console.log(`Model ${model} returned:`, err.substring(0, 160));
      }
    } catch (e) {
      console.log(`Model ${model} error:`, e.message);
    }
  }

  throw new Error('All candidate models failed');
}

testGeminiAPI().catch(err => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
