// ==============================================================
// AdminPanel.jsx — Main admin dashboard
// ==============================================================
import { useState } from 'react';
import ProjectForm from './ProjectForm';
import CertificateForm from './CertificateForm';
import ProjectsList from './ProjectsList';
import CertificatesList from './CertificatesList';
import './Admin.css';

const AdminPanel = ({ onLogout }) => {
    const [activeTab, setActiveTab] = useState('projects');
    const [refreshKey, setRefreshKey] = useState(0);

    const handleRefresh = () => {
        setRefreshKey((prev) => prev + 1);
    };

    return (
        <div className="admin-panel">
            <div className="admin-header">
                <h1>📊 Admin Dashboard</h1>
                <button onClick={onLogout} className="btn btn-outline">
                    Logout
                </button>
            </div>

            <div className="admin-tabs">
                <button
                    className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`}
                    onClick={() => setActiveTab('projects')}
                >
                    📁 Projects
                </button>
                <button
                    className={`tab-btn ${activeTab === 'certificates' ? 'active' : ''}`}
                    onClick={() => setActiveTab('certificates')}
                >
                    📜 Certificates
                </button>
            </div>

            <div className="admin-content">
                {activeTab === 'projects' && (
                    <div className="admin-section">
                        <div className="section-grid">
                            <div className="form-container">
                                <h2>Add New Project</h2>
                                <ProjectForm onSuccess={handleRefresh} />
                            </div>
                            <div className="list-container">
                                <h2>Projects List</h2>
                                <ProjectsList key={refreshKey} />
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'certificates' && (
                    <div className="admin-section">
                        <div className="section-grid">
                            <div className="form-container">
                                <h2>Add New Certificate</h2>
                                <CertificateForm onSuccess={handleRefresh} />
                            </div>
                            <div className="list-container">
                                <h2>Certificates List</h2>
                                <CertificatesList key={refreshKey} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;
