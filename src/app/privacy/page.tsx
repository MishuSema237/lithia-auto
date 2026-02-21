'use client';

import React from 'react';
import { Lock, Eye, Database, ShieldCheck, Bell, UserCheck } from 'lucide-react';

export default function PrivacyPage() {
    const policies = [
        {
            title: 'Data Collection',
            icon: <Database className="w-6 h-6" />,
            desc: 'We collect only essential information required to process your car orders and provide a personalized experience. This includes contact details, preference data, and transactional information.'
        },
        {
            title: 'Privacy Protection',
            icon: <Lock className="w-6 h-6" />,
            desc: 'Your data is encrypted using 256-bit AES encryption and stored on secure servers with limited access. We never sell your personal information to third parties.'
        },
        {
            title: 'Usage Transparency',
            icon: <Eye className="w-6 h-6" />,
            desc: 'We use your data to improve our inventory recommendations, process payments securely, and notify you of important updates regarding your vehicle purchase.'
        },
        {
            title: 'Your Rights',
            icon: <UserCheck className="w-6 h-6" />,
            desc: 'You have the right to access, correct, or delete your personal data at any time. Simply contact our privacy officer through the help center.'
        }
    ];

    return (
        <div className="bg-white min-h-screen font-sans pb-24">
            {/* Header */}
            <section className="bg-navy-50 py-24">
                <div className="container mx-auto px-4 text-center">
                    <div className="inline-flex items-center gap-2 bg-gold-500/10 text-gold-600 px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-6">
                        <ShieldCheck className="w-4 h-4" /> Secure & Private
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-navy-900 mb-6 tracking-tight">Privacy <span className="text-gold-500">Policy</span></h1>
                    <p className="text-navy-500 max-w-2xl mx-auto text-lg leading-relaxed">
                        At Lithia Auto, we value your trust above all else. This policy outlines our commitment to protecting your personal information and ensuring a secure car buying journey.
                    </p>
                </div>
            </section>

            {/* Policy Grid */}
            <section className="py-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {policies.map((policy, i) => (
                            <div key={i} className="bg-white p-10 rounded-3xl border border-light-200 hover:border-gold-500/50 hover:shadow-xl transition-all duration-300 group">
                                <div className="w-14 h-14 bg-navy-900 text-gold-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                    {policy.icon}
                                </div>
                                <h3 className="text-2xl font-black text-navy-900 mb-4">{policy.title}</h3>
                                <p className="text-navy-500 leading-relaxed">
                                    {policy.desc}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-16 bg-navy-900 rounded-3xl p-10 text-white relative overflow-hidden">
                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                            <div className="shrink-0 w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center text-navy-900">
                                <Bell className="w-10 h-10" />
                            </div>
                            <div>
                                <h4 className="text-2xl font-black mb-2">Policy Updates</h4>
                                <p className="text-navy-200 leading-relaxed">
                                    We may update this policy periodically to reflect changes in our practices or legal requirements. We will notify you of any significant changes via email or a prominent notice on our website.
                                </p>
                            </div>
                        </div>
                        {/* Abstract background shapes */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                    </div>
                </div>
            </section>
        </div>
    );
}
