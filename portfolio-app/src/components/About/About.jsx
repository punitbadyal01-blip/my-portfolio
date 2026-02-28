// ==============================================================
// About.jsx -- About / Education / Goals section
// ==============================================================
import { useEffect, useRef } from 'react';
import {
    FaGithub, FaLinkedin, FaEnvelope,
    FaHome, FaMapMarkerAlt, FaGraduationCap, FaUniversity,
    FaBriefcase, FaRocket, FaUser, FaBullseye, FaSeedling,
    FaBrain, FaThumbtack, FaPuzzlePiece, FaHandshake,
    FaBolt, FaSyncAlt, FaCommentDots, FaStar
} from 'react-icons/fa';
import profilePhoto from '../../assets/profile.jpg';
import './About.css';

const About = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => {
                if (e.isIntersecting) {
                    e.target.classList.add('visible');
                    observer.unobserve(e.target);
                }
            }),
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
        const els = sectionRef.current?.querySelectorAll('.fade-in');
        els?.forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="about section" ref={sectionRef}>
            <div className="container">

                {/* Section header */}
                <div className="section-header fade-in">
                    <p className="section-subtitle">Who I Am</p>
                    <h2 className="section-title">
                        About <span className="gradient-text">Me</span>
                    </h2>
                    <div className="section-divider" />
                </div>

                <div className="about__content">

                    {/* ---- Left: Info Card ---- */}
                    <div className="about__card fade-in">
                        <div className="about__avatar-image-wrapper">
                            <img src={profilePhoto} alt="Punit Badyal" className="about__avatar-photo" />
                        </div>
                        <h3 className="about__card-name">Punit Badyal</h3>
                        <p className="about__card-role">Computer Science Engineering Student</p>

                        <div className="about__info-list">
                            <div className="about__info-item">
                                <span className="about__info-icon"><FaHome /></span>
                                <span>From Jammu &amp; Kashmir</span>
                            </div>
                            <div className="about__info-item">
                                <span className="about__info-icon"><FaMapMarkerAlt /></span>
                                <span>Karur, Tamil Nadu</span>
                            </div>
                            <div className="about__info-item">
                                <span className="about__info-icon"><FaGraduationCap /></span>
                                <span>B.E. CSE &mdash; 2nd Year, 4th Sem</span>
                            </div>
                            <div className="about__info-item">
                                <span className="about__info-icon"><FaUniversity /></span>
                                <span>M. Kumarasamy College of Engg.</span>
                            </div>
                            <div className="about__info-item">
                                <span className="about__info-icon"><FaBriefcase /></span>
                                <span>Open to Internships</span>
                            </div>
                            <div className="about__info-item">
                                <span className="about__info-icon"><FaRocket /></span>
                                <span>Full Stack + AI/ML</span>
                            </div>
                        </div>

                        <div className="about__socials">
                            <a className="social-icon-link" href="https://github.com/punitbadyal01-blip" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
                            <a className="social-icon-link" href="https://www.linkedin.com/in/punit-badyal-1b2935324" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
                            <a className="social-icon-link" href="mailto:punitbadyal01@gmail.com" aria-label="Email"><FaEnvelope /></a>
                        </div>
                    </div>

                    {/* ---- Right: Text blocks ---- */}
                    <div className="about__blocks">

                        <div className="about__block fade-in">
                            <div className="about__block-header">
                                <div className="about__block-icon"><FaUser /></div>
                                <h3 className="about__block-title">Hello! I'm Punit Badyal</h3>
                            </div>
                            <p>
                                A passionate and dedicated Computer Science Engineering student currently pursuing
                                my <strong>2nd Year (4th Semester)</strong> in the CSE Department at
                                M. Kumarasamy College of Engineering, Karur, Tamil Nadu.
                            </p>
                            <p style={{ marginTop: '0.75rem' }}>
                                Originally from <strong>Jammu &amp; Kashmir</strong>, I moved to Tamil Nadu to
                                pursue my engineering degree and expand my technical exposure. This journey has helped
                                me grow both personally and professionally.
                            </p>
                        </div>

                        <div className="about__block fade-in">
                            <div className="about__block-header">
                                <div className="about__block-icon"><FaGraduationCap /></div>
                                <h3 className="about__block-title">Education</h3>
                            </div>
                            <div className="education-entry">
                                <div className="edu-dot-wrapper">
                                    <div className="edu-dot" />
                                    <div className="edu-line" />
                                </div>
                                <div className="edu-content">
                                    <p className="edu-degree">B.E. Computer Science Engineering</p>
                                    <p className="edu-school">M. Kumarasamy College of Engineering, Karur, Tamil Nadu</p>
                                    <p className="edu-period">2024 &ndash; 2028 &nbsp;|&nbsp; 2nd Year &ndash; 4th Semester</p>
                                </div>
                            </div>
                            <div className="education-entry">
                                <div className="edu-dot-wrapper">
                                    <div className="edu-dot" />
                                </div>
                                <div className="edu-content">
                                    <p className="edu-degree">12th Grade &mdash; Higher Secondary Education</p>
                                    <p className="edu-school">Jammu &amp; Kashmir</p>
                                    <p className="edu-period">2022 &ndash; 2024</p>
                                </div>
                            </div>
                        </div>

                        <div className="about__block fade-in">
                            <div className="about__block-header">
                                <div className="about__block-icon"><FaBullseye /></div>
                                <h3 className="about__block-title">Career Objective</h3>
                            </div>
                            <p>
                                My goal is to become a skilled <strong>Full-Stack Developer and AI Engineer</strong>,
                                building intelligent and user-friendly applications that solve real-world problems.
                                I am continuously learning new technologies and improving my development skills.
                            </p>
                        </div>

                        <div className="about__block fade-in">
                            <div className="about__block-header">
                                <div className="about__block-icon"><FaSeedling /></div>
                                <h3 className="about__block-title">Currently Learning</h3>
                            </div>
                            <div className="learning-list">
                                <span className="learning-badge">Advanced React</span>
                                <span className="learning-badge">Spring Boot Backend</span>
                                <span className="learning-badge">AI / ML Concepts</span>
                                <span className="learning-badge">Scalable Web Apps</span>
                            </div>
                        </div>

                        <div className="about__block fade-in">
                            <div className="about__block-header">
                                <div className="about__block-icon"><FaBrain /></div>
                                <h3 className="about__block-title">Soft Skills</h3>
                            </div>
                            <div className="soft-skills-grid">
                                <div className="soft-skill-item"><FaPuzzlePiece /> Problem-Solving</div>
                                <div className="soft-skill-item"><FaHandshake /> Team Collaboration</div>
                                <div className="soft-skill-item"><FaBolt /> Quick Learner</div>
                                <div className="soft-skill-item"><FaSyncAlt /> Adaptability</div>
                                <div className="soft-skill-item"><FaCommentDots /> Communication</div>
                                <div className="soft-skill-item"><FaStar /> Leadership</div>
                            </div>
                        </div>

                        <div className="about__block fade-in">
                            <div className="about__block-header">
                                <div className="about__block-icon"><FaThumbtack /></div>
                                <h3 className="about__block-title">Interests</h3>
                            </div>
                            <p>
                                Developing innovative software solutions &nbsp;&bull;&nbsp; Exploring AI and Machine
                                Learning &nbsp;&bull;&nbsp; Gaming &amp; Game Development &nbsp;&bull;&nbsp; Building
                                real-world practical projects
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
