"use client";

import ProjectBoard from "./QuickQuote/ProjectBoard";

export default function SmartQuote() {
    return (
        <div id="quote" className="bg-navy-950 w-full relative">
            {/* DESKTOP VERSION (Hidden on Mobile) */}
            <div className="hidden md:block">
                <ProjectBoard />
            </div>

            {/* MOBILE VERSION (Visible on Mobile) */}
            <div className="md:hidden w-full h-[500px] flex flex-col items-center justify-center p-8 text-center border-t border-white/10 bg-navy-900">
                <div className="w-16 h-16 border-2 border-gold rounded-full flex items-center justify-center mb-6 animate-pulse">
                    <span className="text-3xl">📱</span>
                </div>
                <h2 className="text-2xl font-serif text-white mb-2">Mobile Tool Coming Soon</h2>
                <p className="text-white/60 mb-6 max-w-xs">
                    We are crafting a special mobile experience for you.
                    <br />For now, please use a Desktop/Laptop or simply text us your photos!
                </p>
                <a href="sms:+1573004004503" className="px-6 py-3 bg-gold text-navy font-bold rounded-full">
                    Text Photos Instead
                </a>
            </div>
        </div>
    );
}
