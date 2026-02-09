
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function WisdomHub() {
    return (
        <main className="min-h-screen bg-[#000F1F] text-white selection:bg-gold selection:text-navy">
            <Navbar />

            <section className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-6xl font-serif text-gold mb-6">The Wisdom of the Workshop</h1>
                    <p className="text-white/60 text-lg max-w-2xl mx-auto mb-16">
                        Expert advice, care guides, and the philosophy behind master craftsmanship.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* 1. Fabric Selection */}
                        <div className="bg-navy-900 border border-white/10 rounded-xl p-8 hover:border-gold/50 transition-colors group cursor-pointer">
                            <div className="h-48 bg-black/20 rounded-lg mb-6 flex items-center justify-center">
                                <span className="text-4xl">🧵</span>
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-gold transition-colors">Fabric Selection</h3>
                            <p className="text-white/60 mb-6">How to choose the perfect material for durability and style.</p>
                            <span className="text-gold text-sm uppercase tracking-widest font-bold">Coming Soon</span>
                        </div>

                        {/* 2. Repair vs. Buy */}
                        <div className="bg-navy-900 border border-white/10 rounded-xl p-8 hover:border-gold/50 transition-colors group cursor-pointer">
                            <div className="h-48 bg-black/20 rounded-lg mb-6 flex items-center justify-center">
                                <span className="text-4xl">⚖️</span>
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-gold transition-colors">Repair vs. Buy New</h3>
                            <p className="text-white/60 mb-6">The methodology of determining value, sentiment, and longevity.</p>
                            <span className="text-gold text-sm uppercase tracking-widest font-bold">Coming Soon</span>
                        </div>

                        {/* 3. Care & Maintenance */}
                        <div className="bg-navy-900 border border-white/10 rounded-xl p-8 hover:border-gold/50 transition-colors group cursor-pointer">
                            <div className="h-48 bg-black/20 rounded-lg mb-6 flex items-center justify-center">
                                <span className="text-4xl">✨</span>
                            </div>
                            <h3 className="text-2xl font-serif text-white mb-4 group-hover:text-gold transition-colors">Care & Maintenance</h3>
                            <p className="text-white/60 mb-6">Interactive guides to keep your furniture looking brand new.</p>
                            <span className="text-gold text-sm uppercase tracking-widest font-bold">Coming Soon</span>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
