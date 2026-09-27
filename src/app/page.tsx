import AboutSection from "@/components/AboutSection";
import ApplicationsSection from "@/components/ApplicationsSection";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import InquirySection from "@/components/InquirySection";
import MobileCta from "@/components/MobileCta";
import Navbar from "@/components/Navbar";
import TechnologySection from "@/components/TechnologySection";
import VisionSection from "@/components/VisionSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <VisionSection />
        <HowItWorks />
        <ApplicationsSection />
        <TechnologySection />
        <AboutSection />
        <InquirySection />
      </main>
      <Footer />
      <MobileCta />
    </>
  );
}
