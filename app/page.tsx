import Link from 'next/link';
import Button from '@/components/ui/Button';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import AchievementsSection from '@/components/sections/AchievementsSection';
import ContactSection from '@/components/sections/ContactSection';
import Image from 'next/image';
import dbConnect from '@/lib/mongodb';
import About from '@/models/About';

async function getAbout() {
    await dbConnect();
    // Optimized: Only fetch profileImage field for hero section
    const about = await About.findOne({ isPublic: true })
        .select('profileImage')
        .lean();
    return about ? JSON.parse(JSON.stringify(about)) : null;
}

export default async function Home() {
    const about = await getAbout();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            {/* Hero Section - Next Level */}
            <section id="hero" className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 py-24 md:py-32">
                {/* Animated Background Elements */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse-slow"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-300 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-300 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center gap-12 animate-fade-in">
                        {/* Profile Image */}
                        {about?.profileImage && (
                            <div className="flex-shrink-0">
                                <div className="relative w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80">
                                    <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-400 rounded-full blur-2xl opacity-50 animate-pulse-slow"></div>
                                    <Image
                                        src={about.profileImage}
                                        alt="Arman Shaikh"
                                        fill
                                        className="object-cover rounded-full border-8 border-white/20 shadow-2xl relative z-10"
                                        sizes="(max-width: 768px) 192px, (max-width: 1024px) 256px, 320px"
                                        priority
                                    />
                                </div>
                            </div>
                        )}

                        {/* Text Content */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-tight drop-shadow-lg">
                                Arman Shaikh
                            </h1>
                            <p className="text-xl md:text-2xl text-white/90 mb-4 leading-relaxed drop-shadow-md font-semibold">
                                Computer Engineering Student | Web Developer | AI Enthusiast
                            </p>
                            <p className="text-lg md:text-xl text-white/80 mb-10 leading-relaxed drop-shadow-md">
                                Passionate about problem solving, building modern web applications, and exploring AI-driven solutions
                            </p>
                            <div className="flex gap-4 justify-center md:justify-start flex-wrap">
                                <a href="#projects">
                                    <Button size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xl hover:shadow-3xl transition-all font-bold px-8 py-4 text-lg">
                                        View Projects
                                    </Button>
                                </a>
                                <a href="#contact">
                                    <Button variant="secondary" size="lg" className="bg-indigo-600 text-white hover:bg-indigo-700 shadow-2xl hover:shadow-3xl transition-all font-bold px-8 py-4 text-lg border-2 border-indigo-600">
                                        Contact Me
                                    </Button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white" />
                    </svg>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="py-20 bg-white scroll-mt-16">
                <AboutSection compact />
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 scroll-mt-16">
                <SkillsSection limit={9} />
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-20 bg-white scroll-mt-16">
                <ProjectsSection featured />
            </section>

            {/* Achievements Section */}
            <section id="achievements" className="py-20 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 scroll-mt-16">
                <AchievementsSection limit={5} />
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white scroll-mt-16">
                <ContactSection />
            </section>
        </div>
    );
}
