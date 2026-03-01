# Punit AI — Intelligent Portfolio Chatbot

A production-ready, AI-powered chatbot integrated into Punit Badyal's personal portfolio. Powered by **OpenAI GPT-4o mini** via a secure Node.js/Express backend.

---

## Project Structure

```
My Own portfolio/
├── portfolio-app/          ← React frontend (Vite)
│   ├── src/
│   │   └── components/
│   │       └── Chatbot/
│   │           ├── Chatbot.jsx   ← Floating chatbot UI
│   │           └── Chatbot.css   ← Glassmorphism styles
│   ├── .env                ← VITE_CHATBOT_API_URL (create from .env.example)
│   └── .env.example
│
└── chatbot-backend/        ← Node.js + Express backend
    ├── index.js            ← Server + OpenAI integration
    ├── package.json
    ├── .env                ← OPENAI_API_KEY (create from .env.example)
    └── .env.example
```

---

## Quick Start (Local Development)

### 1 — Set up the Backend

```bash
cd "chatbot-backend"
npm install
```

Copy the env example and add your OpenAI key:

```bash
# Windows
copy .env.example .env

# Mac / Linux
cp .env.example .env
```

Edit `.env`:

```
OPENAI_API_KEY=sk-...your-real-key-here...
PORT=5000
ALLOWED_ORIGINS=http://localhost:5173
```

Start the backend:

```bash
# Development (auto-restart on changes)
npm run dev

# Production
npm start
```

The backend runs on `http://localhost:5000`.  
Check it: `http://localhost:5000/health`

---

### 2 — Set up the Frontend

```bash
cd "portfolio-app"
```

Copy the env example:

```bash
# Windows
copy .env.example .env

# Mac / Linux
cp .env.example .env
```

`.env` should contain:

```
VITE_CHATBOT_API_URL=http://localhost:5000/api/chat
```

Start the frontend:

```bash
npm run dev
```

Open `http://localhost:5173` — the **Punit AI** chat button appears at the bottom-right corner.

---

## Features

| Feature | Details |
|---|---|
| Floating trigger | Pulsing button fixed bottom-right |
| Glassmorphism UI | Dark professional theme matching portfolio |
| Animations | Open/close, bubble-in, typing indicator |
| Quick suggestions | 5 one-tap starter questions |
| Auto-scroll | Smoothly follows new messages |
| Light/dark theme | Inherits portfolio theme toggle |
| Mobile responsive | Full support on all screen sizes |
| Rate limiting | 20 req/min per IP (server-side) |
| Input safety | Messages sanitised before sending to OpenAI |
| Secure API | OpenAI key never exposed to frontend |

---

## Deployment

### Backend → Render (Free tier)

1. Push `chatbot-backend/` to a GitHub repository.
2. Go to [render.com](https://render.com) → **New Web Service**.
3. Connect your repository.
4. Set **Build Command**: `npm install`
5. Set **Start Command**: `npm start`
6. Add Environment Variables:
   - `OPENAI_API_KEY` → your OpenAI key
   - `ALLOWED_ORIGINS` → `https://your-portfolio.vercel.app`
   - `PORT` → `5000` (Render auto-assigns, this is optional)
7. Deploy. Copy the service URL (e.g. `https://punit-ai.onrender.com`).

---

### Frontend → Vercel

1. Push `portfolio-app/` to GitHub.
2. Go to [vercel.com](https://vercel.com) → **New Project** → import repository.
3. Add Environment Variable in Vercel dashboard:
   - `VITE_CHATBOT_API_URL` → `https://punit-ai.onrender.com/api/chat`
4. Deploy. Done!

> **Note:** Render free tier spins down after 15 min of inactivity. The first message may take ~30 seconds. Upgrade to a paid plan for instant cold starts in production.

---

## Environment Variables Reference

### `chatbot-backend/.env`

| Variable | Required | Description |
|---|---|---|
| `OPENAI_API_KEY` | ✅ | Your OpenAI secret key |
| `PORT` | Optional | Server port (default: 5000) |
| `ALLOWED_ORIGINS` | ✅ | Comma-separated allowed frontend URLs |

### `portfolio-app/.env`

| Variable | Required | Description |
|---|---|---|
| `VITE_CHATBOT_API_URL` | ✅ | Full URL of the `/api/chat` endpoint |

---

## API Reference

### `POST /api/chat`

**Request body:**
```json
{
  "messages": [
    { "role": "user", "content": "What are Punit's skills?" }
  ]
}
```

**Response:**
```json
{
  "reply": "Punit is skilled in React.js, Node.js, Python..."
}
```

### `GET /health`
Returns server status and uptime.

---

## Security Notes

- The OpenAI API key is **only** stored in the backend `.env` — never committed to git.
- The backend validates and sanitises all incoming messages.
- CORS is locked to specified allowed origins.
- Rate limiting prevents API abuse (20 requests per minute per IP).

---

## Tech Stack

**Frontend:** React 19, Vite, CSS3 (Glassmorphism)  
**Backend:** Node.js, Express 4, OpenAI SDK 4  
**AI Model:** GPT-4o mini  
**Hosting:** Vercel (frontend) + Render (backend)
