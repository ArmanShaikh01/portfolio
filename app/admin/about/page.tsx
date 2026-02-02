'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import AdminPageWrapper from '@/components/AdminPageWrapper';

export default function AdminAboutPage() {
    const [about, setAbout] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        bio: '',
        profileImage: '',
        socialLinks: {
            github: '',
            linkedin: '',
            twitter: '',
            email: '',
        },
        isPublic: true,
    });

    useEffect(() => {
        fetchAbout();
    }, []);

    const fetchAbout = async () => {
        try {
            const response = await fetch('/api/admin/about');
            const data = await response.json();
            if (data.success && data.data) {
                setAbout(data.data);
                setFormData(data.data);
            }
        } catch (error) {
            console.error('Error fetching about:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            const response = await fetch('/api/admin/about', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('About section saved successfully!');
                fetchAbout();
            }
        } catch (error) {
            console.error('Error saving about:', error);
            const errorMessage = error instanceof Error ? error.message : 'Failed to save about section';
            alert(errorMessage);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <AdminPageWrapper title="About Section">
                <div className="text-slate-600">Loading...</div>
            </AdminPageWrapper>
        );
    }

    return (
        <AdminPageWrapper title="About Section" description="Update your bio and social links">
            <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 shadow-lg max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Bio
                        </label>
                        <textarea
                            required
                            rows={6}
                            value={formData.bio}
                            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Tell us about yourself..."
                        />
                    </div>

                    <Input
                        label="Profile Image URL"
                        type="url"
                        value={formData.profileImage}
                        onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
                        placeholder="https://example.com/image.jpg"
                    />

                    <div className="border-t-2 border-purple-100 pt-6">
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <span className="w-2 h-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"></span>
                            Social Links
                        </h3>

                        <div className="space-y-4">
                            <Input
                                label="GitHub URL"
                                type="url"
                                value={formData.socialLinks.github}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        socialLinks: { ...formData.socialLinks, github: e.target.value },
                                    })
                                }
                                placeholder="https://github.com/username"
                            />

                            <Input
                                label="LinkedIn URL"
                                type="url"
                                value={formData.socialLinks.linkedin}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        socialLinks: { ...formData.socialLinks, linkedin: e.target.value },
                                    })
                                }
                                placeholder="https://linkedin.com/in/username"
                            />

                            <Input
                                label="Twitter URL"
                                type="url"
                                value={formData.socialLinks.twitter}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        socialLinks: { ...formData.socialLinks, twitter: e.target.value },
                                    })
                                }
                                placeholder="https://twitter.com/username"
                            />

                            <Input
                                label="Email"
                                type="email"
                                value={formData.socialLinks.email}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        socialLinks: { ...formData.socialLinks, email: e.target.value },
                                    })
                                }
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="isPublic"
                            checked={formData.isPublic}
                            onChange={(e) => setFormData({ ...formData, isPublic: e.target.checked })}
                            className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                        />
                        <label htmlFor="isPublic" className="text-sm font-medium text-slate-700">
                            Make this section public
                        </label>
                    </div>

                    <Button
                        type="submit"
                        disabled={saving}
                        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 w-full"
                    >
                        {saving ? 'Saving...' : 'Save About Section'}
                    </Button>
                </form>
            </div>
        </AdminPageWrapper>
    );
}
