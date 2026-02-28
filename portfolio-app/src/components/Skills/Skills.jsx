// ==============================================================
// Skills.jsx — Skills section with progress bars and tag chips
// ==============================================================
import { useEffect, useRef } from 'react';
import { skillsData } from '../../data/data';
import './Skills.css';

/**
 * Renders a single skill with animated progress bar
 */
const SkillBar = ({ skill, index }) => (
    <div className="skill-item" role="listitem">
        <div className="skill-item__header">
            <span className="skill-item__name">
                <span className="skill-item__icon" aria-hidden="true">{skill.icon}</span>
                {skill.name}
            </span>
            <span className="skill-item__level">{skill.level}%</span>
        </div>
        <div className="skill-bar" role="progressbar" aria-valuenow={skill.level} aria-valuemin={0} aria-valuemax={100}>
            <div
                className="skill-bar__fill"
                style={{
                    width: `${skill.level}%`,
                    '--delay': `${index * 0.1}s`,
                }}
            />
        </div>
    </div>
);

/**
 * Renders a skill chip tag for Core / Soft skills
 */
const SkillTag = ({ skill }) => (
    <div className="skill-tag" role="listitem">
        <span className="skill-tag__icon" aria-hidden="true">{skill.icon}</span>
        <span className="skill-tag__name">{skill.name}</span>
    </div>
);

const Skills = () => {
    const sectionRef = useRef(null);

    // Activate fade-in on scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        sectionRef.current?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="skills section" ref={sectionRef}>
            <div className="container">

                {/* Header */}
                <div className="section-header fade-in">
                    <p className="section-subtitle">What I Know</p>
                    <h2 className="section-title">
                        My <span className="gradient-text">Skills</span>
                    </h2>
                    <div className="section-divider" />
                </div>

                <div className="skills__grid">

                    {/* ---- Technical Skills (progress bars) ---- */}
                    <div className="skills__category fade-in">
                        <div className="skills__cat-header">
                            <div className="skills__cat-icon" aria-hidden="true">⚡</div>
                            <h3 className="skills__cat-title">Programming Languages</h3>
                        </div>
                        <div role="list">
                            {skillsData.technical.map((skill, i) => (
                                <SkillBar key={skill.name} skill={skill} index={i} />
                            ))}
                        </div>
                    </div>

                    {/* ---- Tools & Frameworks (chips) ---- */}
                    <div className="skills__category fade-in">
                        <div className="skills__cat-header">
                            <div className="skills__cat-icon" aria-hidden="true">⚙️</div>
                            <h3 className="skills__cat-title">Tools & Frameworks</h3>
                        </div>
                        <div className="skills__tags" role="list">
                            {skillsData.tools.map((skill) => (
                                <SkillTag key={skill.name} skill={skill} />
                            ))}
                        </div>
                    </div>

                    {/* ---- Core Subjects (chips) ---- */}
                    <div className="skills__category fade-in">
                        <div className="skills__cat-header">
                            <div className="skills__cat-icon" aria-hidden="true">📚</div>
                            <h3 className="skills__cat-title">Core Subjects</h3>
                        </div>
                        <div className="skills__tags" role="list">
                            {skillsData.core.map((skill) => (
                                <SkillTag key={skill.name} skill={skill} />
                            ))}
                        </div>
                    </div>

                    {/* ---- Soft Skills (chips) ---- */}
                    <div className="skills__category fade-in">
                        <div className="skills__cat-header">
                            <div className="skills__cat-icon" aria-hidden="true">🤝</div>
                            <h3 className="skills__cat-title">Soft Skills</h3>
                        </div>
                        <div className="skills__tags" role="list">
                            {skillsData.soft.map((skill) => (
                                <SkillTag key={skill.name} skill={skill} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Skills;
