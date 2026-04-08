// ==============================================================
// CertificateForm.jsx — Form to add/edit certificates
// ==============================================================
import { useState } from 'react';
import { db, storage } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './Admin.css';

const CertificateForm = ({ onSuccess }) => {
    const [formData, setFormData] = useState({
        title: '',
        issuer: '',
        description: '',
        date: '',
        icon: '📜',
        link: '',
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
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
            if (!formData.title || !formData.issuer || !formData.description || !formData.date) {
                throw new Error('Please fill in all required fields');
            }

            if (!image) {
                throw new Error('Please select a certificate image');
            }

            // Upload image to Firebase Storage
            const timestamp = Date.now();
            const imageName = `certificates/${timestamp}_${image.name}`;
            const imageRef = ref(storage, imageName);
            await uploadBytes(imageRef, image);
            const imageURL = await getDownloadURL(imageRef);

            // Add to Firestore
            const certificateData = {
                title: formData.title,
                issuer: formData.issuer,
                description: formData.description,
                date: formData.date,
                icon: formData.icon,
                image: imageURL,
                link: formData.link || '#',
                createdAt: new Date(),
            };

            await addDoc(collection(db, 'certificates'), certificateData);

            // Reset form
            setFormData({
                title: '',
                issuer: '',
                description: '',
                date: '',
                icon: '📜',
                link: '',
            });
            setImage(null);
            setImagePreview(null);

            setSuccess('✅ Certificate added successfully!');
            setTimeout(() => {
                setSuccess('');
                onSuccess();
            }, 2000);
        } catch (err) {
            setError(`❌ ${err.message}`);
            console.error('Error uploading certificate:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="admin-form">
            <div className="form-group">
                <label htmlFor="title">Certificate Title *</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g., React.js — The Complete Guide"
                    required
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="issuer">Issuer/Organization *</label>
                <input
                    type="text"
                    id="issuer"
                    name="issuer"
                    value={formData.issuer}
                    onChange={handleInputChange}
                    placeholder="e.g., Udemy, Coursera, Google"
                    required
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Certificate description and skills learned"
                    rows="4"
                    required
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="date">Year/Date *</label>
                <input
                    type="text"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    placeholder="e.g., 2024 or 2024-12-15"
                    required
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="icon">Icon/Emoji</label>
                <input
                    type="text"
                    id="icon"
                    name="icon"
                    value={formData.icon}
                    onChange={handleInputChange}
                    placeholder="e.g., ⚛️ or 🐍 or ☕"
                    maxLength="2"
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="link">Certificate Link</label>
                <input
                    type="url"
                    id="link"
                    name="link"
                    value={formData.link}
                    onChange={handleInputChange}
                    placeholder="Link to certificate or course"
                    disabled={loading}
                />
            </div>

            <div className="form-group">
                <label htmlFor="image">Certificate Image *</label>
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

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? '⏳ Uploading...' : '📤 Add Certificate'}
            </button>
        </form>
    );
};

export default CertificateForm;
