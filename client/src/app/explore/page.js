"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, MapPin } from 'lucide-react';
import { fetchAPI } from '@/lib/api';

export default function ExplorePage() {
    const [ethnicGroups, setEthnicGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredGroups, setFilteredGroups] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                // Fetch all ethnic groups (in a real app, integrate pagination/search API)
                const groups = await fetchAPI('/discovery/ethnic-groups');
                setEthnicGroups(groups);
                setFilteredGroups(groups);
            } catch (error) {
                console.error("Failed to load ethnic groups", error);
                // Fallback or error state
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, []);

    useEffect(() => {
        const results = ethnicGroups.filter(group =>
            group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            group.region.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setFilteredGroups(results);
    }, [searchTerm, ethnicGroups]);

    return (
        <div className="min-h-screen bg-stone-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <header className="mb-12 text-center">
                    <h1 className="text-4xl font-bold font-heading text-stone-900 mb-4">Explore Heritage</h1>
                    <p className="text-stone-600 max-w-2xl mx-auto mb-8">
                        Browse through the diverse acoustic and cultural landscape of Nigeria. Find your people, read their history, and listen to their stories.
                    </p>

                    {/* Search Bar */}
                    <div className="relative max-w-xl mx-auto">
                        <input
                            type="text"
                            placeholder="Search by ethnic group, region, or keyword..."
                            className="w-full pl-12 pr-4 py-4 rounded-full border border-stone-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-stone-400" />
                    </div>
                </header>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-800"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredGroups.map((group) => (
                            <Link href={`/ethnic-groups/${group._id}`} key={group._id} className="group block h-full">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all h-full flex flex-col border border-stone-100 transform hover:-translate-y-1">
                                    <div className="h-48 bg-stone-200 relative overflow-hidden">
                                        {/* Placeholder logic for image if none exists */}
                                        {group.images && group.images.length > 0 ? (
                                            <img src={group.images[0]} alt={group.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full bg-amber-900 flex items-center justify-center text-amber-100 text-4xl font-heading">
                                                {group.name.charAt(0)}
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-6 flex-grow">
                                        <h2 className="text-2xl font-bold text-stone-900 mb-2 group-hover:text-amber-700 transition-colors">{group.name}</h2>
                                        <div className="flex items-center text-sm text-stone-500 mb-4">
                                            <MapPin size={16} className="mr-1" />
                                            {group.region.join(', ')}
                                        </div>
                                        <p className="text-stone-600 line-clamp-3 mb-4 text-sm leading-relaxed">
                                            {group.description}
                                        </p>
                                    </div>
                                    <div className="px-6 py-4 bg-stone-50 border-t border-stone-100">
                                        <span className="text-amber-700 text-sm font-semibold group-hover:underline">Read Lineage &rarr;</span>
                                    </div>
                                </div>
                            </Link>
                        ))}

                        {filteredGroups.length === 0 && (
                            <div className="col-span-full text-center py-12 text-stone-500">
                                No results found for "{searchTerm}". Try a different term.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
