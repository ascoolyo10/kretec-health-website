import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/homepage/Hero";
import Audience from "@/components/homepage/Audience";
import WhyKretec from "@/components/homepage/WhyKretec";
import Platform from "@/components/homepage/Platform";
import HowItWorks from "@/components/homepage/HowItWorks";
import FutureVision from "@/components/homepage/FutureVision";
import CTA from "@/components/homepage/CTA";
import Footer from "@/components/layout/Footer";
import Stats from "@/components/homepage/Stats";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Audience />
      <WhyKretec />
      <Platform />
      <HowItWorks />
      <FutureVision />
      <CTA />
      <Footer />
    </main>
  );
}