import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Skill from '@/models/Skill';
import Achievement from '@/models/Achievement';
import Message from '@/models/Message';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';

async function getStats() {
    await dbConnect();

    const [projectsCount, skillsCount, achievementsCount, unreadMessages] = await Promise.all([
        Project.countDocuments(),
        Skill.countDocuments(),
        Achievement.countDocuments(),
        Message.countDocuments({ isRead: false }),
    ]);

    return {
        projectsCount,
        skillsCount,
        achievementsCount,
        unreadMessages,
    };
}

export default async function AdminDashboard() {
    const stats = await getStats();

    const quickLinks = [
        { href: '/admin/about', label: 'Edit About', icon: '👤', color: 'from-purple-500 to-pink-500' },
        { href: '/admin/skills', label: 'Manage Skills', icon: '⚡', color: 'from-indigo-500 to-purple-500' },
        { href: '/admin/projects', label: 'Manage Projects', icon: '💼', color: 'from-pink-500 to-rose-500' },
        { href: '/admin/achievements', label: 'Manage Achievements', icon: '🏆', color: 'from-purple-500 to-indigo-500' },
        { href: '/admin/messages', label: 'View Messages', icon: '✉️', badge: stats.unreadMessages, color: 'from-blue-500 to-cyan-500' },
        { href: '/admin/resume', label: 'Upload Resume', icon: '📄', color: 'from-violet-500 to-purple-500' },
    ];

    const statCards = [
        { label: 'Total Projects', value: stats.projectsCount, icon: '💼', gradient: 'from-purple-600 to-pink-600' },
        { label: 'Total Skills', value: stats.skillsCount, icon: '⚡', gradient: 'from-indigo-600 to-purple-600' },
        { label: 'Total Achievements', value: stats.achievementsCount, icon: '🏆', gradient: 'from-pink-600 to-rose-600' },
        { label: 'Unread Messages', value: stats.unreadMessages, icon: '✉️', gradient: 'from-blue-600 to-cyan-600' },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-2">
                        <span className="gradient-text">Admin Dashboard</span>
                    </h1>
                    <p className="text-slate-600 text-lg">Welcome back! Manage your portfolio content</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statCards.map((stat, index) => (
                        <div
                            key={stat.label}
                            className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-lg hover:shadow-premium transition-all hover-lift animate-fade-in"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.gradient} rounded-xl mb-4`}>
                                <span className="text-2xl">{stat.icon}</span>
                            </div>
                            <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                            <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></div>
                        <h2 className="text-2xl font-bold text-slate-900">Quick Actions</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {quickLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className="group relative overflow-hidden flex items-center justify-between p-5 bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-100 rounded-xl hover:border-purple-300 hover:shadow-lg transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${link.color} rounded-lg group-hover:scale-110 transition-transform`}>
                                        <span className="text-2xl">{link.icon}</span>
                                    </div>
                                    <span className="font-semibold text-slate-900">{link.label}</span>
                                </div>
                                {link.badge !== undefined && link.badge > 0 && (
                                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                        {link.badge}
                                    </span>
                                )}
                                <svg className="absolute right-3 w-5 h-5 text-purple-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
