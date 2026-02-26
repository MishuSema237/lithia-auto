'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Loader2, Save, Globe, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';

interface MakeData {
    name: string;
    logoUrl: string;
    count: number;
}

export default function MakesPage() {
    const { showToast } = useToast();
    const [makes, setMakes] = useState<MakeData[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState<string | null>(null);

    useEffect(() => {
        fetchMakes();
    }, []);

    const fetchMakes = async () => {
        try {
            const res = await fetch('/api/admin/makes');
            const data = await res.json();
            if (res.ok) {
                setMakes(data);
            }
        } catch (error) {
            showToast('Failed to load makes', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateLogo = async (name: string, logoUrl: string) => {
        setIsSaving(name);
        try {
            let finalLogoUrl = logoUrl;

            // 1. If it's an external URL (not already Cloudinary), upload it to Cloudinary first.
            // This fixes Safari/iOS rendering issues with random external URLs.
            const isExternalUrl = logoUrl && !logoUrl.includes('cloudinary.com') && logoUrl.startsWith('http');
            
            if (isExternalUrl) {
                const signRes = await fetch('/api/admin/cloudinary-sign', { 
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ folder: 'lithia-auto-inventory' })
                });
                const { timestamp, signature, cloudName, apiKey } = await signRes.json();

                const fd = new FormData();
                fd.append('file', logoUrl);
                fd.append('api_key', apiKey);
                fd.append('timestamp', timestamp);
                fd.append('signature', signature);
                fd.append('folder', 'lithia-auto-inventory');

                const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
                    method: 'POST',
                    body: fd,
                });

                if (uploadRes.ok) {
                    const uploadData = await uploadRes.json();
                    finalLogoUrl = uploadData.secure_url;
                }
            }

            // 2. Save to database
            const res = await fetch('/api/admin/makes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, logoUrl: finalLogoUrl })
            });

            if (res.ok) {
                showToast(`Logo updated for ${name}`, 'success');
                // Update local state
                setMakes(prev => prev.map(m => m.name === name ? { ...m, logoUrl: finalLogoUrl } : m));
            } else {
                showToast('Failed to update logo', 'error');
            }
        } catch (error) {
            console.error('Error updating logo:', error);
            showToast('Error updating logo', 'error');
        } finally {
            setIsSaving(null);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-navy-400" />
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-navy-900">Brand Manager</h1>
                <p className="text-navy-600 mt-2">Manage logos for car makes used in your inventory.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {makes.length === 0 ? (
                    <Card className="col-span-full py-12 text-center text-navy-600">
                        No makes found in inventory. Add cars first!
                    </Card>
                ) : (
                    makes.map((make) => (
                        <Card key={make.name} className="shadow-none border-light-300 flex flex-col">
                            <div className="p-6 flex-1">
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-16 h-16 rounded-xl bg-navy-50 border border-navy-100 flex items-center justify-center overflow-hidden p-2">
                                        {make.logoUrl ? (
                                            <img src={make.logoUrl} alt={make.name} className="max-w-full max-h-full object-contain" />
                                        ) : (
                                            <ImageIcon className="w-8 h-8 text-navy-200" />
                                        )}
                                    </div>
                                    <span className="bg-navy-900 text-gold-400 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                                        {make.count} {make.count === 1 ? 'Car' : 'Cars'}
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-navy-900 mb-4">{make.name}</h3>
                                <div className="space-y-4">
                                    <div className="space-y-1.5">
                                        <label className="text-[11px] font-bold text-navy-400 uppercase tracking-wider">Logo URL</label>
                                        <input
                                            placeholder="https://..."
                                            value={make.logoUrl}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                const newVal = e.target.value;
                                                setMakes(prev => prev.map(m => m.name === make.name ? { ...m, logoUrl: newVal } : m));
                                            }}
                                            className="w-full h-10 px-3 text-sm border border-light-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 bg-white"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="px-6 py-4 bg-light-50 border-t border-light-200">
                                <Button
                                    className="w-full bg-navy-900 hover:bg-navy-800 text-white font-bold h-10 gap-2"
                                    onClick={() => handleUpdateLogo(make.name, make.logoUrl)}
                                    disabled={isSaving === make.name}
                                >
                                    {isSaving === make.name ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Save className="w-4 h-4" />
                                    )}
                                    Save Changes
                                </Button>
                            </div>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
