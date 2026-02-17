"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    // Close menu on window resize
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const handleNavigation = (targetId: string) => {
        setIsMobileMenuOpen(false);

        if (pathname === '/') {
            // If on home page, smooth scroll
            const element = document.getElementById(targetId);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            // If on another page, navigate to home with hash
            router.push(`/#${targetId}`);
        }
    };

    const NAV_ITEMS = [
        { label: 'Home', id: 'home' },
        { label: 'Gallery', id: 'gallery' },
        { label: 'Wisdom', id: 'wisdom' },
        { label: 'Reviews', id: 'reviews' },
        { label: 'Contact', id: 'contact' }
    ];

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-[#002244]/90 backdrop-blur-md border-b border-white/5 h-20 transition-all">
            <div className="relative max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

                {/* Logo */}
                <div onClick={() => handleNavigation('home')} className="cursor-pointer font-serif text-2xl text-white tracking-wider flex items-center gap-3 relative z-50">
                    <img
                        src="/assets/brand/abj-logo-white.png"
                        alt="ABJ Upholstery"
                        className="h-8 md:h-10 w-auto object-contain hover:opacity-80 transition-opacity"
                    />
                </div>

                {/* Desktop Links (Visible > md) */}
                <div className="hidden md:flex items-center gap-8">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleNavigation(item.id)}
                            className="text-sm uppercase tracking-widest text-white/70 hover:text-gold transition-colors"
                        >
                            {item.label}
                        </button>
                    ))}

                    <button
                        onClick={() => handleNavigation('quote')}
                        className="px-6 py-2 bg-gold text-navy font-bold text-sm uppercase tracking-wider rounded hover:bg-white transition-colors"
                    >
                        Get a Quote
                    </button>
                </div>

                {/* MOBILE CENTER BUTTON (Visible < md) */}
                <button
                    onClick={() => handleNavigation('quote')}
                    className="md:hidden absolute left-1/2 transform -translate-x-1/2 bg-gold/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-navy font-bold text-xs uppercase tracking-widest shadow-lg border border-white/20 hover:bg-white transition-all whitespace-nowrap"
                >
                    Get Quote
                </button>

                {/* Mobile Menu Toggle (Visible < md) */}
                <button
                    className="md:hidden text-white hover:text-gold transition-colors relative z-50"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label="Toggle Menu"
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* OVERLAY BACKDROP */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm md:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* SIDE DRAWER MENU */}
            <div className={clsx(
                "fixed top-0 right-0 h-screen w-3/4 max-w-sm bg-[#002244] z-50 shadow-2xl transform transition-transform duration-300 ease-out md:hidden flex flex-col pt-24 px-8 border-l border-white/10",
                isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
            )}>
                <div className="flex flex-col gap-6">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => handleNavigation(item.id)}
                            className="text-2xl font-serif text-white hover:text-gold text-left border-b border-white/10 pb-4 transition-colors"
                        >
                            {item.label}
                        </button>
                    ))}
                    <button
                        onClick={() => handleNavigation('quote')}
                        className="mt-4 w-full py-4 bg-gold text-navy font-bold text-lg uppercase tracking-wider rounded text-center active:scale-95 transition-transform"
                    >
                        Get a Quote
                    </button>
                </div>
            </div>
        </nav>
    );
}
