// ==============================================================
// App.jsx — Root component for Punit Badyal's Portfolio
// ==============================================================
import { useState, useEffect } from 'react';
import './index.css';

// Section components
import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Chatbot from './components/Chatbot/Chatbot';
import About from './components/About/About';
import Skills from './components/Skills/Skills';
import Projects from './components/Projects/Projects';
import Certificates from './components/Certificates/Certificates';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import Particles from './components/Particles/Particles';

function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // Apply theme class to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = ['home', 'about', 'skills', 'projects', 'certificates', 'contact'];
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="page-wrapper">
      {/* Animated particles */}
      <Particles />

      {/* Animated background blobs */}
      <div className="bg-blobs" aria-hidden="true">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <Navbar
        activeSection={activeSection}
        scrolled={scrolled}
        isDark={isDark}
        toggleTheme={() => setIsDark((p) => !p)}
      />

      <main>
        <section id="home"><Home /></section>
        <section id="about"><About /></section>
        <section id="skills"><Skills /></section>
        <section id="projects"><Projects /></section>
        <section id="certificates"><Certificates /></section>
        <section id="contact"><Contact /></section>
      </main>

      <Footer />

      {/* ── Punit AI Chatbot ─────────────────────────────── */}
      <Chatbot />
    </div>
  );
}

export default App;
