'use client';

import React, { useState, useEffect } from 'react';
import { Eye, Search, Loader2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';

export default function AdminOrdersPage() {
    const { showToast } = useToast();
    const [orders, setOrders] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch('/api/admin/orders');
                const data = await res.json();
                if (Array.isArray(data)) setOrders(data);
            } catch (e) {
                showToast('Failed to load orders', 'error');
            } finally {
                setIsLoading(false);
            }
        };
        fetchOrders();
    }, [showToast]);

    const filtered = orders.filter(order =>
        order.orderId.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.lastName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-800';
            case 'Processing': return 'bg-blue-100 text-blue-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-yellow-100 text-yellow-800';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900">Orders</h1>
                    <p className="text-navy-600 mt-1">Manage all incoming vehicle and part orders.</p>
                </div>
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-light-300 rounded-lg focus:outline-none focus:border-gold-500 text-sm"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-light-400" />
                </div>
            </div>

            <Card>
                <CardContent className="p-0">
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-light-50 border-b border-light-200">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-navy-600 uppercase tracking-wider">Order ID</th>
                                    <th className="px-6 py-4 text-xs font-bold text-navy-600 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-navy-600 uppercase tracking-wider">Customer</th>
                                    <th className="px-6 py-4 text-xs font-bold text-navy-600 uppercase tracking-wider">Total</th>
                                    <th className="px-6 py-4 text-xs font-bold text-navy-600 uppercase tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-bold text-navy-600 uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-light-200">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-navy-400">
                                            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gold-500" />
                                            Loading orders...
                                        </td>
                                    </tr>
                                ) : filtered.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-navy-400">
                                            No orders found matching your search.
                                        </td>
                                    </tr>
                                ) : (
                                    filtered.map((order) => (
                                        <tr key={order._id} className="hover:bg-light-50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-navy-900 font-mono text-sm">{order.orderId}</td>
                                            <td className="px-6 py-4 text-sm text-navy-600">
                                                {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-navy-900 text-sm">{order.firstName} {order.lastName}</div>
                                                <div className="text-xs text-navy-600">{order.email}</div>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-navy-900 text-sm">${order.total.toLocaleString()}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(order.status)}`}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <Link href={`/admin/orders/${order._id}`} className="inline-flex items-center justify-center p-2 text-navy-400 hover:text-gold-500 hover:bg-gold-50 rounded-lg transition-colors">
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden divide-y divide-light-200">
                        {isLoading ? (
                            <div className="p-8 text-center text-navy-400">
                                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-gold-500" />
                                Loading orders...
                            </div>
                        ) : filtered.length === 0 ? (
                            <div className="p-8 text-center text-navy-400">
                                No orders found matching your search.
                            </div>
                        ) : (
                            filtered.map((order) => (
                                <div key={order._id} className="p-4 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <div className="font-bold text-navy-900 font-mono text-sm">{order.orderId}</div>
                                        <span className={`px-2.5 py-1 text-[10px] font-bold rounded-full ${getStatusColor(order.status)}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div>
                                        <div className="font-bold text-navy-900 text-sm">{order.firstName} {order.lastName}</div>
                                        <div className="text-xs text-navy-600">{order.email}</div>
                                    </div>
                                    <div className="flex justify-between items-center pt-2 border-t border-light-100">
                                        <div className="text-xs text-navy-400">
                                            {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </div>
                                        <div className="font-bold text-navy-900 text-sm">${order.total.toLocaleString()}</div>
                                    </div>
                                    <Link href={`/admin/orders/${order._id}`} className="mt-2 w-full flex items-center justify-center gap-2 bg-light-100 text-navy-700 py-2 rounded-lg text-sm font-bold hover:bg-light-200 transition-colors">
                                        <Eye className="w-4 h-4" /> View Order
                                    </Link>
                                </div>
                            ))
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
