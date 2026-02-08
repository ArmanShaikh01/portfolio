import dbConnect from '@/lib/mongodb';
import About from '@/models/About';
import Image from 'next/image';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Arman Shaikh | Computer Engineering Student & Web Developer',
    description: 'Learn more about Arman Shaikh - Computer Engineering student passionate about web development, AI, and building innovative solutions. Discover my background, skills, and journey in tech.',
};

async function getAbout() {
    await dbConnect();
    const about = await About.findOne({ isPublic: true }).lean();
    return about ? JSON.parse(JSON.stringify(about)) : null;
}

export default async function AboutPage() {
    const about = await getAbout();

    if (!about) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                        <span className="gradient-text">About Arman Shaikh</span>
                    </h1>
                    <p className="text-neutral-600 text-center">Content coming soon...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-12 text-center">
                    <span className="gradient-text">About Arman Shaikh</span>
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        <div className="prose prose-neutral max-w-none">
                            <p className="text-lg text-neutral-700 whitespace-pre-wrap">{about.bio}</p>
                        </div>
                    </div>

                    <div>
                        {about.profileImage && (
                            <div className="mb-6">
                                <Image
                                    src={about.profileImage}
                                    alt="Profile"
                                    width={300}
                                    height={300}
                                    className="rounded-lg"
                                />
                            </div>
                        )}

                        {about.socialLinks && (
                            <div className="space-y-3">
                                <h3 className="font-semibold text-neutral-900">Connect</h3>
                                {about.socialLinks.github && (
                                    <a
                                        href={about.socialLinks.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-neutral-600 hover:text-neutral-900"
                                    >
                                        GitHub →
                                    </a>
                                )}
                                {about.socialLinks.linkedin && (
                                    <a
                                        href={about.socialLinks.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-neutral-600 hover:text-neutral-900"
                                    >
                                        LinkedIn →
                                    </a>
                                )}
                                {about.socialLinks.twitter && (
                                    <a
                                        href={about.socialLinks.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block text-neutral-600 hover:text-neutral-900"
                                    >
                                        Twitter →
                                    </a>
                                )}
                                {about.socialLinks.email && (
                                    <a
                                        href={`mailto:${about.socialLinks.email}`}
                                        className="block text-neutral-600 hover:text-neutral-900"
                                    >
                                        Email →
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
            );
}
