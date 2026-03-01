// ================================================================
// Chatbot.jsx — Punit AI Floating Chatbot
// React component with OpenAI backend integration
// ================================================================

import { useState, useEffect, useRef, useCallback } from 'react';
import './Chatbot.css';

// ── Config ──────────────────────────────────────────────────────
const API_URL = import.meta.env.VITE_CHATBOT_API_URL || 'http://localhost:5000/api/chat';

const QUICK_SUGGESTIONS = [
  { label: '👤 About Punit', value: 'Tell me about Punit Badyal.' },
  { label: '⚡ Skills', value: 'What are Punit\'s technical skills?' },
  { label: '🚀 Projects', value: 'What projects has Punit built?' },
  { label: '💼 Hire Me', value: 'How can I hire Punit or collaborate with him?' },
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

      abortRef.current = new AbortController();

      try {
        const payload = history
          .filter((m) => m.role !== 'welcome')
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
        setError(err.message || 'Something went wrong. Please try again.');
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
