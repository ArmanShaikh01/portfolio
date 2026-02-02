'use client';

import { useState, useEffect } from 'react';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import AdminPageWrapper from '@/components/AdminPageWrapper';

export default function AdminSkillsPage() {
    const [skills, setSkills] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState<any>(null);
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        proficiency: 50,
        icon: '',
        isPublic: true,
    });

    useEffect(() => {
        fetchSkills();
    }, []);

    const fetchSkills = async () => {
        try {
            const response = await fetch('/api/admin/skills');
            const data = await response.json();
            if (data.success) {
                setSkills(data.data);
            }
        } catch (error) {
            console.error('Error fetching skills:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const url = editing ? `/api/admin/skills/${editing._id}` : '/api/skills';
            const method = editing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                fetchSkills();
                resetForm();
            }
        } catch (error) {
            console.error('Error saving skill:', error);
        }
    };

    const deleteSkill = async (id: string) => {
        if (!confirm('Are you sure?')) return;

        try {
            const response = await fetch(`/api/admin/skills/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchSkills();
            }
        } catch (error) {
            console.error('Error deleting skill:', error);
        }
    };

    const editSkill = (skill: any) => {
        setEditing(skill);
        setFormData(skill);
    };

    const resetForm = () => {
        setEditing(null);
        setFormData({
            name: '',
            category: '',
            proficiency: 50,
            icon: '',
            isPublic: true,
        });
    };

    if (loading) {
        return (
            <AdminPageWrapper title="Manage Skills">
                <div className="text-slate-600">Loading...</div>
            </AdminPageWrapper>
        );
    }

    return (
        <AdminPageWrapper title="Manage Skills" description="Add, edit, and organize your skills">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Form */}
                <div className="bg-white border-2 border-purple-200 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">
                        {editing ? 'Edit Skill' : 'Add New Skill'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            label="Skill Name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />

                        <Input
                            label="Category"
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        />

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Proficiency ({formData.proficiency}%)
                            </label>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={formData.proficiency}
                                onChange={(e) =>
                                    setFormData({ ...formData, proficiency: parseInt(e.target.value) })
                                }
                                className="w-full h-2 bg-purple-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
                            />
                        </div>

                        <Input
                            label="Icon URL (optional)"
                            value={formData.icon}
                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
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
                                {editing ? 'Update' : 'Add'} Skill
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
                    <h2 className="text-xl font-bold text-slate-900">All Skills</h2>
                    {skills.length === 0 ? (
                        <div className="bg-white border-2 border-purple-200 rounded-2xl p-8 text-center">
                            <p className="text-slate-600">No skills yet. Add your first skill!</p>
                        </div>
                    ) : (
                        skills.map((skill) => (
                            <div key={skill._id} className="bg-white border-2 border-purple-200 rounded-2xl p-5 shadow-lg hover:shadow-premium transition-all">
                                <div className="flex justify-between items-start">
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-slate-900 text-lg">{skill.name}</h3>
                                        <p className="text-sm text-purple-600 font-medium">{skill.category}</p>
                                        <p className="text-sm text-slate-600 mt-1">Proficiency: {skill.proficiency}%</p>
                                        <p className="text-xs text-slate-500 mt-1">
                                            {skill.isPublic ? '🌐 Public' : '🔒 Private'}
                                        </p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="ghost" onClick={() => editSkill(skill)} className="hover:bg-purple-50">
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => deleteSkill(skill._id)}
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
