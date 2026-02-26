'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, Mail, MapPin, Loader2, Save, ShoppingBag, Send, Car } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';

export default function AdminOrderDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const router = useRouter();
    const { showToast } = useToast();

    const [order, setOrder] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [statusUpdating, setStatusUpdating] = useState(false);
    const [replying, setReplying] = useState(false);

    const [replyData, setReplyData] = useState({
        subject: '',
        message: '',
        attachment: null as File | null
    });

    const [trackingDetails, setTrackingDetails] = useState({
        expectedProcessingDate: '',
        actualProcessingDate: '',
        expectedShippedDate: '',
        actualShippedDate: '',
        expectedDeliveredDate: '',
        actualDeliveredDate: '',
        destination: ''
    });

    // Helper to format date for input field type="date"
    const formatDateForInput = (dateStr: string) => {
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toISOString().split('T')[0];
    };

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const res = await fetch(`/api/admin/orders/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setOrder(data);
                    setReplyData(prev => ({ ...prev, subject: `Regarding Your Order ${data.orderId}` }));
                    if (data.trackingDetails) {
                        setTrackingDetails({
                            expectedProcessingDate: formatDateForInput(data.trackingDetails.expectedProcessingDate),
                            actualProcessingDate: formatDateForInput(data.trackingDetails.actualProcessingDate),
                            expectedShippedDate: formatDateForInput(data.trackingDetails.expectedShippedDate),
                            actualShippedDate: formatDateForInput(data.trackingDetails.actualShippedDate),
                            expectedDeliveredDate: formatDateForInput(data.trackingDetails.expectedDeliveredDate),
                            actualDeliveredDate: formatDateForInput(data.trackingDetails.actualDeliveredDate),
                            destination: data.trackingDetails.destination || ''
                        });
                    }
                } else {
                    router.push('/admin/orders');
                }
            } catch (e) {
                showToast('Failed to load order detailed view', 'error');
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrder();
    }, [id, router, showToast]);

    const handleStatusChange = async (newStatus: string) => {
        setStatusUpdating(true);
        try {
            const res = await fetch(`/api/admin/orders/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) {
                setOrder({ ...order, status: newStatus });
                showToast('Order status updated successfully', 'success');
            }
        } catch (e) {
            showToast('Failed to update status', 'error');
        } finally {
            setStatusUpdating(false);
        }
    };

    const handleSaveTracking = async () => {
        setStatusUpdating(true);
        try {
            const res = await fetch(`/api/admin/orders/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ trackingDetails })
            });
            if (res.ok) {
                const data = await res.json();
                setOrder(data);
                showToast('Tracking details updated successfully', 'success');
            }
        } catch (e) {
            showToast('Failed to update tracking', 'error');
        } finally {
            setStatusUpdating(false);
        }
    };

    const handleSendReply = async (e: React.FormEvent) => {
        e.preventDefault();
        setReplying(true);
        try {
            const formData = new FormData();
            formData.append('subject', replyData.subject);
            formData.append('message', replyData.message);
            if (replyData.attachment) {
                formData.append('attachment', replyData.attachment);
            }

            const res = await fetch(`/api/admin/orders/${id}/reply`, {
                method: 'POST',
                body: formData
            });
            if (res.ok) {
                showToast('Email reply sent to customer', 'success');
                setReplyData({ ...replyData, message: '', attachment: null }); // Clear message and attachment
                const fileInput = document.getElementById('attachment-input') as HTMLInputElement;
                if (fileInput) fileInput.value = '';
            } else {
                showToast('Failed to send email', 'error');
            }
        } catch (error) {
            showToast('Failed to send email', 'error');
        } finally {
            setReplying(false);
        }
    };

    if (isLoading) {
        return <div className="flex h-96 items-center justify-center"><Loader2 className="h-8 w-8 animate-spin text-gold-500" /></div>;
    }

    if (!order) return null;

    return (
        <div className="space-y-6 max-w-6xl mx-auto">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-light-300 pb-6">
                <div>
                    <Link href="/admin/orders" className="inline-flex items-center text-navy-600 hover:text-gold-500 font-bold mb-4 text-sm transition-colors">
                        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Orders
                    </Link>
                    <h1 className="text-2xl font-black text-navy-900 font-mono tracking-tight">Order #{order.orderId}</h1>
                    <p className="text-sm text-navy-600 mt-1">
                        Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold text-navy-600">Update Status:</span>
                    <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(e.target.value)}
                        disabled={statusUpdating}
                        className="bg-white border border-light-300 rounded-lg p-2 text-sm font-bold text-navy-900 focus:outline-none focus:border-gold-500 disabled:opacity-50"
                    >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Details */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Cart Items */}
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-bold text-navy-900 mb-6 flex items-center">
                                <ShoppingBag className="w-5 h-5 mr-2 text-gold-500" /> Purchased Items
                            </h3>
                            <div className="space-y-4">
                                {order.cart.map((item: any, idx: number) => (
                                    <div key={idx} className="flex flex-col md:flex-row gap-4 items-center p-4 bg-light-50 rounded-xl border border-light-200">
                                        <div className="w-20 h-16 rounded-lg overflow-hidden shrink-0 bg-white border border-light-200">
                                            {item.image ? (
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-light-400">
                                                    <Car className="w-6 h-6" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-navy-900">{item.title}</h4>
                                            <p className="text-xs text-navy-600">{item.year} • {item.mileage || '0'} miles</p>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-black text-navy-900">${item.price.toLocaleString()}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-6 pt-6 border-t border-light-200 flex justify-between items-center text-lg">
                                <span className="font-bold text-navy-600">Total Charged</span>
                                <span className="font-black text-navy-900">${order.total.toLocaleString()}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Tracking Details Editor */}
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-navy-900 flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-gold-500" /> Tracking Journey Details
                                </h3>
                                <Button onClick={handleSaveTracking} disabled={statusUpdating} variant="outline" size="sm" className="inline-flex items-center">
                                    {statusUpdating ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />} Save Tracking
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-xs font-bold text-navy-600 block mb-1">Expected Processing Date</label>
                                    <input type="date" value={trackingDetails.expectedProcessingDate} onChange={e => setTrackingDetails({ ...trackingDetails, expectedProcessingDate: e.target.value })} className="w-full bg-light-50 border border-light-300 rounded-lg p-2 text-sm focus:border-gold-500 outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-navy-600 block mb-1">Actual Processing Date</label>
                                    <input type="date" value={trackingDetails.actualProcessingDate} onChange={e => setTrackingDetails({ ...trackingDetails, actualProcessingDate: e.target.value })} className="w-full bg-light-50 border border-light-300 rounded-lg p-2 text-sm focus:border-gold-500 outline-none" />
                                </div>
                                <div className="mt-2">
                                    <label className="text-xs font-bold text-navy-600 block mb-1">Expected Shipped Date</label>
                                    <input type="date" value={trackingDetails.expectedShippedDate} onChange={e => setTrackingDetails({ ...trackingDetails, expectedShippedDate: e.target.value })} className="w-full bg-light-50 border border-light-300 rounded-lg p-2 text-sm focus:border-gold-500 outline-none" />
                                </div>
                                <div className="mt-2">
                                    <label className="text-xs font-bold text-navy-600 block mb-1">Actual Shipped Date</label>
                                    <input type="date" value={trackingDetails.actualShippedDate} onChange={e => setTrackingDetails({ ...trackingDetails, actualShippedDate: e.target.value })} className="w-full bg-light-50 border border-light-300 rounded-lg p-2 text-sm focus:border-gold-500 outline-none" />
                                </div>
                                <div className="mt-2">
                                    <label className="text-xs font-bold text-navy-600 block mb-1">Expected Delivered Date</label>
                                    <input type="date" value={trackingDetails.expectedDeliveredDate} onChange={e => setTrackingDetails({ ...trackingDetails, expectedDeliveredDate: e.target.value })} className="w-full bg-light-50 border border-light-300 rounded-lg p-2 text-sm focus:border-gold-500 outline-none" />
                                </div>
                                <div className="mt-2">
                                    <label className="text-xs font-bold text-navy-600 block mb-1">Actual Delivered Date</label>
                                    <input type="date" value={trackingDetails.actualDeliveredDate} onChange={e => setTrackingDetails({ ...trackingDetails, actualDeliveredDate: e.target.value })} className="w-full bg-light-50 border border-light-300 rounded-lg p-2 text-sm focus:border-gold-500 outline-none" />
                                </div>
                                <div className="md:col-span-2 mt-2">
                                    <label className="text-xs font-bold text-navy-600 block mb-1">Destination Info</label>
                                    <input type="text" placeholder="e.g. Beverly Hills, CA" value={trackingDetails.destination} onChange={e => setTrackingDetails({ ...trackingDetails, destination: e.target.value })} className="w-full bg-light-50 border border-light-300 rounded-lg p-2 text-sm focus:border-gold-500 outline-none" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Email Reply Thread Simulator */}
                    <Card>
                        <CardContent className="p-6">
                            <h3 className="text-lg font-bold text-navy-900 mb-6 flex items-center">
                                <Mail className="w-5 h-5 mr-2 text-gold-500" /> Email Customer Directly
                            </h3>
                            <form onSubmit={handleSendReply} className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-navy-600 uppercase mb-1 block">Subject</label>
                                    <input
                                        type="text"
                                        value={replyData.subject}
                                        onChange={e => setReplyData({ ...replyData, subject: e.target.value })}
                                        className="w-full bg-light-50 border border-light-300 rounded-lg p-3 text-sm focus:border-gold-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-navy-600 uppercase mb-1 block">Message</label>
                                    <textarea
                                        value={replyData.message}
                                        onChange={e => setReplyData({ ...replyData, message: e.target.value })}
                                        rows={5}
                                        placeholder={`Hi ${order.firstName},\n\nRegarding your recent order...`}
                                        className="w-full bg-light-50 border border-light-300 rounded-lg p-3 text-sm focus:border-gold-500 outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-navy-600 uppercase mb-1 block">Attachment (File/Image)</label>
                                    <input
                                        id="attachment-input"
                                        type="file"
                                        onChange={e => setReplyData({ ...replyData, attachment: e.target.files ? e.target.files[0] : null })}
                                        className="w-full bg-light-50 border border-light-300 rounded-lg p-2 text-sm focus:border-gold-500 outline-none"
                                    />
                                </div>
                                <div className="text-right">
                                    <Button type="submit" disabled={replying} variant="primary" className="inline-flex items-center gap-2">
                                        {replying ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                                        Send Reply Email
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Customer Info */}
                <div className="space-y-6">
                    <Card>
                        <CardContent className="p-6 space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-3">Customer Information</h3>
                                <div className="space-y-2">
                                    <div className="font-bold text-navy-900 text-lg">{order.firstName} {order.lastName}</div>
                                    <a href={`mailto:${order.email}`} className="text-sm text-gold-600 hover:underline block">{order.email}</a>
                                    <a href={`tel:${order.phone}`} className="text-sm text-navy-600 hover:text-gold-600 transition-colors block">{order.phone}</a>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-light-200">
                                <h3 className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-3">Shipping Address</h3>
                                <div className="flex gap-3 text-sm text-navy-700 leading-relaxed">
                                    <MapPin className="w-4 h-4 text-light-400 shrink-0 mt-0.5" />
                                    <div>
                                        {order.address}<br />
                                        {order.city}, {order.state} {order.zipCode}<br />
                                        {order.country}
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-light-200">
                                <h3 className="text-xs font-bold text-navy-400 uppercase tracking-widest mb-3">Payment Method</h3>
                                <div className="text-sm font-bold text-navy-900 bg-light-50 px-4 py-3 rounded-lg border border-light-200">
                                    {order.paymentMethod.replace('_', ' ').toUpperCase()}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
