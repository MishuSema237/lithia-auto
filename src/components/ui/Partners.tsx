'use client';

import React from 'react';

const PARTNERS = [
    { name: 'BMW', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg' },
    { name: 'Mercedes', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Benz_Logo_2010.svg' },
    { name: 'Audi', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/92/Audi_logo_detail.svg' },
    { name: 'Tesla', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg' },
    { name: 'Lexus', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Lexus_logo.svg' },
    { name: 'Porsche', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d8/Porsche_logo.svg' },
    { name: 'Ford', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a0/Ford_Motor_Company_Logo.svg' },
    { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_carlogo.svg' },
    { name: 'Land Rover', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Land_Rover_logo_2023.svg/1200px-Land_Rover_logo_2023.svg.png' },
    { name: 'Kia', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/47/KIA_logo_2021.svg' },
];

export function Partners() {
    return (
        <section className="py-20 bg-white overflow-hidden border-y border-light-200">
            <div className="container mx-auto px-4 mb-12">
                <div className="text-center">
                    <h2 className="text-sm font-black text-gold-500 uppercase tracking-[0.3em] mb-3">Our Trusted</h2>
                    <h3 className="text-3xl font-black text-navy-900">Partners & <span className="text-gold-500">Brands</span></h3>
                </div>
            </div>

            <div className="relative flex">
                <div className="flex animate-marquee whitespace-nowrap gap-16 items-center py-4">
                    {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                        <div key={i} className="flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer px-8">
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="h-12 w-auto object-contain max-w-[120px]"
                            />
                        </div>
                    ))}
                </div>

                {/* Second set for seamless loop */}
                <div className="absolute top-0 flex animate-marquee2 whitespace-nowrap gap-16 items-center py-4">
                    {[...PARTNERS, ...PARTNERS].map((partner, i) => (
                        <div key={i} className="flex items-center justify-center grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-500 cursor-pointer px-8">
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                className="h-12 w-auto object-contain max-w-[120px]"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .animate-marquee {
                    animation: marquee 40s linear infinite;
                }
                .animate-marquee2 {
                    animation: marquee2 40s linear infinite;
                }
                @keyframes marquee {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
                @keyframes marquee2 {
                    0% { transform: translateX(50%); }
                    100% { transform: translateX(0); }
                }
            `}</style>
        </section>
    );
}
