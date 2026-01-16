"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const HERO_IMAGES = [
    "/assets/portfolio/p1.jpg", // Dark Wingback
    "/assets/portfolio/p2.jpg", // Blue Sofa
    "/assets/portfolio/p4.jpg", // Green Chesterfield
    "/assets/portfolio/p6.jpg", // Modern Club
    "/assets/portfolio/p3.jpg"  // Cream Pairs
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-rotate background every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % HERO_IMAGES.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-navy">

            {/* BACKGROUND CAROUSEL */}
            {HERO_IMAGES.map((src, idx) => (
                <div
                    key={src}
                    className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${idx === currentIndex ? "opacity-100" : "opacity-0"
                        }`}
                >
                    <div className="absolute inset-0 bg-black/30 z-10" /> {/* Overlay */}
                    <div
                        className="w-full h-full bg-cover bg-center transform scale-105 motion-safe:animate-[subtle-zoom_20s_infinite_alternate]"
                        style={{ backgroundImage: `url('${src}')` }}
                    />
                </div>
            ))}

            {/* CONTENT */}
            <div className="relative z-20 text-center max-w-4xl px-4 mt-20">
                <h2 className="text-white/90 font-sans tracking-[0.2em] text-sm md:text-base mb-4 uppercase drop-shadow-md animate-fade-in-up">
                    Love It, Don't Toss It
                </h2>
                <h1 className="text-6xl md:text-8xl font-serif text-white mb-6 drop-shadow-2xl animate-fade-in-up delay-100">
                    BETTER<br />THAN NEW.
                </h1>
                <p className="text-white/90 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md animate-fade-in-up delay-200">
                    We are experts at <span className="text-gold font-medium">fine restoration</span>; we will walk you through the process.
                </p>

                {/* SCROLL INDICATOR */}
                <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce cursor-pointer opacity-80 hover:opacity-100 transition-opacity">
                    <a href="#quote" className="flex flex-col items-center gap-2">
                        <span className="text-[10px] uppercase tracking-widest text-white/80">Scroll</span>
                        <div className="w-[1px] h-16 bg-gradient-to-b from-gold via-white to-transparent"></div>
                    </a>
                </div>
            </div>

        </section>
    );
}
