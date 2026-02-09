
"use client";

import React, { useState } from 'react';
import { ChevronRight, ArrowRight, Download, RefreshCw, Check } from 'lucide-react';

type Answer = 'heavy' | 'light' | 'pets' | 'clean' | 'plush' | 'sleek';

export default function FabricWizard() {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState<string[]>([]);
    const [recommendation, setRecommendation] = useState<any>(null);

    const questions = [
        {
            id: 1,
            question: "Where will this piece live?",
            options: [
                { value: 'heavy', label: "High Traffic Living Room", icon: "🏠", desc: "Daily use, kids, potential spills." },
                { value: 'light', label: "Formal Sitting Area", icon: "✨", desc: "Occasional use, decorative focus." },
                { value: 'commercial', label: "Commercial Space", icon: "🏢", desc: "Restaurants, lobbies, offices." }
            ]
        },
        {
            id: 2,
            question: "Who uses it most?",
            options: [
                { value: 'pets', label: "Pets & Kids", icon: "🐾", desc: "Needs to be indestructible and washable." },
                { value: 'adults', label: "Adults Only", icon: "🥂", desc: "We can prioritize luxury over utility." },
                { value: 'sun', label: "Direct Sunlight", icon: "☀️", desc: "UV resistance is a priority." }
            ]
        },
        {
            id: 3,
            question: "What's your style preference?",
            options: [
                { value: 'plush', label: "Soft & Cozy", icon: "🧸", desc: "Velvets, chenilles, textures you sink into." },
                { value: 'sleek', label: "Sleek & Cool", icon: "🧊", desc: "Leathers, fine linens, tight weaves." },
                { value: 'bold', label: "Bold & Patterned", icon: "🎨", desc: "Statement pieces that pop." }
            ]
        }
    ];

    const handleAnswer = (value: string) => {
        const newAnswers = [...answers, value];
        setAnswers(newAnswers);

        if (step < 3) {
            setStep(step + 1);
        } else {
            calculateResult(newAnswers);
        }
    };

    const calculateResult = (finalAnswers: string[]) => {
        // Simple logic engine
        let result = {
            title: "Performance Velvet",
            subtitle: "The Indestructible Luxury",
            desc: "You need something tough but beautiful. Performance velvet offers extreme durability (100k+ double rubs) while remaining soft to the touch and easy to clean.",
            image: "/assets/materials/velvet_sample.png",
            pros: ["Stain Resistant", "Pet Friendly", "Luxurious Feel"],
            bestFor: "High traffic family rooms"
        };

        if (finalAnswers.includes('commercial') || (finalAnswers.includes('heavy') && finalAnswers.includes('sleek'))) {
            result = {
                title: "Top-Grain Leather",
                subtitle: "Timeless & Aging Beautifully",
                desc: "Leather is the ultimate investment. It lasts 4x longer than fabric, wipes clean instantly, and develops a rich patina over time.",
                image: "/assets/materials/leather_sample.png",
                pros: ["Wipeable", "Hypoallergenic", "Extreme Durability"],
                bestFor: "Lobbies & Busy Living Rooms"
            };
        } else if (finalAnswers.includes('pets') && finalAnswers.includes('plush')) {
            result = {
                title: "Crypton Fabric",
                subtitle: "Engineered Protection",
                desc: "Crypton isn't just a technology built into the fiber that repels stains, odors, and bacteria. Perfect for homes with pets.",
                image: "/assets/materials/crypton_sample.png",
                pros: ["Water Repellant", "Odor Resistant", "Easy Clean"],
                bestFor: "Homes with Pets & Kids"
            };
        } else if (finalAnswers.includes('light') && finalAnswers.includes('sleek')) {
            result = {
                title: "Belgian Linen",
                subtitle: "Organic Elegance",
                desc: "Nothing beats the crisp, natural hand of fine linen. Ideally suited for low-traffic areas where aesthetic texture is paramount.",
                image: "/assets/materials/linen_sample.png",
                pros: ["Breathable", "Natural", "Sophisticated"],
                bestFor: "Formal spaces"
            };
        }

        setRecommendation(result);
        setStep(4);
    };

    const reset = () => {
        setStep(1);
        setAnswers([]);
        setRecommendation(null);
    };

    return (
        <div className="bg-navy-800 rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10 min-h-[500px] flex flex-col items-center justify-center relative overflow-hidden">

            {/* PROGRESS BAR */}
            {step < 4 && (
                <div className="absolute top-0 left-0 w-full h-2 bg-black/20">
                    <div
                        className="h-full bg-gold transition-all duration-500"
                        style={{ width: `${(step / 3) * 100}%` }}
                    />
                </div>
            )}

            {step < 4 ? (
                <div className="w-full max-w-2xl animate-in fade-in slide-in-from-right duration-500 key={step}">
                    <h3 className="text-gold text-sm font-bold uppercase tracking-widest mb-6 text-center">Step {step} of 3</h3>
                    <h2 className="text-3xl font-serif text-white mb-10 text-center">{questions[step - 1].question}</h2>

                    <div className="grid md:grid-cols-3 gap-4">
                        {questions[step - 1].options.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => handleAnswer(opt.value)}
                                className="group bg-navy-900 border border-white/10 hover:border-gold rounded-xl p-6 text-left transition-all hover:-translate-y-1 hover:shadow-xl flex flex-col items-center text-center"
                            >
                                <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">{opt.icon}</span>
                                <h4 className="text-lg font-bold text-white mb-2">{opt.label}</h4>
                                <p className="text-xs text-white/50 leading-relaxed">{opt.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 animate-in zoom-in duration-500 bg-white/5 p-6 rounded-xl border border-gold/30">
                    {/* RESULT IMAGE */}
                    <div className="flex-1 bg-black rounded-lg overflow-hidden min-h-[300px] relative group">
                        <div className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 group-hover:opacity-80" style={{ backgroundImage: `url(${recommendation.image})` }}></div>

                        {/* 360 SPIN VIDEO PLACEHOLDER */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="bg-black/50 text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20 backdrop-blur-sm">
                                ↺ 360° SPIN IN PLACE
                            </div>
                            {/* TODO: Implement video player here using Motion Prompt assets */}
                        </div>

                        <div className="absolute top-4 right-4 bg-gold text-navy px-3 py-1 font-bold text-xs uppercase rounded-full">Best Match</div>
                    </div>

                    {/* RESULT CONTENT */}
                    <div className="flex-1 flex flex-col justify-center text-left">
                        <span className="text-gold/80 text-sm uppercase tracking-widest mb-2">{recommendation.subtitle}</span>
                        <h2 className="text-4xl font-serif text-white mb-6 text-shadow-sm">{recommendation.title}</h2>
                        <p className="text-white/70 text-lg leading-relaxed mb-8 border-l-2 border-gold pl-4">
                            {recommendation.desc}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-8">
                            {recommendation.pros.map((pro: string) => (
                                <span key={pro} className="px-3 py-1 bg-white/10 rounded-full text-xs text-white flex items-center gap-2">
                                    <Check size={12} className="text-green-400" /> {pro}
                                </span>
                            ))}
                        </div>

                        <div className="flex gap-4">
                            <button className="flex-1 bg-gold text-navy py-4 px-6 rounded font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2">
                                <Download size={18} /> Download Guide
                            </button>
                            <button
                                onClick={reset}
                                className="px-4 border border-white/20 rounded hover:bg-white/10 text-white/50 hover:text-white transition-colors"
                            >
                                <RefreshCw size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
