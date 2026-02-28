// ==============================================================
// Certificates.jsx — Certificates section with images
// ==============================================================
import { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { certificatesData } from '../../data/data';
import './Certificates.css';

/**
 * CertCard — reusable certificate card component
 */
const CertCard = ({ cert, index, onClick }) => (
    <article
        className="cert-card fade-in"
        style={{
            animationDelay: `${index * 0.1}s`,
        }}
        onClick={() => onClick(cert)}
        aria-label={`Certificate: ${cert.title}`}
    >
        <div className="cert-card__image-wrapper">
            <img 
                src={cert.image} 
                alt={cert.title} 
                className="cert-card__image"
            />
            <div className="cert-card__overlay">
                <span className="cert-card__view-text">Click to view</span>
            </div>
        </div>
    </article>
);

const Certificates = () => {
    const sectionRef = useRef(null);
    const [selectedCert, setSelectedCert] = useState(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        sectionRef.current?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    // Close modal when clicking outside
    const handleModalClick = (e) => {
        if (e.target.className === 'cert-modal') {
            setSelectedCert(null);
        }
    };

    // Close modal on Escape key
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

                {/* Header */}
                <div className="section-header fade-in">
                    <p className="section-subtitle">My Achievements</p>
                    <h2 className="section-title">
                        Certificates &amp; <span className="gradient-text">Credentials</span>
                    </h2>
                    <div className="section-divider" />
                    <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '0.95rem' }}>
                        Continuous learning is my superpower — here are my credentials
                    </p>
                </div>

                {/* Cards grid */}
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

            {/* Modal for viewing certificate */}
            {selectedCert && (
                <div className="cert-modal" onClick={handleModalClick}>
                    <div className="cert-modal__content">
                        <button 
                            className="cert-modal__close"
                            onClick={() => setSelectedCert(null)}
                            aria-label="Close certificate view"
                        >
                            <FaTimes />
                        </button>
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
