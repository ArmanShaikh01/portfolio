'use client';

import { useState, useEffect } from 'react';
import Button from '@/components/ui/Button';
import AdminPageWrapper from '@/components/AdminPageWrapper';

export default function AdminMessagesPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        try {
            const response = await fetch('/api/messages');
            const data = await response.json();
            if (data.success) {
                setMessages(data.data);
            }
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleRead = async (id: string, isRead: boolean) => {
        try {
            const response = await fetch(`/api/messages/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isRead: !isRead }),
            });

            if (response.ok) {
                fetchMessages();
            }
        } catch (error) {
            console.error('Error updating message:', error);
        }
    };

    const deleteMessage = async (id: string) => {
        if (!confirm('Are you sure you want to delete this message?')) return;

        try {
            const response = await fetch(`/api/messages/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchMessages();
            }
        } catch (error) {
            console.error('Error deleting message:', error);
        }
    };

    if (loading) {
        return (
            <AdminPageWrapper title="Messages">
                <div className="text-slate-600">Loading...</div>
            </AdminPageWrapper>
        );
    }

    return (
        <AdminPageWrapper title="Messages" description="View and manage contact messages">
            <div className="space-y-4">
                {messages.length === 0 ? (
                    <div className="bg-white border-2 border-purple-200 rounded-2xl p-12 text-center">
                        <div className="text-6xl mb-4">📬</div>
                        <p className="text-slate-600 text-lg">No messages yet.</p>
                        <p className="text-slate-500 text-sm mt-2">Messages from your contact form will appear here</p>
                    </div>
                ) : (
                    messages.map((message) => (
                        <div
                            key={message._id}
                            className={`bg-white border-2 rounded-2xl p-6 shadow-lg hover:shadow-premium transition-all ${message.isRead ? 'border-purple-200' : 'border-indigo-400 bg-indigo-50/30'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex-grow">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-xl font-bold text-slate-900">{message.subject}</h3>
                                        {!message.isRead && (
                                            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                NEW
                                            </span>
                                        )}
                                    </div>
                                    <p className="text-sm text-slate-600 font-medium">
                                        From: {message.name} ({message.email})
                                    </p>
                                    <p className="text-xs text-slate-500 mt-1">
                                        {new Date(message.createdAt).toLocaleString()}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => toggleRead(message._id, message.isRead)}
                                        className="hover:bg-purple-50"
                                    >
                                        {message.isRead ? 'Mark Unread' : 'Mark Read'}
                                    </Button>
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() => deleteMessage(message._id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            </div>
                            <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                                <p className="text-slate-700 whitespace-pre-wrap">{message.message}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </AdminPageWrapper>
    );
}
