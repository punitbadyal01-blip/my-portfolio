// ================================================================
// Chatbot.jsx — Punit AI Floating Chatbot
// React component with OpenAI backend integration
// ================================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import './Chatbot.css';

// ── Config ──────────────────────────────────────────────────────
const API_URL = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:5000/api/chat';

// ── Local Knowledge Base ─────────────────────────────────────────
// Handles common messages instantly without needing the backend.
const LOCAL_KB = [
  // ── Greetings ──
  {
    patterns: [/^(hi|hello|hey|hii|helo|heya|howdy|sup|yo|good\s*(morning|afternoon|evening|night))/i],
    responses: [
      "Hey there! 👋 I'm **Punit AI**, the personal assistant of **Punit Badyal**.\n\nFeel free to ask me about his skills, projects, experience, or how to get in touch!",
      "Hello! Great to meet you! 😊 I'm **Punit AI**.\n\nI can tell you all about Punit — his work, skills, and how to collaborate with him. What would you like to know?",
    ],
  },
  // ── How are you ──
  {
    patterns: [/how are you|how r u|how do you do|you good|you ok/i],
    responses: [
      "I'm doing great, thank you for asking! 😊 I'm always ready to help you learn more about **Punit Badyal**.\n\nWhat can I help you with today?",
    ],
  },
  // ── What is your name ──
  {
    patterns: [/what('?s| is) your name|who are you|introduce yourself/i],
    responses: [
      "I'm **Punit AI** 🤖 — the intelligent assistant representing **Punit Badyal**, a 2nd-year Computer Science Engineering student and Full Stack + AI developer.\n\nI can answer any questions about his skills, projects, availability, and more!",
    ],
  },
  // ── About Punit ──
  {
    patterns: [/about punit|who is punit|tell me about|about him|punit badyal/i],
    responses: [
      "**Punit Badyal** is a passionate **Full Stack & AI Developer**, currently in his 2nd year of **B.E. Computer Science Engineering** at **M.Kumarasamy College of Engineering**, Karur, Tamil Nadu.\n\n📅 **Date of Birth:** January 27, 2005\n🎂 **Age:** 21 years old\n📍 **Hometown:** Jammu & Kashmir, India\n🏫 **Currently:** Karur, Tamil Nadu (for studies)\n\nHe builds scalable, intelligent, real-world software and is actively open to **internships, freelance work, and international remote roles**.",
    ],
  },
  // ── Skills ──
  {
    patterns: [/skill|tech|stack|know|language|framework|expertise|proficien/i],
    responses: [
      "Here's a breakdown of **Punit's technical skills**:\n\n⚛️ **Frontend:** React.js, HTML5, CSS3, Responsive UI Design\n\n🖥️ **Backend:** Node.js, Express.js, Spring Boot, REST API Development\n\n💻 **Programming Languages:** Java, JavaScript, Python\n\n🧠 **CS Fundamentals:** Data Structures & Algorithms, OOP, Problem Solving, System Design\n\n🤖 **AI / ML:** Computer Vision, Image Processing, AI-powered Web Applications",
    ],
  },
  // ── Projects ──
  {
    patterns: [/project|built|work|portfolio|application|app|system/i],
    responses: [
      "Punit has built some impressive projects:\n\n🖐️ **1. Hand Gesture Game Control System**\nBuilt with Python & Computer Vision — real-time hand tracking for gesture-based game control.\n\n📦 **2. Online Courier Service System**\nA full-stack web application with React frontend, backend integration, and both admin & user panels.\n\n🖼️ **3. Watermark Adder Application**\nA Python-powered web app with a custom watermark feature and clean web-based UI.\n\nWant to collaborate on something similar? Reach out at **punitbadyal01@gmail.com**!",
    ],
  },
  // ── Hire / Collaborate ──
  {
    patterns: [/hire|collaborat|work together|freelanc|job|intern|opportunit|contract|recruit/i],
    responses: [
      "**Punit is actively open to:**\n\n✅ Internship opportunities\n✅ Freelance web & AI projects\n✅ International remote positions\n✅ Startup collaborations\n✅ Long-term development roles\n\n**Starting from ₹999** — price depends on project scope (see 'services' for full pricing).\n\n📧 **Email:** punitbadyal01@gmail.com\n🐙 **GitHub:** github.com/punitbadyal01-blip\n\nDon't hesitate to reach out — he'd love to connect!",
    ],
  },
  // ── Date of Birth / Age ──
  {
    patterns: [/dob|date of birth|born|birthday|birth date|how old|age|27.*jan|jan.*27/i],
    responses: [
      "**Punit Badyal** was born on **January 27, 2005** 🎂\n\nHe is currently **21 years old**.\n\nHe started coding during school and has been building real projects for over 2+ years.",
    ],
  },
  // ── Hobbies / Personal ──
  {
    patterns: [/hobby|hobbies|interest|passion|like to do|free time|personal|fun|outside work/i],
    responses: [
      "Outside of coding, **Punit enjoys**:\n\n🎮 Gaming (loves immersive & strategy games)\n📚 Reading tech blogs & staying current with AI trends\n🎵 Listening to music\n🤝 Helping peers with programming problems\n🌐 Exploring open-source projects\n\nHis biggest passion is building things that solve real problems — he often works on side projects just for the love of learning.",
    ],
  },
  // ── Goals / Future ──
  {
    patterns: [/goal|dream|future|aspiration|plan|vision|ambition|aim/i],
    responses: [
      "**Punit's goals:**\n\n🚀 Become a top-tier **Full Stack & AI Engineer**\n💼 Land a high-impact internship or remote role\n🌍 Work on products that reach **millions of users**\n🧠 Deepen expertise in **AI/ML & System Design**\n🏢 Eventually build his own tech startup\n\nHe strongly believes in learning by building and is constantly working on new projects.",
    ],
  },
  // ── Nationality / Background ──
  {
    patterns: [/nationality|background|origin|hometown|native|kashmir|jk|jammu/i],
    responses: [
      "Punit is originally from **Jammu & Kashmir, India** 🇮🇳 — a beautiful region in the northern part of India.\n\nHe is currently studying in **Karur, Tamil Nadu** at M.Kumarasamy College of Engineering.\n\nHe is fully open to **remote work and international collaborations** from anywhere in the world.",
    ],
  },
  // ── College / Academic Year ──
  {
    patterns: [/which year|what year|sem|semester|batch|2nd year|second year|current year|academic/i],
    responses: [
      "Punit is currently in **2nd Year (3rd Semester)** of his B.E. Computer Science Engineering at **M.Kumarasamy College of Engineering**, Karur, Tamil Nadu.\n\nExpected graduation: **2027** 🎓",
    ],
  },
  // ── Contact ──
  {
    patterns: [/contact|reach|email|phone|number|github|linkedin|social|connect|message/i],
    responses: [
      "Here's how you can reach **Punit Badyal**:\n\n📧 **Email:** punitbadyal01@gmail.com\n📱 **Phone:** +91 7780886857\n🐙 **GitHub:** github.com/punitbadyal01-blip\n📍 **Location:** Jammu & Kashmir, India\n\nHe typically responds within 24 hours. Feel free to reach out for collaborations, internships, or freelance work!",
    ],
  },
  // ── Education ──
  {
    patterns: [/educat|college|university|degree|study|student|cse|engineer|course/i],
    responses: [
      "Punit is currently pursuing his **B.E. in Computer Science Engineering (2nd Year)** at **M.Kumarasamy College of Engineering**, Karur, Tamil Nadu.\n\nHe combines his academic foundation with hands-on project experience in Full Stack Development and AI/ML.",
    ],
  },
  // ── Services & Pricing ──
  {
    patterns: [/service|offer|do for|help with|build for|develop|price|cost|rate|package|plan|charge|fee|budget/i],
    responses: [
      "Here are **Punit's services with detailed pricing**:\n\n🎨 **Portfolio / Personal Website**\n→ ₹999 – ₹2,499 | Simple to animated, fully responsive\n\n🌐 **Frontend Web App (React.js)**\n→ ₹1,999 – ₹3,999 | SPA, dashboards, landing pages\n\n⚙️ **Full Stack Web Application**\n→ ₹3,999 – ₹6,999 | React + Node/Express + Database + APIs\n\n🔌 **REST API / Backend Development**\n→ ₹1,499 – ₹3,499 | Node.js / Express / Spring Boot\n\n🤖 **AI / ML Integration**\n→ ₹2,999 – ₹7,999 | Computer Vision, AI-powered features\n\n🖥️ **Admin Dashboard / Management System**\n→ ₹3,499 – ₹6,499 | Custom panels, analytics, CRUD\n\n🔧 **Bug Fixing / Code Review**\n→ ₹499 – ₹1,499 | Per session\n\n📦 **Custom Project (discuss scope)**\n→ ₹4,999 – ₹9,999+\n\n📧 Contact: **punitbadyal01@gmail.com** to get a custom quote!",
    ],
  },
  // ── Location ──
  {
    patterns: [/locat|where|from|country|city|state|india|jammu/i],
    responses: [
      "Punit is based in **Jammu & Kashmir, India** 🇮🇳 and is fully open to **international remote work** and **online collaborations** from anywhere in the world.",
    ],
  },
  // ── AI / ML ──
  {
    patterns: [/ai|machine learning|ml|computer vision|deep learning|neural|python ai/i],
    responses: [
      "Punit has hands-on experience in **AI & ML**, including:\n\n👁️ **Computer Vision** — real-time hand tracking (Hand Gesture Game Control Project)\n🖼️ **Image Processing** — Watermark Adder Application\n🤖 **AI-powered Web Apps** — integrating AI models into full-stack applications\n\nHe's deeply passionate about building intelligent systems that solve real-world problems.",
    ],
  },
  // ── Thanks ──
  {
    patterns: [/thank|thanks|thx|appreciate|great|awesome|nice|cool|good/i],
    responses: [
      "You're welcome! 😊 It's my pleasure to help.\n\nIf you'd like to connect with Punit directly, reach out at **punitbadyal01@gmail.com**. Have a great day!",
    ],
  },
  // ── Bye ──
  {
    patterns: [/bye|goodbye|see you|later|cya|take care|good night/i],
    responses: [
      "Goodbye! 👋 It was great talking with you.\n\nDon't hesitate to come back if you have more questions about Punit. Have a wonderful day! 🌟",
    ],
  },
];

function getLocalReply(text) {
  const lower = text.toLowerCase().trim();
  for (const entry of LOCAL_KB) {
    if (entry.patterns.some((p) => p.test(lower))) {
      const arr = entry.responses;
      return arr[Math.floor(Math.random() * arr.length)];
    }
  }
  return null;
}

// Simulates a short typing delay for realism
function fakeDelay(ms = 600) {
  return new Promise((r) => setTimeout(r, ms));
}

const QUICK_SUGGESTIONS = [
  { label: '👤 About Punit', value: 'Tell me about Punit Badyal.' },
  { label: '🎂 Age & DOB', value: 'What is Punit\'s date of birth and age?' },
  { label: '⚡ Skills', value: 'What are Punit\'s technical skills?' },
  { label: '💰 Services & Pricing', value: 'What services does Punit offer and what are the prices?' },
  { label: '🚀 Projects', value: 'What projects has Punit built?' },
  { label: '📬 Contact', value: 'How can I contact Punit?' },
];

const WELCOME_MESSAGE = {
  role: 'assistant',
  content:
    "Hello! I'm **Punit AI** 👋 — your intelligent guide to everything about Punit Badyal.\n\nI can answer questions about his skills, projects, availability, and more. How can I help you today?",
  id: 'welcome',
};

// ── Helpers ─────────────────────────────────────────────────────
function parseMarkdown(text) {
  // Bold **text**
  let html = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  // Line breaks
  html = html.replace(/\n/g, '<br />');
  return html;
}

function MessageBubble({ msg }) {
  const isBot = msg.role === 'assistant';
  return (
    <div className={`chat-bubble ${isBot ? 'bot' : 'user'}`}>
      {isBot && (
        <div className="bot-avatar" aria-hidden="true">
          <span>AI</span>
        </div>
      )}
      <div
        className="bubble-text"
        dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }}
      />
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="chat-bubble bot typing-bubble">
      <div className="bot-avatar" aria-hidden="true">
        <span>AI</span>
      </div>
      <div className="typing-indicator">
        <span />
        <span />
        <span />
      </div>
    </div>
  );
}

// ── Main Component ───────────────────────────────────────────────
export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([WELCOME_MESSAGE]);
  const [input, setInput]     = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError]     = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);

  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);
  const abortRef       = useRef(null);

  // Auto-scroll to bottom
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isLoading, isOpen, scrollToBottom]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Listen for external "open-punit-ai" event (e.g. Home CTA button)
  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('open-punit-ai', handler);
    return () => window.removeEventListener('open-punit-ai', handler);
  }, []);

  // Cleanup abort on unmount
  useEffect(() => () => abortRef.current?.abort(), []);

  // ── Send Message ─────────────────────────────────────────────
  const sendMessage = useCallback(
    async (text) => {
      const trimmed = (text || input).trim();
      if (!trimmed || isLoading) return;

      setInput('');
      setError('');
      setShowSuggestions(false);

      const userMsg = { role: 'user', content: trimmed, id: Date.now() };
      const history = [...messages, userMsg];
      setMessages(history);
      setIsLoading(true);

      // ── 1. Try local knowledge base first ──────────────────
      const localReply = getLocalReply(trimmed);
      if (localReply) {
        await fakeDelay(500 + Math.random() * 400);
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: localReply, id: Date.now() },
        ]);
        setIsLoading(false);
        return;
      }

      // ── 2. Fall back to OpenAI backend ─────────────────────
      abortRef.current = new AbortController();
      try {
        const payload = history
          .filter((m) => m.id !== 'welcome')
          .map(({ role, content }) => ({ role, content }));

        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: payload }),
          signal: abortRef.current.signal,
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Server error');

        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.reply, id: Date.now() },
        ]);
      } catch (err) {
        if (err.name === 'AbortError') return;
        // Backend unavailable — give a graceful fallback answer
        await fakeDelay(400);
        setMessages((prev) => [
          ...prev,
          {
            role: 'assistant',
            content:
              "That's a great question! For detailed answers on anything specific, feel free to reach out to Punit directly:\n\n📧 **punitbadyal01@gmail.com**\n🐙 **github.com/punitbadyal01-blip**\n\nHe typically responds within 24 hours. 😊",
            id: Date.now(),
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    },
    [input, isLoading, messages]
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const handleOpen = () => {
    setIsOpen((v) => !v);
  };

  const handleClear = () => {
    setMessages([WELCOME_MESSAGE]);
    setError('');
    setShowSuggestions(true);
    setInput('');
  };

  return (
    <>
      {/* ── Floating Trigger Button ─────────────────────────── */}
      <button
        className={`chatbot-trigger ${isOpen ? 'open' : ''}`}
        onClick={handleOpen}
        aria-label={isOpen ? 'Close Punit AI chat' : 'Open Punit AI chat'}
        title="Chat with Punit AI"
      >
        <span className="trigger-ring" aria-hidden="true" />
        <span className="trigger-icon">
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
              <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none" />
              <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
            </svg>
          )}
        </span>
        {!isOpen && <span className="trigger-badge">AI</span>}
      </button>

      {/* ── Chat Window ─────────────────────────────────────── */}
      <div className={`chatbot-window ${isOpen ? 'visible' : ''}`} role="dialog" aria-label="Punit AI Chatbot">

        {/* Header */}
        <div className="chat-header">
          <div className="chat-header__info">
            <div className="chat-header__avatar">
              <span>P</span>
              <span className="online-dot" aria-hidden="true" />
            </div>
            <div>
              <p className="chat-header__name">Punit AI</p>
              <p className="chat-header__status">● Online — Powered by OpenAI</p>
            </div>
          </div>
          <div className="chat-header__actions">
            <button onClick={handleClear} title="Clear chat" className="header-btn" aria-label="Clear chat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 .49-3.1" />
              </svg>
            </button>
            <button onClick={handleOpen} title="Close chat" className="header-btn" aria-label="Close chat">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Message List */}
        <div className="chat-messages" role="log" aria-live="polite">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} />
          ))}
          {isLoading && <TypingIndicator />}
          {error && (
            <div className="chat-error">
              <span>⚠ {error}</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions */}
        {showSuggestions && (
          <div className="chat-suggestions">
            {QUICK_SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                className="suggestion-chip"
                onClick={() => sendMessage(s.value)}
                disabled={isLoading}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="chat-input-bar">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything about Punit…"
            disabled={isLoading}
            maxLength={500}
            aria-label="Chat input"
          />
          <button
            className={`send-btn ${input.trim() ? 'active' : ''}`}
            onClick={() => sendMessage()}
            disabled={isLoading || !input.trim()}
            aria-label="Send message"
          >
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" fill="currentColor" stroke="none" />
            </svg>
          </button>
        </div>

        {/* Footer */}
        <p className="chat-footer">Punit AI · Powered by OpenAI GPT-4o mini</p>
      </div>
    </>
  );
}
