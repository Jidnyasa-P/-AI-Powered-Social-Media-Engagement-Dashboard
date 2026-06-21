import express, { Request, Response } from 'express';
import path from 'path';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini client lazily to avoid crashing on start if API key is not present
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// REST API Endpoints
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', time: new Date() });
});

// AI analysis route proxies input safely through our Express server backend
app.post('/api/gemini/analyze', async (req: Request, res: Response) => {
  try {
    const { caption, platform = 'Instagram', theme = 'General' } = req.body;
    
    if (!caption || typeof caption !== 'string') {
       res.status(400).json({ error: 'Caption is required' });
       return;
    }

    const ai = getGeminiClient();
    
    const prompt = `Analyze this caption meant for platform "${platform}" with the core content theme "${theme}":
"${caption}"

Give critical feedback on its performance potential. Be constructive and specific.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `You are an expert digital marketing content copywriter and social media analytics engine.
Perform a critical analysis of the provided social media caption and return your evaluation in JSON format containing scores and specific constructive suggestions.`,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            aiContentScore: { type: Type.INTEGER, description: "Content effectiveness score between 0 and 100 based on digital marketing benchmarks" },
            sentiment: { type: Type.STRING, description: "Reader response classification: 'Positive', 'Neutral', or 'Negative'" },
            sentimentExplanation: { type: Type.STRING, description: "Analysis of the emotion/reactions this copy evokes in viewers" },
            hookStrength: { type: Type.INTEGER, description: "Hook rating of the first 3 lines from 0 to 10" },
            hookExplanation: { type: Type.STRING, description: "Detailed critique of the copy's initial attention hook" },
            brandVoiceSync: { type: Type.INTEGER, description: "Consistency with platform tone from 0 to 10" },
            brandExplanation: { type: Type.STRING, description: "Evaluation of readability, layout, and line-breaks formatting" },
            suggestedHashtags: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "5 highly discoverable niche hashtags relevant to this post"
            },
            improvedCaptionOption: { type: Type.STRING, description: "Ready-to-use rewritten version with perfect formatting, bold hook, layout spacings, and call-to-actions" }
          },
          required: ["aiContentScore", "sentiment", "sentimentExplanation", "hookStrength", "hookExplanation", "brandVoiceSync", "brandExplanation", "suggestedHashtags", "improvedCaptionOption"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error('Emply response received from Gemini model');
    }

    const parsedData = JSON.parse(text);
    res.json(parsedData);
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({ 
      error: 'Failed to analyze caption using Gemini AI model.', 
      details: error.message || error 
    });
  }
});

// Mount Vite middleware for dev or serve static files for prod
async function setupApp() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
    console.log('Vite middleware mounted in development mode');
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
    console.log(`Serving static production files from: ${distPath}`);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
}

setupApp().catch((err) => {
  console.error('Failed to initiate Express server:', err);
});
