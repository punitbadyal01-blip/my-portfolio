// ==============================================================
// ProjectForm.jsx — Form to add/edit projects
// ==============================================================
import { useState } from 'react';
import { db, storage } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './Admin.css';

const ProjectForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        longDescription: '',
        technologies: '',
        github: '',
        demo: '',
        featured: false,
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            // Validate required fields
            if (!formData.title || !formData.description || !formData.technologies) {
                throw new Error('Please fill in all required fields');
            }

            if (!image) {
                throw new Error('Please select a project image');
            }

            // Upload image to Firebase Storage
            const timestamp = Date.now();
            const imageName = `projects/${timestamp}_${image.name}`;
            const imageRef = ref(storage, imageName);
            await uploadBytes(imageRef, image);
            const imageURL = await getDownloadURL(imageRef);

            // Parse technologies (comma-separated)
            const technologiesArray = formData.technologies
                .split(',')
                .map((tech) => tech.trim())
                .filter((tech) => tech);

            // Add to Firestore
            const projectData = {
                title: formData.title,
                description: formData.description,
                longDescription: formData.longDescription || formData.description,
                image: imageURL,
                technologies: technologiesArray,
                github: formData.github || '#',
                demo: formData.demo || '#',
                featured: formData.featured,
                createdAt: new Date(),
            };

            await addDoc(collection(db, 'projects'), projectData);

            // Reset form
            setFormData({
                title: '',
                description: '',
                longDescription: '',
                technologies: '',
                github: '',
                demo: '',
                featured: false,
            });
            setImage(null);
            setImagePreview(null);

            setSuccess('✅ Project added successfully!');
            setTimeout(() => {
                setSuccess('');
                onSuccess();
            }, 2000);
        } catch (err) {
            setError(`❌ ${err.message}`);
            console.error('Error uploading project:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
                <label htmlFor="title">Project Title *</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., AI-Based Hand Gesture Game"
                    required
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Short Description *</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Brief project description"
                    rows="3"
                    required
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="longDescription">Long Description</label>
                <textarea
                    id="longDescription"
                    name="longDescription"
                    value={formData.longDescription}
                    onChange={handleInputChange}
                    placeholder="Detailed project description"
                    rows="4"
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="technologies">Technologies * (comma-separated)</label>
                <input
                    type="text"
                    id="technologies"
                    name="technologies"
                    value={formData.technologies}
                    onChange={handleInputChange}
                    placeholder="e.g., React.js, Python, Firebase"
                    required
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="github">GitHub Link</label>
                <input
                    type="url"
                    id="github"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/..."
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="demo">Demo Link</label>
                <input
                    type="url"
                    id="demo"
                    name="demo"
                    value={formData.demo}
                    onChange={handleInputChange}
                    placeholder="https://..."
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="image">Project Image *</label>
                <input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageChange}
                    disabled={loading}
                    required
                />
                {imagePreview && (
                    <div className="image-preview">
                        <img src={imagePreview} alt="Preview" />
                    </div>
                )}
            </div>

            <div className="form-group checkbox">
                <label htmlFor="featured">
                    <input
                        type="checkbox"
                        id="featured"
                        name="featured"
                        checked={formData.featured}
                        onChange={handleInputChange}
                        disabled={loading}
                    />
                    Mark as Featured
                </label>
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? '⏳ Uploading...' : '📤 Add Project'}
            </button>
        </form>
    );
};

export default ProjectForm;
