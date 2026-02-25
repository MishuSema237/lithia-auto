'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, Quote, CheckCircle, Trash2, Edit, Loader2, X, Star } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function AdminTestimonials() {
    const { showToast } = useToast();
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingTestimonial, setEditingTestimonial] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [form, setForm] = useState({
        author: '',
        location: '',
        content: '',
        rating: 5,
        referenceVehicle: '',
        status: 'published' as 'published' | 'pending'
    });

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            const res = await fetch('/api/admin/testimonials');
            const data = await res.json();
            if (Array.isArray(data)) setTestimonials(data);
        } catch (e) {
            showToast('Failed to load testimonials', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (t?: any) => {
        if (t) {
            setEditingTestimonial(t);
            setForm({
                author: t.author,
                location: t.location,
                content: t.content,
                rating: t.rating,
                referenceVehicle: t.referenceVehicle || '',
                status: t.status
            });
        } else {
            setEditingTestimonial(null);
            setForm({
                author: '',
                location: '',
                content: '',
                rating: 5,
                referenceVehicle: '',
                status: 'published'
            });
        }
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Delete this testimonial?')) return;
        try {
            const res = await fetch(`/api/admin/testimonials/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showToast('Deleted', 'success');
                setTestimonials(prev => prev.filter(t => t._id !== id));
            }
        } catch (e) {
            showToast('Delete failed', 'error');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const url = editingTestimonial ? `/api/admin/testimonials/${editingTestimonial._id}` : '/api/admin/testimonials';
            const method = editingTestimonial ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                showToast(editingTestimonial ? 'Updated' : 'Added', 'success');
                setShowModal(false);
                fetchTestimonials();
            }
        } catch (e) {
            showToast('Operation failed', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const filtered = testimonials.filter(t =>
        t.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.content.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900">Testimonials Management</h1>
                    <p className="text-sm text-navy-600 mt-1">Review, approve, and manage consumer feedback.</p>
                </div>
                <Button variant="primary" onClick={() => handleOpenModal()}>
                    <Quote className="h-4 w-4 mr-2" />
                    Add Manual Testimonial
                </Button>
            </div>

            <Card className="shadow-none border-light-300">
                <div className="p-4 border-b border-light-200 bg-light-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search by Author or Keyword..."
                            className="w-full bg-light-100 border border-light-300 py-2.5 pl-10 pr-4 focus:outline-none focus:border-navy-500 text-sm rounded-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-navy-600">
                        <span>Total: {filtered.length}</span>
                    </div>
                </div>

                {isLoading ? (
                    <div className="py-20 flex justify-center"><Loader2 className="animate-spin h-8 w-8 text-navy-400" /></div>
                ) : (
                    <div className="divide-y divide-light-200">
                        {filtered.map((t: any) => (
                            <div key={t._id} className="p-6 hover:bg-light-50 transition-colors flex flex-col md:flex-row gap-6">
                                <div className="w-full md:w-3/4 space-y-3">
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 bg-navy-100 text-navy-700 flex items-center justify-center font-bold text-lg rounded-lg border border-navy-200 uppercase">
                                            {t.author.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-navy-900 leading-none">{t.author}</h3>
                                            <span className="text-[10px] text-navy-400 uppercase font-bold mt-1 inline-block">{t.location} • {new Date(t.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="ml-4 flex items-center text-gold-500">
                                            {Array.from({ length: t.rating }).map((_: any, i: number) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-navy-600 text-sm leading-relaxed">&quot;{t.content}&quot;</p>
                                    </div>
                                    {t.referenceVehicle && (
                                        <div className="text-[10px] font-bold text-navy-400 bg-light-200 inline-block px-2 py-1 rounded">
                                            Ref: {t.referenceVehicle}
                                        </div>
                                    )}
                                </div>

                                <div className="w-full md:w-1/4 flex flex-row md:flex-col justify-end gap-2 border-t md:border-t-0 border-light-200 pt-4 md:pt-0">
                                    <Button variant="outline" size="sm" className={`w-full justify-start ${t.status === 'published' ? 'text-green-700 border-green-700' : 'text-gold-700 border-gold-700'}`}>
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        {t.status === 'published' ? 'Published' : 'Pending'}
                                    </Button>
                                    <div className="grid grid-cols-2 gap-2 mt-auto">
                                        <Button variant="ghost" size="sm" onClick={() => handleOpenModal(t)}>
                                            <Edit className="h-4 w-4 mr-2" /> Edit
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700" onClick={() => handleDelete(t._id)}>
                                            <Trash2 className="h-4 w-4 mr-2" /> Delete
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            {/* Form Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-lg shadow-2xl animate-in zoom-in-95">
                        <div className="px-6 py-4 border-b border-light-200 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-navy-900">{editingTestimonial ? 'Edit' : 'Add'} Testimonial</h2>
                            <button onClick={() => setShowModal(false)}><X className="h-5 w-5 text-navy-400" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-navy-600 uppercase">Author</label>
                                    <input type="text" className="w-full bg-light-50 border border-light-300 p-2 text-sm rounded focus:border-gold-500 outline-none" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-navy-600 uppercase">Location</label>
                                    <input type="text" className="w-full bg-light-50 border border-light-300 p-2 text-sm rounded focus:border-gold-500 outline-none" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} />
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-navy-600 uppercase">Content</label>
                                <textarea className="w-full bg-light-50 border border-light-300 p-2 text-sm rounded focus:border-gold-500 outline-none" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={4} required />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-navy-600 uppercase">Rating (1-5)</label>
                                    <select className="w-full bg-light-50 border border-light-300 p-2 text-sm rounded focus:border-gold-500 outline-none" value={form.rating} onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })}>
                                        <option value="5">5 Stars</option>
                                        <option value="4">4 Stars</option>
                                        <option value="3">3 Stars</option>
                                        <option value="2">2 Stars</option>
                                        <option value="1">1 Star</option>
                                    </select>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-navy-600 uppercase">Vehicle Ref</label>
                                    <input type="text" className="w-full bg-light-50 border border-light-300 p-2 text-sm rounded focus:border-gold-500 outline-none" placeholder="e.g. 2023 Tesla" value={form.referenceVehicle} onChange={e => setForm({ ...form, referenceVehicle: e.target.value })} />
                                </div>
                            </div>
                            <div className="pt-4 flex gap-3">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
                                <Button type="submit" variant="primary" className="flex-1" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : editingTestimonial ? 'Update' : 'Add Testimonial'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
}
