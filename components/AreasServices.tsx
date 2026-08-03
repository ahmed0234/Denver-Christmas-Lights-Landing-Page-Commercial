"use client";

/**
 * AreasServices.tsx
 * "Areas We Serve" — Residential Christmas Light Installation section.
 *
 * Responsive, full-width section with integrated background map & single grid sequence.
 *
 * Stack: Next.js (App Router) · Tailwind CSS · Motion for React · Lucide React
 */

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import {
  MapPin,
  Sparkle,
  Phone,
  ShieldCheck,
  Star,
  Clock,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────

const LOCATIONS = [
  "Denver",
  "Aurora",
  "Lakewood",
  "Centennial",
  "Littleton",
  "Arvada",
  "Westminster",
  "Highlands Ranch",
  "Parker",
  "Englewood",
];

const TRUST_ITEMS = [
  {
    icon: ShieldCheck,
    title: "Locally Trusted",
    body: "Proudly serving our community",
  },
  {
    icon: Star,
    title: "Professional Service",
    body: "Experts in holiday lighting",
  },
  {
    icon: Clock,
    title: "On Time, Every Time",
    body: "Reliable from start to finish",
  },
  {
    icon: BadgeCheck,
    title: "5-Star Rated",
    body: "By your neighbors",
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

// ─── Sub-components ───────────────────────────────────────────────────────────

function Eyebrow() {
  return (
    <div className="flex items-center gap-2.5 sm:gap-3">
      <div
        className="h-px flex-1 max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem]"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--accent) 100%)",
        }}
      />
      <span
        className="text-[10px] sm:text-xs font-semibold tracking-[0.22em] uppercase whitespace-nowrap"
        style={{ color: "var(--accent)" }}
      >
        Areas We Serve
      </span>
      <Sparkle
        size={10}
        className="shrink-0"
        style={{ color: "var(--accent)" }}
      />
      <div
        className="h-px flex-1 max-w-[3rem] sm:max-w-[4rem] md:max-w-[5rem]"
        style={{
          background:
            "linear-gradient(90deg, var(--accent) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

/** Location Card with subtle background map slice */
function LocationCard({ name, index }: { name: string; index: number }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={0.04 * index}
      className="group relative overflow-hidden rounded-xl sm:rounded-2xl border cursor-default select-none transition-all duration-300"
      style={{
        borderColor: "var(--border-color)",
        boxShadow: "var(--shadow-card)",
        background: "var(--bg-card)",
      }}
      whileHover={{
        y: -4,
        scale: 1.02,
        transition: { duration: 0.25, ease: "easeOut" },
      }}
    >
      {/* Subtle, muted decorative map background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Image
          src="/AreaSection/MapImage.webp"
          alt=""
          fill
          aria-hidden="true"
          className="object-cover object-center opacity-25 sm:opacity-30 group-hover:opacity-45 brightness-50 saturate-90 transition-all duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
        {/* Dark vignette tint to make location text pop */}
        <div
          className="absolute inset-0 transition-opacity duration-500"
          style={{
            background:
              "linear-gradient(180deg, rgba(8,8,7,0.60) 0%, rgba(8,8,7,0.85) 100%)",
          }}
        />
      </div>

      {/* Hover border highlight */}
      <div
        className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1.5px var(--accent)" }}
      />

      {/* Primary Card Content: Pin Icon & City Name */}
      <div className="relative z-10 flex flex-col items-center justify-center h-28 sm:h-36 md:h-40 p-3 text-center">
        <div className="mb-2 sm:mb-3 relative flex items-center justify-center">
          <div
            className="absolute w-8 h-8 sm:w-10 sm:h-10 rounded-full blur-md opacity-60 group-hover:opacity-90 transition-opacity duration-300"
            style={{ background: "var(--accent-glow)" }}
          />
          <MapPin
            size={24}
            className="sm:w-7 sm:h-7 relative transition-transform duration-300 group-hover:scale-110"
            style={{
              color: "var(--accent)",
              filter: "drop-shadow(0 0 6px var(--accent-glow))",
            }}
          />
        </div>
        <span
          className="text-[15px] sm:text-sm md:text-sm 2xl:text-base font-bold tracking-[0.16em] uppercase leading-tight"
          style={{ color: "var(--text-heading)" }}
        >
          {name}
        </span>
      </div>
    </motion.div>
  );
}

/** CTA Card: Clean, minimal, conversion-focused */
function CTACard() {
  return (
    <motion.div
      variants={scaleIn}
      className="group relative overflow-hidden rounded-xl sm:rounded-2xl border flex flex-col items-center justify-between p-5 sm:p-7 md:p-8 text-center h-full min-h-[16rem] sm:min-h-[18rem] lg:min-h-0 lg:col-start-6 lg:row-start-1 lg:row-span-2 col-span-2 sm:col-span-3 lg:col-span-1"
      style={{
        borderColor: "var(--border-color)",
        background:
          "linear-gradient(145deg, var(--gradient-card-top), var(--gradient-card-bottom))",
        boxShadow: "var(--shadow-card)",
      }}
    >
      {/* Ambient background lighting */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 sm:w-60 h-48 sm:h-60 rounded-full blur-3xl opacity-25 group-hover:opacity-45 transition-opacity duration-500 pointer-events-none"
        style={{ background: "var(--accent-glow)" }}
      />
      <div
        className="absolute inset-0 rounded-xl sm:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ boxShadow: "inset 0 0 0 1.5px rgba(229,193,88,0.55)" }}
      />

      {/* Top Section — Icon Badge */}
      <div className="relative z-10 pt-1 sm:pt-2 flex flex-col items-center">
        <div
          className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full border shadow-md transition-transform duration-300 group-hover:scale-105"
          style={{
            borderColor: "var(--border-color)",
            background:
              "radial-gradient(ellipse at top, var(--bg-elevated), var(--bg-primary))",
            boxShadow: "0 0 20px var(--accent-glow-soft)",
          }}
        >
          <MapPin
            size={22}
            className="sm:w-6 sm:h-6"
            style={{
              color: "var(--accent)",
              filter: "drop-shadow(0 0 8px var(--accent-glow))",
            }}
          />
        </div>
      </div>

      {/* Center Section — Clean Headline & Microtext */}
      <div className="relative z-10 flex flex-col items-center gap-2 sm:gap-3 my-auto py-3">
        <h3
          className="text-lg sm:text-xl lg:text-2xl font-bold leading-tight tracking-tight"
          style={{ color: "var(--text-heading)" }}
        >
          Don&apos;t see
          <br />
          your area listed?
        </h3>

        <div className="flex items-center gap-2">
          <div
            className="h-px w-6"
            style={{
              background: "linear-gradient(90deg, transparent, var(--accent))",
            }}
          />
          <Sparkle size={9} style={{ color: "var(--accent)", opacity: 0.7 }} />
          <div
            className="h-px w-6"
            style={{
              background: "linear-gradient(90deg, var(--accent), transparent)",
            }}
          />
        </div>

        <p
          className="text-xs sm:text-sm leading-relaxed max-w-[22ch]"
          style={{ color: "var(--text-muted)" }}
        >
          Contact us to verify service at your address.
        </p>
      </div>

      {/* Bottom Section — CTA Button */}
      <div className="relative z-10 pb-1 sm:pb-2 w-full flex justify-center">
        <motion.a
          href="#contact"
          className="inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-full px-5 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm font-bold tracking-wide overflow-hidden w-full max-w-[12rem] sm:max-w-[13rem]"
          style={{
            background:
              "linear-gradient(180deg, var(--gradient-btn-top) 0%, var(--gradient-btn-mid) 50%, var(--gradient-btn-bottom) 100%)",
            color: "var(--bg-primary)",
            boxShadow: "var(--shadow-btn)",
          }}
          whileHover={{
            scale: 1.04,
            boxShadow: "var(--shadow-btn-hover)",
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.97 }}
        >
          <Phone size={14} className="sm:w-4 sm:h-4" />
          <span>Contact Us</span>
          <ArrowRight size={13} className="sm:w-3.5 sm:h-3.5" />
        </motion.a>
      </div>
    </motion.div>
  );
}

/** Trust item */
function TrustItem({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
}) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 p-4 sm:p-5 flex-1 min-w-0">
      <div
        className="flex-shrink-0 flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full border"
        style={{
          borderColor: "var(--border-color)",
          background:
            "radial-gradient(ellipse at top, var(--bg-elevated), var(--bg-primary))",
          boxShadow: "0 0 12px var(--accent-glow-faint)",
        }}
      >
        <Icon
          size={18}
          style={{
            color: "var(--accent)",
            filter: "drop-shadow(0 0 4px var(--accent-glow))",
          }}
        />
      </div>
      <div className="min-w-0">
        <p
          className="text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase leading-tight truncate"
          style={{ color: "var(--text-heading)" }}
        >
          {title}
        </p>
        <p
          className="text-[11px] sm:text-xs leading-snug mt-0.5 truncate"
          style={{ color: "var(--text-muted)" }}
        >
          {body}
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AreasServices() {
  const topRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const trustRef = useRef<HTMLDivElement>(null);

  const topInView = useInView(topRef, { once: true, margin: "-80px" });
  const cardsInView = useInView(cardsRef, { once: true, margin: "-60px" });
  const trustInView = useInView(trustRef, { once: true, margin: "-40px" });

  return (
    <section
      id="areas-we-serve"
      className="relative w-full overflow-hidden font-sans"
      style={{ background: "var(--bg-primary)" }}
      aria-label="Areas We Serve"
    >
      {/* ── Header Background Map (Right-Side Background Only) ────────────── */}
      <div
        className="pointer-events-none absolute right-0 top-0 h-[36rem] sm:h-[44rem] lg:h-[42rem] xl:h-[44rem] w-full lg:w-[58%] xl:w-[52%] overflow-hidden z-0"
        aria-hidden="true"
      >
        <Image
          src="/AreaSection/MapImage.webp"
          alt=""
          fill
          priority
          className="object-cover object-center lg:object-right opacity-80 sm:opacity-85 lg:opacity-90 saturate-110 contrast-105"
          quality={90}
        />

        {/* Desktop Left-to-Right Edge Blend Gradient (melts smoothly from left text background) */}
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(90deg, var(--bg-primary, #080807) 0%, color-mix(in srgb, var(--bg-primary, #080807) 85%, transparent) 18%, color-mix(in srgb, var(--bg-primary, #080807) 20%, transparent) 45%, transparent 100%)",
          }}
        />

        {/* Mobile & Tablet Vertical Blend Gradient */}
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in srgb, var(--bg-primary, #080807) 85%, transparent) 0%, color-mix(in srgb, var(--bg-primary, #080807) 45%, transparent) 55%, var(--bg-primary, #080807) 100%)",
          }}
        />

        {/* Top Edge Fade */}
        <div
          className="absolute inset-x-0 top-0 h-16 sm:h-20"
          style={{
            background:
              "linear-gradient(180deg, var(--bg-primary,#080807) 0%, transparent 100%)",
          }}
        />

        {/* Bottom Edge Fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-24 sm:h-28"
          style={{
            background:
              "linear-gradient(0deg, var(--bg-primary,#080807) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Ambient glows */}
      <div
        className="pointer-events-none absolute inset-0 z-0"
        aria-hidden="true"
      >
        <div
          className="absolute left-1/4 top-1/4 h-80 sm:h-96 w-80 sm:w-96 -translate-x-1/2 rounded-full blur-[140px]"
          style={{ background: "var(--accent-glow-faint)" }}
        />
      </div>

      {/* Section Container */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-12 sm:py-16 lg:py-24">
        {/* ── TOP SECTION — Left text column (Over clean background) ────────────── */}
        <div
          ref={topRef}
          className="relative z-10 max-w-2xl lg:max-w-2xl xl:max-w-3xl flex flex-col items-center text-center lg:items-start lg:text-left gap-4 sm:gap-6 pb-10 sm:pb-14 lg:pb-16 mx-auto lg:mx-0"
        >
          <motion.div
            initial="hidden"
            animate={topInView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={0}
          >
            <Eyebrow />
          </motion.div>

          <motion.h2
            className="text-4xl sm:text-4xl md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold leading-[1.18] sm:leading-[1.15] tracking-tight pb-1"
            style={{ color: "var(--text-heading)" }}
            initial="hidden"
            animate={topInView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={0.1}
          >
            Commercial Christmas
            <br />
            Light Installation
            <br />
            <span
              className="italic inline-block pr-3 sm:pr-4 pb-1"
              style={{
                background: "var(--gradient-accent-text)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 0 16px var(--accent-glow-soft))",
              }}
            >
              Across Metro Denver
            </span>
          </motion.h2>

          <motion.div
            className="flex items-center gap-2"
            initial="hidden"
            animate={topInView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={0.18}
          >
            <div
              className="h-px w-10 sm:w-12"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--accent))",
              }}
            />
            <Sparkle
              size={10}
              style={{ color: "var(--accent)", opacity: 0.7 }}
            />
            <div
              className="h-px w-10 sm:w-12"
              style={{
                background:
                  "linear-gradient(90deg, var(--accent), transparent)",
              }}
            />
          </motion.div>

          <motion.p
            className="text-sm sm:text-base lg:text-lg leading-relaxed max-w-[36ch] sm:max-w-[42ch]"
            style={{ color: "var(--text-muted)" }}
            initial="hidden"
            animate={topInView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={0.24}
          >
            Denver Christmas Lights serves eligible commercial properties
            throughout Denver and surrounding areas
          </motion.p>
        </div>

        {/* ── BOTTOM SECTION — Location Cards Grid (Single Grid Rendered Once) ─ */}
        <motion.div
          ref={cardsRef}
          className="w-full"
          initial="hidden"
          animate={cardsInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-5">
            {/* Render all 10 location cards */}
            {LOCATIONS.map((name, i) => (
              <LocationCard key={name} name={name} index={i} />
            ))}

            {/* CTACard — rendered as the 11th item; on Desktop (lg:) CSS Grid positions it in col 6 spanning 2 rows */}
            <CTACard />
          </div>
        </motion.div>

        {/* ── TRUST BAR ────────────────────────────────────────────────────── */}
        <motion.div
          ref={trustRef}
          className="mt-6 sm:mt-8 w-full overflow-hidden rounded-xl sm:rounded-2xl border"
          style={{
            borderColor: "var(--border-color)",
            background:
              "linear-gradient(135deg, var(--bg-glass-card), var(--bg-elevated))",
            boxShadow:
              "var(--shadow-card), inset 0 1px 0 var(--highlight-surface)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={
            trustInView
              ? {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                    delay: 0.12,
                  },
                }
              : { opacity: 0, y: 20 }
          }
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[var(--border-color)]">
            {TRUST_ITEMS.map((item) => (
              <TrustItem
                key={item.title}
                icon={item.icon}
                title={item.title}
                body={item.body}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
