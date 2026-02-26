'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, Star, Phone, CheckCircle2, Award, Users, ShieldCheck, Zap, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Testimonials } from '@/components/ui/Testimonials';
import { Partners } from '@/components/ui/Partners';

export default function AboutPage() {
    const [recommendedCars, setRecommendedCars] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const res = await fetch('/api/inventory');
                if (res.ok) {
                    const data = await res.json();
                    setRecommendedCars(data.slice(0, 4));
                }
            } catch (error) {
                console.error("Error fetching cars:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCars();
    }, []);

    const stats = [
        { label: 'Proven Expertise', value: '15+ Years' },
        { label: 'Visits Per Day', value: '1 Million+' },
        { label: 'Verified Sellers', value: '1,000+' }
    ];

    const features = [
        { title: 'New experience, definitely, discovery', desc: 'Experience the thrill of finding your dream car with our state-of-the-art discovery platform.', icon: <Award className="w-6 h-6" /> },
        { title: 'Pre-Owned Vehicles', desc: 'Our extensive selection of pre-owned vehicles ensures you find the quality you deserve.', icon: <CheckCircle2 className="w-6 h-6" /> },
        { title: 'Certified pre-owned vehicles', desc: 'Each certified vehicle undergoes a rigorous 200-point inspection for absolute peace of mind.', icon: <ShieldCheck className="w-6 h-6" /> },
        { title: 'Financing', desc: 'Fast approval today and drive off in a new car with our flexible financing options.', icon: <Zap className="w-6 h-6" /> }
    ];

    const [agents, setAgents] = useState<any[]>([]);
    const [isAgentsLoading, setIsAgentsLoading] = useState(true);

    const DEFAULT_AGENTS = [
        { name: 'Arlene McCoy', role: 'Administrative Staff', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400' },
        { name: 'Ronald Richards', role: 'Sales Executive', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400' },
        { name: 'Leslie Alexander', role: 'Administrative Staff', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400' },
        { name: 'Cody Fisher', role: 'Sales Executive', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400' }
    ];

    useEffect(() => {
        const fetchAgents = async () => {
            try {
                const res = await fetch('/api/agents');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setAgents(data);
                    } else {
                        setAgents(DEFAULT_AGENTS);
                    }
                } else {
                    setAgents(DEFAULT_AGENTS);
                }
            } catch (error) {
                console.error("Error fetching agents:", error);
                setAgents(DEFAULT_AGENTS);
            } finally {
                setIsAgentsLoading(false);
            }
        };
        fetchAgents();
    }, []);

    const partners = [
        'VEHICLE STORE', 'SPEEDCARE', 'CARSERVICE', 'CARTRADE', 'CARLOGO', 'TOPCARS'
    ];

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Creative Hero */}
            <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-navy-900">
                    <img
                        src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000"
                        alt="Background"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/40 to-transparent"></div>
                </div>

                <div className="relative z-10 text-center px-4 max-w-4xl">
                    <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
                        Buying and selling cars<br /><span className="text-gold-500">has never been easier!</span>
                    </h1>
                    <p className="text-navy-100 text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                        Leading online car buying and selling platform. We help you find your dream car with absolute ease.
                    </p>
                </div>
            </section>

            {/* Our Partners */}
            <Partners />

            {/* Why Choose Us */}
            <section className="py-24 bg-light-50">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-20 items-center">
                        {/* Left: Stats & Image */}
                        <div className="w-full lg:w-1/2 relative">
                            <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200"
                                    alt="Luxury Car"
                                    className="w-full h-[600px] object-cover"
                                />
                                <div className="absolute top-10 right-10 flex flex-col gap-4">
                                    {stats.map((stat, i) => (
                                        <div key={i} className="bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center gap-3 border border-white/20">
                                            <div className="w-3 h-3 rounded-full bg-gold-500"></div>
                                            <div>
                                                <p className="text-xs font-bold text-navy-400 uppercase tracking-widest">{stat.label}</p>
                                                <p className="text-lg font-black text-navy-900">{stat.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl"></div>
                        </div>

                        {/* Right: Feature Cards */}
                        <div className="w-full lg:w-1/2 space-y-12">
                            <div>
                                <h2 className="text-navy-900 font-black text-4xl md:text-5xl mb-6">Why Choose <span className="text-gold-500">Lithia Auto</span></h2>
                                <p className="text-navy-600 text-lg leading-relaxed">
                                    Our establishment deals in vehicles with many years of experience, ensuring the names become preferred choices for optimal results.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {features.map((feature, i) => (
                                    <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-light-200 hover:border-gold-500/50 transition-all hover:shadow-md group">
                                        <div className="w-12 h-12 bg-gold-100 rounded-xl flex items-center justify-center text-gold-600 mb-4 group-hover:bg-gold-500 group-hover:text-navy-900 transition-colors">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-navy-900 font-bold text-lg mb-2">{feature.title}</h3>
                                        <p className="text-navy-600 text-sm leading-relaxed">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Meet Our Team */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-black text-navy-900 mb-16">Meet Our <span className="text-gold-500">Agents</span></h2>
                    {isAgentsLoading ? (
                        <div className="py-20 flex justify-center"><Loader2 className="animate-spin h-12 w-12 text-gold-500" /></div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {agents.map((agent, i) => (
                                <div key={agent._id || i} className="group">
                                    <div className="relative mb-6 overflow-hidden rounded-2xl">
                                        <img src={agent.image} alt={agent.name} className="w-full aspect-[4/5] object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {agent.phone ? (
                                                <a 
                                                    href={`https://wa.me/${agent.phone.replace(/\D/g, '')}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 shadow-xl transition-colors"
                                                    title="WhatsApp Agent"
                                                >
                                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                                                </a>
                                            ) : (
                                                <button className="w-10 h-10 bg-gold-500 text-navy-900 rounded-full flex items-center justify-center hover:bg-gold-400 shadow-xl transition-colors">
                                                    <Phone className="w-4 h-4" />
                                                </button>
                                            )}
                                            <button className="w-10 h-10 bg-navy-900 text-gold-500 rounded-full flex items-center justify-center hover:bg-navy-800 shadow-xl transition-colors">
                                                <ChevronRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-navy-900 mb-1">{agent.name}</h3>
                                    <p className="text-navy-400 text-sm">{agent.role}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Testimonials */}
            <Testimonials bgVariant="navy" />

            {/* Recommended Vehicles */}
            <section className="py-24 bg-white overflow-hidden">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-16 px-4">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black text-navy-900 mb-4">Recommended <span className="text-gold-500">Vehicles</span></h2>
                            <p className="text-navy-600 text-lg">Specially curated selections for your premium lifestyle.</p>
                        </div>
                        <Link href="/inventory" className="hidden md:flex items-center gap-2 text-navy-900 font-bold hover:text-gold-500 transition-colors group">
                            View all <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>

                    {isLoading ? (
                        <div className="py-20 flex justify-center"><Loader2 className="animate-spin h-12 w-12 text-gold-500" /></div>
                    ) : recommendedCars.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {recommendedCars.map((car: any, i: number) => (
                                <div key={car._id || car.id || i} className="bg-white rounded-3xl border border-light-200 overflow-hidden hover:shadow-xl transition-all group">
                                    <div className="relative h-56 overflow-hidden">
                                        <img src={car.images?.[0] || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=800'} alt={car.title || 'Car'} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        {(car.isFeatured || car.featured) && (
                                            <div className="absolute top-4 left-4 bg-gold-500 text-navy-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">Featured</div>
                                        )}
                                    </div>
                                    <div className="p-6 flex flex-col h-[280px]">
                                        <p className="text-gold-600 text-[10px] font-black uppercase tracking-widest mb-2">{car.type || car.bodyType || 'Premium Series'}</p>
                                        <h3 className="text-navy-900 font-bold text-lg mb-4 line-clamp-2">{car.title || `${car.year} ${car.make} ${car.carModel}`}</h3>
                                        <div className="flex justify-between items-center text-navy-400 text-xs mb-6 mt-auto">
                                            <span>{(car.mileage || car.miles || 0).toLocaleString()} kms</span>
                                            <span>{car.fuelType || car.fuel || 'Petrol'}</span>
                                            <span>{car.transmission || car.trans || 'Auto'}</span>
                                        </div>
                                        <div className="flex justify-between items-center pt-6 border-t border-light-100">
                                            <span className="text-2xl font-black text-navy-900">${(car.price || 0).toLocaleString()}</span>
                                            <Link href={`/inventory/${car._id || car.id}`} className="bg-navy-900 text-white px-6 py-2.5 rounded-full text-xs font-bold hover:bg-gold-500 hover:text-navy-900 transition-colors shrink-0">
                                                View car
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20 text-navy-600 font-bold">No recommended vehicles available.</div>
                    )}
                </div>
            </section>
        </div>
    );
}

