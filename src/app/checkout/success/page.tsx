"use client";

import React, { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Package, ArrowRight, Download, Mail } from 'lucide-react';

function SuccessContent() {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId') || 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    return (
        <div className="bg-light-100 min-h-screen py-20 font-sans flex items-center justify-center">
            <div className="container mx-auto px-4 max-w-2xl">
                <div className="bg-white rounded-[40px] p-12 border border-light-300 shadow-2xl text-center relative overflow-hidden">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-gold-400 via-navy-900 to-gold-400"></div>

                    <div className="bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce-slow">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>

                    <h1 className="text-4xl font-extrabold text-navy-900 mb-4 tracking-tight">Order Successful!</h1>
                    <p className="text-navy-500 text-lg mb-10 leading-relaxed font-medium">
                        Thank you for your purchase. Your premium vehicle reservation has been confirmed and is now being processed.
                    </p>

                    <div className="bg-navy-900 rounded-3xl p-8 mb-10 text-left relative group">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <span className="text-gold-500 text-[11px] font-extrabold uppercase tracking-[0.2em] block mb-2">Order Identification</span>
                                <div className="text-2xl font-mono font-bold text-white tracking-wider">{orderId}</div>
                            </div>
                            <Link href={`/track-order?id=${orderId}`} className="bg-white/10 hover:bg-white/20 text-white border border-white/20 px-6 py-3 rounded-xl font-bold text-sm transition-all flex items-center">
                                <Package className="w-4 h-4 mr-2" /> Track Status
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                        <div className="bg-light-50 p-6 rounded-2xl border border-light-200 text-left">
                            <Mail className="w-6 h-6 text-gold-500 mb-3" />
                            <h3 className="font-bold text-navy-900 text-sm mb-1 uppercase tracking-tight">Email Confirmation</h3>
                            <p className="text-[12px] text-navy-500">Wait for your receipt and next steps in your inbox.</p>
                        </div>
                        <div className="bg-light-50 p-6 rounded-2xl border border-light-200 text-left">
                            <Download className="w-6 h-6 text-gold-500 mb-3" />
                            <h3 className="font-bold text-navy-900 text-sm mb-1 uppercase tracking-tight">Invoice PDF</h3>
                            <p className="text-[12px] text-navy-500">Download your transaction details for your records.</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/inventory" className="flex-1 bg-navy-900 text-gold-400 hover:bg-gold-500 hover:text-navy-900 py-4 px-8 rounded-2xl font-extrabold text-[15px] transition-all flex items-center justify-center group">
                            Continue Shopping <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link href="/" className="flex-1 bg-white border-2 border-navy-900 text-navy-900 hover:bg-navy-50 py-4 px-8 rounded-2xl font-extrabold text-[15px] transition-all flex items-center justify-center">
                            Return Home
                        </Link>
                    </div>
                </div>

                <p className="text-center mt-12 text-navy-400 text-sm font-medium">
                    Questions? Contact our concierge at <span className="text-navy-900 font-bold underline cursor-pointer">support@lithiaauto.com</span>
                </p>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen flex items-center justify-center bg-light-100">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-900"></div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
