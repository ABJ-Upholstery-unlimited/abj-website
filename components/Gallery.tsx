"use client";

import { useState } from "react";
import clsx from "clsx";
import { ArrowUpRight, X } from "lucide-react";
import { PROJECTS, Project } from "@/app/data/projects";

const CATEGORIES = [
    { id: "all", label: "All Projects" },
    { id: "transformations", label: "Transformations" },
    { id: "antique", label: "Antiques" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
];

export default function Gallery() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const filteredItems = activeFilter === "all"
        ? PROJECTS
        : PROJECTS.filter(item => item.category === activeFilter);

    const [activeImage, setActiveImage] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<"before" | "process" | "madeHere" | "after">("after");

    const openProject = (project: Project) => {
        setSelectedProject(project);
        setActiveCategory("after");
        setActiveImage(project.images.hero);
    };

    return (
        <section id="gallery" className="relative z-20 min-h-screen flex flex-col bg-navy">

            {/* PARALLAX BACKGROUND */}
            <div
                className="absolute inset-0 z-0 opacity-20 bg-fixed bg-cover bg-center pointer-events-none"
                style={{ backgroundImage: 'url(/assets/portfolio/Project_02/After/hero.jpg)' }} // Using a high-res project image for texture
            />
            <div className="absolute inset-0 z-0 bg-navy/90" /> {/* Dark overlay */}

            {/* HEADER & FILTERS (Sticky Top) */}
            <div className="sticky top-20 z-40 bg-navy/95 backdrop-blur-md border-b border-white/10 py-4 px-4 shadow-xl transition-all">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

                    {/* Title */}
                    <div className="text-center md:text-left">
                        <h2 className="text-gold font-sans tracking-[0.2em] text-[10px] uppercase mb-1">Our Portfolio</h2>
                        <h3 className="text-xl font-serif text-white leading-none">The Showroom</h3>
                    </div>

                    {/* WRAPPED FILTERS (No Scrolling) */}
                    <div className="flex flex-wrap justify-center gap-2 w-full md:w-auto">
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => setActiveFilter(cat.id)}
                                className={clsx(
                                    "px-4 py-1.5 rounded-full text-[10px] md:text-xs uppercase tracking-wider transition-all border",
                                    activeFilter === cat.id
                                        ? "bg-gold border-gold text-navy font-bold shadow-lg scale-105"
                                        : "bg-transparent border-white/20 text-white/70 hover:border-gold hover:text-gold"
                                )}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* MARGIN-LESS GRID */}
            <div className="flex-1 z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[300px] md:auto-rows-[400px]">
                    {filteredItems.map((item, idx) => (
                        <div
                            key={item.id}
                            onClick={() => openProject(item)}
                            className={clsx(
                                "relative group overflow-hidden cursor-pointer border-[0.5px] border-white/5",
                                (idx === 0 || idx === 4) ? "lg:col-span-2" : "col-span-1"
                            )}
                        >
                            {/* Image (Full Color Default) */}
                            <div
                                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-110"
                                style={{ backgroundImage: `url(${item.images.hero})` }}
                            />

                            {/* Overlay (Hover) */}
                            <div className="absolute inset-0 bg-navy/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-center p-6 backdrop-blur-[2px]">
                                <span className="text-gold text-xs uppercase tracking-widest mb-2 transform -translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    {item.location}
                                </span>
                                <h4 className="text-2xl font-serif text-white mb-6 transform scale-90 group-hover:scale-100 transition-transform duration-500 delay-75">
                                    {item.title}
                                </h4>

                                <div className="px-6 py-2 border border-white/30 rounded-full text-white text-xs uppercase tracking-widest hover:bg-white hover:text-navy transition-colors flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                                    Open Project <ArrowUpRight size={14} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* PROJECT MODAL */}
            {selectedProject && (
                <div className="fixed inset-0 z-[200] bg-navy/95 backdrop-blur-md flex items-center justify-center p-0 md:p-4 animate-in fade-in duration-300">
                    <div className="relative w-full h-full md:max-w-6xl md:h-[90vh] bg-navy md:border border-white/10 md:rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row">

                        {/* Main Image Stage */}
                        <div className="w-full md:w-2/3 h-1/2 md:h-full bg-black relative">
                            {/* CLOSE BUTTON */}
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-24 md:top-6 right-6 z-50 p-2 bg-white/90 backdrop-blur-sm text-navy hover:bg-gold rounded-full shadow-lg transition-all transform hover:scale-110"
                            >
                                <X size={24} />
                            </button>

                            <div
                                className="w-full h-full bg-contain bg-center bg-no-repeat transition-all duration-500"
                                style={{ backgroundImage: `url(${activeImage || selectedProject.images.hero})` }}
                            />
                        </div>

                        {/* Details Panel */}
                        <div className="w-full md:w-1/3 h-1/2 md:h-full p-6 md:p-12 flex flex-col bg-navy/50 overflow-y-auto scrollbar-hide">
                            <h3 className="text-gold text-xs uppercase tracking-widest mb-2">{selectedProject.location}</h3>
                            <h2 className="text-2xl md:text-3xl font-serif text-white mb-4">{selectedProject.title}</h2>
                            <p className="text-white/60 font-light mb-6 leading-relaxed text-sm">
                                {selectedProject.description}
                            </p>

                            {/* Tabs - WRAPPED (No Scroll) */}
                            <div className="flex flex-wrap gap-2 border-b border-white/10 mb-6 pb-2">
                                {(['before', 'process', 'madeHere', 'after'] as const).map((tab) => {
                                    const hasImages = selectedProject.images[tab] && selectedProject.images[tab]!.length > 0;
                                    if (!hasImages && tab !== 'after') return null; // Always show After tab

                                    return (
                                        <button
                                            key={tab}
                                            onClick={() => { setActiveCategory(tab); setActiveImage(selectedProject.images[tab]?.[0] || selectedProject.images.hero); }}
                                            className={clsx(
                                                "px-3 py-1 text-[10px] uppercase tracking-wider transition-colors border rounded hover:text-white",
                                                activeCategory === tab ? "border-gold text-gold bg-white/5" : "border-transparent text-white/40"
                                            )}
                                        >
                                            {tab === 'madeHere' ? 'Workshop' : tab}
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Thumbnails Grid */}
                            <div className="grid grid-cols-4 gap-2 content-start">
                                {selectedProject.images[activeCategory]?.map((img, idx) => (
                                    <div
                                        key={idx}
                                        onClick={() => setActiveImage(img)}
                                        className={clsx(
                                            "aspect-square rounded overflow-hidden cursor-pointer border transition-all",
                                            activeImage === img ? "border-gold opacity-100" : "border-transparent opacity-50 hover:opacity-100"
                                        )}
                                    >
                                        <img src={img} className="w-full h-full object-cover" alt="" />
                                    </div>
                                ))}
                                {(!selectedProject.images[activeCategory] || selectedProject.images[activeCategory]?.length === 0) && (
                                    <p className="col-span-4 text-white/30 text-xs italic py-4">No images available for this stage.</p>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            )}

        </section>
    );
}
