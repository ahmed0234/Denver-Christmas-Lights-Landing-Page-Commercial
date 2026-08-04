import type React from "react";

/**
 * Reusable utility for handling all "Get Free Quote" / Lead-Gen CTA clicks across the site.
 * - Smoothly scrolls to the quote form section with header offset.
 * - Triggers the attention sequence (1.04x scale, golden glow, highlight sweep).
 * - Auto-focuses the 'Full Name' input field (#quote-name).
 * - Respects prefers-reduced-motion.
 * - If already viewing the form, skips scroll and replays attention + focus.
 */
export const handleGetQuoteClick = (e?: React.MouseEvent<HTMLElement>) => {
  if (e) {
    e.preventDefault();
  }

  const targetElement =
    document.getElementById("quote") ||
    document.getElementById("quote-form-container");

  const triggerAttention = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("quote-form-trigger-attention"));
    }
  };

  if (!targetElement) {
    if (typeof window !== "undefined") {
      window.location.hash = "quote";
    }
    triggerAttention();
    return;
  }

  const rect = targetElement.getBoundingClientRect();
  const headerOffset = 90;
  const targetY = rect.top + window.pageYOffset - headerOffset;
  const isAlreadyVisible = Math.abs(rect.top - headerOffset) < 140;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (isAlreadyVisible) {
    triggerAttention();
  } else {
    window.scrollTo({
      top: targetY,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });

    if (prefersReducedMotion) {
      triggerAttention();
    } else {
      let triggered = false;
      const checkScroll = () => {
        const currentRect = targetElement.getBoundingClientRect();
        if (Math.abs(currentRect.top - headerOffset) < 100) {
          if (!triggered) {
            triggered = true;
            window.removeEventListener("scroll", checkScroll);
            triggerAttention();
          }
        }
      };

      window.addEventListener("scroll", checkScroll, { passive: true });
      setTimeout(() => {
        if (!triggered) {
          triggered = true;
          window.removeEventListener("scroll", checkScroll);
          triggerAttention();
        }
      }, 750);
    }
  }
};
