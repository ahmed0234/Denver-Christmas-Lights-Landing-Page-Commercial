"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Palette, X, Check } from "lucide-react";
import { useTheme, THEMES, type ThemeId } from "./ThemeContext";

// ─── Individual theme option row ──────────────────────────────────────────────
function ThemeOption({
  id,
  name,
  description,
  swatches,
  isActive,
  onSelect,
}: {
  id: ThemeId;
  name: string;
  description: string;
  swatches: string[];
  isActive: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      onClick={onSelect}
      className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left cursor-pointer"
      style={{
        background: isActive
          ? `linear-gradient(135deg, var(--accent-glow-soft) 0%, var(--accent-glow-faint) 100%)`
          : "transparent",
        border: `1.5px solid ${isActive ? "var(--accent)" : "transparent"}`,
        boxShadow: isActive ? "inset 0 1px 0 var(--highlight-surface)" : "none",
      }}
      aria-pressed={isActive}
    >
      {/* Swatch dots */}
      <div className="flex gap-1 flex-shrink-0">
        {swatches.map((c, i) => (
          <span
            key={i}
            className="w-3.5 h-3.5 rounded-full ring-1 ring-white/15"
            style={{
              background: c,
              boxShadow: i === 1 ? `0 0 6px ${c}88` : "none",
            }}
          />
        ))}
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <p
          className="text-[12px] font-semibold leading-tight truncate"
          style={{ color: "var(--text-heading)" }}
        >
          {name}
        </p>
        <p
          className="text-[10px] leading-tight mt-0.5 truncate"
          style={{ color: "var(--text-muted)" }}
        >
          {description}
        </p>
      </div>

      {/* Active checkmark */}
      <span
        className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center"
        style={{
          background: isActive
            ? `linear-gradient(180deg, var(--accent) 0%, var(--accent-deep) 100%)`
            : "transparent",
          border: `1.5px solid ${isActive ? "var(--accent)" : "var(--border-color)"}`,
          boxShadow: isActive ? "var(--glow-btn)" : "none",
        }}
      >
        {isActive && <Check size={11} color="#fff" strokeWidth={3} />}
      </span>
    </button>
  );
}

// ─── Main ThemeSwitcher ────────────────────────────────────────────────────────
export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const activeTheme = THEMES.find((t) => t.id === theme);

  return (
    <div
      ref={panelRef}
      className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-3"
    >
      {/* ── Expanded Panel ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="switcher-panel"
            initial={{ opacity: 0, scale: 0.88, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="w-[248px] rounded-2xl overflow-hidden"
            style={{
              background: `linear-gradient(170deg, var(--gradient-card-top) 0%, var(--gradient-card-bottom) 100%)`,
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--switcher-shadow), inset 0 1px 0 var(--highlight-card)",
            }}
          >
            {/* Panel header */}
            <div
              className="flex items-center justify-between px-4 pt-3.5 pb-2.5"
              style={{
                borderBottom: "1px solid var(--border-color)",
                background: "linear-gradient(180deg, var(--accent-glow-faint) 0%, transparent 100%)",
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center"
                  style={{
                    background: `linear-gradient(135deg, var(--accent) 0%, var(--accent-deep) 100%)`,
                    boxShadow: "var(--glow-btn)",
                  }}
                >
                  <Palette size={11} color="#fff" />
                </div>
                <span
                  className="text-[11px] font-bold tracking-[0.16em] uppercase"
                  style={{ color: "var(--text-muted)" }}
                >
                  Visual Theme
                </span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  background: "var(--accent-glow-faint)",
                  border: "1px solid var(--border-color)",
                  color: "var(--text-muted)",
                }}
                aria-label="Close theme switcher"
              >
                <X size={11} />
              </button>
            </div>

            {/* Options */}
            <div className="p-2 flex flex-col gap-0.5">
              {THEMES.map((t) => (
                <ThemeOption
                  key={t.id}
                  id={t.id}
                  name={t.name}
                  description={t.description}
                  swatches={t.swatches}
                  isActive={theme === t.id}
                  onSelect={() => {
                    setTheme(t.id);
                    setTimeout(() => setOpen(false), 320);
                  }}
                />
              ))}
            </div>

            {/* Footer */}
            <div
              className="px-4 py-2.5 text-center"
              style={{ borderTop: "1px solid var(--border-color)" }}
            >
              <span
                className="text-[9px] tracking-[0.14em] uppercase"
                style={{ color: "var(--text-muted)" }}
              >
                Saved automatically ·{" "}
                <span style={{ color: "var(--accent)" }}>
                  {activeTheme?.name}
                </span>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Trigger Button ── */}
      <motion.button
        id="theme-switcher-btn"
        onClick={() => setOpen((v) => !v)}
        aria-label="Switch theme"
        aria-expanded={open}
        whileHover={{ scale: 1.07 }}
        whileTap={{ scale: 0.93 }}
        className="relative flex items-center gap-2.5 h-11 rounded-full overflow-hidden"
        style={{
          paddingLeft: "14px",
          paddingRight: "18px",
          background: `linear-gradient(170deg, var(--gradient-card-top) 0%, var(--gradient-card-bottom) 100%)`,
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          border: "1px solid var(--border-color)",
          boxShadow: "var(--switcher-shadow), inset 0 1px 0 var(--highlight-card)",
        }}
      >
        {/* Top shine */}
        <span
          className="absolute inset-x-0 top-0 h-1/2 rounded-t-full pointer-events-none"
          style={{
            background: "linear-gradient(180deg, var(--highlight-surface) 0%, transparent 100%)",
          }}
        />

        {/* Active theme colour dots */}
        <span className="relative flex gap-[3px]">
          {activeTheme?.swatches.map((c, i) => (
            <span
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{
                background: c,
                boxShadow: i === 1 ? `0 0 5px ${c}aa` : "none",
                outline: "1px solid rgba(255,255,255,0.12)",
              }}
            />
          ))}
        </span>

        {/* Icon */}
        <Palette
          size={14}
          className="relative flex-shrink-0"
          style={{ color: "var(--accent)" }}
        />

        {/* Label */}
        <span
          className="relative text-[11px] font-semibold tracking-wide whitespace-nowrap"
          style={{ color: "var(--text-heading)" }}
        >
          Theme
        </span>
      </motion.button>
    </div>
  );
}
