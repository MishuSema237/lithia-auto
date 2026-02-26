'use client';

import React from 'react';
import { StaticPageWrapper } from '@/components/ui/StaticPageWrapper';
import { Shield, Scale, FileText, Lock, Globe, AlertCircle } from 'lucide-react';

export default function TermsPage() {
    const sections = [
        {
            title: '1. Acceptance of Terms',
            icon: <Globe className="w-6 h-6 text-gold-500" />,
            content: 'By accessing and using LithiaAuto.com, you agree to be bound by these Terms and Conditions and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.'
        },
        {
            title: '2. Luxury Vehicle Sales',
            icon: <Scale className="w-6 h-6 text-gold-500" />,
            content: 'All sales conducted through LithiaAuto are subject to final inspection and documentation verification. We reserve the right to refuse service or cancel orders at our discretion, particularly in cases of suspected fraud or pricing errors.'
        },
        {
            title: '3. Intellectual Property',
            icon: <FileText className="w-6 h-6 text-gold-500" />,
            content: 'The materials contained in this website are protected by applicable copyright and trademark law. Use of any content for commercial purposes without explicit written consent is strictly prohibited.'
        },
        {
            title: '4. Limitation of Liability',
            icon: <AlertCircle className="w-6 h-6 text-gold-500" />,
            content: 'In no event shall Lithia Auto or its partners be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our platform.'
        }
    ];

    return (
        <div className="bg-white min-h-screen font-sans pb-24">
            {/* Cinematic Header */}
            <section className="bg-navy-900 py-24 text-center relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-0 w-64 h-64 bg-gold-500 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold-500 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
                </div>
                <div className="relative z-10 container mx-auto px-4">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Terms & <span className="text-gold-500">Conditions</span></h1>
                    <p className="text-navy-200 max-w-2xl mx-auto">Last Updated: February 21, 2026</p>
                </div>
            </section>

            {/* Content Sections */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="space-y-12">
                        {sections.map((section, i) => (
                            <div key={i} className="flex gap-6 group">
                                <div className="shrink-0 w-14 h-14 bg-navy-50 rounded-2xl flex items-center justify-center group-hover:bg-gold-500 group-hover:text-navy-900 transition-all duration-300">
                                    {section.icon}
                                </div>
                                <div className="pt-2">
                                    <h3 className="text-2xl font-black text-navy-900 mb-4">{section.title}</h3>
                                    <p className="text-gray-600 leading-relaxed text-lg">
                                        {section.content}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 p-8 bg-light-50 rounded-3xl border border-light-200">
                        <div className="flex items-start gap-4">
                            <Shield className="w-6 h-6 text-gold-600 shrink-0 mt-1" />
                            <div>
                                <h4 className="font-bold text-navy-900 mb-2">Notice to International Buyers</h4>
                                <p className="text-navy-600 text-sm leading-relaxed">
                                    Additional terms apply for vehicles shipped outside the European Union or North America. Please consult our logistics team for specific regulatory requirements regarding your jurisdiction.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
