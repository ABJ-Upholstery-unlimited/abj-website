"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, MapPin, Armchair, Sofa, Bed } from "lucide-react";
import clsx from "clsx";

// Mock Data for Carousel (Base Models)
const FURNITURE_TYPES = [
    { id: "chair_dining", name: "Dining Chair", icon: <Armchair size={64} />, scale: "scale_1person.png" },
    { id: "chair_accent", name: "Wingback Chair", icon: <Armchair size={64} />, scale: "scale_1person.png" },
    { id: "sofa_2seat", name: "Loveseat", icon: <Sofa size={64} />, scale: "scale_2people.png" },
    { id: "sofa_3seat", name: "Sofa", icon: <Sofa size={64} />, scale: "scale_3people.png" },
    { id: "sectional", name: "Sectional", icon: <Sofa size={64} />, scale: "scale_3people.png" },
    { id: "ottoman", name: "Ottoman", icon: <Bed size={64} />, scale: "scale_1person.png" },
];

// Labor Variations (Mutually Exclusive)
const LABOR_VARIATIONS = [
    { id: "level_1", label: "Seat Only", desc: "Just the cushion/seat", icon: "➊" },
    { id: "level_2", label: "Seat & Back", desc: "Arms/Legs exposed", icon: "➋" },
    { id: "level_3", label: "Standard", desc: "Fully Upholstered", icon: "➌" },
    { id: "level_4", label: "Tufted/Complex", desc: "Deep button or channels", icon: "➍" },
    { id: "level_5", label: "Skirted", desc: "Fabric to floor", icon: "➎" },
    { id: "level_6", label: "Loose Cushion", desc: "Pillow back style", icon: "➏" },
];

export default function SmartQuote() {
    const [currentBaseIndex, setCurrentBaseIndex] = useState(1); // Default to Wingback (idx 1)
    const [selectedLabor, setSelectedLabor] = useState("level_3"); // Default to Full Simple
    const [material, setMaterial] = useState("fabric");

    const currentFurniture = FURNITURE_TYPES[currentBaseIndex];

    const nextSlide = () => {
        setCurrentBaseIndex((prev) => (prev + 1) % FURNITURE_TYPES.length);
    };

    const prevSlide = () => {
        setCurrentBaseIndex((prev) => (prev - 1 + FURNITURE_TYPES.length) % FURNITURE_TYPES.length);
    };

    // Construct Dynamic Image Paths
    const baseImagePath = `/assets/quote/${currentFurniture.id}/base.png`;
    const laborImagePath = `/assets/quote/${currentFurniture.id}/labor_${selectedLabor}.png`;
    const scaleImagePath = `/assets/quote/overlays/${currentFurniture.scale}`;

    return (
        <section className="relative z-30 px-4 max-w-7xl mx-auto">

            {/* GLASS PANEL CONTAINER */}
            <div className="bg-navy/5 backdrop-blur-[40px] border border-white/20 border-b-white/10 rounded-2xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.9)] flex flex-col lg:flex-row min-h-[600px] ring-1 ring-white/10 relative overflow-hidden transition-all duration-500">
                {/* Shine Effect */}
                <div className="absolute -top-full left-0 w-full h-[200%] bg-gradient-to-b from-white/5 to-transparent skew-y-12 pointer-events-none"></div>

                {/* --- COL 1: GUIDANCE --- */}
                <div className="lg:w-1/4 p-8 border-b lg:border-b-0 lg:border-r border-white/10 bg-navy/40 flex flex-col justify-center">
                    <h3 className="text-gold font-serif text-3xl mb-6">Get Instant Quote</h3>
                    <ul className="space-y-6">
                        {[
                            { num: "1", text: "Select Base Model" },
                            { num: "2", text: "Select Configuration" },
                            { num: "3", text: "Choose Material" },
                            { num: "4", text: "Check Logistics" }
                        ].map((step, idx) => (
                            <li key={idx} className="flex items-center gap-4 group">
                                <span className={clsx(
                                    "w-8 h-8 rounded-full border flex items-center justify-center text-sm font-bold transition-colors",
                                    idx === 1 ? "bg-gold text-navy border-gold" : "border-gold/30 text-gold"
                                )}>
                                    {step.num}
                                </span>
                                <span className="text-white/80 font-sans tracking-wide text-sm">{step.text}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 text-white/40 text-xs leading-relaxed">
                        Select the configuration that best matches your furniture's current style to determine labor intensity.
                    </p>
                </div>

                {/* --- COL 2: VISUALIZER (LAYERS) --- */}
                <div className="lg:w-1/4 p-6 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col items-center justify-center relative bg-white/5 group overflow-hidden">
                    <h4 className="absolute top-6 text-white/50 text-xs uppercase tracking-widest z-10">Base Model</h4>

                    {/* Carousel Controls */}
                    <button onClick={prevSlide} className="absolute left-4 z-20 p-2 text-white/50 hover:text-gold hover:bg-white/10 rounded-full transition-all">
                        <ChevronLeft size={32} />
                    </button>
                    <button onClick={nextSlide} className="absolute right-4 z-20 p-2 text-white/50 hover:text-gold hover:bg-white/10 rounded-full transition-all">
                        <ChevronRight size={32} />
                    </button>

                    {/* --- THE 3-LAYER COMPOSITOR --- */}
                    <div className="relative w-64 h-64 flex items-center justify-center">

                        {/* 1. SCALE LAYER (Ghost) - Behind or Top? User said 'use person to establish size'. Let's put it BEHIND but visible, or Overlay. Code plan says 'ghost overlay'. Let's put it at z-0 with opacity. */}
                        {/* Actually, user said 'person... at all moments'. It might look better behind the bold white lines so it doesn't obscure the furniture. */}
                        <div className="absolute inset-0 z-0 opacity-30 pointer-events-none transform scale-110">
                            {/* <img src={scaleImagePath} alt="Scale" className="w-full h-full object-contain" /> */}
                            {/* Placeholder for Scale until generated */}
                            <div className="w-full h-full border border-dashed border-white/10 rounded-full flex items-center justify-center text-[8px] text-white/20">Scale Layer</div>
                        </div>

                        {/* 2. BASE LAYER (White Lines) */}
                        <div className="absolute inset-0 z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                            {/* <img src={baseImagePath} alt="Base" className="w-full h-full object-contain" /> */}
                            {/* Using Icon as placeholder for now */}
                            <div className="w-full h-full flex items-center justify-center text-white">
                                {currentFurniture.icon}
                            </div>
                        </div>

                        {/* 3. LABOR LAYER (Blue Splash) */}
                        <div className="absolute inset-0 z-20 mix-blend-screen opacity-80 pointer-events-none">
                            {/* <img src={laborImagePath} alt="Labor" className="w-full h-full object-contain" /> */}
                        </div>
                    </div>

                    <div className="mt-8 text-center z-10">
                        <span className="text-xl font-serif text-white block">{currentFurniture.name}</span>
                        <span className="text-gold text-xs uppercase tracking-widest">{LABOR_VARIATIONS.find(l => l.id === selectedLabor)?.label}</span>
                    </div>

                    {/* Indicators */}
                    <div className="absolute bottom-6 flex gap-2 z-10">
                        {FURNITURE_TYPES.map((_, idx) => (
                            <div key={idx} className={clsx("w-2 h-2 rounded-full transition-all", idx === currentBaseIndex ? "bg-gold w-4" : "bg-white/20")} />
                        ))}
                    </div>
                </div>

                {/* --- COL 3: LABOR VARIATION (RADIO GRID) --- */}
                <div className="lg:w-1/4 p-6 border-b lg:border-b-0 lg:border-r border-white/10 overflow-y-auto">
                    <h4 className="text-white/50 text-xs uppercase tracking-widest mb-6 text-center">Style & Labor</h4>

                    <div className="grid grid-cols-1 gap-3">
                        {LABOR_VARIATIONS.map((varItem) => {
                            const isSelected = selectedLabor === varItem.id;
                            return (
                                <div
                                    key={varItem.id}
                                    onClick={() => setSelectedLabor(varItem.id)}
                                    className={clsx(
                                        "flex items-center gap-4 p-3 rounded-lg border transition-all cursor-pointer group",
                                        isSelected ? "bg-gold/10 border-gold shadow-[0_0_15px_rgba(197,160,89,0.1)]" : "bg-white/5 border-transparent hover:bg-white/10"
                                    )}
                                >
                                    {/* Number/Icon */}
                                    <div className={clsx(
                                        "w-8 h-8 rounded flex items-center justify-center text-xs font-bold transition-all",
                                        isSelected ? "bg-gold text-navy" : "bg-white/10 text-white/40"
                                    )}>
                                        {varItem.icon}
                                    </div>

                                    {/* Text */}
                                    <div>
                                        <h5 className={clsx("text-sm font-medium transition-colors", isSelected ? "text-gold" : "text-white/90")}>
                                            {varItem.label}
                                        </h5>
                                        <p className="text-[10px] text-white/40">{varItem.desc}</p>
                                    </div>

                                    {/* Check */}
                                    {isSelected && <Check size={16} className="text-gold ml-auto" />}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* --- COL 4: MATERIAL & LOGISTICS --- */}
                <div className="lg:w-1/4 p-6 bg-navy/40 flex flex-col">

                    {/* Material Selection */}
                    <div className="mb-8 flex-1">
                        <h4 className="text-white/50 text-xs uppercase tracking-widest mb-4">Material Type</h4>
                        <div className="space-y-3">
                            {["Crypton", "Fabric", "Leather", "Vinyl"].map((type) => {
                                const id = type.toLowerCase();
                                const isChecked = material === id;
                                return (
                                    <label key={id} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={clsx(
                                            "w-5 h-5 rounded-full border flex items-center justify-center p-0.5 transition-all",
                                            isChecked ? "border-gold" : "border-white/30 group-hover:border-gold/50"
                                        )}>
                                            {isChecked && <div className="w-full h-full bg-gold rounded-full" />}
                                        </div>
                                        <input
                                            type="radio"
                                            name="material"
                                            value={id}
                                            className="hidden"
                                            checked={isChecked}
                                            onChange={() => setMaterial(id)}
                                        />
                                        <span className={clsx("text-sm", isChecked ? "text-white" : "text-white/60")}>{type}</span>
                                    </label>
                                )
                            })}
                        </div>
                    </div>

                    {/* Logistics */}
                    <div className="mt-auto space-y-4">
                        <div>
                            <label className="text-white/50 text-xs uppercase tracking-widest block mb-2">Delivery Zip Code</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gold/50" size={16} />
                                <input
                                    type="text"
                                    placeholder="20871"
                                    className="w-full bg-black/20 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-gold/50 transition-all font-mono"
                                />
                            </div>
                        </div>

                        <button className="w-full bg-gold/50 cursor-not-allowed text-navy font-bold py-4 rounded-xl uppercase tracking-widest transition-all shadow-none">
                            Coming Soon
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
}
