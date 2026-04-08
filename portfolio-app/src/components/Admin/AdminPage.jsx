// ==============================================================
// AdminPage.jsx — Wrapper for admin portal with full page layout
// ==============================================================
import AdminPortal from './AdminPortal';
import './Admin.css';

const AdminPage = () => {
    return (
        <div style={{ minHeight: '100vh', background: 'var(--bg-primary, #0f0f1e)' }}>
            <AdminPortal />
        </div>
    );
};

export default AdminPage;
