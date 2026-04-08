// ==============================================================
// CertificatesList.jsx — Display and manage certificates
// ==============================================================
import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import './Admin.css';

const CertificatesList = () => {
    const [certificates, setCertificates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchCertificates();
    }, []);

    const fetchCertificates = async () => {
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db, 'certificates'));
            const certificatesList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCertificates(certificatesList.sort((a, b) => b.createdAt - a.createdAt));
        } catch (err) {
            setError('Failed to fetch certificates');
            console.error('Error fetching certificates:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this certificate?')) {
            try {
                await deleteDoc(doc(db, 'certificates', id));
                setCertificates((prev) => prev.filter((c) => c.id !== id));
            } catch (err) {
                alert('Failed to delete certificate');
                console.error('Error deleting certificate:', err);
            }
        }
    };

    if (loading) return <div className="loading">Loading certificates...</div>;
    if (error) return <div className="error-message">{error}</div>;
    if (certificates.length === 0) return <div className="empty-state">No certificates yet. Add your first certificate!</div>;

    return (
        <div className="items-list">
            {certificates.map((cert) => (
                <div key={cert.id} className="list-item">
                    <div className="item-header">
                        <h3>
                            <span className="icon">{cert.icon || '📜'}</span> {cert.title}
                        </h3>
                    </div>

                    <p className="item-meta">
                        <strong>Issuer:</strong> {cert.issuer}
                    </p>
                    <p className="item-meta">
                        <strong>Date:</strong> {cert.date}
                    </p>

                    <div className="item-image">
                        <img src={cert.image} alt={cert.title} />
                    </div>

                    <p className="item-description">{cert.description}</p>

                    <div className="item-actions">
                        <button
                            onClick={() => handleDelete(cert.id)}
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

export default CertificatesList;
