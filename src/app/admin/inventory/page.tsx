'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Search, PlusCircle, Edit, Trash2, Loader2, IndianRupee, Car as CarIcon, MoreVertical, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ui/Toast';

export default function AdminInventory() {
    const { showToast } = useToast();
    const [cars, setCars] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const res = await fetch('/api/admin/inventory');
            const data = await res.json();
            if (Array.isArray(data)) {
                setCars(data);
            }
        } catch (error) {
            showToast('Failed to load inventory', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this vehicle? This will also remove images from Cloudinary.')) return;

        setIsDeleting(id);
        try {
            const res = await fetch(`/api/admin/inventory/${id}`, { method: 'DELETE' });
            if (res.ok) {
                showToast('Vehicle deleted successfully', 'success');
                setCars(prev => prev.filter(c => c._id !== id));
            } else {
                showToast('Failed to delete vehicle', 'error');
            }
        } catch (error) {
            showToast('Error deleting vehicle', 'error');
        } finally {
            setIsDeleting(null);
        }
    };

    const filteredCars = cars.filter((car: any) =>
        car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.carModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.vin.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-navy-900">Inventory Management</h1>
                    <p className="text-sm text-navy-500 mt-1">Manage comprehensive details, specs, and images for all cars.</p>
                </div>
                <Link href="/admin/inventory/new">
                    <Button variant="primary">
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add New Car
                    </Button>
                </Link>
            </div>

            <Card className="shadow-none border-light-300">
                <div className="p-4 border-b border-light-200 bg-light-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="relative w-full max-w-md">
                        <input
                            type="text"
                            placeholder="Search by Make, Model, or VIN..."
                            className="w-full bg-light-100 border border-light-300 py-2.5 pl-10 pr-4 focus:outline-none focus:border-navy-500 text-sm rounded-lg"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Search className="absolute left-3 top-3 h-4 w-4 text-navy-400" />
                    </div>
                    <div className="flex items-center gap-4 text-sm text-navy-600">
                        <span className="shrink-0">Count: {filteredCars.length}</span>
                        <select className="bg-transparent font-medium focus:outline-none border-b border-light-400 cursor-pointer py-1">
                            <option>All Vehicles</option>
                            <option>Active</option>
                            <option>Sold</option>
                        </select>
                    </div>
                </div>

                {isLoading ? (
                    <div className="py-20 flex flex-col items-center justify-center text-navy-400">
                        <Loader2 className="h-8 w-8 animate-spin mb-2" />
                        <p className="text-sm font-medium">Loading inventory...</p>
                    </div>
                ) : filteredCars.length === 0 ? (
                    <div className="py-20 text-center">
                        <div className="bg-light-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CarIcon className="h-8 w-8 text-light-400" />
                        </div>
                        <h3 className="font-bold text-navy-900">No vehicles found</h3>
                        <p className="text-navy-500 text-sm mt-1">Try adjusting your search or add a new vehicle.</p>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table View */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-light-100 border-b border-light-200">
                                        <th className="p-4 font-semibold text-xs tracking-wider uppercase text-navy-600">Vehicle</th>
                                        <th className="p-4 font-semibold text-xs tracking-wider uppercase text-navy-600">VIN / Stock</th>
                                        <th className="p-4 font-semibold text-xs tracking-wider uppercase text-navy-600">Price</th>
                                        <th className="p-4 font-semibold text-xs tracking-wider uppercase text-navy-600">Status</th>
                                        <th className="p-4 font-semibold text-xs tracking-wider uppercase text-navy-600 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-light-200">
                                    {filteredCars.map((car: any) => (
                                        <tr key={car._id} className="hover:bg-light-50 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-16 h-12 bg-light-200 shrink-0 border border-light-300 rounded overflow-hidden">
                                                        <img src={car.images?.[0] || 'https://images.unsplash.com/photo-1628155930515-8d0ab7a66cd5?auto=format&fit=crop&w=100&q=80'} alt="car thumbnail" className="w-full h-full object-cover" />
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-navy-900">{car.year} {car.make} {car.carModel}</div>
                                                        <div className="text-xs text-navy-500 line-clamp-1">{car.transmission} · {car.fuelType}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-navy-700">
                                                <div className="font-mono text-[10px] bg-light-200 px-1.5 py-0.5 rounded inline-block mb-1">{car.vin}</div>
                                                <div className="text-xs text-navy-400">{car.stockNumber || '#N/A'}</div>
                                            </td>
                                            <td className="p-4 text-sm font-bold text-navy-800">${car.price.toLocaleString()}</td>
                                            <td className="p-4">
                                                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-green-100 text-green-800">
                                                    Active
                                                </span>
                                            </td>
                                            <td className="p-4 text-right space-x-1">
                                                <Link href={`/inventory/${car._id}`} target="_blank">
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="View on Site">
                                                        <ExternalLink className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Link href={`/admin/inventory/edit/${car._id}`}>
                                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0" title="Edit">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
                                                <Button
                                                    variant="ghost"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                    title="Delete"
                                                    disabled={isDeleting === car._id}
                                                    onClick={() => handleDelete(car._id)}
                                                >
                                                    {isDeleting === car._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Tile View */}
                        <div className="md:hidden divide-y divide-light-200">
                            {filteredCars.map((car: any) => (
                                <div key={car._id} className="p-4 space-y-4">
                                    <div className="flex gap-4">
                                        <div className="w-24 h-20 bg-light-200 shrink-0 border border-light-300 rounded-lg overflow-hidden">
                                            <img src={car.images?.[0] || 'https://images.unsplash.com/photo-1628155930515-8d0ab7a66cd5?auto=format&fit=crop&w=100&q=80'} alt="car thumb" className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex justify-between items-start mb-1">
                                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[8px] font-bold uppercase bg-green-100 text-green-800">Active</span>
                                                <div className="font-bold text-navy-900">${car.price.toLocaleString()}</div>
                                            </div>
                                            <h3 className="font-bold text-navy-900 text-sm truncate">{car.year} {car.make} {car.carModel}</h3>
                                            <div className="text-[10px] text-navy-500 font-mono mt-1">{car.vin}</div>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <Link href={`/admin/inventory/edit/${car._id}`} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full h-10">
                                                <Edit className="h-4 w-4 mr-2" />
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-10 text-red-600 border-red-100 bg-red-50 px-3"
                                            disabled={isDeleting === car._id}
                                            onClick={() => handleDelete(car._id)}
                                        >
                                            {isDeleting === car._id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                )}

                {!isLoading && filteredCars.length > 0 && (
                    <div className="p-4 border-t border-light-200 bg-light-50 flex items-center justify-between text-xs font-medium text-navy-500">
                        <span>Total {filteredCars.length} result(s)</span>
                        <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="h-8 px-3" disabled>Prev</Button>
                            <Button variant="outline" size="sm" className="h-8 px-3" disabled>Next</Button>
                        </div>
                    </div>
                )}
            </Card>
        </div>
    );
}
