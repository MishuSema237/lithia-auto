'use client';

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Dynamic import to avoid SSR issues with Leaflet
const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

const LOCATIONS = [
    {
        name: 'Corporate Headquarters',
        address: '150 N Bartlett St, Medford, OR 97501',
        coords: [42.3261, -122.8741] as [number, number],
        icon: '🏢'
    },
    {
        name: 'Lithia Honda',
        address: '4095 Crater Lake Hwy, Medford, OR 97504',
        coords: [42.3601, -122.8461] as [number, number],
        icon: '📍'
    },
    {
        name: 'Lithia Hyundai of Fresno',
        address: '5590 N Blackstone Ave, Fresno, CA 93710',
        coords: [36.8192, -119.7898] as [number, number],
        icon: '📍'
    },
    {
        name: 'Lithia Nissan of Clovis',
        address: '370 W Herndon Ave, Clovis, CA 93612',
        coords: [36.8368, -119.7170] as [number, number],
        icon: '📍'
    },
    {
        name: 'Lithia Lincoln of Boise',
        address: '8853 W Fairview Ave, Boise, ID 83704',
        coords: [43.6191, -116.2891] as [number, number],
        icon: '📍'
    },
    {
        name: 'Lithia Toyota of Abilene',
        address: '4449 Southwest Dr, Abilene, TX 79606',
        coords: [32.4081, -99.7851] as [number, number],
        icon: '📍'
    },
    {
        name: 'Lithia Toyota of Billings',
        address: '1532 Grand Ave, Billings, MT 59102',
        coords: [45.7831, -108.5421] as [number, number],
        icon: '📍'
    },
    {
        name: 'Lithia Nissan of Ames',
        address: '2901 S Duff Ave, Ames, IA 50010',
        coords: [42.0011, -93.6111] as [number, number],
        icon: '📍'
    },
    {
        name: 'Lithia Hyundai of Reno',
        address: '2620 Kietzke Ln, Reno, NV 89502',
        coords: [39.4990, -119.7882] as [number, number],
        icon: '📍'
    },
    {
        name: 'Lithia Subaru of Oregon City',
        address: '1404 Main St, Oregon City, OR 97045',
        coords: [45.3624, -122.6013] as [number, number],
        icon: '📍'
    },
    {
        name: 'Mercedes-Benz of Ann Arbor',
        address: '4500 Jackson Rd, Ann Arbor, MI 48103',
        coords: [42.2831, -83.8211] as [number, number],
        icon: '📍'
    },
    {
        name: 'Jardine Motors Group',
        address: 'International Partner - Colchester, UK',
        coords: [51.8892, 0.9042] as [number, number],
        icon: '🌍'
    }
];

export function LiveMap() {
    const [isMounted, setIsMounted] = useState(false);
    const [L, setL] = useState<any>(null);

    useEffect(() => {
        setIsMounted(true);
        // Load leaflet icon fix
        import('leaflet').then((leaflet) => {
            setL(leaflet);
            // @ts-ignore
            delete leaflet.Icon.Default.prototype._getIconUrl;
            leaflet.Icon.Default.mergeOptions({
                iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
                iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
                shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
            });
        });
    }, []);

    if (!isMounted || !L) return <div className="h-[500px] w-full bg-light-200 animate-pulse rounded-3xl" />;

    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <h2 className="text-sm font-black text-primary uppercase tracking-[0.3em] mb-4">Global Network</h2>
                    <h3 className="text-4xl font-black text-navy-900 mb-6">Interactive <span className="text-primary">Showroom Map</span></h3>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Find your nearest Lithia Autos dealership. We have locations across the United States and international partners to serve you better.
                    </p>
                </div>

                <div className="h-[600px] w-full rounded-[40px] overflow-hidden border-8 border-navy-50 shadow-2xl relative z-10">
                    <MapContainer
                        center={[39.8283, -98.5795]}
                        zoom={4}
                        scrollWheelZoom={false}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        {LOCATIONS.map((loc, i) => (
                            <Marker key={i} position={loc.coords}>
                                <Popup>
                                    <div className="p-2 min-w-[200px]">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-lg">{loc.icon}</span>
                                            <h4 className="font-bold text-navy-900 m-0">{loc.name}</h4>
                                        </div>
                                        <p className="text-xs text-navy-600 m-0 mb-2">{loc.address}</p>
                                        <a 
                                            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(loc.address)}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                                        >
                                            <MapPin className="w-3 h-3" /> Get Directions
                                        </a>
                                    </div>
                                </Popup>
                            </Marker>
                        ))}
                    </MapContainer>
                </div>
            </div>
            
            <style jsx global>{`
                .leaflet-popup-content-wrapper {
                    border-radius: 16px;
                    padding: 8px;
                    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1);
                }
                .leaflet-popup-tip-container {
                    display: none;
                }
                .leaflet-popup-content {
                    margin: 8px;
                }
            `}</style>
        </section>
    );
}
