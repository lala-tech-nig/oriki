"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RequestResearch() {
    const [formData, setFormData] = useState({ topic: '', details: '', type: 'research' });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/user/request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            if (data.success) {
                router.push('/dashboard');
            } else {
                alert(data.error);
            }
        } catch (err) {
            alert('Failed to submit');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 py-12 flex items-center justify-center">
            <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-display font-bold mb-2">Request Research</h1>
                <p className="text-gray-600 mb-8">Can't find what you're looking for? Ask our historians.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Topic / Subject</label>
                        <input type="text" name="topic" onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded focus:ring-black" placeholder="e.g. Origin of my family name..." />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Details & Context</label>
                        <textarea name="details" onChange={handleChange} required rows="5" className="w-full p-3 border border-gray-300 rounded focus:ring-black" placeholder="Please provide as much context as possible (Town, approximate dates, names)..."></textarea>
                    </div>

                    <button type="submit" disabled={loading} className="w-full py-3 bg-green-800 text-white font-bold uppercase tracking-widest hover:bg-green-700 transition">
                        {loading ? 'Sending Request...' : 'Send Request'}
                    </button>
                </form>
            </div>
        </div>
    );
}
