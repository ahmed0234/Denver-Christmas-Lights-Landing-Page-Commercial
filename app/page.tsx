import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BeforeandAfter from "@/components/BeforeandAfter";
import Services from "@/components/Services";
import WhyChooseUs from "@/components/WhyChooseUs";
import ThemeSwitcher from "@/components/ThemeSwitcher";

const page = () => {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroSection />
      <BeforeandAfter />
      <Services />
      <WhyChooseUs />
      <div className="pb-14"></div>
      <ThemeSwitcher />
    </main>
  );
};

export default page;
