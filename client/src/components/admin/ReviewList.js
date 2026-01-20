"use client";
import { useEffect, useState } from 'react';
import { X, Check } from 'lucide-react';

export default function ReviewList() {
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSubmissions = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/admin/content', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                // Filter client-side for now, ideally API should support status filter
                const pending = data.data.filter(item => item.status === 'pending');
                setSubmissions(pending);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const handleAction = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:5000/api/admin/content/${id}/status`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            // Refresh list
            fetchSubmissions();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p>Loading submissions...</p>;

    if (submissions.length === 0) return (
        <div className="text-center py-12 text-gray-500">
            <p>No pending submissions to review.</p>
        </div>
    );

    return (
        <div className="space-y-4">
            {submissions.map((item) => (
                <div key={item._id} className="p-4 border border-gray-200 rounded-lg flex justify-between items-start bg-white hover:shadow-md transition">
                    <div>
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        <span className="text-xs bg-gray-100 px-2 py-1 rounded uppercase tracking-wide text-gray-600 mr-2">{item.type}</span>
                        <span className="text-xs text-indigo-600 font-medium">By: {item.author?.name || 'Unknown'}</span>
                        <p className="mt-2 text-gray-600 line-clamp-2 text-sm max-w-xl">{item.body}</p>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => handleAction(item._id, 'rejected')}
                            className="p-2 border border-red-200 text-red-600 rounded hover:bg-red-50"
                            title="Reject"
                        >
                            <X size={20} />
                        </button>
                        <button
                            onClick={() => handleAction(item._id, 'published')}
                            className="p-2 bg-green-600 text-white rounded hover:bg-green-700 shadow-sm"
                            title="Approve & Publish"
                        >
                            <Check size={20} />
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
