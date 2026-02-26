'use client';

import React, { useState, useEffect } from 'react';
import InventoryForm from '@/components/admin/InventoryForm';
import { useToast } from '@/components/ui/Toast';
import { Loader2 } from 'lucide-react';

export default function EditInventoryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const { showToast } = useToast();
    const [car, setCar] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await fetch(`/api/admin/inventory/${id}`);
                const data = await res.json();
                if (res.ok) {
                    setCar(data);
                } else {
                    showToast('Failed to load vehicle data', 'error');
                }
            } catch (error) {
                showToast('Error fetching vehicle', 'error');
            } finally {
                setIsLoading(false);
            }
        };
        fetchCar();
    }, [id, showToast]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-navy-400" />
            </div>
        );
    }

    if (!car) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold text-navy-900">Vehicle not found</h2>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <InventoryForm initialData={car} isEdit={true} id={id} />
        </div>
    );
}
