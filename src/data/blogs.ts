export interface BlogPost {
    id: string;
    title: string;
    excerpt: string;
    content: string;
    author: string;
    category: string;
    date: string;
    image: string;
    commentsCount: number;
    tags: string[];
    isFeatured?: boolean;
}

export const BLOGS: BlogPost[] = [
    {
        id: '1',
        title: 'Get Ready For A Diesel Mild-Hybrid Toyota Fortuner In...',
        excerpt: 'The sub-4 metre SUV segment has been quite active over the last six months or so, with the launch of various facelifted models and new entries. Toyota is now preparing to shake up the market further.',
        content: `Many people are waiting for the next evolution of the Toyota Fortuner. The German luxury brand might change its mind provided enough people will be willing to pay an obscene amount of money for the 8 Series Convertible with a targa top. This Tiny EV is 14 Seconds Faster on Track than an AMG.

        The electric ferrari could cost over half a million dollars. Cadillac uncovers gorgeous coupe it should've built. Much like last year's Touring Coupe unveiled at the Concorso d'Eleganza Villa d'Este, the Skytop is just a one-off. However, the German luxury brand might change its mind provided enough people will be willing to pay an obscene amount of money for the 8 Series Convertible with a targa top.

        He believes anywhere between 20 to 25 cars could be built. Pricing wasn't mentioned but Skytop would certainly command a massive premium over the 8 Series Convertible donor car, priced at $100,500. Since the concept had the most powerful V-8 ever used by BMW, it was likely based on the M8 Convertible, available from $148,800.`,
        author: 'Kathryn Murphy',
        category: 'First Drives',
        date: 'April 6, 2024',
        image: 'https://images.unsplash.com/photo-1542362567-b052ed97f53f?auto=format&fit=crop&q=80&w=1200',
        commentsCount: 0,
        tags: ['AutoDecar', 'BMW', 'Design'],
        isFeatured: true
    },
    {
        id: '2',
        title: 'This Tiny EV is 14 Seconds Faster on Track than an AMG',
        excerpt: 'The world of electric vehicles continues to push the boundaries of performance. A new compact EV has just achieved the impossible on the Nürburgring.',
        content: 'Full details about the track-shredding performance of the latest compact EV from our partners.',
        author: 'Kathryn Murphy',
        category: 'Technology',
        date: 'February 18, 2024',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200',
        commentsCount: 12,
        tags: ['EV', 'Racing', '2026Tech'],
        isFeatured: true
    },
    {
        id: '3',
        title: 'The electric Ferrari could cost over half a million dollars',
        excerpt: 'Ferrari is entering the electric era with a statement. Reports suggest the first all-electric stallion will carry a price tag that matches its exclusivity.',
        content: 'Exploration of Ferrari\'s electric strategy and what it means for the heritage of the brand.',
        author: 'Lithia Autos Experts',
        category: 'Official',
        date: 'January 28, 2024',
        image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1200',
        commentsCount: 5,
        tags: ['Ferrari', 'Luxury']
    },
    {
        id: '4',
        title: 'Cadillac uncovers gorgeous coupe it should\'ve built',
        excerpt: 'A concept revealed recently shows what a modern Cadillac grand tourer could look like. It\'s a design that has enthusiasts begging for production.',
        content: 'Deep dive into Cadillac\'s design language and the missed opportunity of the Sollei concept.',
        author: 'Lithia Autos Experts',
        category: 'Design',
        date: 'January 28, 2024',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=1200',
        commentsCount: 8,
        tags: ['Cadillac', 'Concept']
    },
    {
        id: '5',
        title: '2024 BMW Skytop Concept: Absolute Perfection',
        excerpt: 'The Concorso d\'Eleganza Villa d\'Este has once again played host to a masterpiece. The BMW Skytop is a celebration of open-top motoring.',
        content: 'Detailed analysis of the Skytop concept and its 8-series roots.',
        author: 'Kathryn Murphy',
        category: 'First Drives',
        date: 'February 10, 2024',
        image: 'https://images.unsplash.com/photo-1555353540-64fd1b626496?auto=format&fit=crop&q=80&w=1200',
        commentsCount: 2,
        tags: ['BMW', 'Luxury']
    },
    {
        id: '6',
        title: 'Sustainable Luxury: The Future of Interior Materials',
        excerpt: 'Luxury car manufacturers are shifting away from traditional materials. Discover the high-tech, eco-friendly alternatives taking their place.',
        content: 'Insights into the leather-free and recycled materials defining the new luxury.',
        author: 'Lithia Autos Experts',
        category: 'Furniture',
        date: 'March 15, 2024',
        image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=1200',
        commentsCount: 15,
        tags: ['Sustainability', 'Interior'],
        isFeatured: true
    },
    {
        id: '7',
        title: 'Races and Chases: The Best Car Movies of 2024',
        excerpt: 'From high-speed documentaries to blockbuster action, this year has been a treat for car enthusiasts on the big screen.',
        content: 'Our top picks for the most thrilling automotive cinema of the year.',
        author: 'Lithia Autos Experts',
        category: 'Races and chases',
        date: 'March 20, 2024',
        image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1200',
        commentsCount: 69,
        tags: ['Movies', 'Culture']
    },
    {
        id: '8',
        title: 'Managing Recalls: What Every Owner Should Know',
        excerpt: 'Safety is paramount. We explain the process of handling manufacturer recalls and how Lithia Autos assists its clients.',
        content: 'A guide to staying informed about your vehicle\'s safety status.',
        author: 'LithiaAuto Experts',
        category: 'Recalls',
        date: 'May 1, 2024',
        image: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1200',
        commentsCount: 12,
        tags: ['Safety', 'Service']
    }
];
