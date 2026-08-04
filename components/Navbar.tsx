"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { Phone, Sparkles } from "lucide-react";
import { ThemeLogoIcon } from "@/components/ThemeLogo";
import { handleGetQuoteClick } from "@/lib/scrollUtils";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 md:pt-6 px-3 sm:px-6 lg:px-12 xl:px-16 2xl:px-24 pointer-events-none">
      <div className="w-full mx-auto pointer-events-auto">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-between px-3.5 sm:px-5 md:px-7 lg:px-9 h-[60px] sm:h-[68px] md:h-[74px] lg:h-[78px] xl:h-[82px] rounded-[20px] sm:rounded-[26px] md:rounded-[30px] overflow-hidden"
          style={{
            background: `linear-gradient(180deg, var(--bg-glass) 0%, var(--bg-overlay) 100%)`,
            backdropFilter: "blur(22px) saturate(190%)",
            WebkitBackdropFilter: "blur(22px) saturate(190%)",
            border: "1px solid var(--border-color)",
            boxShadow:
              "0 20px 50px rgba(0,0,0,0.55), inset 0 1px 0 var(--highlight-surface), var(--shadow-ambient)",
          }}
        >
          {/* Top edge light reflection */}
          <div
            className="absolute inset-x-8 top-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, var(--gold-glow) 30%, var(--accent-glow-soft) 70%, transparent 100%)",
            }}
          />

          {/* ── LEFT SIDE: Logo + Text ── */}
          <div className="flex items-center h-full shrink-0">
            <Link
              href="/"
              className="group flex items-center gap-2 sm:gap-3 md:gap-3.5 h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              aria-label="Denver Christmas Lights Home"
            >
              {/* Scalable, Theme-Aware Vector SVG Logo */}
              <ThemeLogoIcon className="h-8 sm:h-10 md:h-11 lg:h-12 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105" />

              <div className="flex flex-col justify-center select-none">
                <span
                  className="font-playfair text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-[0.16em] uppercase leading-none mb-0.5 sm:mb-1 transition-opacity group-hover:opacity-90"
                  style={{ color: "var(--text-heading)" }}
                >
                  DENVER
                </span>
                <span
                  className="text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.24em] uppercase leading-none"
                  style={{ color: "var(--accent)" }}
                >
                  CHRISTMAS LIGHTS
                </span>
              </div>
            </Link>
          </div>

          {/* ── RIGHT SIDE: Get Free Quote + Call Button ── */}
          <div className="flex items-center gap-2 sm:gap-2.5 md:gap-3 h-full shrink-0">
            {/* Premium "Get Free Quote" CTA Button */}
            <motion.a
              id="navbar-get-quote-btn"
              href="#quote"
              onClick={handleGetQuoteClick}
              whileHover={{
                scale: 1.03,
                y: -1,
                boxShadow:
                  "0 8px 32px rgba(245, 200, 106, 0.5), 0 0 20px rgba(245, 200, 106, 0.35), inset 0 1.5px 0 rgba(255, 255, 255, 0.85), inset 0 -2.5px 4px rgba(80, 40, 0, 0.5)",
              }}
              whileTap={{ scale: 0.97, y: 0 }}
              className="relative group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full font-bold text-[11px] sm:text-xs md:text-sm tracking-wide overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 shrink-0 cursor-pointer select-none"
              style={{
                background: `linear-gradient(180deg, #FFF4CE 0%, #F5C86A 32%, #E5A932 70%, #B87B15 100%)`,
                border: "1px solid rgba(255, 235, 170, 0.85)",
                boxShadow: `0 4px 22px rgba(245, 200, 106, 0.38), inset 0 1.5px 0 rgba(255, 255, 255, 0.9), inset 0 -2.5px 4px rgba(90, 45, 0, 0.45)`,
                color: "#241200",
                textShadow: "0 1px 0 rgba(255, 255, 255, 0.4)",
              }}
            >
              {/* 3D Glass Top Reflection */}
              <span
                className="absolute inset-x-0 top-0 h-1/2 rounded-t-full pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, transparent 100%)",
                }}
              />

              {/* Shine Sweep hover animation */}
              <span className="btn-shine-sweep-effect" />

              {/* Golden Disc with Sparkle Icon */}
              <span className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-6.5 md:h-6.5 rounded-full bg-amber-950/20 border border-amber-900/30 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-200">
                <Sparkles
                  size={12}
                  className="text-amber-950 fill-amber-950 sm:w-3 sm:h-3 md:w-3.5 md:h-3.5"
                />
              </span>

              <span className="relative font-bold tracking-tight whitespace-nowrap">
                Get Free Quote
              </span>
            </motion.a>

            {/* Call Button (Hidden on mobile, visible on tablet & desktop) */}
            <motion.a
              id="navbar-call-btn"
              href="tel:7202967711"
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "var(--shadow-btn-hover), inset 0 1px 0 var(--highlight-btn), inset 0 -2px 4px var(--btn-inner-shadow)",
              }}
              whileTap={{ scale: 0.97 }}
              className="hidden sm:flex relative group items-center gap-1.5 sm:gap-2 md:gap-2.5 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full font-medium text-[11px] sm:text-xs md:text-sm tracking-wide overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
              style={{
                background: `linear-gradient(180deg, var(--gradient-btn-top) 0%, var(--gradient-btn-mid) 45%, var(--gradient-btn-bottom) 100%)`,
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: `var(--shadow-btn), inset 0 1.5px 0 var(--highlight-btn), inset 0 -2px 4px var(--btn-inner-shadow)`,
                color: "#fff",
              }}
            >
              {/* 3D top shine */}
              <span
                className="absolute inset-x-0 top-0 h-1/2 rounded-t-full pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, var(--btn-inner-highlight) 0%, transparent 100%)",
                }}
              />

              {/* Phone disc */}
              <span className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-black/25 border border-white/20 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-200">
                <Phone
                  size={12}
                  className="text-amber-950 fill-white sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4"
                />
              </span>

              <span className="relative font-semibold tracking-tight whitespace-nowrap text-amber-950">
                <span className="hidden sm:inline">Call </span>
                <span className="font-normal opacity-100 font-semibold">
                  (720) 296-7711
                </span>
              </span>
            </motion.a>
          </div>
        </motion.nav>
      </div>
    </header>
  );
}
