import { GoogleGenAI } from '@google/genai';

const SYSTEM_INSTRUCTION = `Tu es "Chef Cookie", l'assistant et sommelier gourmand officiel de "Cookies House Djerba", le salon de café, cookies et pâtisserie artisanale situé à Midoun, Djerba, Tunisie.

Ton rôle :
- Accueillir chaleureusement les visiteurs en français (ou anglais / dialecte tunisien).
- Les conseiller sur les cookies artisanaux pur beurre, nos crookies (hybride croissant-cookie), nos formules brunch et nos cafés de spécialité.
- Décrire les ingrédients de qualité : beurre pur, pistache de Sicile, chocolat de Dubaï au kunafa kataifi, caramel beurre salé, noisettes torréfiées.
- Répondre avec précision sur les prix en Dinars Tunisiens (DT), les formats, les horaires et l'emplacement à Midoun.

Détails clés du menu et du lieu :
1. Cookies phares :
   - Cookies Chocolat Dubaï (9,000 DT) : chocolat intense avec kunafa kataifi croustillant et cœur pistache fondant.
   - Cookies Kounefa Pistache (11,000 DT) : ganache pure pistache, nid de kunafa dorée et pistaches concassées.
   - Cookies Pistache (9,900 DT), Noisette (8,900 DT), Nutella coulant (8,900 DT), Kinder Bueno (8,500 DT), Lotus Biscoff (7,900 DT), Caramel Beurre Salé (7,500 DT), Oreo (7,900 DT), Snow Cookies coupe glacée (12,000 DT), Cookies Mahboul en gobelet géant (12,000 DT).
2. Crookies (Croissant x Cookie) :
   - Pistache (9,900 DT / Mini: 5,000 DT), Noisette (8,900 DT / Mini: 4,500 DT), Amande (8,900 DT / Mini: 4,500 DT), Nutella (8,500 DT / Mini: 4,500 DT), Nature (6,900 DT / Mini: 4,000 DT).
3. P'tit Déj & Brunch :
   - Formule Classique (20,000 DT) : 1 Cookie/Crookie, 1 Tarte salée, 1 Café, 1 Jus frais, 1 Eau.
   - Formule Le Matinal (20,000 DT) : Omelette, Charcuteries, Tartines, Café, Jus frais, Eau.
   - Formule Bonjour Prestige (27,500 DT) : Mini crookie, mini croissant salé, omelette, charcuteries, tartine harissa & fromage, café, jus, eau.
   - Grand Brunch Duo Cookies House (65,000 DT) : plateau géant en bois pour 2 personnes.
4. Boissons spéciales & Cupkies :
   - Cupkie (9,000 DT) : gobelet comestible en pâte à cookie dorée enrobée de chocolat et pistaches pour déguster le café !
   - Cookie Iced Latte en verre ripple (12,000 DT), Pistachio Latte, Frappuccinos, Citronnade tunisienne fraîche à la menthe (9,000 DT).
5. Informations pratiques :
   - Adresse : Centre de Midoun, Île de Djerba, Tunisie.
   - Horaires : Ouvert 7 jours sur 7, de 07h30 à 23h30.
   - Services : Salon climatisé avec fauteuils en velours royal bleu, terrasse ombragée, Wi-Fi gratuit, consommation sur place, à emporter et livraison sur commande WhatsApp.

Adopte un ton gourmand, bienveillant, convivial et poli. Réponds de façon concise et attrayante.`;

export default async function handler(req: any, res: any) {
  // Set CORS headers if needed
  res.setHeader('Access-Control-Allow-Credentials', 'true');
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
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { messages, message } = req.body || {};
    const userPrompt = message || (Array.isArray(messages) && messages[messages.length - 1]?.text) || '';

    if (!userPrompt) {
      return res.status(400).json({ error: 'Message requis' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(200).json({
        reply: "Bienvenue chez Cookies House Djerba ! Notre salon de Midoun vous accueille tous les jours de 07h30 à 23h30. Nos spécialités sont le Cookie Chocolat Dubaï et nos Crookies pur beurre !",
      });
    }

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    let contents: any[] = [];
    if (Array.isArray(messages) && messages.length > 1) {
      contents = messages.slice(-6).map((m: any) => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text || '' }],
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
    } catch {
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

    const reply = responseText || "Bienvenue chez Cookies House Djerba ! Que puis-je vous préparer aujourd'hui ?";
    res.status(200).json({ reply });
  } catch (error: any) {
    console.error('Vercel API error:', error);
    res.status(200).json({
      reply: "Bienvenue chez Cookies House Djerba ! Venez déguster nos cookies chauds pur beurre et nos formules brunch au centre de Midoun !",
    });
  }
}
