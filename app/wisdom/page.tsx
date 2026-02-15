
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
            <section className="relative h-[60vh] flex items-center justify-center overflow-hidden snap-start">
                {/* ... */}
            </section>

            {/* WIZARD SECTION */}
            <section className="py-20 px-6 bg-gradient-to-b from-[#000F1F] to-[#00152a] snap-start">
                {/* ... */}
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
