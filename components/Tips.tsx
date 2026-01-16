import { Scissors, ShieldCheck, HeartHandshake } from "lucide-react";

const TIPS = [
    {
        icon: <Scissors size={32} />,
        title: "Fabric Selection",
        desc: "Why 'Double Rubs' matter more than color. Our guide to choosing textiles that last a lifetime.",
    },
    {
        icon: <HeartHandshake size={32} />,
        title: "Repair vs. Buy New",
        desc: "Understanding the value of a solid frame. When is restoration the smarter financial choice?",
    },
    {
        icon: <ShieldCheck size={32} />,
        title: "Care & Maintenance",
        desc: "Pro secrets to keeping your velvet crushed-free and your leather supple for decades.",
    },
];

export default function Tips() {
    return (
        <section id="process" className="bg-slate-900 py-24 relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-navy/50 blur-3xl rounded-l-full pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-gold font-sans tracking-[0.2em] text-sm uppercase mb-4">Our Expertise</h2>
                    <h3 className="text-4xl md:text-5xl font-serif text-white mb-6">The Wisdom of Workshop</h3>
                    <p className="text-white/60 font-light">
                        We don't just fix furniture; we educate our clients on quality, durability, and the art of fine upholstery.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {TIPS.map((tip, idx) => (
                        <div
                            key={idx}
                            className="bg-navy border-l-2 border-gold p-8 hover:bg-white/5 transition-all group cursor-pointer"
                        >
                            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-gold mb-6 group-hover:scale-110 transition-transform">
                                {tip.icon}
                            </div>
                            <h4 className="text-xl font-serif text-white mb-3 group-hover:text-gold transition-colors">
                                {tip.title}
                            </h4>
                            <p className="text-white/50 text-sm leading-relaxed">
                                {tip.desc}
                            </p>

                            <div className="mt-6 flex items-center gap-2 text-gold text-xs uppercase tracking-widest font-bold opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                                Read Guide <span>→</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
