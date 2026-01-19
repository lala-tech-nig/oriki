"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { MapPin, BookOpen, Music, Users, Calendar } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

export default function EthnicGroupDetail() {
    const { id } = useParams();
    const [group, setGroup] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        const loadGroup = async () => {
            try {
                const data = await fetchAPI(`/discovery/ethnic-groups/${id}`);
                setGroup(data);
            } catch (error) {
                console.error("Failed to load group", error);
            } finally {
                setLoading(false);
            }
        };
        loadGroup();
    }, [id]);

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-stone-50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800"></div>
        </div>
    );

    if (!group) return <div className="text-center py-20 text-stone-600">Group not found</div>;

    return (
        <div className="min-h-screen bg-stone-50 pb-20">
            {/* Hero Header */}
            <div className="relative h-[60vh] bg-stone-900 overflow-hidden">
                {group.images && group.images.length > 0 ? (
                    <img src={group.images[0]} alt={group.name} className="w-full h-full object-cover opacity-60" />
                ) : (
                    <div className="w-full h-full bg-stone-800 opacity-60" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent"></div>
                <div className="absolute bottom-0 left-0 w-full p-8 md:p-12">
                    <div className="max-w-7xl mx-auto">
                        <span className="bg-amber-600 text-white px-3 py-1 rounded-full text-sm font-medium tracking-wide uppercase mb-4 inline-block">
                            Ethnic Group
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold text-white font-heading mb-4">{group.name}</h1>
                        <div className="flex items-center text-stone-300 text-lg">
                            <MapPin className="mr-2 text-amber-500" />
                            {group.region.join(', ')}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* History Section */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
                            <div className="flex items-center mb-6">
                                <BookOpen className="w-6 h-6 text-amber-600 mr-3" />
                                <h2 className="text-2xl font-bold font-heading text-stone-900">Historical Origins</h2>
                            </div>
                            <div className="prose prose-stone max-w-none text-stone-700 leading-relaxed whitespace-pre-line">
                                {group.history}
                            </div>
                        </div>

                        {/* Cultural Practices */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-stone-100">
                            <div className="flex items-center mb-6">
                                <Users className="w-6 h-6 text-amber-600 mr-3" />
                                <h2 className="text-2xl font-bold font-heading text-stone-900">Cultural Practices</h2>
                            </div>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {group.culturalPractices.map((practice, index) => (
                                    <li key={index} className="flex items-start p-4 bg-stone-50 rounded-lg">
                                        <span className="w-2 h-2 mt-2 bg-amber-500 rounded-full mr-3 flex-shrink-0"></span>
                                        <span className="text-stone-700 font-medium">{practice}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-8">
                        {/* Language Card */}
                        <div className="bg-amber-900 text-amber-50 p-6 rounded-2xl shadow-lg">
                            <div className="flex items-center mb-4 text-amber-200">
                                <Music className="w-5 h-5 mr-4" />
                                <h3 className="text-xl font-bold">Language & Sounds</h3>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm text-amber-300 uppercase tracking-wider mb-1">Native Language</p>
                                    <p className="text-2xl font-heading">{group.language?.name}</p>
                                </div>
                                {group.language?.samplePhrase && (
                                    <div className="bg-amber-800/50 p-4 rounded-lg border border-amber-700">
                                        <p className="italic text-lg mb-2">"{group.language.samplePhrase}"</p>
                                        <p className="text-sm text-amber-400">Sample Phrase</p>
                                    </div>
                                )}
                                <button className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-lg font-semibold transition-colors flex items-center justify-center">
                                    <Music size={18} className="mr-2" />
                                    Listen to Pronunciation
                                </button>
                            </div>
                        </div>

                        {/* Festivals Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-stone-100">
                            <div className="flex items-center mb-4 text-stone-500">
                                <Calendar className="w-5 h-5 mr-2" />
                                <h3 className="text-lg font-bold text-stone-900">Major Festivals</h3>
                            </div>
                            <div className="space-y-4">
                                {group.festivals.map((fest, idx) => (
                                    <div key={idx} className="border-b border-stone-100 last:border-0 pb-3 last:pb-0">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-stone-800">{fest.name}</h4>
                                            <span className="text-xs bg-stone-100 text-stone-600 px-2 py-1 rounded uppercase">{fest.month}</span>
                                        </div>
                                        <p className="text-sm text-stone-600">{fest.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
