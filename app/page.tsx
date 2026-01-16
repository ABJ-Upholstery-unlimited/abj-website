import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SmartQuote from "@/components/SmartQuote";
import Gallery from "@/components/Gallery";
import Tips from "@/components/Tips";
import Reviews from "@/components/Reviews";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-navy text-white selection:bg-gold selection:text-navy">
      <Navbar />
      <div id="home"><Hero /></div>
      {/* Adjusted scroll-mt for standard flow: scroll-mt-20 (header) + py-20 (gap) */}
      <div id="quote" className="scroll-mt-20 py-20"><SmartQuote /></div>
      <div id="gallery"><Gallery /></div>
      <div id="tips"><Tips /></div>
      <div id="reviews"><Reviews /></div>
      <Footer />
      <WhatsAppButton />
    </main>
  );
}
