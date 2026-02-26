'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Save, UploadCloud, Loader2, X, Link as LinkIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/Toast';

interface AgentFormProps {
    initialData?: any;
    isEdit?: boolean;
    id?: string;
}

export default function AgentForm({ initialData, isEdit, id }: AgentFormProps) {
    const { showToast } = useToast();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imageUrlInput, setImageUrlInput] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>(initialData?.image || '');

    const [formData, setFormData] = useState({
        name: initialData?.name || '',
        role: initialData?.role || '',
        image: initialData?.image || '',
        phone: initialData?.phone || '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                name: initialData.name || '',
                role: initialData.role || '',
                image: initialData.image || '',
                phone: initialData.phone || '',
            });
            setImagePreview(initialData.image || '');
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setImageUrlInput('');
        setFormData(prev => ({ ...prev, image: '' })); // Clear image in form data until upload
    };

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!imageUrlInput) return;
        setImagePreview(imageUrlInput);
        setImageFile(null);
        setFormData(prev => ({ ...prev, image: imageUrlInput }));
    };

    const removeImage = () => {
        setImageFile(null);
        setImagePreview('');
        setImageUrlInput('');
        setFormData(prev => ({ ...prev, image: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.role || (!formData.image && !imageFile)) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        setIsSubmitting(true);

        try {
            let finalImageUrl = formData.image;

            // 1. Upload to Cloudinary if a file was selected OR if it's an external URL (not already Cloudinary)
            // This ensures all images are served from Cloudinary, fixing Safari/iOS rendering issues with random external URLs.
            const isExternalUrl = formData.image && !formData.image.includes('cloudinary.com') && formData.image.startsWith('http');
            
            if (imageFile || isExternalUrl) {
                const signRes = await fetch('/api/admin/cloudinary-sign', { method: 'POST' });
                const { timestamp, signature, cloudName, apiKey } = await signRes.json();

                const fd = new FormData();
                fd.append('file', imageFile || formData.image);
                fd.append('api_key', apiKey);
                fd.append('timestamp', timestamp);
                fd.append('signature', signature);
                fd.append('folder', 'lithia-auto-agents');

                const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: 'POST',
                    body: fd,
                });

                if (!uploadRes.ok) {
                    const errorData = await uploadRes.json();
                    throw new Error(errorData.error?.message || 'Image upload failed');
                }

                const uploadData = await uploadRes.json();
                finalImageUrl = uploadData.secure_url;
            }

            // 2. Final Submit
            const payload = {
                ...formData,
                image: finalImageUrl,
            };

            const url = isEdit ? `/api/admin/agents/${id}` : '/api/admin/agents';
            const method = isEdit ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                showToast(isEdit ? 'Agent updated' : 'Agent added', 'success');
                router.push('/admin/agents');
            } else {
                const err = await res.json();
                showToast(err.error || 'Failed to save agent', 'error');
            }
        } catch (error: any) {
            console.error('Error saving agent:', error);
            showToast(error.message || 'Save failed', 'error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <Button type="button" variant="ghost" size="sm" onClick={() => router.back()} className="shrink-0">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <h1 className="text-xl md:text-2xl font-bold text-navy-900 truncate">{isEdit ? 'Edit Agent' : 'Add New Agent'}</h1>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                    <Button type="button" variant="outline" onClick={() => router.back()} className="flex-1 sm:flex-none">Cancel</Button>
                    <Button type="submit" variant="primary" disabled={isSubmitting} className="flex-1 sm:flex-none">
                        {isSubmitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Save className="h-4 w-4 mr-2" />}
                        <span className="truncate">{isEdit ? 'Save Changes' : 'Add Agent'}</span>
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card className="shadow-none border-light-300">
                        <div className="px-6 py-4 border-b border-light-200">
                            <h2 className="text-lg font-semibold text-navy-800">Basic Information</h2>
                        </div>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-navy-800">Agent Name *</label>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-light-50 border border-light-300 p-2 text-sm" placeholder="e.g. Arlene McCoy" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-navy-800">Role *</label>
                                <input type="text" name="role" value={formData.role} onChange={handleChange} className="w-full bg-light-50 border border-light-300 p-2 text-sm" placeholder="e.g. Sales Executive" required />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-navy-800">Phone (WhatsApp) - Optional</label>
                                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-light-50 border border-light-300 p-2 text-sm" placeholder="e.g. +1234567890" />
                                <p className="text-[10px] text-navy-500 italic">Enter the full number including country code for WhatsApp redirection.</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="shadow-none border-light-300">
                        <div className="px-6 py-4 border-b border-light-200">
                            <h2 className="text-lg font-semibold text-navy-800">Agent Photo</h2>
                        </div>
                        <CardContent className="p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <div className="bg-light-50 border-2 border-dashed border-light-300 rounded-xl p-6 text-center">
                                        <UploadCloud className="h-8 w-8 text-navy-400 mx-auto mb-2" />
                                        <h3 className="font-bold text-sm text-navy-900">Upload Photo</h3>
                                        <p className="text-[10px] text-navy-600 mb-3">Upload a clean profile picture.</p>
                                        <input type="file" accept="image/*" className="hidden" ref={fileInputRef} onChange={handleFileSelect} />
                                        <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                                            Select Image
                                        </Button>
                                    </div>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <span className="w-full border-t border-light-300"></span>
                                        </div>
                                        <div className="relative flex justify-center text-xs uppercase">
                                            <span className="bg-white px-2 text-navy-400">Or use URL</span>
                                        </div>
                                    </div>

                                    <div className="flex gap-2">
                                        <input type="text" value={imageUrlInput} onChange={(e) => setImageUrlInput(e.target.value)} placeholder="https://..." className="flex-1 text-xs border border-light-300 p-2 rounded" />
                                        <Button type="button" variant="navy" size="sm" onClick={handleUrlSubmit}>
                                            <LinkIcon className="h-3 w-3" />
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex flex-col items-center justify-center bg-light-50 rounded-xl border border-light-300 p-4 min-h-[200px]">
                                    {imagePreview ? (
                                        <div className="relative group">
                                            <img src={imagePreview} className="w-48 h-60 object-cover rounded-xl shadow-lg" alt="Preview" />
                                            <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors">
                                                <X className="h-4 w-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="text-center">
                                            <div className="w-48 h-60 bg-light-200 rounded-xl flex items-center justify-center text-navy-300 mx-auto mb-2 border-2 border-dashed border-light-300">
                                                Photo
                                            </div>
                                            <p className="text-[10px] text-navy-400 font-bold uppercase tracking-widest">No Image Preview</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="shadow-none border-light-300 bg-navy-50">
                        <CardContent className="p-6">
                            <h3 className="font-bold text-navy-900 mb-2">Agent Profile Tip</h3>
                            <p className="text-sm text-navy-600 leading-relaxed mb-4">
                                Use a high-quality professional portrait. Dynamic agents appear on the "About" page to help build trust with potential customers.
                            </p>
                            <ul className="text-[11px] font-bold text-navy-500 uppercase tracking-widest space-y-2">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div> Square or Portrait aspect ratio</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div> Clear background</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div> Professional attire</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
