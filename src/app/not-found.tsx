import Link from 'next/link';
import { Home, ArrowRight, Car, Phone } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-20 bg-light-100">
            <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Visual Content */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl group">
                    <img
                        src="/images/not_found_car_premium.png"
                        alt="Page Not Found"
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8 right-8">
                        <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
                            <span className="text-gold-500 font-bold text-sm tracking-widest uppercase mb-2 block">Error Code 404</span>
                            <h2 className="text-white text-2xl font-bold">Looks like you've missed the turn.</h2>
                        </div>
                    </div>
                </div>

                {/* Text Content */}
                <div className="space-y-8">
                    <div className="space-y-4">
                        <h1 className="text-6xl md:text-8xl font-black text-navy-900 tracking-tighter">
                            404
                        </h1>
                        <h2 className="text-2xl md:text-3xl font-bold text-navy-800 tracking-tight">
                            The page you're looking for has left the showroom.
                        </h2>
                        <p className="text-navy-600 text-lg leading-relaxed max-w-md">
                            The road you're on doesn't exist. Let's get you back on track with our premium selection of vehicles.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/">
                            <Button variant="primary" size="lg" className="w-full sm:w-auto px-8 font-bold">
                                <Home className="mr-2 h-5 w-5" />
                                Back to Home
                            </Button>
                        </Link>
                        <Link href="/inventory">
                            <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 font-bold text-navy-900">
                                <Car className="mr-2 h-5 w-5" />
                                Explore Inventory
                            </Button>
                        </Link>
                    </div>

                    <div className="pt-8 border-t border-light-300">
                        <p className="text-navy-400 text-sm font-medium mb-4 uppercase tracking-widest">Need assistance?</p>
                        <div className="flex items-center gap-6">
                            <Link href="/contact" className="flex items-center text-navy-600 hover:text-gold-600 font-bold text-sm transition-colors group">
                                <Phone className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform" />
                                Contact Sales
                            </Link>
                            <Link href="/faq" className="flex items-center text-navy-600 hover:text-gold-600 font-bold text-sm transition-colors group">
                                <ArrowRight className="mr-2 h-4 w-4" />
                                View FAQ
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
