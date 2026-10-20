import AreasServices from "@/components/AreasServices";
import BeforeandAfter from "@/components/BeforeandAfter";
import Faq from "@/components/Faq";
import FinalCTA from "@/components/FinalCTA";
import FloatingCTA from "@/components/FloatingCTA";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import Process from "@/components/Process";
import Reviews from "@/components/Reviews";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";

const page = () => {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroSection />
      <BeforeandAfter />
      <Services />
      <AreasServices />
      <Process />
      <WhyChooseUs />
      <Reviews />
      <Faq />
      <FinalCTA />
      <Footer />
      <FloatingCTA />
    </main>
  );
};

export default page;
