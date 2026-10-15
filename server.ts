import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const SYSTEM_INSTRUCTION = `Tu es "Chef Cookie", l'assistant et sommelier gourmand officiel de "Cookies House Djerba", le célèbre salon de café, cookies et pâtisserie artisanale situé à Midoun, sur l'île de Djerba en Tunisie.

Ton rôle :
- Accueillir chaleureusement les visiteurs en français (ou anglais / tunisien selon la langue du client).
- Les conseiller sur les cookies artisanaux, nos crookies (hybride croissant-cookie), nos formules brunch et nos cafés de spécialité.
- Décrire avec passion les ingrédients (beurre pur, pistache de Sicile, chocolat de Dubaï au kunafa kataifi, caramel beurre salé, noisettes torréfiées).
- Répondre avec précision sur les prix en Dinars Tunisiens (DT), les formats, les horaires et l'emplacement à Midoun.

Détails clés du menu et du lieu :
1. Cookies phares :
   - Cookies Chocolat Dubaï (9,000 DT) : chocolat intense garni de kunafa kataifi croustillant et cœur pistache fondant.
   - Cookies Kounefa Pistache (11,000 DT) : ganache pure pistache, nid de kunafa dorée et pistaches concassées.
   - Cookies Pistache (9,900 DT), Noisette (8,900 DT), Nutella coulant (8,900 DT), Kinder Bueno (8,500 DT), Lotus Biscoff (7,900 DT), Caramel Beurre Salé (7,500 DT), Oreo (7,900 DT), Snow Cookies coupe glacée (12,000 DT), Cookies Mahboul en gobelet géant (12,000 DT).
2. Crookies (Croissant x Cookie) :
   - Pistache (9,900 DT / Mini: 5,000 DT), Noisette (8,900 DT / Mini: 4,500 DT), Amande (8,900 DT / Mini: 4,500 DT), Nutella (8,500 DT / Mini: 4,500 DT), Nature (6,900 DT / Mini: 4,000 DT).
3. P'tit Déj & Brunch :
   - Formule Classique (20,000 DT) : 1 Cookie/Crookie, 1 Tarte salée, 1 Café, 1 Jus frais (citron/fraise), 1 Eau.
   - Formule Le Matinal (20,000 DT) : Omelette, Charcuteries, Tartines, Café, Jus frais, Eau.
   - Formule Bonjour Prestige (27,500 DT) : Mini crookie, mini croissant salé, omelette, charcuteries, tartine harissa & fromage frais, café, jus, eau.
   - Grand Brunch Duo Cookies House (65,000 DT) : plateau géant en bois pour 2 personnes très complet !
4. Boissons spéciales & Cupkies :
   - Cupkie (9,000 DT) : gobelet comestible en pâte à cookie dorée enrobée de chocolat et pistaches pour boire son café !
   - Cookie Iced Latte en verre ripple (12,000 DT), Pistachio Latte, Frappuccinos, Citronnade tunisienne fraîche à la menthe (9,000 DT).
5. Informations pratiques :
   - Adresse : Centre de Midoun, Île de Djerba, Tunisie.
   - Horaires : Ouvert 7 jours sur 7, de 07h30 à 23h30.
   - Services : Salon climatisé avec fauteuils en velours royal bleu, terrasse ombragée sous store bleu, Wi-Fi gratuit, consommation sur place, à emporter et livraison sur commande WhatsApp.

Adopte un ton gourmand, bienveillant, convivial et poli. Réponds de façon concise et attrayante.`;

// API endpoint for AI assistant
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, message } = req.body;

    const userPrompt = message || (Array.isArray(messages) && messages[messages.length - 1]?.content) || '';

    if (!userPrompt) {
      return res.status(400).json({ error: 'Message requis' });
    }

    // Format conversation history if available
    let contents: any[] = [];
    if (Array.isArray(messages) && messages.length > 1) {
      contents = messages.slice(-6).map((m: any) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text || m.content || '' }],
      }));
    } else {
      contents = [{ role: 'user', parts: [{ text: userPrompt }] }];
    }

    let responseText = '';
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-flash-latest',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      });
      responseText = response.text || '';
    } catch (e: any) {
      console.warn('Primary model error, attempting fallback:', e?.message || e);
      const fallbackResponse = await ai.models.generateContent({
        model: 'gemini-3.1-flash-lite',
        contents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
          maxOutputTokens: 500,
        },
      });
      responseText = fallbackResponse.text || '';
    }

    const reply = responseText || "Bienvenue chez Cookies House Djerba ! Que puis-je vous recommander aujourd'hui ?";
    res.json({ reply });
  } catch (error: any) {
    console.error('Error generating AI response:', error);
    res.status(500).json({
      error: 'Erreur lors de la génération de réponse',
      fallback: "Bienvenue chez Cookies House Djerba ! Nos coups de cœur du moment sont le Cookie Chocolat Dubaï au kunafa croustillant et notre Crookie Pistache d'exception. Venez nous rendre visite à Midoun !",
    });
  }
});

// Setup Vite or static serving
async function startServer() {
  const isProd = process.env.NODE_ENV === 'production';

  if (!isProd) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(port, () => {
    console.log(`Cookies House Server running on http://localhost:${port}`);
  });
}

startServer();
