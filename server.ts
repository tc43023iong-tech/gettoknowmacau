/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// AI Mascot response helper route
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, mascot, explorerName } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const mascotName = mascot === 'pipi' ? '小探險家琵琵（黑臉琵鷺小鳥，睿智、熱愛冒險照相）' : '葡撻寶寶（會做美食的蛋撻，活潑可愛）';
    
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: `你是澳門旅遊吉祥物可愛導遊「${mascotName}」。你要以極其活潑、親切、熱情、充滿愛心的口吻，回答一名5至7歲、正在幼兒園畢業升上小學一年級的孩子「${explorerName}」。
回答規範：
1. 必須使用最簡單、易懂、生動、偏口語的繁體中文（如「呢！」「喔！」「呀！」「呢！」）。
2. 每句回答必須極為精簡，最多兩至三句話，不可長篇大論，以免小寶寶看不懂。
3. 如果合適，多包含一些可愛的表情符號（如 🥞, 🌸, 🐦, ⛵, 🪙, ✨）。
4. 始終保持溫馨、加油鼓勵、把孩子當作好朋友對待的態度。
5. 只回答與澳門的歷史、旅遊、美食、貨幣、日常生活或語言有關的問題。若問題完全無關，可以用可愛的口吻說你只會澳門的小祕密，並試圖引導他問澳門的事情。`
      }
    });

    const reply = response.text?.trim() || '哎呀，魔法書信件寄丟了，能再問我一次嗎？🐾';
    return res.json({ reply });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    return res.status(500).json({ error: 'Gemini service failure' });
  }
});

async function startServer() {
  // Vite dev server middleware integration
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve production static build
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express custom server running on http://localhost:${PORT}`);
  });
}

startServer();
