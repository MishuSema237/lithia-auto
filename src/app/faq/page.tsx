'use client';

import React, { useState } from 'react';
import { StaticPageWrapper } from '@/components/ui/StaticPageWrapper';
import { Plus, Minus, Facebook, Linkedin, Instagram } from 'lucide-react';

interface FAQItemProps {
    question: string;
    answer: string;
    isOpen: boolean;
    onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
    return (
        <div
            className={`border rounded-xl transition-all duration-300 mb-4 overflow-hidden ${isOpen ? 'bg-gold-50/50 border-gold-200' : 'bg-white border-light-200 hover:border-navy-200'
                }`}
        >
            <button
                onClick={onClick}
                className="w-full text-left px-6 py-5 flex justify-between items-center group"
            >
                <span className={`font-bold text-lg transition-colors ${isOpen ? 'text-navy-900' : 'text-navy-700 group-hover:text-navy-900'}`}>
                    {question}
                </span>
                <div className={`shrink-0 ml-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    {isOpen ? (
                        <Minus className="w-5 h-5 text-gold-600" />
                    ) : (
                        <Plus className="w-5 h-5 text-navy-400" />
                    )}
                </div>
            </button>
            <div
                className={`transition-[max-height] duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'
                    }`}
            >
                <div className="px-6 pb-6 text-navy-600 leading-relaxed border-t border-gold-100/50 pt-4">
                    {answer}
                </div>
            </div>
        </div>
    );
}

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<string | null>('overview-0');

    const sections = [
        {
            title: 'Overview',
            items: [
                { q: 'What is LithiaAuto.com?', a: 'Once your account is set up and you\'ve familiarized yourself with the platform, you are ready to start using our services. Whether it\'s accessing specific features, making transactions, or utilizing our tools, you\'ll find everything you need at your fingertips.' },
                { q: 'How do I access LithiaAuto.com?', a: 'You can access our platform from any modern web browser or mobile device. Simply log in to view our exclusive inventory and track your orders.' },
                { q: 'How is LithiaAuto content organized?', a: 'Our content is meticulously organized into categories like Make, Body Type, and Price range to ensure you can find the exact vehicle you\'re looking for with minimal effort.' }
            ]
        },
        {
            title: 'Costs and Payments',
            items: [
                { q: 'How do you calculate fees?', a: 'Our pricing is transparent and includes all standard processing fees. Taxes and registration vary by location and are calculated during the checkout process.' },
                { q: 'How do I pay my invoices?', a: 'We support multiple payment methods including Secure Bank Transfer, Cryptocurrency (BTC/ETH/USDT), and Financing through our premium partners.' },
                { q: 'Are there opportunities for discounts?', a: 'We periodically offer seasonal promotions and loyalty discounts for returning clients. Check our newsletter for the latest updates.' }
            ]
        },
        {
            title: 'Safety and Security',
            items: [
                { q: 'What languages does your service support?', a: 'Currently, our primary platform is in English, but our concierge team can assist clients in Spanish, German, and French upon request.' },
                { q: 'Is my data protected?', a: 'Absolutely. We use industry-standard SSL encryption and follow strict privacy protocols to ensure your personal and financial information remains secure at all times.' }
            ]
        }
    ];

    const toggleItem = (id: string) => {
        setOpenIndex(openIndex === id ? null : id);
    };

    return (
        <div className="bg-white min-h-screen py-20 font-sans">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
                    <h1 className="text-3xl md:text-5xl font-black text-navy-900 tracking-tight">
                        Frequently asked <span className="text-gold-500">questions</span>
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-navy-400 font-bold uppercase tracking-wider">
                        <span>Share this page:</span>
                        <div className="flex gap-3">
                            <a href="#" className="hover:text-gold-500 transition-colors"><Facebook className="w-4 h-4" /></a>
                            <a href="#" className="hover:text-gold-500 transition-colors"><Linkedin className="w-4 h-4" /></a>
                            <a href="#" className="hover:text-gold-500 transition-colors">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                            </a>
                            <a href="#" className="hover:text-gold-500 transition-colors"><Instagram className="w-4 h-4" /></a>
                        </div>
                    </div>
                </div>

                {/* FAQ Sections */}
                <div className="space-y-16">
                    {sections.map((section, sIdx) => (
                        <div key={sIdx}>
                            <h2 className="text-2xl font-black text-navy-800 mb-8 border-b border-light-200 pb-4">
                                {section.title}
                            </h2>
                            <div className="space-y-2">
                                {section.items.map((item, iIdx) => {
                                    const itemId = `${section.title.toLowerCase()}-${iIdx}`;
                                    return (
                                        <FAQItem
                                            key={itemId}
                                            question={item.q}
                                            answer={item.a}
                                            isOpen={openIndex === itemId}
                                            onClick={() => toggleItem(itemId)}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
