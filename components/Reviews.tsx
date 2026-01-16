import { Star, Quote } from "lucide-react";

const REVIEWS = [
    {
        text: "They completely transformed my grandmother's wingback chair. It's now the centerpiece of our living room.",
        author: "Sarah J.",
        location: "Potomac, MD"
    },
    {
        text: "Professional, timely, and the craftsmanship is simply unmatched. Better than buying new.",
        author: "Michael R.",
        location: "Great Falls, VA"
    },
    {
        text: "The Smart Quote tool made it so easy. I got a price in minutes and they picked up the sofa the next day.",
        author: "Elena D.",
        location: "McLean, VA"
    }
];

export default function Reviews() {
    return (
        <section id="reviews" className="relative py-24 bg-navy overflow-hidden">

            {/* PARALLAX BACKGROUND */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="w-full h-full bg-[url('/assets/portfolio/p4.jpg')] bg-cover bg-fixed bg-center blur-sm"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">

                <div className="grid md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-navy/10">
                    {REVIEWS.map((review, idx) => (
                        <div key={idx} className="px-6 flex flex-col items-center text-center pt-8 md:pt-0">
                            <div className="flex gap-1 text-navy mb-6">
                                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <Quote size={32} className="opacity-20 mb-4" />
                            <p className="font-serif text-xl italic mb-6 leading-relaxed opacity-90">
                                "{review.text}"
                            </p>
                            <div>
                                <p className="font-bold uppercase tracking-wider text-sm">{review.author}</p>
                                <p className="text-xs opacity-60 uppercase tracking-widest mt-1">{review.location}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <p className="text-xs uppercase tracking-[0.3em] opacity-60">Tri-State Area Trusted • 5-Star Rated on Google & Yelp</p>
                </div>

            </div>
        </section>
    );
}
