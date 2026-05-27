// Admin Dashboard Context
import { createContext, useState, useContext, useEffect } from 'react';

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('adminToken') || null);
    const [admin, setAdmin] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(!!token);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            localStorage.setItem('adminToken', token);
        } else {
            localStorage.removeItem('adminToken');
        }
    }, [token]);

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            if (data.success) {
                setToken(data.token);
                setAdmin(data.admin);
                setIsAuthenticated(true);
                return { success: true, message: 'Logged in successfully' };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: error.message };
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        setToken(null);
        setAdmin(null);
        setIsAuthenticated(false);
    };

    const value = {
        token,
        admin,
        isAuthenticated,
        loading,
        login,
        logout,
    };

    return <AdminContext.Provider value={value}>{children}</AdminContext.Provider>;
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (!context) {
        throw new Error('useAdmin must be used within AdminProvider');
    }
    return context;
};
