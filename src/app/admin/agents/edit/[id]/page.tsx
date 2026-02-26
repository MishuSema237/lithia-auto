'use client';

import React, { useState, useEffect } from 'react';
import AgentForm from '@/components/admin/AgentForm';
import { useParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function EditAgentPage() {
    const { id } = useParams() as { id: string };
    const [agent, setAgent] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAgent = async () => {
            try {
                const res = await fetch(`/api/admin/agents/${id}`);
                if (res.ok) {
                    const data = await res.json();
                    setAgent(data);
                }
            } catch (error) {
                console.error('Error fetching agent:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAgent();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-navy-400" />
            </div>
        );
    }

    if (!agent) {
        return (
            <div className="text-center py-20">
                <h2 className="text-xl font-bold text-navy-900">Agent not found</h2>
                <p className="text-navy-600">The agent you are looking for does not exist or has been removed.</p>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto">
            <AgentForm initialData={agent} isEdit id={id} />
        </div>
    );
}
