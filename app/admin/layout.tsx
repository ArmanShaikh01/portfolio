import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import AdminSidebar from '@/components/AdminSidebar';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    // Don't show sidebar on login page, just render children
    // This prevents infinite redirect loops
    if (!session) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-50">
            <AdminSidebar />
            <div className="flex-1">
                {children}
            </div>
        </div>
    );
}
