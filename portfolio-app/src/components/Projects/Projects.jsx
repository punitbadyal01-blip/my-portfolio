// ==============================================================
// Projects.jsx — Projects section with animated cards
// ==============================================================
import { useEffect, useRef } from 'react';
import { FaGithub, FaExternalLinkAlt, FaCode } from 'react-icons/fa';
import { projectsData } from '../../data/data';
import './Projects.css';

/**
 * ProjectCard — reusable project card component
 */
const ProjectCard = ({ project, index }) => (
    <article
        className="project-card fade-in"
        style={{ animationDelay: `${index * 0.15}s` }}
        aria-label={`Project: ${project.title}`}
    >
        {/* Image area */}
        <div className="project-card__image">
            <img
                src={project.image}
                alt={`Screenshot of ${project.title}`}
                loading="lazy"
            />
            {/* Hover overlay */}
            <div className="project-card__overlay">
                <a
                    className="overlay-btn overlay-btn-primary"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub repository for ${project.title}`}
                >
                    <FaGithub /> GitHub
                </a>
                <a
                    className="overlay-btn overlay-btn-outline"
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Live demo of ${project.title}`}
                >
                    <FaExternalLinkAlt /> Demo
                </a>
            </div>
            {/* Featured badge */}
            {project.featured && (
                <span className="project-card__badge" aria-label="Featured project">⭐ Featured</span>
            )}
        </div>

        {/* Card body */}
        <div className="project-card__body">
            <h3 className="project-card__title">{project.title}</h3>
            <p className="project-card__desc">{project.description}</p>

            {/* Technology badges */}
            <div className="project-card__techs" aria-label="Technologies used">
                {project.technologies.map((tech) => (
                    <span key={tech} className="tech-badge">{tech}</span>
                ))}
            </div>

            {/* Action buttons */}
            <div className="project-card__actions">
                <a
                    id={`github-btn-${project.id}`}
                    className="action-btn action-btn-github"
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub for ${project.title}`}
                >
                    <FaGithub /> GitHub
                </a>
                <a
                    id={`demo-btn-${project.id}`}
                    className="action-btn action-btn-demo"
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Live demo for ${project.title}`}
                >
                    <FaExternalLinkAlt /> Live Demo
                </a>
            </div>
        </div>
    </article>
);

const Projects = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
            { threshold: 0.1 }
        );
        sectionRef.current?.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="projects section" ref={sectionRef}>
            <div className="container">

                {/* Header */}
                <div className="section-header fade-in">
                    <p className="section-subtitle">What I've Built</p>
                    <h2 className="section-title">
                        My <span className="gradient-text">Projects</span>
                    </h2>
                    <div className="section-divider" />
                    <p style={{ color: 'var(--text-secondary)', marginTop: '1rem', fontSize: '0.95rem' }}>
                        Crafting real-world solutions with cutting-edge technologies
                    </p>
                </div>

                {/* Cards grid */}
                <div className="projects__grid">
                    {projectsData.map((project, index) => (
                        <ProjectCard key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* GitHub CTA */}
                <div style={{ textAlign: 'center', marginTop: '3rem' }}>
                    <a
                        id="all-projects-github-btn"
                        className="btn btn-outline"
                        href="https://github.com/punitbadyal"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="View all projects on GitHub"
                    >
                        <FaGithub /> View All on GitHub
                    </a>
                </div>

            </div>
        </div>
    );
};

export default Projects;
