"use client";

/**
 * FaqSection.tsx
 * "Frequently Asked Questions" — Luxury Accordion & CTA Section.
 *
 * Features:
 * - Glassmorphism cards with subtle gold border glow & backdrop blur
 * - Animated Plus / Minus icon rotation & smooth Framer Motion accordion height expansion
 * - Interactive Q icon badge on left, expandable answer reveal with high legibility
 * - High-converting bottom CTA glass card with gold gradient button
 * - Subtle winter ambience (floating sparkle particles, soft golden bokeh glow)
 * - Full ARIA accessibility, keyboard support, responsive breakpoints
 * - Uses global CSS design tokens for colors, borders, shadows & gradients
 */

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "motion/react";
import {
  HelpCircle,
  Plus,
  Minus,
  CalendarCheck,
  ArrowRight,
  Sparkle,
} from "lucide-react";
import { handleGetQuoteClick } from "@/lib/scrollUtils";

// ─── Data Types & FAQ List ───────────────────────────────────────────────────

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "cost",
    question: "How much does commercial Christmas light installation cost?",
    answer:
      "Pricing depends on property size, installation complexity, design scope, lighting coverage, access requirements, power availability, maintenance requirements, and removal services. A property assessment allows us to prepare an accurate proposal.",
  },
  {
    id: "proposal",
    question: "How early should we request a commercial proposal?",
    answer:
      "Commercial properties should begin planning early, particularly when the project requires design approval, multiple stakeholders, specialized access equipment, or installation coordination.",
  },
  {
    id: "budget",
    question: "Can you work within an established budget?",
    answer:
      "Yes. Share your priorities and budget parameters during the assessment so the design can focus on the most important areas of the property.",
  },
  {
    id: "lighting-grade",
    question: "Do you provide commercial-grade lighting?",
    answer:
      "Yes. We supply and install commercial-grade LED lighting, custom-cut wiring, commercial greenery, and heavy-duty mounting hardware. All lighting equipment, maintenance, and seasonal storage are fully included in our service model.",
  },
  {
    id: "insurance",
    question: "Do you provide proof of insurance?",
    answer:
      "Yes. We carry comprehensive commercial general liability insurance and provide Certificates of Insurance (COI) naming your property management or enterprise entity as an additional insured upon request.",
  },
  {
    id: "property-management",
    question: "Can you coordinate with our property management team?",
    answer:
      "Yes. We seamlessly coordinate with property managers, facility directors, and site engineers to handle design approvals, scheduling, electrical access, and hassle-free installation.",
  },
  {
    id: "maintenance",
    question: "What happens if part of the display stops working?",
    answer:
      "We provide prompt, complimentary maintenance throughout the entire season. If any component or lighting strand goes out, our dedicated commercial technicians respond within 24 to 48 hours to fix it.",
  },
  {
    id: "multi-property",
    question: "Can you decorate multiple properties?",
    answer:
      "Yes. Portfolio-wide, multi-location, and phased installation options are available for property managers and commercial real estate groups across Denver and surrounding areas.",
  },
  {
    id: "removal",
    question: "Do you handle removal after the holiday season?",
    answer:
      "Yes. Post-holiday removal is fully included. We schedule takedowns starting promptly in January based on your preference, carefully pack all decor, and store it securely for the next season.",
  },
  {
    id: "hoas",
    question: "Do you work with HOAs and apartment communities?",
    answer:
      "Yes. We specialize in holiday lighting for HOA entrances, clubhouses, common areas, and multi-family residential communities with extensive commercial installation experience.",
  },
];

// ─── Ambient Particles Data ───────────────────────────────────────────────────

const PARTICLES = [
  { id: 1, left: "8%", top: "15%", size: "12px", dur: "8s", delay: "0s" },
  { id: 2, left: "88%", top: "22%", size: "10px", dur: "10s", delay: "1.5s" },
  { id: 3, left: "20%", top: "70%", size: "14px", dur: "9s", delay: "3s" },
  { id: 4, left: "75%", top: "78%", size: "11px", dur: "7.5s", delay: "0.8s" },
];

// ─── Motion Variants ─────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function FaqSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  // Currently expanded accordion item ID (null if none expanded)
  const [openId, setOpenId] = useState<string | null>("cost");

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      ref={containerRef}
      id="faq"
      className="relative w-full overflow-hidden py-14 sm:py-12 lg:py-12 font-sans"
      aria-label="Commercial Frequently Asked Questions"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ── Background Glows & Ambience ────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* Central Radial Golden Glow */}
        <div
          className="absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-[32rem] sm:w-[48rem] h-[24rem] sm:h-[36rem] rounded-full blur-[140px] opacity-35"
          style={{ background: "var(--accent-glow-faint)" }}
        />
        {/* Soft Red Ambient Glow at Bottom Right */}
        <div
          className="absolute right-10 bottom-20 w-80 h-80 rounded-full blur-[120px] opacity-20"
          style={{ background: "var(--accent-glow)" }}
        />

        {/* Floating Sparkle Particles */}
        {PARTICLES.map((p) => (
          <div
            key={p.id}
            className="absolute text-white/50 select-none animate-bounce"
            style={{
              left: p.left,
              top: p.top,
              fontSize: p.size,
              animationDuration: p.dur,
              animationDelay: p.delay,
              filter: "drop-shadow(0 0 6px var(--accent-glow))",
            }}
          >
            ✦
          </div>
        ))}
      </div>

      {/* ── Content Container (Matching Landing Page Grid Alignment) ───────── */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 max-w-5xl mx-auto">
        
        {/* ── SECTION HEADER ────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={0}
            className="flex items-center gap-3 mb-3"
          >
            <div
              className="h-px w-8 sm:w-12"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, var(--accent) 100%)",
              }}
            />
            <span
              className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase"
              style={{ color: "var(--accent)" }}
            >
              COMMERCIAL FAQ
            </span>
            <div
              className="h-px w-8 sm:w-12"
              style={{
                background:
                  "linear-gradient(90deg, var(--accent) 0%, transparent 100%)",
              }}
            />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={0.1}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[1.15]"
            style={{ color: "var(--text-heading)" }}
          >
            Commercial Christmas Light
            <br />
            <span
              className="inline-block"
              style={{
                background: "var(--gradient-accent-text)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 2px 16px var(--accent-glow-soft))",
              }}
            >
              Installation FAQs
            </span>
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={0.18}
            className="text-xs sm:text-sm md:text-base leading-relaxed max-w-[42ch]"
            style={{ color: "var(--text-muted)" }}
          >
            Everything you need to know about our commercial Christmas light installation
            services in Denver.
          </motion.p>
        </div>

        {/* ── FAQ ACCORDION LIST ─────────────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0.25}
          className="flex flex-col gap-3.5 sm:gap-4 w-full"
        >
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openId === item.id;

            return (
              <div
                key={item.id}
                className="group relative rounded-2xl sm:rounded-3xl border transition-all duration-500 overflow-hidden"
                style={{
                  borderColor: isOpen
                    ? "var(--border-strong)"
                    : "var(--border-color)",
                  background: isOpen
                    ? "var(--bg-glass-card)"
                    : "var(--bg-glass)",
                  boxShadow: isOpen
                    ? "var(--shadow-card-hover), 0 0 24px var(--accent-glow-soft)"
                    : "var(--shadow-card)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                {/* Subtle Hover Border Highlight */}
                <div
                  className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: "inset 0 0 0 1.5px var(--accent-glow-soft)",
                  }}
                />

                {/* Accordion Trigger Button */}
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full flex items-center justify-between gap-3 sm:gap-4 p-4 sm:p-5 md:p-6 text-left cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                    {/* Left Icon Badge */}
                    <div
                      className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105"
                      style={{
                        borderColor: "var(--border-color)",
                        background:
                          "radial-gradient(circle at top, var(--bg-elevated), var(--bg-card))",
                        boxShadow: "0 0 12px var(--accent-glow-faint)",
                      }}
                    >
                      <HelpCircle
                        size={18}
                        className="sm:w-5 sm:h-5 transition-colors duration-300"
                        style={{
                          color: isOpen ? "var(--accent)" : "var(--text-muted)",
                        }}
                      />
                    </div>

                    {/* Question Text */}
                    <h3
                      className="text-sm sm:text-base md:text-lg font-semibold leading-snug tracking-tight transition-colors duration-300"
                      style={{
                        color: isOpen
                          ? "var(--text-heading)"
                          : "var(--text-body)",
                      }}
                    >
                      {item.question}
                    </h3>
                  </div>

                  {/* Far Right Animated Plus / Minus Icon */}
                  <div
                    className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300"
                    style={{
                      borderColor: isOpen
                        ? "var(--accent)"
                        : "var(--border-color)",
                      background: isOpen
                        ? "var(--accent-glow-soft)"
                        : "transparent",
                    }}
                  >
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {isOpen ? (
                        <Minus
                          size={16}
                          style={{ color: "var(--accent)" }}
                        />
                      ) : (
                        <Plus
                          size={16}
                          style={{ color: "var(--text-muted)" }}
                        />
                      )}
                    </motion.div>
                  </div>
                </button>

                {/* Animated Accordion Answer Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                        transition: {
                          height: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.25, delay: 0.1 },
                        },
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                        transition: {
                          height: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
                          opacity: { duration: 0.15 },
                        },
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-5 md:px-6 pb-5 sm:pb-6 pt-0">
                        {/* Divider Line inside open card */}
                        <div
                          className="h-px w-full mb-4 opacity-40"
                          style={{ background: "var(--border-color)" }}
                        />
                        <p
                          className="text-xs sm:text-sm md:text-base leading-relaxed pl-12 sm:pl-14"
                          style={{ color: "var(--text-body)" }}
                        >
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </motion.div>

        {/* ── BOTTOM HIGH-CONVERTING CTA CARD ──────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0.35}
          className="mt-12 sm:mt-16 w-full"
        >
          <div
            className="group relative rounded-2xl sm:rounded-3xl border p-6 sm:p-8 md:p-10 transition-all duration-500 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8 text-center md:text-left"
            style={{
              borderColor: "var(--border-color)",
              background:
                "linear-gradient(145deg, color-mix(in srgb, var(--bg-card) 90%, transparent), var(--bg-primary))",
              boxShadow:
                "var(--shadow-card-hover), 0 0 35px var(--accent-glow-faint)",
              backdropFilter: "blur(16px)",
              WebkitBackdropFilter: "blur(16px)",
            }}
          >
            {/* Ambient Corner Glow Effect */}
            <div
              className="absolute -top-12 -left-12 w-48 h-48 rounded-full blur-3xl opacity-30 pointer-events-none group-hover:opacity-50 transition-opacity duration-500"
              style={{ background: "var(--accent-glow)" }}
            />
            <div
              className="absolute -bottom-12 -right-12 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
              style={{ background: "var(--gold-glow)" }}
            />

            {/* Left Content Area: Icon + Text */}
            <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 z-10 relative">
              {/* Large Circular Icon */}
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border flex items-center justify-center shrink-0 shadow-lg transition-transform duration-300 group-hover:scale-105"
                style={{
                  borderColor: "var(--border-color)",
                  background:
                    "radial-gradient(circle at top, var(--bg-elevated), var(--bg-card))",
                  boxShadow: "0 0 20px var(--accent-glow-soft)",
                }}
              >
                <CalendarCheck
                  size={28}
                  className="sm:w-8 sm:h-8"
                  style={{
                    color: "var(--accent)",
                    filter: "drop-shadow(0 0 6px var(--accent-glow))",
                  }}
                />
              </div>

              {/* CTA Heading & Subtext */}
              <div className="flex flex-col items-center md:items-start gap-1">
                <h3
                  className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight leading-snug"
                  style={{ color: "var(--text-heading)" }}
                >
                  Ready to make your home shine this holiday season?
                </h3>
                <p
                  className="text-xs sm:text-sm leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  Request your free custom quote today!
                </p>
              </div>
            </div>

            {/* Right Content Area: Luxury Gold Gradient Button */}
            <div className="z-10 relative w-full md:w-auto shrink-0">
              <motion.a
                href="#quote"
                onClick={handleGetQuoteClick}
                className="inline-flex items-center justify-center gap-2 sm:gap-2.5 rounded-full px-6 sm:px-8 py-3.5 text-xs sm:text-sm font-bold tracking-wider uppercase overflow-hidden w-full md:w-auto cursor-pointer shadow-lg transition-all duration-300"
                style={{
                  background:
                    "linear-gradient(180deg, var(--gradient-btn-top) 0%, var(--gradient-btn-mid) 50%, var(--gradient-btn-bottom) 100%)",
                  color: "var(--bg-primary)",
                  boxShadow: "var(--shadow-btn)",
                }}
                whileHover={{
                  scale: 1.04,
                  boxShadow: "var(--shadow-btn-hover)",
                }}
                whileTap={{ scale: 0.97 }}
              >
                <span>GET A FREE QUOTE</span>
                <ArrowRight size={15} className="sm:w-4 sm:h-4" />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
