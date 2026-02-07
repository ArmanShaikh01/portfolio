import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import ConditionalLayout from '@/components/ConditionalLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Arman Shaikh | Computer Engineering Student | Web Developer Portfolio',
    description: 'Arman Shaikh - Computer Engineering student specializing in web development, AI, and full-stack applications. Explore my portfolio featuring projects like LabBuddy, Food Zero Waste, and ShopMate. View my skills, achievements, and contact information.',
    keywords: [
        'Arman Shaikh',
        'Arman Shaikh portfolio',
        'Computer Engineering student',
        'Web Developer',
        'Full Stack Developer',
        'AI enthusiast',
        'React developer',
        'Next.js developer',
        'MongoDB developer',
        'Portfolio website',
        'Student developer',
        'LabBuddy',
        'Food Zero Waste',
        'ShopMate'
    ],
    authors: [{ name: 'Arman Shaikh' }],
    creator: 'Arman Shaikh',
    publisher: 'Arman Shaikh',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://armanshaikh.in',
        siteName: 'Arman Shaikh Portfolio',
        title: 'Arman Shaikh | Computer Engineering Student | Web Developer',
        description: 'Arman Shaikh - Computer Engineering student specializing in web development, AI, and full-stack applications. View my portfolio, projects, and achievements.',
        images: [
            {
                url: 'https://armanshaikh.in/og-image.jpg',
                width: 1200,
                height: 630,
                alt: 'Arman Shaikh - Web Developer Portfolio',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Arman Shaikh | Computer Engineering Student | Web Developer',
        description: 'Arman Shaikh - Computer Engineering student specializing in web development, AI, and full-stack applications.',
        images: ['https://armanshaikh.in/og-image.jpg'],
        creator: '@armanshaikh',
    },
    verification: {
        google: 'google-site-verification-code', // Will add after Google Search Console setup
    },
    alternates: {
        canonical: 'https://armanshaikh.in',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const structuredData = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Arman Shaikh',
        jobTitle: 'Computer Engineering Student & Web Developer',
        description: 'Computer Engineering student specializing in web development, AI, and full-stack applications',
        url: 'https://armanshaikh.in',
        sameAs: [
            'https://github.com/ArmanShaikh01',
            'https://linkedin.com/in/armanshaikh',
        ],
        knowsAbout: [
            'Web Development',
            'Full Stack Development',
            'React',
            'Next.js',
            'MongoDB',
            'Artificial Intelligence',
            'Computer Engineering'
        ],
        alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'Computer Engineering Department',
        },
    };

    return (
        <html lang="en">
            <head>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
                />
            </head>
            <body className={inter.className}>
                <AuthProvider>
                    <ConditionalLayout>{children}</ConditionalLayout>
                </AuthProvider>
            </body>
        </html>
    );
}
