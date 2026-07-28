"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import {
  Sparkles,
  Sun,
  Home,
  TreePine,
  DoorOpen,
  Building2,
  Gift,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─── Transformation Data ──────────────────────────────────────────────────────
const transformations = [
  {
    id: 1,
    title: "Before / After",
    icon: Sparkles,
    beforeImage: "/BeforeAfter/beforeandafter/before.png",
    afterImage: "/BeforeAfter/beforeandafter/after.png",
  },
  {
    id: 2,
    title: "Day / Night",
    icon: Sun,
    beforeImage: "/BeforeAfter/dayandnight/day.png",
    afterImage: "/BeforeAfter/dayandnight/night.png",
  },
  {
    id: 3,
    title: "Roofline Lighting",
    icon: Home,
    beforeImage: "/BeforeAfter/rooflinelightning/before.png",
    afterImage: "/BeforeAfter/rooflinelightning/after.png",
  },
  {
    id: 4,
    title: "Tree Lighting",
    icon: TreePine,
    beforeImage: "/BeforeAfter/treelightning/before.png",
    afterImage: "/BeforeAfter/treelightning/after.png",
  },
  {
    id: 5,
    title: "Entryway Lighting",
    icon: DoorOpen,
    beforeImage: "/BeforeAfter/entrywaylightning/before.png",
    afterImage: "/BeforeAfter/entrywaylightning/after.png",
  },
  {
    id: 6,
    title: "Commercial Buildings",
    icon: Building2,
    beforeImage: "/BeforeAfter/commercialbuilding/before.png",
    afterImage: "/BeforeAfter/commercialbuilding/after.png",
  },
];

// ─── Before / After Slider ────────────────────────────────────────────────────
function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
}: {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
}) {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const updateSlider = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setSliderPos((x / rect.width) * 100);
  }, []);

  // Mouse events
  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      updateSlider(e.clientX);
    },
    [updateSlider],
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;
      updateSlider(e.clientX);
    };
    const onMouseUp = () => {
      isDragging.current = false;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [updateSlider]);

  // Touch events
  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isDragging.current = true;
      updateSlider(e.touches[0].clientX);
    },
    [updateSlider],
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return;
      updateSlider(e.touches[0].clientX);
    },
    [updateSlider],
  );

  const onTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

  // Keyboard accessibility
  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") setSliderPos((p) => Math.max(0, p - 2));
    if (e.key === "ArrowRight") setSliderPos((p) => Math.min(100, p + 2));
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full select-none overflow-hidden cursor-col-resize"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(sliderPos)}
      aria-label="Before and after comparison slider"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* After image — full-width base layer */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={afterImage}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before image — clipped to left of divider */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPos}%` }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={beforeImage}
          alt={beforeAlt}
          className="absolute inset-0 h-full object-cover"
          style={{
            width: `${10000 / Math.max(sliderPos, 0.1)}%`,
            maxWidth: "none",
          }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-[2px] pointer-events-none"
        style={{
          left: `${sliderPos}%`,
          transform: "translateX(-50%)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.88) 18%, rgba(255,255,255,0.88) 82%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 z-10 pointer-events-none"
        style={{
          left: `${sliderPos}%`,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.96)",
            boxShadow:
              "0 2px 16px rgba(0,0,0,0.6), 0 0 0 1.5px rgba(255,255,255,0.35)",
          }}
        >
          <ChevronLeft
            size={11}
            className="text-neutral-700"
            style={{ marginRight: "-1px" }}
          />
          <ChevronRight
            size={11}
            className="text-neutral-700"
            style={{ marginLeft: "-1px" }}
          />
        </div>
      </div>

      {/* Before badge */}
      <div
        className="absolute top-3 left-3 px-2.5 py-1 rounded text-xs font-semibold text-white tracking-wide pointer-events-none"
        style={{
          background: "rgba(10,8,8,0.72)",
          backdropFilter: "blur(6px)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        Before
      </div>

      {/* After badge */}
      <div
        className="absolute top-3 right-3 px-2.5 py-1 rounded text-xs font-semibold text-white tracking-wide pointer-events-none"
        style={{
          background: "var(--primary)",
          boxShadow: "0 2px 8px rgba(217,53,53,0.5)",
        }}
      >
        After
      </div>
    </div>
  );
}

// ─── Transformation Card ───────────────────────────────────────────────────────
function TransformationCard({
  item,
  index,
}: {
  item: (typeof transformations)[0];
  index: number;
}) {
  const Icon = item.icon;

  const normalBg =
    "linear-gradient(rgba(12,8,8,0.85), rgba(12,8,8,0.85)) padding-box, linear-gradient(135deg, rgba(245, 200, 106, 0.45) 0%, rgba(196, 140, 56, 0.22) 35%, rgba(139, 64, 54, 0.25) 70%, rgba(245, 200, 106, 0.38) 100%) border-box";
  const hoverBg =
    "linear-gradient(rgba(14,9,9,0.9), rgba(14,9,9,0.9)) padding-box, linear-gradient(135deg, rgba(245, 200, 106, 0.8) 0%, rgba(220, 165, 75, 0.45) 40%, rgba(196, 140, 56, 0.35) 70%, rgba(245, 200, 106, 0.65) 100%) border-box";

  const normalShadow =
    "inset 0 1px 1px 0 rgba(255, 220, 168, 0.18), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.6), 0 4px 32px rgba(0,0,0,0.55), 0 0 18px rgba(245, 200, 106, 0.06)";
  const hoverShadow =
    "inset 0 1px 2px 0 rgba(255, 235, 190, 0.3), 0 10px 48px rgba(0,0,0,0.7), 0 0 28px rgba(245, 200, 106, 0.18)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.58,
        delay: (index % 3) * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.22, ease: "easeOut" } }}
      className="group flex flex-col rounded-xl overflow-hidden"
      style={{
        background: normalBg,
        border: "2px solid transparent",
        boxShadow: normalShadow,
        transition: "background 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = hoverBg;
        el.style.boxShadow = hoverShadow;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.background = normalBg;
        el.style.boxShadow = normalShadow;
      }}
    >
      {/* ── Image area ─────────────────────────────────────────────────────── */}
      <div className="relative w-full aspect-[4/3] overflow-hidden">
        <BeforeAfterSlider
          beforeImage={item.beforeImage}
          afterImage={item.afterImage}
          beforeAlt={`${item.title} before`}
          afterAlt={`${item.title} after`}
        />
      </div>

      {/* ── Caption ────────────────────────────────────────────────────────── */}
      <div
        className="flex items-center gap-2.5 px-4 py-3"
        style={{
          borderTop: "1.5px solid rgba(245, 200, 106, 0.2)",
          background: "rgba(8,5,5,0.55)",
        }}
      >
        <Icon
          size={22}
          style={{
            color: "var(--gold)",
            filter: "drop-shadow(0 0 4px rgba(245,200,106,0.4))",
            flexShrink: 0,
          }}
        />
        <span
          className="text-[13px] sm:text-base 2xl:text-lg font-medium tracking-wide font-sans"
          style={{ color: "var(--heading)" }}
        >
          {item.title}
        </span>
      </div>
    </motion.div>
  );
}

// ─── Section Eyebrow ──────────────────────────────────────────────────────────
function SectionEyebrow() {
  return (
    <div className="flex items-center gap-3 justify-center">
      <div
        className="h-px w-12 sm:w-20"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--primary) 100%)",
        }}
      />
      <span
        className="text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase whitespace-nowrap"
        style={{ color: "var(--primary)" }}
      >
        ✦ Before &amp; After Transformations ✦
      </span>
      <div
        className="h-px w-12 sm:w-20"
        style={{
          background:
            "linear-gradient(90deg, var(--primary) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

// ─── Bottom CTA Bar ───────────────────────────────────────────────────────────
function BottomCTA() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col sm:flex-row items-center justify-between gap-6 px-7 py-6 rounded-2xl max-w-[1280px] mx-auto"
      style={{
        background:
          "linear-gradient(rgba(14,9,9,0.85), rgba(14,9,9,0.85)) padding-box, linear-gradient(135deg, rgba(245, 200, 106, 0.55) 0%, rgba(196, 140, 56, 0.3) 40%, rgba(139, 64, 54, 0.25) 70%, rgba(245, 200, 106, 0.45) 100%) border-box",
        backdropFilter: "blur(12px)",
        border: "2px solid transparent",
        boxShadow:
          "inset 0 1px 1px 0 rgba(255, 220, 168, 0.25), inset 0 -1px 2px 0 rgba(0, 0, 0, 0.6), 0 4px 40px rgba(0,0,0,0.5), 0 0 25px rgba(245, 200, 106, 0.08)",
      }}
    >
      {/* Left — icon + copy */}
      <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
        <div
          className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center"
          style={{
            border: "1px solid rgba(217,53,53,0.4)",
            background: "rgba(217,53,53,0.1)",
          }}
        >
          <Gift
            size={20}
            style={{
              color: "var(--primary)",
              filter: "drop-shadow(0 0 6px rgba(217,53,53,0.5))",
            }}
          />
        </div>
        <div>
          <p
            className="text-lg sm:text-xl 2xl:text-3xl font-bold leading-tight font-sans"
            style={{ color: "var(--heading)" }}
          >
            Your Home Could Be Next
          </p>
          <p
            className="text-sm 2xl:text-lg mt-0.5"
            style={{ color: "var(--muted)" }}
          >
            Let us make your home the brightest on the block.
          </p>
        </div>
      </div>

      {/* Right — CTA button */}
      <motion.a
        href="#quote"
        id="before-after-cta-quote"
        whileHover={{
          scale: 1.04,
          boxShadow:
            "0 8px 32px rgba(217,53,53,0.6), 0 2px 8px rgba(217,53,53,0.35)",
        }}
        whileTap={{ scale: 0.97 }}
        className="flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm text-white tracking-wide whitespace-nowrap w-full sm:w-auto justify-center flex-shrink-0"
        style={{
          background:
            "linear-gradient(135deg, #d93535 0%, #c62828 60%, #a51c1c 100%)",
          boxShadow: "0 4px 20px rgba(217,53,53,0.45)",
        }}
      >
        Get Your Free Quote
        <ArrowRight size={15} />
      </motion.a>
    </motion.div>
  );
}

// ─── Ambient bokeh dots (static list — no Math.random in render) ──────────────
const BOKEH = [
  { left: "7%", top: "10%", size: 5, color: "#f5c86a", dur: 3.5, delay: 0 },
  { left: "93%", top: "7%", size: 4, color: "#d93535", dur: 4.0, delay: 0.7 },
  { left: "14%", top: "86%", size: 6, color: "#f5c86a", dur: 3.2, delay: 1.2 },
  { left: "86%", top: "80%", size: 4, color: "#d93535", dur: 4.5, delay: 0.4 },
  { left: "50%", top: "4%", size: 3, color: "#f5c86a", dur: 3.8, delay: 1.8 },
  { left: "3%", top: "48%", size: 3, color: "#d93535", dur: 5.0, delay: 2.1 },
  { left: "97%", top: "44%", size: 5, color: "#f5c86a", dur: 3.6, delay: 0.9 },
];

// ─── Main Section Export ──────────────────────────────────────────────────────
export default function BeforeandAfter() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      id="before-after"
      className="relative w-full overflow-hidden"
      style={{ background: "var(--background)" }}
    >
      {/* ── Subtle Atmospheric Background Image ──────────────────────────────── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/BeforeAfter/BackGroundSubtle.png"
          alt=""
          fill
          aria-hidden="true"
          className="object-cover object-[50%_30%] md:object-center opacity-65 md:opacity-90 brightness-90 saturate-90 contrast-105"
          quality={95}
        />
        {/* Dark atmospheric overlay gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 85% at 50% 45%, rgba(9,7,7,0.48) 0%, rgba(9,7,7,0.78) 60%, rgba(9,7,7,0.96) 100%)",
          }}
        />
        {/* Top edge fade */}
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, var(--background) 0%, transparent 100%)",
          }}
        />
        {/* Bottom edge fade */}
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, var(--background) 0%, transparent 100%)",
          }}
        />
      </div>
      {/* ── Left & Right Garland Framing Decorations ───────────────────────── */}

      {/* Subtle warm radial glow from top */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 35% at 50% 0%, rgba(180,60,20,0.07) 0%, transparent 70%)",
        }}
      />

      {/* Ambient bokeh particles */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
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
              backgroundColor: b.color,
              filter: "blur(2px)",
            }}
            animate={{ opacity: [0.12, 0.5, 0.12], scale: [1, 1.5, 1] }}
            transition={{
              duration: b.dur,
              repeat: Infinity,
              delay: b.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-20 pb-24">
        {/* Section header */}
        <div className="flex flex-col items-center text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-5"
          >
            <SectionEyebrow />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.65,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-bold leading-[1.08] tracking-tight mb-5 font-playfair"
            style={{ color: "var(--heading)" }}
          >
            Imagine Your{" "}
            <span
              style={{
                color: "var(--primary)",
                textShadow: "0 0 40px rgba(217,53,53,0.35)",
              }}
            >
              Home
            </span>{" "}
            Like This
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.26 }}
            className="text-base sm:text-lg max-w-md"
            style={{ color: "var(--muted)" }}
          >
            Real homes. Stunning results. Professionally installed to
            perfection.
          </motion.p>
        </div>

        {/* Gallery grid — 1 col → 2 col → 3 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-14">
          {transformations.map((item, index) => (
            <TransformationCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* CTA bar */}
        <BottomCTA />
      </div>

      {/* Fade into next section */}
      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(9,7,7,0.55) 100%)",
        }}
      />
    </section>
  );
}
