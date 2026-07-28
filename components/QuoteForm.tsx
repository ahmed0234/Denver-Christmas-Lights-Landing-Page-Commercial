"use client";

import Image from "next/image";
import { motion } from "motion/react";
import {
  User,
  Mail,
  Home,
  CalendarDays,
  MessageSquare,
  ArrowRight,
  Lock,
  Snowflake,
} from "lucide-react";

// ── Field wrapper ──────────────────────────────────────────────────────────────
function FormField({
  icon: Icon,
  placeholder,
  type = "text",
  isTextarea = false,
  rightIcon: RightIcon,
  id,
}: {
  icon: React.ElementType;
  placeholder: string;
  type?: string;
  isTextarea?: boolean;
  rightIcon?: React.ElementType;
  id: string;
}) {
  const baseClass =
    "w-full bg-transparent text-[var(--body)] placeholder-[var(--muted)] text-sm outline-none resize-none leading-none";

  return (
    <div
      className="flex items-center gap-3 px-4 py-3.5 rounded-xl border transition-colors duration-200 group"
      style={{
        background:
          "linear-gradient(180deg, rgba(72,22,18,0.55) 0%, rgba(38,10,9,0.72) 100%)",
        borderColor: "rgba(142,73,56,0.55)",
        boxShadow:
          "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.25)",
      }}
      onFocus={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(217,53,53,0.7)";
        el.style.boxShadow =
          "0 0 0 2px rgba(217,53,53,0.12), inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.25)";
      }}
      onBlur={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "rgba(142,73,56,0.55)";
        el.style.boxShadow =
          "inset 0 1px 0 rgba(255,255,255,0.04), inset 0 -1px 0 rgba(0,0,0,0.25)";
      }}
    >
      <Icon
        size={16}
        className="shrink-0"
        style={{ color: "rgba(151,142,137,0.75)" }}
      />
      {isTextarea ? (
        <textarea
          id={id}
          placeholder={placeholder}
          rows={3}
          className={baseClass}
          style={{ alignSelf: "flex-start", paddingTop: "2px" }}
        />
      ) : (
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`${baseClass} flex-1`}
        />
      )}
      {RightIcon && (
        <RightIcon
          size={16}
          className="shrink-0"
          style={{ color: "rgba(151,142,137,0.75)" }}
        />
      )}
    </div>
  );
}

// ── Divider with snowflake ─────────────────────────────────────────────────────
function SnowflakeDivider() {
  return (
    <div className="flex items-center gap-3 my-5">
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--primary), transparent)",
        }}
      />
      <Snowflake size={13} style={{ color: "var(--primary)" }} />
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--primary), transparent)",
        }}
      />
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
export default function QuoteForm() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      className="relative w-full max-w-[480px] mx-auto"
    >
      {/*
        Christmas Lights — absolutely positioned above the card.
        The PNG is 1320×540. The garland sags from the two top corners
        down to the middle. The visible content fills roughly the top
        55% of the image. We extend the image slightly beyond the card
        edges (left/right) so the corner garland bunches overlap the
        card border naturally, and position it so the string hangs just
        over the card's top edge.
      */}
      <div
        className="absolute z-20 pointer-events-none"
        style={{
          top: "-52px",
          left: "-16px",
          right: "-16px",
        }}
      >
        <motion.div
          animate={{
            filter: [
              "drop-shadow(0 0 6px rgba(245,198,106,0.55)) drop-shadow(0 0 14px rgba(255,220,130,0.3))",
              "drop-shadow(0 0 14px rgba(245,198,106,0.9)) drop-shadow(0 0 28px rgba(255,220,130,0.55))",
              "drop-shadow(0 0 6px rgba(245,198,106,0.55)) drop-shadow(0 0 14px rgba(255,220,130,0.3))",
            ],
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/FormUpperLights.png"
            alt="Christmas string lights decoration"
            width={1320}
            height={540}
            className="w-full h-auto"
            style={{ mixBlendMode: "lighten" }}
            priority
          />
        </motion.div>
      </div>

      {/* ── Card ── */}
      <div
        className="relative z-10 rounded-2xl overflow-hidden"
        style={{
          background:
            "radial-gradient(ellipse 90% 45% at 50% 0%, rgba(120,30,20,0.95) 0%, rgba(72,12,10,0.97) 38%, rgba(28,6,5,0.98) 70%, rgba(14,3,3,0.99) 100%)",
          border: "1.5px solid rgba(139,64,54,0.6)",
          boxShadow:
            "0 0 0 1px rgba(80,20,15,0.4), 0 4px 80px rgba(180,30,20,0.22), 0 40px 100px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,180,130,0.07)",
        }}
      >
        {/* Subtle warm shimmer at the very top of the card */}
        <div
          className="absolute top-0 left-0 right-0 h-24 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 100% at 50% 0%, rgba(180,60,20,0.22) 0%, transparent 100%)",
          }}
        />

        {/* Content — extra top padding so heading clears the lights */}
        <div className="relative px-7 pt-20 pb-7">
          {/* Top label */}
          <p
            className="text-[11px] font-bold tracking-[0.25em] uppercase text-center mb-2"
            style={{ color: "var(--primary)" }}
          >
            GET YOUR FREE
          </p>

          {/* Heading */}
          <h2
            className="text-[1.75rem] font-bold text-center leading-snug"
            style={{
              color: "var(--heading)",
              textShadow: "0 2px 12px rgba(0,0,0,0.6)",
            }}
          >
            Christmas Lighting Quote
          </h2>

          <SnowflakeDivider />

          {/* Form fields */}
          <form
            className="flex flex-col gap-4 2xl:gap-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <FormField id="quote-name" icon={User} placeholder="Full Name" />
            <FormField
              id="quote-email"
              icon={Mail}
              placeholder="Email Address"
              type="email"
            />
            <FormField
              id="quote-address"
              icon={Home}
              placeholder="Home Address"
            />
            <FormField
              id="quote-date"
              icon={CalendarDays}
              placeholder="Preferred Installation Date"
              type="date"
              rightIcon={CalendarDays}
            />
            <FormField
              id="quote-message"
              icon={MessageSquare}
              placeholder="Message"
              isTextarea
            />

            {/* ── Submit Button ── */}
            <motion.button
              id="quote-submit"
              type="submit"
              whileHover={{
                scale: 1.02,
                boxShadow: "0 10px 36px rgba(217,53,53,0.6)",
              }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full mt-2 py-4 px-6 rounded-xl font-bold text-sm tracking-[0.16em] uppercase text-white flex items-center justify-center overflow-hidden"
              style={{
                background:
                  "linear-gradient(180deg, #e84040 0%, #d12a2a 40%, #b31f1f 100%)",
                boxShadow:
                  "0 6px 28px rgba(217,53,53,0.5), inset 0 1px 0 rgba(255,255,255,0.18), inset 0 -2px 0 rgba(0,0,0,0.22)",
              }}
            >
              {/* Top shine overlay */}
              <span
                className="absolute inset-x-0 top-0 h-1/2 rounded-t-xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.1) 0%, transparent 100%)",
                }}
              />
              <span className="relative flex-1 text-center">
                GET A FREE QUOTE
              </span>
              <span
                className="relative ml-4 w-9 h-9 rounded-full bg-white flex items-center justify-center shrink-0"
                style={{
                  boxShadow:
                    "0 2px 8px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.9)",
                }}
              >
                <ArrowRight
                  size={17}
                  style={{ color: "var(--primary)", strokeWidth: 2.5 }}
                />
              </span>
            </motion.button>
          </form>

          {/* Privacy note */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <Lock size={11} style={{ color: "var(--muted)" }} />
            <p className="text-[11px]" style={{ color: "var(--muted)" }}>
              We respect your privacy. Your information is safe with us.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
