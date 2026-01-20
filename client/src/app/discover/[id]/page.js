"use client";
import { useEffect, useState } from 'react';
import { Lock, Play, Music } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function ContentDetail() {
    const { id } = useParams();
    const [content, setContent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const token = localStorage.getItem('token');
                const res = await fetch(`http://localhost:5000/api/content/${id}`, {
                    headers: token ? { 'Authorization': `Bearer ${token}` } : {}
                });

                if (res.status === 403) {
                    setError('premium_wall');
                    return;
                }

                const data = await res.json();
                if (data.success) {
                    setContent(data.data);
                } else {
                    setError('not_found');
                }
            } catch (err) {
                setError('network');
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [id]);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    if (error === 'premium_wall') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-stone-50 p-6 text-center">
                <div className="bg-white p-12 rounded-2xl shadow-xl max-w-lg border border-indigo-100">
                    <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6 text-indigo-900">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-3xl font-display font-bold mb-4">Premium Content</h1>
                    <p className="text-gray-600 mb-8">This history is verified and exclusive to Oriki.ng subscribers. Unlock full access to our entire archive for just $2/month.</p>
                    <Link href="/dashboard" className="inline-block w-full py-4 bg-indigo-900 text-white font-bold rounded-lg hover:bg-indigo-800 transition shadow-lg">
                        Subscribe to Unlock
                    </Link>
                </div>
            </div>
        );
    }

    if (!content) return <div className="min-h-screen flex items-center justify-center">Content not found</div>;

    return (
        <article className="min-h-screen bg-white py-12">
            <div className="container mx-auto px-6 max-w-4xl">
                {/* Header */}
                <header className="mb-10 text-center">
                    <span className="text-indigo-900 font-bold tracking-widest uppercase text-sm mb-4 block">{content.category}</span>
                    <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">{content.title}</h1>
                    <div className="flex justify-center gap-2">
                        {content.tags.map(tag => (
                            <span key={tag} className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">#{tag}</span>
                        ))}
                    </div>
                </header>

                {/* Media Player */}
                {content.media && content.media.length > 0 && (
                    <div className="mb-10 rounded-2xl overflow-hidden bg-black aspect-video relative flex items-center justify-center">
                        {/* Placeholder for actual player logic based on type */}
                        {content.media[0].type === 'video' ? (
                            <div className="text-white flex flex-col items-center">
                                <Play size={64} className="opacity-80" />
                                <p className="mt-4">Video Playback Placeholder</p>
                            </div>
                        ) : (
                            <div className="w-full h-full object-cover">
                                {/* Assuming image or audio placeholder */}
                                <img src={content.media[0].url || "https://via.placeholder.com/800x450"} alt="Content Media" className="w-full h-full object-cover" />
                                {content.media[0].type === 'audio' && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <Music size={48} className="text-white" />
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {/* Body */}
                <div className="prose prose-lg max-w-none prose-headings:font-display prose-indigo">
                    <div dangerouslySetInnerHTML={{ __html: content.body.replace(/\n/g, '<br/>') }} />
                </div>

                {/* Footer */}
                <div className="mt-16 pt-8 border-t border-gray-100 flex justify-between items-center text-gray-500 text-sm">
                    <span>By {content.author?.name || 'Oriki.ng Archive'}</span>
                    <span>{new Date(content.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
        </article>
    );
}
