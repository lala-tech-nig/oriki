"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SubmitStory() {
    const [formData, setFormData] = useState({ title: '', body: '', category: '', tags: '', mediaUrl: '' });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/user/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({
                    ...formData,
                    type: 'story', // Defaulting user subs to story/history mix
                    media: formData.mediaUrl ? [{ type: 'image', url: formData.mediaUrl }] : [] // Simplistic media handling
                })
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
            <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-lg">
                <h1 className="text-3xl font-display font-bold mb-2">Submit a Story</h1>
                <p className="text-gray-600 mb-8">Contribute to the knowledge zone. All submissions are reviewed.</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input type="text" name="title" onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded focus:ring-black" placeholder="Title of the story..." />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <input type="text" name="category" onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded focus:ring-black" placeholder="e.g. History, Myth" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                            <input type="text" name="tags" onChange={handleChange} className="w-full p-3 border border-gray-300 rounded focus:ring-black" placeholder="Keywords..." />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Your Story</label>
                        <textarea name="body" onChange={handleChange} required rows="6" className="w-full p-3 border border-gray-300 rounded focus:ring-black" placeholder="Write the details here..."></textarea>
                    </div>

                    <button type="submit" disabled={loading} className="w-full py-3 bg-indigo-900 text-white font-bold uppercase tracking-widest hover:bg-indigo-800 transition">
                        {loading ? 'Submitting...' : 'Submit for Review'}
                    </button>
                </form>
            </div>
        </div>
    );
}
