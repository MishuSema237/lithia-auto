"use client";

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import {
    Search, Package, MapPin, CheckCircle2,
    Clock, Truck, ChevronRight, AlertCircle, ShoppingBag
} from 'lucide-react';
import Link from 'next/link';

function TrackOrderContent() {
    const searchParams = useSearchParams();
    const [orderId, setOrderId] = useState(searchParams.get('id') || '');
    const [email, setEmail] = useState('');
    const [orderStatus, setOrderStatus] = useState<null | 'pending' | 'processing' | 'shipped' | 'delivered' | 'not_found' | 'cancelled'>(null);

    const [orderData, setOrderData] = useState<any>(null);

    const handleTrack = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!orderId || !email) return;

        try {
            const res = await fetch(`/api/order/track/${orderId}?email=${encodeURIComponent(email)}`);
            if (res.ok) {
                const data = await res.json();
                setOrderStatus(data.status.toLowerCase() as any);
                setOrderData(data);
            } else {
                setOrderStatus('not_found');
                setOrderData(null);
            }
        } catch (e) {
            setOrderStatus('not_found');
            setOrderData(null);
        }
    };

    const formatDate = (dateStr: string) => {
        if (!dateStr) return 'TBD';
        return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    const trackingDetails = orderData?.trackingDetails || {};

    const statusSteps = [
        {
            id: 'pending',
            label: 'Order Placed',
            icon: <ShoppingBag className="w-5 h-5" />,
            date: formatDate(orderData?.createdAt)
        },
        {
            id: 'processing',
            label: 'Processing',
            icon: <Clock className="w-5 h-5" />,
            date: trackingDetails.actualProcessingDate ? formatDate(trackingDetails.actualProcessingDate) : `Expected: ${formatDate(trackingDetails.expectedProcessingDate)}`
        },
        {
            id: 'shipped',
            label: 'Shipped',
            icon: <Truck className="w-5 h-5" />,
            date: trackingDetails.actualShippedDate ? formatDate(trackingDetails.actualShippedDate) : `Expected: ${formatDate(trackingDetails.expectedShippedDate)}`
        },
        {
            id: 'delivered',
            label: 'Delivered',
            icon: <CheckCircle2 className="w-5 h-5" />,
            date: trackingDetails.actualDeliveredDate ? formatDate(trackingDetails.actualDeliveredDate) : `Expected: ${formatDate(trackingDetails.expectedDeliveredDate)}`
        },
    ];

    const getCurrentStepIndex = () => {
        if (!orderStatus || orderStatus === 'not_found' || orderStatus === 'cancelled') return -1;
        const statusMap: Record<string, number> = {
            'pending': 0,
            'processing': 1,
            'shipped': 2,
            'completed': 3,
            'delivered': 3
        };
        return statusMap[orderStatus] ?? -1;
    };

    return (
        <div className="bg-light-100 min-h-screen py-16 font-sans">
            <div className="container mx-auto px-4 max-w-4xl">

                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-navy-900 mb-4 tracking-tight">Track Your Vehicle</h1>
                    <p className="text-navy-500 font-medium">Enter your details below to check the real-time status of your premium purchase.</p>
                </div>

                <div className="bg-white rounded-3xl p-8 md:p-12 border border-light-300 shadow-xl mb-10">
                    <form onSubmit={handleTrack} className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 space-y-2">
                            <label className="text-[13px] font-bold text-navy-700 ml-1 uppercase tracking-wider">Order ID</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={orderId}
                                    onChange={(e) => setOrderId(e.target.value)}
                                    placeholder="ORD-123456789"
                                    className="w-full bg-light-50 border border-light-300 rounded-2xl py-4 px-5 pl-12 text-navy-900 font-mono font-bold focus:outline-none focus:ring-1 focus:ring-gold-500"
                                    required
                                />
                                <Package className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-light-400" />
                            </div>
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="text-[13px] font-bold text-navy-700 ml-1 uppercase tracking-wider">Email Address</label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="your@email.com"
                                    className="w-full bg-light-50 border border-light-300 rounded-2xl py-4 px-5 text-navy-900 font-medium focus:outline-none focus:ring-1 focus:ring-gold-500"
                                    required
                                />
                            </div>
                        </div>
                        <div className="pt-7">
                            <button type="submit" className="w-full md:w-auto bg-navy-900 text-gold-400 hover:bg-gold-500 hover:text-navy-900 px-10 py-4 rounded-2xl font-extrabold transition-all flex items-center justify-center group">
                                <Search className="w-5 h-5 mr-2" /> Track
                            </button>
                        </div>
                    </form>
                </div>

                {orderStatus && orderStatus !== 'not_found' && (
                    <div className="animate-fade-in space-y-6">
                        {/* Status Overview Card */}
                        <div className="bg-navy-900 rounded-3xl p-8 border border-navy-800 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>

                            <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
                                <div className="space-y-4">
                                    <div>
                                        <span className="text-gold-500 text-[11px] font-extrabold uppercase tracking-[0.2em] block mb-2">Order Identification</span>
                                        <h2 className="text-2xl font-mono font-bold text-white tracking-widest uppercase">{orderId}</h2>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-3 h-3 rounded-full bg-gold-500 animate-pulse"></div>
                                        <span className="text-gold-200 font-bold text-sm uppercase tracking-wider">Status: {orderStatus}</span>
                                    </div>
                                </div>
                                <div className="text-left md:text-right space-y-4">
                                    <div>
                                        <span className="text-gold-500 text-[11px] font-extrabold uppercase tracking-[0.2em] block mb-2">Delivery Estimate</span>
                                        <div className="text-2xl font-bold text-white">
                                            {trackingDetails.expectedDeliveredDate ? formatDate(trackingDetails.expectedDeliveredDate) : 'TBD'}
                                        </div>
                                    </div>
                                    <div className="flex items-center md:justify-end text-navy-200 text-sm font-medium">
                                        <MapPin className="w-4 h-4 mr-2" /> Delivery Target: {trackingDetails.destination || 'TBD'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Progress Tracker */}
                        <div className="bg-white rounded-3xl p-8 md:p-12 border border-light-300 shadow-sm">
                            <h3 className="text-xl font-bold text-navy-900 mb-10 text-center tracking-tight">Purchase Journey</h3>
                            <div className="relative">
                                {/* Timeline Line */}
                                <div className="absolute left-[39px] md:left-0 md:top-[26px] md:w-full h-full md:h-1 bg-light-200 z-0">
                                    <div
                                        className="bg-gold-500 h-full md:h-full transition-all duration-1000"
                                        style={{
                                            width: typeof window !== 'undefined' && window.innerWidth >= 768 ? `${(getCurrentStepIndex() / (statusSteps.length - 1)) * 100}%` : '4px',
                                            height: typeof window !== 'undefined' && window.innerWidth < 768 ? `${(getCurrentStepIndex() / (statusSteps.length - 1)) * 100}%` : '100%'
                                        }}
                                    ></div>
                                </div>

                                {/* Steps */}
                                <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10 md:gap-0">
                                    {statusSteps.map((step, index) => {
                                        const isActive = index <= getCurrentStepIndex();
                                        return (
                                            <div key={step.id} className="flex md:flex-col items-center flex-1">
                                                <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${isActive
                                                    ? 'bg-navy-900 border-gold-500 text-gold-500 shadow-lg scale-110'
                                                    : 'bg-white border-light-200 text-light-300'
                                                    }`}>
                                                    {step.icon}
                                                </div>
                                                <div className="ml-6 md:ml-0 md:mt-6 text-left md:text-center">
                                                    <div className={`font-extrabold text-sm uppercase tracking-tight mb-1 ${isActive ? 'text-navy-900' : 'text-light-400'}`}>
                                                        {step.label}
                                                    </div>
                                                    <div className="text-[12px] text-navy-500 font-medium">{step.date}</div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Order Details & Address */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-3xl p-8 border border-light-300 shadow-sm">
                                <h3 className="text-lg font-bold text-navy-900 mb-4 flex items-center">
                                    <MapPin className="w-5 h-5 mr-2 text-gold-500" /> Shipping Address
                                </h3>
                                <div className="text-navy-600 text-sm leading-relaxed">
                                    <p className="font-bold text-navy-900">{orderData?.firstName} {orderData?.lastName}</p>
                                    <p>{orderData?.address}</p>
                                    <p>{orderData?.city}, {orderData?.state} {orderData?.zipCode}</p>
                                    <p>{orderData?.country}</p>
                                </div>
                            </div>
                            <div className="bg-white rounded-3xl p-8 border border-light-300 shadow-sm">
                                <h3 className="text-lg font-bold text-navy-900 mb-4 flex items-center">
                                    <Search className="w-5 h-5 mr-2 text-gold-500" /> Contact Info
                                </h3>
                                <div className="text-navy-600 text-sm space-y-2">
                                    <p><span className="font-bold text-navy-400 uppercase text-[10px] tracking-widest block">Email</span> {orderData?.email}</p>
                                    <p><span className="font-bold text-navy-400 uppercase text-[10px] tracking-widest block">Phone</span> {orderData?.phone}</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-center">
                            <button className="bg-white border border-light-300 text-navy-900 font-bold px-8 py-3 rounded-xl hover:bg-navy-50 transition-all flex items-center">
                                <AlertCircle className="w-4 h-4 mr-2" /> Report an issue with this order
                            </button>
                        </div>
                    </div>
                )}

                {orderStatus === 'not_found' && (
                    <div className="bg-red-50 border border-red-100 rounded-3xl p-8 text-center animate-shake">
                        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-red-900 mb-2">Order Not Found</h3>
                        <p className="text-red-700 font-medium">We couldn't find an order with identification "{orderId}" for this email. Please check your credentials and try again.</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function TrackOrderPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <TrackOrderContent />
        </Suspense>
    );
}
