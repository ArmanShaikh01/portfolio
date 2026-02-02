'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import AdminPageWrapper from '@/components/AdminPageWrapper';

export default function AdminAchievementsPage() {
    const [achievements, setAchievements] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: new Date().toISOString().split('T')[0],
        image: '',
        category: '',
        isPublic: true,
    });

    useEffect(() => {
        fetchAchievements();
    }, []);

    const fetchAchievements = async () => {
        try {
            const response = await fetch('/api/admin/achievements');
            const data = await response.json();
            if (data.success) {
                setAchievements(data.data);
            }
        } catch (error) {
            console.error('Error fetching achievements:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editing
                ? `/api/admin/achievements/${editing._id}`
                : '/api/admin/achievements';
            const method = editing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchAchievements();
                resetForm();
            }
        } catch (error) {
            console.error('Error saving achievement:', error);
        }
    };

    const deleteAchievement = async (id: string) => {
        if (!confirm('Are you sure?')) return;

        try {
            const response = await fetch(`/api/admin/achievements/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchAchievements();
            }
        } catch (error) {
            console.error('Error deleting achievement:', error);
        }
    };

    const editAchievement = (achievement: any) => {
        setEditing(achievement);
        setFormData({
            ...achievement,
            date: new Date(achievement.date).toISOString().split('T')[0],
        });
    };

    const resetForm = () => {
        setEditing(null);
        setFormData({
            title: '',
            description: '',
            date: new Date().toISOString().split('T')[0],
            image: '',
            category: '',
            isPublic: true,
        });
    };

    if (loading) {
        return (
            <AdminPageWrapper title="Manage Achievements">
                <div className="text-slate-600">Loading...</div>
            </AdminPageWrapper>
        );
    }

    return (
        <AdminPageWrapper title="Manage Achievements" description="Track and showcase your accomplishments">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form */}
                <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">
                        {editing ? 'Edit Achievement' : 'Add New Achievement'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Achievement Title"
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
                            label="Category"
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />

                        <Input
                            label="Date"
                            type="date"
                            required
                            value={formData.date}
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />

                        <Input
                            label="Image URL (optional)"
                            type="url"
                            value={formData.image}
                            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        />

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

                        <div className="flex gap-2 pt-2">
                            <Button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                                {editing ? 'Update' : 'Add'} Achievement
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
                    <h2 className="text-xl font-bold text-slate-900">All Achievements</h2>
                    {achievements.length === 0 ? (
                        <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 text-center">
                            <p className="text-slate-600">No achievements yet. Add your first achievement!</p>
                        </div>
                    ) : (
                        achievements.map((achievement) => (
                            <div key={achievement._id} className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-lg hover:shadow-premium transition-all">
                                <div className="flex justify-between items-start">
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-slate-900 text-lg">{achievement.title}</h3>
                                        <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                                            {achievement.description}
                                        </p>
                                        <p className="text-xs text-purple-600 font-medium mt-2">
                                            {achievement.category} | {new Date(achievement.date).toLocaleDateString()}
                                        </p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {achievement.isPublic ? '🌐 Public' : '🔒 Private'}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={() => editAchievement(achievement)}
                                            className="hover:bg-purple-50"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => deleteAchievement(achievement._id)}
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
