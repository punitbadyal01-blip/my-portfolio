// ==============================================================
// Certificates.jsx — Visual grid showcase + lightbox
// ==============================================================
import { useEffect, useRef, useState, useCallback } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaAward } from 'react-icons/fa';
import { certificatesData } from '../../data/data';
import './Certificates.css';

const Certificates = () => {
    const sectionRef = useRef(null);
    const [lightbox, setLightbox] = useState(null); // index or null

    /* Fade-in observer */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        sectionRef.current?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    const total = certificatesData.length;
    const prev = useCallback(() => setLightbox((i) => (i - 1 + total) % total), [total]);
    const next = useCallback(() => setLightbox((i) => (i + 1) % total), [total]);
    const close = useCallback(() => setLightbox(null), []);

    /* Keyboard + scroll lock */
    useEffect(() => {
        const onKey = (e) => {
            if (lightbox === null) return;
            if (e.key === 'Escape')      close();
            if (e.key === 'ArrowLeft')   prev();
            if (e.key === 'ArrowRight')  next();
        };
        document.addEventListener('keydown', onKey);
        document.body.style.overflow = lightbox !== null ? 'hidden' : '';
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [lightbox, prev, next, close]);

    return (
        <div className="certificates section" ref={sectionRef}>
            <div className="container">

                {/* ── Header ── */}
                <div className="section-header fade-in">
                    <p className="section-subtitle">My Achievements</p>
                    <h2 className="section-title">
                        Certificates &amp; <span className="gradient-text">Credentials</span>
                    </h2>
                    <div className="section-divider" />
                    <p className="cert-header-note">
                        <FaAward style={{ marginRight: '0.4rem', color: 'var(--accent-primary)' }} />
                        {total} certified credentials — click any to view full size
                    </p>
                </div>

                {/* ── Masonry Grid ── */}
                <div className="cert-grid">
                    {certificatesData.map((cert, index) => (
                        <button
                            key={cert.id}
                            className="cert-tile fade-in"
                            style={{ animationDelay: `${index * 0.06}s` }}
                            onClick={() => setLightbox(index)}
                            aria-label={`View certificate ${index + 1}`}
                        >
                            <img
                                src={cert.image}
                                alt={`Certificate ${index + 1}`}
                                className="cert-tile__img"
                                loading="lazy"
                            />
                            {/* Hover overlay */}
                            <div className="cert-tile__overlay">
                                <div className="cert-tile__overlay-inner">
                                    <FaExpand className="cert-tile__expand-icon" />
                                    <span className="cert-tile__num">#{index + 1}</span>
                                </div>
                            </div>
                            {/* Bottom caption */}
                            <div className="cert-tile__caption">
                                <span className="cert-tile__caption-title">{cert.title}</span>
                                <span className="cert-tile__caption-issuer">{cert.issuer}</span>
                            </div>
                            {/* Corner badge */}
                            <span className="cert-tile__badge">{index + 1}</span>
                        </button>
                    ))}
                </div>

            </div>

            {/* ── Lightbox ── */}
            {lightbox !== null && (
                <div
                    className="cert-lightbox"
                    onClick={(e) => e.target.classList.contains('cert-lightbox') && close()}
                    role="dialog"
                    aria-modal="true"
                >
                    <div className="cert-lightbox__panel">

                        {/* Top bar */}
                        <div className="cert-lightbox__topbar">
                            <div className="cert-lightbox__info">
                                <span className="cert-lightbox__counter">
                                    {lightbox + 1} <span style={{ opacity: 0.4 }}>/ {total}</span>
                                </span>
                                <span className="cert-lightbox__title">{certificatesData[lightbox].title}</span>
                                <span className="cert-lightbox__issuer">{certificatesData[lightbox].issuer}</span>
                            </div>
                            <button className="cert-lightbox__close" onClick={close} aria-label="Close">
                                <FaTimes />
                            </button>
                        </div>

                        {/* Main image */}
                        <div className="cert-lightbox__stage">
                            <button className="cert-lightbox__arrow cert-lightbox__arrow--left" onClick={prev} aria-label="Previous">
                                <FaChevronLeft />
                            </button>

                            <div className="cert-lightbox__img-wrap">
                                <img
                                    key={lightbox}
                                    src={certificatesData[lightbox].image}
                                    alt={`Certificate ${lightbox + 1}`}
                                    className="cert-lightbox__img"
                                />
                            </div>

                            <button className="cert-lightbox__arrow cert-lightbox__arrow--right" onClick={next} aria-label="Next">
                                <FaChevronRight />
                            </button>
                        </div>

                        {/* Thumbnail strip */}
                        <div className="cert-lightbox__strip">
                            {certificatesData.map((cert, i) => (
                                <button
                                    key={cert.id}
                                    className={`cert-lightbox__thumb${i === lightbox ? ' active' : ''}`}
                                    onClick={() => setLightbox(i)}
                                    aria-label={`Go to certificate ${i + 1}`}
                                >
                                    <img src={cert.image} alt="" />
                                </button>
                            ))}
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Certificates;

