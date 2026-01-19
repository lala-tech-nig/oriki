"use client";
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { User, LogOut, Map, BookOpen, Clock } from 'lucide-react';

export default function Dashboard() {
    const { user, logout, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) {
            router.push('/login');
        }
    }, [user, loading, router]);

    if (loading || !user) {
        return (
            <div className="flex justify-center items-center h-screen bg-stone-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-stone-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-bold font-heading text-stone-900">Welcome, {user.name}</h1>
                        <p className="text-stone-500">Your personal heritage journey</p>
                    </div>
                    <button
                        onClick={logout}
                        className="mt-4 md:mt-0 flex items-center text-red-600 hover:text-red-800 font-medium px-4 py-2 bg-red-50 rounded-lg transition-colors border border-red-100"
                    >
                        <LogOut size={18} className="mr-2" /> Sign Out
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                        <div className="flex items-center mb-6">
                            <User className="text-amber-600 mr-2" />
                            <h2 className="text-xl font-bold text-stone-900">My Profile</h2>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <p className="text-xs text-stone-400 uppercase">Email</p>
                                <p className="font-medium text-stone-800">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-xs text-stone-400 uppercase">Role</p>
                                <p className="font-medium text-stone-800 capitalize">{user.role}</p>
                            </div>
                        </div>
                        <button className="w-full mt-6 py-2 border border-stone-200 rounded-lg text-stone-600 hover:bg-stone-50 text-sm font-medium">
                            Edit Profile
                        </button>
                    </div>

                    {/* Recent Discoveries */}
                    <div className="md:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center">
                                <Clock className="text-amber-600 mr-2" />
                                <h2 className="text-xl font-bold text-stone-900">Recent Discoveries</h2>
                            </div>
                            <button className="text-sm text-amber-700 font-semibold hover:underline">View All</button>
                        </div>

                        {/* Placeholder for saved discoveries */}
                        <div className="bg-stone-50 rounded-xl p-8 text-center border border-dashed border-stone-200">
                            <Map className="w-12 h-12 text-stone-300 mx-auto mb-4" />
                            <p className="text-stone-500 mb-4">You haven't saved any heritage discoveries yet.</p>
                            <button onClick={() => router.push('/identity-engine')} className="px-6 py-2 bg-stone-900 text-white rounded-full text-sm font-medium hover:bg-black transition-colors">
                                Start Tracing Roots
                            </button>
                        </div>
                    </div>

                    {/* Family Tree Placeholder */}
                    <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                        <div className="flex items-center mb-6">
                            <BookOpen className="text-amber-600 mr-2" />
                            <h2 className="text-xl font-bold text-stone-900">Family Tree</h2>
                        </div>
                        <div className="bg-gradient-to-r from-stone-50 to-stone-100 rounded-xl p-12 text-center border border-stone-100">
                            <p className="text-stone-500 mb-2">Build your ancestral tree to preserve your lineage for future generations.</p>
                            <span className="inline-block bg-amber-100 text-amber-800 text-xs px-2 py-1 rounded font-medium">Coming Soon</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
