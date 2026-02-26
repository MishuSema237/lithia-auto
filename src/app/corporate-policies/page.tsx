'use client';

import React from 'react';
import { ShieldCheck, Target, Users, Globe, Award, Zap } from 'lucide-react';

export default function CorporatePoliciesPage() {
    const policies = [
        {
            title: 'Ethical Sourcing',
            icon: <Target className="w-6 h-6" />,
            desc: 'We partner only with suppliers and dealerships that adhere to the highest ethical and professional standards in the automotive industry.'
        },
        {
            title: 'Environmental Responsibility',
            icon: <Globe className="w-6 h-6" />,
            desc: 'Lithia Autos is committed to a sustainable future by promoting electric vehicle adoption and optimizing our logistics to reduce carbon footprint.'
        },
        {
            title: 'Workplace Excellence',
            icon: <Users className="w-6 h-6" />,
            desc: 'We foster an inclusive and dynamic workplace where expertise is celebrated and every professional has the platform to excel.'
        },
        {
            title: 'Customer First Mandate',
            icon: <ShieldCheck className="w-6 h-6" />,
            desc: 'Our transparency-first approach ensures that every client interaction is built on trust, accuracy, and premium service delivery.'
        }
    ];

    return (
        <div className="bg-white min-h-screen font-sans pb-24">
            {/* Header */}
            <section className="bg-navy-900 py-32 relative overflow-hidden text-center">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542362567-b052ed97f53f?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase">Corporate <span className="text-gold-500">Policies</span></h1>
                    <p className="text-navy-200 text-lg max-w-2xl mx-auto font-medium">
                        Our foundational principles and commitments to excellence, integrity, and sustainability.
                    </p>
                </div>
            </section>

            {/* Principles Grid */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center mb-20">
                        <h2 className="text-3xl md:text-5xl font-black text-navy-900 mb-6">Our Core <span className="text-gold-500">Foundations</span></h2>
                        <p className="text-gray-600 text-lg leading-relaxed">
                            Lithia Autos operates at the intersection of luxury and integrity. Our corporate policies are designed to ensure that every vehicle sold and every partnership formed meets our exacting standards.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {policies.map((policy, i) => (
                            <div key={i} className="flex gap-8 p-10 bg-navy-50 rounded-[32px] border border-navy-100 hover:border-gold-500 transition-all duration-500 group">
                                <div className="shrink-0 w-16 h-16 bg-white shadow-xl rounded-2xl flex items-center justify-center text-navy-900 group-hover:bg-gold-500 transition-colors">
                                    {policy.icon}
                                </div>
                                <div className="pt-2">
                                    <h3 className="text-2xl font-black text-navy-900 mb-4">{policy.title}</h3>
                                    <p className="text-gray-600 leading-relaxed font-medium">
                                        {policy.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="bg-navy-900 rounded-[50px] p-12 md:p-24 relative overflow-hidden">
                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3 gap-16 text-center lg:text-left">
                            <div>
                                <h3 className="text-gold-500 text-6xl font-black mb-6">#1</h3>
                                <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-wider">Premium Standards</h4>
                                <p className="text-navy-200 leading-relaxed">We never compromise on quality. Every asset and service must reflect the excellence of our brand.</p>
                            </div>
                            <div>
                                <h3 className="text-gold-500 text-6xl font-black mb-6">10k+</h3>
                                <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-wider">Verified Audits</h4>
                                <p className="text-navy-200 leading-relaxed">Continuous internal and external audits to ensure absolute compliance with international standards.</p>
                            </div>
                            <div>
                                <h3 className="text-gold-500 text-6xl font-black mb-6">24/7</h3>
                                <h4 className="text-2xl font-black text-white mb-4 uppercase tracking-wider">Commitment</h4>
                                <p className="text-navy-200 leading-relaxed">Our legal and compliance teams work around the clock to protect our customers and our reputation.</p>
                            </div>
                        </div>
                        {/* Decorative background circle */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold-500/5 rounded-full blur-[100px]"></div>
                    </div>
                </div>
            </section>
        </div>
    );
}
