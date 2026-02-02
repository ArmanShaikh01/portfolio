import dbConnect from '@/lib/mongodb';
import Skill from '@/models/Skill';
import Link from 'next/link';

async function getSkills(limit?: number) {
    await dbConnect();
    // Optimized: Select only needed fields
    let query = Skill.find({ isPublic: true })
        .select('name category proficiency icon')
        .sort({ proficiency: -1, name: 1 });
    if (limit) {
        query = query.limit(limit);
    }
    const skills = await query.lean();
    return JSON.parse(JSON.stringify(skills));
}

export default async function SkillsSection({ limit }: { limit?: number }) {
    const skills = await getSkills(limit);

    if (skills.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold mb-4">
                    <span className="gradient-text">Skills</span>
                </h2>
                <p className="text-slate-600">Add your skills from the admin panel!</p>
            </div>
        );
    }

    // Group skills by category when showing all skills
    const groupedSkills = limit ? null : skills.reduce((acc: any, skill: any) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {});

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="gradient-text">Skills & Expertise</span>
                </h2>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                    Technologies and tools I work with to bring ideas to life
                </p>
            </div>

            {/* Grouped by category (full page view) */}
            {groupedSkills ? (
                <div className="space-y-12">
                    {Object.entries(groupedSkills).map(([category, categorySkills]: [string, any]) => (
                        <div key={category}>
                            <h3 className="text-2xl font-bold text-slate-800 mb-6 pb-2 border-b-2 border-purple-200">
                                {category}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categorySkills.map((skill: any, index: number) => (
                                    <div
                                        key={skill._id}
                                        className="group bg-white border border-purple-200 rounded-2xl p-6 hover-lift hover:border-purple-400 transition-all shadow-md hover:shadow-premium"
                                        style={{ animationDelay: `${index * 0.1}s` }}
                                    >
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h4 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                                                    {skill.name}
                                                </h4>
                                            </div>
                                            <span className="text-sm font-bold text-purple-700 bg-purple-100 px-3 py-1.5 rounded-full border border-purple-300 shadow-sm">
                                                {skill.proficiency}%
                                            </span>
                                        </div>
                                        <div className="w-full bg-purple-100 rounded-full h-3 overflow-hidden">
                                            <div
                                                className="h-3 rounded-full gradient-primary transition-all duration-1000 ease-out shadow-sm"
                                                style={{ width: `${skill.proficiency}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                /* Ungrouped (home page preview) */
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {skills.map((skill: any, index: number) => (
                            <div
                                key={skill._id}
                                className="group bg-white border border-purple-200 rounded-2xl p-6 hover-lift hover:border-purple-400 transition-all shadow-md hover:shadow-premium"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                                            {skill.name}
                                        </h3>
                                        <p className="text-sm text-slate-500 mt-1">{skill.category}</p>
                                    </div>
                                    <span className="text-sm font-bold text-purple-700 bg-purple-100 px-3 py-1.5 rounded-full border border-purple-300 shadow-sm">
                                        {skill.proficiency}%
                                    </span>
                                </div>
                                <div className="w-full bg-purple-100 rounded-full h-3 overflow-hidden">
                                    <div
                                        className="h-3 rounded-full gradient-primary transition-all duration-1000 ease-out shadow-sm"
                                        style={{ width: `${skill.proficiency}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    {limit && skills.length >= limit && (
                        <div className="text-center mt-12">
                            <Link
                                href="/skills"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all group"
                            >
                                View all skills
                                <span className="group-hover:translate-x-1 transition-transform">→</span>
                            </Link>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
