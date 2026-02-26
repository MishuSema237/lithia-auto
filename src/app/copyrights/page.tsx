'use client';

import React from 'react';
import { Copyright, ShieldAlert, FileSignature, Image as ImageIcon, Video, BookOpen } from 'lucide-react';

export default function CopyrightsPage() {
    return (
        <div className="bg-white min-h-screen font-sans pb-24">
            {/* Header */}
            <section className="bg-navy-900 py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000')] bg-cover bg-center opacity-10"></div>
                <div className="container mx-auto px-4 text-center relative z-10">
                    <div className="w-20 h-20 bg-gold-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
                        <Copyright className="w-10 h-10 text-navy-900" />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight uppercase">Intellectual <span className="text-gold-500">Property</span></h1>
                    <p className="text-navy-200 text-lg max-w-2xl mx-auto font-medium">
                        Respecting creativity and protecting the Lithia Autos brand identity and digital assets.
                    </p>
                </div>
            </section>

            {/* Content */}
            <section className="py-24">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-navy-900 mb-8 border-l-4 border-gold-500 pl-6">Digital Assets</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                All vehicle photography, cinemagraphs, and promotional videos produced by Lithia Autos are exclusive intellectual property. Unauthorized reproduction or redistribution is strictly prohibited.
                            </p>
                            <div className="flex gap-4">
                                <div className="p-3 bg-navy-50 rounded-xl text-navy-600"><ImageIcon className="w-6 h-6" /></div>
                                <div className="p-3 bg-navy-50 rounded-xl text-navy-600"><Video className="w-6 h-6" /></div>
                            </div>
                        </div>
                        <div className="space-y-6">
                            <h2 className="text-3xl font-black text-navy-900 mb-8 border-l-4 border-gold-500 pl-6">Trademarks</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                The Lithia Autos name, logo, and distinctive brand elements are registered trademarks. Any use of these marks without prior written authorization constitutes trademark infringement.
                            </p>
                            <div className="flex gap-4">
                                <div className="p-3 bg-navy-50 rounded-xl text-navy-600"><FileSignature className="w-6 h-6" /></div>
                                <div className="p-3 bg-navy-50 rounded-xl text-navy-600"><BookOpen className="w-6 h-6" /></div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-navy-50 p-12 rounded-3xl border border-light-200">
                        <div className="flex flex-col md:flex-row items-center gap-10">
                            <ShieldAlert className="w-16 h-16 text-gold-600 shrink-0" />
                            <div>
                                <h3 className="text-2xl font-black text-navy-900 mb-4">Copyright Infringement Notice</h3>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    Lithia Autos respects the intellectual property rights of others. If you believe your work has been copied in a way that constitutes copyright infringement, please provide our legal department with the following information:
                                </p>
                                <ul className="space-y-3 text-sm text-navy-600 font-bold">
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div> Physical or electronic signature</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div> Description of the copyrighted work</li>
                                    <li className="flex items-center gap-3"><div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div> Identification of the infringing material</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
