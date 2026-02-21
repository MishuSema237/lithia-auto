"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    ChevronLeft, ShieldCheck, CreditCard,
    Truck, MapPin, User, Mail, Phone,
    Lock, CheckCircle2, ArrowRight
} from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CheckoutPage() {
    const { cart, total, clearCart } = useCart();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        paymentMethod: 'bank_transfer'
    });

    React.useEffect(() => {
        if (cart.length === 0) {
            router.push('/cart');
        }
    }, [cart, router]);

    if (cart.length === 0) {
        return null;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        const orderId = 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();

        try {
            const response = await fetch('/api/order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    cart,
                    total,
                    orderId
                }),
            });

            if (response.ok) {
                // In a real app, we'd save to DB here
                clearCart();
                setIsProcessing(false);
                router.push(`/checkout/success?orderId=${orderId}`);
            } else {
                console.error('Failed to process order email');
                // We still proceed to success page in this demo if the API fails but simulate a DB success
                // Actually, let's show an error if it fails
                setIsProcessing(false);
                alert('There was an error processing your order. Please try again.');
            }
        } catch (error) {
            console.error('Error in checkout:', error);
            setIsProcessing(false);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="bg-light-100 min-h-screen py-12 font-sans">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                <div className="mb-10">
                    <Link href="/cart" className="inline-flex items-center text-navy-500 hover:text-navy-900 font-bold text-sm mb-4 transition-colors">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back to Cart
                    </Link>
                    <h1 className="text-4xl font-extrabold text-navy-900 tracking-tight">Checkout</h1>
                </div>

                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Checkout Form */}
                    <div className="w-full lg:w-[65%] space-y-8">

                        <form onSubmit={handleSubmit} className="space-y-8">

                            {/* Contact Information */}
                            <div className="bg-white rounded-3xl p-8 border border-light-300 shadow-sm">
                                <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center">
                                    <User className="w-5 h-5 mr-3 text-gold-500" /> Contact Information
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-navy-700 ml-1">First Name</label>
                                        <div className="relative">
                                            <input
                                                required
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleInputChange}
                                                placeholder="John"
                                                className="w-full bg-light-50 border border-light-300 rounded-2xl py-3.5 px-4 pl-11 text-navy-900 font-medium focus:outline-none focus:ring-1 focus:ring-gold-500"
                                            />
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-light-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-navy-700 ml-1">Last Name</label>
                                        <input
                                            required
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            placeholder="Doe"
                                            className="w-full bg-light-50 border border-light-300 rounded-2xl py-3.5 px-4 text-navy-900 font-medium focus:outline-none focus:ring-1 focus:ring-gold-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-navy-700 ml-1">Email Address</label>
                                        <div className="relative">
                                            <input
                                                required
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="john@example.com"
                                                className="w-full bg-light-50 border border-light-300 rounded-2xl py-3.5 px-4 pl-11 text-navy-900 font-medium focus:outline-none focus:ring-1 focus:ring-gold-500"
                                            />
                                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-light-400" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-navy-700 ml-1">Phone Number</label>
                                        <div className="relative">
                                            <input
                                                required
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+1 (555) 000-0000"
                                                className="w-full bg-light-50 border border-light-300 rounded-2xl py-3.5 px-4 pl-11 text-navy-900 font-medium focus:outline-none focus:ring-1 focus:ring-gold-500"
                                            />
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-light-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery/Billing Address */}
                            <div className="bg-white rounded-3xl p-8 border border-light-300 shadow-sm">
                                <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center">
                                    <MapPin className="w-5 h-5 mr-3 text-gold-500" /> Delivery Address
                                </h2>
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <label className="text-[13px] font-bold text-navy-700 ml-1">Street Address</label>
                                        <input
                                            required
                                            type="text"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder="123 Luxury Lane"
                                            className="w-full bg-light-50 border border-light-300 rounded-2xl py-3.5 px-4 text-navy-900 font-medium focus:outline-none focus:ring-1 focus:ring-gold-500"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-bold text-navy-700 ml-1">City</label>
                                            <input
                                                required
                                                type="text"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                placeholder="Beverly Hills"
                                                className="w-full bg-light-50 border border-light-300 rounded-2xl py-3.5 px-4 text-navy-900 font-medium focus:outline-none focus:ring-1 focus:ring-gold-500"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[13px] font-bold text-navy-700 ml-1">State / Zip</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder="CA 90210"
                                                className="w-full bg-light-50 border border-light-300 rounded-2xl py-3.5 px-4 text-navy-900 font-medium focus:outline-none focus:ring-1 focus:ring-gold-500"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="bg-white rounded-3xl p-8 border border-light-300 shadow-sm">
                                <h2 className="text-xl font-bold text-navy-900 mb-6 flex items-center">
                                    <CreditCard className="w-5 h-5 mr-3 text-gold-500" /> Payment Method
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {[
                                        { id: 'bank_transfer', label: 'Bank Transfer', desc: 'Secure Wire Transfer' },
                                        { id: 'crypto', label: 'Cryptocurrency', desc: 'BTC, ETH, USDT' },
                                        { id: 'financing', label: 'Financing', desc: 'Request luxury car loan' }
                                    ].map((method) => (
                                        <label
                                            key={method.id}
                                            className={`relative flex items-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${formData.paymentMethod === method.id
                                                ? 'border-gold-500 bg-gold-50'
                                                : 'border-light-200 bg-white hover:border-navy-100'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value={method.id}
                                                checked={formData.paymentMethod === method.id}
                                                onChange={handleInputChange}
                                                className="hidden"
                                            />
                                            <div className="flex-1">
                                                <div className="font-bold text-navy-900">{method.label}</div>
                                                <div className="text-[12px] text-navy-500">{method.desc}</div>
                                            </div>
                                            {formData.paymentMethod === method.id && (
                                                <CheckCircle2 className="w-5 h-5 text-gold-600" />
                                            )}
                                        </label>
                                    ))}
                                </div>
                                <div className="mt-6 p-4 bg-navy-50 rounded-2xl border border-navy-100 italic text-[13px] text-navy-600">
                                    {formData.paymentMethod === 'bank_transfer' && "Details for wire transfer will be provided in your confirmation email."}
                                    {formData.paymentMethod === 'crypto' && "A QR code for payment will be shown after order placement."}
                                    {formData.paymentMethod === 'financing' && "Our representative will contact you to finalize the loan application."}
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={isProcessing}
                                className="w-full bg-navy-900 text-gold-400 hover:bg-gold-500 hover:text-navy-900 py-6 rounded-2xl font-extrabold text-[18px] transition-all flex items-center justify-center group disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {isProcessing ? (
                                    <span className="flex items-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Processing Order...
                                    </span>
                                ) : (
                                    <>Place Secure Order <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" /></>
                                )}
                            </button>

                            <div className="flex items-center justify-center gap-2 text-navy-400 text-sm font-medium">
                                <Lock className="w-4 h-4" /> 256-bit Secure Encrypted Connection
                            </div>
                        </form>
                    </div>

                    {/* Order Summary Sidebar */}
                    <aside className="w-full lg:w-[35%]">
                        <div className="bg-white rounded-3xl border border-light-300 p-8 shadow-sm sticky top-28">
                            <h2 className="text-xl font-bold text-navy-900 mb-6 tracking-tight">Order Summary</h2>

                            <div className="space-y-4 mb-6">
                                {cart.map(item => (
                                    <div key={item.id} className="flex gap-4 items-center">
                                        <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-light-50">
                                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="font-bold text-navy-900 text-[14px] truncate uppercase">{item.title}</div>
                                            <div className="text-[12px] text-navy-500 uppercase">{item.year} • {item.type}</div>
                                        </div>
                                        <div className="font-bold text-navy-900 text-[14px]">{item.price}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="pt-6 border-t border-light-200 space-y-3 mb-6">
                                <div className="flex justify-between text-navy-500 font-medium text-sm">
                                    <span>Subtotal</span>
                                    <span>${total.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-navy-500 font-medium text-sm">
                                    <span>Shipping</span>
                                    <span className="text-green-600 font-bold uppercase text-[11px]">Free</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-end mb-8">
                                <span className="text-navy-900 font-bold">Total</span>
                                <span className="text-2xl font-extrabold text-navy-900 tracking-tight">${total.toLocaleString()}</span>
                            </div>

                            <div className="bg-gold-50 p-4 rounded-2xl flex items-start gap-4">
                                <ShieldCheck className="w-6 h-6 text-gold-600 shrink-0" />
                                <div className="text-[12px] text-navy-700 leading-relaxed font-medium">
                                    <span className="font-bold block mb-0.5">Buyer Protection In Effect</span>
                                    All personal car sales are backed by our premium 30-day inspection guarantee.
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
        </div>
    );
}
