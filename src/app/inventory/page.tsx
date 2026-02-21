'use client';

import React, { useState, useMemo } from 'react';
import { ChevronDown, X, Grid, List as ListIcon, Check, Cog } from 'lucide-react';
import { Car as CarIcon } from 'lucide-react';
import Link from 'next/link';

import { CARS_DATA } from '@/data/cars';
import { getAllMakes, getModelsForMake } from '@/lib/vpic';
import { useToast } from '@/components/ui/Toast';
import { Partners } from '@/components/ui/Partners';

export default function InventoryPage() {
    const [viewType, setViewType] = useState<'grid' | 'list'>('grid');
    const [filters, setFilters] = useState({
        make: '',
        model: '',
        body: '',
        priceRange: [0, 150000],
        yearRange: [2010, 2025],
        kmRange: [0, 200000],
        features: [] as string[]
    });

    const [makes, setMakes] = useState<string[]>([]);
    const [models, setModels] = useState<string[]>([]);
    const [isLoadingMakes, setIsLoadingMakes] = useState(false);
    const [isLoadingModels, setIsLoadingModels] = useState(false);
    const { showToast } = useToast();

    React.useEffect(() => {
        const fetchMakes = async () => {
            setIsLoadingMakes(true);
            try {
                const data = await getAllMakes();
                // Filter and sort for common brands or just take a top slice for demo purposes
                // Realistically we want common ones first
                const commonMakes = ['BMW', 'Audi', 'Mercedes-Benz', 'Toyota', 'Honda', 'Ford', 'Tesla', 'Nissan', 'Kia', 'Jeep'];
                const sortedMakes = [...new Set([...commonMakes, ...data.map((m: any) => m.Make_Name)])].sort();
                setMakes(sortedMakes);
            } catch (error) {
                console.error('Error fetching makes:', error);
                showToast('Failed to fetch vehicle makes.', 'error');
            } finally {
                setIsLoadingMakes(false);
            }
        };
        fetchMakes();
    }, []);

    React.useEffect(() => {
        const fetchModels = async () => {
            if (!filters.make) {
                setModels([]);
                return;
            }
            setIsLoadingModels(true);
            try {
                const data = await getModelsForMake(filters.make);
                setModels(data.map((m: any) => m.Model_Name).sort());
            } catch (error) {
                console.error('Error fetching models:', error);
                showToast('Failed to fetch models for this make.', 'error');
            } finally {
                setIsLoadingModels(false);
            }
        };
        fetchModels();
    }, [filters.make]);

    const filteredCars = useMemo(() => {
        return CARS_DATA.filter(car => {
            if (filters.make && car.make !== filters.make) return false;
            if (filters.body && car.type !== filters.body) return false;
            if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1]) return false;
            if (car.year < filters.yearRange[0] || car.year > filters.yearRange[1]) return false;
            if (car.miles < filters.kmRange[0] || car.miles > filters.kmRange[1]) return false;
            return true;
        });
    }, [filters]);

    const clearFilters = () => {
        setFilters({
            make: '',
            model: '',
            body: '',
            priceRange: [0, 150000],
            yearRange: [2010, 2025],
            kmRange: [0, 200000],
            features: []
        });
    };

    return (
        <div className="bg-light-100 min-h-screen py-10 font-sans">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row gap-8">

                {/* Sidebar Filters */}
                <aside className="w-full xl:w-[320px] flex-shrink-0 bg-white rounded-xl border border-light-200 p-6 h-fit">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-xl font-bold text-navy-900">Filters and Sort</h2>
                        <button
                            onClick={clearFilters}
                            className="text-sm font-semibold text-navy-500 hover:text-navy-900 flex items-center transition-colors"
                        >
                            <X className="h-4 w-4 mr-1" /> Clear
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Dropdowns */}
                        <div className="relative">
                            <select
                                value={filters.make}
                                onChange={(e) => setFilters(prev => ({ ...prev, make: e.target.value, model: '' }))}
                                className="w-full appearance-none bg-white border border-light-300 text-navy-900 font-medium py-3.5 px-4 pr-10 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 cursor-pointer disabled:opacity-50"
                                disabled={isLoadingMakes}
                            >
                                <option value="">{isLoadingMakes ? 'Loading Makes...' : 'Any Make'}</option>
                                {makes.map(make => (
                                    <option key={make} value={make}>{make}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-4 h-5 w-5 text-light-500 pointer-events-none" />
                        </div>

                        {/* Dynamic Model Dropdown */}
                        <div className="relative">
                            <select
                                value={filters.model}
                                onChange={(e) => setFilters(prev => ({ ...prev, model: e.target.value }))}
                                className="w-full appearance-none bg-white border border-light-300 text-navy-900 font-medium py-3.5 px-4 pr-10 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 cursor-pointer disabled:opacity-50"
                                disabled={!filters.make || isLoadingModels}
                            >
                                <option value="">{isLoadingModels ? 'Loading Models...' : filters.make ? 'Any Model' : 'Select Make First'}</option>
                                {models.map(model => (
                                    <option key={model} value={model}>{model}</option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-4 top-4 h-5 w-5 text-light-500 pointer-events-none" />
                        </div>

                        <div className="relative">
                            <select
                                value={filters.body}
                                onChange={(e) => setFilters(prev => ({ ...prev, body: e.target.value }))}
                                className="w-full appearance-none bg-white border border-light-300 text-navy-900 font-medium py-3.5 px-4 pr-10 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 cursor-pointer"
                            >
                                <option value="">Any Body</option>
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Hatchback">Hatchback</option>
                                <option value="Pickup Truck">Pickup Truck</option>
                                <option value="Minivan">Minivan</option>
                                <option value="Crossover">Crossover</option>
                                <option value="MVP">MVP</option>
                                <option value="Coupe">Coupe</option>
                            </select>
                            <ChevronDown className="absolute right-4 top-4 h-5 w-5 text-light-500 pointer-events-none" />
                        </div>

                        {/* Price Slider */}
                        <div className="py-2">
                            <div className="flex justify-between text-[13px] font-bold text-navy-900 mb-3">
                                <span>Price:</span>
                                <span>${filters.priceRange[0]} - ${filters.priceRange[1]}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="150000"
                                value={filters.priceRange[1]}
                                onChange={(e) => setFilters(prev => ({ ...prev, priceRange: [prev.priceRange[0], parseInt(e.target.value)] }))}
                                className="w-full h-1.5 bg-light-300 rounded-full appearance-none cursor-pointer accent-gold-500 mb-6"
                            />
                        </div>

                        {/* Year Range */}
                        <div className="py-2">
                            <div className="flex justify-between text-[13px] font-bold text-navy-900 mb-3">
                                <span>Year:</span>
                                <span>{filters.yearRange[0]} - {filters.yearRange[1]}</span>
                            </div>
                            <input
                                type="range"
                                min="2010"
                                max="2025"
                                value={filters.yearRange[1]}
                                onChange={(e) => setFilters(prev => ({ ...prev, yearRange: [prev.yearRange[0], parseInt(e.target.value)] }))}
                                className="w-full h-1.5 bg-light-300 rounded-full appearance-none cursor-pointer accent-gold-500 mb-4"
                            />
                        </div>

                        {/* KM Range */}
                        <div className="py-2">
                            <div className="flex justify-between text-[13px] font-bold text-navy-900 mb-3">
                                <span>KM:</span>
                                <span>{filters.kmRange[0]} - {filters.kmRange[1]}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="200000"
                                value={filters.kmRange[1]}
                                onChange={(e) => setFilters(prev => ({ ...prev, kmRange: [prev.kmRange[0], parseInt(e.target.value)] }))}
                                className="w-full h-1.5 bg-light-300 rounded-full appearance-none cursor-pointer accent-gold-500 mb-6"
                            />
                        </div>

                        {/* Featured Checkboxes */}
                        <div className="pt-4 border-t border-light-200">
                            <h3 className="font-bold text-navy-900 mb-4">Featured</h3>
                            <div className="space-y-3">
                                {[
                                    'A/C: Front', 'Backup Camera', 'Cruise Control', 'Navigation',
                                    'Power Locks', 'Audio system', 'Touchscreen display', 'GPS navigation',
                                    'Phone connectivity', 'In-car Wi-Fi', 'Chrome-plated grill',
                                    'Smart headlight cluster', 'Premium wheels', 'Body character lines',
                                    'High-quality paint'
                                ].map((feature, idx) => {
                                    const isSelected = filters.features.includes(feature);
                                    return (
                                        <label key={idx} className="flex items-center space-x-3 cursor-pointer group">
                                            <div
                                                onClick={() => {
                                                    setFilters(prev => ({
                                                        ...prev,
                                                        features: isSelected
                                                            ? prev.features.filter(f => f !== feature)
                                                            : [...prev.features, feature]
                                                    }));
                                                }}
                                                className={`w-5 h-5 border rounded flex items-center justify-center transition-all ${isSelected ? 'bg-gold-500 border-gold-500 text-navy-900' : 'border-light-300 group-hover:border-gold-500'}`}
                                            >
                                                {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                                            </div>
                                            <span className={`text-[15px] transition-colors ${isSelected ? 'text-navy-900 font-bold' : 'text-navy-500 group-hover:text-navy-900'}`}>{feature}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>

                    </div>
                </aside>

                <main className="w-full flex-1">

                    {/* Top Bar */}
                    <div className="flex flex-col xl:flex-row justify-between items-start xl:items-center mb-8 gap-4">
                        <div className="flex gap-2">
                            <button className="bg-navy-900 text-gold-400 font-bold py-2.5 px-6 rounded-xl text-[14px]">All Cars ({filteredCars.length})</button>
                        </div>

                        <div className="flex items-center gap-4 w-full xl:w-auto">
                            <div className="flex gap-2 border-r border-light-200 pr-4">
                                <button
                                    onClick={() => setViewType('grid')}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${viewType === 'grid' ? 'bg-navy-900 text-gold-400 shadow-lg' : 'bg-white border border-light-300 text-light-500 hover:text-navy-900'}`}
                                >
                                    <Grid className="w-5 h-5 fill-current" />
                                </button>
                                <button
                                    onClick={() => setViewType('list')}
                                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all ${viewType === 'list' ? 'bg-navy-900 text-gold-400 shadow-lg' : 'bg-white border border-light-300 text-light-500 hover:text-navy-900'}`}
                                >
                                    <ListIcon className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="relative">
                                <select className="appearance-none bg-white border border-light-300 text-navy-700 font-medium py-2.5 pl-4 pr-10 rounded-xl focus:outline-none focus:ring-1 focus:ring-gold-500 cursor-pointer text-[14px]">
                                    <option>Sort by (Default)</option>
                                    <option>Lowest Price</option>
                                    <option>Highest Price</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-3 h-4 w-4 text-light-500 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Cars Content */}
                    <div className={viewType === 'grid' ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-6"}>
                        {filteredCars.map((car) => (
                            <div key={car.id} className={`border border-light-300 rounded-2xl overflow-hidden hover:border-gold-500 transition-all duration-300 bg-white flex ${viewType === 'list' ? 'flex-row h-64' : 'flex-col'}`}>
                                <div className={`relative overflow-hidden ${viewType === 'list' ? 'w-1/3' : 'h-56'}`}>
                                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                                        <span className="bg-gold-500 text-navy-900 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">Featured</span>
                                    </div>
                                    <div className="absolute top-4 right-4 z-10">
                                        <span className="bg-navy-900/80 backdrop-blur-md text-gold-400 text-[11px] font-bold rounded-full w-9 h-9 flex items-center justify-center shadow-lg">{car.year}</span>
                                    </div>
                                    <img src={`https://images.unsplash.com/photo-${car.img}?auto=format&fit=crop&q=80&w=600&h=400`} alt={car.title} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                                </div>
                                <div className={`p-6 flex-grow flex flex-col ${viewType === 'list' ? 'justify-between' : ''}`}>
                                    <div>
                                        <div className="text-gold-500 text-[12px] font-bold mb-1.5 tracking-wide uppercase">{car.type}</div>
                                        <h3 className={`font-bold text-navy-900 mb-4 ${viewType === 'list' ? 'text-2xl' : 'text-[17px] line-clamp-1'}`}>{car.title}</h3>

                                        <div className={`flex items-center gap-4 text-[13px] text-navy-500 mb-4 ${viewType === 'list' ? 'flex-wrap' : ''}`}>
                                            <span className="flex items-center bg-light-100 px-3 py-1.5 rounded-lg"><CarIcon className="w-3.5 h-3.5 mr-2 text-navy-300" /> {car.miles.toLocaleString()} km</span>
                                            <span className="flex items-center bg-light-100 px-3 py-1.5 rounded-lg"><svg className="w-3.5 h-3.5 mr-2 text-navy-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M5 21V7l8-4v18M13 3v18M19 21V11l-6-4M9 7v6M9 17v-2" /></svg> {car.fuel}</span>
                                            <span className="flex items-center bg-light-100 px-3 py-1.5 rounded-lg"><Cog className="w-3.5 h-3.5 mr-2 text-navy-300" /> {car.trans}</span>
                                        </div>
                                    </div>

                                    <div className={`flex items-center justify-between border-t border-light-200 pt-4 ${viewType === 'list' ? 'mt-0' : 'mt-4'}`}>
                                        <div className="text-[22px] font-black text-navy-900">${car.price.toLocaleString()}</div>
                                        <Link href={`/inventory/${car.id}`} className="text-[13px] font-bold bg-navy-900 text-gold-400 border border-navy-900 rounded-full px-6 py-2.5 hover:bg-gold-500 hover:text-navy-900 hover:border-gold-500 transition-all shadow-sm active:scale-95">
                                            View car
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </main>

            </div>
            <div className="mt-20">
                <Partners />
            </div>
        </div>
    );
}
