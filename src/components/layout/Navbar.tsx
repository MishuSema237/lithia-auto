'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Car, Menu, X, Search, Heart, ChevronDown, ShoppingCart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';

export function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { cart } = useCart();
    const pathname = usePathname();

    if (pathname?.startsWith('/admin') && pathname !== '/admin/login') return null;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white font-sans">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex pl-0 md:pl-0 h-[84px] items-center justify-between">

                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="bg-gold-500 p-1.5 rounded-full flex items-center justify-center">
                                <Car className="h-6 w-6 text-navy-900" />
                            </div>
                            <span className="font-extrabold text-[26px] tracking-tight text-navy-900">
                                LithiaAuto
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex space-x-8 lg:space-x-10">
                        {['Home', 'Inventory', 'About', 'FAQ'].map((item) => (
                            <Link href={item === 'Home' ? '/' : `/${item.toLowerCase()}`} key={item} className="flex items-center text-navy-700 font-bold text-[15px] cursor-pointer hover:text-gold-500 transition-colors">
                                <span>{item}</span>
                            </Link>
                        ))}
                        <Link href="/contact" className="text-navy-700 hover:text-gold-500 font-bold text-[15px] transition-colors">
                            Contact
                        </Link>
                    </nav>

                    {/* Desktop Actions */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/track-order" className="text-navy-500 hover:text-gold-500 font-bold text-[15px] transition-colors">
                            Track Order
                        </Link>

                        <div className="h-6 w-px bg-light-300"></div>

                        <Link href="/cart" className="group">
                            <button className="bg-navy-900 text-gold-200 border border-navy-800 hover:bg-gold-500 hover:text-navy-900 hover:border-gold-400 transition-all font-bold text-[14px] px-6 py-2.5 rounded-xl flex items-center justify-center shadow-none relative">
                                <ShoppingCart className="h-4 w-4 mr-2" />
                                Cart ({cart.length})
                            </button>
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-lg text-navy-700 hover:text-gold-500 focus:outline-none"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {isMobileMenuOpen ? (
                                <X className="block h-6 w-6" aria-hidden="true" />
                            ) : (
                                <Menu className="block h-6 w-6" aria-hidden="true" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={cn("md:hidden absolute w-full bg-light-100 border-b border-light-300", isMobileMenuOpen ? "block" : "hidden")}>
                <div className="px-4 pt-4 pb-6 space-y-2">
                    <Link href="/" className="block px-3 py-2 text-base font-bold text-navy-900 border-l-4 border-gold-500 bg-navy-50">
                        Home
                    </Link>
                    <Link href="/inventory" className="block px-3 py-2 text-base font-medium text-navy-600 hover:text-gold-500">
                        Inventory
                    </Link>
                    <Link href="/about" className="block px-3 py-2 text-base font-medium text-navy-600 hover:text-gold-500">
                        About
                    </Link>
                    <Link href="/faq" className="block px-3 py-2 text-base font-medium text-navy-600 hover:text-gold-500">
                        FAQ
                    </Link>
                    <Link href="/contact" className="block px-3 py-2 text-base font-medium text-navy-600 hover:text-gold-500">
                        Contact
                    </Link>

                    <div className="mt-6 pt-6 border-t border-light-300 flex flex-col gap-4">
                        <Link href="/track-order" className="block text-center text-navy-700 font-bold py-2">
                            Track Order
                        </Link>
                        <Link href="/cart" className="block">
                            <button className="w-full bg-navy-900 text-gold-200 border-2 border-navy-800 font-bold py-3 rounded-xl flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 hover:border-gold-400 transition-colors">
                                <ShoppingCart className="h-5 w-5 mr-2" />
                                Cart ({cart.length})
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}
