"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const res = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();

            if (data.success) {
                localStorage.setItem('token', data.token);
                window.location.href = '/dashboard';
            } else {
                setError(data.error || 'Registration failed');
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
            <div className="hidden md:flex bg-indigo-900 items-center justify-center p-12 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')]"></div>
                <div className="relative z-10 max-w-md">
                    <h1 className="text-5xl font-display font-bold mb-6">Discover Your Roots.</h1>
                    <p className="text-indigo-200 text-lg">Join the community of history keepers. Preserve your heritage today.</p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-8">
                <div className="max-w-md w-full space-y-8">
                    <div className="text-center md:text-left">
                        <h2 className="text-3xl font-display font-bold text-gray-900">Create Account</h2>
                        <p className="mt-2 text-gray-600">Start your journey with Oriki.ng.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                        {error && <div className="p-3 bg-red-50 text-red-600 text-sm rounded">{error}</div>}

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-none shadow-sm focus:ring-indigo-900 focus:border-indigo-900 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-none shadow-sm focus:ring-indigo-900 focus:border-indigo-900 sm:text-sm"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-none shadow-sm focus:ring-indigo-900 focus:border-indigo-900 sm:text-sm"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="mt-1 block w-full px-3 py-3 border border-gray-300 rounded-none shadow-sm focus:ring-indigo-900 focus:border-indigo-900 sm:text-sm"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold uppercase tracking-widest text-white bg-black hover:bg-gray-800 transition"
                        >
                            {loading ? 'Creating Account...' : 'Register'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-gray-600">
                        Already have an account? <Link href="/login" className="font-bold text-indigo-900 hover:text-indigo-800">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
