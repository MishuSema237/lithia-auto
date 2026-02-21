'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, ArrowRight, Cog, Banknote, ShieldCheck, User, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Car as CarIcon } from 'lucide-react';
import { CARS_DATA } from '@/data/cars';
import { BLOGS } from '@/data/blogs';
import { getAllMakes } from '@/lib/vpic';
import { Testimonials } from '@/components/ui/Testimonials';
import { Partners } from '@/components/ui/Partners';
import benz from '../../public/images/benz.png';
import rollsRoyce from '../../public/images/rollsRoyce.png';

const FEATURED_CARS = [
  {
    id: 1,
    make: 'Mercedes Benz',
    model: 'GLC-Class X235',
    description: 'Experience unparalleled luxury and performance with the all-new GLC-Class. Crafted for those who demand excellence on every journey.',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2000',
    specs: {
      transmission: 'AT (CTV) MT',
      engine: '1.2L',
      power: '89HP',
      torque: '110 Nm'
    }
  },
  {
    id: 2,
    make: 'Land Rover',
    model: 'Defender 110',
    description: 'The icon reimagined. Capable of great things, the Defender is built for the adventurous at heart with modern premium finishes.',
    image: 'https://images.unsplash.com/photo-1628155930515-8d0ab7a66cd5?auto=format&fit=crop&q=80&w=2000',
    specs: {
      transmission: 'Automatic',
      engine: '3.0L P400',
      power: '395HP',
      torque: '550 Nm'
    }
  },
  {
    id: 3,
    make: 'Tesla',
    model: 'Model S Plaid',
    description: 'Beyond Ludicrous. The quickest accelerating car in production today. Luxury meets sustainable high-performance technology.',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=2000',
    specs: {
      transmission: 'Single Speed',
      engine: 'Tri-Motor',
      power: '1,020HP',
      torque: '1,050 Nm'
    }
  }
];

export default function Home() {
  const [dbFeatured, setDbFeatured] = useState<any[]>([]);
  const [isFeaturedLoading, setIsFeaturedLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch('/api/inventory/featured');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setDbFeatured(data.map((c: any) => ({
              id: c._id,
              make: c.make,
              model: c.carModel,
              description: c.description || 'Experience unparalleled luxury and performance with our premium collection.',
              image: c.images?.[0] || 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=2000',
              specs: {
                transmission: c.transmission || 'Automatic',
                engine: 'Premium',
                power: 'High',
                torque: 'Optimized'
              }
            })));
          }
        }
      } catch (e) {
        console.error('Failed to fetch featured cars');
      } finally {
        setIsFeaturedLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const activeFeatured = dbFeatured.length > 0 ? dbFeatured : FEATURED_CARS;

  const latestCars = [...CARS_DATA].reverse().slice(0, 5);
  const featuredCars = CARS_DATA.filter(c => c.featured).slice(0, 4);
  const latestBlogs = BLOGS.slice(0, 3);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [currentLatestPick, setCurrentLatestPick] = useState(0);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev: number) => (prev + 1) % activeFeatured.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev: number) => (prev - 1 + activeFeatured.length) % activeFeatured.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const nextLatestPick = () => {
    setCurrentLatestPick((prev: number) => (prev + 1) % latestCars.length);
  };

  const [makes, setMakes] = useState<string[]>([]);
  const [selectedMake, setSelectedMake] = useState('');
  const [isLoadingMakes, setIsLoadingMakes] = useState(false);

  useEffect(() => {
    const fetchMakes = async () => {
      setIsLoadingMakes(true);
      try {
        const data = await getAllMakes();
        const commonMakes = ['BMW', 'Audi', 'Mercedes-Benz', 'Toyota', 'Honda', 'Ford', 'Tesla', 'Nissan', 'Kia', 'Jeep'];
        const sortedMakes = [...new Set([...commonMakes, ...data.map((m: any) => m.Make_Name)])].sort();
        setMakes(sortedMakes);
      } catch (error) {
        console.error('Error fetching makes:', error);
      } finally {
        setIsLoadingMakes(false);
      }
    };
    fetchMakes();
  }, []);

  const prevLatestPick = () => {
    setCurrentLatestPick((prev: number) => (prev - 1 + latestCars.length) % latestCars.length);
  };

  // Dynamic Brands Logic
  const brandsWithStock = Array.from(new Set(CARS_DATA.map((c: any) => c.make))).map((make: string) => {
    const count = CARS_DATA.filter((c: any) => c.make === make).length;
    const brandLogos: Record<string, string> = {
      'BMW': 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg',
      'Audi': 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi_logo_detail.svg',
      'Mercedes Benz': 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Benz_Logo_2010.svg',
      'Land Rover': 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Land_Rover_logo_2023.svg/1200px-Land_Rover_logo_2023.svg.png'
    };
    return { name: make, count, img: brandLogos[make] || 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Ford_Motor_Company_Logo.svg' };
  });

  // Dynamic Body Types Logic
  const bodyTypesWithStock = Array.from(new Set(CARS_DATA.map((c: any) => c.type))).map((type: string) => {
    const count = CARS_DATA.filter((c: any) => c.type === type).length;
    const icons: Record<string, string> = { 'SUV': '🚙', 'Sedan': '🚗', 'Hatchback': '🚗', 'Coupe': '🏎️' };
    return { name: type, count, icon: icons[type] || '🚗' };
  });

  const currentCar = activeFeatured[currentSlide];

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">

      {/* Hero Section */}
      <section className="relative w-full h-[750px] md:h-[800px] overflow-hidden">
        {/* Background Images */}
        {activeFeatured.map((car: any, index: number) => (
          <div
            key={car.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img
              src={car.image}
              alt={`${car.make} ${car.model}`}
              className="w-full h-full object-cover grayscale-[20%]"
            />
            {/* Subtle gradient overlay to ensure text readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-black/10"></div>
          </div>
        ))}

        {/* Content Container */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col pt-32 pb-20">

          <div className="flex flex-col md:flex-row h-full">

            {/* Left Column: Glass Feature Cards */}
            <div className={`hidden md:flex flex-col justify-center space-y-4 w-64 pr-10 border-r border-white/20 transition-all duration-500 ${isTransitioning ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'}`}>
              {[
                { icon: <svg className="w-8 h-8 text-white mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M8 9V7a4 4 0 118 0v2m-8 0h8M8 9h8m-8 0a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2v-6a2 2 0 00-2-2m-8 0H6" /></svg>, label: 'Transmission', value: currentCar.specs.transmission },
                { icon: <svg className="w-8 h-8 text-white mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>, label: 'Engine', value: currentCar.specs.engine },
                { icon: <svg className="w-8 h-8 text-white mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, label: 'Max Power', value: currentCar.specs.power },
                { icon: <svg className="w-8 h-8 text-white mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>, label: 'Max Torque', value: currentCar.specs.torque },
              ].map((item: any, idx: number) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-4 transition-transform hover:-translate-y-1">
                  {item.icon}
                  <div className="text-white/60 text-[11px] font-bold uppercase tracking-wider mb-0.5">{item.label}</div>
                  <div className="text-white font-bold">{item.value}</div>
                </div>
              ))}

              <Link href={`/inventory/${currentCar.id}`} className="text-white font-bold text-sm tracking-wide flex items-center mt-2 group">
                See full specs <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Middle Column: Make/Model Text */}
            <div className={`flex-1 flex flex-col justify-center px-0 md:px-12 mt-12 md:mt-0 transition-all duration-500 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
              <h1 className="text-5xl md:text-[72px] font-extrabold text-white leading-[1.1] tracking-tight mb-6">
                {currentCar.make}<br />{currentCar.model}
              </h1>
              <p className="text-white/80 text-lg md:text-xl max-w-lg mb-10 leading-relaxed font-medium">
                {currentCar.description}
              </p>
              <div className="flex items-center gap-6">
                <Link href={`/inventory/${currentCar.id}`} className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-10 py-4 rounded-xl text-[15px] transition-colors">
                  View Detail
                </Link>

                {/* Navigation Arrows */}
                <div className="flex gap-3">
                  <button
                    onClick={prevSlide}
                    className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-navy-900 transition-all"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-navy-900 transition-all"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom Search Bar Area */}
          <div className="mt-auto relative z-20">
            {/* Floating Tabs */}
            <div className="flex gap-2 mb-[-12px] relative z-20 ml-8">
              <button className="bg-navy-900 text-gold-400 border border-b-0 border-navy-800 font-bold px-8 py-3 rounded-t-xl text-[14px]">All Car</button>
              <button className="bg-black/60 backdrop-blur-md border border-b-0 border-white/20 text-white hover:bg-navy-800 hover:text-gold-400 font-bold px-8 py-3 rounded-t-xl text-[14px] transition-colors">New Car</button>
              <button className="bg-black/60 backdrop-blur-md border border-b-0 border-white/20 text-white hover:bg-navy-800 hover:text-gold-400 font-bold px-8 py-3 rounded-t-xl text-[14px] transition-colors">Used Car</button>
            </div>

            {/* The Search Bar Box */}
            <div className="bg-white rounded-2xl p-4 shadow-none border border-light-300 flex flex-col md:flex-row gap-4 items-center relative z-10 w-full max-w-5xl">
              <div className="flex-1 w-full relative">
                <select
                  value={selectedMake}
                  onChange={(e) => setSelectedMake(e.target.value)}
                  className="w-full appearance-none bg-white border border-light-300 text-navy-900 font-medium py-3.5 pl-5 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 cursor-pointer text-[15px] disabled:opacity-50"
                  disabled={isLoadingMakes}
                >
                  <option value="">{isLoadingMakes ? 'Loading Makes...' : 'Any Make'}</option>
                  {makes.map(make => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-navy-400">▼</div>
              </div>
              <div className="flex-1 w-full relative">
                <select className="w-full appearance-none bg-white border border-light-300 text-navy-900 font-medium py-3.5 pl-5 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 cursor-pointer text-[15px]">
                  <option>Any Body</option>
                  <option>Sedan</option>
                  <option>SUV</option>
                  <option>Hatchback</option>
                  <option>Coupe</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-navy-400">▼</div>
              </div>
              <div className="flex-1 w-full relative">
                <select className="w-full appearance-none bg-white border border-light-300 text-navy-900 font-medium py-3.5 pl-5 pr-10 rounded-xl focus:outline-none focus:ring-2 focus:ring-gold-500 cursor-pointer text-[15px]">
                  <option>Any Price</option>
                  <option>Under $50,000</option>
                  <option>$50,000 - $100,000</option>
                  <option>Over $100,000</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-navy-400">▼</div>
              </div>

              <button className="w-14 h-[52px] rounded-xl border border-light-300 text-navy-500 flex items-center justify-center hover:bg-light-200 transition-colors shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
              </button>

              <Link
                href={`/inventory${selectedMake ? `?make=${encodeURIComponent(selectedMake)}` : ''}`}
                className="bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold h-[52px] px-8 rounded-xl flex items-center justify-center transition-colors shrink-0 w-full md:w-auto"
              >
                Search <Search className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1. Find your dream car easily and quickly */}
      <section className="py-16 container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-navy-900 mb-2">Find your dream car easily and quickly</h2>
        <p className="text-navy-500 mb-10 text-[15px]">Browse our premium collection of new and used cars.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="border border-light-300 rounded-xl p-8 hover:-translate-y-1 hover:border-gold-500 transition-all flex flex-col h-full bg-white">
            <div className="text-gold-500 mb-6">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 00-.84-.99L16 11l-2.7-3.6a2 2 0 00-1.6-.8H9.3a2 2 0 00-1.6.8L5 11l-4.16.86a1 1 0 00-.84.99V16h3" /><circle cx="6.5" cy="16.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" /><path d="M11 21l3-3m0 0l3 3m-3-3v6" /></svg>
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-3">Browse inventory</h3>
            <p className="text-navy-500 text-[15px] mb-6 flex-grow leading-relaxed">Find the ideal car for you and browse our premium inventory.</p>
            <Link href="/inventory" className="text-navy-900 font-bold border-2 border-gold-500 rounded-lg px-6 py-3.5 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-colors">
              Search inventory <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="border border-light-300 rounded-xl p-8 hover:-translate-y-1 hover:border-gold-500 transition-all flex flex-col h-full bg-white">
            <div className="text-gold-500 mb-6">
              <Banknote size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-3">Trade-in Value</h3>
            <p className="text-navy-500 text-[15px] mb-6 flex-grow leading-relaxed">What's your car worth? Get the best value for your vehicle towards your purchase.</p>
            <Link href="/contact" className="text-navy-900 font-bold border-2 border-gold-500 rounded-lg px-6 py-3.5 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-colors">
              Get an estimate <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="border border-light-300 rounded-xl p-8 hover:-translate-y-1 hover:border-gold-500 transition-all flex flex-col h-full bg-white">
            <div className="text-gold-500 mb-6">
              <ShieldCheck size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-3">Apply For Financing</h3>
            <p className="text-navy-500 text-[15px] mb-6 flex-grow leading-relaxed">Fill out our credit approval form for your next vehicle loan directly with us.</p>
            <Link href="/contact" className="text-navy-900 font-bold border-2 border-gold-500 rounded-lg px-6 py-3.5 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-colors">
              Apply Now <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>

          <div className="border border-light-300 rounded-xl p-8 hover:-translate-y-1 hover:border-gold-500 transition-all flex flex-col h-full bg-white">
            <div className="text-gold-500 mb-6">
              <Cog size={48} strokeWidth={1.5} />
            </div>
            <h3 className="text-xl font-bold text-navy-900 mb-3">Expert Service</h3>
            <p className="text-navy-500 text-[15px] mb-6 flex-grow leading-relaxed">Our expert technicians inspect every car before we sell it to you.</p>
            <Link href="/about" className="text-navy-900 font-bold border-2 border-gold-500 rounded-lg px-6 py-3.5 flex items-center justify-center hover:bg-gold-500 hover:text-navy-900 transition-colors">
              Learn more <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Recommended Cars For You */}
      <section className="py-12 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-extrabold text-navy-900">Recommended Cars For You</h2>
          <Link href="/inventory" className="text-sm font-semibold border border-light-300 rounded-full px-5 py-2 hover:border-navy-400 transition-colors flex items-center text-navy-600">
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCars.map((car, i) => (
            <div key={car.id} className="border border-light-300 rounded-xl overflow-hidden hover:shadow-none hover:-translate-y-1 hover:border-gold-500 transition-all duration-300 bg-white flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <span className="bg-gold-500 text-navy-900 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Featured</span>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-navy-900 text-gold-400 text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">{car.year}</span>
                </div>
                <img src={`https://images.unsplash.com/photo-${car.img}?auto=format&fit=crop&q=80&w=600&h=400`} alt={car.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="text-gold-500 text-[13px] font-bold mb-2 tracking-wide uppercase">{car.type}</div>
                <h3 className="text-lg font-bold text-navy-900 mb-4 line-clamp-1">{car.title}</h3>
                <div className="flex items-center justify-between text-[13px] text-navy-500 border-b border-light-200 pb-5 mb-5">
                  <span className="flex items-center"><CarIcon className="w-4 h-4 mr-1.5 text-navy-300" /> {car.miles.toLocaleString()} km</span>
                  <span className="flex items-center"><svg className="w-4 h-4 mr-1.5 text-navy-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M5 21V7l8-4v18M13 3v18M19 21V11l-6-4M9 7v6M9 17v-2" /></svg> {car.fuel}</span>
                  <span className="flex items-center"><Cog className="w-4 h-4 mr-1.5 text-navy-300" /> {car.trans}</span>
                </div>
                <div className="text-[22px] font-extrabold text-navy-900 mb-5">${car.price.toLocaleString()}</div>

                <div className="flex items-center justify-end mt-auto">
                  <Link href={`/inventory/${car.id}`} className="text-sm font-bold bg-navy-900 text-gold-400 border border-navy-900 rounded-full px-5 py-2 hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500 transition-colors shadow-none">
                    View car
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CTA Banners */}
      <section className="py-12 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Find a car */}
          <div className="bg-navy-900 rounded-2xl overflow-hidden flex items-center p-8 md:p-12 min-h-[280px]">
            <div className="hidden md:block">
              <img src={rollsRoyce.src} className="w-60 object-cover" />
            </div>
            <div className="relative z-10 w-full lg:w-1/2 lg:ml-auto">
              <h2 className="text-[28px] font-extrabold text-gold-400 mb-3 leading-tight tracking-tight">Are you looking for a car?</h2>
              <p className="text-white/90 text-[15px] mb-8 leading-relaxed">Save time and effort. Browse our extensive inventory of premium vehicles today.</p>
              <Link href="/inventory" className="bg-gold-500 text-navy-900 font-bold rounded-lg px-8 py-3.5 inline-flex items-center hover:bg-gold-400 transition-colors">
                Find cars <Search className="ml-2.5 h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Financing */}
          <div className="bg-gold-500 rounded-2xl overflow-hidden flex items-center p-8 md:p-12 min-h-[280px]">
            <div className="hidden md:block">
              <img src={benz.src} className="w-60 object-cover" />
            </div>
            <div className="relative z-10 w-full lg:w-1/2 lg:ml-auto text-navy-900">
              <h2 className="text-[28px] font-extrabold text-navy-900 mb-3 leading-tight tracking-tight">Need Financing?</h2>
              <p className="text-navy-800 text-[15px] mb-8 leading-relaxed font-medium">Get pre-approved quickly. We offer flexible terms for your next vehicle purchase.</p>
              <Link href="/contact" className="bg-navy-900 text-gold-400 font-bold rounded-lg px-8 py-3.5 inline-flex items-center hover:bg-navy-800 transition-colors">
                Apply Now <ArrowRight className="ml-2.5 h-4 w-4" />
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* 4. Cars By Body Type */}
      <section className="py-12 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-extrabold text-navy-900 tracking-tight">Cars By Body Type</h2>
          <Link href="/inventory" className="text-sm font-semibold border border-light-300 rounded-full px-5 py-2 hover:border-navy-400 transition-colors flex items-center text-navy-600">
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="flex space-x-8 mb-10 border-b border-light-200">
          <button className="pb-4 text-[15px] font-bold text-navy-900 border-b-2 border-gold-500">All</button>
          <button className="pb-4 text-[15px] font-medium text-navy-500 hover:text-navy-900">SUV</button>
          <button className="pb-4 text-[15px] font-medium text-navy-500 hover:text-navy-900">Hatchback</button>
          <button className="pb-4 text-[15px] font-medium text-navy-500 hover:text-navy-900">Sedan</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { img: '1617531653332-bd46c24f2068', type: 'Sedan', price: '$68,804' },
            { img: '1560958089-b8a1929cea89', type: 'Hatchback', price: '$55,403' },
            { img: '1554744512-d6c5bb5d2b1f', type: 'Hatchback', price: '$57,480' },
            { img: '1628155930515-8d0ab7a66cd5', type: 'SUV', price: '$54,223' },
            { img: '1583072236894-3784bd2e3524', type: 'SUV', price: '$68,313' },
            { img: '1540209581-2292f763bb53', type: 'SUV', price: '$61,069' },
            { img: '1549317661-bd32c8ce0db2', type: 'Sedan', price: '$85,635' },
            { img: '1552519507-da3b142c6e3d', type: 'Sedan', price: '$51,365' },
          ].map((car, i) => (
            <div key={i} className="border border-light-300 rounded-xl overflow-hidden hover:shadow-none hover:-translate-y-1 hover:border-gold-500 transition-all duration-300 bg-white flex flex-col">
              <div className="relative h-56 overflow-hidden">
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  <span className="bg-gold-500 text-navy-900 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">Featured</span>
                  <span className="bg-black/40 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full flex items-center">
                    <svg className="w-3 h-3 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> 8
                  </span>
                </div>
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-navy-900 text-gold-400 text-xs font-bold rounded-full w-10 h-10 flex items-center justify-center shadow-lg">20{17 + i % 7}</span>
                </div>
                <img src={`https://images.unsplash.com/photo-${car.img}?auto=format&fit=crop&q=80&w=600&h=400`} alt="Car" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="text-gold-500 text-[13px] font-bold mb-2 tracking-wide uppercase">{car.type}</div>
                <h3 className="text-lg font-bold text-navy-900 mb-4 line-clamp-1">2017 BMV X1 xDrive 20d xline</h3>
                <div className="flex items-center justify-between text-[13px] text-navy-500 border-b border-light-200 pb-5 mb-5">
                  <span className="flex items-center"><CarIcon className="w-4 h-4 mr-1.5 text-navy-300" /> 52,015 kms</span>
                  <span className="flex items-center"><svg className="w-4 h-4 mr-1.5 text-navy-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M5 21V7l8-4v18M13 3v18M19 21V11l-6-4M9 7v6M9 17v-2" /></svg> Petrol</span>
                  <span className="flex items-center"><Cog className="w-4 h-4 mr-1.5 text-navy-300" /> Automatic</span>
                </div>
                <div className="text-[22px] font-extrabold text-navy-900 mb-5">{car.price}</div>

                <div className="flex items-center justify-end mt-auto">
                  <Link href={`/inventory/${i}`} className="text-sm font-bold bg-navy-900 text-gold-400 border border-navy-900 rounded-full px-5 py-2 hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500 transition-colors shadow-none">
                    View car
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. What would you like to find? (Brands) */}
      <section className="py-12 container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-extrabold text-navy-900 tracking-tight">What would you like to find?</h2>
          <Link href="/inventory" className="text-sm font-semibold border border-light-300 rounded-full px-5 py-2 hover:border-navy-400 transition-colors flex items-center text-navy-600">
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-6 gap-6">
          {brandsWithStock.map(brand => (
            <div key={brand.name} className="border border-light-300 rounded-xl p-8 flex flex-col items-center justify-center hover:border-gold-500 hover:shadow-none transition-all duration-300 cursor-pointer bg-white h-48 hover:-translate-y-1">
              <img src={brand.img} alt={brand.name} className="h-14 object-contain mb-5" />
              <span className="font-bold text-navy-900">{brand.name}</span>
              <span className="text-[13px] text-navy-400 mt-1 font-medium">{brand.count} Car</span>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Search by body */}
      <section className="pt-20 pb-12 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-extrabold text-navy-900 tracking-tight">Search by body</h2>
          <Link href="/inventory" className="text-sm font-semibold border border-light-300 rounded-full px-5 py-2 hover:border-navy-400 transition-colors flex items-center text-navy-600">
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 lg:gap-6">
          {bodyTypesWithStock.map(body => (
            <div key={body.name} className="border border-light-300 rounded-xl p-6 flex flex-col items-center justify-center hover:border-gold-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer bg-white">
              <div className="text-5xl mb-4 grayscale opacity-80">{body.icon}</div>
              <span className="font-bold text-navy-900 text-[15px]">{body.name}</span>
              <span className="text-[13px] text-navy-400 mt-1 font-medium">{body.count} Car</span>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Latest Picks (Slideshow) */}
      <section className="py-24 bg-navy-50 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-black text-navy-900 mb-4 tracking-tight">Latest <span className="text-gold-500">Picks</span></h2>
              <p className="text-navy-500 text-lg">Fresh arrivals from our premium inventory.</p>
            </div>
            <div className="flex gap-4">
              <button onClick={prevLatestPick} className="w-14 h-14 rounded-full border border-light-300 flex items-center justify-center text-navy-900 hover:bg-navy-900 hover:text-white transition-all bg-white shadow-sm">
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button onClick={nextLatestPick} className="w-14 h-14 rounded-full border border-light-300 flex items-center justify-center text-navy-900 hover:bg-navy-900 hover:text-white transition-all bg-white shadow-sm">
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="relative h-[550px] rounded-[40px] overflow-hidden shadow-2xl group">
            {latestCars.map((car, idx) => (
              <div key={car.id} className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === currentLatestPick ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-105 z-0'}`}>
                <img src={`https://images.unsplash.com/photo-${car.img}?auto=format&fit=crop&q=80&w=1800`} className="w-full h-full object-cover" alt={car.title} />
                <div className="absolute inset-0 bg-gradient-to-r from-navy-900/90 via-navy-900/40 to-transparent flex items-center p-8 md:p-20">
                  <div className="max-w-xl">
                    <span className="bg-gold-500 text-navy-900 text-xs font-black px-4 py-2 rounded-full uppercase tracking-[0.2em] mb-6 inline-block">New Arrival</span>
                    <h3 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight uppercase">
                      {car.title}
                    </h3>
                    <div className="flex gap-6 mb-10 text-white/80 font-bold uppercase tracking-widest text-sm">
                      <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div> {car.trans}</div>
                      <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div> {car.fuel}</div>
                      <div className="flex items-center gap-2 text-gold-500 text-xl font-black">${car.price.toLocaleString()}</div>
                    </div>
                    <Link href={`/inventory/${car.id}`} className="inline-flex items-center bg-gold-500 hover:bg-white text-navy-900 font-extrabold px-12 py-5 rounded-2xl transition-all text-sm uppercase tracking-[0.1em] group/btn">
                      Explore Details <ArrowRight className="ml-3 group-hover/btn:translate-x-2 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials integration */}
      <Testimonials title="What our collectors say" />

      {/* 8. News to help choose your car */}
      <section className="pt-12 pb-24 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-extrabold text-navy-900 tracking-tight">News to help choose your car</h2>
          <Link href="/blog" className="text-sm font-semibold border border-light-300 rounded-full px-5 py-2 hover:border-navy-400 transition-colors flex items-center text-navy-600">
            View all <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {latestBlogs.map((post) => (
            <Link key={post.id} href={`/blog/${post.id}`} className="group flex flex-col h-full">
              <div className="relative rounded-3xl overflow-hidden h-72 mb-8 shadow-xl">
                <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={post.title} />
                <div className="absolute bottom-5 left-5 bg-gold-500 text-navy-900 text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                  {post.date}
                </div>
              </div>
              <div className="flex items-center gap-3 text-[11px] mb-4 uppercase tracking-[0.2em] font-black">
                <span className="text-navy-400">{post.author}</span>
                <span className="text-gold-500">/</span>
                <span className="text-gold-500">{post.category}</span>
              </div>
              <h3 className="text-2xl font-black text-navy-900 mb-4 group-hover:text-gold-500 transition-colors leading-tight tracking-tight flex-grow">{post.title}</h3>
              <p className="text-navy-500 text-[15px] line-clamp-2 leading-relaxed mb-6 font-medium">{post.excerpt}</p>
              <div className="mt-auto flex items-center gap-2 text-gold-600 text-xs font-black uppercase tracking-widest">
                Read Article <ChevronRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Partners />

    </div>
  );
}
