'use client';

import React, { useState } from 'react';
import { login } from '@/lib/auth';
import { useRouter } from 'next/navigation';
import { Lock, User, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export default function AdminLoginPage() {
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { showToast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Note: In a real server action setup, we'd pass this to a server-side function
            // For now, we'll simulate the logic or call an API
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (res.ok) {
                showToast('Successfully logged in to the admin dashboard.', 'success');
                router.push('/admin');
                router.refresh();
            } else {
                setError('Invalid admin password. Please try again.');
                showToast('Incorrect password.', 'error');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-navy-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="bg-gold-500 p-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-navy-900 rounded-full mb-4">
                            <Lock className="h-8 w-8 text-gold-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-navy-900">Admin Login</h1>
                        <p className="text-navy-900/70">Lithia Auto Management System</p>
                    </div>

                    <div className="p-8">
                        {error && (
                            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700 text-sm">
                                <AlertCircle className="h-5 w-5 shrink-0" />
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-navy-900 mb-2 uppercase tracking-wide">
                                    Admin Password
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-light-500" />
                                    </div>
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="block w-full pl-11 pr-4 py-3.5 bg-light-50 border border-light-300 rounded-xl text-navy-900 font-medium focus:ring-2 focus:ring-gold-500 focus:border-gold-500 outline-none transition-all"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-4 text-lg"
                            >
                                {isLoading ? 'Authenticating...' : 'Sign In'}
                            </Button>
                        </form>

                        <div className="mt-8 text-center">
                            <Link href="/" className="text-navy-500 hover:text-navy-900 text-sm font-medium transition-colors">
                                ← Back to Website
                            </Link>
                        </div>
                    </div>
                </div>

                <p className="text-center mt-6 text-navy-400 text-sm">
                    &copy; 2024 Lithia Auto Group. All rights reserved.
                </p>
            </div>
        </div>
    );
}
