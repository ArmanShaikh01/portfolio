'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Active section detection
    useEffect(() => {
        if (pathname !== '/') return;

        const sections = ['hero', 'about', 'skills', 'projects', 'achievements', 'contact'];
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((section) => {
            const element = document.getElementById(section);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [pathname]);

    const links = [
        { href: '/', label: 'Home', section: null },
        { href: '/about', label: 'About', section: 'about' },
        { href: '/skills', label: 'Skills', section: 'skills' },
        { href: '/projects', label: 'Projects', section: 'projects' },
        { href: '/achievements', label: 'Achievements', section: 'achievements' },
        { href: '/contact', label: 'Contact', section: 'contact' },
    ];

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, section: string | null) => {
        if (pathname === '/' && section) {
            e.preventDefault();
            const element = document.getElementById(section);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                setIsOpen(false);
            }
        } else if (section) {
            e.preventDefault();
            window.location.href = `/#${section}`;
        }
    };

    return (
        <nav
            className={`sticky top-0 z-50 transition-all duration-300 ${scrolled
                ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-purple-100'
                : 'bg-white border-b border-purple-100'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link href="/" className="text-2xl font-bold gradient-text hover:opacity-80 transition-opacity">
                            Portfolio
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {links.map((link) => {
                            const isActive = pathname === '/' && activeSection === link.section;
                            const isCurrentPage = pathname === link.href;

                            return (
                                <a
                                    key={link.href}
                                    href={link.section ? `/#${link.section}` : link.href}
                                    onClick={(e) => handleClick(e, link.section)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${isActive || isCurrentPage
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                                        : 'text-slate-600 hover:text-purple-600 hover:bg-purple-50'
                                        }`}
                                >
                                    {link.label}
                                </a>
                            );
                        })}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-slate-600 hover:text-purple-600 hover:bg-purple-50 focus:outline-none transition-colors"
                        >
                            <svg
                                className="h-6 w-6"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                {isOpen ? (
                                    <path d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden glass border-t border-purple-100 shadow-lg">
                    <div className="px-4 pt-2 pb-4 space-y-2">
                        {links.map((link) => {
                            const isActive = pathname === '/' && activeSection === link.section;
                            const isCurrentPage = pathname === link.href;

                            return (
                                <a
                                    key={link.href}
                                    href={link.section ? `/#${link.section}` : link.href}
                                    onClick={(e) => handleClick(e, link.section)}
                                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-all ${isActive || isCurrentPage
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                                            : 'text-slate-600 hover:bg-purple-50 hover:text-purple-600'
                                        }`}
                                >
                                    {link.label}
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}
        </nav>
    );
}
