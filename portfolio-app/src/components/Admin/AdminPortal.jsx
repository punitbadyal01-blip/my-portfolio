// ==============================================================
// AdminPortal.jsx — Main admin authentication and routing
// ==============================================================
import { useState, useEffect } from 'react';
import AdminPanel from './AdminPanel';
import './Admin.css';

const AdminPortal = () => {
    const [authenticated, setAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Check if already authenticated (from localStorage)
    useEffect(() => {
        const isAuth = localStorage.getItem('adminAuth') === 'true';
        setAuthenticated(isAuth);
    }, []);

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // Admin password - change this to a secure password
        const ADMIN_PASSWORD = 'admin123'; // ⚠️ Change this to a secure password

        setTimeout(() => {
            if (password === ADMIN_PASSWORD) {
                setAuthenticated(true);
                localStorage.setItem('adminAuth', 'true');
                setPassword('');
            } else {
                setError('Invalid password. Please try again.');
                setPassword('');
            }
            setLoading(false);
        }, 500);
    };

    const handleLogout = () => {
        setAuthenticated(false);
        localStorage.removeItem('adminAuth');
        setPassword('');
        setError('');
    };

    if (!authenticated) {
        return (
            <div className="admin-login-container">
                <div className="admin-login-box">
                    <h1>🔐 Admin Portal</h1>
                    <p>Enter the admin password to access the portal</p>

                    <form onSubmit={handleLogin} className="admin-login-form">
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter admin password"
                                disabled={loading}
                                autoFocus
                            />
                        </div>

                        {error && <div className="error-message">{error}</div>}

                        <button type="submit" disabled={loading} className="btn btn-primary">
                            {loading ? 'Checking...' : 'Login'}
                        </button>
                    </form>

                    <p className="admin-info">
                        <small>For security, change the default password in the code</small>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <AdminPanel onLogout={handleLogout} />
    );
};

export default AdminPortal;
