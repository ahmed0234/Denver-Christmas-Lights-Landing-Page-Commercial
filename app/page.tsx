import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BeforeandAfter from "@/components/BeforeandAfter";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";

const page = () => {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroSection />
      <BeforeandAfter />
      <Services />
      <WhyChooseUs />
    </main>
  );
};

export default page;
