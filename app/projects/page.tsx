import ProjectsSection from '@/components/sections/ProjectsSection';

export default async function ProjectsPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-20">
            <ProjectsSection featured={false} />
        </div>
    );
}
