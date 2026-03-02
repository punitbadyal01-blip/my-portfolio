// ================================================================
// Particles.jsx — Floating animated dots/stars background
// ================================================================
import { useMemo } from 'react';
import './Particles.css';

const Particles = () => {
    const particles = useMemo(() =>
        Array.from({ length: 140 }, (_, i) => ({
            id: i,
            size: Math.random() * 3 + 0.8,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 14 + 8,
            delay: -(Math.random() * 20),
            type: i % 4, // 0=purple dot, 1=cyan dot, 2=white dot, 3=star
        })),
        []
    );

    return (
        <div className="particles-bg" aria-hidden="true">
            {particles.map((p) => (
                p.type === 3 ? (
                    <span
                        key={p.id}
                        className="particle particle--star"
                        style={{
                            fontSize: (p.size * 3.2) + 'px',
                            left: p.x + '%',
                            top: p.y + '%',
                            animationDuration: p.duration + 's',
                            animationDelay: p.delay + 's',
                        }}
                    >★</span>
                ) : (
                    <span
                        key={p.id}
                        className={`particle particle--${p.type}`}
                        style={{
                            width: p.size + 'px',
                            height: p.size + 'px',
                            left: p.x + '%',
                            top: p.y + '%',
                            animationDuration: p.duration + 's',
                            animationDelay: p.delay + 's',
                        }}
                    />
                )
            ))}
        </div>
    );
};

export default Particles;
