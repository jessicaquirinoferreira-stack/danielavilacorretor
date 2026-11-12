import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Server-side Gemini initialization as mandated by gemini-api skill
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Sofia Consultora Imobiliária Endpoint
app.post('/api/ai/concierge', async (req, res) => {
  try {
    const { message, propertiesContext } = req.body;

    if (!ai || apiKey === 'MY_GEMINI_API_KEY') {
      return res.json({
        reply:
          'Olá! Gil Avila Daniel possui apartamentos de 152 a 224 m² na Zona Sul de São Paulo e São Bernardo do Campo. Para confirmar a disponibilidade e agendar uma visita exclusiva, fale diretamente com o Gil pelo WhatsApp oficial (+55 11 97324-5981) ou acompanhe as novidades no Instagram (@daniel_corretor1)!',
      });
    }

    const systemInstruction = `Você é Sofia, consultora imobiliária humana da equipe de Gil Avila Daniel, corretor de imóveis com mais de 20 anos de experiência e especialista na Zona Sul de São Paulo (Moema, Campo Belo, Brooklin, Vila Mariana, Chácara Flora, Santo Amaro) e São Bernardo do Campo.
Regras fundamentais:
- NUNCA diga que é uma inteligência artificial, bot, robô ou máquina. Apresente-se e responda como Sofia, consultora imobiliária de Gil Avila Daniel.
- Mantenha respostas curtas, simples, simpáticas e diretas (máximo 2 a 3 frases).
- Sempre direcione o cliente com entusiasmo para conversar diretamente com Gil Avila Daniel no WhatsApp (+55 11 97324-5981) e acompanhar as fotos e novidades no Instagram oficial (@daniel_corretor1).
- Mencione que temos opções de 152 a 224 m² em bairros nobres e que a disponibilidade atual é checada prontamente pelo Gil.
Contexto de imóveis: ${JSON.stringify(propertiesContext || [])}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: message,
      config: {
        systemInstruction,
      },
    });

    res.json({ reply: response.text || 'Estou à disposição! Fale diretamente com o Gil pelo WhatsApp (+55 11 97324-5981) ou veja nossos destaques no Instagram (@daniel_corretor1).' });
  } catch (error: any) {
    console.error('Sofia Concierge Notice:', error?.message);
    res.json({
      reply:
        'Temos excelentes opções de 152 a 224 m² no Campo Belo, Moema, Brooklin e São Bernardo. Fale diretamente com Gil Avila Daniel no WhatsApp (+55 11 97324-5981) para receber o portfólio completo ou confira nosso Instagram (@daniel_corretor1)!',
    });
  }
});

// AI Property Matchmaker Endpoint
app.post('/api/ai/match-property', async (req, res) => {
  try {
    const { userCriteria, propertiesList } = req.body;

    if (!ai || apiKey === 'MY_GEMINI_API_KEY') {
      return res.json({
        recommendation:
          'Com base no seu perfil, recomendamos agendar um contato direto com Gil Avila Daniel no WhatsApp (+55 11 97324-5981) para receber um portfólio selecionado de 152 a 224 m² na Zona Sul de SP.',
      });
    }

    const prompt = `Analise os critérios do cliente e recomende a melhor opção entre os imóveis listados.
Critérios do cliente: "${userCriteria}"
Catálogo de imóveis: ${JSON.stringify(propertiesList || [])}

Retorne um texto objetivo, elegante e acolhedor explicando por que a opção se encaixa, destacando o bairro e metragem, e informando que a disponibilidade está sujeita a confirmação com Gil Avila Daniel pelo WhatsApp (+55 11 97324-5981).`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        systemInstruction: 'Você é um consultor imobiliário sênior da equipe de Gil Avila Daniel.',
      },
    });

    res.json({ recommendation: response.text });
  } catch (error) {
    res.status(500).json({ error: 'Erro no cálculo de compatibilidade.' });
  }
});

// Media upload endpoint (supports base64 or direct data url)
app.post('/api/upload', (req, res) => {
  const { dataUrl, filename } = req.body;
  // If provided via json body
  if (dataUrl) {
    return res.json({ url: dataUrl, filename: filename || 'media_upload' });
  }
  res.json({ ok: true });
});

// Mounting Vite in development or static in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
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

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
