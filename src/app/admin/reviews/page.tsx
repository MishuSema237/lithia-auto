'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, Quote, CheckCircle, Trash2, Edit, Loader2, X, Star, Car as CarIcon, MessageSquarePlus } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

export default function AdminReviewsPage() {
    const { showToast } = useToast();
    const [reviews, setReviews] = useState<any[]>([]);
    const [cars, setCars] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingReview, setEditingReview] = useState<any>(null);
    const [searchQuery, setSearchQuery] = useState('');

    const [form, setForm] = useState({
        carId: '',
        author: '',
        rating: 5,
        title: '',
        body: ''
    });

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const [revRes, carRes] = await Promise.all([
                fetch('/api/admin/reviews'),
                fetch('/api/admin/inventory')
            ]);
            const revData = await revRes.json();
            const carData = await carRes.json();
            if (Array.isArray(revData)) setReviews(revData);
            if (Array.isArray(carData)) setCars(carData);
        } catch (e) {
            showToast('Failed to load data', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleOpenModal = (r?: any) => {
        if (r) {
            setEditingReview(r);
            setForm({
                carId: r.carId,
                author: r.author,
                rating: r.rating,
                title: r.title || '',
                body: r.body
            });
        } else {
            setEditingReview(null);
            setForm({
                carId: '',
                author: '',
                rating: 5,
                title: '',
                body: ''
            });
        }
        setShowModal(true);
    };

    const handleDelete = async (reviewId: string, carId: string) => {
        if (!confirm('Delete this review?')) return;
        try {
            const res = await fetch(`/api/admin/reviews/${reviewId}?carId=${carId}`, { method: 'DELETE' });
            if (res.ok) {
                showToast('Deleted', 'success');
                setReviews(prev => prev.filter(r => r._id !== reviewId));
            }
        } catch (e) {
            showToast('Delete failed', 'error');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const url = editingReview ? `/api/admin/reviews/${editingReview._id}` : '/api/admin/reviews';
            const method = editingReview ? 'PUT' : 'POST';
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                showToast(editingReview ? 'Updated' : 'Added', 'success');
                setShowModal(false);
                fetchData();
            } else {
                const err = await res.json();
                showToast(err.error || 'Failed', 'error');
            }
        } catch (e) {
            showToast('Operation failed', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const filtered = reviews.filter(r =>
        r.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.carName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.body.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900">Vehicle Reviews Manager</h1>
                    <p className="text-sm text-navy-500 mt-1">Manage reviews specifically attached to inventory vehicles.</p>
                </div>
                <Button variant="primary" onClick={() => handleOpenModal()}>
                    <MessageSquarePlus className="h-4 w-4 mr-2" />
                    Attach New Review
                </Button>
            </div>

            <Card className="shadow-none border-light-300">
                <div className="p-4 border-b border-light-200 bg-light-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search by Author, Car, or Content..."
                            className="w-full bg-light-100 border border-light-300 py-2.5 pl-10 pr-4 focus:outline-none focus:border-navy-500 text-sm rounded-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
                    </div>
                </div>

                {isLoading ? (
                    <div className="py-20 flex justify-center"><Loader2 className="animate-spin h-8 w-8 text-navy-400" /></div>
                ) : (
                    <div className="divide-y divide-light-200">
                        {filtered.length === 0 ? (
                            <div className="py-20 text-center text-navy-400 italic">No reviews found.</div>
                        ) : filtered.map((r) => (
                            <div key={r._id} className="p-6 hover:bg-light-50 transition-colors flex flex-col md:flex-row gap-6">
                                <div className="flex-1 space-y-3">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <div className="flex items-center gap-2 text-gold-600 font-bold text-[10px] uppercase tracking-widest mb-1">
                                                <CarIcon className="h-3 w-3" /> {r.carName}
                                            </div>
                                            <h3 className="font-bold text-navy-900">{r.title || 'Review by ' + r.author}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="flex text-gold-500">
                                                    {Array.from({ length: r.rating }).map((_, i) => <Star key={i} className="w-3 h-3 fill-current" />)}
                                                </div>
                                                <span className="text-[10px] text-navy-400 font-bold uppercase">{r.author} • {new Date(r.date).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-navy-600 text-sm leading-relaxed italic">&quot;{r.body}&quot;</p>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" onClick={() => handleOpenModal(r)}>
                                        <Edit className="h-4 w-4" />
                                    </Button>
                                    <Button variant="ghost" size="sm" className="text-red-600 hover:bg-red-50" onClick={() => handleDelete(r._id, r.carId)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </Card>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-lg shadow-2xl animate-in zoom-in-95">
                        <div className="px-6 py-4 border-b border-light-200 flex justify-between items-center">
                            <h2 className="text-lg font-bold text-navy-900">{editingReview ? 'Edit' : 'Attach'} Car Review</h2>
                            <button onClick={() => setShowModal(false)}><X className="h-5 w-5 text-navy-400" /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            {!editingReview && (
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-navy-600 uppercase">Select Vehicle *</label>
                                    <select className="w-full bg-light-50 border border-light-300 p-2 text-sm rounded outline-none" value={form.carId} onChange={e => setForm({ ...form, carId: e.target.value })} required>
                                        <option value="">-- Choose Car --</option>
                                        {cars.map(c => (
                                            <option key={c._id} value={c._id}>{c.year} {c.make} {c.carModel}</option>
                                        ))}
                                    </select>
                                </div>
                            )}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-navy-600 uppercase">Reviewer Name</label>
                                    <input type="text" className="w-full bg-light-50 border border-light-300 p-2 text-sm rounded outline-none" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} required />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-navy-600 uppercase">Rating (1-5)</label>
                                    <select className="w-full bg-light-50 border border-light-300 p-2 text-sm rounded outline-none" value={form.rating} onChange={e => setForm({ ...form, rating: parseInt(e.target.value) })}>
                                        {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{n} Stars</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-navy-600 uppercase">Review Title</label>
                                <input type="text" className="w-full bg-light-50 border border-light-300 p-2 text-sm rounded outline-none" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs font-bold text-navy-600 uppercase">Review Body</label>
                                <textarea className="w-full bg-light-50 border border-light-300 p-2 text-sm rounded outline-none" value={form.body} onChange={e => setForm({ ...form, body: e.target.value })} rows={4} required />
                            </div>
                            <div className="pt-4 flex gap-3">
                                <Button type="button" variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Cancel</Button>
                                <Button type="submit" variant="primary" className="flex-1" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="animate-spin h-4 w-4" /> : editingReview ? 'Update' : 'Attach Review'}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            )}
        </div>
    );
}
