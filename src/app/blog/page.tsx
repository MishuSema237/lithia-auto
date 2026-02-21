'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Calendar, User, MessageCircle, ChevronRight, Facebook, Linkedin, Instagram } from 'lucide-react';
import { BLOGS, BlogPost } from '@/data/blogs';
import { Partners } from '@/components/ui/Partners';

export default function BlogListingPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await fetch('/api/blog');
                if (res.ok) {
                    const data = await res.json();
                    if (data && data.length > 0) {
                        setPosts(data.map((p: any) => ({
                            id: p._id,
                            title: p.title,
                            author: p.author || 'Lithia Auto',
                            category: p.category,
                            commentsCount: p.commentsCount || 0,
                            date: p.date,
                            image: p.image,
                            excerpt: p.excerpt,
                            tags: p.tags || ['AutoDecar', 'BMW', 'Design']
                        })));
                    } else {
                        setPosts(BLOGS);
                    }
                }
            } catch (e) {
                setPosts(BLOGS);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPosts();
    }, []);

    const activePosts = posts.length > 0 ? posts : BLOGS;
    const featuredListings = activePosts.slice(0, 3);
    const categories = [
        { name: 'New car review', count: 50 },
        { name: 'First Drives', count: 34 },
        { name: 'Car Buying', count: 69 },
        { name: 'Official', count: 25 },
        { name: 'Technology', count: 12 },
        { name: 'Recalls', count: 12 },
        { name: 'Races and chases', count: 69 }
    ];
    const tags = ['AutoDecar', 'BMW', 'Design', 'Themeist', 'Land rover', 'KIA', 'Road'];

    return (
        <div className="bg-white min-h-screen font-sans py-20">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="flex flex-col lg:flex-row gap-12">

                    {/* Main Content */}
                    <main className="w-full lg:w-[68%]">
                        <div className="space-y-16">
                            {activePosts.map((post) => (
                                <article key={post.id} className="group">
                                    <div className="mb-6">
                                        <h2 className="text-3xl md:text-4xl font-black text-navy-900 mb-4 group-hover:text-gold-500 transition-colors pointer-events-auto">
                                            <Link href={`/blog/${post.id}`}>{post.title}</Link>
                                        </h2>
                                        <div className="flex flex-wrap items-center gap-6 text-[13px] text-navy-400 font-bold uppercase tracking-wider">
                                            <div className="flex items-center gap-2"><User className="w-4 h-4 text-gold-500" /> {post.author}</div>
                                            <div className="flex items-center gap-2 text-gold-600 font-black tracking-widest"><div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div> {post.category}</div>
                                            <div className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-gold-500" /> {post.commentsCount} comment</div>
                                            <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gold-500" /> {post.date}</div>
                                        </div>
                                    </div>

                                    <Link href={`/blog/${post.id}`} className="block relative h-[450px] rounded-3xl overflow-hidden mb-8 shadow-2xl">
                                        <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-navy-900/10 group-hover:bg-transparent transition-colors"></div>
                                    </Link>

                                    <p className="text-navy-500 text-lg leading-relaxed mb-10 line-clamp-3">
                                        {post.excerpt}
                                    </p>

                                    {/* Sub-images/Content area style (mimicking the image) */}
                                    {post.id === '1' && (
                                        <div className="grid grid-cols-2 gap-6 mb-10">
                                            <img src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=600" className="rounded-2xl h-48 w-full object-cover border border-light-200" alt="Sub 1" />
                                            <img src="https://images.unsplash.com/photo-1554744512-d6c5bb5d2b1f?auto=format&fit=crop&q=80&w=600" className="rounded-2xl h-48 w-full object-cover border border-light-200" alt="Sub 2" />
                                        </div>
                                    )}

                                    <div className="flex flex-wrap items-center justify-between gap-6 pt-10 border-t border-light-100">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-bold text-navy-900 uppercase tracking-widest">Tags:</span>
                                            {post.tags.map(tag => (
                                                <span key={tag} className="px-3 py-1 bg-light-50 border border-light-200 rounded-lg text-[10px] font-black text-navy-500 hover:border-gold-500 hover:text-gold-600 transition-all cursor-pointer">{tag}</span>
                                            ))}
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="text-xs font-bold text-navy-900 uppercase tracking-widest">Share:</span>
                                            <div className="flex gap-2">
                                                <button className="w-8 h-8 rounded-full bg-light-50 flex items-center justify-center hover:bg-navy-900 hover:text-white transition-all"><Facebook className="w-3 h-3" /></button>
                                                <button className="w-8 h-8 rounded-full bg-light-50 flex items-center justify-center hover:bg-navy-900 hover:text-white transition-all"><Linkedin className="w-3 h-3" /></button>
                                                <button className="w-8 h-8 rounded-full bg-light-50 flex items-center justify-center hover:bg-navy-900 hover:text-white transition-all">
                                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </main>

                    {/* Sidebar */}
                    <aside className="w-full lg:w-[32%] space-y-12">
                        {/* Search */}
                        <div className="bg-white rounded-3xl border border-light-200 p-8 shadow-sm">
                            <h3 className="text-xl font-black text-navy-900 mb-6">Search blog</h3>
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="w-full bg-light-50 border border-light-300 rounded-2xl py-4 px-12 text-navy-900 font-medium focus:outline-none focus:ring-1 focus:ring-gold-500"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-light-400" />
                            </div>
                        </div>

                        {/* Categories */}
                        <div className="bg-white rounded-3xl border border-light-200 p-8 shadow-sm">
                            <h3 className="text-xl font-black text-navy-900 mb-6">Categories</h3>
                            <ul className="space-y-4">
                                {categories.map((cat) => (
                                    <li key={cat.name} className="flex justify-between items-center group cursor-pointer">
                                        <span className="text-navy-700 font-bold group-hover:text-gold-600 transition-colors">{cat.name}</span>
                                        <span className="text-navy-400 font-bold">({cat.count})</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Featured Listings */}
                        <div className="bg-white rounded-3xl border border-light-200 p-8 shadow-sm">
                            <h3 className="text-xl font-black text-navy-900 mb-6">Featured listings</h3>
                            <div className="space-y-6">
                                {featuredListings.map((post) => (
                                    <Link key={post.id} href={`/blog/${post.id}`} className="flex gap-4 group">
                                        <div className="shrink-0 w-24 h-20 rounded-xl overflow-hidden shadow-md">
                                            <img src={post.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt={post.title} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-[14px] font-black text-navy-900 mb-2 leading-tight group-hover:text-gold-500 transition-colors line-clamp-2">{post.title}</h4>
                                            <div className="flex items-center gap-2 text-[10px] text-navy-400 font-bold uppercase tracking-widest">
                                                <Calendar className="w-3 h-3 text-gold-500" /> {post.date}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="bg-navy-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
                            <h3 className="text-xl font-black mb-4">Join our newsletter</h3>
                            <p className="text-navy-200 text-sm leading-relaxed mb-6">Signup to be the first to hear about exclusive deals, special offers and upcoming collections.</p>
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full bg-white/10 border-none rounded-xl py-4 px-6 text-white placeholder:text-navy-400 focus:outline-none focus:ring-1 focus:ring-gold-500"
                                />
                                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-gold-500 hover:text-white transition-colors">
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Popular Tags */}
                        <div className="bg-white rounded-3xl border border-light-200 p-8 shadow-sm">
                            <h3 className="text-xl font-black text-navy-900 mb-6">Popular tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.map(tag => (
                                    <span key={tag} className="px-5 py-2.5 bg-white border border-light-200 rounded-xl text-xs font-bold text-navy-500 hover:border-gold-500 hover:text-gold-600 transition-all cursor-pointer">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
            <div className="mt-20">
                <Partners />
            </div>
        </div>
    );
}
