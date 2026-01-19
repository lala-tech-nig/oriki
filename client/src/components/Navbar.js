"use client";
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X, Search } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-stone-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold text-amber-900 font-heading">
                            Roots<span className="text-amber-600">.ng</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/explore" className="text-stone-600 hover:text-amber-800 transition-colors">
                            Explore Heritage
                        </Link>
                        <Link href="/identity-engine" className="text-stone-600 hover:text-amber-800 transition-colors">
                            Trace Roots
                        </Link>
                        <Link href="/community" className="text-stone-600 hover:text-amber-800 transition-colors">
                            Community
                        </Link>
                        <Link href="/login" className="px-4 py-2 rounded-full border border-amber-800 text-amber-800 hover:bg-amber-50 transition-colors">
                            Sign In
                        </Link>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-stone-600 hover:text-amber-800">
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-white border-b border-stone-200"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-center">
                        <Link href="/explore" className="block px-3 py-2 text-stone-600 hover:text-amber-800">Explore Heritage</Link>
                        <Link href="/identity-engine" className="block px-3 py-2 text-stone-600 hover:text-amber-800">Trace Roots</Link>
                        <Link href="/community" className="block px-3 py-2 text-stone-600 hover:text-amber-800">Community</Link>
                        <Link href="/login" className="block px-3 py-2 text-amber-800 font-medium">Sign In</Link>
                    </div>
                </motion.div>
            )}
        </nav>
    );
}
