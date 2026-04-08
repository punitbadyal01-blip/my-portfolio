// ==============================================================
// ProjectsList.jsx — Display and manage projects
// ==============================================================
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './Admin.css';

const ProjectsList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, 'projects'));
            const projectsList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setProjects(projectsList.sort((a, b) => b.createdAt - a.createdAt));
        } catch (err) {
            setError('Failed to fetch projects');
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await deleteDoc(doc(db, 'projects', id));
                setProjects((prev) => prev.filter((p) => p.id !== id));
            } catch (err) {
                alert('Failed to delete project');
                console.error('Error deleting project:', err);
            }
        }
    };

    if (loading) return <div className="loading">Loading projects...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (projects.length === 0) return <div className="empty-state">No projects yet. Add your first project!</div>;

    return (
        <div className="items-list">
            {projects.map((project) => (
                <div key={project.id} className="list-item">
                    <div className="item-header">
                        <h3>{project.title}</h3>
                        {project.featured && <span className="badge badge-featured">Featured</span>}
                    </div>

                    <div className="item-image">
                        <img src={project.image} alt={project.title} />
                    </div>

                    <p className="item-description">{project.description}</p>

                    <div className="technologies">
                        {project.technologies?.map((tech, idx) => (
                            <span key={idx} className="tech-tag">
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="item-actions">
                        <button
                            onClick={() => handleDelete(project.id)}
                            className="btn btn-danger btn-sm"
                        >
                            🗑️ Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProjectsList;
