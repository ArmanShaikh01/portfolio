export default function Footer() {
    return (
        <footer className="bg-neutral-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center">
                    <p className="text-sm text-neutral-400">
                        © {new Date().getFullYear()} Portfolio. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
