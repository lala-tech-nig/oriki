import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer() {
    return (
        <footer className="bg-black text-stone-300 py-12 border-t border-indigo-900/30">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
                <div>
                    {/* Logo matching Navbar but adapted for dark theme contrast if needed, or keeping exact class */}
                    <Link href="/" className="text-2xl font-serif font-bold tracking-tighter text-white hover:opacity-80 transition inline-block mb-4">
                        ORIKI<span className="text-indigo-400">.NG</span>
                    </Link>
                    <p className="text-sm text-gray-400 leading-relaxed">
                        The ultimate Yoruba knowledge zone. Reconnecting you with history, culture, and identity.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Discover</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/discover" className="hover:text-indigo-400 transition">Search History</Link></li>
                        <li><Link href="/discover?category=Royalty" className="hover:text-indigo-400 transition">Kings & Queens</Link></li>
                        <li><Link href="/discover?category=Culture" className="hover:text-indigo-400 transition">Culture & Festivals</Link></li>
                        <li><Link href="/discover" className="hover:text-indigo-400 transition">Family Oriki</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Contribute</h4>
                    <ul className="space-y-2 text-sm">
                        <li><Link href="/submit" className="hover:text-indigo-400 transition">Submit a Story</Link></li>
                        <li><Link href="/request" className="hover:text-indigo-400 transition">Request Research</Link></li>
                        <li><Link href="/dashboard" className="hover:text-indigo-400 transition">My Dashboard</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Contact</h4>
                    <ul className="space-y-3 text-sm">
                        <li className="flex items-center gap-2"><Mail size={16} /> support@oriki.ng</li>
                        <li className="flex items-center gap-2"><MapPin size={16} /> Lagos, Nigeria</li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto px-6 mt-12 pt-8 border-t border-gray-800 text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Oriki.ng. All rights reserved.
            </div>
        </footer>
    );
}
