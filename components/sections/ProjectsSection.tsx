import dbConnect from '@/lib/mongodb';
import Project from '@/models/Project';
import Link from 'next/link';
import Image from 'next/image';

async function getProjects(featured?: boolean) {
    await dbConnect();
    const filter: any = { isPublic: true };
    // Optimized: Select only needed fields
    const selectFields = 'title description technologies images liveUrl githubUrl featured';

    if (featured) {
        const featuredProjects = await Project.find({ ...filter, featured: true })
            .select(selectFields)
            .limit(3)
            .lean();
        if (featuredProjects.length > 0) {
            return JSON.parse(JSON.stringify(featuredProjects));
        }
        const anyProjects = await Project.find(filter)
            .select(selectFields)
            .limit(3)
            .lean();
        return JSON.parse(JSON.stringify(anyProjects));
    }

    const projects = await Project.find(filter)
        .select(selectFields)
        .limit(100)
        .lean();
    return JSON.parse(JSON.stringify(projects));
}

export default async function ProjectsSection({ featured = false }: { featured?: boolean }) {
    const projects = await getProjects(featured);

    if (projects.length === 0) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h2 className="text-4xl font-bold mb-4">
                    <span className="gradient-text">Projects</span>
                </h2>
                <p className="text-slate-600">No projects added yet. Add some from the admin panel!</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                    <span className="gradient-text">
                        {featured ? 'Featured Projects' : 'My Projects'}
                    </span>
                </h2>
                <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                    Showcasing my best work and creative solutions
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {projects.map((project: any, index: number) => (
                    <div
                        key={project._id}
                        className="group bg-white rounded-2xl overflow-hidden hover-lift shadow-lg hover:shadow-premium border border-purple-100"
                        style={{ animationDelay: `${index * 0.1}s` }}
                    >
                        {/* Project Image or Gradient Header */}
                        <div className="h-56 relative overflow-hidden bg-gradient-to-br from-purple-600 to-pink-600">
                            {project.images && project.images.length > 0 ? (
                                <Image
                                    src={project.images[0]}
                                    alt={project.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            ) : (
                                <>
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors"></div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                                    {/* Floating Orb */}
                                    <div className="absolute top-4 right-4 w-16 h-16 bg-white/20 rounded-full blur-xl animate-pulse-slow"></div>
                                </>
                            )}
                        </div>

                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-slate-600 mb-4 line-clamp-3 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2 mb-6">
                                {project.technologies?.slice(0, 3).map((tech: string) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 text-sm font-medium rounded-full border border-purple-200"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-3">
                                {project.liveUrl && (
                                    <a
                                        href={project.liveUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-md hover:shadow-lg"
                                    >
                                        Live Demo
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a
                                        href={project.githubUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 text-center px-4 py-2.5 border-2 border-purple-300 text-purple-700 rounded-lg hover:border-purple-600 hover:bg-purple-50 transition-all font-semibold"
                                    >
                                        GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {featured && (
                <div className="text-center mt-12">
                    <Link
                        href="/projects"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all group"
                    >
                        View all projects
                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </Link>
                </div>
            )}
        </div>
    );
}
