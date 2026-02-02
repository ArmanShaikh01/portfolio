'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { useState } from 'react';

export default function AdminSidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { href: '/admin', label: 'Dashboard', icon: '📊' },
        { href: '/admin/about', label: 'About', icon: '👤' },
        { href: '/admin/skills', label: 'Skills', icon: '⚡' },
        { href: '/admin/projects', label: 'Projects', icon: '💼' },
        { href: '/admin/achievements', label: 'Achievements', icon: '🏆' },
        { href: '/admin/messages', label: 'Messages', icon: '✉️' },
        { href: '/admin/resume', label: 'Resume', icon: '📄' },
    ];

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-gradient-to-br from-purple-600 to-pink-600 text-white rounded-xl shadow-lg hover:shadow-premium transition-all"
                aria-label="Toggle menu"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {isOpen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                </svg>
            </button>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-30"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed lg:static inset-y-0 left-0 z-40
                w-72 bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900 text-white min-h-screen p-6 shadow-2xl
                transform transition-transform duration-300 ease-in-out
                ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
            `}>
                {/* Header */}
                <div className="mb-8 pb-6 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Admin Panel</h2>
                            <p className="text-xs text-purple-300">Portfolio Manager</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <nav className="space-y-2">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                                        : 'text-purple-200 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                <span className={`text-xl transition-transform ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                                    {link.icon}
                                </span>
                                <span className="font-medium">{link.label}</span>
                                {isActive && (
                                    <div className="ml-auto w-2 h-2 bg-white rounded-full"></div>
                                )}
                            </Link>
                        );
                    })}
                </nav>

                {/* View Portfolio Link */}
                <div className="mt-6 pt-6 border-t border-white/10">
                    <Link
                        href="/"
                        target="_blank"
                        className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-purple-200 hover:text-white transition-all group"
                    >
                        <span className="text-xl group-hover:scale-110 transition-transform">🌐</span>
                        <span className="font-medium">View Portfolio</span>
                        <svg className="ml-auto w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                    </Link>
                </div>

                {/* Logout */}
                <div className="mt-auto pt-6 border-t border-white/10">
                    <button
                        onClick={() => signOut({ callbackUrl: '/admin/login' })}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 hover:text-red-200 transition-all group"
                    >
                        <span className="text-xl group-hover:scale-110 transition-transform">🚪</span>
                        <span className="font-medium">Logout</span>
                    </button>
                </div>
            </div>
        </>
    );
}
