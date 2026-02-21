'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import {
    ChevronLeft, Share, Heart, CheckCircle2, Star,
    ArrowLeft, ArrowRight, Download,
    ChevronDown, Repeat, Printer, Check
} from 'lucide-react';
import { Car as CarIcon } from 'lucide-react';
import Link from 'next/link';
import { CARS_DATA } from '@/data/cars';
import { notFound } from 'next/navigation';

export default function CarDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const [car, setCar] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(false);

    React.useEffect(() => {
        const fetchCar = async () => {
            try {
                // Try fetching from API first
                const res = await fetch(`/api/inventory/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setCar(data);
                } else {
                    // Fallback to static data if ID is a number
                    const staticCar = CARS_DATA.find(c => c.id.toString() === id);
                    if (staticCar) {
                        setCar({
                            ...staticCar,
                            carModel: staticCar.title.split(' ').slice(1).join(' '),
                            make: staticCar.title.split(' ')[0],
                            mileage: staticCar.miles,
                            fuelType: staticCar.fuel,
                            transmission: staticCar.trans,
                            images: [`https://images.unsplash.com/photo-${staticCar.img}?auto=format&fit=crop&w=1600&q=80`]
                        });
                    } else {
                        setError(true);
                    }
                }
            } catch (err) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCar();
    }, [id]);

    if (isLoading) return <div className="min-h-screen flex items-center justify-center"><Loader2 className="animate-spin h-10 w-10 text-navy-400" /></div>;
    if (error || !car) notFound();

    const { addToCart } = useCart();
    const router = useRouter();
    const [addedToCart, setAddedToCart] = React.useState(false);

    const carData = {
        id: car._id || car.id.toString(),
        title: car.title || `${car.year} ${car.make} ${car.carModel}`,
        price: `$${car.price.toLocaleString()}`,
        image: car.images?.[0] || 'https://images.unsplash.com/photo-1628155930515-8d0ab7a66cd5?auto=format&fit=crop&w=1600&q=80',
        year: car.year.toString(),
        type: car.type || 'Vehicle'
    };

    const handleAddToCart = () => {
        addToCart(carData);
        setAddedToCart(true);
        setTimeout(() => setAddedToCart(false), 3000);
    };

    const handleBuyNow = () => {
        addToCart(carData);
        router.push('/checkout');
    };

    // Dummy reviews - in a real app these come from the car object
    const reviews = [
        {
            id: 1,
            author: 'Leslie Alexander',
            date: 'August 13, 2023',
            rating: 5,
            content: "It's really easy to use and it is exactly what I am looking for. A lot of good looking templates & it's highly customizable.",
            avatar: 'https://i.pravatar.cc/150?img=47'
        }
    ];

    return (
        <div className="bg-[#f9fafb] min-h-screen pb-20 font-sans">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">

                {/* Main Hero Image */}
                <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden mb-8 group cursor-pointer">
                    <img src={carData.image} alt={carData.title} className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
                    <button className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white flex items-center justify-center transition-colors">
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                    <button className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md text-white flex items-center justify-center transition-colors">
                        <ArrowRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Quick Nav Pills */}
                <div className="flex flex-wrap gap-4 mb-10 sticky top-[84px] z-40 bg-[#f9fafb]/80 backdrop-blur-md py-4">
                    <a href="#overview" className="px-6 py-2.5 rounded-full border border-light-300 bg-white text-navy-900 font-bold text-sm tracking-wide hover:bg-gold-500 transition-colors">Overview</a>
                    <a href="#specs" className="px-6 py-2.5 rounded-full border border-light-300 bg-white text-navy-600 hover:text-navy-900 font-bold text-sm tracking-wide transition-colors hover:bg-gold-500">Specs & features</a>
                    <a href="#recommended" className="px-6 py-2.5 rounded-full border border-light-300 bg-white text-navy-600 hover:text-navy-900 font-bold text-sm tracking-wide transition-colors hover:bg-gold-500">Recommended cars</a>
                    <a href="#loan-calculator" className="px-6 py-2.5 rounded-full border border-light-300 bg-white text-navy-600 hover:text-navy-900 font-bold text-sm tracking-wide transition-colors hover:bg-gold-500">Loan calculator</a>
                    {reviews.length > 0 && (
                        <a href="#reviews" className="px-6 py-2.5 rounded-full border border-light-300 bg-white text-navy-600 hover:text-navy-900 font-bold text-sm tracking-wide transition-colors hover:bg-gold-500">Reviews</a>
                    )}
                </div>

                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Left Column (Main Content) */}
                    <div className="w-full lg:w-[65%] xl:w-[70%] space-y-12">

                        {/* Description */}
                        <section id="overview">
                            <h2 className="text-[28px] font-bold text-navy-900 mb-6 tracking-tight">Description</h2>
                            <div className="text-navy-500 text-[15px] leading-relaxed space-y-4 mb-6">
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi lacinia sit amet elit sed molestie. Sed neque enim, iaculis id viverra in, scelerisque vitae nulla.</p>
                                <p>Nulla egestas augue vitae mollis semper. Phasellus congue neque et pulvinar gravida. Nam placerat, massa a consequat scelerisque, lacus enim mattis felis, pellentesque volutpat risus nisl et sapien.</p>
                            </div>
                            <button className="flex items-center text-navy-900 font-bold border border-light-300 rounded-xl px-5 py-3 hover:bg-light-100 transition-colors">
                                <Download className="w-5 h-5 text-gold-500 mr-2" /> Download brochure
                            </button>
                        </section>

                        {/* Car Overview */}
                        <section id="specs">
                            <h2 className="text-[28px] font-bold text-navy-900 mb-6 tracking-tight">Car overview</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-6">
                                {[
                                    { icon: <CarIcon className="w-5 h-5" />, label: 'Condition:', value: 'New' },
                                    { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>, label: 'Cylinders:', value: '6' },
                                    { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>, label: 'Stock:', value: 'AB9084329' },
                                    { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M5 21V7l8-4v18M13 3v18M19 21V11l-6-4M9 7v6M9 17v-2" /></svg>, label: 'Fuel Type:', value: car.fuelType || car.fuel },
                                    { icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>, label: 'Year:', value: car.year.toString() },
                                    { icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>, label: 'Transmission:', value: car.transmission || car.trans },
                                ].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between border-b border-light-200 pb-4">
                                        <div className="flex items-center text-navy-500 text-[15px]">
                                            <span className="text-light-500 mr-3">{item.icon}</span>
                                            {item.label}
                                        </div>
                                        <div className="font-bold text-navy-900">{item.value}</div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Reviews Section (Conditional) */}
                        {reviews.length > 0 && (
                            <section id="reviews">
                                <h2 className="text-[28px] font-bold text-navy-900 mb-8 tracking-tight">Car User Reviews & Rating</h2>
                                <div className="space-y-8 divide-y divide-light-200 border-b border-light-200 pb-8">
                                    {reviews.map(review => (
                                        <div key={review.id} className="pt-8 first:pt-0">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className="flex items-center gap-4">
                                                    <img src={review.avatar} className="w-[52px] h-[52px] rounded-full" alt="Reviewer" />
                                                    <div>
                                                        <h4 className="font-bold text-navy-900 text-[15px] mb-1">{review.author}</h4>
                                                        <div className="flex text-gold-500">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-current' : ''}`} />
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="text-[11px] font-bold text-light-500">{review.date}</span>
                                            </div>
                                            <p className="text-navy-500 text-[14px] leading-relaxed max-w-4xl">{review.content}</p>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Loan Calculator */}
                        <section id="loan-calculator" className="bg-white rounded-xl p-8 border border-light-300">
                            <h2 className="text-[28px] font-bold text-navy-900 mb-6 tracking-tight">Loan Calculator</h2>
                            <p className="text-navy-500">Our dynamic loan calculator helps you estimate your monthly payments. (Interactive module coming soon)</p>
                        </section>

                    </div>

                    {/* Right Column (Sidebar) */}
                    <aside className="w-full lg:w-[35%] xl:w-[30%] space-y-8">
                        <div className="bg-white border border-light-300 rounded-xl p-6 sticky top-[150px]">
                            <h1 className="text-2xl font-bold text-navy-900 mb-4 tracking-tight">{carData.title}</h1>
                            <div className="flex flex-wrap text-[12px] text-navy-500 gap-y-3 mb-6">
                                <span className="flex items-center w-1/2"><CarIcon className="w-4 h-4 mr-2" /> {car.miles.toLocaleString()} kms</span>
                                <span className="flex items-center w-1/2"><svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 21h18M5 21V7l8-4v18M13 3v18M19 21V11l-6-4M9 7v6M9 17v-2" /></svg> {car.fuel}</span>
                                <span className="flex items-center w-1/2 mt-2"><svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> {car.trans}</span>
                            </div>
                            <div className="text-[32px] font-black text-navy-900 mb-4">{carData.price}</div>
                            <button onClick={handleBuyNow} className="w-full bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold py-3.5 rounded-xl transition-colors mb-3">Buy Now</button>
                            <button onClick={handleAddToCart} className="w-full bg-navy-900 hover:bg-navy-800 text-gold-400 font-bold py-3.5 rounded-xl transition-colors">
                                {addedToCart ? 'Added to Cart ✓' : 'Add to Cart'}
                            </button>
                        </div>

                        {/* Recommended Vehicles */}
                        <div id="recommended" className="bg-white border border-light-300 rounded-xl p-6">
                            <h3 className="font-bold text-navy-900 text-lg mb-4 tracking-tight">Recommended Vehicles</h3>
                            <div className="space-y-4">
                                {CARS_DATA.slice(0, 4).map((item, i) => (
                                    <Link key={i} href={`/inventory/${item.id}`} className="flex gap-4 group cursor-pointer border-b border-light-200 pb-4 last:border-0 last:pb-0">
                                        <div className="w-[100px] h-[70px] rounded-lg overflow-hidden flex-shrink-0">
                                            <img src={`https://images.unsplash.com/photo-${item.img}?w=200&q=80`} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt="Rec car" />
                                        </div>
                                        <div className="flex flex-col justify-center">
                                            <h4 className="font-bold text-navy-900 text-[13px] leading-tight mb-1 group-hover:text-gold-500 transition-colors">{item.title}</h4>
                                            <span className="font-extrabold text-navy-900 text-[14px]">${item.price.toLocaleString()}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

