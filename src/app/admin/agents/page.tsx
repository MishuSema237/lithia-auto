'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, Users, Trash2, Edit, Loader2, Plus, UserCircle } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminAgents() {
    const { showToast } = useToast();
    const router = useRouter();
    const [agents, setAgents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchAgents();
    }, []);

    const fetchAgents = async () => {
        try {
            const res = await fetch('/api/admin/agents');
            const data = await res.json();
            if (Array.isArray(data)) setAgents(data);
        } catch (e) {
            showToast('Failed to load agents', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this agent profile? This will also remove their photo from Cloudinary if it was an upload.')) return;
        try {
            const res = await fetch(`/api/admin/agents/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showToast('Agent deleted', 'success');
                setAgents(prev => prev.filter(a => a._id !== id));
            }
        } catch (e) {
            showToast('Delete failed', 'error');
        }
    };

    const filtered = agents.filter(a =>
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900">Agents Management</h1>
                    <p className="text-sm text-navy-600 mt-1">Manage the &quot;Meet Our Agents&quot; section on the About page.</p>
                </div>
                <Link href="/admin/agents/new">
                    <Button variant="primary">
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Agent
                    </Button>
                </Link>
            </div>

            <Card className="shadow-none border-light-300">
                <div className="p-4 border-b border-light-200 bg-light-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search by name or role..."
                            className="w-full bg-light-100 border border-light-300 py-2.5 pl-10 pr-4 focus:outline-none focus:border-navy-500 text-sm rounded-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-navy-600">
                        <span>Total Agents: {filtered.length}</span>
                    </div>
                </div>

                {isLoading ? (
                    <div className="py-20 flex justify-center"><Loader2 className="animate-spin h-8 w-8 text-navy-400" /></div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                        {filtered.length === 0 ? (
                            <div className="col-span-full py-20 text-center text-navy-400">
                                <UserCircle className="h-12 w-12 mx-auto mb-2 opacity-20" />
                                <p>No agents found. Add your first agent to get started.</p>
                            </div>
                        ) : (
                            filtered.map((agent: any) => (
                                <div key={agent._id} className="bg-white border border-light-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group">
                                    <div className="aspect-[4/5] relative overflow-hidden">
                                        <img 
                                            src={agent.image} 
                                            alt={agent.name} 
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                        <div className="absolute bottom-4 left-4 right-4 flex gap-2 translate-y-4 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100">
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white hover:text-navy-900 text-xs"
                                                onClick={() => router.push(`/admin/agents/edit/${agent._id}`)}
                                            >
                                                <Edit className="h-3 w-3 mr-1" /> Edit
                                            </Button>
                                            <Button 
                                                variant="outline" 
                                                size="sm" 
                                                className="flex-1 bg-red-500/10 border-red-500/20 text-red-400 hover:bg-red-500 hover:text-white text-xs"
                                                onClick={() => handleDelete(agent._id)}
                                            >
                                                <Trash2 className="h-3 w-3 mr-1" /> Delete
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="p-4 text-center">
                                        <h3 className="font-bold text-navy-900 text-lg leading-tight">{agent.name}</h3>
                                        <p className="text-sm text-navy-600 mt-1">{agent.role}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </Card>
        </div>
    );
}
