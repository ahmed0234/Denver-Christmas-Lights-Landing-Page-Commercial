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
import { PhoneCall, Sparkles, X } from "lucide-react";
import { handleGetQuoteClick } from "@/lib/scrollUtils";

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 350);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-50 select-none transition-all duration-300 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
          : "opacity-0 translate-y-6 scale-95 pointer-events-none"
      }`}
    >
      {/* Vertical Glass Capsule Dock Container */}
      <div
        className="group relative flex flex-col items-center gap-2 p-2.5 rounded-3xl border transition-all duration-300 w-44 sm:w-48 shadow-2xl"
        style={{
          borderColor: "var(--border-color)",
          background: "var(--bg-glass-card)",
          boxShadow:
            "0 20px 48px rgba(0,0,0,0.85), 0 0 24px var(--accent-glow-faint)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
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
        <a
          href="tel:7202967711"
          aria-label="Call Us Now"
          className="relative flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-2xl text-xs font-bold tracking-wider uppercase overflow-hidden cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
          style={{
            background:
              "linear-gradient(180deg, var(--gradient-btn-top) 0%, var(--gradient-btn-mid) 50%, var(--gradient-btn-bottom) 100%)",
            color: "var(--bg-primary)",
            boxShadow: "var(--shadow-btn)",
          }}
        >
          <PhoneCall size={14} className="shrink-0 animate-pulse" />
          <span className="whitespace-nowrap">Call Us Now</span>
        </a>

        {/* Stacked Action 2: Get a Free Quote (Bottom Secondary Dark Glass Action) */}
        <a
          href="#quote"
          onClick={handleGetQuoteClick}
          aria-label="Get a Free Quote"
          className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-2xl text-xs font-bold tracking-wider uppercase border cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.97]"
          style={{
            borderColor: "var(--border-color)",
            background: "var(--bg-glass)",
            color: "var(--text-body)",
          }}
        >
          <Sparkles
            size={14}
            className="shrink-0"
            style={{ color: "var(--accent)" }}
          />
          <span className="whitespace-nowrap">Get Free Quote</span>
        </a>
      </div>
    </div>
  );
}
