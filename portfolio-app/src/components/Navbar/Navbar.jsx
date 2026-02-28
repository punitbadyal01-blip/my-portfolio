// ==============================================================
// Navbar.jsx — Sticky navigation with mobile hamburger menu
// ==============================================================
import { useState } from 'react';
import { navLinks } from '../../data/data';
import './Navbar.css';

const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

const Navbar = ({ activeSection, scrolled, isDark, toggleTheme }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavClick = (id) => {
        scrollTo(id);
        setMenuOpen(false);
    };

    return (
        <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
            <div className="container navbar__inner">

                {/* Logo */}
                <a className="navbar__logo" onClick={() => handleNavClick('home')} href="#home" aria-label="Punit Badyal - Home">
                    <span className="navbar__logo-name">Punit Badyal</span>
                </a>

                {/* Desktop Links */}
                <ul className="navbar__links" role="list">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <a
                                className={`navbar__link${activeSection === link.id ? ' active' : ''}`}
                                onClick={() => handleNavClick(link.id)}
                                href={`#${link.id}`}
                                aria-current={activeSection === link.id ? 'page' : undefined}
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Right side controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    {/* Theme Toggle */}
                    <button
                        className="theme-toggle"
                        onClick={toggleTheme}
                        aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                        title={isDark ? 'Light Mode' : 'Dark Mode'}
                    >
                        {isDark ? '☀️' : '🌙'}
                    </button>

                    <a className="btn btn-primary navbar__cta" href="/resume.pdf" download aria-label="Download Resume">
                        Resume ↓
                    </a>

                    {/* Hamburger */}
                    <button
                        className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
                        onClick={() => setMenuOpen(!menuOpen)}
                        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={menuOpen}
                    >
                        <span className="hamburger-line" />
                        <span className="hamburger-line" />
                        <span className="hamburger-line" />
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`navbar__mobile${menuOpen ? ' open' : ''}`} role="dialog" aria-label="Mobile navigation">
                {navLinks.map((link) => (
                    <a
                        key={link.id}
                        className={`navbar__mobile-link${activeSection === link.id ? ' active' : ''}`}
                        onClick={() => handleNavClick(link.id)}
                        href={`#${link.id}`}
                    >
                        {link.label}
                    </a>
                ))}
                <button className="theme-toggle" onClick={() => { toggleTheme(); setMenuOpen(false); }} style={{ fontSize: '1.5rem', background: 'none', border: 'none', cursor: 'pointer', marginTop: '1rem' }}>
                    {isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
                </button>
                <a className="btn btn-primary" href="/resume.pdf" download style={{ marginTop: '1rem' }}>
                    Download Resume
                </a>
            </div>
        </nav>
    );
};

export default Navbar;
