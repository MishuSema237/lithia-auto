'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Globe, Zap } from 'lucide-react';

export function HomeAboutSection() {
    return (
        <section className="relative py-24 lg:py-32 bg-navy-900 text-white overflow-hidden">
            {/* Full Background Image for Mobile Only */}
            <div className="absolute inset-0 lg:hidden overflow-hidden">
                <img
                    src="/images/evans-halshaw-vauxhall-leeds-interior.jpg"
                    alt="Who We Are Background"
                    className="w-full h-full object-cover opacity-40 grayscale-[30%]"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-900/90 via-navy-900/60 to-navy-900/90" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Content Column */}
                    <div className="space-y-8 text-center lg:text-left">
                        <div className="max-w-2xl mx-auto lg:mx-0">
                            <h2 className="text-gold-500 font-bold uppercase tracking-[0.2em] text-xs md:text-sm mb-4">Who We Are</h2>
                            <h3 className="text-3xl md:text-5xl lg:text-6xl font-black mb-6 md:mb-8 leading-tight tracking-tight">
                                Delivering Excellence <br className="hidden md:block" />
                                Since 1946
                            </h3>
                            <p className="text-navy-100 text-sm md:text-xl lg:text-2xl leading-relaxed opacity-90 font-medium max-w-xl mx-auto lg:mx-0">
                                As one of the world's leading automotive retailers, Lithia Autos serves hundreds of thousands of customers across our global network. We are committed to transforming automotive retail through digital innovation and operational excellence.
                            </p>
                        </div>

                        {/* Feature Icons - Keep for Desktop/Tablets */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 pt-4 hidden md:grid">
                            <div className="flex items-start gap-4 p-4 md:p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <Globe className="w-8 h-8 text-gold-500 shrink-0" />
                                <div className="text-left">
                                    <h4 className="font-bold text-lg mb-1">Global Reach</h4>
                                    <p className="text-sm text-navy-200">Over 400 stores across North America and the UK.</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-4 p-4 md:p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
                                <Zap className="w-8 h-8 text-gold-500 shrink-0" />
                                <div className="text-left">
                                    <h4 className="font-bold text-lg mb-1">Innovation</h4>
                                    <p className="text-sm text-navy-200">Leading the digital shift in automotive retail.</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-6">
                            <Link
                                href="/about"
                                className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-900 font-black px-8 py-4 rounded-xl md:rounded-2xl transition-all group text-sm md:text-base"
                            >
                                Learn Our Full Story
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>

                    {/* Image Column - Visible only on Desktop */}
                    <div className="relative hidden lg:block">
                        <div className="relative z-10 rounded-[40px] overflow-hidden shadow-2xl border border-white/10 aspect-square">
                            <img
                                src="/images/evans-halshaw-vauxhall-leeds-interior.jpg"
                                alt="Who We Are - Lithia Autos"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {/* Decorative Blur Elements */}
                        <div className="absolute -top-10 -left-10 w-64 h-64 bg-gold-500/20 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-navy-500/20 rounded-full blur-3xl" />
                    </div>
                </div>
            </div>
        </section>
    );
}
