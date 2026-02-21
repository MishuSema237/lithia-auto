'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Car, Facebook, Linkedin, Twitter, ArrowUp } from 'lucide-react';

export function Footer() {
    const pathname = usePathname();
    if (pathname?.startsWith('/admin') && pathname !== '/admin/login') return null;

    const scrollToTop = () => {
        if (typeof window !== 'undefined') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <footer className="bg-navy-900 text-navy-200 py-16 font-sans">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
                    {/* About */}
                    <div>
                        <h4 className="text-gold-400 font-bold mb-6 text-xl">About Lithia Auto</h4>
                        <ul className="space-y-4 text-[15px]">
                            {[
                                { name: 'About us', href: '/about' },
                                { name: 'Terms & Conditions', href: '/terms' },
                                { name: 'Privacy Policy', href: '/privacy' },
                                { name: 'Corporate Policies', href: '/corporate-policies' },
                                { name: 'FAQs', href: '/faq' }
                            ].map(item => (
                                <li key={item.name}><Link href={item.href} className="hover:text-gold-400 transition-colors">{item.name}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Popular */}
                    <div>
                        <h4 className="text-gold-400 font-bold mb-6 text-xl">Popular Cars</h4>
                        <ul className="space-y-4 text-[15px]">
                            {[
                                'Chevrolet', 'Land Rover', 'Tesla',
                                'Volkswagen', 'Honda', 'Hyundai', 'Mercedes benz'
                            ].map(item => (
                                <li key={item}><Link href={`/inventory?make=${item}`} className="hover:text-gold-400 transition-colors">{item}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Other */}
                    <div>
                        <h4 className="text-gold-400 font-bold mb-6 text-xl">Other</h4>
                        <ul className="space-y-4 text-[15px]">
                            {[
                                { name: 'How it works', href: '/how-it-works' },
                                { name: 'Copyrights', href: '/copyrights' },
                                { name: 'Help Center', href: '/help-center' }
                            ].map(item => (
                                <li key={item.name}><Link href={item.href} className="hover:text-gold-400 transition-colors">{item.name}</Link></li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-gold-400 font-bold mb-6 text-xl">Newsletter</h4>
                        <p className="mb-6 leading-relaxed text-[15px] text-navy-200">
                            Stay on top of the latest car trends, and updates on our inventory.
                        </p>
                        <form className="space-y-4">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-navy-800 border-none rounded-lg text-white px-5 py-4 placeholder:text-navy-400 focus:outline-none focus:ring-1 focus:ring-gold-500"
                                required
                            />
                            <button
                                type="submit"
                                className="w-full bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-4 rounded-lg transition-colors text-[15px]"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-8 border-t border-navy-800 flex flex-col lg:flex-row justify-between items-center gap-6 relative">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="bg-gold-500 p-1.5 rounded-full"><Car className="h-6 w-6 text-navy-900" /></div>
                        <span className="font-extrabold text-2xl tracking-tight text-white">
                            LithiaAuto
                        </span>
                    </Link>

                    <p className="text-[15px] text-navy-300">
                        &copy; {new Date().getFullYear()} Lithia Auto. All rights reserved
                    </p>

                    <div className="flex items-center gap-3">
                        <a href="#" className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-colors text-navy-300">
                            <Facebook className="h-4 w-4" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-colors text-navy-300">
                            <Linkedin className="h-4 w-4" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-colors text-navy-300">
                            <Twitter className="h-4 w-4" />
                        </a>
                        <a href="#" className="w-10 h-10 rounded-full bg-navy-800 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-colors text-navy-300">
                            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" /></svg>
                        </a>
                        <button onClick={scrollToTop} className="ml-4 w-12 h-12 rounded-full bg-gold-500 text-navy-900 flex items-center justify-center hover:bg-gold-400 transition-colors shadow-lg border-2 border-navy-900">
                            <ArrowUp className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
