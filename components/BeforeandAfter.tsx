"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import {
  Sparkles,
  Building2,
  Building,
  Store,
  Landmark,
  ShoppingBag,
  Gift,
  ArrowRight,
} from "lucide-react";
import { handleGetQuoteClick } from "@/lib/scrollUtils";
import BeforeAfterSlider from "./BeforeAfterSlider";

// ─── Transformation Data ──────────────────────────────────────────────────────
const transformations = [
  {
    id: 1,
    title: "Car Dealerships",
    icon: Building2,
    beforeImage: "/BeforeandAfterImages/CarDealershipBefore.webp",
    afterImage: "/BeforeandAfterImages/CarDealershipAfter.webp",
  },
  {
    id: 2,
    title: "Churches & Houses of Worship",
    icon: Landmark,
    beforeImage: "/BeforeandAfterImages/ChurchBefore.webp",
    afterImage: "/BeforeandAfterImages/ChurchAfter.webp",
  },
  {
    id: 3,
    title: "Hotels & Hospitality",
    icon: Sparkles,
    beforeImage: "/BeforeandAfterImages/HotelBefore.webp",
    afterImage: "/BeforeandAfterImages/HotelAfter.webp",
  },
  {
    id: 4,
    title: "Restaurants & Dining",
    icon: Store,
    beforeImage: "/BeforeandAfterImages/RestaurantBefore.webp",
    afterImage: "/BeforeandAfterImages/RestaurantAfter.webp",
  },
  {
    id: 5,
    title: "Commercial Storefronts",
    icon: Building,
    beforeImage: "/BeforeandAfterImages/RetailPlazasBefore.webp",
    afterImage: "/BeforeandAfterImages/RetailPlazasAfter.webp",
  },
  {
    id: 6,
    title: "Shopping Centers",
    icon: ShoppingBag,
    beforeImage: "/BeforeandAfterImages/shoppingcenterbefore.webp",
    afterImage: "/BeforeandAfterImages/shoppingcenterafter.webp",
  },
];

// ─── Transformation Card ───────────────────────────────────────────────────────
function TransformationCard({
  item,
}: {
  item: (typeof transformations)[0];
  index: number;
}) {
  const Icon = item.icon;

  const normalBg = `linear-gradient(160deg, var(--gradient-card-top) 0%, var(--gradient-card-bottom) 100%) padding-box, var(--card-border-gradient) border-box`;
  const normalShadow = `inset 0 1px 0 var(--highlight-card), var(--shadow-card)`;

  return (
    <div
      className="group flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        background: normalBg,
        border: "2px solid transparent",
        boxShadow: normalShadow,
      }}
    >
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#14110e]">
        <BeforeAfterSlider
          beforeImage={item.beforeImage}
          afterImage={item.afterImage}
          beforeAlt={`${item.title} before`}
          afterAlt={`${item.title} after`}
        />
      </div>
      <div
        className="flex items-center gap-2.5 px-4 py-3"
        style={{
          borderTop: "1.5px solid var(--border-color)",
          background: `linear-gradient(180deg, var(--bg-elevated) 0%, var(--gradient-card-bottom) 100%)`,
        }}
      >
        <Icon
          size={22}
          style={{
            color: "var(--gold)",
            filter: "drop-shadow(0 0 4px var(--gold-glow))",
            flexShrink: 0,
          }}
        />
        <span
          className="text-[13px] sm:text-base 2xl:text-lg font-medium tracking-wide font-sans"
          style={{ color: "var(--text-heading)" }}
        >
          {item.title}
        </span>
      </div>
    </div>
  );
}

// ─── Eyebrow ──────────────────────────────────────────────────────────────────
function SectionEyebrow() {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-px w-8 sm:w-12"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--accent) 100%)",
        }}
      />
      <span
        className="text-xs font-semibold tracking-[0.22em] uppercase"
        style={{ color: "var(--accent)" }}
      >
        Proven Results
      </span>
      <div
        className="h-px w-8 sm:w-12"
        style={{
          background:
            "linear-gradient(90deg, var(--accent) 0%, transparent 100%)",
        }}
      />
    </div>
  );
}

// ─── Bottom CTA Banner ────────────────────────────────────────────────────────
function BottomCTA() {
  return (
    <div
      className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 sm:p-8 rounded-2xl relative overflow-hidden"
      style={{
        background: `linear-gradient(160deg, var(--gradient-card-top) 0%, var(--gradient-card-bottom) 100%) padding-box, var(--card-border-gradient) border-box`,
        border: "1.5px solid transparent",
        boxShadow: `inset 0 1px 0 var(--highlight-card), var(--shadow-card)`,
      }}
    >
      <div className="flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            background: `linear-gradient(135deg, var(--accent-glow-soft) 0%, var(--bg-elevated) 100%)`,
            border: "1px solid var(--border-color)",
            boxShadow: "inset 0 1px 0 var(--highlight-surface)",
          }}
        >
          <Gift
            size={20}
            style={{
              color: "var(--accent)",
              filter: "drop-shadow(0 0 6px var(--accent-glow))",
            }}
          />
        </div>
        <div>
          <p
            className="text-lg sm:text-xl 2xl:text-3xl font-bold leading-tight font-sans"
            style={{ color: "var(--text-heading)" }}
          >
            Your Property Could Be Next
          </p>
          <p
            className="text-sm 2xl:text-lg mt-0.5"
            style={{ color: "var(--text-muted)" }}
          >
            Professional Christmas lighting that makes your property impossible
            to ignore
          </p>
        </div>
      </div>

      <a
        href="#quote"
        id="before-after-cta-quote"
        onClick={handleGetQuoteClick}
        className="relative flex items-center gap-2.5 px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide whitespace-nowrap w-full sm:w-auto justify-center flex-shrink-0 overflow-hidden cursor-pointer select-none transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
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
        <span className="relative text-amber-950 font-semibold">
          Get Your Free Quote
        </span>
        <ArrowRight size={15} className="relative text-amber-950" />
      </a>
    </div>
  );
}

// ─── Static bokeh ─────────────────────────────────────────────────────────────
const BOKEH = [
  { left: "7%", top: "10%", size: 5, gold: true, dur: 3.5, delay: 0 },
  { left: "93%", top: "7%", size: 4, gold: false, dur: 4.0, delay: 0.7 },
  { left: "14%", top: "86%", size: 6, gold: true, dur: 3.2, delay: 1.2 },
  { left: "86%", top: "80%", size: 4, gold: false, dur: 4.5, delay: 0.4 },
  { left: "50%", top: "4%", size: 3, gold: true, dur: 3.8, delay: 1.8 },
  { left: "3%", top: "48%", size: 3, gold: false, dur: 5.0, delay: 2.1 },
  { left: "97%", top: "44%", size: 5, gold: true, dur: 3.6, delay: 0.9 },
];

// ─── Main Section ─────────────────────────────────────────────────────────────
export default function BeforeandAfter() {
  return (
    <section
      id="before-after"
      className="relative w-full overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <Image
          src="/BeforeAfter/BackGroundSubtle.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          quality={75}
          className="object-cover object-[50%_30%] md:object-center opacity-65 md:opacity-90 brightness-90 saturate-90 contrast-105"
        />

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 90% 85% at 50% 45%, rgba(9,7,7,0.48) 0%, rgba(9,7,7,0.78) 60%, rgba(9,7,7,0.96) 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, var(--bg-primary) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, var(--bg-primary) 0%, transparent 100%)",
          }}
        />
      </div>

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 70% 35% at 50% 0%, var(--accent-glow-faint) 0%, transparent 70%)",
        }}
      />

      {/* Bokeh */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {BOKEH.map((b, i) => (
          <div
            key={i}
            className="absolute rounded-full hero-bokeh-particle"
            style={
              {
                left: b.left,
                top: b.top,
                width: b.size,
                height: b.size,
                backgroundColor: b.gold ? "var(--gold)" : "var(--accent)",
                filter: "blur(2px)",
                "--bokeh-dur": `${b.dur}s`,
                "--bokeh-delay": `${b.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 2xl:px-32 pt-8 pb-8">
        <div className="flex flex-col items-center text-center mb-14">
          <div className="mb-5">
            <SectionEyebrow />
          </div>
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-[68px] font-bold leading-[1.08] tracking-tight mb-5 font-playfair"
            style={{ color: "var(--text-heading)" }}
          >
            Commercial Holiday{" "}
            <span className="text-accent-gradient">Transformations</span>
          </h2>
          <p
            className="text-base sm:text-lg max-w-2xl"
            style={{ color: "var(--text-muted)" }}
          >
            See how professional Christmas lighting transforms commercial
            properties into festive destinations that attract attention, delight
            visitors, and leave a lasting impression throughout the holiday
            season
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-14">
          {transformations.map((item, index) => (
            <TransformationCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <BottomCTA />
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-24 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, var(--fade-to) 100%)",
        }}
      />
    </section>
  );
}
