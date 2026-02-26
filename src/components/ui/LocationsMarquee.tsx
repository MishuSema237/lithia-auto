'use client';

import React from 'react';
import { MapPin } from 'lucide-react';

const LOCATIONS = [
    {
        name: 'Corporate Headquarters',
        region: 'Medford, Oregon, USA 🇺🇸',
        address: '150 N Bartlett St, Medford, OR 97501',
        icon: '🏢'
    },
    {
        name: 'Lithia Honda',
        region: 'Medford, OR 🇺🇸',
        address: '4095 Crater Lake Hwy, Medford, OR 97504',
        icon: '📍'
    },
    {
        name: 'Lithia Hyundai of Fresno',
        region: 'Fresno, CA 🇺🇸',
        address: '5590 N Blackstone Ave, Fresno, CA 93710',
        icon: '📍'
    },
    {
        name: 'Lithia Nissan of Clovis',
        region: 'Clovis, CA 🇺🇸',
        address: '370 W Herndon Ave, Clovis, CA 93612',
        icon: '📍'
    },
    {
        name: 'Lithia Lincoln of Boise',
        region: 'Boise, ID 🇺🇸',
        address: '8853 W Fairview Ave, Boise, ID 83704',
        icon: '📍'
    },
    {
        name: 'Lithia Toyota of Abilene',
        region: 'Abilene, TX 🇺🇸',
        address: '4449 Southwest Dr, Abilene, TX 79606',
        icon: '📍'
    },
    {
        name: 'Lithia Toyota of Billings',
        region: 'Billings, MT 🇺🇸',
        address: '1532 Grand Ave, Billings, MT 59102',
        icon: '📍'
    },
    {
        name: 'Lithia Nissan of Ames',
        region: 'Ames, IA 🇺🇸',
        address: '2901 S Duff Ave, Ames, IA 50010',
        icon: '📍'
    },
    {
        name: 'Lithia Hyundai of Reno',
        region: 'Reno, NV 🇺🇸',
        address: '2620 Kietzke Ln, Reno, NV 89502',
        icon: '📍'
    },
    {
        name: 'Lithia Subaru of Oregon City',
        region: 'Oregon City, OR 🇺🇸',
        address: '1404 Main St, Oregon City, OR 97045',
        icon: '📍'
    },
    {
        name: 'Mercedes-Benz of Ann Arbor',
        region: 'Ann Arbor, MI 🇺🇸',
        address: '4500 Jackson Rd, Ann Arbor, MI 48103',
        icon: '📍'
    },
    {
        name: 'Jardine Motors Group',
        region: 'Colchester, UK 🇬🇧',
        address: 'International Partner - Colchester, UK',
        icon: '🌍'
    },
];

export function LocationsMarquee() {
    return (
        <section className="py-20 bg-light-50 overflow-hidden border-y border-light-200">
            <div className="container mx-auto px-4 mb-12">
                <div className="text-center">
                    <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-3">Explore Our</h2>
                    <h3 className="text-3xl font-black text-navy-900">Lithia <span className="text-primary">Locations</span></h3>
                </div>
            </div>

            <div className="relative flex overflow-hidden group">
                <div className="flex animate-locations-marquee whitespace-nowrap gap-8 items-stretch py-4">
                    {[...LOCATIONS, ...LOCATIONS].map((loc, i) => (
                        <div key={i} className="min-w-[320px] bg-white border border-light-200 p-6 transition-all duration-300 hover:border-primary group/card">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center text-2xl">
                                    {loc.icon}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-navy-900 group-hover/card:text-primary transition-colors">{loc.name}</h4>
                                    <p className="text-xs text-primary font-semibold mb-2">{loc.region}</p>
                                    <div className="flex items-center gap-1.5 text-navy-600">
                                        <span className="text-[11px] whitespace-normal leading-tight">{loc.address}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .animate-locations-marquee {
                    display: flex;
                    animation: locations-marquee 60s linear infinite;
                    width: max-content;
                    will-change: transform;
                    backface-visibility: hidden;
                    perspective: 1000;
                    transform: translate3d(0, 0, 0);
                }
                .group:hover .animate-locations-marquee {
                    animation-play-state: paused;
                }
                @keyframes locations-marquee {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-50%, 0, 0); }
                }
            `}</style>
        </section>
    );
}
