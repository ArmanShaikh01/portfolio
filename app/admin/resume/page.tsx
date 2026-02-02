'use client';

import AdminPageWrapper from '@/components/AdminPageWrapper';

export default function AdminResumePage() {
    return (
        <AdminPageWrapper title="Resume Management" description="Upload and manage your resume">
            <div className="bg-white border-2 border-purple-200 rounded-2xl p-12 shadow-lg max-w-2xl text-center">
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-4">
                        <span className="text-4xl">📄</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-2">Resume Upload</h2>
                    <p className="text-slate-600">
                        Resume upload functionality will be implemented once Cloudinary credentials are configured.
                    </p>
                </div>

                <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6 text-left">
                    <h3 className="font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <span className="text-xl">💡</span>
                        Temporary Solution
                    </h3>
                    <ul className="space-y-2 text-sm text-slate-600">
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Upload your resume to Google Drive or Dropbox</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Get a public shareable link</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Add the link in the About section's social links</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-purple-600 mt-1">•</span>
                            <span>Or store the URL directly in the database</span>
                        </li>
                    </ul>
                </div>

                <div className="mt-6 text-xs text-slate-500">
                    <p>Full resume upload with Cloudinary integration coming soon!</p>
                </div>
            </div>
        </AdminPageWrapper>
    );
}
