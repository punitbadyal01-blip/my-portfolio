// ==============================================================
// Home.jsx — Hero section component with typewriter effect
// ==============================================================
import { useEffect, useRef, useState } from 'react';
import { FaGithub, FaLinkedin, FaDownload, FaArrowDown } from 'react-icons/fa';
import profilePhoto from '../../assets/profile.jpg';
import './Home.css';

const openPunitAI = () => window.dispatchEvent(new CustomEvent('open-punit-ai'));

const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Home = () => {
    const statsRef = useRef(null);
    const titleRef = useRef(null);
    const [displayText, setDisplayText] = useState('');
    const fullText = 'Full Stack Developer & AI Enthusiast';

    // Typewriter effect
    useEffect(() => {
        let index = 0;
        const timer = setInterval(() => {
            if (index < fullText.length) {
                setDisplayText(fullText.substring(0, index + 1));
                index++;
            } else {
                clearInterval(timer);
            }
        }, 50);
        return () => clearInterval(timer);
    }, []);

    // Animate stat numbers counting up
    useEffect(() => {
        const targets = [3, 6, 2];    // Projects, Certificates, Years learning
        const els = statsRef.current?.querySelectorAll('.stat-number');
        if (!els) return;

        const timer = setTimeout(() => {
            els.forEach((el, i) => {
                let count = 0;
                const target = targets[i];
                const step = Math.ceil(target / 30);
                const interval = setInterval(() => {
                    count = Math.min(count + step, target);
                    el.textContent = count + '+';
                    if (count >= target) clearInterval(interval);
                }, 50);
            });
        }, 300);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="home section">
            <div className="container home__content">

                {/* ---- Left: Text ---- */}
                <div className="home__left">
                    {/* Greeting chip */}
                    <div className="home__greeting animate-slide-down">
                        <span className="greeting-dot" aria-hidden="true" />
                        Available for Internships &amp; Opportunities
                    </div>

                    {/* Main headline */}
                    <h1 className="home__name animate-slide-up">
                        Hi, I'm{' '}
                        <span className="gradient-text">Punit Badyal</span>
                    </h1>

                    {/* Typewriter tagline */}
                    <p className="home__tagline">
                        <span className="typewriter-text">{displayText}</span>
                        <span className="typewriter-cursor">|</span>
                    </p>

                    {/* Role badges */}
                    <div className="home__badges">
                        <span className="badge">💻 CS Student</span>
                        <span className="badge">⚛️ React Developer</span>
                        <span className="badge">🤖 AI/ML Enthusiast</span>
                    </div>

                    {/* Summary */}
                    <p className="home__summary animate-slide-up" style={{ animationDelay: '0.2s' }}>
                        Passionate Computer Science student building innovative, scalable software solutions. 
                        Specialized in Full Stack Development with React.js and Python. Love turning complex ideas 
                        into elegant, user-centric applications.
                    </p>

                    {/* CTA buttons */}
                    <div className="home__cta animate-slide-up" style={{ animationDelay: '0.4s' }}>
                        <a
                            id="resume-download-btn"
                            className="btn btn-primary"
                            href="/resume.pdf"
                            download
                            aria-label="Download Resume"
                        >
                            <FaDownload /> Download Resume
                        </a>
                        <button
                            id="view-projects-btn"
                            className="btn btn-outline"
                            onClick={() => scrollTo('projects')}
                            aria-label="View my projects"
                        >
                            View Projects <FaArrowDown />
                        </button>
                    </div>

                    {/* Social links */}
                    <div className="home__socials animate-slide-up" style={{ animationDelay: '0.6s' }}>
                        <span className="home__social-label">Follow me</span>
                        <a
                            id="github-hero-link"
                            className="social-icon-link"
                            href="https://github.com/punitbadyal01-blip"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            title="Visit my GitHub"
                        >
                            <FaGithub />
                        </a>
                        <a
                            id="linkedin-hero-link"
                            className="social-icon-link"
                            href="https://www.linkedin.com/in/punit-badyal-1b2935324"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            title="Visit my LinkedIn"
                        >
                            <FaLinkedin />
                        </a>
                    </div>
                </div>

                {/* ---- Right: Stats Card ---- */}
                <div className="home__right animate-slide-right">
                    <div className="home__stats-card" ref={statsRef}>
                        {/* Profile indicator */}
                        <div className="stats__header">
                            <div className="stats__avatar">
                                <img src={profilePhoto} alt="Punit Badyal" />
                            </div>
                            <div className="stats__status">
                                <div className="status-dot"></div>
                                <span>Available</span>
                            </div>
                        </div>

                        {/* Stats Grid */}
                        <div className="stats__grid">
                            <div className="stat-item">
                                <div className="stat-number">0</div>
                                <div className="stat-label">Projects</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">0</div>
                                <div className="stat-label">Certifications</div>
                            </div>
                            <div className="stat-item">
                                <div className="stat-number">0</div>
                                <div className="stat-label">Yrs Learning</div>
                            </div>
                        </div>

                        {/* Tech Stack Quick View */}
                        <div className="stats__tech">
                            <p className="stats__tech-label">Tech Stack:</p>
                            <div className="stats__tech-tags">
                                <span className="tech-mini">React</span>
                                <span className="tech-mini">Python</span>
                                <span className="tech-mini">Java</span>
                                <span className="tech-mini">JS</span>
                            </div>
                        </div>

                        {/* CTA to chat */}
                        <button 
                            className="stats__chat-btn"
                            onClick={openPunitAI}
                            aria-label="Chat with me"
                        >
                            💬 Chat with me
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
                            rel="noopener noreferrer"
                            aria-label="GitHub Profile"
                        >
                            <FaGithub />
                        </a>
                        <a
                            id="linkedin-hero-link"
                            className="social-icon-link"
                            href="https://www.linkedin.com/in/punit-badyal-1b2935324"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn Profile"
                        >
                            <FaLinkedin />
                        </a>
                    </div>

                    {/* Stats row */}
                    <div className="home__stats" ref={statsRef}>
                        <div className="stat-item">
                            <span className="stat-number">3+</span>
                            <span className="stat-label">Projects</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">6+</span>
                            <span className="stat-label">Certificates</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-number">2+</span>
                            <span className="stat-label">Yrs Learning</span>
                        </div>
                    </div>
                </div>

                {/* ---- Right: Avatar ---- */}
                <div className="home__right">

                    {/* Floating tech badges */}
                    <div className="home__float-badge badge-top-left">
                        ⚛️ React.js
                    </div>
                    <div className="home__float-badge badge-top-right">
                        🤖 AI / ML
                    </div>
                    <div className="home__float-badge badge-bottom-right">
                        🐍 Python
                    </div>

                    {/* Avatar column: photo + AI badge below */}
                    <div className="home__avatar-col">
                        {/* Photo */}
                        <div className="home__avatar-wrapper">
                            <div className="home__avatar-card">
                                <img src={profilePhoto} alt="Punit Badyal" className="home__avatar-image" />
                            </div>
                        </div>

                        {/* AI Bot Badge — BELOW photo */}
                        <button
                            className="home__ai-bot-badge"
                            onClick={(e) => { e.preventDefault(); e.stopPropagation(); openPunitAI(); }}
                            aria-label="Chat with Punit AI"
                            title="Chat with Punit AI"
                        >
                            <span className="home__ai-bot-badge__ring" aria-hidden="true" />
                            <span className="home__ai-bot-badge__icon" aria-hidden="true">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                    <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
                                    <circle cx="12" cy="10" r="1" fill="currentColor" stroke="none" />
                                    <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
                                </svg>
                            </span>
                            <span className="home__ai-bot-badge__label">Chat with Punit AI</span>
                            <span className="home__ai-bot-badge__dot" aria-hidden="true" />
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Home;
