import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import BeforeandAfter from "@/components/BeforeandAfter";

const page = () => {
  return (
    <main className="relative min-h-screen">
      <Navbar />
      <HeroSection />
      <BeforeandAfter />
    </main>
  );
};

export default page;
