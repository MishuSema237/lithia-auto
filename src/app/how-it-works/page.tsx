'use client';

import React from 'react';
import { Search, ShieldCheck, Wallet, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function HowItWorksPage() {
    const steps = [
        {
            title: 'Browse & Selection',
            desc: 'Explore our curated inventory of premium vehicles. Use advanced filters to find the exact match for your lifestyle.',
            icon: <Search className="w-10 h-10" />,
            color: 'bg-gold-500'
        },
        {
            title: 'Secure Transaction',
            desc: 'Complete your purchase with integrated secure payment methods including bank transfer and cryptocurrency.',
            icon: <Wallet className="w-10 h-10" />,
            color: 'bg-navy-900',
            iconColor: 'text-gold-500'
        },
        {
            title: 'Quality Inspection',
            desc: 'Every vehicle undergoes a rigorous 200-point inspection by certified experts before handover.',
            icon: <ShieldCheck className="w-10 h-10" />,
            color: 'bg-gold-500'
        },
        {
            title: 'Premium Handover',
            desc: 'Receive your premium vehicle delivered directly to your doorstep with our white-glove concierge service.',
            icon: <Trophy className="w-10 h-10" />,
            color: 'bg-navy-900',
            iconColor: 'text-gold-500'
        }
    ];

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Cinematic Hero */}
            <section className="relative h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-navy-900">
                    <img
                        src="https://images.unsplash.com/photo-1542362567-b052ed97f53f?auto=format&fit=crop&q=80&w=2000"
                        alt="Process background"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/40 to-transparent"></div>
                </div>
                <div className="relative z-10 container mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        Seamlessly finding your <br /><span className="text-gold-500">Perfect Match</span>
                    </h1>
                    <p className="text-navy-100 text-xl max-w-2xl mx-auto leading-relaxed">
                        A transparent, secure, and premium car buying experience designed for the modern connoisseur.
                    </p>
                </div>
            </section>

            {/* Stepped Process */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                        {steps.map((step, i) => (
                            <div key={i} className="group relative">
                                <div className={`${step.color} w-20 h-20 rounded-3xl flex items-center justify-center ${step.iconColor || 'text-navy-900'} mb-8 shadow-xl transform group-hover:rotate-6 transition-transform duration-300`}>
                                    {step.icon}
                                </div>
                                <div className="absolute top-10 right-0 text-7xl font-black text-navy-50 opacity-10 select-none">
                                    0{i + 1}
                                </div>
                                <h3 className="text-2xl font-black text-navy-900 mb-4">{step.title}</h3>
                                <p className="text-navy-500 leading-relaxed mb-6">
                                    {step.desc}
                                </p>
                                <div className="flex items-center gap-2 text-gold-600 font-bold text-sm">
                                    <CheckCircle2 className="w-4 h-4" /> Comprehensive Protection
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden lg:block absolute top-[140px] left-0 w-full h-px bg-gradient-to-r from-transparent via-light-200 to-transparent -z-10"></div>
                </div>
            </section>

            {/* Detailed Feature Breakdown */}
            <section className="py-24 bg-light-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="w-full lg:w-1/2">
                            <h2 className="text-4xl font-black text-navy-900 mb-8">Why our process <span className="text-gold-500">stands out</span></h2>
                            <div className="space-y-6">
                                {[
                                    { t: 'Verified Vehicle History', d: 'Every car comes with a complete history report and verified ownership documents.' },
                                    { t: 'Secure Escape Escrow', d: 'Your funds are held securely until the vehicle passes the final inspection and transfer.' },
                                    { t: 'Global Logistics Network', d: 'We handle all customs, shipping, and registration details for international buyers.' }
                                ].map((feature, i) => (
                                    <div key={i} className="flex gap-4 p-6 bg-white rounded-2xl shadow-sm border border-light-200">
                                        <div className="w-6 h-6 rounded-full bg-gold-500 flex-shrink-0 mt-1"></div>
                                        <div>
                                            <h4 className="font-bold text-navy-900 mb-1">{feature.t}</h4>
                                            <p className="text-sm text-navy-500">{feature.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=800"
                                    className="w-full h-[500px] object-cover"
                                    alt="Luxury car showcase"
                                />
                                <div className="absolute inset-0 bg-navy-900/20"></div>
                                <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md p-6 rounded-2xl">
                                    <p className="text-navy-900 font-bold text-lg italic">
                                        "The transition from browsing to owning was seamless. Lithia Auto handles every detail with extreme professionalism."
                                    </p>
                                    <p className="text-gold-600 text-sm mt-2 font-bold">— Satisfied Owner</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 bg-navy-900 text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl md:text-5xl font-black text-white mb-10">Ready to find your <span className="text-gold-500">dream car?</span></h2>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <Link href="/inventory">
                            <Button variant="primary" size="lg" className="h-16 px-10 rounded-full text-lg group">
                                Browse Inventory <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="h-16 px-10 rounded-full text-lg border-white text-white hover:bg-white hover:text-navy-900">
                                Talk to an Expert
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );
}
