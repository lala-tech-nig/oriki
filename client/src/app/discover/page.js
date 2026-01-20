"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';

export default function Discover() {
    const [search, setSearch] = useState('');
    const [content, setContent] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const res = await fetch(`http://localhost:5000/api/content/search?q=${search}`);
                const data = await res.json();
                if (data.success) {
                    setContent(data.data);
                }
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        // Debounce search could be added here, currently just effect on mount + maybe manual trigger
        fetchContent();
    }, [search]); // Re-fetch when search changes (debounce recommended in prod)

    return (
        <div className="min-h-screen bg-stone-50 py-12">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-display font-bold mb-4">Explore the Archive</h1>
                    <p className="text-gray-600">Search for Kings, Towns, Families, and Histories.</p>

                    <div className="mt-8 max-w-2xl mx-auto relative">
                        <input
                            type="text"
                            placeholder="Search for 'Abeokuta', 'Sango', 'Oyo'..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-12 pr-4 py-4 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-900 focus:border-transparent outline-none transition"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    </div>
                </div>

                {loading ? (
                    <p className="text-center text-gray-500">Loading history...</p>
                ) : (
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {content.length > 0 ? (
                            content.map((item) => (
                                <Link key={item._id} href={`/discover/${item._id}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100">
                                    <div className="h-40 bg-gray-200 relative">
                                        {item.category && (
                                            <span className="absolute top-3 left-3 bg-black/80 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                                                {item.category}
                                            </span>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <h3 className="font-bold text-lg mb-2 group-hover:text-indigo-900 transition-colors line-clamp-2">{item.title}</h3>
                                        <div className="flex flex-wrap gap-1 mt-3">
                                            {item.tags.slice(0, 3).map(tag => (
                                                <span key={tag} className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-600">#{tag}</span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                                <p className="text-gray-500">No content found. Try a different search term.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
