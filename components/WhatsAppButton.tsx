"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/12404721324"
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-6 z-50 flex items-center gap-3 group"
        >
            <div className="bg-white/90 backdrop-blur text-navy px-4 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 hidden md:block border border-navy/10 pointer-events-none group-hover:pointer-events-auto">
                <span className="text-sm font-bold">Live Expert Assistance</span>
            </div>
            <div className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(37,211,102,0.4)] transition-transform hover:scale-110">
                <MessageCircle size={32} fill="currentColor" className="stroke-none" />
            </div>
        </a>
    );
}
