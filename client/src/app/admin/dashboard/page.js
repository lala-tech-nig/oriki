"use client";
import { useState } from 'react';
import { LayoutDashboard, FileText, Users, CheckCircle } from 'lucide-react';
import ContentUploadForm from '@/components/admin/ContentUploadForm';
import ReviewList from '@/components/admin/ReviewList';
import RequestList from '@/components/admin/RequestList';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('upload');

    const tabs = [
        { id: 'upload', label: 'Upload Content', icon: <FileText size={20} /> },
        { id: 'review', label: 'Review Submissions', icon: <CheckCircle size={20} /> },
        { id: 'requests', label: 'User Requests', icon: <Users size={20} /> },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-black text-white hidden md:flex flex-col fixed h-full z-40">
                <div className="p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold tracking-widest">ADMIN PANEL</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center space-x-3 w-full p-3 rounded-lg transition-all ${activeTab === tab.id ? 'bg-indigo-900 text-white' : 'text-gray-400 hover:bg-gray-900'}`}
                        >
                            {tab.icon}
                            <span className="font-medium">{tab.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-gray-800">
                    <p className="text-xs text-gray-500">Oriki.ng v2.0</p>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                <header className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">{tabs.find(t => t.id === activeTab)?.label}</h1>
                        <p className="text-gray-500 text-sm">Manage the platform content and users.</p>
                    </div>
                    <div className="bg-indigo-100 text-indigo-900 px-4 py-2 rounded-full text-sm font-bold">
                        Super Admin
                    </div>
                </header>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 min-h-[600px]">
                    {activeTab === 'upload' && <ContentUploadForm />}
                    {activeTab === 'review' && <ReviewList />}
                    {activeTab === 'requests' && <RequestList />}
                </div>
            </main>
        </div>
    );
}
