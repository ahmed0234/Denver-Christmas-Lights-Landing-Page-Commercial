"use client";

/**
 * Footer.tsx
 * Minimal Luxury Christmas Lights Landing Page Footer with Dual Conversion CTAs.
 * Fully responsive, accessible, and high-converting.
 */

import Link from "next/link";
import { motion } from "motion/react";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa6";
import { ThemeLogoIcon } from "@/components/ThemeLogo";
import { handleGetQuoteClick } from "@/lib/scrollUtils";

const SOCIAL_LINKS = [
  {
    icon: FaInstagram,
    href: "https://www.instagram.com/denverchristmas_lightsdisplay",
    label: "Instagram",
  },
  {
    icon: FaTiktok,
    href: "https://www.tiktok.com/@denver.christmas",
    label: "TikTok",
  },
  {
    icon: FaFacebookF,
    href: "https://www.facebook.com/denver.lightschristmas/",
    label: "Facebook",
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative w-full font-sans border-t overflow-hidden"
      style={{
        background: "var(--bg-primary)",
        borderColor: "var(--border-color)",
      }}
      aria-label="Site Footer"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[32rem] h-[16rem] rounded-full blur-[140px] opacity-15"
          style={{ background: "var(--gold-glow)" }}
        />
      </div>

      {/* Main Footer Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-12 sm:pt-14 pb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-12 pb-10">
          {/* ── LEFT SIDE: Logo, Description & Socials ── */}
          <div className="flex flex-col items-start gap-4 max-w-md">
            {/* Logo */}
            <Link
              href="#"
              className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-lg"
              aria-label="Denver Christmas Lights Home"
            >
              <ThemeLogoIcon className="h-9 sm:h-10 w-auto shrink-0 transition-transform duration-300 group-hover:scale-105" />
              <div className="flex flex-col justify-center select-none">
                <span
                  className="font-playfair text-lg sm:text-xl font-bold tracking-[0.16em] uppercase leading-none mb-0.5"
                  style={{ color: "var(--text-heading)" }}
                >
                  DENVER
                </span>
                <span
                  className="text-[9px] sm:text-[10px] font-bold tracking-[0.24em] uppercase leading-none"
                  style={{ color: "var(--accent)" }}
                >
                  CHRISTMAS LIGHTS
                </span>
              </div>
            </Link>

            {/* Short one-line description */}
            <p
              className="text-xs sm:text-sm leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Professional residential Christmas light installation,
              maintenance, and takedown services in Denver, Colorado.
            </p>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 pt-1">
              {SOCIAL_LINKS.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-amber-500/20 bg-amber-950/10 text-amber-300 hover:text-amber-200 hover:border-amber-400/50 hover:bg-amber-500/15 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                    style={{
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <Icon size={16} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* ── RIGHT SIDE: Contact Information & Dual Conversion CTAs ── */}
          <div className="flex flex-col gap-4 sm:gap-5 w-full md:w-auto shrink-0">
            <h4
              className="text-[11px] font-bold tracking-[0.22em] uppercase"
              style={{ color: "var(--gold)" }}
            >
              Contact & Quick Action
            </h4>

            <div className="flex flex-col gap-3">
              {/* Email */}
              <a
                href="mailto:mrxmasdecorator@gmail.com"
                className="group flex items-center gap-3 text-xs sm:text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded"
                style={{ color: "var(--text-body)" }}
              >
                <span className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[var(--accent)] group-hover:scale-105 group-hover:border-amber-400/50 transition-all shrink-0">
                  <Mail size={15} />
                </span>
                <span className="group-hover:text-[var(--gold)] transition-colors">
                  mrxmasdecorator@gmail.com
                </span>
              </a>

              {/* Address */}
              <a
                href="https://maps.google.com/?q=5277+Kittredge+St,+Denver,+CO+80239,+United+States"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 text-xs sm:text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 rounded"
                style={{ color: "var(--text-body)" }}
              >
                <span className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-[var(--accent)] group-hover:scale-105 group-hover:border-amber-400/50 transition-all shrink-0">
                  <MapPin size={15} />
                </span>
                <span className="group-hover:text-[var(--gold)] transition-colors max-w-[280px] sm:max-w-xs">
                  5277 Kittredge St, Denver, CO 80239, United States
                </span>
              </a>
            </div>

            {/* ── DUAL CONVERSION CTAS ── */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              {/* Get Free Quote CTA Button */}
              <motion.a
                id="footer-get-quote-btn"
                href="#quote"
                onClick={handleGetQuoteClick}
                whileHover={{
                  scale: 1.03,
                  y: -1.5,
                  boxShadow:
                    "0 8px 30px rgba(245, 200, 106, 0.45), inset 0 1.5px 0 rgba(255, 255, 255, 0.85), inset 0 -2px 4px rgba(80, 40, 0, 0.4)",
                }}
                whileTap={{ scale: 0.97 }}
                className="relative group flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wide overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer select-none"
                style={{
                  background: `linear-gradient(180deg, #FFF4CE 0%, #F5C86A 32%, #E5A932 70%, #B87B15 100%)`,
                  border: "1px solid rgba(255, 235, 170, 0.85)",
                  boxShadow: `0 4px 20px rgba(245, 200, 106, 0.35), inset 0 1.5px 0 rgba(255, 255, 255, 0.9), inset 0 -2px 4px rgba(90, 45, 0, 0.45)`,
                  color: "#241200",
                  textShadow: "0 1px 0 rgba(255, 255, 255, 0.4)",
                }}
              >
                <span
                  className="absolute inset-x-0 top-0 h-1/2 rounded-t-full pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(255, 255, 255, 0.55) 0%, transparent 100%)",
                  }}
                />
                <span className="btn-shine-sweep-effect" />
                <Sparkles size={14} className="relative shrink-0" />
                <span className="relative font-bold whitespace-nowrap">
                  Get Free Quote
                </span>
              </motion.a>

              {/* Call Now CTA Button */}
              <motion.a
                id="footer-call-now-btn"
                href="tel:7202967711"
                whileHover={{
                  scale: 1.03,
                  y: -1.5,
                  boxShadow:
                    "var(--shadow-btn-hover), inset 0 1.5px 0 var(--highlight-btn), inset 0 -2px 4px var(--btn-inner-shadow)",
                }}
                whileTap={{ scale: 0.97 }}
                className="relative group flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wide overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0 cursor-pointer select-none"
                style={{
                  background: `linear-gradient(180deg, var(--gradient-btn-top) 0%, var(--gradient-btn-mid) 45%, var(--gradient-btn-bottom) 100%)`,
                  border: "1px solid rgba(255,255,255,0.2)",
                  boxShadow: `var(--shadow-btn), inset 0 1.5px 0 var(--highlight-btn), inset 0 -2px 4px var(--btn-inner-shadow)`,
                  color: "#fff",
                }}
              >
                <span
                  className="absolute inset-x-0 top-0 h-1/2 rounded-t-full pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(180deg, var(--btn-inner-highlight) 0%, transparent 100%)",
                  }}
                />
                <Phone size={14} className="relative text-amber-950 shrink-0" />
                <span className="relative text-amber-950 font-bold whitespace-nowrap">
                  Call Now
                </span>
              </motion.a>
            </div>
          </div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs"
          style={{ borderColor: "rgba(229, 193, 88, 0.2)" }}
        >
          <p style={{ color: "var(--text-muted)" }}>
            © {currentYear} Denver Christmas Lights. All rights reserved.
          </p>

          <div
            className="flex items-center gap-6"
            style={{ color: "var(--text-muted)" }}
          >
            <a
              href="#privacy"
              className="hover:text-[var(--gold)] transition-colors focus:outline-none focus-visible:underline"
            >
              Privacy Policy
            </a>
            <span className="opacity-30">•</span>
            <a
              href="#terms"
              className="hover:text-[var(--gold)] transition-colors focus:outline-none focus-visible:underline"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
