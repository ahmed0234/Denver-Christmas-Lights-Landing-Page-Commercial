"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { motion, useInView } from "motion/react";
import {
  Snowflake,
  Home,
  Building2,
  Wrench,
  PackageOpen,
  PenTool,
  Gem,
  ShieldCheck,
  Star,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// ─── Static bokeh data (no Math.random in render) ────────────────────────────
const SERVICE_BOKEH = [
  { left: "5%", top: "20%", size: 4, color: "#f5c86a", dur: 3.8, delay: 0.2 },
  { left: "95%", top: "15%", size: 3, color: "#d93535", dur: 4.2, delay: 0.8 },
  { left: "10%", top: "75%", size: 5, color: "#f5c86a", dur: 3.5, delay: 1.4 },
  { left: "88%", top: "70%", size: 4, color: "#d93535", dur: 4.8, delay: 0.5 },
  { left: "50%", top: "5%", size: 3, color: "#ffdca8", dur: 3.2, delay: 1.8 },
  { left: "2%", top: "50%", size: 3, color: "#d93535", dur: 5.0, delay: 2.3 },
  { left: "98%", top: "45%", size: 4, color: "#f5c86a", dur: 3.6, delay: 1.0 },
];

// ─── Section Eyebrow ──────────────────────────────────────────────────────────
function SectionEyebrow() {
  return (
    <div className="flex items-center gap-3 justify-center">
      <div
        className="h-px w-16 sm:w-24"
        style={{
          background: "linear-gradient(90deg, transparent 0%, #d93535 100%)",
        }}
      />
      <span
        className="text-[10px] sm:text-[11px] font-semibold tracking-[0.22em] uppercase whitespace-nowrap"
        style={{ color: "#d93535" }}
      >
        WHAT WE OFFER
      </span>
      <span
        className="text-[10px] tracking-[0.15em] hidden sm:inline"
        style={{ color: "#d93535", opacity: 0.65 }}
      >
        ····
      </span>
      <div
        className="h-px w-16 sm:w-24"
        style={{
          background: "linear-gradient(90deg, #d93535 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

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

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDragging.current = true;
      updateSlider(e.clientX);
    },
    [updateSlider]
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

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isDragging.current = true;
      updateSlider(e.touches[0].clientX);
    },
    [updateSlider]
  );

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current) return;
      updateSlider(e.touches[0].clientX);
    },
    [updateSlider]
  );

  const onTouchEnd = useCallback(() => {
    isDragging.current = false;
  }, []);

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
      {/* After image — full base */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={afterImage}
        alt={afterAlt}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />

      {/* Before image — clipped left */}
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
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 15%, rgba(255,255,255,0.9) 85%, rgba(255,255,255,0) 100%)",
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
          className="w-8 h-8 rounded-full flex items-center justify-center"
          style={{
            background: "rgba(255,255,255,0.95)",
            boxShadow:
              "0 2px 16px rgba(0,0,0,0.65), 0 0 0 1.5px rgba(255,255,255,0.4)",
          }}
        >
          <ChevronLeft size={10} className="text-neutral-700" style={{ marginRight: "-1px" }} />
          <ChevronRight size={10} className="text-neutral-700" style={{ marginLeft: "-1px" }} />
        </div>
      </div>

      {/* BEFORE label — bottom left */}
      <div
        className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] font-bold tracking-[0.15em] uppercase text-white pointer-events-none"
        style={{
          background: "rgba(9,7,7,0.78)",
          backdropFilter: "blur(4px)",
          border: "1px solid rgba(255,255,255,0.1)",
          borderRadius: "4px",
        }}
      >
        BEFORE
      </div>

      {/* AFTER label — bottom right */}
      <div
        className="absolute bottom-3 right-3 px-2.5 py-1 text-[10px] font-bold tracking-[0.15em] uppercase text-white pointer-events-none"
        style={{
          background: "#d93535",
          boxShadow: "0 2px 10px rgba(217,53,53,0.55)",
          borderRadius: "4px",
        }}
      >
        AFTER
      </div>
    </div>
  );
}

// ─── Featured Comparison Card ─────────────────────────────────────────────────
function FeaturedCard({
  title,
  icon: Icon,
  beforeImage,
  afterImage,
  delay = 0,
}: {
  title: string;
  icon: React.ElementType;
  beforeImage: string;
  afterImage: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative flex-1 min-w-0 rounded-2xl overflow-hidden"
      style={{
        border: "1px solid rgba(106,45,38,0.5)",
        boxShadow: "0 4px 32px rgba(0,0,0,0.6)",
        transition: "box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow =
          "0 12px 48px rgba(0,0,0,0.7), 0 0 24px rgba(217,53,53,0.18), 0 0 0 1px rgba(217,53,53,0.25)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.boxShadow = "0 4px 32px rgba(0,0,0,0.6)";
      }}
    >
      {/* Title Badge */}
      <div
        className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{
          background: "rgba(9,7,7,0.88)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(217,53,53,0.5)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.5)",
        }}
      >
        <div
          className="w-5 h-5 rounded flex items-center justify-center flex-shrink-0"
          style={{ background: "rgba(217,53,53,0.15)" }}
        >
          <Icon size={16} style={{ color: "#d93535" }} />
        </div>
        <span
          className="text-[12px] 2xl:text-lg font-semibold tracking-wide whitespace-nowrap"
          style={{ color: "#f7f5f3" }}
        >
          {title}
        </span>
      </div>

      {/* Slider */}
      <div className="relative w-full aspect-[16/10] overflow-hidden">
        <div className="absolute inset-0 group-hover:scale-[1.015] transition-transform duration-500 ease-out h-full w-full">
          <BeforeAfterSlider
            beforeImage={beforeImage}
            afterImage={afterImage}
            beforeAlt={`${title} before`}
            afterAlt={`${title} after`}
          />
        </div>
      </div>
    </motion.div>
  );
}

// ─── String Lights SVG Decoration ────────────────────────────────────────────
function StringLightsTop() {
  const bulbs = [
    { x: 8, y: 30, color: "#f5c86a" },
    { x: 22, y: 34, color: "#d93535" },
    { x: 36, y: 30, color: "#f5c86a" },
    { x: 50, y: 34, color: "#22c55e" },
    { x: 64, y: 30, color: "#d93535" },
    { x: 78, y: 34, color: "#f5c86a" },
    { x: 92, y: 30, color: "#d93535" },
  ];

  return (
    <svg
      className="absolute top-0 left-0 right-0 w-full pointer-events-none z-10"
      height="44"
      viewBox="0 0 100 44"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M0 14 Q12.5 20, 25 14 Q37.5 8, 50 14 Q62.5 20, 75 14 Q87.5 8, 100 14"
        stroke="rgba(120,70,40,0.55)"
        strokeWidth="0.6"
        fill="none"
      />
      {bulbs.map((b, i) => (
        <g key={i}>
          <line x1={b.x} y1="14" x2={b.x} y2={b.y - 4} stroke="rgba(120,70,40,0.5)" strokeWidth="0.5" />
          <rect x={b.x - 1.5} y={b.y - 4} width="3" height="2.5" rx="0.5" fill="rgba(80,50,30,0.8)" />
          <ellipse cx={b.x} cy={b.y + 4} rx="3" ry="4.5" fill={b.color} opacity="0.88" />
          <ellipse cx={b.x} cy={b.y + 4} rx="5.5" ry="7" fill={b.color} opacity="0.12" />
        </g>
      ))}
    </svg>
  );
}

function StringLightsLeft() {
  const bulbs = [
    { y: 20, color: "#f5c86a" },
    { y: 38, color: "#d93535" },
    { y: 56, color: "#f5c86a" },
    { y: 74, color: "#22c55e" },
    { y: 88, color: "#d93535" },
  ];

  return (
    <svg
      className="absolute left-0 top-0 bottom-0 h-full pointer-events-none z-10"
      width="44"
      viewBox="0 0 44 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M14 0 Q20 12.5, 14 25 Q8 37.5, 14 50 Q20 62.5, 14 75 Q8 87.5, 14 100"
        stroke="rgba(120,70,40,0.55)"
        strokeWidth="0.6"
        fill="none"
      />
      {bulbs.map((b, i) => (
        <g key={i}>
          <line x1="14" y1={b.y} x2="22" y2={b.y} stroke="rgba(120,70,40,0.5)" strokeWidth="0.5" />
          <rect x="22" y={b.y - 1.5} width="2.5" height="3" rx="0.5" fill="rgba(80,50,30,0.8)" />
          <ellipse cx="30" cy={b.y} rx="4.5" ry="3" fill={b.color} opacity="0.88" />
          <ellipse cx="30" cy={b.y} rx="7" ry="5.5" fill={b.color} opacity="0.12" />
        </g>
      ))}
    </svg>
  );
}

// ─── Light Strand (for Premium Lights card) ───────────────────────────────────
function LightStrandRight() {
  return (
    <svg
      className="absolute right-0 top-0 h-full w-20 pointer-events-none z-0"
      viewBox="0 0 80 200"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M70 5 C58 25, 68 45, 55 65 C42 85, 65 105, 52 125 C39 145, 62 165, 50 190"
        stroke="rgba(120,70,40,0.5)"
        strokeWidth="1.2"
        fill="none"
      />
      {[
        { cx: 70, cy: 12, color: "#f5c86a" },
        { cx: 60, cy: 40, color: "#ffdca8" },
        { cx: 68, cy: 68, color: "#f5c86a" },
        { cx: 55, cy: 98, color: "#ffdca8" },
        { cx: 63, cy: 130, color: "#f5c86a" },
        { cx: 52, cy: 162, color: "#ffdca8" },
      ].map((p, i) => (
        <g key={i}>
          <circle cx={p.cx} cy={p.cy} r="9" fill={p.color} opacity="0.13" />
          <circle cx={p.cx} cy={p.cy} r="4.5" fill={p.color} opacity="0.9" />
          <circle cx={p.cx} cy={p.cy} r="1.5" fill="white" opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

// ─── Service Card ─────────────────────────────────────────────────────────────
interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  delay?: number;
  hasStringLights?: boolean;
  hasLightStrand?: boolean;
}

function ServiceCard({
  icon: Icon,
  title,
  description,
  delay = 0,
  hasStringLights = false,
  hasLightStrand = false,
}: ServiceCardProps) {
  const clipPath =
    "polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)";

  return (
    <motion.div
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7, transition: { duration: 0.25, ease: "easeOut" } }}
      className="group relative flex flex-col items-center"
    >
      {/* ── Floating circular icon — positioned above the clipped card ──── */}
      <div className="relative z-20 mb-[-26px] flex-shrink-0">
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center"
          style={{
            background:
              "linear-gradient(135deg, rgba(217,53,53,0.22) 0%, rgba(42,15,13,0.88) 100%)",
            border: "1.5px solid rgba(217,53,53,0.45)",
            boxShadow:
              "0 4px 20px rgba(0,0,0,0.55), 0 0 20px rgba(217,53,53,0.15)",
          }}
        >
          <Icon
            size={22}
            style={{
              color: "#d93535",
              filter: "drop-shadow(0 0 6px rgba(217,53,53,0.5))",
            }}
            className="group-hover:scale-110 group-hover:rotate-6 transition-all duration-300"
          />
        </div>
      </div>

      {/* ── Card body with premium chamfered border ────────────────────── */}
      <div
        className="service-card-border relative w-full overflow-hidden"
        style={{
          clipPath,
          background:
            "linear-gradient(160deg, rgba(42,15,13,0.96) 0%, rgba(18,8,8,0.98) 55%, rgba(28,10,10,0.96) 100%) padding-box, linear-gradient(135deg, rgba(245,200,106,0.5) 0%, rgba(196,140,56,0.28) 28%, rgba(139,64,54,0.3) 52%, rgba(106,45,38,0.4) 72%, rgba(245,200,106,0.42) 100%) border-box",
          border: "1.5px solid transparent",
          boxShadow:
            "0 4px 24px rgba(0,0,0,0.55), 0 0 14px rgba(245,200,106,0.04)",
          transition: "box-shadow 0.35s ease",
        }}
        onMouseEnter={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow =
            "0 16px 48px rgba(0,0,0,0.7), 0 0 30px rgba(245,200,106,0.1), 0 0 8px rgba(217,53,53,0.1)";
        }}
        onMouseLeave={(e) => {
          const el = e.currentTarget as HTMLDivElement;
          el.style.boxShadow =
            "0 4px 24px rgba(0,0,0,0.55), 0 0 14px rgba(245,200,106,0.04)";
        }}
      >
        {/* Inner radial glow */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 70% 45% at 50% 0%, rgba(217,53,53,0.07) 0%, transparent 70%)",
          }}
        />

        {/* Soft golden edge highlight at top */}
        <div
          className="absolute inset-0 pointer-events-none z-[1]"
          aria-hidden="true"
          style={{
            background:
              "radial-gradient(ellipse 45% 18% at 50% 0%, rgba(245,200,106,0.04) 0%, transparent 60%)",
          }}
        />

        {/* Decorative string lights — Take Down & Storage */}
        {hasStringLights && (
          <>
            <StringLightsTop />
            <StringLightsLeft />
          </>
        )}

        {/* Light strand — Premium Lights */}
        {hasLightStrand && <LightStrandRight />}

        {/* ── Card content ──────────────────────────────────────────────── */}
        <div className="relative z-[4] flex flex-col items-center text-center pt-10 pb-8 px-6">
          {/* Title */}
          <h3
            className="text-2xl font-bold leading-snug mb-3 font-playfair whitespace-pre-line"
            style={{ color: "#f7f5f3" }}
          >
            {title}
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-relaxed mb-7"
            style={{ color: "#978e89", maxWidth: "210px" }}
          >
            {description}
          </p>

          {/* Premium decorative accent — replaces arrow */}
          <div className="flex items-center gap-2.5 mt-auto opacity-45 group-hover:opacity-100 transition-opacity duration-500">
            <div
              className="w-6 h-px"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(245,200,106,0.5))",
              }}
            />
            <div
              className="w-[6px] h-[6px] rotate-45 flex-shrink-0"
              style={{
                background:
                  "linear-gradient(135deg, rgba(245,200,106,0.7), rgba(196,140,56,0.5))",
                boxShadow: "0 0 8px rgba(245,200,106,0.35)",
              }}
            />
            <div
              className="w-6 h-px"
              style={{
                background:
                  "linear-gradient(90deg, rgba(245,200,106,0.5), transparent)",
              }}
            />
          </div>
        </div>

        {/* Chamfer corner accents — tiny golden dots at cut transition points */}
        <div
          className="absolute w-[3px] h-[3px] rounded-full pointer-events-none z-[5]"
          aria-hidden="true"
          style={{
            top: "0px",
            left: "19px",
            background: "rgba(245,200,106,0.45)",
            boxShadow: "0 0 5px rgba(245,200,106,0.25)",
          }}
        />
        <div
          className="absolute w-[3px] h-[3px] rounded-full pointer-events-none z-[5]"
          aria-hidden="true"
          style={{
            bottom: "0px",
            right: "19px",
            background: "rgba(245,200,106,0.45)",
            boxShadow: "0 0 5px rgba(245,200,106,0.25)",
          }}
        />
      </div>
    </motion.div>
  );
}

// ─── Trust Item ───────────────────────────────────────────────────────────────
function TrustItem({
  icon: Icon,
  title,
  subtitle,
  delay = 0,
}: {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-3"
    >
      <div
        className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
        style={{
          border: "1px solid rgba(106,45,38,0.5)",
          background: "rgba(217,53,53,0.06)",
        }}
      >
        <Icon
          size={18}
          style={{
            color: "#d93535",
            filter: "drop-shadow(0 0 4px rgba(217,53,53,0.4))",
          }}
        />
      </div>
      <div>
        <p className="text-sm font-semibold leading-tight" style={{ color: "#f7f5f3" }}>
          {title}
        </p>
        <p className="text-[11px] leading-snug mt-0.5" style={{ color: "#978e89" }}>
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Services Export ─────────────────────────────────────────────────────
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const featuredCards = [
    {
      title: "Residential Installation",
      icon: Home,
      beforeImage: "/BeforeAfter/services/before.png",
      afterImage: "/BeforeAfter/services/after.png",
      delay: 0.1,
    },
    {
      title: "Commercial Installation",
      icon: Building2,
      beforeImage: "/BeforeAfter/commercialbuilding/before.png",
      afterImage: "/BeforeAfter/commercialbuilding/after.png",
      delay: 0.2,
    },
  ];

  const serviceCards = [
    {
      icon: Wrench,
      title: "Maintenance\n& Support",
      description:
        "We keep your lights shining all season long. Quick response for any issue, replacements, and tune-ups whenever you need.",
      delay: 0.1,
      hasStringLights: false,
      hasLightStrand: false,
    },
    {
      icon: PackageOpen,
      title: "Take Down\n& Storage",
      description:
        "We handle the takedown, careful packing, and off-season storage so your lights are safe and ready for next year.",
      delay: 0.2,
      hasStringLights: true,
      hasLightStrand: false,
    },
    {
      icon: PenTool,
      title: "Custom Design\n& Planning",
      description:
        "Every property is unique. We create custom lighting designs tailored to your home or business for the perfect look.",
      delay: 0.3,
      hasStringLights: false,
      hasLightStrand: false,
    },
    {
      icon: Gem,
      title: "Premium Lights\n& Materials",
      description:
        "We use commercial-grade LED lights that are brighter, safer, and built to withstand Colorado winters.",
      delay: 0.4,
      hasStringLights: false,
      hasLightStrand: true,
    },
  ];

  const trustItems = [
    { icon: ShieldCheck, title: "Fully Insured",          subtitle: "For Your Peace of Mind" },
    { icon: Star,        title: "Satisfaction Guaranteed", subtitle: "We're Not Happy Until You Are" },
    { icon: Clock,       title: "On-Time & Reliable",     subtitle: "We Respect Your Time" },
    { icon: MapPin,      title: "Locally Owned",          subtitle: "Proudly Serving Denver, CO" },
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full overflow-hidden"
      style={{ background: "#090707" }}
    >
      {/* Ambient top glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 40% at 50% 8%, rgba(180,40,20,0.055) 0%, transparent 65%)",
        }}
      />

      {/* Bokeh particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {SERVICE_BOKEH.map((b, i) => (
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
            animate={{ opacity: [0.07, 0.38, 0.07], scale: [1, 1.5, 1] }}
            transition={{
              duration: b.dur,
              repeat: Infinity,
              delay: b.delay,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Top fade from previous section */}
      <div
        className="absolute inset-x-0 top-0 h-20 pointer-events-none z-[1]"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom, #090707 0%, transparent 100%)",
        }}
      />

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 w-full px-5 sm:px-8 lg:px-14 xl:px-20 2xl:px-28 pt-24 pb-20">

        {/* ── Section Header ─────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center mb-14">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mb-4"
          >
            <SectionEyebrow />
          </motion.div>

          {/* Snowflake */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.45, delay: 0.18 }}
            className="mb-5"
          >
            <Snowflake
              size={18}
              style={{
                color: "#d93535",
                filter: "drop-shadow(0 0 8px rgba(217,53,53,0.6))",
              }}
            />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-5xl lg:text-[58px] xl:text-[68px] font-bold leading-[1.08] tracking-tight mb-6 font-playfair"
          >
            <span style={{ color: "#f7f5f3" }}>Professional Lighting.{" "}</span>
            <span
              style={{
                color: "#d93535",
                textShadow: "0 0 40px rgba(217,53,53,0.35)",
              }}
            >
              Unforgettable Results.
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.36 }}
            className="text-base sm:text-lg leading-relaxed max-w-[540px]"
            style={{ color: "#978e89" }}
          >
            From cozy homes to stunning commercial spaces, we design, install, and maintain
            beautiful Christmas lighting that transforms your property.
          </motion.p>
        </div>

        {/* ── Featured Before/After Cards ─────────────────────────────────── */}
        <div className="flex flex-col sm:flex-row gap-5 mb-5">
          {featuredCards.map((card) => (
            <FeaturedCard
              key={card.title}
              title={card.title}
              icon={card.icon}
              beforeImage={card.beforeImage}
              afterImage={card.afterImage}
              delay={card.delay}
            />
          ))}
        </div>

        {/* ── Four Service Cards ──────────────────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-10">
          {serviceCards.map((card) => (
            <ServiceCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
              delay={card.delay}
              hasStringLights={card.hasStringLights}
              hasLightStrand={card.hasLightStrand}
            />
          ))}
        </div>

        {/* ── Trust Bar ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-4 px-6 py-5 rounded-2xl"
          style={{
            background:
              "linear-gradient(rgba(14,8,8,0.9), rgba(14,8,8,0.9)) padding-box, linear-gradient(135deg, rgba(106,45,38,0.6) 0%, rgba(80,30,25,0.3) 50%, rgba(106,45,38,0.5) 100%) border-box",
            border: "1px solid transparent",
            backdropFilter: "blur(8px)",
            boxShadow:
              "0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,220,168,0.05)",
          }}
        >
          {trustItems.map((item, i) => (
            <div key={item.title} className="relative flex-1 min-w-0 w-full sm:w-auto">
              {i > 0 && (
                <div
                  className="absolute left-0 top-2 bottom-2 w-px hidden sm:block"
                  style={{ backgroundColor: "rgba(106,45,38,0.4)" }}
                />
              )}
              <div className={i > 0 ? "sm:pl-4" : ""}>
                <TrustItem
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                  delay={0.15 + i * 0.08}
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div
        className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
        aria-hidden="true"
        style={{
          background: "linear-gradient(to bottom, transparent 0%, rgba(9,7,7,0.6) 100%)",
        }}
      />
    </section>
  );
}
