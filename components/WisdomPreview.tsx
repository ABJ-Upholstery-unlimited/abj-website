"use client";

import { ArrowRight } from "lucide-react";

export default function WisdomPreview() {
    return (
        <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">

            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="/assets/materials/linen_sample_showcase.png"
                    alt="Fabric Selection Wisdom"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-navy/80 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-navy/50" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block animate-in fade-in slide-in-from-bottom-4 duration-700">
                    Expert Guidance
                </span>

                <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
                    Fabric Wisdom
                </h2>

                <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
                    Choosing the right fabric is about more than just color.
                    Let us help you navigate durability, texture, and care to find the perfect match for your lifestyle.
                </p>

                <a
                    href="/wisdom"
                    className="inline-flex items-center gap-3 px-8 py-4 bg-gold text-navy font-bold text-sm uppercase tracking-widest rounded hover:bg-white transition-all duration-300 transform hover:scale-105 shadow-xl animate-in fade-in zoom-in duration-700 delay-300"
                >
                    Start Fabric Guide
                    <ArrowRight size={18} />
                </a>
            </div>
        </section>
    );
}
