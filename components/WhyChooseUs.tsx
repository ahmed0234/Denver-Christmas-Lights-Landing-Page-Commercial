"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import {
  ShieldCheck,
  Award,
  BadgeCheck,
  Clock,
  Shield,
  Clock3,
  Sparkles,
  Wrench,
  House,
  Smile,
  Palette,
  Phone,
  ArrowRight,
} from "lucide-react";

// ─── Static bokeh dots ────────────────────────────────────────────────────────
const BOKEH = [
  { left: "4%",  top: "12%", size: 6,  color: "#d93535", dur: 4.0, delay: 0.0 },
  { left: "92%", top: "8%",  size: 5,  color: "#d93535", dur: 5.0, delay: 0.6 },
  { left: "8%",  top: "72%", size: 4,  color: "#d93535", dur: 3.8, delay: 1.2 },
  { left: "88%", top: "65%", size: 7,  color: "#d93535", dur: 4.5, delay: 0.3 },
  { left: "50%", top: "4%",  size: 3,  color: "#d93535", dur: 3.5, delay: 1.8 },
  { left: "1%",  top: "44%", size: 4,  color: "#d93535", dur: 5.2, delay: 2.1 },
  { left: "96%", top: "40%", size: 5,  color: "#d93535", dur: 3.9, delay: 0.9 },
  { left: "24%", top: "88%", size: 3,  color: "#d93535", dur: 4.3, delay: 1.5 },
  { left: "74%", top: "90%", size: 4,  color: "#d93535", dur: 3.7, delay: 0.4 },
];

// ─── Tiny snow particle positions ─────────────────────────────────────────────
const SNOW = [
  { left: "10%", top: "15%", size: 2, dur: 6, delay: 0 },
  { left: "30%", top: "5%",  size: 2, dur: 8, delay: 1 },
  { left: "55%", top: "20%", size: 1, dur: 7, delay: 2 },
  { left: "75%", top: "8%",  size: 2, dur: 9, delay: 0.5 },
  { left: "90%", top: "25%", size: 1, dur: 6, delay: 1.5 },
  { left: "20%", top: "50%", size: 2, dur: 8, delay: 3 },
  { left: "68%", top: "55%", size: 1, dur: 7, delay: 2.5 },
  { left: "42%", top: "70%", size: 2, dur: 9, delay: 1.2 },
  { left: "85%", top: "72%", size: 1, dur: 6, delay: 0.8 },
  { left: "6%",  top: "82%", size: 2, dur: 7, delay: 3.5 },
  { left: "60%", top: "90%", size: 1, dur: 8, delay: 2.2 },
  { left: "38%", top: "35%", size: 2, dur: 7, delay: 4 },
];

// ─── Trust Indicators ─────────────────────────────────────────────────────────
const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Fully Insured" },
  { icon: Award,       label: "5-Star Rated" },
  { icon: BadgeCheck,  label: "Pro Installers" },
  { icon: Clock,       label: "On-Time Service" },
];

// ─── Benefit Cards ────────────────────────────────────────────────────────────
const CARDS = [
  {
    num: "01",
    icon: Shield,
    heading: "Avoid Climbing Ladders",
    body: "Stay safely on the ground while our experienced installers handle every roofline with professional equipment and proper safety procedures.",
    badge: "Family Safety",
    badgeIcon: ShieldCheck,
  },
  {
    num: "02",
    icon: Clock3,
    heading: "Save Time During the Holidays",
    body: "Forget spending your weekends untangling lights or climbing onto the roof. We take care of everything while you spend time with family.",
    badge: "More Family Time",
    badgeIcon: Clock,
  },
  {
    num: "03",
    icon: Sparkles,
    heading: "Get a Clean Professional Look",
    body: "Perfectly straight rooflines, balanced spacing, and a professionally designed display that enhances your home's curb appeal.",
    badge: "Premium Finish",
    badgeIcon: Sparkles,
  },
  {
    num: "04",
    icon: Wrench,
    heading: "Installation, Maintenance & Removal",
    body: "If weather or a burned-out bulb affects your display, we'll maintain it throughout the season and remove everything after the holidays.",
    badge: "We've Got You",
    badgeIcon: Wrench,
  },
  {
    num: "05",
    icon: House,
    heading: "Protect Your Home",
    body: "Professional clips and installation methods help prevent unnecessary damage to your shingles, gutters, siding, and trim.",
    badge: "Home Protection",
    badgeIcon: House,
  },
  {
    num: "06",
    icon: Smile,
    heading: "Stress Free Holidays",
    body: "No tangled wires. No troubleshooting. No climbing roofs. Just a beautiful display that you can enjoy from the very first night.",
    badge: "Hassle-Free",
    badgeIcon: Smile,
  },
  {
    num: "07",
    icon: Palette,
    heading: "Custom Lighting Designs",
    body: "Every home receives a personalized lighting design tailored to its architecture, landscaping, and your preferred holiday style.",
    badge: "Designed For You",
    badgeIcon: Palette,
  },
  {
    num: "08",
    icon: ShieldCheck,
    heading: "Fully Insured Professionals",
    body: "Our trained and insured installation team delivers dependable service while giving you complete confidence throughout the entire project.",
    badge: "Fully Insured",
    badgeIcon: BadgeCheck,
  },
];

// ─── Section Eyebrow ──────────────────────────────────────────────────────────
function SectionEyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-px w-10 flex-shrink-0"
        style={{ background: "linear-gradient(90deg, transparent, #d93535)" }}
      />
      <span
        className="text-[10px] sm:text-[11px] md:text-sm   font-semibold tracking-[0.22em] uppercase"
        style={{ color: "#d93535" }}
      >
        {text}
      </span>
    </div>
  );
}

// ─── Benefit Card ─────────────────────────────────────────────────────────────
function BenefitCard({
  card,
  index,
}: {
  card: (typeof CARDS)[0];
  index: number;
}) {
  const Icon = card.icon;
  const BadgeIcon = card.badgeIcon;
  const col = index % 4;
  const row = Math.floor(index / 4);

  const baseBg = "linear-gradient(165deg, rgba(28,15,15,0.72) 0%, rgba(14,8,8,0.85) 45%, rgba(8,5,5,0.95) 100%) padding-box, linear-gradient(135deg, rgba(217,53,53,0.45) 0%, rgba(255,220,168,0.25) 25%, rgba(106,45,38,0.18) 60%, rgba(245,200,106,0.35) 100%) border-box";
  const hoverBg = "linear-gradient(165deg, rgba(42,20,20,0.82) 0%, rgba(18,9,9,0.92) 45%, rgba(10,6,6,0.98) 100%) padding-box, linear-gradient(135deg, rgba(217,53,53,0.88) 0%, rgba(255,220,168,0.52) 30%, rgba(106,45,38,0.4) 65%, rgba(245,200,106,0.68) 100%) border-box";
  const baseShadow = "0 10px 36px rgba(0,0,0,0.5), inset 0 1px 1px 0 rgba(255,255,255,0.12), inset 0 -1px 2px 0 rgba(0,0,0,0.7), 0 0 16px rgba(217,53,53,0.04)";
  const hoverShadow = "0 22px 65px rgba(0,0,0,0.75), inset 0 1px 1.5px 0 rgba(255,255,255,0.22), inset 0 -1px 2px 0 rgba(0,0,0,0.8), 0 0 32px rgba(217,53,53,0.22)";

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{
        duration: 0.55,
        delay: col * 0.07 + row * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative flex flex-col gap-0 cursor-pointer min-h-[240px] sm:min-h-[260px]"
      style={{
        background: baseBg,
        border: "1.5px solid transparent",
        borderRadius: "28px",
        padding: "32px",
        boxShadow: baseShadow,
        transition: "box-shadow 0.35s cubic-bezier(0.22,1,0.36,1), background 0.35s cubic-bezier(0.22,1,0.36,1)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = hoverBg;
        el.style.boxShadow = hoverShadow;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.background = baseBg;
        el.style.boxShadow = baseShadow;
      }}
    >
      {/* Icon */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-5 flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
        style={{
          background: "linear-gradient(135deg, rgba(217,53,53,0.2) 0%, rgba(15,8,8,0.88) 100%)",
          border: "1px solid rgba(217,53,53,0.45)",
          boxShadow: "0 0 18px rgba(217,53,53,0.15), inset 0 1px 0 rgba(255,255,255,0.08)",
          backdropFilter: "blur(4px)",
        }}
      >
        <Icon
          size={26}
          className="group-hover:scale-[1.08] transition-transform duration-300"
          style={{
            color: "#f7f5f3",
            filter: "drop-shadow(0 0 6px rgba(217,53,53,0.4))",
            transition: "filter 0.35s ease",
          }}
        />
      </div>

      {/* Number */}
      <span
        className="text-[11px] xl:text-lg font-bold tracking-[0.18em] mb-2"
        style={{ color: "#d93535" }}
      >
        {card.num}
      </span>

      {/* Heading */}
      <h3
        className="text-lg xl:text-2xl font-bold leading-snug mb-3"
        style={{ color: "#f7f5f3" }}
      >
        {card.heading}
      </h3>

      {/* Body */}
      <p
        className="text-sm leading-relaxed mb-5 flex-1"
        style={{ color: "#857e79" }}
      >
        {card.body}
      </p>

      {/* Badge */}
      <div
        className="flex items-center gap-1.5 mt-auto group-hover:border-red-700/60 transition-colors duration-350 w-fit"
        style={{
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "6px",
          padding: "4px 10px",
          background: "rgba(255,255,255,0.04)",
        }}
      >
        <BadgeIcon size={11} style={{ color: "#d93535" }} />
        <span
          className="text-[10px] font-semibold tracking-[0.14em] uppercase"
          style={{ color: "#857e79" }}
        >
          {card.badge}
        </span>
      </div>
    </motion.article>
  );
}

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const containerBorderBg = "linear-gradient(170deg, rgba(16,10,10,0.98) 0%, rgba(9,6,6,0.99) 100%) padding-box, linear-gradient(135deg, rgba(217,53,53,0.45) 0%, rgba(255,220,168,0.25) 25%, rgba(106,45,38,0.2) 60%, rgba(245,200,106,0.35) 100%) border-box";
  const containerShadow = "0 20px 60px rgba(0,0,0,0.65), inset 0 1px 1px 0 rgba(255,255,255,0.15), inset 0 -1px 2px 0 rgba(0,0,0,0.8), 0 0 35px rgba(217,53,53,0.08)";

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="relative w-full overflow-hidden"
      style={{ background: "#070707" }}
    >
      {/* ── Layered Background ──────────────────────────────────────────────── */}
      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23filter)'/%3E%3C/svg%3E\")",
          opacity: 0.018,
        }}
      />

      {/* Top red radial glow */}
      <div
        className="absolute pointer-events-none z-0"
        aria-hidden="true"
        style={{
          top: "-10%",
          left: "30%",
          width: "45%",
          height: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(217,53,53,0.095) 0%, transparent 70%)",
        }}
      />

      {/* Mid red radial glow */}
      <div
        className="absolute pointer-events-none z-0"
        aria-hidden="true"
        style={{
          top: "38%",
          left: "-5%",
          width: "35%",
          height: "40%",
          background:
            "radial-gradient(ellipse at center, rgba(217,53,53,0.06) 0%, transparent 70%)",
        }}
      />

      {/* Bottom right glow */}
      <div
        className="absolute pointer-events-none z-0"
        aria-hidden="true"
        style={{
          bottom: "5%",
          right: "-5%",
          width: "45%",
          height: "40%",
          background:
            "radial-gradient(ellipse at center, rgba(217,53,53,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Bokeh particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {BOKEH.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
              backgroundColor: b.color,
              filter: "blur(2.5px)",
            }}
            animate={{ opacity: [0.06, 0.38, 0.06], scale: [1, 1.6, 1] }}
            transition={{
              duration: b.dur,
              repeat: Infinity,
              delay: b.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Snow particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 hidden sm:block" aria-hidden="true">
        {SNOW.map((s, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              backgroundColor: "rgba(255,255,255,0.55)",
            }}
            animate={{ opacity: [0, 0.55, 0], y: [0, 18, 36] }}
            transition={{
              duration: s.dur,
              repeat: Infinity,
              delay: s.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Top fade from previous section */}
      <div
        className="absolute inset-x-0 top-0 h-28 pointer-events-none z-[1]"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, #090707 0%, transparent 100%)" }}
      />

      {/* ── Main Content ────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28 pt-1 pb-0">

        {/* ── HERO HEADER (Unified Background Frame with 3D Gradient Border) ── */}
        <div
          className="relative w-full rounded-3xl overflow-hidden mb-6 lg:mb-12 min-h-[420px] sm:min-h-[460px] lg:min-h-[500px] flex items-center"
          style={{
            background: containerBorderBg,
            border: "1.5px solid transparent",
            boxShadow: containerShadow,
          }}
        >
          
          {/* ── Header Background Image Container ── */}
          <div className="absolute inset-0 z-0">
            {/* Desktop diagonal container & Mobile full backdrop */}
            <div 
              className="absolute inset-0 lg:left-[52%] lg:w-[48%]"
            >
              {/* Image with diagonal clip on desktop */}
              <div 
                className="relative w-full h-full lg:[clip-path:polygon(16%_0,100%_0,100%_100%,0%_100%)]"
              >
                <Image
                  src="/WhyChooseUs/HeaderBackground.webp"
                  alt="Professionally decorated Christmas home at night"
                  fill
                  className="object-cover object-[80%_center] lg:object-center brightness-[1.22] contrast-[1.1] sm:brightness-110 sm:contrast-105 scale-105 transition-transform duration-700"
                  quality={95}
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />

                {/* Mobile Gradient Overlay: High visibility for background house lighting while protecting text */}
                <div
                  className="absolute inset-0 lg:hidden"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(7,7,7,0.72) 0%, rgba(7,7,7,0.48) 50%, rgba(7,7,7,0.78) 100%), linear-gradient(90deg, rgba(7,7,7,0.85) 0%, rgba(7,7,7,0.45) 60%, rgba(7,7,7,0.1) 100%)",
                  }}
                />

                {/* Desktop Gradient Overlay: Left-to-right fade & bottom vignette */}
                <div
                  className="hidden lg:block absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(9,6,6,0.95) 0%, rgba(9,6,6,0.5) 20%, rgba(9,6,6,0.1) 45%, transparent 75%)",
                  }}
                />
                <div
                  className="hidden lg:block absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(9,6,6,0.85) 0%, transparent 35%)",
                  }}
                />
              </div>

              {/* Glowing Diagonal Divider Line (Desktop) */}
              <div
                className="hidden lg:block absolute inset-y-0 left-[16%] pointer-events-none z-10"
                style={{
                  width: "2.5px",
                  background:
                    "linear-gradient(180deg, transparent 0%, rgba(217,53,53,0.2) 6%, rgba(217,53,53,0.9) 25%, rgba(255,90,90,1) 50%, rgba(217,53,53,0.9) 75%, rgba(217,53,53,0.2) 94%, transparent 100%)",
                  filter: "drop-shadow(0 0 8px rgba(217,53,53,0.8)) drop-shadow(0 0 16px rgba(217,53,53,0.5))",
                  transform: "skewX(-14deg)",
                  transformOrigin: "bottom left",
                }}
              />

              {/* Soft Red Bloom Behind Divider */}
              <div
                className="hidden lg:block absolute inset-y-0 left-[calc(16%-20px)] pointer-events-none z-[9]"
                aria-hidden="true"
                style={{
                  width: "50px",
                  background:
                    "radial-gradient(ellipse 100% 50% at 50% 50%, rgba(217,53,53,0.18) 0%, transparent 75%)",
                  transform: "skewX(-14deg)",
                  transformOrigin: "bottom left",
                }}
              />
            </div>

            {/* General Ambient Warmth overlay on right side */}
            <div
              className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 pointer-events-none z-[1]"
              style={{
                background:
                  "radial-gradient(ellipse 60% 70% at 80% 50%, rgba(217,53,53,0.08) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* ── Header Content (Strictly scoped to left column) ── */}
          <div className="relative z-10 w-full lg:max-w-[48%] p-7 sm:p-10 lg:p-14 xl:p-16 flex flex-col justify-center">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mb-5 sm:mb-6"
            >
              <SectionEyebrow text="WHY HOMEOWNERS CHOOSE PROFESSIONAL INSTALLATION" />
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-bold leading-[0.95] tracking-tight mb-5 sm:mb-6"
              style={{ color: "#f7f5f3", fontSize: "clamp(36px, 4.8vw, 68px)" }}
            >
              The Benefits
              <br />
              You{`'`}ll Feel{" "}
              <span style={{ color: "#d93535", textShadow: "0 0 35px rgba(217,53,53,0.5)" }}>
                All Season
              </span>
              <br />
              Long
            </motion.h2>

            {/* Supporting text */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="text-base sm:text-lg leading-relaxed mb-7 sm:mb-8"
              style={{ color: "#a19993", maxWidth: "520px" }}
            >
              Professional Christmas lighting that saves you time, keeps your home safe, and delivers a stunning display{` you'll`} be proud of without the hassle
            </motion.p>

            {/* Trust Row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.38 }}
              className="flex flex-wrap gap-3.5 sm:gap-0 sm:flex-nowrap items-center"
            >
              <div
                className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-xl backdrop-blur-md"
                style={{
                  border: "1px solid rgba(217,53,53,0.35)",
                  background: "rgba(217,53,53,0.1)",
                  boxShadow: "0 0 20px rgba(217,53,53,0.12)",
                }}
              >
                <Shield size={18} style={{ color: "#d93535" }} />
                <span className="text-xs font-semibold uppercase tracking-[0.14em]" style={{ color: "#f7f5f3" }}>
                  PROFESSIONAL. INSURED. RELIABLE.
                </span>
              </div>
              <div className="hidden sm:block w-px h-8 mx-4" style={{ background: "rgba(255,255,255,0.12)" }} />
              {[...TRUST_ITEMS.slice(1)].map((t) => {
                const TIcon = t.icon;
                return (
                  <div key={t.label} className="hidden xl:flex items-center gap-1.5">
                    <TIcon size={14} style={{ color: "#d93535" }} />
                    <span className="text-xs tracking-wide font-medium" style={{ color: "#a19993" }}>{t.label}</span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* ── BENEFITS GRID ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-6"
        >
          {CARDS.map((card, i) => (
            <BenefitCard key={card.num} card={card} index={i} />
          ))}
        </motion.div>
      </div>

      {/* ── BOTTOM CTA STRIP ─────────────────────────────────────────────────── */}
      <div className="relative w-full overflow-hidden mt-12 sm:mt-8">
        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div
            className="relative w-full rounded-3xl overflow-hidden"
            style={{
              background: containerBorderBg,
              border: "1.5px solid transparent",
              boxShadow: containerShadow,
            }}
          >
            {/* Background image & gradient overlay */}
            <div className="absolute inset-0 z-0">
              <Image
                src="/WhyChooseUs/BottomSectionBackground.webp"
                alt="Beautifully decorated Christmas home"
                fill
                className="object-cover object-[75%_center] lg:object-right-center brightness-[1.06] contrast-[1] scale-[1] transition-transform duration-700"
                quality={95}
                sizes="100vw"
              />
              {/* Left-to-right dark overlay mask: protects text while making image rich and luminous on desktop */}
              <div
                className="absolute inset-0 hidden lg:block"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(7,7,7,0.96) 0%, rgba(7,7,7,0.78) 36%, rgba(7,7,7,0.12) 64%, transparent 88%)",
                }}
              />
              {/* Mobile overlay mask */}
              <div
                className="absolute inset-0 lg:hidden"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(7,7,7,0.88) 0%, rgba(7,7,7,0.65) 50%, rgba(7,7,7,0.88) 100%), linear-gradient(90deg, rgba(7,7,7,0.94) 0%, rgba(7,7,7,0.6) 60%, rgba(7,7,7,0.2) 100%)",
                }}
              />
              {/* Subtle top & bottom vignette */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(7,7,7,0.4) 0%, transparent 30%, transparent 70%, rgba(7,7,7,0.45) 100%)",
                }}
              />
              {/* Warm red/gold radial ambient glow on right side of bottom CTA (Desktop) */}
              <div
                className="hidden lg:block absolute right-0 top-0 bottom-0 w-3/5 pointer-events-none z-[1]"
                style={{
                  background:
                    "radial-gradient(ellipse 65% 85% at 85% 50%, rgba(217,53,53,0.15) 0%, rgba(245,200,106,0.06) 45%, transparent 75%)",
                }}
              />
            </div>

            {/* CTA Content Container */}
            <div className="relative z-10 p-8 sm:p-12 lg:p-16 py-14 sm:py-16">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-w-[620px]"
              >
                {/* Eyebrow */}
                <SectionEyebrow text="Ready to Get Started?" />

                {/* Heading */}
                <h2
                  className="font-bold leading-[0.98] mt-5 mb-4"
                  style={{ color: "#f7f5f3", fontSize: "clamp(36px, 4.5vw, 58px)" }}
                >
                  Sit back. Relax.{" "}
                  <br />
                  <span className="inline">
                    {"We'll "}
                    <span style={{ color: "#d93535", textShadow: "0 0 35px rgba(217,53,53,0.5)" }}>
                      take it from here.
                    </span>
                  </span>
                </h2>

                {/* Subtext */}
                <p
                  className="text-base sm:text-lg leading-relaxed mb-8"
                  style={{ color: "#a19993", maxWidth: "480px" }}
                >
                  Get a stunning, worry-free holiday display without lifting a finger.
                </p>

                {/* CTAs */}
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  {/* Primary Button */}
                  <motion.a
                    href="#quote"
                    id="why-cta-quote"
                    whileHover={{ scale: 1.03, boxShadow: "0 10px 36px rgba(217,53,53,0.6)" }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm text-white tracking-wide transition-all duration-200"
                    style={{
                      background: "linear-gradient(135deg, #d93535 0%, #c62828 60%, #a51c1c 100%)",
                      boxShadow: "0 4px 22px rgba(217,53,53,0.45)",
                    }}
                  >
                    GET MY FREE QUOTE
                    <ArrowRight size={16} />
                  </motion.a>

                  {/* Phone */}
                  <a
                    href="tel:+17205134567"
                    className="flex items-center gap-3 group"
                    id="why-cta-call"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 backdrop-blur-md"
                      style={{
                        border: "1px solid rgba(217,53,53,0.4)",
                        background: "rgba(217,53,53,0.12)",
                      }}
                    >
                      <Phone size={16} style={{ color: "#d93535" }} />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] font-semibold" style={{ color: "#d93535" }}>
                        OR CALL US TODAY
                      </p>
                      <p className="text-lg font-bold leading-tight" style={{ color: "#f7f5f3" }}>
                        (720) 513-4567
                      </p>
                    </div>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom transition into next section ─────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-20"
        aria-hidden="true"
        style={{ background: "linear-gradient(to bottom, transparent 0%, rgba(9,7,7,0.8) 100%)" }}
      />
    </section>
  );
}
