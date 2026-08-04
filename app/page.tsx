import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BeforeandAfter from "@/components/BeforeandAfter";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import Process from "@/components/Process";
import AreasServices from "@/components/AreasServices";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

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
