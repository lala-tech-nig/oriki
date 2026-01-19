"use client";
import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { Shield, Users, FileText, CheckCircle, XCircle } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

export default function AdminDashboard() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({ users: 0, groups: 0, towns: 0 });
    const [dataLoading, setDataLoading] = useState(true);

    useEffect(() => {
        if (!loading) {
            if (!user || user.role !== 'admin') {
                router.push('/dashboard');
            } else {
                fetchStats();
            }
        }
    }, [user, loading, router]);

    const fetchStats = async () => {
        try {
            // Mock stats fetching if API endpoints aren't ready, or fetch lists
            const groups = await fetchAPI('/discovery/ethnic-groups');
            const towns = await fetchAPI('/discovery/towns');

            setStats({
                users: 12, // Mocked as we don't have list users endpoint yet
                groups: groups.length,
                towns: towns.length
            });
        } catch (error) {
            console.error("Stats failed", error);
        } finally {
            setDataLoading(false);
        }
    };

    if (loading || !user || user.role !== 'admin') return null;

    return (
        <div className="min-h-screen bg-stone-100 py-12 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center mb-8">
                    <Shield className="w-8 h-8 text-amber-800 mr-3" />
                    <h1 className="text-3xl font-bold font-heading text-stone-900">Admin Console</h1>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <StatCard icon={<Users />} title="Total Users" value={stats.users} color="bg-blue-600" />
                    <StatCard icon={<FileText />} title="Ethnic Groups" value={stats.groups} color="bg-amber-600" />
                    <StatCard icon={<Map />} title="Towns Recorded" value={stats.towns} color="bg-green-600" />
                </div>

                {/* Content Moderation Section */}
                <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                    <div className="px-6 py-4 border-b border-stone-200 flex justify-between items-center bg-stone-50">
                        <h2 className="font-bold text-stone-700">Pending Approvals</h2>
                        <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded">2 New</span>
                    </div>

                    <div className="divide-y divide-stone-100">
                        {/* Mock Item 1 */}
                        <div className="p-6 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-stone-900">New Town Submission: "Okemesi"</h3>
                                <p className="text-sm text-stone-500">Submitted by user: researcher_ade</p>
                            </div>
                            <div className="flex space-x-2">
                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-full" title="Approve">
                                    <CheckCircle size={20} />
                                </button>
                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-full" title="Reject">
                                    <XCircle size={20} />
                                </button>
                            </div>
                        </div>
                        {/* Mock Item 2 */}
                        <div className="p-6 flex items-center justify-between">
                            <div>
                                <h3 className="font-bold text-stone-900">Oriki Correction: "Ife Oodaye"</h3>
                                <p className="text-sm text-stone-500">Submitted by user: dr_hist</p>
                            </div>
                            <div className="flex space-x-2">
                                <button className="p-2 text-green-600 hover:bg-green-50 rounded-full" title="Approve">
                                    <CheckCircle size={20} />
                                </button>
                                <button className="p-2 text-red-600 hover:bg-red-50 rounded-full" title="Reject">
                                    <XCircle size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function StatCard({ icon, title, value, color }) {
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-stone-100 flex items-center">
            <div className={`p-4 rounded-lg text-white mr-4 ${color}`}>
                {icon}
            </div>
            <div>
                <p className="text-stone-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-stone-900">{value}</h3>
            </div>
        </div>
    );
}

function Map() { return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>; }
