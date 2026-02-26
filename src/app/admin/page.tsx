'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Car, MessageSquare, PlusCircle, FileText, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        inventory: 0,
        testimonials: 0,
        blogs: 0
    });
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const res = await fetch('/api/admin/stats');
                if (res.ok) {
                    const data = await res.json();
                    setStats(data);
                }
            } catch (error) {
                console.error('Failed to fetch dashboard stats:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        {
            label: 'Total Inventory',
            value: stats.inventory,
            icon: <Car className="h-8 w-8 text-navy-700" />,
            bgColor: 'bg-navy-100'
        },
        {
            label: 'Testimonials',
            value: stats.testimonials,
            icon: <MessageSquare className="h-8 w-8 text-gold-600" />,
            bgColor: 'bg-gold-50'
        },
        {
            label: 'Blog Posts',
            value: stats.blogs,
            icon: <FileText className="h-8 w-8 text-navy-700" />,
            bgColor: 'bg-navy-100'
        }
    ];

    return (
        <div className="max-w-6xl mx-auto space-y-8">

            <div className="flex flex-col sm:flex-row justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900">Dashboard Overview</h1>
                    <p className="text-navy-600 text-sm mt-1">Manage your car inventory and customer testimonials.</p>
                </div>
                <div className="flex gap-4 mt-4 sm:mt-0">
                    <Link href="/admin/inventory/new">
                        <Button variant="primary">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add New Car
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {statCards.map((card, index) => (
                    <Card key={index} className="shadow-none border-light-300">
                        <CardContent className="p-6 flex items-center gap-4">
                            <div className={`${card.bgColor} p-4 shrink-0`}>
                                {card.icon}
                            </div>
                            <div>
                                <p className="text-sm font-medium text-navy-600 uppercase tracking-wider">{card.label}</p>
                                {isLoading ? (
                                    <div className="flex items-center gap-2">
                                        <Loader2 className="h-4 w-4 animate-spin text-navy-400" />
                                        <span className="text-navy-400 text-sm italic">Loading...</span>
                                    </div>
                                ) : (
                                    <p className="text-3xl font-bold text-navy-900">{card.value}</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="mt-8">
                <h2 className="text-lg font-bold text-navy-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/admin/inventory" className="block p-6 bg-light-50 border border-light-300 hover:border-navy-400 transition-colors">
                        <h3 className="font-semibold text-navy-900 mb-1">Manage Fleet</h3>
                        <p className="text-sm text-navy-600">View, edit, or delete existing car listings.</p>
                    </Link>
                    <Link href="/admin/testimonials" className="block p-6 bg-light-50 border border-light-300 hover:border-navy-400 transition-colors">
                        <h3 className="font-semibold text-navy-900 mb-1">Review Testimonials</h3>
                        <p className="text-sm text-navy-600">Approve and manage customer feedback.</p>
                    </Link>
                    <Link href="/admin/blog" className="block p-6 bg-light-50 border border-light-300 hover:border-navy-400 transition-colors">
                        <h3 className="font-semibold text-navy-900 mb-1">Manage Blog</h3>
                        <p className="text-sm text-navy-600">Write, edit, and publish new blog articles.</p>
                    </Link>
                </div>
            </div>

        </div>
    );
}
