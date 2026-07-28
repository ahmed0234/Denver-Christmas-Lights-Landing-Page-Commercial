"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Phone } from "lucide-react";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 md:pt-6 px-3 sm:px-6 lg:px-12 xl:px-16 2xl:px-24 pointer-events-none">
      <div className="w-full mx-auto pointer-events-auto">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex items-center justify-between px-3.5 sm:px-5 md:px-7 lg:px-9 h-[60px] sm:h-[68px] md:h-[74px] lg:h-[78px] xl:h-[82px] rounded-[20px] sm:rounded-[26px] md:rounded-[30px] transition-all duration-300 overflow-hidden"
          style={{
            backgroundColor: "rgba(18, 10, 10, 0.65)",
            backdropFilter: "blur(20px) saturate(180%)",
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            border: "1px solid rgba(139, 64, 54, 0.45)",
            boxShadow:
              "0 20px 50px rgba(0, 0, 0, 0.65), inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 0 30px rgba(217, 53, 53, 0.12)",
          }}
        >
          {/* Subtle top edge light reflection */}
          <div
            className="absolute inset-x-8 top-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(255, 220, 180, 0.35) 30%, rgba(217, 53, 53, 0.4) 70%, transparent 100%)",
            }}
          />

          {/* ── LEFT SIDE: Golden House Icon + HTML Text Unit ────────────────── */}
          <div className="flex items-center h-full shrink-0">
            <a
              href="#"
              className="group flex items-center gap-2.5 sm:gap-3 md:gap-3.5 h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg"
              aria-label="Denver Christmas Lights Home"
            >
              {/* Golden House Logo Icon */}
              <Image
                src="/NavbarLogo.png"
                alt="Denver Christmas Lights House Logo"
                width={120}
                height={120}
                priority
                className="h-8 sm:h-10 md:h-11 lg:h-12 w-auto object-contain shrink-0 filter drop-shadow-[0_2px_10px_rgba(245,200,106,0.35)] transition-transform duration-300 group-hover:scale-105"
              />

              {/* Text Unit */}
              <div className="flex flex-col justify-center select-none">
                <span className="font-playfair text-base sm:text-lg md:text-xl lg:text-2xl font-bold tracking-[0.16em] uppercase text-[#fcf8f2] leading-none mb-0.5 sm:mb-1 group-hover:text-white transition-colors">
                  DENVER
                </span>
                <span className="text-[8px] sm:text-[10px] md:text-xs font-bold tracking-[0.24em] uppercase text-[#d93535] leading-none">
                  CHRISTMAS LIGHTS
                </span>
              </div>
            </a>
          </div>

          {/* ── RIGHT SIDE: Responsive 3D Call Button ─────────────────────── */}
          <div className="flex items-center h-full shrink-0">
            <motion.a
              id="navbar-call-btn"
              href="tel:+17205134567"
              whileHover={{
                scale: 1.03,
                boxShadow:
                  "0 8px 28px rgba(217, 53, 53, 0.6), inset 0 1.5px 2px rgba(255, 255, 255, 0.45)",
              }}
              whileTap={{ scale: 0.97 }}
              className="relative group flex items-center gap-1.5 sm:gap-2 md:gap-2.5 px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 rounded-full text-white font-medium text-[11px] sm:text-xs md:text-sm tracking-wide overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0"
              style={{
                background:
                  "linear-gradient(180deg, #e53939 0%, #c62424 50%, #991616 100%)",
                border: "1px solid rgba(255, 220, 220, 0.35)",
                boxShadow:
                  "0 6px 20px rgba(217, 53, 53, 0.4), inset 0 1.5px 1.5px rgba(255, 255, 255, 0.35), inset 0 -2px 4px rgba(0, 0, 0, 0.35)",
              }}
            >
              {/* 3D Top shine highlight overlay */}
              <span
                className="absolute inset-x-0 top-0 h-1/2 rounded-t-full pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0%, transparent 100%)",
                }}
              />

              {/* Phone Icon inside small circular glass disc */}
              <span className="relative w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 lg:w-8 lg:h-8 rounded-full bg-black/35 border border-white/25 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-105 transition-transform duration-200">
                <Phone size={12} className="text-white fill-white sm:w-3 sm:h-3 md:w-3.5 md:h-3.5 lg:w-4 lg:h-4" />
              </span>

              {/* Button Text */}
              <span className="relative font-semibold tracking-tight whitespace-nowrap">
                <span className="hidden sm:inline">Call Me </span>
                <span className="font-normal opacity-95">
                  (720) 513-4567
                </span>
              </span>
            </motion.a>
          </div>
        </motion.nav>
      </div>
    </header>
  );
}
