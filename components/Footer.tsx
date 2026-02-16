"use client";

import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    const router = useRouter();

    const handleLogoClick = () => {
        if (pathname === '/') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            router.push('/');
        }
    };

    return (
        <footer id="contact" className="bg-[#000F1F] text-white/60 pt-20 pb-10 border-t border-white/5 font-light text-sm scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12 mb-16">

                {/* COL 1: BRAND */}
                <div>
                    <div className="mb-6 cursor-pointer" onClick={handleLogoClick}>
                        <img src="/assets/brand/abj-icon-white.png" alt="ABJ" className="w-16 h-16 object-contain opacity-80 hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="mb-6 leading-relaxed">
                        Preserving the legacy of fine furniture through master craftsmanship and modern convenience.
                    </p>
                    <div className="flex gap-4 text-gold">
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                            <Instagram size={20} className="hover:text-white transition-colors cursor-pointer" />
                        </a>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                            <Facebook size={20} className="hover:text-white transition-colors cursor-pointer" />
                        </a>
                    </div>
                </div>

                {/* COL 2: CONTACT */}
                <div>
                    <h4 className="text-white font-serif text-lg mb-6">Contact Us</h4>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <MapPin className="text-gold mt-1 shrink-0" size={18} />
                            <span>
                                Clarksburg, MD 20871<br />
                                <span className="text-white/40 text-xs">Serving DC, MD & VA</span>
                            </span>
                        </li>
                        <li className="flex items-center gap-3">
                            <span className="text-gold shrink-0 text-sm">GM:</span>
                            <span>Mike Betancur</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="text-gold shrink-0" size={18} />
                            <a href="tel:3015340848" className="hover:text-gold transition-colors">301-534-0848</a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="text-gold shrink-0" size={18} />
                            <a href="mailto:projects@ABJupholstery.com" className="hover:text-gold transition-colors text-xs sm:text-sm">projects@ABJupholstery.com</a>
                        </li>
                    </ul>
                </div>

                {/* COL 3: SERVICES */}
                <div>
                    <h4 className="text-white font-serif text-lg mb-6">Services</h4>
                    <ul className="space-y-2">
                        {[
                            { name: "Dramatic Transformations", href: "#TRANSFORMATIONS" },
                            { name: "Antique Restoration", href: "#ANTIQUES" },
                            { name: "Residential Update", href: "#RESIDENTIAL" },
                            { name: "Commercial Projects", href: "#COMMERCIAL" }
                        ].map((item) => (
                            <li key={item.name}>
                                <a href={item.href} className="hover:text-gold transition-colors text-sm">{item.name}</a>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* COL 4: MAP VISUAL */}
                <div className="relative h-48 rounded-xl overflow-hidden border border-white/10 group cursor-pointer grayscale hover:grayscale-0 transition-all duration-700">
                    {/* Static Map Image (Dark Mode Style) */}
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-60"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop')" }}
                    ></div>

                    {/* Map Overlay */}
                    <div className="absolute inset-0 bg-[#002244]/60 mix-blend-multiply"></div>

                    {/* Pins */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full border border-gold/30 animate-ping absolute -top-10 -left-10"></div>
                            <MapPin className="text-gold drop-shadow-lg relative z-10" size={32} fill="currentColor" />
                        </div>
                    </div>

                    <div className="absolute bottom-0 w-full bg-navy/90 py-2 text-center text-xs text-gold font-bold uppercase tracking-widest">
                        View on Map
                    </div>
                </div>

            </div>

            {/* COPYRIGHT */}
            <div className="border-t border-white/5 pt-8 text-center px-6">
                <p className="opacity-40">
                    &copy; {new Date().getFullYear()} ABJ Upholstery Unlimited. All rights reserved.
                    <span className="mx-2">•</span>
                    <span className="hover:text-gold cursor-pointer">Privacy Policy</span>
                </p>
            </div>
        </footer>
    );
}
