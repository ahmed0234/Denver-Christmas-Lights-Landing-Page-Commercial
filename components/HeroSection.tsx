"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  TreePine,
  Phone,
  CalendarCheck,
  ShieldCheck,
  Award,
  Star,
  Wrench,
  Snowflake,
} from "lucide-react";
import QuoteForm from "./QuoteForm";

// ── Snowflake + thin red divider ───────────────────────────────────────────────
function HeadingDivider() {
  return (
    <div className="flex items-center gap-3.5 my-3 w-full max-w-[480px] xl:max-w-[540px]">
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--primary) 100%)",
        }}
      />
      <Snowflake
        size={18}
        style={{
          color: "var(--primary)",
          filter: "drop-shadow(0 0 6px rgba(217, 53, 53, 0.6))",
        }}
      />
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(90deg, var(--primary) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

// ── Trust Badge item ───────────────────────────────────────────────────────────
function TrustBadge({
  icon: Icon,
  title,
  description,
  delay,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center gap-2 px-3"
    >
      {/* Icon circle */}
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center border"
        style={{
          borderColor: "var(--primary)",
          backgroundColor: "rgba(217,53,53,0.08)",
        }}
      >
        <Icon size={18} style={{ color: "var(--primary)" }} />
      </div>
      <p
        className="text-xs font-semibold leading-tight xl:text-sm"
        style={{ color: "var(--heading)" }}
      >
        {title}
      </p>
      <p className="text-[11px] leading-snug" style={{ color: "var(--muted)" }}>
        {description}
      </p>
    </motion.div>
  );
}

// ── Main HeroSection ───────────────────────────────────────────────────────────
export default function HeroSection() {
  const trustBadges = [
    {
      icon: ShieldCheck,
      title: "Fully Insured",
      description: "Your home is in safe hands",
    },
    {
      icon: Award,
      title: "Satisfaction Guaranteed",
      description: "We're not happy until you are",
    },
    {
      icon: Star,
      title: "Premium Quality Materials",
      description: "Commercial-grade lights that last",
    },
    {
      icon: Wrench,
      title: "Maintenance Included",
      description: "We keep your lights perfect all season",
    },
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden"
    >
      {/* ── Background Image ──────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/HeroBackground.png"
          alt="Beautiful Christmas-lit home at night"
          fill
          priority
          className="object-cover object-center"
          quality={95}
        />
        {/* Directional overlay: dark on left (text), lighter on right (house) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(100deg, rgba(9,7,7,0.90) 0%, rgba(9,7,7,0.78) 32%, rgba(9,7,7,0.48) 52%, rgba(9,7,7,0.15) 72%, rgba(9,7,7,0.06) 100%)",
          }}
        />
        {/* Warm colour cast over house */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 68% 55%, rgba(180,90,20,0.14) 0%, transparent 70%)",
          }}
        />
        {/* Bottom vignette */}
        <div
          className="absolute inset-x-0 bottom-0 h-48 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, rgba(9,7,7,0.78) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Bokeh Particles ───────────────────────────────────────────────────── */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 6 + 3,
              height: Math.random() * 6 + 3,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: i % 3 === 0 ? "var(--gold)" : "var(--primary)",
              filter: "blur(2px)",
            }}
            animate={{
              opacity: [0.2, 0.7, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 2.5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── Main Content ──────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-28 md:pt-36 lg:pt-32 pb-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-12 lg:gap-12 xl:gap-12 ">
          {/* ── LEFT COLUMN ──────────────────────────────────────────────────── */}
          <div className="w-full lg:max-w-[620px] xl:max-w-[960px] flex flex-col items-start lg:pt-6 ">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 mb-5"
            >
              <TreePine size={22} style={{ color: "var(--primary)" }} />
              <span
                className="text-xs  font-semibold tracking-[0.22em] uppercase"
                style={{ color: "var(--primary)" }}
              >
                Professional Christmas Light Installation
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl  font-bold leading-[1] tracking-tight mb-1 font-playfair"
              style={{ color: "var(--heading)" }}
            >
              We Make Your Home
            </motion.h1>

            {/* "the Brightest" — red + decorative underline */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.28,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative inline-block mb-1"
            >
              <span
                className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-[1] tracking-tight italic font-playfair"
                style={{
                  color: "var(--primary)",
                  textShadow: "0 0 40px rgba(217,53,53,0.45)",
                }}
              >
                the Brightest
              </span>
              {/* Curly SVG underline */}
              <svg
                viewBox="0 0 320 18"
                fill="none"
                className="absolute -bottom-2 left-0 w-full"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M4 10 C40 2, 80 18, 120 10 C160 2, 200 18, 240 10 C280 2, 316 15, 316 10"
                  stroke="var(--primary)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.7,
                    ease: "easeOut",
                  }}
                />
              </svg>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.36,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl font-bold leading-[1] tracking-tight font-playfair"
              style={{ color: "var(--heading)" }}
            >
              on the Block
            </motion.h1>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.55 }}
              className="w-full"
            >
              <HeadingDivider />
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base md:text-lg leading-normal max-w-[440px] xl:max-w-[560px] mb-6 2xl:text-xl"
              style={{ color: "var(--body)" }}
            >
              Custom designs, expert installation, and worry free service from
              start to finish. Enjoy a stunning holiday display without lifting
              a ladder
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.62 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              {/* Primary — Call */}
              <motion.a
                id="hero-cta-call"
                href="tel:+17205134567"
                whileHover={{
                  scale: 1.04,
                  boxShadow: "0 8px 32px rgba(217,53,53,0.55)",
                }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-sm text-white tracking-wide transition-all duration-200"
                style={{
                  background:
                    "linear-gradient(135deg, #d93535 0%, #c62828 60%, #a51c1c 100%)",
                  boxShadow: "0 4px 20px rgba(217,53,53,0.45)",
                }}
              >
                <Phone size={16} />
                Call (720) 513-4567
              </motion.a>

              {/* Secondary — Get Quote */}
              <motion.a
                id="hero-cta-quote"
                href="#quote"
                whileHover={{
                  backgroundColor: "rgba(217,53,53,0.1)",
                  boxShadow: "0 4px 20px rgba(217,53,53,0.25)",
                }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2.5 px-7 py-4 rounded-xl font-semibold text-sm text-white tracking-wide border transition-all duration-200"
                style={{
                  borderColor: "var(--primary)",
                  backgroundColor: "rgba(217,53,53,0.06)",
                  backdropFilter: "blur(4px)",
                }}
              >
                <CalendarCheck size={16} />
                Get a Free Quote
              </motion.a>
            </motion.div>

            {/* Trust Badges — wider container matching design specifications */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.72 }}
              className="w-full max-w-[760px]"
            >
              <div
                className="grid grid-cols-2 md:grid-cols-4 rounded-xl overflow-hidden p-5 gap-y-4"
                style={{
                  backgroundColor: "rgba(9,7,7,0.6)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(106,45,38,0.5)",
                }}
              >
                {trustBadges.map((badge, i) => (
                  <div key={badge.title} className="relative">
                    {/* Vertical separator */}
                    {i > 0 && (
                      <div
                        className="absolute left-0 top-2 bottom-2 w-px hidden md:block"
                        style={{ backgroundColor: "var(--border)" }}
                      />
                    )}
                    <TrustBadge
                      icon={badge.icon}
                      title={badge.title}
                      description={badge.description}
                      delay={0.72 + i * 0.08}
                    />
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN — Form ──────────────────────────────────────────── */}
          <div
            id="quote"
            className="w-full lg:max-w-[480px] xl:max-w-[500px] shrink-0 "
          >
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
