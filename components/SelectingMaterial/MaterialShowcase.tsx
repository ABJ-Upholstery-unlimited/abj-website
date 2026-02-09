
"use client";

import React, { useState } from 'react';
import { ArrowRight, Info, Award, Sun, Droplets } from 'lucide-react';
import clsx from 'clsx';

type Material = {
    id: string;
    name: string;
    image: string;
    desc: string;
    durability: 'High' | 'Medium' | 'Low';
    care: string;
    price: string;
    bestFor: string;
};

const MATERIALS: Material[] = [
    {
        id: 'velvet',
        name: 'Performance Velvet',
        image: '/assets/materials/velvet_sample_showcase.png',
        desc: 'The softness of silk with the durability of steel. Our most popular choice for families.',
        durability: 'High',
        care: 'Spot clean w/ water',
        price: '$$',
        bestFor: 'Family Rooms'
    },
    {
        id: 'leather',
        name: 'Full-Grain Leather',
        image: '/assets/materials/leather_sample_showcase.png',
        desc: 'A living material that gets better with age. Authentic, breathable, and timeless.',
        durability: 'High',
        care: 'Condition biannually',
        price: '$$$$',
        bestFor: 'Statement Chairs'
    },
    {
        id: 'linen',
        name: 'Belgian Linen',
        image: '/assets/materials/linen_sample_showcase.png',
        desc: 'Naturally cooling and antimicrobial. The choice for a relaxed, sophisticated aesthetic.',
        durability: 'Medium',
        care: 'Professional clean',
        price: '$$$',
        bestFor: 'Formal Sitting'
    },
    {
        id: 'boucle',
        name: 'Teddy Bouclé',
        image: '/assets/materials/boucle_sample_showcase.png',
        desc: 'Highly textured and cozy. Adds instant dimension and warmth to modern frames.',
        durability: 'Medium',
        care: 'Vacuum regularly',
        price: '$$',
        bestFor: 'Curved Furniture'
    },
    {
        id: 'crypton',
        name: 'Crypton Tech',
        image: '/assets/materials/crypton_sample_showcase.png',
        desc: 'The gold standard in stain resistance. Liquid beads up and rolls off.',
        durability: 'High',
        care: 'Bleach cleanable (some)',
        price: '$$',
        bestFor: 'Dining Chairs'
    },
    {
        id: 'pattern',
        name: 'Heirloom Damask',
        image: '/assets/materials/pattern_sample_showcase.png',
        desc: 'Traditional woven patterns that hide wear and define an era.',
        durability: 'Medium',
        care: 'Professional clean',
        price: '$$$',
        bestFor: 'Antique Frames'
    }
];

export default function MaterialShowcase() {
    const [flippedId, setFlippedId] = useState<string | null>(null);

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
            {MATERIALS.map((mat) => (
                <div
                    key={mat.id}
                    className="relative h-[400px] w-full group cursor-pointer"
                    onClick={() => setFlippedId(flippedId === mat.id ? null : mat.id)}
                >
                    <div className={clsx(
                        "w-full h-full transition-all duration-700 ease-in-out preserve-3d shadow-xl rounded-xl",
                        flippedId === mat.id ? "rotate-y-180" : ""
                    )}>

                        {/* FRONT FACE */}
                        <div className="absolute inset-0 backface-hidden rounded-xl overflow-hidden bg-navy-900 border border-white/10 group-hover:border-gold/50 transition-colors">
                            <div className="h-full relative">
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                    style={{ backgroundImage: `url(${mat.image})` }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-8">
                                    <h3 className="text-2xl font-serif text-white mb-2">{mat.name}</h3>
                                    <div className="flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-bold">
                                        View Details <ArrowRight size={14} />
                                    </div>
                                </div>

                                {/* Floating Icon Overlay */}
                                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur rounded-full p-2 border border-white/10">
                                    <Info className="text-white" size={20} />
                                </div>
                            </div>
                        </div>

                        {/* BACK FACE */}
                        <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl overflow-hidden bg-white text-navy p-8 flex flex-col justify-between border-2 border-gold/10">
                            <div>
                                <h3 className="text-2xl font-serif text-navy mb-4 border-b border-navy/10 pb-4">{mat.name}</h3>
                                <p className="text-navy/70 leading-relaxed mb-6 font-light">
                                    {mat.desc}
                                </p>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center shrink-0">
                                            <Award size={20} className="text-gold opacity-100" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] uppercase font-bold text-navy/40">Durability</div>
                                            <div className="font-bold">{mat.durability}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center shrink-0">
                                            <Droplets size={20} className="text-blue-500 opacity-80" />
                                        </div>
                                        <div>
                                            <div className="text-[10px] uppercase font-bold text-navy/40">Care</div>
                                            <div className="font-bold">{mat.care}</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-navy/5 flex items-center justify-center shrink-0">
                                            <div className="text-green-600 font-serif font-bold">$</div>
                                        </div>
                                        <div>
                                            <div className="text-[10px] uppercase font-bold text-navy/40">Cost</div>
                                            <div className="font-bold">{mat.price}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="w-full py-3 bg-navy text-white text-center rounded font-bold uppercase text-xs tracking-widest mt-4">
                                Best for {mat.bestFor}
                            </div>
                        </div>

                    </div>
                </div>
            ))}
        </div>
    );
}
