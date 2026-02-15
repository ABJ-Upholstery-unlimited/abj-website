
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ArrowRight, Download, RefreshCw, Check, ZoomIn, Award } from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MATERIALS, Material } from './MaterialShowcase';

type Answer = 'heavy' | 'light' | 'pets' | 'clean' | 'plush' | 'sleek';

export default function FabricWizard() {
    const [step, setStep] = useState(1);
    const [answers, setAnswers] = useState<string[]>([]);
    const [recommendation, setRecommendation] = useState<any>(null);
    const [isHovering, setIsHovering] = useState(false);

    // Parallax Ref
    const zoomContainerRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!zoomContainerRef.current) return;

        const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
        // Calculate percentage (-1 to +1) for transforms
        const x = (e.clientX - left) / width - 0.5;
        const y = (e.clientY - top) / height - 0.5;

        // Direct CSS variable update (Unitless for calc usage)
        zoomContainerRef.current.style.setProperty('--x', x.toFixed(3));
        zoomContainerRef.current.style.setProperty('--y', y.toFixed(3));
    };

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

    const pdfRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!pdfRef.current || !recommendation) return;

        try {
            // Create a clone of the element to render
            const element = pdfRef.current;
            const clone = element.cloneNode(true) as HTMLElement;

            // Styles to force reset and isolation
            clone.style.opacity = '1';
            clone.style.position = 'static';
            clone.style.pointerEvents = 'auto';
            clone.style.zIndex = 'auto';
            clone.style.transform = 'none';

            // Create a temporary container attached directly to body to avoid parent style inheritance
            const container = document.createElement('div');
            container.style.position = 'absolute';
            container.style.left = '-9999px';
            container.style.top = '0';
            container.style.width = '210mm'; // A4 width
            container.appendChild(clone);
            document.body.appendChild(container);

            const canvas = await html2canvas(clone, {
                scale: 2,
                useCORS: true,
                backgroundColor: '#ffffff',
                logging: false,
                onclone: (clonedDoc) => {
                    // Force white background on the cloned body to prevent 'lab' inheritance from global CSS
                    const body = clonedDoc.body;
                    if (body) {
                        body.style.backgroundColor = '#ffffff';
                        body.style.color = '#000000';
                    }
                }
            });

            // Clean up
            document.body.removeChild(container);

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'mm',
                format: 'a4'
            });

            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`ABJ_Fabric_Guide_${recommendation.title.replace(/\s+/g, '_')}.pdf`);
        } catch (error) {
            console.error("Error generating PDF:", error);
        }
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
                <div className="w-full max-w-2xl space-y-4">
                    {questions.map((q) => {
                        const isActive = step === q.id;
                        const isCompleted = step > q.id;

                        return (
                            <div
                                key={q.id}
                                className={`rounded-xl border transition-all duration-500 ease-in-out overflow-hidden ${isActive ? 'bg-navy-900 border-gold/50 shadow-lg' : 'bg-navy-900/50 border-white/5'}`}
                            >
                                {/* Header */}
                                <button
                                    onClick={() => isCompleted && setStep(q.id)}
                                    disabled={!isCompleted && !isActive}
                                    className={`w-full flex items-center justify-between p-6 text-left ${isCompleted ? 'cursor-pointer hover:bg-white/5' : 'cursor-default'}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border ${isActive ? 'bg-gold text-navy border-gold' : isCompleted ? 'bg-green-500 text-white border-green-500' : 'bg-transparent text-white/30 border-white/10'}`}>
                                            {isCompleted ? <Check size={16} /> : q.id}
                                        </div>
                                        <div>
                                            <span className={`text-xs font-bold uppercase tracking-widest block mb-1 ${isActive ? 'text-gold' : 'text-white/40'}`}>
                                                Step {q.id}
                                            </span>
                                            <h3 className={`font-serif text-lg ${isActive ? 'text-white' : 'text-white/50'}`}>
                                                {q.question}
                                            </h3>
                                        </div>
                                    </div>
                                    {isCompleted && <div className="text-xs text-gold/80 bg-gold/10 px-3 py-1 rounded-full">{questions[q.id - 1].options.find(o => o.value === answers[q.id - 1])?.label}</div>}
                                </button>

                                {/* Body (Accordion Content) */}
                                {isActive && (
                                    <div className="p-6 pt-0 animate-in slide-in-from-top-4 duration-300">
                                        <div className="grid md:grid-cols-3 gap-3">
                                            {q.options.map((opt) => (
                                                <button
                                                    key={opt.value}
                                                    onClick={() => handleAnswer(opt.value)}
                                                    className="group bg-black/20 border border-white/10 hover:border-gold rounded-lg p-4 text-left transition-all hover:bg-white/5 flex flex-col items-center text-center"
                                                >
                                                    <span className="text-3xl mb-3 group-hover:scale-110 transition-transform">{opt.icon}</span>
                                                    <h4 className="text-sm font-bold text-white mb-1">{opt.label}</h4>
                                                    <p className="text-[10px] text-white/40 leading-relaxed">{opt.desc}</p>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 animate-in zoom-in duration-500 bg-white/5 p-6 rounded-xl border border-gold/30">
                    {/* RESULT IMAGE */}
                    <div
                        className="flex-1 bg-black rounded-lg overflow-hidden min-h-[300px] relative group cursor-crosshair perspective-1000"
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onMouseMove={handleMouseMove}
                    >
                        <div className="absolute inset-0 bg-gray-50 flex items-center justify-center overflow-hidden">
                            {/* Static Image (Fades out on hover) */}
                            <img
                                src={recommendation.image}
                                alt={recommendation.title}
                                className={`w-[80%] h-[80%] object-contain transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}
                            />

                            {/* Zoomed Parallax Image */}
                            <div
                                ref={zoomContainerRef}
                                className={`absolute inset-0 bg-no-repeat transition-opacity duration-200 ease-out ${isHovering ? 'opacity-100' : 'opacity-0'}`}
                                style={{
                                    backgroundImage: `url(${recommendation.image})`,
                                    backgroundSize: '160%',
                                    backgroundPosition: 'center',
                                    // Hardware accelerated transform using CSS variables
                                    // Translate range is +/- 60px
                                    transform: 'translate(calc(var(--x, 0) * -60px), calc(var(--y, 0) * -60px)) scale(1.2)',
                                } as React.CSSProperties}
                            >
                                <div className="absolute inset-0 bg-black/5 flex flex-col items-center justify-center pointer-events-none">
                                    <div className="bg-black/60 text-white px-5 py-2 rounded-full backdrop-blur-md border border-white/20 flex items-center gap-3 shadow-xl animate-in fade-in zoom-in duration-300">
                                        <ZoomIn size={18} className="text-gold" />
                                        <span className="text-xs font-bold uppercase tracking-widest">Inspection Mode</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={`absolute top-4 right-4 bg-gold text-navy px-3 py-1 font-bold text-xs uppercase rounded-full transition-opacity duration-300 ${isHovering ? 'opacity-0' : 'opacity-100'}`}>
                            Best Match
                        </div>
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
                            <button
                                onClick={handleDownload}
                                className="flex-1 bg-gold text-navy py-4 px-6 rounded font-bold uppercase tracking-wider hover:bg-white transition-colors flex items-center justify-center gap-2"
                            >
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

            {/* HIDDEN PDF CONTENT */}
            <div className="absolute top-0 left-0 -z-50 opacity-0 pointer-events-none w-[210mm]" ref={pdfRef} style={{ backgroundColor: '#ffffff', color: '#002244' }}>
                {recommendation && (
                    <div className="p-12 space-y-8 h-full relative">
                        {/* Header */}
                        <div className="flex justify-between items-center pb-6" style={{ borderBottom: '2px solid #C5A059' }}>
                            <div>
                                <h1 style={{ fontSize: '30px', fontFamily: '"Georgia", serif', color: '#002244', margin: 0, lineHeight: 1.2 }}>ABJ Upholstery Unlimited</h1>
                                <p style={{ fontSize: '14px', color: '#6b7280', margin: 0 }}>Love It. Don't Toss It.</p>
                            </div>
                            <div className="text-right text-xs" style={{ color: '#6b7280' }}>
                                <p style={{ margin: 0 }}>301-534-0848</p>
                                <p style={{ margin: 0 }}>projects@ABJupholstery.com</p>
                            </div>
                        </div>

                        {/* 1. MATCH RESULT */}
                        <div className="flex gap-8 items-start">
                            <div className="w-1/3 p-4" style={{ backgroundColor: '#f3f4f6', borderRadius: '8px' }}>
                                <img src={recommendation.image} alt={recommendation.title} style={{ width: '100%', objectFit: 'contain', mixBlendMode: 'multiply' }} />
                            </div>
                            <div className="flex-1 space-y-4">
                                <div>
                                    <span style={{ color: '#C5A059', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '10px', letterSpacing: '0.1em' }}>Your Perfect Match</span>
                                    <h2 className="text-4xl font-serif" style={{ color: '#002244', margin: '4px 0' }}>{recommendation.title}</h2>
                                    <p style={{ color: '#4b5563', marginTop: '8px' }}>{recommendation.desc}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 text-sm p-4" style={{ backgroundColor: '#f9fafb', borderRadius: '8px' }}>
                                    <div>
                                        <b style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', color: '#C5A059' }}>Durability</b>
                                        {recommendation.durability}
                                    </div>
                                    <div>
                                        <b style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', color: '#C5A059' }}>Usage</b>
                                        {recommendation.bestFor}
                                    </div>
                                    <div>
                                        <b style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', color: '#C5A059' }}>Care</b>
                                        {recommendation.care}
                                    </div>
                                    <div>
                                        <b style={{ display: 'block', fontSize: '10px', textTransform: 'uppercase', color: '#C5A059' }}>Cost Est.</b>
                                        {recommendation.price}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* 2. QUICK TIP */}
                        <div className="p-6 relative overflow-hidden" style={{ backgroundColor: '#002244', color: '#ffffff', borderRadius: '8px' }}>
                            <div className="absolute top-0 right-0 w-24 h-24 rounded-full" style={{ backgroundColor: '#C5A059', transform: 'translate(50%, -50%)', opacity: 0.2 }}></div>
                            <h3 style={{ fontFamily: '"Georgia", serif', fontSize: '20px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: '#C5A059' }}>
                                <Award size={20} color="#C5A059" /> ABJ Pro Tip
                            </h3>
                            <p style={{ opacity: 0.9, lineHeight: 1.6, maxWidth: '42rem' }}>
                                {recommendation.title === 'Performance Velvet' && "Velvet shouldn't scare you! Modern performance velvets are some of the most durable fabrics available, perfect for pets."}
                                {recommendation.title === 'Full-Grain Leather' && "Real leather breathes and adjusts to your body temperature. Unlike vinyl, it won't peel but will gain character (patina) over the years."}
                                {recommendation.title === 'Belgian Linen' && "Linen adds an instant 'relaxed luxury' vibe. While it wrinkles, that's part of its natural charm and authenticity."}
                                {!['Performance Velvet', 'Full-Grain Leather', 'Belgian Linen'].includes(recommendation.title) && "Investing in the right material for your lifestyle ensures your furniture stays beautiful for decades, not just seasons."}
                            </p>
                        </div>

                        {/* 3. HOW TO SELECT */}
                        <div className="space-y-4">
                            <h3 style={{ fontSize: '20px', fontFamily: '"Georgia", serif', paddingBottom: '8px', color: '#002244', borderBottom: '1px solid #e5e7eb' }}>Next Steps: Selection Made Easy</h3>
                            <div className="grid grid-cols-3 gap-6 text-sm">
                                <div className="p-4" style={{ backgroundColor: '#f9fafb', borderLeft: '4px solid #C5A059', borderRadius: '4px' }}>
                                    <b style={{ display: 'block', marginBottom: '4px', color: '#002244' }}>Showroom Visit</b>
                                    <p style={{ color: '#4b5563', margin: 0 }}>Stop by to feel the fabrics. We have hundreds of samples waiting for you.</p>
                                </div>
                                <div className="p-4" style={{ backgroundColor: '#f9fafb', borderLeft: '4px solid #C5A059', borderRadius: '4px' }}>
                                    <b style={{ display: 'block', marginBottom: '4px', color: '#002244' }}>Mobile Library</b>
                                    <p style={{ color: '#4b5563', margin: 0 }}>We can bring our curated sample books directly to your home.</p>
                                </div>
                                <div className="p-4" style={{ backgroundColor: '#f9fafb', borderLeft: '4px solid #C5A059', borderRadius: '4px' }}>
                                    <b style={{ display: 'block', marginBottom: '4px', color: '#002244' }}>Browse Online</b>
                                    <p style={{ color: '#4b5563', margin: 0 }}>Select your top 10 favorites from our partners and share them with us.</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-2 text-xs text-center mt-2">
                                <a href="https://www.unitedfabrics.com/fabric/?application%5B%5D=residential-use" style={{ color: '#2563eb', textDecoration: 'none' }}>United Fabrics</a>
                                <a href="https://www.greenhousefabrics.com/fabrics/usage/upholstery" style={{ color: '#2563eb', textDecoration: 'none' }}>Greenhouse Fabrics</a>
                                <a href="https://www.charlottefabrics.com/product-category/fabric" style={{ color: '#2563eb', textDecoration: 'none' }}>Charlotte Fabrics</a>
                                <a href="https://www.europatex.com/products/type/fabric/usage/162" style={{ color: '#2563eb', textDecoration: 'none' }}>Europatex</a>
                            </div>
                        </div>

                        {/* 4. OTHER OPTIONS */}
                        <div className="space-y-4">
                            <h3 style={{ fontSize: '20px', fontFamily: '"Georgia", serif', borderBottom: '1px solid #e5e7eb', paddingBottom: '8px', color: '#002244' }}>Explore Other Collections</h3>
                            <div className="grid grid-cols-5 gap-4">
                                {MATERIALS.filter((m: any) => m.name !== recommendation.title).slice(0, 5).map((mat: any) => (
                                    <div key={mat.id} className="text-center">
                                        <div className="h-20 w-full rounded mb-2 flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#f3f4f6' }}>
                                            <img src={mat.sample} alt={mat.name} className="w-[80%] h-[80%] object-contain mix-blend-multiply" />
                                        </div>
                                        <p className="text-[10px] font-bold leading-tight" style={{ color: '#002244' }}>{mat.name}</p>
                                        <p className="text-[9px]" style={{ color: '#6b7280' }}>{mat.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer / CTA */}
                        <div className="mt-auto pt-8 border-t" style={{ borderColor: '#e5e7eb' }}>
                            <div className="rounded-lg p-4 flex justify-between items-center" style={{ backgroundColor: '#002244', color: '#ffffff' }}>
                                <div>
                                    <p className="font-bold text-sm uppercase tracking-widest" style={{ color: '#C5A059' }}>Ready to Start?</p>
                                    <p className="text-xs opacity-70">Chat with us directly to discuss your project.</p>
                                </div>
                                <div className="flex gap-4 text-xs font-bold">
                                    <a href="https://wa.me/13015340848" className="px-4 py-2 rounded flex items-center gap-2" style={{ backgroundColor: '#25D366', color: '#ffffff' }}>
                                        <span>WhatsApp Chat</span>
                                    </a>
                                    <span className="px-4 py-2 rounded" style={{ backgroundColor: '#C5A059', color: '#002244' }}>
                                        ABJUpholstery.com
                                    </span>
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}
