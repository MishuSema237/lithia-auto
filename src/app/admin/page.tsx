import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Car, MessageSquare, PlusCircle, FileText } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function AdminDashboard() {
    return (
        <div className="max-w-6xl mx-auto space-y-8">

            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900">Dashboard Overview</h1>
                    <p className="text-navy-500 text-sm mt-1">Manage your car inventory and customer testimonials.</p>
                </div>
                <div className="flex gap-4">
                    <Link href="/admin/inventory/new">
                        <Button variant="primary">
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add New Car
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <Card className="shadow-none border-light-300">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="bg-navy-100 p-4 shrink-0">
                            <Car className="h-8 w-8 text-navy-700" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-navy-500 uppercase tracking-wider">Total Inventory</p>
                            <p className="text-3xl font-extrabold text-navy-900">124</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-none border-light-300">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="bg-gold-50 p-4 shrink-0">
                            <MessageSquare className="h-8 w-8 text-gold-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-navy-500 uppercase tracking-wider">Testimonials</p>
                            <p className="text-3xl font-extrabold text-navy-900">32</p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="shadow-none border-light-300">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="bg-navy-100 p-4 shrink-0">
                            <FileText className="h-8 w-8 text-navy-700" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-navy-500 uppercase tracking-wider">Blog Posts</p>
                            <p className="text-3xl font-extrabold text-navy-900">8</p>
                        </div>
                    </CardContent>
                </Card>

            </div>

            <div className="mt-8">
                <h2 className="text-lg font-bold text-navy-800 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/admin/inventory" className="block p-6 bg-light-50 border border-light-300 hover:border-navy-400 transition-colors">
                        <h3 className="font-semibold text-navy-900 mb-1">Manage Fleet</h3>
                        <p className="text-sm text-navy-500">View, edit, or delete existing car listings.</p>
                    </Link>
                    <Link href="/admin/testimonials" className="block p-6 bg-light-50 border border-light-300 hover:border-navy-400 transition-colors">
                        <h3 className="font-semibold text-navy-900 mb-1">Review Testimonials</h3>
                        <p className="text-sm text-navy-500">Approve and manage customer feedback.</p>
                    </Link>
                    <Link href="/admin/blog" className="block p-6 bg-light-50 border border-light-300 hover:border-navy-400 transition-colors">
                        <h3 className="font-semibold text-navy-900 mb-1">Manage Blog</h3>
                        <p className="text-sm text-navy-500">Write, edit, and publish new blog articles.</p>
                    </Link>
                </div>
            </div>

        </div>
    );
}
