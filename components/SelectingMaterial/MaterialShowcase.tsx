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
};

export const MATERIALS: Material[] = [
    {
        id: 'velvet',
        name: 'Performance Velvet',
        sample: '/assets/materials/velvet_sample.png',
        showcase: '/assets/materials/velvet_sample_showcase.png',
        desc: 'The softness of silk with the durability of steel. Our most popular choice for families.',
        usage: 'High traffic family rooms',
        durability: 'High (100,000+ double rubs)',
        care: 'Water-based cleaners (W)',
        price: '$50 - $80'
    },
    {
        id: 'leather',
        name: 'Full-Grain Leather',
        sample: '/assets/materials/leather_sample.png',
        showcase: '/assets/materials/leather_sample_showcase.png',
        desc: 'A living material that gets better with age. Authentic, breathable, and timeless.',
        usage: 'Statement Chairs & Lobbies',
        durability: 'High (Lifetime Durability)',
        care: 'Condition biannually',
        price: '$144 - $252'
    },
    {
        id: 'linen',
        name: 'Belgian Linen',
        sample: '/assets/materials/linen_sample.png',
        showcase: '/assets/materials/linen_sample_showcase.png',
        desc: 'Naturally cooling and antimicrobial. The choice for a relaxed, sophisticated aesthetic.',
        usage: 'Formal Sitting Areas',
        durability: 'Medium (15,000 double rubs)',
        care: 'Solvent cleaner (S) / Pro',
        price: '$20 - $40'
    },
    {
        id: 'boucle',
        name: 'Teddy Bouclé',
        sample: '/assets/materials/boucle_sample.png',
        showcase: '/assets/materials/boucle_sample_showcase.png',
        desc: 'Highly textured and cozy. Adds instant dimension and warmth to modern frames.',
        usage: 'Curved Furniture & Accents',
        durability: 'Medium (30,000+ double rubs)',
        care: 'Vacuum regularly / Spot clean',
        price: '$40 - $80'
    },
    {
        id: 'crypton',
        name: 'Crypton Tech',
        sample: '/assets/materials/crypton_sample.png',
        showcase: '/assets/materials/crypton_sample_showcase.png',
        desc: 'The gold standard in stain resistance. Liquid beads up and rolls off.',
        usage: 'Dining Chairs & Kids Rooms',
        durability: 'High (50,000+ double rubs)',
        care: 'Bleach cleanable (Ratio 1:10)',
        price: '$60 - $80'
    },
    {
        id: 'pattern',
        name: 'Heirloom Damask',
        sample: '/assets/materials/pattern_sample.png',
        showcase: '/assets/materials/pattern_sample_showcase.png',
        desc: 'Traditional woven patterns that hide wear and define an era.',
        usage: 'Antique Frames & Formal',
        durability: 'Medium (15,000 - 30,000 rubs)',
        care: 'Professional clean only',
        price: '$40 - $60'
    }
];

export default function MaterialShowcase() {
    const [flippedId, setFlippedId] = useState<string | null>(null);
    const [hoveredId, setHoveredId] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

    // Only track mouse if NOT flipped (for front parallax) 
    // OR if flipped (for back parallax if we want it? User didn't ask for back parallax, just "Mouse over: sample image zoom")
    // Let's keep tracking always for simplicity, but only apply effect based on side.
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, id: string) => {
        if (hoveredId !== id) return;
        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - left) / width) * 100;
        const y = ((e.clientY - top) / height) * 100;
        setMousePos({ x, y });
    };

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
            {MATERIALS.map((mat) => (
                <div
                    key={mat.id}
                    className="relative h-[400px] w-full group cursor-pointer"
                    onMouseEnter={() => setHoveredId(mat.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    onMouseMove={(e) => handleMouseMove(e, mat.id)}
                    onClick={() => setFlippedId(flippedId === mat.id ? null : mat.id)}
                >
                    <div className={clsx(
                        "w-full h-full transition-all duration-700 ease-in-out preserve-3d shadow-xl rounded-xl",
                        flippedId === mat.id ? "rotate-y-180" : ""
                    )}>

                        {/* FRONT FACE: Showcase Image (Lifestyle) + Parallax Zoom Hover */}
                        <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden bg-black border border-white/10 group-hover:border-gold/50 transition-colors">
                            <div className="h-full w-full relative flex items-center justify-center bg-black overflow-hidden">

                                {/* Static Showcase Image (Default) */}
                                <img
                                    src={mat.showcase}
                                    alt={mat.name}
                                    className={clsx(
                                        "w-full h-full object-cover transition-all duration-500",
                                        hoveredId === mat.id ? "scale-110 opacity-50" : "scale-100 opacity-100"
                                    )}
                                />

                                {/* Parallax Zoom Lens Effect (Hover) */}
                                {hoveredId === mat.id && (
                                    <div
                                        className="absolute inset-0 bg-no-repeat transition-all duration-100 ease-out"
                                        style={{
                                            backgroundImage: `url(${mat.showcase})`,
                                            backgroundSize: '140%', // Less zoom for lifestyle
                                            backgroundPosition: `${mousePos.x}% ${mousePos.y}%`
                                        }}
                                    >
                                        <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center pointer-events-none">
                                            <div className="bg-black/60 text-white px-5 py-2 rounded-full backdrop-blur-md border border-white/20 flex items-center gap-3 shadow-xl animate-in fade-in zoom-in duration-300">
                                                <ZoomIn size={18} className="text-gold" />
                                                <span className="text-xs font-bold uppercase tracking-widest">Click for details</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                <div className={clsx(
                                    "absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent transition-opacity duration-300",
                                    hoveredId === mat.id ? "opacity-0" : "opacity-100"
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
                                    Click to Flip Back
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
}
