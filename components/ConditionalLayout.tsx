'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ConditionalLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    // Check if current route is admin route
    const isAdminRoute = pathname?.startsWith('/admin');

    // For admin routes, render children without navbar/footer
    if (isAdminRoute) {
        return <>{children}</>;
    }

    // For regular routes, render with navbar and footer
    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}
