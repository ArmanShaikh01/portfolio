import dbConnect from '@/lib/mongodb';
import Achievement from '@/models/Achievement';
import Link from 'next/link';

async function getAchievements(limit?: number) {
    await dbConnect();
    // Optimized: Select only needed fields
    let query = Achievement.find({ isPublic: true })
        .select('title description category date image')
        .sort({ date: -1 });
    if (limit) {
        query = query.limit(limit);
    }
    const achievements = await query.lean();
    return JSON.parse(JSON.stringify(achievements));
}

export default async function AchievementsSection({ limit }: { limit?: number }) {
    const achievements = await getAchievements(limit);

    if (achievements.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold mb-4">
                    <span className="gradient-text">Achievements</span>
                </h2>
                <p className="text-slate-600">Add your achievements from the admin panel!</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="gradient-text">Achievements & Milestones</span>
                </h2>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                    Key accomplishments and recognition throughout my journey
                </p>
            </div>

            <div className="relative">
                {/* Gradient Timeline Line */}
                <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-600 via-pink-600 to-purple-600 rounded-full hidden md:block"></div>

                <div className="space-y-8">
                    {achievements.map((achievement: any, index: number) => (
                        <div
                            key={achievement._id}
                            className="relative group animate-slide-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Glowing Timeline Dot */}
                            <div className="absolute left-6 top-6 w-7 h-7 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full border-4 border-white shadow-lg hidden md:block group-hover:scale-110 transition-transform z-10">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full animate-ping opacity-40"></div>
                            </div>

                            <div className="md:ml-20 bg-white border-2 border-purple-200 rounded-2xl p-6 hover-lift hover:border-purple-400 transition-all shadow-md hover:shadow-premium">
                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-bold text-slate-900 group-hover:text-purple-600 transition-colors mb-2">
                                            {achievement.title}
                                        </h3>
                                        <p className="text-slate-600 leading-relaxed">
                                            {achievement.description}
                                        </p>
                                    </div>
                                    <div className="flex flex-col items-start md:items-end gap-2 flex-shrink-0">
                                        <span className="text-sm font-medium text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                                            {new Date(achievement.date).toLocaleDateString('en-US', {
                                                month: 'short',
                                                year: 'numeric'
                                            })}
                                        </span>
                                        <span className="px-3 py-1.5 bg-purple-50 text-purple-600 text-sm font-medium rounded-full border border-purple-200">
                                            {achievement.category}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {limit && achievements.length >= limit && (
                <div className="text-center mt-12">
                    <Link
                        href="/achievements"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all group"
                    >
                        View all achievements
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            )}
        </div>
    );
}
