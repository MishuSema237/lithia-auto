'use client';

import React from 'react';
import Link from 'next/link';
import { Calendar, User, MessageCircle, ChevronLeft, Facebook, Linkedin, Instagram, ArrowRight, Share2, Tag } from 'lucide-react';
import { BLOGS } from '@/data/blogs';
import { notFound } from 'next/navigation';

export default function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = React.use(params);
    const post = BLOGS.find(p => p.id === id);

    if (!post) {
        notFound();
    }

    const relatedPosts = BLOGS.filter(p => p.id !== post.id).slice(0, 3);

    return (
        <div className="bg-white min-h-screen font-sans">
            {/* Header / Breadcrumb */}
            <div className="bg-light-50 py-10 border-b border-light-200">
                <div className="container mx-auto px-4">
                    <Link href="/blog" className="inline-flex items-center text-navy-500 hover:text-navy-900 font-bold text-sm mb-6 transition-colors group">
                        <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" /> Back to Blog
                    </Link>
                    <h1 className="text-3xl md:text-5xl font-black text-navy-900 leading-tight max-w-4xl">{post.title}</h1>
                </div>
            </div>

            <div className="py-20 lg:py-32">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Meta */}
                    <div className="flex flex-wrap items-center gap-6 text-[13px] text-navy-400 font-bold uppercase tracking-wider mb-12 pb-12 border-b border-light-100">
                        <div className="flex items-center gap-2"><User className="w-4 h-4 text-gold-500" /> {post.author}</div>
                        <div className="flex items-center gap-2 text-gold-600 font-black tracking-widest"><div className="w-1.5 h-1.5 rounded-full bg-gold-500"></div> {post.category}</div>
                        <div className="flex items-center gap-2"><MessageCircle className="w-4 h-4 text-gold-500" /> {post.commentsCount} comments</div>
                        <div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gold-500" /> {post.date}</div>
                    </div>

                    {/* Featured Image */}
                    <div className="relative h-[400px] md:h-[600px] rounded-[40px] overflow-hidden mb-16 shadow-2xl">
                        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
                    </div>

                    {/* Content */}
                    <div className="prose prose-lg max-w-none prose-navy">
                        <p className="text-2xl font-bold text-navy-900 leading-relaxed mb-10">
                            {post.excerpt}
                        </p>
                        <div className="text-navy-600 space-y-8 leading-loose text-lg whitespace-pre-line">
                            {post.content}
                        </div>
                    </div>

                    {/* Tags & Share */}
                    <div className="mt-20 pt-10 border-t border-light-100 flex flex-col md:flex-row justify-between items-center gap-8">
                        <div className="flex items-center gap-4">
                            <Tag className="w-5 h-5 text-gold-500" />
                            <div className="flex gap-2">
                                {post.tags.map(tag => (
                                    <span key={tag} className="px-4 py-2 bg-light-50 border border-light-200 rounded-xl text-xs font-black text-navy-500 hover:border-gold-500 hover:text-gold-600 transition-all cursor-pointer uppercase tracking-widest">{tag}</span>
                                ))}
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="text-xs font-black text-navy-400 uppercase tracking-widest">Share this post:</span>
                            <div className="flex gap-3">
                                <a href="#" className="w-10 h-10 rounded-full border border-light-200 flex items-center justify-center text-navy-400 hover:bg-navy-900 hover:text-white transition-all transform hover:-translate-y-1"><Facebook className="w-4 h-4" /></a>
                                <a href="#" className="w-10 h-10 rounded-full border border-light-200 flex items-center justify-center text-navy-400 hover:bg-navy-900 hover:text-white transition-all transform hover:-translate-y-1"><Linkedin className="w-4 h-4" /></a>
                                <a href="#" className="w-10 h-10 rounded-full border border-light-200 flex items-center justify-center text-navy-400 hover:bg-navy-900 hover:text-white transition-all transform hover:-translate-y-1">
                                    <Share2 className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Related Posts */}
                    <div className="mt-32">
                        <h2 className="text-3xl font-black text-navy-900 mb-12">Related <span className="text-gold-500">posts</span></h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {relatedPosts.map(p => (
                                <Link key={p.id} href={`/blog/${p.id}`} className="group">
                                    <div className="h-48 rounded-2xl overflow-hidden mb-6 shadow-lg">
                                        <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={p.title} />
                                    </div>
                                    <h4 className="text-lg font-black text-navy-900 group-hover:text-gold-500 transition-colors line-clamp-2">{p.title}</h4>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
