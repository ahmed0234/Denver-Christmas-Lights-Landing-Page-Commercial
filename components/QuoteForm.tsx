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
    "w-full bg-transparent text-[var(--text-body)] placeholder-[var(--text-muted)] text-sm outline-none resize-none leading-none";

  return (
    <div
      className="flex items-center gap-3 px-4 py-3.5 rounded-xl border-[1.5px] group"
      style={{
        background: `linear-gradient(180deg, var(--input-bg-top) 0%, var(--input-bg-bottom) 100%)`,
        borderColor: "var(--border-input)",
        boxShadow:
          "inset 0 1px 0 var(--highlight-surface), inset 0 -1px 0 rgba(0,0,0,0.3)",
      }}
      onFocus={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--border-input-focus)";
        el.style.boxShadow =
          "0 0 0 2px var(--accent-glow-soft), inset 0 1px 0 var(--highlight-surface), inset 0 -1px 0 rgba(0,0,0,0.3)";
      }}
      onBlur={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--border-input)";
        el.style.boxShadow =
          "inset 0 1px 0 var(--highlight-surface), inset 0 -1px 0 rgba(0,0,0,0.3)";
      }}
    >
      <Icon
        size={16}
        className="shrink-0"
        style={{ color: "var(--text-muted)" }}
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
          style={{ color: "var(--text-muted)" }}
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
            "linear-gradient(to right, transparent, var(--accent), transparent)",
        }}
      />
      <Snowflake size={13} style={{ color: "var(--accent)" }} />
      <div
        className="flex-1 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--accent), transparent)",
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
      {/* Christmas Lights decoration */}
      <div
        className="absolute z-20 pointer-events-none"
        style={{ top: "-76px", left: "-18px", right: "-18px" }}
      >
        <motion.div
          animate={{ opacity: [0.88, 1, 0.88] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/FormUpperLights.png"
            alt="Christmas string lights decoration"
            width={1320}
            height={540}
            className="w-full h-auto"
            style={{ mixBlendMode: "screen" }}
            priority
          />
        </motion.div>
      </div>

      {/* ── Card ─────────────────────────────────────────────────────────────── */}
      <div
        className="relative z-10 rounded-2xl overflow-hidden"
        style={{
          /* Deep vertical gradient — lighter top, darker bottom */
          background: `radial-gradient(ellipse 90% 45% at 50% 0%, var(--gradient-form-top) 0%, var(--gradient-form-mid) 38%, var(--gradient-form-bottom) 100%)`,
          border: `2px solid var(--form-border-color)`,
          boxShadow: `0 0 0 1px var(--border-color), var(--shadow-card-hover), inset 0 1px 0 var(--highlight-btn)`,
        }}
      >
        {/* Top warm shimmer — creates the "lighter top" depth effect */}
        <div
          className="absolute top-0 left-0 right-0 h-28 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse 80% 100% at 50% 0%, var(--form-highlight) 0%, transparent 100%)`,
          }}
        />

        {/* Inner top highlight line */}
        <div
          className="absolute top-0 inset-x-12 h-px pointer-events-none z-10"
          style={{
            background: `linear-gradient(90deg, transparent, var(--highlight-btn), transparent)`,
          }}
        />

        {/* Content */}
        <div className="relative px-7 pt-24 pb-7">
          {/* Top label */}
          <p
            className="text-[11px] font-bold tracking-[0.25em] uppercase text-center mb-2"
            style={{ color: "var(--accent)" }}
          >
            GET YOUR FREE
          </p>

          {/* Heading */}
          <h2
            className="text-[1.75rem] font-bold text-center leading-snug"
            style={{
              color: "var(--text-heading)",
              textShadow: "0 2px 16px rgba(0,0,0,0.6)",
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
                boxShadow: `var(--shadow-btn-hover), inset 0 1px 0 var(--highlight-btn), inset 0 -2px 4px var(--btn-inner-shadow)`,
              }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full mt-2 py-4 px-6 rounded-xl font-bold text-sm tracking-[0.16em] uppercase text-white flex items-center justify-center overflow-hidden"
              style={{
                background: `linear-gradient(180deg, var(--gradient-btn-top) 0%, var(--gradient-btn-mid) 45%, var(--gradient-btn-bottom) 100%)`,
                boxShadow: `var(--shadow-btn), inset 0 1px 0 var(--highlight-btn), inset 0 -2px 0 var(--btn-inner-shadow)`,
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              {/* 3D top shine */}
              <span
                className="absolute inset-x-0 top-0 h-1/2 rounded-t-xl pointer-events-none"
                style={{
                  background: `linear-gradient(180deg, var(--btn-inner-highlight) 0%, transparent 100%)`,
                }}
              />
              <span className="relative flex-1 text-center">GET A FREE QUOTE</span>
              <span
                className="relative ml-4 w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center shrink-0"
                style={{
                  boxShadow: "0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.5)",
                  background: "rgba(255,255,255,0.18)",
                }}
              >
                <ArrowRight size={17} style={{ color: "#fff", strokeWidth: 2.5 }} />
              </span>
            </motion.button>
          </form>

          {/* Privacy note */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <Lock size={11} style={{ color: "var(--text-muted)" }} />
            <p className="text-[11px]" style={{ color: "var(--text-muted)" }}>
              We respect your privacy. Your information is safe with us.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
