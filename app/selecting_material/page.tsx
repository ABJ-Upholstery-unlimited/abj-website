
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FabricWizard from '@/components/SelectingMaterial/FabricWizard';
import MaterialShowcase from '@/components/SelectingMaterial/MaterialShowcase';

export default function SelectingMaterialPage() {
    return (
        <main className="min-h-screen bg-[#000F1F] text-white selection:bg-gold selection:text-navy">
            <Navbar />

            {/* HERO SECTION */}
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
                {/* Video/Image Background */}
                <div className="absolute inset-0 bg-black/60 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center z-0 scale-110 animate-slow-pan"
                    style={{ backgroundImage: "url('/assets/hero_fabric_selection.jpg')" }}
                />

                <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 animate-in fade-in slide-in-from-bottom-6 duration-1000">
                        The Art of Textiles
                    </h1>
                    <p className="text-white/80 text-lg md:text-xl font-light tracking-wide max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
                        Choosing the right fabric is not just about color—it's about how you live.
                    </p>
                </div>
            </section>

            {/* WIZARD SECTION */}
            <section className="py-20 px-6 bg-gradient-to-b from-[#000F1F] to-[#00152a]">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Personalized Consultation</span>
                        <h2 className="text-3xl md:text-4xl font-serif text-white">Find Your Perfect Match</h2>
                    </div>
                    <FabricWizard />
                </div>
            </section>

            {/* SHOWCASE SECTION */}
            <section className="py-20 px-6 bg-navy-950">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">The Collections</span>
                        <h2 className="text-3xl md:text-4xl font-serif text-white">Explore Materials</h2>
                    </div>
                    <MaterialShowcase />
                </div>
            </section>

            <Footer />
        </main>
    );
}
