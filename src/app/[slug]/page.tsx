import React from 'react';
import { StaticPageWrapper } from '@/components/ui/StaticPageWrapper';

export default async function GenericStaticPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    // This is a placeholder for minor pages like Investors, Corporate Policies, etc.
    // In a real app, these might have distinct layouts, but for now we'll use a generic premium template.
    const titles: Record<string, string> = {
        'corporate-policies': 'Corporate Policies',
        'copyrights': 'Copyright Information'
    };

    const title = titles[slug] || 'Lithia Auto Information';

    return (
        <StaticPageWrapper
            title={title}
            subtitle={`Official information and essential details regarding ${title.toLowerCase()} at Lithia Auto.`}
        >
            <div className="py-10 space-y-8">
                <section>
                    <h2 className="text-2xl font-bold text-navy-900 mb-4 tracking-tight">Overview</h2>
                    <p className="text-navy-600 leading-relaxed">
                        At Lithia Auto, we maintain the highest standards of transparency and professionalism in all our operations. This page contains detailed information and official documentation regarding our {title.toLowerCase()}.
                    </p>
                </section>

                <div className="bg-navy-50 border border-light-200 p-8 rounded-2xl flex items-center justify-between group cursor-pointer hover:bg-navy-900 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-navy-900 text-gold-500 flex items-center justify-center font-bold text-lg group-hover:bg-gold-500 group-hover:text-navy-900">PDF</div>
                        <div>
                            <h4 className="font-bold text-navy-900 group-hover:text-white">Download Full Document</h4>
                            <p className="text-navy-400 text-sm group-hover:text-navy-300">Updated January 2024 • 1.2 MB</p>
                        </div>
                    </div>
                    <span className="text-2xl group-hover:text-gold-500">&darr;</span>
                </div>

                <section>
                    <h2 className="text-2xl font-bold text-navy-900 mb-4 tracking-tight">Contact Our Team</h2>
                    <p className="text-navy-600">
                        For specific inquiries related to this department, please contact our administrative office at <a href="mailto:admin@lithiaauto.com" className="text-gold-600 font-bold hover:underline">admin@lithiaauto.com</a>.
                    </p>
                </section>
            </div>
        </StaticPageWrapper>
    );
}
