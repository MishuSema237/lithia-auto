'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, LayoutDashboard, List, MessageSquare, LogOut, FileText } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-light-200">

            {/* Sidebar Navigation */}
            <aside className="w-64 bg-navy-900 text-light-100 flex-shrink-0 flex flex-col">
                <div className="h-16 flex items-center px-6 border-b border-navy-800">
                    <Link href="/admin" className="flex items-center gap-2">
                        <Car className="h-6 w-6 text-gold-500" />
                        <span className="font-bold text-lg tracking-tight text-light-50">
                            LITHIA <span className="text-gold-500">ADMIN</span>
                        </span>
                    </Link>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-2">
                    <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-navy-200 hover:text-light-50 hover:bg-navy-800 transition-colors">
                        <LayoutDashboard className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link href="/admin/inventory" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-navy-200 hover:text-light-50 hover:bg-navy-800 transition-colors">
                        <List className="h-5 w-5" />
                        Inventory & Specs
                    </Link>
                    <Link href="/admin/testimonials" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors ${pathname === '/admin/testimonials' ? 'text-gold-400 bg-navy-800' : 'text-navy-200 hover:text-light-50 hover:bg-navy-800'}`}>
                        <MessageSquare className="h-5 w-5" />
                        Testimonials
                    </Link>
                    <Link href="/admin/reviews" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors ${pathname === '/admin/reviews' ? 'text-gold-400 bg-navy-800' : 'text-navy-200 hover:text-light-50 hover:bg-navy-800'}`}>
                        <Car className="h-5 w-5" />
                        Vehicle Reviews
                    </Link>
                    <Link href="/admin/blog" className={`flex items-center gap-3 px-3 py-2 text-sm font-medium transition-colors ${pathname === '/admin/blog' ? 'text-gold-400 bg-navy-800' : 'text-navy-200 hover:text-light-50 hover:bg-navy-800'}`}>
                        <FileText className="h-5 w-5" />
                        Blog Posts
                    </Link>
                </nav>

                <div className="p-4 border-t border-navy-800">
                    <Link href="/" className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-navy-300 hover:text-gold-500 transition-colors">
                        <LogOut className="h-5 w-5" />
                        Exit Admin
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-16 bg-light-50 border-b border-light-300 flex items-center justify-between px-8">
                    <h2 className="text-lg font-semibold text-navy-800">Admin Portal</h2>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-navy-600 font-medium">Logged in as Administrator</span>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8 bg-light-100">
                    {children}
                </div>
            </main>

        </div>
    );
}
