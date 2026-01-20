"use client";
import { useEffect, useState } from 'react';

export default function RequestList() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        try {
            const token = localStorage.getItem('token');
            const res = await fetch('http://localhost:5000/api/admin/requests', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.success) {
                setRequests(data.data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const updateStatus = async (id, status) => {
        try {
            const token = localStorage.getItem('token');
            await fetch(`http://localhost:5000/api/admin/requests/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ status })
            });
            fetchRequests();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <p>Loading requests...</p>;

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                        <th className="p-4 font-semibold text-gray-900">Topic</th>
                        <th className="p-4 font-semibold text-gray-900">Details</th>
                        <th className="p-4 font-semibold text-gray-900">User</th>
                        <th className="p-4 font-semibold text-gray-900">Status</th>
                        <th className="p-4 font-semibold text-gray-900">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {requests.map(req => (
                        <tr key={req._id} className="hover:bg-gray-50">
                            <td className="p-4 font-medium">{req.topic}</td>
                            <td className="p-4 text-gray-500 max-w-xs truncate">{req.details}</td>
                            <td className="p-4 text-gray-500">{req.user?.name || 'Unknown'}</td>
                            <td className="p-4">
                                <StatusBadge status={req.status} />
                            </td>
                            <td className="p-4 space-x-2">
                                {req.status === 'open' && (
                                    <button
                                        onClick={() => updateStatus(req._id, 'in_progress')}
                                        className="text-blue-600 hover:underline"
                                    >
                                        Start
                                    </button>
                                )}
                                {req.status === 'in_progress' && (
                                    <button
                                        onClick={() => updateStatus(req._id, 'completed')}
                                        className="text-green-600 hover:underline"
                                    >
                                        Complete
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

function StatusBadge({ status }) {
    const colors = {
        open: 'bg-yellow-100 text-yellow-800',
        in_progress: 'bg-blue-100 text-blue-800',
        completed: 'bg-green-100 text-green-800',
        declined: 'bg-red-100 text-red-800'
    };
    return (
        <span className={`px-2 py-1 rounded text-xs font-medium uppercase ${colors[status] || 'bg-gray-100'}`}>
            {status.replace('_', ' ')}
        </span>
    );
}
