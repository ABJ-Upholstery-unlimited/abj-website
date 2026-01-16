"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Check, MapPin, Armchair, Sofa, Bed } from "lucide-react";
import clsx from "clsx";

// Mock Data for Carousel
const FURNITURE_TYPES = [
    { id: "chair", name: "Wingback Chair", icon: <Armchair size={64} /> },
    { id: "sofa", name: "3-Seater Sofa", icon: <Sofa size={64} /> },
    { id: "ottoman", name: "Large Ottoman", icon: <Bed size={64} /> }, // Using Bed as placeholder for Ottoman
];

// Mock Data for Attributes
const ATTRIBUTES = [
    { id: "tufting", label: "Tufting", icon: "❖" }, // Placeholder icon
    { id: "buttons", label: "Bush Buttons", icon: "•" },
    { id: "skirt_pleat", label: "Skirt (Pleats)", icon: "mmm" },
    { id: "skirt_ruffle", label: "Skirt (Ruffle)", icon: "~~~" },
    { id: "piping", label: "Piping", icon: "∫" },
    { id: "arm_covers", label: "Arm Covers", icon: "∩" },
];

export default function SmartQuote() {
    const [currentBaseIndex, setCurrentBaseIndex] = useState(0);
    const [selectedAttributes, setSelectedAttributes] = useState<string[]>([]);
    const [material, setMaterial] = useState("fabric");

    const currentFurniture = FURNITURE_TYPES[currentBaseIndex];

    const toggleAttribute = (id: string) => {
        setSelectedAttributes(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const nextSlide = () => {
        setCurrentBaseIndex((prev) => (prev + 1) % FURNITURE_TYPES.length);
    };

    const prevSlide = () => {
        setCurrentBaseIndex((prev) => (prev - 1 + FURNITURE_TYPES.length) % FURNITURE_TYPES.length);
    };

    return (
        <section className="relative z-30 px-4 max-w-7xl mx-auto">

            {/* GLASS PANEL CONTAINER */}
            <div className="bg-navy/40 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row min-h-[500px] ring-1 ring-white/5 relative overflow-hidden">
                {/* Shine Effect */}
                <div className="absolute -top-full left-0 w-full h-[200%] bg-gradient-to-b from-white/5 to-transparent skew-y-12 pointer-events-none"></div>

                {/* --- COL 1: GUIDANCE --- */}
                <div className="lg:w-1/4 p-8 border-b lg:border-b-0 lg:border-r border-white/10 bg-navy/40 flex flex-col justify-center">
                    <h3 className="text-gold font-serif text-3xl mb-6">Get Instant Quote</h3>
                    <ul className="space-y-6">
                        {[
                            { num: "1", text: "Select Base Model" },
                            { num: "2", text: "Add Visual Details" },
                            { num: "3", text: "Choose Material" },
                            { num: "4", text: "Check Logistics" }
                        ].map((step, idx) => (
                            <li key={idx} className="flex items-center gap-4 group">
                                <span className="w-8 h-8 rounded-full border border-gold/30 text-gold flex items-center justify-center text-sm font-bold group-hover:bg-gold group-hover:text-navy transition-colors">
                                    {step.num}
                                </span>
                                <span className="text-white/80 font-sans tracking-wide text-sm">{step.text}</span>
                            </li>
                        ))}
                    </ul>
                    <p className="mt-8 text-white/40 text-xs leading-relaxed">
                        Follow these simple steps to get an estimated price range for your restoration project immediately.
                    </p>
                </div>

                {/* --- COL 2: BASE SELECTION (CAROUSEL) --- */}
                <div className="lg:w-1/4 p-6 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col items-center justify-center relative bg-white/5">
                    <h4 className="absolute top-6 text-white/50 text-xs uppercase tracking-widest">Base Model</h4>

                    {/* Carousel Controls */}
                    <button onClick={prevSlide} className="absolute left-4 p-2 text-white/50 hover:text-gold hover:bg-white/10 rounded-full transition-all">
                        <ChevronLeft size={32} />
                    </button>
                    <button onClick={nextSlide} className="absolute right-4 p-2 text-white/50 hover:text-gold hover:bg-white/10 rounded-full transition-all">
                        <ChevronRight size={32} />
                    </button>

                    {/* Active Item */}
                    <div className="flex flex-col items-center gap-6 animate-in fade-in zoom-in duration-300">
                        <div className="text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                            {currentFurniture.icon}
                        </div>
                        <span className="text-xl font-serif text-white">{currentFurniture.name}</span>
                    </div>

                    {/* Indicators */}
                    <div className="absolute bottom-6 flex gap-2">
                        {FURNITURE_TYPES.map((_, idx) => (
                            <div key={idx} className={clsx("w-2 h-2 rounded-full transition-all", idx === currentBaseIndex ? "bg-gold w-4" : "bg-white/20")} />
                        ))}
                    </div>
                </div>

                {/* --- COL 3: ATTRIBUTES (VISUAL ROWS) --- */}
                <div className="lg:w-1/4 p-6 border-b lg:border-b-0 lg:border-r border-white/10 overflow-y-auto">
                    <h4 className="text-white/50 text-xs uppercase tracking-widest mb-6 text-center">Visual Details</h4>

                    <div className="space-y-3">
                        {ATTRIBUTES.map((attr) => {
                            const isSelected = selectedAttributes.includes(attr.id);
                            return (
                                <div
                                    key={attr.id}
                                    onClick={() => toggleAttribute(attr.id)}
                                    className={clsx(
                                        "flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer group",
                                        isSelected ? "bg-gold/10 border-gold" : "bg-white/5 border-transparent hover:bg-white/10"
                                    )}
                                >
                                    {/* Left: Checkbox & Label */}
                                    <div className="flex items-center gap-3">
                                        <div className={clsx(
                                            "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                                            isSelected ? "bg-gold border-gold text-navy" : "border-white/30"
                                        )}>
                                            {isSelected && <Check size={14} strokeWidth={3} />}
                                        </div>
                                        <span className={clsx("text-sm", isSelected ? "text-gold font-medium" : "text-white/80")}>
                                            {attr.label}
                                        </span>
                                    </div>

                                    {/* Right: Visual Icon (Placeholder for now) */}
                                    <div className="w-8 h-8 bg-black/20 rounded flex items-center justify-center text-white/40 text-xs font-mono">
                                        {attr.icon}
                                    </div>
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

                        <button className="w-full bg-gold hover:bg-white text-navy font-bold py-4 rounded-xl uppercase tracking-widest transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(197,160,89,0.3)]">
                            Request Quote
                        </button>
                    </div>

                </div>

            </div>
        </section>
    );
}
