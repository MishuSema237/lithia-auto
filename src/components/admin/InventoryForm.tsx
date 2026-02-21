'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Save, UploadCloud, Search, Loader2, X, Plus, Link as LinkIcon, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { decodeVin } from '@/lib/vpic';
import { useToast } from '@/components/ui/Toast';

interface InventoryFormProps {
    initialData?: any;
    isEdit?: boolean;
    id?: string;
}

export default function InventoryForm({ initialData, isEdit, id }: InventoryFormProps) {
    const { showToast } = useToast();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isDecoding, setIsDecoding] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrlInput, setImageUrlInput] = useState('');

    // images state will store objects: { url: string, file?: File, status: 'existing' | 'new' }
    const [images, setImages] = useState<any[]>([]);

    const [formData, setFormData] = useState({
        vin: '',
        stockNumber: '',
        make: '',
        carModel: '',
        year: new Date().getFullYear().toString(),
        price: '',
        mileage: '',
        dealRating: 'None',
        fuelType: 'Gasoline',
        drivetrain: 'FWD',
        transmission: 'Automatic',
        condition: 'Clean title, No accidents reported',
        description: '',
        isFeatured: false
    });

    const [features, setFeatures] = useState({
        convenience: [] as string[],
        entertainment: [] as string[],
        safety: [] as string[],
        exterior: [] as string[],
        seating: [] as string[],
        other: [] as string[]
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                vin: initialData.vin || '',
                stockNumber: initialData.stockNumber || '',
                make: initialData.make || '',
                carModel: initialData.carModel || '',
                year: (initialData.year || '').toString(),
                price: (initialData.price || '').toString(),
                mileage: (initialData.mileage || '').toString(),
                dealRating: initialData.dealRating || 'None',
                fuelType: initialData.fuelType || 'Gasoline',
                drivetrain: initialData.drivetrain || 'FWD',
                transmission: initialData.transmission || 'Automatic',
                condition: initialData.condition || 'Clean title, No accidents reported',
                description: initialData.description || '',
                isFeatured: !!initialData.isFeatured
            });

            if (initialData.features) {
                setFeatures({
                    convenience: initialData.features.convenience || [],
                    entertainment: initialData.features.entertainment || [],
                    safety: initialData.features.safety || [],
                    exterior: initialData.features.exterior || [],
                    seating: initialData.features.seating || [],
                    other: initialData.features.other || []
                });
            }

            if (initialData.images) {
                setImages(initialData.images.map((url: string) => ({ url, status: 'existing' })));
            }
        }
    }, [initialData]);

    const handleVinDecode = async () => {
        if (!formData.vin || formData.vin.length < 11) {
            showToast('Please enter a valid VIN', 'error');
            return;
        }
        setIsDecoding(true);
        try {
            const data = await decodeVin(formData.vin);
            if (data) {
                setFormData(prev => ({
                    ...prev,
                    make: data.Make || prev.make,
                    carModel: data.Model || prev.carModel,
                    year: data.ModelYear ? data.ModelYear.toString() : prev.year,
                    fuelType: data.FuelTypePrimary || prev.fuelType,
                    drivetrain: data.DriveType?.includes('All') ? 'AWD' : data.DriveType?.includes('4') ? '4WD' : prev.drivetrain
                }));
                showToast('VIN decoded successfully', 'success');
            }
        } catch (e) {
            showToast('Failed to decode VIN', 'error');
        } finally {
            setIsDecoding(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target as any;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as any).checked : value
        }));
    };

    const handleFeatureChange = (category: keyof typeof features, feature: string) => {
        setFeatures(prev => {
            const current = [...prev[category]];
            if (current.includes(feature)) {
                return { ...prev, [category]: current.filter(f => f !== feature) };
            } else {
                return { ...prev, [category]: [...current, feature] };
            }
        });
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files) return;

        const newImages = Array.from(files).map(file => ({
            url: URL.createObjectURL(file),
            file,
            status: 'new'
        }));

        setImages(prev => [...prev, ...newImages]);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const addImageUrl = () => {
        if (!imageUrlInput) return;
        setImages(prev => [...prev, { url: imageUrlInput, status: 'new' }]);
        setImageUrlInput('');
    };

    const removeImage = (index: number) => {
        const img = images[index];
        if (img.status === 'new' && img.file) {
            URL.revokeObjectURL(img.url);
        }
        setImages(prev => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // 1. Upload new files if any
            const processedImages = [...images];
            const newFiles = processedImages.filter(img => img.status === 'new' && img.file);

            if (newFiles.length > 0) {
                const signRes = await fetch('/api/admin/cloudinary-sign', { method: 'POST' });
                const { timestamp, signature, cloudName, apiKey } = await signRes.json();

                for (let i = 0; i < processedImages.length; i++) {
                    const img = processedImages[i];
                    if (img.status === 'new' && img.file) {
                        const fd = new FormData();
                        fd.append('file', img.file);
                        fd.append('api_key', apiKey);
                        fd.append('timestamp', timestamp);
                        fd.append('signature', signature);
                        fd.append('folder', 'lithia-auto-inventory');

                        const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                            method: 'POST',
                            body: fd,
                        });
                        const uploadData = await uploadRes.json();
                        processedImages[i] = { url: uploadData.secure_url, status: 'existing' };
                    }
                }
            }

            // 2. Final Submit
            const payload = {
                ...formData,
                price: parseFloat(formData.price),
                mileage: parseInt(formData.mileage),
                year: parseInt(formData.year),
                images: processedImages.map(img => img.url),
                features,
                sellerInfo: {
                    name: 'Lithia Auto Advantage',
                    phone: '(708) 419-2546',
                    location: 'Bridgeview, IL'
                }
            };

            const url = isEdit ? `/api/admin/inventory/${id}` : '/api/admin/inventory';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                showToast(isEdit ? 'Vehicle updated' : 'Vehicle added', 'success');
                router.push('/admin/inventory');
            } else {
                const err = await res.json();
                showToast(err.error || 'Failed to save', 'error');
            }
        } catch (error) {
            showToast('Save failed', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Button type="button" variant="ghost" size="sm" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-2xl font-bold text-navy-900">{isEdit ? 'Edit Vehicle' : 'Add New Vehicle'}</h1>
                </div>
                <div className="flex gap-3">
                    <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                    <Button type="submit" variant="primary" disabled={isSubmitting}>
                        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                        {isEdit ? 'Save Changes' : 'Publish Vehicle'}
                    </Button>
                </div>
            </div>

            <Card className="shadow-none border-light-300">
                <div className="px-6 py-4 border-b border-light-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold text-navy-800">Basic Information</h2>
                    <label className="flex items-center gap-2 cursor-pointer bg-gold-50 px-3 py-1.5 rounded-lg border border-gold-200">
                        <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={handleChange} className="rounded border-gold-300 text-gold-500 shadow-none" />
                        <span className="text-xs font-bold text-navy-900 uppercase">Feature on Homepage</span>
                    </label>
                </div>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy-800">VIN *</label>
                        <div className="flex gap-2">
                            <input type="text" name="vin" value={formData.vin} onChange={handleChange} className="flex-1 bg-light-50 border border-light-300 p-2 text-sm uppercase" required />
                            <Button type="button" variant="outline" size="sm" onClick={handleVinDecode} disabled={isDecoding}>
                                {isDecoding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4 mr-1" />}
                                Decode
                            </Button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy-800">Stock Number</label>
                        <input type="text" name="stockNumber" value={formData.stockNumber} onChange={handleChange} className="w-full bg-light-50 border border-light-300 p-2 text-sm" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy-800">Make *</label>
                        <input type="text" name="make" value={formData.make} onChange={handleChange} className="w-full bg-light-50 border border-light-300 p-2 text-sm" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy-800">Model *</label>
                        <input type="text" name="carModel" value={formData.carModel} onChange={handleChange} className="w-full bg-light-50 border border-light-300 p-2 text-sm" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy-800">Year *</label>
                        <input type="number" name="year" value={formData.year} onChange={handleChange} className="w-full bg-light-50 border border-light-300 p-2 text-sm" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy-800">Price ($) *</label>
                        <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full bg-light-50 border border-light-300 p-2 text-sm" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy-800">Mileage (KM) *</label>
                        <input type="number" name="mileage" value={formData.mileage} onChange={handleChange} className="w-full bg-light-50 border border-light-300 p-2 text-sm" required />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy-800">Deal Rating</label>
                        <select name="dealRating" value={formData.dealRating} onChange={handleChange} className="w-full bg-light-50 border border-light-300 p-2 text-sm">
                            <option value="None">None</option>
                            <option value="Great Deal">Great Deal</option>
                            <option value="Good Deal">Good Deal</option>
                            <option value="Fair Deal">Fair Deal</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-none border-light-300">
                <div className="px-6 py-4 border-b border-light-200">
                    <h2 className="text-lg font-semibold text-navy-800">Media & Images</h2>
                </div>
                <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-light-50 border-2 border-dashed border-light-300 rounded-xl p-6 text-center">
                            <UploadCloud className="h-8 w-8 text-navy-400 mx-auto mb-2" />
                            <h3 className="font-bold text-sm text-navy-900">Upload Files</h3>
                            <p className="text-[10px] text-navy-500 mb-3">Images will be saved only after form submission.</p>
                            <input type="file" multiple accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
                            <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                                Select Images
                            </Button>
                        </div>
                        <div className="bg-light-50 border-2 border-dashed border-light-300 rounded-xl p-6 text-center">
                            <LinkIcon className="h-8 w-8 text-navy-400 mx-auto mb-2" />
                            <h3 className="font-bold text-sm text-navy-900">Image URL</h3>
                            <div className="flex gap-2 mt-3">
                                <input type="text" value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)} placeholder="https://..." className="flex-1 text-xs border border-light-300 p-2 rounded" />
                                <Button type="button" variant="navy" size="sm" onClick={addImageUrl}>Add</Button>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                        {images.map((img, idx) => (
                            <div key={idx} className="relative aspect-square rounded-lg border border-light-200 overflow-hidden group">
                                <img src={img.url} className="w-full h-full object-cover" alt="prev" />
                                <button type="button" onClick={() => removeImage(idx)} className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    <X className="h-3 w-3" />
                                </button>
                                {img.status === 'new' && (
                                    <div className="absolute bottom-1 left-1 bg-gold-400 text-navy-900 text-[8px] px-1 rounded font-bold uppercase">Unsaved</div>
                                )}
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="shadow-none border-light-300">
                <div className="px-6 py-4 border-b border-light-200">
                    <h2 className="text-lg font-semibold text-navy-800">Features & Description</h2>
                </div>
                <CardContent className="p-6 space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-semibold text-navy-800">Seller Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} rows={4} className="w-full bg-light-50 border border-light-300 p-3 text-sm" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {(Object.keys(features) as Array<keyof typeof features>).map(cat => (
                            <div key={cat}>
                                <h4 className="font-bold text-[10px] uppercase text-navy-400 mb-3 border-b border-light-200 pb-1">{cat}</h4>
                                <div className="space-y-2">
                                    {(cat === 'convenience' ? ['Adaptive Cruise', 'Heated Seats', 'Navigation', 'Keyless Start'] :
                                        cat === 'entertainment' ? ['Premium Audio', 'Apple CarPlay', 'Android Auto', 'Bluetooth'] :
                                            cat === 'safety' ? ['Backup Camera', 'Blind Spot Monitor', 'Lane Assist', 'Emergency Braking'] :
                                                cat === 'exterior' ? ['LED Lights', 'Panoramic Sunroof', 'Roof Rack', 'Tow Package'] :
                                                    cat === 'seating' ? ['Leather Seats', 'Memory Seats', 'Ventilated Seats'] :
                                                        ['Spare Tire', 'Cargo Mat', 'First Aid Kit']).map(f => (
                                                            <label key={f} className="flex items-center gap-2 cursor-pointer group">
                                                                <input type="checkbox" checked={features[cat].includes(f)} onChange={() => handleFeatureChange(cat, f)} className="rounded text-gold-500" />
                                                                <span className="text-xs text-navy-700 group-hover:text-gold-600">{f}</span>
                                                            </label>
                                                        ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </form>
    );
}
