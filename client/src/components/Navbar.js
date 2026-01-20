"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Discover', href: '/discover' },
        { name: 'Submit Story', href: '/submit' },
    ];

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md border-b border-black/5 py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="text-2xl font-serif font-bold tracking-tighter hover:opacity-80 transition">
                    ORIKI<span className="text-indigo-900">.NG</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-medium tracking-wide hover:text-indigo-900 transition-colors ${pathname === link.href ? 'text-indigo-900 font-semibold' : 'text-black/80'}`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/login"
                        className="px-6 py-2.5 bg-black text-white text-xs font-semibold uppercase tracking-widest hover:bg-slate-900 transition-all"
                    >
                        Sign In
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-black">
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col space-y-4 md:hidden animate-in slide-in-from-top-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-serif text-black hover:text-indigo-900"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/login"
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-serif text-indigo-900 font-bold"
                    >
                        Sign In
                    </Link>
                </div>
            )}
        </nav>
    );
}
