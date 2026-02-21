'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface StaticPageWrapperProps {
    title: string;
    subtitle?: string;
    children: React.ReactNode;
}

export function StaticPageWrapper({ title, subtitle, children }: StaticPageWrapperProps) {
    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Page Hero */}
            <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-navy-900">
                    <img
                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000"
                        alt="Background"
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent"></div>
                </div>

                <div className="relative z-10 text-center px-4">
                    <div className="flex items-center justify-center gap-2 text-gold-500 text-sm font-bold uppercase tracking-[0.2em] mb-4">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span>{title}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
                        {title}
                    </h1>
                    {subtitle && <p className="text-navy-200 text-lg max-w-2xl mx-auto leading-relaxed">{subtitle}</p>}
                </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="max-w-4xl mx-auto prose prose-navy prose-lg">
                    {children}
                </div>
            </div>
        </div>
    );
}
