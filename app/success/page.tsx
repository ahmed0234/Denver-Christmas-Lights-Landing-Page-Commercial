"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Check, Clock, Phone, Home } from "lucide-react";
import { ThemeLogoIcon } from "@/components/ThemeLogo";

// ───────────────────────────────────────────────
// 1. FLOATING PARTICLES
// ───────────────────────────────────────────────
const FloatingParticles = () => {
  const [particles, setParticles] = useState<
    Array<{
      id: number;
      x: number;
      y: number;
      size: number;
      duration: number;
      delay: number;
    }>
  >([]);

  useEffect(() => {
    const count = 12;
    const items = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 2 + Math.random() * 4,
      duration: 12 + Math.random() * 18,
      delay: Math.random() * 10,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "rgba(255, 244, 214, 0.25)",
            boxShadow: "0 0 12px 2px rgba(255, 244, 214, 0.08)",
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -30, 0, 30, 0],
            x: [0, 20, 0, -20, 0],
            opacity: [0.15, 0.6, 0.15, 0.6, 0.15],
            scale: [1, 1.4, 1, 0.8, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// ───────────────────────────────────────────────
// 2. BACKGROUND
// ───────────────────────────────────────────────
const Background = () => {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Base image – replace with your preferred image from /public */}
      <div className="absolute inset-0 bg-[#0D0D0D]">
        <Image
          src="/HeroBackground.webp"
          alt="Commercial Christmas Lights Background"
          fill
          priority
          className="object-cover opacity-40"
          quality={90}
        />
      </div>

      {/* Layer 1: Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Layer 2: Large radial gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(255, 244, 214, 0.08) 0%, transparent 70%)",
        }}
      />

      {/* Layer 3: Soft vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at center, transparent 30%, rgba(0,0,0,0.6) 100%)",
        }}
      />

      {/* Layer 4: Subtle blur (via backdrop blur on a pseudo layer) */}
      <div className="absolute inset-0 backdrop-blur-[2px]" />

      {/* Layer 5: Warm white ambient glow */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 40% at 50% 45%, rgba(255, 244, 214, 0.07) 0%, transparent 70%)",
        }}
      />

      {/* Layer 6: Floating particles (CSS) */}
      <FloatingParticles />
    </div>
  );
};

// ───────────────────────────────────────────────
// 3. SUCCESS ICON
// ───────────────────────────────────────────────
const SuccessIcon = () => {
  return (
    <motion.div
      className="relative mx-auto mb-6 flex h-24 w-24 items-center justify-center"
      initial={{ scale: 0.4, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 24,
        delay: 0.15,
      }}
    >
      {/* Ambient Golden Pulsing Glow Rings */}
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(245, 208, 97, 0.45) 0%, transparent 70%)",
          filter: "blur(12px)",
        }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0.95, 0.6] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute inset-[-12px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(229, 193, 88, 0.22) 0%, transparent 65%)",
          filter: "blur(16px)",
        }}
        animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4,
        }}
      />

      {/* 3D Metallic Golden Outer Beveled Ring */}
      <div
        className="relative z-10 flex h-full w-full items-center justify-center rounded-full p-[3px]"
        style={{
          background:
            "linear-gradient(135deg, #FFF8D5 0%, #F7D674 20%, #E5B842 45%, #9E7719 75%, #F5D061 100%)",
          boxShadow:
            "0 16px 45px rgba(0, 0, 0, 0.75), 0 0 35px rgba(245, 208, 97, 0.45), inset 0 2px 2px rgba(255, 255, 255, 0.85)",
        }}
      >
        {/* Inner Dark Polished Metallic Surface */}
        <div
          className="relative flex h-full w-full items-center justify-center rounded-full overflow-hidden"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, rgba(35, 28, 14, 0.96) 0%, rgba(15, 11, 4, 0.98) 100%)",
            border: "1px solid rgba(245, 208, 97, 0.35)",
            boxShadow:
              "inset 0 4px 14px rgba(0,0,0,0.92), inset 0 -2px 6px rgba(245, 208, 97, 0.2)",
          }}
        >
          {/* 3D Light Highlight Reflection */}
          <div
            className="absolute inset-0 pointer-events-none rounded-full"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 248, 213, 0.28) 0%, transparent 45%, rgba(0,0,0,0.45) 100%)",
            }}
          />

          {/* 3D Golden Checkmark Icon with Drop Shadow & Multi-Stop Gold Gradient */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
              delay: 0.25,
            }}
            className="relative z-20 flex items-center justify-center"
          >
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                filter:
                  "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.7)) drop-shadow(0 0 18px rgba(245, 208, 97, 0.65))",
              }}
            >
              <defs>
                <linearGradient
                  id="success-check-gold-3d"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#FFF8D5" />
                  <stop offset="30%" stopColor="#F7D674" />
                  <stop offset="65%" stopColor="#E5B842" />
                  <stop offset="100%" stopColor="#A37519" />
                </linearGradient>
              </defs>
              <path
                d="M20 6L9 17L4 12"
                stroke="url(#success-check-gold-3d)"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ───────────────────────────────────────────────
// 4. INFO PANEL
// ───────────────────────────────────────────────
const InfoPanel = () => {
  return (
    <motion.div
      className="mt-6 w-full max-w-[480px] rounded-2xl p-5"
      style={{
        background: "rgba(20, 20, 20, 0.5)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255, 255, 255, 0.05)",
        boxShadow: "inset 0 1px 0 rgba(255,255,255,0.03)",
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
          style={{
            background: "rgba(255, 244, 214, 0.06)",
            border: "1px solid rgba(255, 244, 214, 0.08)",
          }}
        >
          <Clock size={20} className="text-[#E8D7A5]" strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold tracking-wide text-white">
            We'll Be In Touch Within 24 Hours
          </h3>
          <p className="mt-1 text-sm leading-relaxed text-[#B8B8B8]">
            Our team is reviewing your request and one of our lighting
            specialists will contact you shortly to discuss your project and
            provide a personalized quote.
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// ───────────────────────────────────────────────
// 5. CTA BUTTONS
// ───────────────────────────────────────────────
const CTAButtons = () => {
  return (
    <motion.div
      className="mt-8 flex w-full max-w-[480px] flex-col gap-3 sm:flex-row sm:gap-4"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
    >
      {/* Primary CTA */}
      <Link
        href="/"
        className="group relative flex flex-1 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-medium text-[#0D0D0D] transition-all duration-300 hover:shadow-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #FFF8D5 0%, #F5D061 50%, #E5C158 100%)",
          boxShadow:
            "0 6px 28px rgba(245, 208, 97, 0.25), inset 0 1.5px 0 rgba(255,255,255,0.7), inset 0 -2px 4px rgba(163,117,25,0.4)",
        }}
      >
        <span className="relative z-10 flex items-center gap-2.5 font-bold">
          <Home size={18} strokeWidth={2} />
          Return to Homepage
        </span>
        <span
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "linear-gradient(135deg, #FFFDF0 0%, #F7D674 100%)",
            boxShadow: "0 0 40px rgba(245, 208, 97, 0.4)",
          }}
        />
      </Link>

      {/* Secondary Call CTA - Direct Phone Link with 3D Gold Text & Subtle BG Image */}
      <Link
        href="tel:7202967711"
        className="group relative flex flex-1 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 py-3.5 text-sm font-bold transition-all duration-300 hover:shadow-2xl overflow-hidden"
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(35, 28, 14, 0.95) 0%, rgba(15, 11, 4, 0.98) 100%)",
          backdropFilter: "blur(16px)",
          border: "1px solid rgba(245, 208, 97, 0.4)",
          boxShadow:
            "0 6px 24px rgba(0, 0, 0, 0.6), inset 0 1px 1.5px rgba(255, 248, 213, 0.3), 0 0 20px rgba(245, 208, 97, 0.12)",
        }}
      >
        {/* Subtle Background Image inside button */}
        <Image
          src="/BeforeAfter/BackGroundSubtle.webp"
          alt=""
          fill
          className="object-cover opacity-20 pointer-events-none rounded-full"
        />

        {/* 3D Top Edge Reflection */}
        <div
          className="absolute inset-x-4 top-0 h-1/2 rounded-t-full pointer-events-none"
          style={{
            background: "linear-gradient(180deg, rgba(255,248,213,0.15) 0%, transparent 100%)",
          }}
        />

        {/* Phone Icon with Gold Glow */}
        <div
          className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full shrink-0"
          style={{
            background: "linear-gradient(135deg, #FFF8D5 0%, #E5C158 100%)",
            boxShadow: "0 0 12px rgba(245, 208, 97, 0.5)",
          }}
        >
          <Phone size={14} strokeWidth={2.2} className="text-[#0D0D0D]" />
        </div>

        {/* Luxury 3D Golden Color Text */}
        <span
          className="relative z-10 tracking-wide font-bold uppercase text-xs sm:text-sm"
          style={{
            background: "linear-gradient(135deg, #FFF8D5 0%, #F5D061 40%, #E5C158 70%, #FFF8D5 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.8)) drop-shadow(0 0 8px rgba(245, 208, 97, 0.4))",
          }}
        >
          Call Us Now
        </span>

        {/* Hover Highlight Overlay */}
        <span
          className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "rgba(245, 208, 97, 0.08)",
            boxShadow: "inset 0 0 30px rgba(245, 208, 97, 0.15)",
          }}
        />
      </Link>
    </motion.div>
  );
};

// ───────────────────────────────────────────────
// 6. GLASS CARD
// ───────────────────────────────────────────────
const GlassCard = () => {
  return (
    <motion.div
      className="relative w-full max-w-[580px] overflow-hidden rounded-[28px] p-8 sm:p-10 md:p-12"
      style={{
        background: "rgba(23, 23, 23, 0.65)",
        backdropFilter: "blur(24px) saturate(1.1)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: `
          0 30px 80px rgba(0, 0, 0, 0.7),
          0 0 0 1px rgba(255, 255, 255, 0.02) inset,
          0 1px 0 rgba(255, 255, 255, 0.05) inset,
          0 0 60px rgba(245, 208, 97, 0.05)
        `,
      }}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        delay: 0.08,
      }}
    >
      {/* Subtle Background Image Asset */}
      <Image
        src="/BeforeAfter/BackGroundSubtle.webp"
        alt=""
        fill
        className="object-cover rounded-[28px] opacity-15 pointer-events-none"
      />

      {/* Golden highlight edge */}
      <div
        className="absolute -inset-[1px] rounded-[28px] pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(245,208,97,0.15) 0%, transparent 40%, transparent 60%, rgba(245,208,97,0.08) 100%)",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 rounded-[28px] pointer-events-none opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "128px 128px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center">
        {/* Success Icon */}
        <SuccessIcon />

        {/* Heading */}
        <motion.h1
          className="text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.5, ease: "easeOut" }}
        >
          Your Quote Request
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "linear-gradient(135deg, #FFF8D5 0%, #F5D061 45%, #E5C158 80%, #FFF8D5 100%)",
              filter: "drop-shadow(0 2px 8px rgba(245, 208, 97, 0.3))",
            }}
          >
            Has Been Received!
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="mt-3 max-w-[460px] text-sm leading-relaxed text-[#DCD3BF] sm:text-base"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.5, ease: "easeOut" }}
        >
          Thank you for contacting us. Our lighting specialists have
          successfully received your request and will carefully review your
          project. We'll get back to you within the next 24 hours.
        </motion.p>

        {/* Info Panel */}
        <InfoPanel />

        {/* CTA Buttons */}
        <CTAButtons />
      </div>
    </motion.div>
  );
};

// ───────────────────────────────────────────────
// 7. LOGO
// ───────────────────────────────────────────────
const Logo = () => {
  return (
    <motion.div
      className="mb-8 flex justify-center"
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.04, duration: 0.6, ease: "easeOut" }}
    >
      <Link
        href="/"
        className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E8D7A5] rounded-xl p-1"
        aria-label="Denver Christmas Lights Home"
      >
        <ThemeLogoIcon className="h-10 sm:h-12 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105" />
        <div className="flex flex-col justify-center select-none">
          <span className="font-playfair text-xl sm:text-2xl font-bold tracking-[0.16em] uppercase leading-none mb-1 text-white transition-opacity group-hover:opacity-90">
            DENVER
          </span>
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.24em] uppercase leading-none text-[#E8D7A5]">
            CHRISTMAS LIGHTS
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

// ───────────────────────────────────────────────
// 8. BOTTOM TEXT
// ───────────────────────────────────────────────
const BottomText = () => {
  return (
    <motion.p
      className="mt-8 text-center text-xs text-[#A3977C] sm:text-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
    >
      Need immediate assistance?{" "}
      <Link
        href="tel:7202967711"
        className="font-semibold transition-colors underline decoration-[#E5C158]/40 underline-offset-4 hover:decoration-[#E5C158]"
        style={{
          background: "linear-gradient(135deg, #FFF8D5 0%, #F5D061 50%, #E5C158 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8))",
        }}
      >
        Call us anytime (720) 296-7711
      </Link>{" "}
      — we're here to help.
    </motion.p>
  );
};

// ───────────────────────────────────────────────
// 9. MAIN PAGE
// ───────────────────────────────────────────────
export default function SuccessPage() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0D0D0D] p-4 sm:p-6">
      {/* Background */}
      <Background />

      {/* Content */}
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center justify-center">
        {/* Logo */}
        <Logo />

        {/* Glass Card */}
        <GlassCard />

        {/* Bottom Text */}
        <BottomText />
      </div>
    </div>
  );
}
