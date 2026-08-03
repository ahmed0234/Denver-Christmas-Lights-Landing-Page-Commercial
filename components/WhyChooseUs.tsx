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

// ─── Particle data ────────────────────────────────────────────────────────────
const BOKEH = [
  { left: "4%", top: "12%", size: 6, dur: 4.0, delay: 0.0 },
  { left: "92%", top: "8%", size: 5, dur: 5.0, delay: 0.6 },
  { left: "8%", top: "72%", size: 4, dur: 3.8, delay: 1.2 },
  { left: "88%", top: "65%", size: 7, dur: 4.5, delay: 0.3 },
  { left: "50%", top: "4%", size: 3, dur: 3.5, delay: 1.8 },
  { left: "1%", top: "44%", size: 4, dur: 5.2, delay: 2.1 },
  { left: "96%", top: "40%", size: 5, dur: 3.9, delay: 0.9 },
  { left: "24%", top: "88%", size: 3, dur: 4.3, delay: 1.5 },
  { left: "74%", top: "90%", size: 4, dur: 3.7, delay: 0.4 },
];

const SNOW = [
  { left: "10%", top: "15%", size: 2, dur: 6, delay: 0 },
  { left: "30%", top: "5%", size: 2, dur: 8, delay: 1 },
  { left: "55%", top: "20%", size: 1, dur: 7, delay: 2 },
  { left: "75%", top: "8%", size: 2, dur: 9, delay: 0.5 },
  { left: "90%", top: "25%", size: 1, dur: 6, delay: 1.5 },
  { left: "20%", top: "50%", size: 2, dur: 8, delay: 3 },
  { left: "68%", top: "55%", size: 1, dur: 7, delay: 2.5 },
  { left: "42%", top: "70%", size: 2, dur: 9, delay: 1.2 },
  { left: "85%", top: "72%", size: 1, dur: 6, delay: 0.8 },
  { left: "6%", top: "82%", size: 2, dur: 7, delay: 3.5 },
  { left: "60%", top: "90%", size: 1, dur: 8, delay: 2.2 },
  { left: "38%", top: "35%", size: 2, dur: 7, delay: 4 },
];

const TRUST_ITEMS = [
  { icon: ShieldCheck, label: "Fully Insured" },
  { icon: Award, label: "5-Star Rated" },
  { icon: BadgeCheck, label: "Pro Installers" },
  { icon: Clock, label: "On-Time Service" },
];

const CARDS = [
  {
    num: "01",
    icon: Shield,
    heading: "One Point of Contact",
    body: "Your team has a clear contact for project coordination, installation questions and covered seasonal support",
    badge: "One Point of Contact",
    badgeIcon: ShieldCheck,
  },
  {
    num: "02",
    icon: Clock3,
    heading: "Quality Materials & Installation",
    body: "Commercial grade lighting designed for Denver’s winter conditions, securely installed without damage to your property.",
    badge: "Quality Materials & Installation",
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
    heading: "Property Specific Planning",
    body: "Every proposal is based on the actual layout, priorities and requirements of the commercial property.",
    badge: "Property Specific Planning",
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

// ─── Theme-Aware 3D Divider Component ─────────────────────────────────────────
function Theme3DDivider({ skewAngle = "-14deg" }: { skewAngle?: string }) {
  return (
    <>
      {/* Layer 1: Ambient Backlit Soft Glow (Diffused light on surrounding card) */}
      <div
        className="hidden lg:block absolute inset-y-0 pointer-events-none z-[9]"
        aria-hidden="true"
        style={{
          left: "calc(16% - 32px)",
          width: "68px",
          background:
            "radial-gradient(ellipse 100% 50% at 50% 50%, var(--accent-glow) 0%, var(--accent-glow-soft) 45%, transparent 85%)",
          transform: `skewX(${skewAngle})`,
          transformOrigin: "bottom left",
          filter: "blur(4px)",
        }}
      />

      {/* Layer 2: Main 3D Metallic Core Stem with Theme Accent Gradient */}
      <div
        className="hidden lg:block absolute inset-y-0 pointer-events-none z-10"
        style={{
          left: "calc(16% - 1.5px)",
          width: "3px",
          background:
            "linear-gradient(180deg, transparent 0%, var(--accent-glow-soft) 4%, var(--divider-glow-color) 16%, var(--gold) 50%, var(--divider-glow-color) 84%, var(--accent-glow-soft) 96%, transparent 100%)",
          boxShadow:
            "0 0 12px var(--accent-glow), 0 0 24px var(--accent-glow-soft), -2px 0 6px rgba(0,0,0,0.5)",
          filter: "var(--divider-glow-filter)",
          transform: `skewX(${skewAngle})`,
          transformOrigin: "bottom left",
        }}
      >
        {/* Layer 3: 3D Specular Highlight Edge (Reflective Bevel) */}
        <div
          className="absolute inset-y-0 left-0 w-[1.2px] pointer-events-none z-20"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.95) 12%, var(--gold-light) 50%, rgba(255,255,255,0.95) 88%, transparent 100%)",
            boxShadow: "0 0 4px rgba(255,255,255,0.8)",
          }}
        />

        {/* Layer 4: Dark Cast Shadow on Trailing Edge for Parallax Depth */}
        <div
          className="absolute inset-y-0 left-full w-5 pointer-events-none z-10"
          style={{
            background:
              "linear-gradient(90deg, rgba(0,0,0,0.65) 0%, transparent 100%)",
          }}
        />
      </div>
    </>
  );
}

// ─── Section Eyebrow ──────────────────────────────────────────────────────────
function SectionEyebrow({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-px w-10 flex-shrink-0"
        style={{
          background: "linear-gradient(90deg, transparent, var(--accent))",
        }}
      />
      <span
        className="text-[10px] sm:text-[11px] md:text-sm font-semibold tracking-[0.22em] uppercase"
        style={{ color: "var(--accent)" }}
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

  const baseBg = `linear-gradient(165deg, var(--gradient-card-top) 0%, var(--bg-card) 50%, var(--gradient-card-bottom) 100%) padding-box, var(--container-border) border-box`;
  const hoverBg = `linear-gradient(165deg, var(--bg-elevated) 0%, var(--bg-card) 50%, var(--gradient-card-bottom) 100%) padding-box, linear-gradient(135deg, var(--accent) 0%, var(--gold-light) 30%, var(--border-color) 65%, var(--gold) 100%) border-box`;
  const baseShadow = `inset 0 1px 0 var(--highlight-card), var(--shadow-card)`;
  const hoverShadow = `inset 0 1px 0 var(--highlight-card), var(--shadow-card-hover)`;

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
        transition:
          "box-shadow 0.35s cubic-bezier(0.22,1,0.36,1), background 0.35s cubic-bezier(0.22,1,0.36,1)",
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
      {/* Top inner highlight line */}
      <div
        className="absolute inset-x-8 top-0 h-px pointer-events-none rounded-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--highlight-card), transparent)",
        }}
      />

      {/* Icon */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-5 flex-shrink-0 group-hover:scale-105 transition-transform duration-300"
        style={{
          background: `linear-gradient(135deg, var(--benefit-icon-bg-from) 0%, var(--benefit-icon-bg-to) 100%)`,
          border: "1px solid var(--benefit-icon-border)",
          boxShadow: "var(--benefit-icon-shadow)",
        }}
      >
        <Icon
          size={26}
          className="group-hover:scale-[1.08] transition-transform duration-300"
          style={{
            color: "var(--benefit-icon-color)",
            filter: "var(--benefit-icon-filter)",
          }}
        />
      </div>

      {/* Number */}
      <span
        className="text-[11px] xl:text-lg font-bold tracking-[0.18em] mb-2"
        style={{ color: "var(--benefit-num-color)" }}
      >
        {card.num}
      </span>

      {/* Heading */}
      <h3
        className="text-lg xl:text-2xl font-bold leading-snug mb-3"
        style={{ color: "var(--text-heading)" }}
      >
        {card.heading}
      </h3>

      {/* Body */}
      <p
        className="text-sm leading-relaxed mb-5 flex-1"
        style={{ color: "var(--text-muted)" }}
      >
        {card.body}
      </p>

      {/* Badge */}
      <div
        className="flex items-center gap-1.5 mt-auto w-fit"
        style={{
          border: "1px solid var(--border-color)",
          borderRadius: "6px",
          padding: "4px 10px",
          background: "var(--accent-glow-faint)",
        }}
      >
        <BadgeIcon size={11} style={{ color: "var(--accent)" }} />
        <span
          className="text-[10px] font-semibold tracking-[0.14em] uppercase"
          style={{ color: "var(--text-muted)" }}
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

  const containerBg = `linear-gradient(170deg, var(--container-bg-top) 0%, var(--container-bg-bottom) 100%) padding-box, var(--container-border) border-box`;
  const containerShadow = `inset 0 1px 0 var(--highlight-card), var(--shadow-card-hover)`;

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="relative w-full overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Atmospheric glows */}
      <div
        className="absolute pointer-events-none z-0"
        aria-hidden="true"
        style={{
          top: "-10%",
          left: "30%",
          width: "45%",
          height: "50%",
          background:
            "radial-gradient(ellipse at center, var(--accent-glow-soft) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none z-0"
        aria-hidden="true"
        style={{
          top: "38%",
          left: "-5%",
          width: "35%",
          height: "40%",
          background:
            "radial-gradient(ellipse at center, var(--accent-glow-faint) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute pointer-events-none z-0"
        aria-hidden="true"
        style={{
          bottom: "5%",
          right: "-5%",
          width: "45%",
          height: "40%",
          background:
            "radial-gradient(ellipse at center, var(--accent-glow-faint) 0%, transparent 70%)",
        }}
      />

      {/* Bokeh */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        aria-hidden="true"
      >
        {BOKEH.map((b, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: b.left,
              top: b.top,
              width: b.size,
              height: b.size,
              backgroundColor: "var(--accent)",
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

      {/* Snow */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0 hidden sm:block"
        aria-hidden="true"
      >
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

      {/* Top fade */}
      <div
        className="absolute inset-x-0 top-0 h-28 pointer-events-none z-[1]"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, var(--bg-primary) 0%, transparent 100%)",
        }}
      />

      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28 pt-1 pb-0">
        {/* ── HERO HEADER CARD ────────────────────────────────────────────── */}
        <div
          className="relative w-full rounded-3xl overflow-hidden mb-6 lg:mb-12 min-h-[420px] sm:min-h-[460px] lg:min-h-[500px] flex items-center"
          style={{
            background: containerBg,
            border: "1.5px solid transparent",
            boxShadow: containerShadow,
          }}
        >
          {/* Top inner highlight */}
          <div
            className="absolute inset-x-16 top-0 h-px pointer-events-none z-20"
            style={{
              background:
                "linear-gradient(90deg, transparent, var(--highlight-card), transparent)",
            }}
          />

          {/* Background image & 3D Divider */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 lg:left-[52%] lg:w-[48%]">
              <div className="relative w-full h-full lg:[clip-path:polygon(16%_0,100%_0,100%_100%,0%_100%)]">
                <Image
                  src="/WhyChooseUs/HeaderBackground.webp"
                  alt="Professionally decorated Christmas home at night"
                  fill
                  className="object-cover object-[80%_center] lg:object-center brightness-[1.22] contrast-[1.1] sm:brightness-110 sm:contrast-105 scale-105 transition-transform duration-700"
                  quality={95}
                  priority
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
                <div
                  className="absolute inset-0 lg:hidden"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(9,7,7,0.9) 0%, rgba(9,7,7,0.48) 50%, rgba(9,7,7,0.9) 100%), linear-gradient(90deg, rgba(9,7,7,0.95) 0%, rgba(9,7,7,0.45) 60%, rgba(9,7,7,0.1) 100%)",
                    opacity: 0.88,
                  }}
                />
                <div
                  className="hidden lg:block absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--container-bg-top) 0%, rgba(9,6,6,0.5) 20%, rgba(9,6,6,0.1) 45%, transparent 75%)",
                  }}
                />
                <div
                  className="hidden lg:block absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, var(--container-bg-top) 0%, transparent 35%)",
                  }}
                />
              </div>

              {/* 3D Theme-Aware Divider */}
              <Theme3DDivider />
            </div>
            <div
              className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 pointer-events-none z-[1]"
              style={{
                background:
                  "radial-gradient(ellipse 60% 70% at 80% 50%, var(--accent-glow-faint) 0%, transparent 70%)",
              }}
            />
          </div>

          {/* Left column content */}
          <div className="relative z-10 w-full lg:max-w-[48%] p-7 sm:p-10 lg:p-14 xl:p-16 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.05 }}
              className="mb-5 sm:mb-6"
            >
              <SectionEyebrow text="WHY CHOOSE US" />
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.15,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-bold leading-[1.01] tracking-tight mb-5 sm:mb-6"
              style={{
                color: "var(--text-heading)",
                fontSize: "clamp(36px, 4.8vw, 50px)",
              }}
            >
              Why Denver{" "}
              <span className="text-accent-gradient"> Property Teams</span>
              <br />
              Choose Denver Christmas Lights
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.28 }}
              className="text-base sm:text-lg leading-relaxed mb-7 sm:mb-8"
              style={{ color: "var(--text-muted)", maxWidth: "520px" }}
            >
              Every proposal is based on the actual layout, priorities and
              requirements of the commercial property. Your team has a clear
              contact for project coordination, installation questions and
              covered seasonal support.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.38 }}
              className="flex flex-wrap gap-3.5 sm:gap-0 sm:flex-nowrap items-center"
            >
              <div
                className="flex items-center gap-2.5 py-2.5 px-3.5 rounded-xl backdrop-blur-md"
                style={{
                  border: "1px solid var(--accent)",
                  background: `linear-gradient(135deg, var(--accent-glow-soft) 0%, var(--accent-glow-faint) 100%)`,
                  boxShadow: "inset 0 1px 0 var(--highlight-surface)",
                }}
              >
                <Shield size={18} style={{ color: "var(--accent)" }} />
                <span
                  className="text-xs font-semibold uppercase tracking-[0.14em]"
                  style={{ color: "var(--text-heading)" }}
                >
                  PROFESSIONAL. INSURED. RELIABLE.
                </span>
              </div>
              <div
                className="hidden sm:block w-px h-8 mx-4"
                style={{ background: "var(--border-color)" }}
              />
              {TRUST_ITEMS.slice(1).map((t) => {
                const TIcon = t.icon;
                return (
                  <div
                    key={t.label}
                    className="hidden xl:flex items-center gap-1.5"
                  >
                    <TIcon size={14} style={{ color: "var(--accent)" }} />
                    <span
                      className="text-xs tracking-wide font-medium"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {t.label}
                    </span>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* ── BENEFITS GRID ── */}
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

      {/* ── BOTTOM CTA CARD ── */}
      <div className="relative w-full overflow-hidden mt-12 sm:mt-8">
        <div className="relative z-10 w-full px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28">
          <div
            className="relative w-full rounded-3xl overflow-hidden"
            style={{
              background: containerBg,
              border: "1.5px solid transparent",
              boxShadow: containerShadow,
            }}
          >
            {/* Top highlight */}
            <div
              className="absolute inset-x-16 top-0 h-px pointer-events-none z-20"
              style={{
                background:
                  "linear-gradient(90deg, transparent, var(--highlight-card), transparent)",
              }}
            />

            {/* Background image & 3D Divider Container */}
            <div className="absolute inset-0 z-0">
              <div className="absolute inset-0 lg:left-[45%] lg:w-[55%]">
                <div className="relative w-full h-full lg:[clip-path:polygon(16%_0,100%_0,100%_100%,0%_100%)]">
                  <Image
                    src="/WhyChooseUs/BottomSectionBackground.webp"
                    alt="Beautifully decorated Christmas home"
                    fill
                    className="object-cover object-[75%_center] lg:object-right-center brightness-[1.06] scale-[1] transition-transform duration-700"
                    quality={95}
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                  <div
                    className="absolute inset-0 lg:hidden"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(7,7,7,0.88) 0%, rgba(7,7,7,0.65) 50%, rgba(7,7,7,0.88) 100%), linear-gradient(90deg, rgba(7,7,7,0.94) 0%, rgba(7,7,7,0.6) 60%, rgba(7,7,7,0.2) 100%)",
                    }}
                  />
                  <div
                    className="hidden lg:block absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, var(--container-bg-top) 0%, rgba(7,7,7,0.7) 20%, rgba(7,7,7,0.12) 50%, transparent 85%)",
                    }}
                  />
                  <div
                    className="hidden lg:block absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(to top, var(--container-bg-top) 0%, transparent 35%)",
                    }}
                  />
                </div>

                {/* 3D Theme-Aware Divider */}
                <Theme3DDivider />
              </div>

              <div
                className="hidden lg:block absolute right-0 top-0 bottom-0 w-3/5 pointer-events-none z-[1]"
                style={{
                  background:
                    "radial-gradient(ellipse 65% 85% at 85% 50%, var(--accent-glow-soft) 0%, var(--gold-glow-faint) 45%, transparent 75%)",
                }}
              />
            </div>

            {/* CTA content */}
            <div className="relative z-10 p-8 sm:p-12 lg:p-16 py-14 sm:py-16">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="relative max-w-[620px]"
              >
                <SectionEyebrow text="Ready to Get Started?" />
                <h2
                  className="font-bold leading-[0.98] mt-5 mb-4"
                  style={{
                    color: "var(--text-heading)",
                    fontSize: "clamp(36px, 4.5vw, 52px)",
                  }}
                >
                  Focus on Your Business <br />
                  <span>
                    {"We'll "}
                    <span className="text-accent-gradient">
                      handle the lights
                    </span>
                  </span>
                </h2>
                <p
                  className="text-base sm:text-lg leading-relaxed mb-8"
                  style={{ color: "var(--text-muted)", maxWidth: "480px" }}
                >
                  Get a stunning, commercial-grade holiday display with turnkey
                  installation, proactive maintenance, and zero hassle.
                </p>

                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  {/* Primary CTA */}
                  <motion.a
                    href="#quote"
                    id="why-cta-quote"
                    whileHover={{
                      scale: 1.03,
                      boxShadow: `var(--shadow-btn-hover), inset 0 1px 0 var(--highlight-btn)`,
                    }}
                    whileTap={{ scale: 0.97 }}
                    className="relative flex items-center gap-2.5 px-7 py-4 rounded-xl font-bold text-sm tracking-wide overflow-hidden"
                    style={{
                      background: `linear-gradient(180deg, var(--gradient-btn-top) 0%, var(--gradient-btn-mid) 45%, var(--gradient-btn-bottom) 100%)`,
                      boxShadow: `var(--shadow-btn), inset 0 1px 0 var(--highlight-btn), inset 0 -2px 4px var(--btn-inner-shadow)`,
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "#fff",
                    }}
                  >
                    <span
                      className="absolute inset-x-0 top-0 h-1/2 pointer-events-none"
                      style={{
                        background:
                          "linear-gradient(180deg, var(--btn-inner-highlight) 0%, transparent 100%)",
                      }}
                    />
                    <span className="relative">GET MY FREE QUOTE</span>
                    <ArrowRight size={16} className="relative" />
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
                        border: "1px solid var(--accent)",
                        background: `linear-gradient(135deg, var(--accent-glow-soft) 0%, var(--accent-glow-faint) 100%)`,
                        boxShadow: "inset 0 1px 0 var(--highlight-surface)",
                      }}
                    >
                      <Phone size={16} style={{ color: "var(--accent)" }} />
                    </div>
                    <div>
                      <p
                        className="text-[10px] uppercase tracking-[0.16em] font-semibold"
                        style={{ color: "var(--accent)" }}
                      >
                        OR CALL US TODAY
                      </p>
                      <p
                        className="text-lg font-bold leading-tight"
                        style={{ color: "var(--text-heading)" }}
                      >
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

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none z-20"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, var(--fade-from) 100%)",
        }}
      />
    </section>
  );
}
