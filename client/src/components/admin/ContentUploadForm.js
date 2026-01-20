"use client";
import { useState } from 'react';

export default function ContentUploadForm() {
    const [formData, setFormData] = useState({
        title: '',
        type: 'history',
        category: '',
        body: '',
        tags: '',
        mediaUrl: '',
        mediaType: 'image'
    });
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const token = localStorage.getItem('token'); // Simplistic token retrieval

            // Construct payload
            const payload = {
                ...formData,
                media: formData.mediaUrl ? [{ type: formData.mediaType, url: formData.mediaUrl }] : []
            };

            const res = await fetch('http://localhost:5000/api/admin/content', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            const data = await res.json();

            if (data.success) {
                setMessage('Content uploaded successfully!');
                setFormData({ title: '', type: 'history', category: '', body: '', tags: '', mediaUrl: '', mediaType: 'image' });
            } else {
                setMessage(`Error: ${data.error}`);
            }
        } catch (err) {
            setMessage('Failed to connect to server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g. Origin of Yoruba"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g. Mythology"
                        required
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                    >
                        <option value="history">History</option>
                        <option value="culture">Culture</option>
                        <option value="story">Story</option>
                        <option value="language">Language</option>
                        <option value="heritage">Heritage</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tags (Comma separated)</label>
                    <input
                        type="text"
                        name="tags"
                        value={formData.tags}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                        placeholder="e.g. Royal, War, Ancient"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content Body (Markdown/HTML)</label>
                <textarea
                    name="body"
                    value={formData.body}
                    onChange={handleChange}
                    rows="8"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
                    placeholder="Write the history here..."
                    required
                ></textarea>
            </div>

            <div className="p-4 bg-gray-50 rounded border border-gray-200">
                <h3 className="text-sm font-bold text-gray-700 mb-3">Media Attachment</h3>
                <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                        <select
                            name="mediaType"
                            value={formData.mediaType}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                        >
                            <option value="image">Image</option>
                            <option value="video">Video</option>
                            <option value="audio">Audio</option>
                        </select>
                    </div>
                    <div className="col-span-2">
                        <input
                            type="text"
                            name="mediaUrl"
                            value={formData.mediaUrl}
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Media URL (e.g. Cloudinary/S3 link)"
                        />
                    </div>
                </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-black text-white py-3 font-bold uppercase tracking-wide hover:bg-gray-800 transition-colors disabled:opacity-50"
            >
                {loading ? 'Uploading...' : 'Publish Content'}
            </button>

            {message && (
                <div className={`p-4 rounded text-center ${message.includes('Error') ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    {message}
                </div>
            )}
        </form>
    );
}
