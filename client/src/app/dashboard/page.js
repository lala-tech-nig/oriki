"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PlusCircle, Search, Clock, FileText } from 'lucide-react';

export default function Dashboard() {
    const [user, setUser] = useState(null);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    window.location.href = '/login';
                    return;
                }

                // Fetch user requests
                const reqRes = await fetch('http://localhost:5000/api/user/requests/my', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const reqData = await reqRes.json();
                if (reqData.success) {
                    setRequests(reqData.data);
                }

                // Mock user data or fetch from profile endpoint (skipped for brevity, assuming token works)
                setUser({ name: 'Subscriber' });

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading Dashboard...</div>;

    return (
        <div className="min-h-screen bg-stone-50 py-12">
            <div className="container mx-auto px-6">
                <header className="mb-12 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-gray-900">Welcome Back.</h1>
                        <p className="text-gray-600">Explore the archives or contribute to the history.</p>
                    </div>
                    <Link href="/discover" className="btn-secondary flex items-center gap-2 text-indigo-900 font-bold hover:underline">
                        <Search size={18} /> Browse Archive
                    </Link>
                </header>

                {/* Action Cards */}
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <Link href="/submit" className="group bg-white p-8 rounded-xl shadow-sm border border-gray-100 hover:border-indigo-900 transition-all flex items-start gap-4">
                        <div className="bg-indigo-50 p-3 rounded-full text-indigo-900 group-hover:bg-indigo-900 group-hover:text-white transition-colors">
                            <FileText size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Submit a Story</h3>
                            <p className="text-gray-600 mb-4">Know a history, oriki, or legend that isn't here? Submit it for verification and publication.</p>
                            <span className="text-sm font-bold text-indigo-900 uppercase tracking-widest">Start Writing &rarr;</span>
                        </div>
                    </Link>

                    <Link href="/request" className="group bg-green-50/50 p-8 rounded-xl shadow-sm border border-green-100 hover:border-green-600 transition-all flex items-start gap-4">
                        <div className="bg-green-100 p-3 rounded-full text-green-800 group-hover:bg-green-800 group-hover:text-white transition-colors">
                            <PlusCircle size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold mb-2">Request Research</h3>
                            <p className="text-gray-600 mb-4">need deep research on a specific town, king, or lineage? Our team will dig into the archives for you.</p>
                            <span className="text-sm font-bold text-green-800 uppercase tracking-widest">Make Request &rarr;</span>
                        </div>
                    </Link>
                </div>

                {/* My Requests Status */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Clock className="text-gray-400" />
                        <h2 className="text-xl font-bold">My Requests & Submissions</h2>
                    </div>

                    {requests.length > 0 ? (
                        <div className="space-y-4">
                            {requests.map(req => (
                                <div key={req._id} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                                    <div>
                                        <h4 className="font-bold text-gray-900">{req.topic}</h4>
                                        <p className="text-sm text-gray-500">{req.type}</p>
                                    </div>
                                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${req.status === 'completed' ? 'bg-green-100 text-green-800' :
                                            req.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {req.status.replace('_', ' ')}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 italic">You haven't made any requests yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
}
