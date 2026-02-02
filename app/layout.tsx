import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import AuthProvider from '@/components/AuthProvider';
import ConditionalLayout from '@/components/ConditionalLayout';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Portfolio - Professional Portfolio Website',
    description: 'A professional portfolio showcasing my work, skills, and achievements',
    keywords: ['portfolio', 'web developer', 'projects', 'skills'],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <AuthProvider>
                    <ConditionalLayout>{children}</ConditionalLayout>
                </AuthProvider>
            </body>
        </html>
    );
}
