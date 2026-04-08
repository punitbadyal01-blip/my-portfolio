// ================================================================
// Particles.jsx — Floating animated dots/stars background
// ================================================================
import { useMemo } from 'react';
import './Particles.css';

const Particles = () => {
    const particles = useMemo(() =>
        Array.from({ length: 75 }, (_, i) => ({
            id: i,
            size: Math.random() * 2.5 + 0.8,
            x: Math.random() * 100,
            y: Math.random() * 100,
            duration: Math.random() * 18 + 10,
            delay: -(Math.random() * 20),
            type: i % 3, // 0=purple, 1=cyan, 2=white
        })),
        []
    );

    return (
        <div className="particles-bg" aria-hidden="true">
            {particles.map((p) => (
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
            ))}
        </div>
    );
};

export default Particles;
