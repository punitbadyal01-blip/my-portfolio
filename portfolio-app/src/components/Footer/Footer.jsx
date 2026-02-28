// ==============================================================
// Footer.jsx — Site footer
// ==============================================================
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import './Footer.css';

const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

const Footer = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="footer" role="contentinfo">
            <div className="container footer__inner">

                {/* Copyright */}
                <p className="footer__left">
                    Made with <span className="footer__heart" aria-label="love">❤️</span> by{' '}
                    <span className="footer__name">Punit Badyal</span>
                    &nbsp;© {year}
                </p>

                {/* Quick links */}
                <ul className="footer__links" role="list" aria-label="Footer navigation">
                    {['home', 'about', 'skills', 'projects', 'certificates', 'contact'].map((id) => (
                        <li key={id}>
                            <a
                                className="footer__link"
                                onClick={() => scrollTo(id)}
                                href={`#${id}`}
                                aria-label={`Go to ${id} section`}
                            >
                                {id.charAt(0).toUpperCase() + id.slice(1)}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Social icons */}
                <div className="footer__socials" aria-label="Social media links">
                    <a
                        id="footer-github-link"
                        className="social-icon-link"
                        href="https://github.com/punitbadyal01-blip"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                    >
                        <FaGithub />
                    </a>
                    <a
                        id="footer-linkedin-link"
                        className="social-icon-link"
                        href="https://www.linkedin.com/in/punit-badyal-1b2935324"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                    >
                        <FaLinkedin />
                    </a>
                    <a
                        id="footer-email-link"
                        className="social-icon-link"
                        href="mailto:punitbadyal01@gmail.com"
                        aria-label="Email"
                    >
                        <FaEnvelope />
                    </a>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
