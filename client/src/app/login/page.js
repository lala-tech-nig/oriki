"use client";
import { useState, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
// import { AuthContext } from '@/context/AuthContext'; // Assuming context exists or will be created

export default function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem('token', data.token); // Simple storage
                // Redirect based on role (logic typically in context, but manual here for now)
                // Ideally: router.push('/dashboard');
                // Check role if returned? 
                window.location.href = '/dashboard'; // Force reload to picking up auth state if needed
            } else {
                setError(data.error || 'Login failed');
            }
        } catch (err) {
            setError('Connection failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen grid md:grid-cols-2 bg-white">
            {/* Left Side - Visual */}
            <div className="hidden md:flex bg-black items-center justify-center p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
                <div className="relative z-10 max-w-md">
                    <h1 className="text-5xl font-display font-bold mb-6">Welcome Back to the Source.</h1>
                    <p className="text-gray-400 text-lg">Continue your journey into the depths of Yoruba history and culture.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-display font-bold text-gray-900">Sign In</h2>
                        <p className="mt-2 text-gray-600">Enter your credentials to access your account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                        {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded">{error}</div>}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-none shadow-sm focus:ring-black focus:border-black sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-none shadow-sm focus:ring-black focus:border-black sm:text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold uppercase tracking-widest text-white bg-indigo-900 hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition"
                        >
                            {loading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600">
                        Don't have an account? <Link href="/register" className="font-bold text-indigo-900 hover:text-indigo-800">Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
