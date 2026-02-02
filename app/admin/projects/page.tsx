'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import AdminPageWrapper from '@/components/AdminPageWrapper';

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        images: [] as string[],
        technologies: [] as string[],
        liveUrl: '',
        githubUrl: '',
        featured: false,
        isPublic: true,
    });

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        try {
            const response = await fetch('/api/admin/projects');
            const data = await response.json();
            if (data.success) {
                setProjects(data.data);
            }
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editing ? `/api/admin/projects/${editing._id}` : '/api/admin/projects';
            const method = editing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchProjects();
                resetForm();
            }
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    const deleteProject = async (id: string) => {
        if (!confirm('Are you sure?')) return;

        try {
            const response = await fetch(`/api/admin/projects/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchProjects();
            }
        } catch (error) {
            console.error('Error deleting project:', error);
        }
    };

    const editProject = (project: any) => {
        setEditing(project);
        setFormData(project);
    };

    const resetForm = () => {
        setEditing(null);
        setFormData({
            title: '',
            description: '',
            images: [],
            technologies: [],
            liveUrl: '',
            githubUrl: '',
            featured: false,
            isPublic: true,
        });
    };

    if (loading) {
        return (
            <AdminPageWrapper title="Manage Projects">
                <div className="text-slate-600">Loading...</div>
            </AdminPageWrapper>
        );
    }

    return (
        <AdminPageWrapper title="Manage Projects" description="Add, edit, and showcase your projects">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form */}
                <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">
                        {editing ? 'Edit Project' : 'Add New Project'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Project Title"
                            required
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Description
                            </label>
                            <textarea
                                required
                                rows={4}
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full px-3 py-2 border-2 border-purple-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            />
                        </div>

                        <Input
                            label="Technologies (comma-separated)"
                            required
                            value={formData.technologies.join(', ')}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    technologies: e.target.value.split(',').map((t) => t.trim()),
                                })
                            }
                        />

                        <Input
                            label="Image URLs (comma-separated)"
                            value={formData.images.join(', ')}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    images: e.target.value.split(',').map((i) => i.trim()).filter(Boolean),
                                })
                            }
                        />

                        <Input
                            label="Live URL"
                            type="url"
                            value={formData.liveUrl}
                            onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                        />

                        <Input
                            label="GitHub URL"
                            type="url"
                            value={formData.githubUrl}
                            onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                        />

                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    checked={formData.featured}
                                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                                />
                                <label htmlFor="featured" className="text-sm font-medium text-slate-700">
                                    Featured
                                </label>
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
                                    Public
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                {editing ? 'Update' : 'Add'} Project
                            </Button>
                            {editing && (
                                <Button type="button" variant="ghost" onClick={resetForm}>
                                    Cancel
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

                {/* List */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-slate-900">All Projects</h2>
                    {projects.length === 0 ? (
                        <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 text-center">
                            <p className="text-slate-600">No projects yet. Add your first project!</p>
                        </div>
                    ) : (
                        projects.map((project) => (
                            <div key={project._id} className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-lg hover:shadow-premium transition-all">
                                <div className="flex justify-between items-start">
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-slate-900 text-lg">{project.title}</h3>
                                        <p className="text-sm text-slate-600 line-clamp-2 mt-1">{project.description}</p>
                                        <p className="text-xs text-slate-500 mt-2">
                                            {project.featured && '⭐ Featured | '}
                                            {project.isPublic ? '🌐 Public' : '🔒 Private'}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="ghost" onClick={() => editProject(project)} className="hover:bg-purple-50">
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => deleteProject(project._id)}
                                        >
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </AdminPageWrapper>
    );
}
