"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Mail,
  MapPin,
  Building2,
  Building,
  Home,
  Sparkles,
  Warehouse,
  Landmark,
  Briefcase,
  Check,
  ChevronDown,
  MessageSquare,
  ArrowRight,
  Lock,
  Snowflake,
  Loader2,
  CheckCircle2,
  AlertCircle,
  X,
} from "lucide-react";

// ── Property Types Master Config ───────────────────────────────────────────────
const PROPERTY_TYPES = [
  { value: "Retail / Storefront", label: "Retail / Storefront", icon: Building2 },
  { value: "Office Building / Park", label: "Office Building / Park", icon: Building },
  { value: "HOA / Multi-Family", label: "HOA / Multi-Family", icon: Home },
  { value: "Restaurant / Hospitality", label: "Restaurant / Hospitality", icon: Sparkles },
  { value: "Industrial / Warehouse", label: "Industrial / Warehouse", icon: Warehouse },
  { value: "Municipality / City", label: "Municipality / City", icon: Landmark },
  { value: "Other Commercial", label: "Other Commercial", icon: Briefcase },
];

// ── Field wrapper ──────────────────────────────────────────────────────────────
function FormField({
  icon: Icon,
  placeholder,
  type = "text",
  isTextarea = false,
  rightIcon: RightIcon,
  id,
  name,
  value,
  onChange,
  disabled = false,
}: {
  icon: React.ElementType;
  placeholder: string;
  type?: string;
  isTextarea?: boolean;
  rightIcon?: React.ElementType;
  id: string;
  name?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
}) {
  const baseClass =
    "w-full bg-transparent text-[var(--text-body)] placeholder-[var(--text-muted)] text-sm outline-none resize-none leading-normal disabled:opacity-60 disabled:cursor-not-allowed";

  return (
    <div
      className={`flex ${
        isTextarea ? "items-start" : "items-center"
      } gap-3 px-4 py-3.5 rounded-xl border-[1.5px] group transition-all ${
        disabled ? "opacity-70 cursor-not-allowed" : ""
      }`}
      style={{
        background: `linear-gradient(180deg, var(--input-bg-top) 0%, var(--input-bg-bottom) 100%)`,
        borderColor: "var(--border-input)",
        boxShadow:
          "inset 0 1px 0 var(--highlight-surface), inset 0 -1px 0 rgba(0,0,0,0.3)",
      }}
      onFocus={(e) => {
        if (disabled) return;
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--border-input-focus)";
        el.style.boxShadow =
          "0 0 0 2px var(--accent-glow-soft), inset 0 1px 0 var(--highlight-surface), inset 0 -1px 0 rgba(0,0,0,0.3)";
      }}
      onBlur={(e) => {
        if (disabled) return;
        const el = e.currentTarget as HTMLDivElement;
        el.style.borderColor = "var(--border-input)";
        el.style.boxShadow =
          "inset 0 1px 0 var(--highlight-surface), inset 0 -1px 0 rgba(0,0,0,0.3)";
      }}
    >
      <Icon
        size={16}
        className={`shrink-0 ${isTextarea ? "mt-0.5" : ""}`}
        style={{ color: "var(--text-muted)" }}
      />
      {isTextarea ? (
        <textarea
          id={id}
          name={name || id}
          placeholder={placeholder}
          rows={3}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`${baseClass} flex-1`}
        />
      ) : (
        <input
          id={id}
          name={name || id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={disabled}
          className={`${baseClass} flex-1`}
        />
      )}
      {RightIcon && (
        <RightIcon
          size={16}
          className={`shrink-0 ${isTextarea ? "mt-0.5" : ""}`}
          style={{ color: "var(--text-muted)" }}
        />
      )}
    </div>
  );
}

// ── Luxury Property Type Dropdown Component ──────────────────────────────────
function PropertyTypeField({
  id,
  value,
  onChange,
  disabled = false,
}: {
  id: string;
  value: string;
  onChange: (val: string) => void;
  disabled?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const [popoverPos, setPopoverPos] = useState<{
    top: number;
    left: number;
    width: number;
    isAbove: boolean;
  }>({ top: 0, left: 0, width: 0, isAbove: false });

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const estimatedPopoverHeight = 320;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    const placeAbove =
      spaceBelow < estimatedPopoverHeight && spaceAbove > spaceBelow;

    const padding = 16;
    const targetWidth = Math.min(rect.width, viewportWidth - padding * 2);
    let left = rect.left;

    if (left + targetWidth > viewportWidth - padding) {
      left = viewportWidth - targetWidth - padding;
    }
    if (left < padding) {
      left = padding;
    }

    let top = 0;
    if (placeAbove) {
      top = Math.max(padding, rect.top - estimatedPopoverHeight - 6);
    } else {
      top = rect.bottom + 6;
    }

    setPopoverPos({
      top,
      left,
      width: targetWidth,
      isAbove: placeAbove,
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      updatePosition();
      const handleScrollResize = () => updatePosition();
      window.addEventListener("scroll", handleScrollResize, true);
      window.addEventListener("resize", handleScrollResize);
      return () => {
        window.removeEventListener("scroll", handleScrollResize, true);
        window.removeEventListener("resize", handleScrollResize);
      };
    }
  }, [isOpen, updatePosition]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (
        containerRef.current &&
        !containerRef.current.contains(target) &&
        popoverRef.current &&
        !popoverRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const selectedItem = PROPERTY_TYPES.find((t) => t.value === value);
  const SelectedIcon = selectedItem ? selectedItem.icon : Building2;

  return (
    <div className="relative w-full" ref={containerRef}>
      <input type="hidden" id={id} name="propertyType" value={value} />

      <button
        type="button"
        id={`${id}-trigger`}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select Property Type"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border-[1.5px] transition-all text-left focus:outline-none group ${
          disabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer select-none"
        }`}
        style={{
          background: `linear-gradient(180deg, var(--input-bg-top) 0%, var(--input-bg-bottom) 100%)`,
          borderColor: isOpen
            ? "var(--border-input-focus)"
            : "var(--border-input)",
          boxShadow: isOpen
            ? "0 0 0 2px var(--accent-glow-soft), 0 0 16px rgba(245, 200, 106, 0.15), inset 0 1px 0 var(--highlight-surface)"
            : "inset 0 1px 0 var(--highlight-surface), inset 0 -1px 0 rgba(0,0,0,0.3)",
        }}
      >
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <SelectedIcon
            size={16}
            className="shrink-0 transition-colors"
            style={{
              color: value || isOpen ? "var(--gold)" : "var(--text-muted)",
            }}
          />
          <span
            className={`text-sm truncate transition-colors ${
              value
                ? "text-[var(--text-heading)] font-semibold"
                : "text-[var(--text-muted)] group-hover:text-[var(--text-body)]"
            }`}
          >
            {value ? value : "Property Type"}
          </span>
        </div>

        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[var(--gold)]" : "text-[var(--text-muted)]"
          }`}
        />
      </button>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={popoverRef}
                initial={{
                  opacity: 0,
                  y: popoverPos.isAbove ? -10 : 10,
                  scale: 0.97,
                }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: popoverPos.isAbove ? -8 : 8,
                  scale: 0.97,
                }}
                transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="p-2 rounded-2xl border-[1.5px] shadow-[0_24px_60px_rgba(0,0,0,0.92),0_0_30px_rgba(217,53,53,0.22)] backdrop-blur-2xl bg-[var(--bg-glass-card)] overflow-hidden"
                style={{
                  position: "fixed",
                  top: popoverPos.top,
                  left: popoverPos.left,
                  width: popoverPos.width,
                  zIndex: 9999,
                  borderColor: "var(--border-strong)",
                }}
                role="listbox"
                aria-label="Property type options"
              >
                {/* Ambient gold shimmer line at top of popover */}
                <div
                  className="absolute top-0 inset-x-8 h-px pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--gold), transparent)",
                  }}
                />

                <div className="flex flex-col gap-1 py-1">
                  {PROPERTY_TYPES.map((item) => {
                    const isSelected = value === item.value;
                    const ItemIcon = item.icon;

                    return (
                      <button
                        key={item.value}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={(e) => {
                          e.stopPropagation();
                          onChange(item.value);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm transition-all cursor-pointer select-none text-left ${
                          isSelected
                            ? "bg-gradient-to-r from-[var(--accent-glow-soft)] to-transparent text-[var(--gold)] font-semibold border border-[var(--gold)]/30"
                            : "text-[var(--text-body)] hover:text-white hover:bg-white/5 hover:border hover:border-white/10"
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <ItemIcon
                            size={16}
                            className={`shrink-0 ${
                              isSelected ? "text-[var(--gold)]" : "text-[var(--text-muted)]"
                            }`}
                          />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {isSelected && (
                          <Check
                            size={16}
                            className="shrink-0 text-[var(--gold)] ml-2"
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
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
  const cardRef = useRef<HTMLDivElement>(null);
  const animTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [zip, setZip] = useState("");
  const [message, setMessage] = useState("");

  // UX states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const triggerAttention = () => {
      const card = cardRef.current;
      if (!card) return;

      if (animTimerRef.current) {
        clearTimeout(animTimerRef.current);
        animTimerRef.current = null;
      }

      card.classList.remove("quote-form-attention");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.classList.add("quote-form-attention");

          setTimeout(() => {
            const firstField = document.getElementById("quote-name") as HTMLInputElement | null;
            if (firstField) firstField.focus({ preventScroll: true });
          }, 120);

          animTimerRef.current = setTimeout(() => {
            card.classList.remove("quote-form-attention");
            animTimerRef.current = null;
          }, 700);
        });
      });
    };

    window.addEventListener("quote-form-trigger-attention", triggerAttention, {
      signal: controller.signal,
    });

    return () => {
      controller.abort();
      if (animTimerRef.current) clearTimeout(animTimerRef.current);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Prevent duplicate submissions
    if (isSubmitting) return;

    setStatus("idle");
    setToastMessage("");

    // Lightweight frontend validation
    const trimmedName = name.trim();
    if (!trimmedName || trimmedName.length < 2) {
      setStatus("error");
      setToastMessage("Please enter your full name.");
      return;
    }

    const trimmedEmail = email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmedEmail || !emailRegex.test(trimmedEmail)) {
      setStatus("error");
      setToastMessage("Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        "https://denverchristmaslightslandingpagecom.vercel.app/api/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: trimmedName,
            email: trimmedEmail,
            propertyType,
            zip: zip.trim(),
            message: message.trim(),
          }),
        }
      );

      const data = await response.json();

      if (response.ok && (data.success || data.ok)) {
        setStatus("success");
        setToastMessage(
          data.message || "Thank you! Your proposal request has been received. We will be in touch soon."
        );
        // Reset form after successful submission
        setName("");
        setEmail("");
        setPropertyType("");
        setZip("");
        setMessage("");
      } else {
        setStatus("error");
        setToastMessage(
          data.error || "Failed to submit request. Please try again or call us directly."
        );
      }
    } catch (err) {
      console.error("[QuoteForm] Submission error:", err);
      setStatus("error");
      setToastMessage(
        "A network error occurred while submitting your request. Please check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, y: 10 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
      className="relative w-full max-w-[560px] mx-auto"
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
        ref={cardRef}
        className="relative z-10 rounded-2xl overflow-hidden"
        style={{
          background: `radial-gradient(ellipse 90% 45% at 50% 0%, var(--gradient-form-top) 0%, var(--gradient-form-mid) 38%, var(--gradient-form-bottom) 100%)`,
          border: `2px solid var(--form-border-color)`,
          boxShadow: `0 0 0 1px var(--border-color), var(--shadow-card-hover), inset 0 1px 0 var(--highlight-btn)`,
        }}
      >
        {/* Top warm shimmer */}
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
        <div className="relative px-7 sm:px-8 pt-26 pb-8">
          {/* Heading */}
          <h2
            className="text-[1.7rem] sm:text-[1.85rem] font-bold text-center leading-snug"
            style={{
              color: "var(--text-heading)",
              textShadow: "0 2px 16px rgba(0,0,0,0.6)",
            }}
          >
            Request Your Commercial Lighting Proposal
          </h2>

          <SnowflakeDivider />

          {/* Toast / Message Notification */}
          <AnimatePresence>
            {status !== "idle" && toastMessage && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.96 }}
                transition={{ duration: 0.25 }}
                className={`mb-5 p-4 rounded-xl border flex items-start gap-3 relative ${
                  status === "success"
                    ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-100 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                    : "bg-red-950/80 border-red-500/50 text-red-100 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle2 size={20} className="shrink-0 text-emerald-400 mt-0.5" />
                ) : (
                  <AlertCircle size={20} className="shrink-0 text-red-400 mt-0.5" />
                )}
                <div className="flex-1 text-sm font-medium leading-relaxed">
                  {toastMessage}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setStatus("idle");
                    setToastMessage("");
                  }}
                  className="shrink-0 text-white/60 hover:text-white transition-colors p-1"
                  aria-label="Close notification"
                >
                  <X size={16} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form fields */}
          <form
            className="flex flex-col gap-4 sm:gap-4.5"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-4 sm:gap-4.5">
              {/* 1. Full Name */}
              <FormField
                id="quote-name"
                name="name"
                icon={User}
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={isSubmitting}
              />

              {/* 2. Work Email */}
              <FormField
                id="quote-email"
                name="email"
                icon={Mail}
                placeholder="Work Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitting}
              />

              {/* 3. Property Type */}
              <PropertyTypeField
                id="quote-type"
                value={propertyType}
                onChange={setPropertyType}
                disabled={isSubmitting}
              />

              {/* 4. ZIP Code */}
              <FormField
                id="quote-zip"
                name="zip"
                icon={MapPin}
                placeholder="ZIP Code"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                disabled={isSubmitting}
              />

              {/* 5. Message */}
              <FormField
                id="quote-message"
                name="message"
                icon={MessageSquare}
                placeholder="Message"
                isTextarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                disabled={isSubmitting}
              />
            </div>

            {/* ── Submit Button ── */}
            <motion.button
              id="quote-submit"
              type="submit"
              disabled={isSubmitting}
              whileHover={
                isSubmitting
                  ? {}
                  : {
                      scale: 1.025,
                      boxShadow: `0 8px 32px rgba(245, 200, 106, 0.55), 0 0 24px rgba(255, 220, 140, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -2px 4px rgba(120, 65, 8, 0.6)`,
                    }
              }
              whileTap={isSubmitting ? {} : { scale: 0.98 }}
              className={`relative w-full max-w-[380px] mx-auto mt-2 py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base tracking-[0.16em] uppercase flex items-center justify-center overflow-hidden transition-all duration-300 ${
                isSubmitting
                  ? "opacity-75 cursor-not-allowed"
                  : "cursor-pointer group"
              }`}
              style={{
                color: "#140904",
                background: `linear-gradient(180deg, #ffe299 0%, #f0b840 46%, #c8841a 100%)`,
                boxShadow: `0 6px 26px rgba(245, 200, 106, 0.38), 0 2px 10px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.65), inset 0 -2px 0 rgba(140, 80, 10, 0.5)`,
                border: "1px solid rgba(255, 235, 175, 0.7)",
                textShadow: "0 1px 0 rgba(255, 245, 205, 0.6)",
              }}
            >
              {/* 3D glossy top shine */}
              <span
                className="absolute inset-x-0 top-0 h-1/2 rounded-t-xl pointer-events-none"
                style={{
                  background: `linear-gradient(180deg, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.05) 100%)`,
                }}
              />
              <span className="relative flex-1 text-center font-extrabold flex items-center justify-center gap-2">
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin text-[#140904]" />
                    <span>SENDING...</span>
                  </>
                ) : (
                  "GET A FREE QUOTE"
                )}
              </span>
              {!isSubmitting && (
                <span
                  className="relative ml-3 w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
                  style={{
                    boxShadow:
                      "0 2px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.4)",
                    background: "rgba(20, 9, 4, 0.14)",
                    border: "1px solid rgba(20, 9, 4, 0.2)",
                  }}
                >
                  <ArrowRight
                    size={16}
                    style={{ color: "#140904", strokeWidth: 2.75 }}
                  />
                </span>
              )}
            </motion.button>
          </form>

          {/* Privacy note */}
          <div className="flex items-center justify-center gap-1.5 mt-4">
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
