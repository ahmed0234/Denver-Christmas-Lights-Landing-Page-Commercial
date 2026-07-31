"use client";

/**
 * FinalCTA.tsx
 * "Get Professional Christmas Light Installation" — Grand Finale Conversion Section.
 *
 * The last section before the footer. One job: convert visitors.
 *
 * Features:
 * - Full-width section with cinematic background image from /public/finalCTA/
 * - Two-column desktop layout: left (all copy + CTAs) / right (beautiful house image)
 * - Luxury glassmorphism floating container with golden border & ambient glow
 * - Lucide Snowflake icon scattered as floating ambient particles
 * - Premium animated primary gold gradient button + dark glass secondary call button
 * - Three trust badges with elegant separators
 * - Smooth Framer Motion scroll-triggered entrance animations
 * - Fully accessible: semantic HTML, ARIA labels, keyboard-navigable
 * - Fully responsive: stacks vertically on mobile (heading → paragraph → CTA → trust)
 */

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import {
  TreePine,
  Home,
  Phone,
  ArrowRight,
  Snowflake,
  Sparkles,
  ShieldCheck,
  Star,
} from "lucide-react";

// ─── Ambient Snowflake Positions ─────────────────────────────────────────────

const AMBIENT_FLAKES = [
  {
    id: 1,
    left: "3%",
    top: "12%",
    size: 16,
    opacity: 0.28,
    dur: "9s",
    delay: "0s",
  },
  {
    id: 2,
    left: "92%",
    top: "8%",
    size: 13,
    opacity: 0.22,
    dur: "11s",
    delay: "2s",
  },
  {
    id: 3,
    left: "7%",
    top: "72%",
    size: 18,
    opacity: 0.2,
    dur: "8.5s",
    delay: "1.5s",
  },
  {
    id: 4,
    left: "88%",
    top: "80%",
    size: 14,
    opacity: 0.25,
    dur: "10s",
    delay: "3.5s",
  },
  {
    id: 5,
    left: "50%",
    top: "4%",
    size: 11,
    opacity: 0.18,
    dur: "12s",
    delay: "1s",
  },
  {
    id: 6,
    left: "18%",
    top: "88%",
    size: 15,
    opacity: 0.22,
    dur: "9.5s",
    delay: "4s",
  },
  {
    id: 7,
    left: "76%",
    top: "58%",
    size: 12,
    opacity: 0.15,
    dur: "13s",
    delay: "0.5s",
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: { duration: 0.9, ease: "easeOut", delay },
  }),
};

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Christmas tree + thin gold divider lines (eyebrow separator) */
function GoldDivider({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 w-full">
      <div
        className="flex-1 h-px max-w-[60px] sm:max-w-[80px]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--accent) 100%)",
        }}
      />
      <TreePine
        size={18}
        style={{
          color: "var(--accent)",
          filter: "drop-shadow(0 0 6px var(--accent-glow))",
        }}
      />
      <div
        className="flex-1 h-px max-w-[60px] sm:max-w-[80px]"
        style={{
          background:
            "linear-gradient(90deg, var(--accent) 0%, transparent 100%)",
        }}
      />
      {label && (
        <>
          <span
            className="text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase whitespace-nowrap"
            style={{ color: "var(--accent)" }}
          >
            {label}
          </span>
          <div
            className="flex-1 h-px max-w-[60px] sm:max-w-[80px]"
            style={{
              background:
                "linear-gradient(90deg, var(--accent) 0%, transparent 100%)",
            }}
          />
        </>
      )}
    </div>
  );
}

/** Trust item with icon + text */
function TrustItem({
  icon: Icon,
  label,
}: {
  icon: React.ElementType;
  label: string;
}) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
      <div
        className="w-8 h-8 rounded-full border flex items-center justify-center shrink-0"
        style={{
          borderColor: "var(--border-color)",
          background: "var(--bg-glass)",
          boxShadow: "0 0 10px var(--accent-glow-faint)",
        }}
      >
        <Icon
          size={14}
          style={{
            color: "var(--accent)",
            filter: "drop-shadow(0 0 4px var(--accent-glow))",
          }}
        />
      </div>
      <span
        className="text-[11px] sm:text-xs font-medium leading-tight"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FinalCTA() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  return (
    <section
      ref={containerRef}
      id="final-cta"
      className="relative w-full overflow-hidden py-10 sm:py-8 lg:py-6 font-sans"
      aria-label="Get a free Christmas light installation quote"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ── Ambient Section Glows ───────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[28rem] h-[28rem] rounded-full blur-[120px] opacity-25"
          style={{ background: "var(--accent-glow)" }}
        />
        <div
          className="absolute right-0 bottom-0 w-72 h-72 rounded-full blur-[100px] opacity-20"
          style={{ background: "var(--gold-glow)" }}
        />
      </div>

      {/* ── Floating Snowflake Particles ────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {AMBIENT_FLAKES.map((flake) => (
          <div
            key={flake.id}
            className="absolute animate-bounce"
            style={{
              left: flake.left,
              top: flake.top,
              opacity: flake.opacity,
              animationDuration: flake.dur,
              animationDelay: flake.delay,
            }}
          >
            <Snowflake
              size={flake.size}
              style={{
                color: "var(--accent)",
                filter: "drop-shadow(0 0 4px var(--accent-glow-soft))",
              }}
            />
          </div>
        ))}
      </div>

      {/* ── Main Content Wrapper ────────────────────────────────────────────── */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
        {/* ── LUXURY FLOATING CONTAINER ─────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0}
          className="relative w-full rounded-[24px] sm:rounded-[32px] overflow-hidden border"
          style={{
            borderColor: "var(--border-color)",
            background:
              "linear-gradient(145deg, color-mix(in srgb, var(--bg-card) 85%, transparent), color-mix(in srgb, var(--bg-primary) 95%, transparent))",
            boxShadow:
              "var(--shadow-card-hover), 0 0 50px var(--accent-glow-faint), inset 0 1px 0 var(--highlight-surface)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        >
          {/* Golden top border shimmer line */}
          <div
            className="absolute inset-x-0 top-0 h-px pointer-events-none"
            style={{ background: "var(--card-border-gradient)" }}
          />
          {/* Ambient corner glow inside container */}
          <div
            className="absolute -top-16 -left-16 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none"
            style={{ background: "var(--accent-glow)" }}
          />
          <div
            className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full blur-3xl opacity-15 pointer-events-none"
            style={{ background: "var(--gold-glow)" }}
          />

          {/* ── Two-Column Grid ─────────────────────────────────────────────── */}
          <div className="relative flex flex-col lg:flex-row min-h-[420px] sm:min-h-[480px]">
            {/* ── LEFT COLUMN: All Content ──────────────────────────────────── */}
            <div className="relative z-10 flex flex-col justify-center gap-5 sm:gap-6 px-6 sm:px-8 md:px-10 lg:px-12 xl:px-14 py-10 sm:py-12 lg:py-14 w-full lg:w-[54%] xl:w-[52%]">
              {/* Eyebrow Divider Row */}
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={0.1}
                className="flex items-center gap-3"
              >
                <GoldDivider />
                <span
                  className="text-[11px] sm:text-xs font-bold tracking-[0.22em] uppercase whitespace-nowrap"
                  style={{ color: "var(--accent)" }}
                ></span>
                <div
                  className="flex-1 h-px max-w-[80px]"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--accent) 0%, transparent 100%)",
                  }}
                />
              </motion.div>

              {/* Main Heading */}
              <motion.h2
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={0.15}
                className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
                style={{ fontFamily: "var(--font-sans, Georgia, serif)" }}
              >
                <span style={{ color: "var(--text-heading)" }}>
                  Christmas Light
                </span>
                <br />
                <span
                  style={{
                    background: "var(--gradient-accent-text)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 2px 16px var(--accent-glow-soft))",
                  }}
                >
                  Installation
                </span>
                <br />
                <span style={{ color: "var(--text-heading)" }}>
                  For Your Denver Home
                </span>
              </motion.h2>

              {/* Supporting Description */}
              <motion.p
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={0.22}
                className="text-sm sm:text-base leading-relaxed max-w-[44ch]"
                style={{ color: "var(--text-body)" }}
              >
                Create a beautiful holiday display without climbing ladders,
                working in the cold or sacrificing your weekend.
              </motion.p>

              {/* Thin Separator + Home Icon Quote Row */}
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={0.28}
                className="flex flex-col gap-3.5"
              >
                {/* Thin gold divider */}
                <div
                  className="h-px w-20"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--accent) 0%, transparent 100%)",
                  }}
                />

                {/* Quote row: icon circle + supporting copy */}
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <div
                    className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center shrink-0 shadow-lg mt-0.5"
                    style={{
                      borderColor: "var(--border-color)",
                      background:
                        "radial-gradient(circle at top, var(--bg-elevated), var(--bg-card))",
                      boxShadow:
                        "0 0 16px var(--accent-glow-soft), var(--shadow-card)",
                    }}
                  >
                    <Home
                      size={18}
                      style={{
                        color: "var(--accent)",
                        filter: "drop-shadow(0 0 5px var(--accent-glow))",
                      }}
                    />
                  </div>
                  <p
                    className="text-xs sm:text-sm leading-relaxed"
                    style={{ color: "var(--text-body)" }}
                  >
                    Tell us about your home and receive a custom residential
                    Christmas light installation quote.
                  </p>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={0.34}
                className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full"
              >
                {/* Primary: Gold Gradient Button */}
                <motion.a
                  href="#quote"
                  aria-label="Get my free Christmas light installation quote"
                  className="group relative inline-flex items-center justify-center gap-2.5 rounded-full px-5 sm:px-6 py-3.5 text-[11px] sm:text-xs font-bold tracking-[0.12em] uppercase overflow-hidden w-full sm:w-auto cursor-pointer"
                  style={{
                    background:
                      "linear-gradient(180deg, var(--gradient-btn-top) 0%, var(--gradient-btn-mid) 50%, var(--gradient-btn-bottom) 100%)",
                    color: "var(--bg-primary)",
                    boxShadow: "var(--shadow-btn)",
                  }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: "var(--shadow-btn-hover)",
                    y: -2,
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {/* Shine overlay on hover */}
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{
                      background:
                        "linear-gradient(105deg, transparent 30%, var(--btn-inner-highlight) 50%, transparent 70%)",
                    }}
                  />
                  <Sparkles size={15} className="shrink-0" />
                  <span>Get My Free Christmas Light Quote</span>
                  <motion.span
                    className="inline-flex shrink-0"
                    animate={{ x: [0, 3, 0] }}
                    transition={{
                      duration: 1.4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    <ArrowRight size={15} />
                  </motion.span>
                </motion.a>

                {/* Secondary: Dark Glass Phone Button */}
                <motion.a
                  href="tel:+17201234567"
                  aria-label="Call us"
                  className="group inline-flex items-center justify-center gap-2.5 rounded-full px-5 sm:px-6 py-3.5 text-[11px] sm:text-xs font-bold tracking-[0.12em] uppercase border w-full sm:w-auto cursor-pointer transition-all duration-300"
                  style={{
                    borderColor: "var(--border-color)",
                    background: "var(--bg-glass)",
                    color: "var(--text-body)",
                    backdropFilter: "blur(10px)",
                    boxShadow: "var(--shadow-card)",
                  }}
                  whileHover={{
                    scale: 1.02,
                    y: -2,
                    borderColor: "var(--accent)",
                    boxShadow:
                      "var(--shadow-card-hover), 0 0 16px var(--accent-glow-soft)",
                  }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <Phone
                    size={14}
                    className="shrink-0 group-hover:animate-pulse"
                    style={{ color: "var(--accent)" }}
                  />
                  <span>Call (720) 123-4567</span>
                </motion.a>
              </motion.div>

              {/* Trust Badges Row */}
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeUp}
                custom={0.42}
                className="flex flex-col sm:flex-row items-center gap-4 sm:gap-0 w-full pt-1"
              >
                {/* Top divider */}
                <div
                  className="w-full sm:hidden h-px mb-1"
                  style={{ background: "var(--border-color)", opacity: 0.5 }}
                />

                {/* Trust item 1 */}
                <TrustItem icon={Snowflake} label="Custom Design" />

                {/* Separator */}
                <div
                  className="hidden sm:block h-5 w-px mx-4 sm:mx-5 opacity-50 shrink-0"
                  style={{ background: "var(--border-color)" }}
                />

                {/* Trust item 2 */}
                <TrustItem
                  icon={ShieldCheck}
                  label="Professional Installation"
                />

                {/* Separator */}
                <div
                  className="hidden sm:block h-5 w-px mx-4 sm:mx-5 opacity-50 shrink-0"
                  style={{ background: "var(--border-color)" }}
                />

                {/* Trust item 3 */}
                <TrustItem
                  icon={Star}
                  label="A Holiday Display Created For Your Home"
                />
              </motion.div>
            </div>

            {/* ── RIGHT COLUMN: Background Image ────────────────────────────── */}
            <div className="relative lg:absolute lg:right-0 lg:top-0 lg:bottom-0 w-full lg:w-[52%] xl:w-[54%] h-56 sm:h-72 lg:h-auto overflow-hidden">
              {/* Image */}
              <motion.div
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                variants={fadeIn}
                custom={0.2}
                className="absolute inset-0"
              >
                <Image
                  src="/FinalCta/BackgroundImage.webp"
                  alt="Beautifully decorated Denver home with premium Christmas lights installed along the roofline and landscaping"
                  fill
                  priority
                  className="object-cover object-center saturate-110 contrast-105 brightness-105"
                  quality={95}
                  sizes="(max-width: 1024px) 100vw, 54vw"
                />
              </motion.div>

              {/* Left-edge horizontal gradient to smoothly blend image into card */}
              <div
                className="absolute inset-y-0 left-0 w-20 sm:w-28 lg:w-36 pointer-events-none z-10"
                style={{
                  background:
                    "linear-gradient(90deg, color-mix(in srgb, var(--bg-card) 85%, transparent) 0%, transparent 100%)",
                }}
              />

              {/* Ultra-subtle top/bottom vignette for edge blending */}
              <div
                className="absolute inset-x-0 top-0 h-12 sm:h-16 pointer-events-none z-10"
                style={{
                  background:
                    "linear-gradient(180deg, color-mix(in srgb, var(--bg-card) 35%, transparent) 0%, transparent 100%)",
                }}
              />
              <div
                className="absolute inset-x-0 bottom-0 h-12 sm:h-16 pointer-events-none z-10"
                style={{
                  background:
                    "linear-gradient(0deg, color-mix(in srgb, var(--bg-card) 35%, transparent) 0%, transparent 100%)",
                }}
              />
            </div>
          </div>

          {/* Golden bottom border shimmer line */}
          <div
            className="absolute inset-x-0 bottom-0 h-px pointer-events-none"
            style={{ background: "var(--card-border-gradient)" }}
          />
        </motion.div>
      </div>
    </section>
  );
}
