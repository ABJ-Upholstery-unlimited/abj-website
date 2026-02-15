"use client";

import React, { useState } from 'react';
import { ArrowRight, Info, Award, Droplets, ZoomIn } from 'lucide-react';
import clsx from 'clsx';

export type Material = {
    id: string;
    name: string;
    sample: string;      // Square PNG
    showcase: string;    // Vertical PNG (Lifestyle)
    desc: string;
    usage: string;
    durability: string;
    care: string;
    price: string;
    vibe: string;        // New property for "Moment" title
};

export const MATERIALS: Material[] = [
    {
        id: 'velvet',
        name: 'Performance Velvet',
        sample: '/assets/materials/velvet_sample.png',
        showcase: '/assets/materials/velvet_sample_showcase.png',
        desc: 'A chic statement piece that feels as good as it looks. Soft, durable, and undeniably elegant.',
        usage: 'High traffic family rooms',
        durability: 'High (100,000+ double rubs)',
        care: 'Water-based cleaners (W)',
        price: '$50 - $80',
        vibe: 'Chic'
    },
    {
        id: 'leather',
        name: 'Full-Grain Leather',
        sample: '/assets/materials/leather_sample.png',
        showcase: '/assets/materials/leather_sample_showcase.png',
        desc: 'The epitome of sophistication. Rich, authentic leather that develops a unique patina over time.',
        usage: 'Statement Chairs & Lobbies',
        durability: 'High (Lifetime Durability)',
        care: 'Condition biannually',
        price: '$144 - $252',
        vibe: 'Sophisticated'
    },
    {
        id: 'linen',
        name: 'Belgian Linen',
        sample: '/assets/materials/linen_sample.png',
        showcase: '/assets/materials/linen_sample_showcase.png',
        desc: 'Effortlessly laid-back luxury. Adds a relaxed, organic texture that breathes life into any room.',
        usage: 'Formal Sitting Areas',
        durability: 'Medium (15,000 double rubs)',
        care: 'Solvent cleaner (S) / Pro',
        price: '$20 - $40',
        vibe: 'Laid-back'
    },
    {
        id: 'boucle',
        name: 'Teddy Bouclé',
        sample: '/assets/materials/boucle_sample.png',
        showcase: '/assets/materials/boucle_sample_showcase.png',
        desc: 'An artistic choice for the bold. Sculptural texture that turns furniture into modern art.',
        usage: 'Curved Furniture & Accents',
        durability: 'Medium (30,000+ double rubs)',
        care: 'Vacuum regularly / Spot clean',
        price: '$40 - $80',
        vibe: 'Artistic'
    },
    {
        id: 'crypton',
        name: 'Crypton Tech',
        sample: '/assets/materials/crypton_sample.png',
        showcase: '/assets/materials/crypton_sample_showcase.png',
        desc: 'Truly life-proof. Engineered to withstand spills, pets, and play without sacrificing style.',
        usage: 'Dining Chairs & Kids Rooms',
        durability: 'High (50,000+ double rubs)',
        care: 'Bleach cleanable (Ratio 1:10)',
        price: '$60 - $80',
        vibe: 'Life-proof'
    },
    {
        id: 'pattern',
        name: 'Heirloom Damask',
        sample: '/assets/materials/pattern_sample.png',
        showcase: '/assets/materials/pattern_sample_showcase.png',
        desc: 'A vintage soul. Intricate woven patterns that bring timeless heritage and character to your space.',
        usage: 'Antique Frames & Formal',
        durability: 'Medium (15,000 - 30,000 rubs)',
        care: 'Professional clean only',
        price: '$40 - $60',
        vibe: 'Vintage'
    }
];

export default function MaterialShowcase() {
    const [flippedId, setFlippedId] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
            {MATERIALS.map((mat) => (
                <div
                    key={mat.id}
                    className="relative h-[400px] w-full group cursor-pointer"
                    onMouseEnter={() => setHoveredId(mat.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onClick={() => setFlippedId(flippedId === mat.id ? null : mat.id)}
                >
                    <div className={clsx(
                        "w-full h-full transition-all duration-700 ease-in-out preserve-3d shadow-xl rounded-xl",
                        flippedId === mat.id ? "rotate-y-180" : ""
                    )}>

                        {/* FRONT FACE: Showcase Image (Lifestyle) + Mood Title */}
                        <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden bg-black border border-white/10 group-hover:border-gold/50 transition-colors">
                            <div className="h-full w-full relative flex items-center justify-center bg-black overflow-hidden">

                                {/* Static Showcase Image (Zooms slightly on hover) */}
                                <img
                                    src={mat.showcase}
                                    alt={mat.name}
                                    className={clsx(
                                        "w-full h-full object-cover transition-all duration-700 ease-out",
                                        "scale-100"
                                    )}
                                />

                                {/* Dark Overlay for Text Contrast (Appears on Hover) */}
                                <div className={clsx(
                                    "absolute inset-0 bg-black/60 transition-opacity duration-500",
                                    hoveredId === mat.id ? "opacity-100" : "opacity-0"
                                )} />

                                {/* "Moment" Title Overlay (Appears on Hover) */}
                                <div className={clsx(
                                    "absolute inset-0 flex flex-col items-center justify-center transition-all duration-500",
                                    hoveredId === mat.id ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                                )}>
                                    <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-2 animate-in fade-in slide-in-from-bottom-2">The Mood</span>
                                    <h2 className="text-4xl md:text-5xl font-serif italic text-white drop-shadow-lg scale-y-110">
                                        {mat.vibe}
                                    </h2>
                                    <div className="mt-6 px-4 py-2 border border-white/30 rounded-full text-white/80 text-[10px] uppercase tracking-widest backdrop-blur-sm">
                                        Click to Explore
                                    </div>
                                </div>

                                {/* Default Title (Disappears on Hover) */}
                                <div className={clsx(
                                    "absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent transition-all duration-300",
                                    hoveredId === mat.id ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
                                )}>
                                    <h3 className="text-2xl font-serif text-white">{mat.name}</h3>
                                </div>
                            </div>
                        </div>

                        {/* BACK FACE: Sample Image + Details Overlay */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl overflow-hidden bg-white text-navy border-2 border-gold/50">
                            {/* Background Sample Image or Color */}
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                                <img
                                    src={mat.sample}
                                    alt={mat.name}
                                    className="w-[80%] h-[80%] object-contain opacity-20"
                                />
                            </div>

                            {/* Detail Overlay */}
                            <div className="absolute inset-0 bg-white/90 backdrop-blur-[2px] p-8 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center gap-4 mb-4 border-b border-navy/10 pb-4">
                                        <img src={mat.sample} className="w-12 h-12 object-contain rounded-full border border-gray-200 bg-white" />
                                        <h3 className="text-2xl font-serif text-navy">{mat.name}</h3>
                                    </div>

                                    <p className="text-navy/80 leading-relaxed mb-6 font-light text-sm italic">
                                        "{mat.desc}"
                                    </p>

                                    <div className="space-y-3 text-sm">
                                        <div className="flex gap-4">
                                            <div className="w-20 shrink-0 font-bold text-navy/40 uppercase text-xs tracking-wider">Usage</div>
                                            <div className="font-bold text-navy">{mat.usage}</div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="w-20 shrink-0 font-bold text-navy/40 uppercase text-xs tracking-wider">Durability</div>
                                            <div className="font-bold text-navy">{mat.durability}</div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="w-20 shrink-0 font-bold text-navy/40 uppercase text-xs tracking-wider">Care</div>
                                            <div className="font-bold text-navy">{mat.care}</div>
                                        </div>

                                        <div className="flex gap-4">
                                            <div className="w-20 shrink-0 font-bold text-navy/40 uppercase text-xs tracking-wider">Cost</div>
                                            <div className="font-bold text-navy">{mat.price}</div>
                                        </div>
                                    </div>
                                </div>

                                <div className="w-full py-3 bg-navy text-white text-center rounded font-bold uppercase text-xs tracking-widest mt-4 hover:bg-gold hover:text-navy transition-colors">
                                    Return to Collection
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
}
