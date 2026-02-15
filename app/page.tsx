import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SmartQuote from "@/components/SmartQuote";
import Gallery from "@/components/Gallery";
import WisdomPreview from "@/components/WisdomPreview";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-navy text-white selection:bg-gold selection:text-navy">
      <Navbar />
      <div id="home" className="snap-start"><Hero /></div>
      {/* Adjusted scroll-mt for standard flow: scroll-mt-20 (header) + py-20 (gap) */}
      <div id="quote" className="scroll-mt-20 py-20 snap-start"><SmartQuote /></div>
      <div id="gallery" className="snap-start"><Gallery /></div>
      <div id="wisdom" className="snap-start"><WisdomPreview /></div>
      <div id="reviews" className="snap-start"><Reviews /></div>
      <Footer />
    </main>
  );
}
