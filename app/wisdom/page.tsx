
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
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden snap-start">
                <div className="absolute inset-0 z-0">
                    <img
                        src="/assets/materials/velvet_sample_showcase.png"
                        alt="The Art of Textiles"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/60" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000F1F] via-transparent to-transparent" />
                </div>

                <div className="relative z-10 text-center max-w-4xl px-6 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-lg">
                        The Art of Textiles
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed drop-shadow-md">
                        Choosing the right fabric is not just about color—it's about how you live.
                    </p>
                </div>
            </section>

            {/* WIZARD SECTION */}
            <section className="py-20 px-6 bg-gradient-to-b from-[#000F1F] to-[#00152a] snap-start">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <span className="text-gold text-xs font-bold uppercase tracking-[0.3em] mb-4 block">Personalized Consultation</span>
                        <h2 className="text-3xl md:text-4xl font-serif text-white">Find Your Perfect Match</h2>
                    </div>
                    <FabricWizard />
                </div>
            </section>

            {/* SHOWCASE SECTION */}
            <section className="py-20 px-6 bg-navy-950 snap-start">
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
