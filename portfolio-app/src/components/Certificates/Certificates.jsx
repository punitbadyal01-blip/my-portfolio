// ==============================================================
// Certificates.jsx — Certificates section with click-to-view
// ==============================================================
import { useEffect, useRef, useState } from 'react';
import { FaTimes, FaEye, FaAward } from 'react-icons/fa';
import { certificatesData } from '../../data/data';
import './Certificates.css';

/**
 * CertCard — shows title, description & issuer. Image hidden until button click.
 */
const CertCard = ({ cert, index, onClick }) => (
    <article
        className="cert-card fade-in"
        style={{ animationDelay: `${index * 0.1}s` }}
        aria-label={`Certificate: ${cert.title}`}
    >
        {/* Icon */}
        <div className="cert-card__icon-wrapper">
            <span className="cert-card__icon" role="img" aria-label="certificate icon">
                {cert.icon || '🏆'}
            </span>
        </div>

        {/* Text content */}
        <div className="cert-card__body">
            <span className="cert-card__issuer">{cert.issuer}</span>
            <h3 className="cert-card__title">{cert.title}</h3>
            <p className="cert-card__desc">{cert.description}</p>
            {cert.date && (
                <span className="cert-card__date">
                    <FaAward style={{ marginRight: '0.35rem', fontSize: '0.75rem' }} />
                    {cert.date}
                </span>
            )}
        </div>

        {/* CTA — opens the image modal */}
        <button
            className="cert-card__btn"
            onClick={() => onClick(cert)}
            aria-label={`View certificate: ${cert.title}`}
        >
            <FaEye />
            View Certificate
        </button>
    </article>
);

const Certificates = () => {
    const sectionRef = useRef(null);
    const [selectedCert, setSelectedCert] = useState(null);

    /* Intersection Observer for fade-in */
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        sectionRef.current?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    /* Close modal on backdrop click */
    const handleModalClick = (e) => {
        if (e.target.classList.contains('cert-modal')) {
            setSelectedCert(null);
        }
    };

    /* Close modal on Escape key & lock body scroll */
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') setSelectedCert(null);
        };
        if (selectedCert) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [selectedCert]);

    return (
        <div className="certificates section" ref={sectionRef}>
            <div className="container">

                {/* Section Header */}
                <div className="section-header fade-in">
                    <p className="section-subtitle">My Achievements</p>
                    <h2 className="section-title">
                        Certificates &amp; <span className="gradient-text">Credentials</span>
                    </h2>
                    <div className="section-divider" />
                    <p className="cert-section-tagline">
                        Continuous learning is my superpower — here are my credentials
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="certificates__grid">
                    {certificatesData.map((cert, index) => (
                        <CertCard
                            key={cert.id}
                            cert={cert}
                            index={index}
                            onClick={setSelectedCert}
                        />
                    ))}
                </div>

            </div>

            {/* ── Modal: shows certificate image + info ── */}
            {selectedCert && (
                <div className="cert-modal" onClick={handleModalClick} role="dialog" aria-modal="true">
                    <div className="cert-modal__content">

                        {/* Close button */}
                        <button
                            className="cert-modal__close"
                            onClick={() => setSelectedCert(null)}
                            aria-label="Close certificate"
                        >
                            <FaTimes />
                        </button>

                        {/* Info banner */}
                        <div className="cert-modal__info">
                            <span className="cert-modal__icon">{selectedCert.icon || '🏆'}</span>
                            <div>
                                <h3 className="cert-modal__title">{selectedCert.title}</h3>
                                <p className="cert-modal__issuer">
                                    {selectedCert.issuer}
                                    {selectedCert.date && ` · ${selectedCert.date}`}
                                </p>
                                {selectedCert.description && (
                                    <p className="cert-modal__desc">{selectedCert.description}</p>
                                )}
                            </div>
                        </div>

                        {/* Certificate image */}
                        <img
                            src={selectedCert.image}
                            alt={selectedCert.title}
                            className="cert-modal__image"
                        />

                    </div>
                </div>
            )}
        </div>
    );
};

export default Certificates;
