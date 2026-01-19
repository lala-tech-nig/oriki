"use client";
import { createContext, useState, useEffect, useContext } from 'react';
import { fetchAPI } from '@/lib/api';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        checkUserLoggedIn();
    }, []);

    // Check if user is logged in
    const checkUserLoggedIn = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            const data = await fetchAPI('/auth/me', {
                headers: { Authorization: `Bearer ${token}` }
            });

            setUser(data);
        } catch (error) {
            console.error("Auth check failed", error);
            localStorage.removeItem('token');
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // Login
    const login = async (email, password) => {
        const data = await fetchAPI('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        });

        localStorage.setItem('token', data.token);
        setUser(data);
        router.push('/dashboard');
        return data;
    };

    // Register
    const register = async (name, email, password) => {
        const data = await fetchAPI('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        });

        localStorage.setItem('token', data.token);
        setUser(data);
        router.push('/dashboard');
        return data;
    };

    // Logout
    const logout = async () => {
        localStorage.removeItem('token');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
