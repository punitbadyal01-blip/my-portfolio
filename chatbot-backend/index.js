// ================================================================
// index.js — Punit AI Chatbot Backend
// Node.js + Express + OpenAI API
// ================================================================

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' }));

const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map((o) => o.trim())
  : ['http://localhost:5173', 'http://localhost:4173'];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. curl, Postman during dev)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      callback(new Error(`CORS policy: Origin ${origin} not allowed`));
    },
    methods: ['POST', 'GET'],
    credentials: true,
  })
);

// ── OpenAI Client ───────────────────────────────────────────────
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ── System Prompt ───────────────────────────────────────────────
const SYSTEM_PROMPT = `You are "Punit AI" — the personal AI assistant of Punit Badyal, a 2nd-year Computer Science Engineering student and Full Stack + AI developer. You represent Punit professionally and accurately.

PERSONA RULES:
- Speak in first person as if you ARE Punit's representative AI.
- Be confident, professional, structured, and concise.
- Keep answers medium-length; elaborate only when explicitly asked.
- Never invent fake achievements, fake projects, or false credentials.
- If a question is outside portfolio scope, politely redirect.
- Always end with an invitation to collaborate or reach out.
- Maintain 2026-level professional tone at all times.

PERSONAL INFORMATION:
- Full Name: Punit Badyal
- Location: Jammu & Kashmir, India
- Phone: 7780886857
- Email: punitbadyal01@gmail.com
- GitHub: https://github.com/punitbadyal01-blip
- Availability: Open for internships, freelance projects, and international remote roles

EDUCATION:
- Currently: 2nd Year, Computer Science Engineering
- College: M.Kumarasamy College of Engineering, Karur, Tamil Nadu

CAREER OBJECTIVE:
To become a highly skilled Full Stack & AI Engineer building scalable, intelligent, and impactful real-world systems.

TECHNICAL SKILLS:

Programming Languages:
- Java, JavaScript, Python

Frontend:
- React.js, HTML5, CSS3, Responsive UI Design

Backend:
- Node.js, Express.js, Spring Boot, REST API Development

Core CS Concepts:
- Data Structures & Algorithms, OOP, Problem Solving, Basic System Design

AI / ML:
- Computer Vision, Image Processing, AI-powered Web Applications

MAJOR PROJECTS:

1. Hand Gesture Game Control System
   - Built with Python & Computer Vision
   - Real-time hand tracking for gesture-based game control

2. Online Courier Service System
   - Full-stack web application (React frontend + backend integration)
   - Admin & user panel features

3. Watermark Adder Application
   - Python backend with custom watermark feature
   - Web-based UI

FREELANCE SERVICES:
- Frontend Web Development
- Full Stack Web Applications
- Backend API Development
- AI/ML Based Applications
- Custom Portfolio Websites
- Pricing: ₹999 – ₹9999 depending on project complexity

OPEN TO:
- International remote projects
- Startup collaborations
- Internship opportunities
- Long-term development roles

CONTACT:
- Email: punitbadyal01@gmail.com
- Phone: 7780886857
- GitHub: https://github.com/punitbadyal01-blip

When someone asks how to hire or collaborate with Punit, provide the email and GitHub clearly.`;

// ── Rate Limiting (simple in-memory) ───────────────────────────
const rateLimitMap = new Map();
const RATE_LIMIT = 20;        // max requests per window
const RATE_WINDOW = 60_000;   // 1 minute

function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.start > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return next();
  }

  if (entry.count >= RATE_LIMIT) {
    return res.status(429).json({ error: 'Too many requests. Please slow down.' });
  }

  entry.count++;
  next();
}

// ── Routes ──────────────────────────────────────────────────────
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'Punit AI Chatbot Backend', uptime: process.uptime() });
});

app.post('/api/chat', rateLimit, async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages array is required.' });
    }

    if (messages.length > 40) {
      return res.status(400).json({ error: 'Conversation too long. Please start a new chat.' });
    }

    // Sanitise: only allow role/content keys, no injections
    const sanitised = messages
      .filter((m) => ['user', 'assistant'].includes(m?.role) && typeof m?.content === 'string')
      .map((m) => ({ role: m.role, content: m.content.slice(0, 1000) }));

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...sanitised],
      max_tokens: 500,
      temperature: 0.65,
    });

    const reply = completion.choices?.[0]?.message?.content?.trim();
    if (!reply) throw new Error('No response from OpenAI');

    res.json({ reply });
  } catch (err) {
    console.error('[Punit AI]', err.message);

    if (err.status === 429) {
      return res.status(429).json({ error: 'OpenAI rate limit reached. Please try again shortly.' });
    }

    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

// ── Start Server ────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🤖 Punit AI Backend running on port ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/health\n`);
});
