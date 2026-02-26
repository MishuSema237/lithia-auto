'use client';

import React from 'react';

const PARTNERS = [
    { name: 'RAM', logo: 'https://logowik.com/content/uploads/images/ram-black9664.jpg' },
    { name: 'Rolls Royce', logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkwuMOG80bPYHyqVRXUDy1En-J56S9fVF2Vg&s' },
    { name: 'Volvo', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Volvo_logo.svg/640px-Volvo_logo.svg.png' },
    { name: 'Volkswagen', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Volkswagen_Logo_till_1995.svg/640px-Volkswagen_Logo_till_1995.svg.png' },
    { name: 'Lexus', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Lexus.svg/1280px-Lexus.svg.png?20241201141350' },
    { name: 'Porsche', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Porsche_wordmark_black_rgb.svg/1280px-Porsche_wordmark_black_rgb.svg.png?20241015081352' },
    { name: 'Ford', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Ford_logo_flat.svg/1280px-Ford_logo_flat.svg.png?20230831145925' },
    { name: 'Toyota', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e0/Toyota_black_logo.png/640px-Toyota_black_logo.png' },
    { name: 'Land Rover', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Land_Rover_1978_logo.svg/1280px-Land_Rover_1978_logo.svg.png?20250908093549' },
    { name: 'Kia', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/KIA_logo3.svg/1280px-KIA_logo3.svg.png?20241230161505' },
    { name: 'Subaru', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Subaru_Logo_2024.svg/640px-Subaru_Logo_2024.svg.png' },
    { name: 'McLaren', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/McLaren_2018_logo.svg/640px-McLaren_2018_logo.svg.png' },
    { name: 'Mini', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/MINI_logo.svg/960px-MINI_logo.svg.png?20231121175537' },
    { name: 'Nissan', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Nissan_logo_2001.svg/640px-Nissan_logo_2001.svg.png' },
    { name: 'Mazda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Mazda_logo_with_emblem%2C_new.svg/640px-Mazda_logo_with_emblem%2C_new.svg.png' },
    { name: 'Maserati', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Maserati_logo_2.svg/640px-Maserati_logo_2.svg.png' },
    { name: 'Lincoln', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Logo_Lincoln.svg/640px-Logo_Lincoln.svg.png' },
    { name: 'Jaguar', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/Jaguar_wordmark_2021.svg/640px-Jaguar_wordmark_2021.svg.png' },
    { name: 'Infiniti', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Infiniti_logo_1989_-_no_text.svg/640px-Infiniti_logo_1989_-_no_text.svg.png' },
    { name: 'Lamborghini', logo: 'https://upload.wikimedia.org/wikipedia/fr/thumb/1/1d/Lamborghini-Logo.svg/960px-Lamborghini-Logo.svg.png?20110820005836' },
    { name: 'Jeep', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Jeep_logo.svg/640px-Jeep_logo.svg.png' },
    { name: 'Honda', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Logo_Honda_F1.svg/640px-Logo_Honda_F1.svg.png' },
    { name: 'GMC', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/GMC-Logo.svg/640px-GMC-Logo.svg.png' },
    { name: 'Ferrari', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Ferrari_wordmark.svg/640px-Ferrari_wordmark.svg.png' },
    { name: 'FAIT', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/FIAT_logo_%282020%29.svg/640px-FIAT_logo_%282020%29.svg.png' },
    { name: 'Genesis', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/83/Genesis_division_emblem.svg/1280px-Genesis_division_emblem.svg.png?20240822194009' },
    { name: 'Dodge', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Dodge_1962_logo.svg/640px-Dodge_1962_logo.svg.png' },
    { name: 'Chrysler', logo: 'https://upload.wikimedia.org/wikipedia/it/thumb/8/8a/Logo_della_Chrysler_%28vecchio%29.svg/960px-Logo_della_Chrysler_%28vecchio%29.svg.png?_=20110627210943' },
    { name: 'Acura', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/af/Acura_logo.svg/640px-Acura_logo.svg.png' },
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

            <div className="relative flex overflow-hidden group">
                <div className="flex animate-marquee whitespace-nowrap gap-16 items-center py-4">
                    {[...PARTNERS, ...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, i) => (
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
                    display: flex;
                    animation: marquee 60s linear infinite;
                    width: max-content;
                    will-change: transform;
                    backface-visibility: hidden;
                    perspective: 1000;
                    transform: translate3d(0, 0, 0);
                }
                .group:hover .animate-marquee {
                    animation-play-state: paused;
                }
                @keyframes marquee {
                    0% { transform: translate3d(0, 0, 0); }
                    100% { transform: translate3d(-50%, 0, 0); }
                }
            `}</style>
        </section>
    );
}
