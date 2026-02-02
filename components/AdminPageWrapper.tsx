export default function AdminPageWrapper({
    children,
    title,
    description
}: {
    children: React.ReactNode;
    title: string;
    description?: string;
}) {
    return (
        <div className="p-8">
            <div className="max-w-7xl mx-auto">
                {/* Page Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2">
                        <span className="gradient-text">{title}</span>
                    </h1>
                    {description && (
                        <p className="text-slate-600 text-lg">{description}</p>
                    )}
                </div>

                {/* Page Content */}
                {children}
            </div>
        </div>
    );
}
