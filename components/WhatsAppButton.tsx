"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
    return (
        <a
            href="https://wa.me/13015340848?text=Hi%20ABJ!%20I'm%20interested%20in%20upholstery%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="group fixed bottom-6 right-6 z-50 flex items-center justify-end"
        >
            <div className="bg-white/90 backdrop-blur text-navy px-0 py-2 rounded-l-full shadow-lg opacity-0 group-hover:opacity-100 max-w-0 group-hover:max-w-[200px] transition-all duration-500 overflow-hidden group-hover:px-4 flex items-center">
                <span className="text-sm font-bold whitespace-nowrap">Chat with Mike</span>
            </div>
            <div className="w-14 h-14 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full flex items-center justify-center shadow-[0_4px_12px_rgba(37,211,102,0.4)] transition-transform group-hover:scale-110 z-10 relative">
                <MessageCircle size={32} fill="currentColor" className="stroke-none" />
            </div>
        </a>
    );
}
