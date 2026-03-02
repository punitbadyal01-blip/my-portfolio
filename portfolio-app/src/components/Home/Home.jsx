// ==============================================================
// Home.jsx — Hero section component
// ==============================================================
import { useEffect, useRef } from 'react';
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

    // Animate stat numbers counting up
    useEffect(() => {
        const targets = [3, 6, 2];    // Projects, Certificates, Years learning
        const els = statsRef.current?.querySelectorAll('.stat-number');
        if (!els) return;

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
    }, []);

    return (
        <div className="home section">
            <div className="container home__content">

                {/* ---- Left: Text ---- */}
                <div className="home__left">
                    {/* Greeting chip */}
                    <div className="home__greeting">
                        <span className="greeting-dot" aria-hidden="true" />
                        Available for Internships &amp; Roles
                    </div>

                    {/* Name */}
                    <h1 className="home__name">
                        Hi, I'm{' '}
                        <span className="gradient-text">Punit Badyal</span>
                    </h1>

                    {/* Role tagline */}
                    <p className="home__role">
                        <span>💻 CS Student</span>
                        <span className="role-separator">|</span>
                        <span>⚛️ Full Stack Dev</span>
                        <span className="role-separator">|</span>
                        <span>🤖 AI/ML Enthusiast</span>
                    </p>

                    {/* Summary */}
                    <p className="home__summary">
                        A passionate Computer Science student dedicated to building innovative,
                        scalable software solutions. I specialize in React.js and Python, with a
                        strong interest in Artificial Intelligence and Machine Learning. I thrive
                        on turning complex ideas into elegant, user-centric applications.
                    </p>

                    {/* CTA buttons */}
                    <div className="home__cta">
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
                    <div className="home__socials">
                        <span className="home__social-label">Follow me</span>
                        <a
                            id="github-hero-link"
                            className="social-icon-link"
                            href="https://github.com/punitbadyal01-blip"
                            target="_blank"
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

                    {/* Avatar */}
                    <div className="home__avatar-wrapper">
                        <div className="home__avatar-card">
                            <img src={profilePhoto} alt="Punit Badyal" className="home__avatar-image" />
                        </div>

                        {/* AI Bot Badge — bottom of photo */}
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
                            <span className="home__ai-bot-badge__label">Punit AI</span>
                            <span className="home__ai-bot-badge__dot" aria-hidden="true" />
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Home;
