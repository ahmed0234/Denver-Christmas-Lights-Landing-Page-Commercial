"use client";

/**
 * FloatingCTA.tsx
 * Premium Vertical Floating Utility Capsule (Bottom-Right).
 *
 * Compact vertical dock positioned at fixed bottom-6 right-6.
 * Features stacked top-to-bottom actions:
 * - Top Action: "Call Us Now" (Primary metallic gold action with phone icon)
 * - Bottom Action: "Get a Free Quote" (Secondary dark glass action with sparkles icon)
 *
 * Clean continuous border, tiny glowing warm light status accent, zero top-line glitching,
 * smooth entrance animation and responsive footprint.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PhoneCall, Sparkles, X } from "lucide-react";
import { handleGetQuoteClick } from "@/lib/scrollUtils";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Reveal dock after scrolling past 350px
      if (window.scrollY > 350) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.92 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-6 right-6 z-50 select-none pointer-events-auto"
        >
          {/* Vertical Glass Capsule Dock Container */}
          <div
            className="group relative flex flex-col items-center gap-2 p-2.5 rounded-3xl border transition-all duration-300 w-44 sm:w-48 shadow-2xl"
            style={{
              borderColor: "var(--border-color)",
              background: "var(--bg-glass-card)",
              boxShadow:
                "0 20px 48px rgba(0,0,0,0.85), 0 0 24px var(--accent-glow-faint)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
            }}
          >
            {/* Top Micro-Header: Tiny Warm Light Accent + Dismiss */}
            <div className="flex items-center justify-between w-full px-1.5 pt-0.5">
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{
                    background: "var(--accent)",
                    boxShadow: "0 0 8px var(--accent-glow)",
                  }}
                />
                <span
                  className="text-[10px] font-bold tracking-wider uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  Quick Contact
                </span>
              </div>

              <button
                onClick={() => setIsDismissed(true)}
                aria-label="Dismiss control"
                className="text-[var(--text-muted)] hover:text-[var(--text-heading)] transition-colors cursor-pointer p-0.5"
              >
                <X size={12} />
              </button>
            </div>

            {/* Stacked Action 1: Call Us Now (Top Primary Gold Action) */}
            <motion.a
              href="tel:7202967711"
              aria-label="Call Us Now"
              className="relative flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-2xl text-xs font-bold tracking-wider uppercase overflow-hidden cursor-pointer"
              style={{
                background:
                  "linear-gradient(180deg, var(--gradient-btn-top) 0%, var(--gradient-btn-mid) 50%, var(--gradient-btn-bottom) 100%)",
                color: "var(--bg-primary)",
                boxShadow: "var(--shadow-btn)",
              }}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.97 }}
            >
              <PhoneCall size={14} className="shrink-0 animate-pulse" />
              <span className="whitespace-nowrap">Call Us Now</span>
            </motion.a>

            {/* Stacked Action 2: Get a Free Quote (Bottom Secondary Dark Glass Action) */}
            <motion.a
              href="#quote"
              onClick={handleGetQuoteClick}
              aria-label="Get a Free Quote"
              className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-2xl text-xs font-bold tracking-wider uppercase border cursor-pointer transition-all duration-300"
              style={{
                borderColor: "var(--border-color)",
                background: "var(--bg-glass)",
                color: "var(--text-body)",
              }}
              whileHover={{
                scale: 1.02,
                y: -1,
                borderColor: "var(--accent)",
                boxShadow: "0 0 14px var(--accent-glow-faint)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Sparkles
                size={14}
                className="shrink-0"
                style={{ color: "var(--accent)" }}
              />
              <span className="whitespace-nowrap">Get Free Quote</span>
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
