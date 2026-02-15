"use client";

import ProjectBoard from "./QuickQuote/ProjectBoard";

export default function SmartQuote() {
    return (
        <div id="quote" className="bg-navy-950 w-full relative">
            {/* PROJECT FORCE-ENABLED ON ALL DEVICES */}
            <div className="w-full">
                <ProjectBoard />
            </div>

            {/* MESSAGE HIDDEN */}
            {/* <div className="md:hidden... (removed for testing) */}
        </div>
    );
}
