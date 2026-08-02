"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Building2,
  Building,
  Home,
  Sparkles,
  Warehouse,
  Landmark,
  Briefcase,
  Check,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MessageSquare,
  ArrowRight,
  Lock,
  Snowflake,
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
}: {
  icon: React.ElementType;
  placeholder: string;
  type?: string;
  isTextarea?: boolean;
  rightIcon?: React.ElementType;
  id: string;
}) {
  const baseClass =
    "w-full bg-transparent text-[var(--text-body)] placeholder-[var(--text-muted)] text-sm outline-none resize-none leading-normal";

  return (
    <div
      className={`flex ${
        isTextarea ? "items-start" : "items-center"
      } gap-3 px-4 py-3.5 rounded-xl border-[1.5px] group transition-all`}
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
        className={`shrink-0 ${isTextarea ? "mt-0.5" : ""}`}
        style={{ color: "var(--text-muted)" }}
      />
      {isTextarea ? (
        <textarea
          id={id}
          placeholder={placeholder}
          rows={3}
          className={`${baseClass} flex-1`}
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
          className={`shrink-0 ${isTextarea ? "mt-0.5" : ""}`}
          style={{ color: "var(--text-muted)" }}
        />
      )}
    </div>
  );
}

// ── Luxury Property Type Dropdown Component ──────────────────────────────────
function PropertyTypeField({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<string>("");
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

  const selectedItem = PROPERTY_TYPES.find((t) => t.value === selectedType);
  const SelectedIcon = selectedItem ? selectedItem.icon : Building2;

  return (
    <div className="relative w-full" ref={containerRef}>
      <input type="hidden" id={id} name="propertyType" value={selectedType} />

      <button
        type="button"
        id={`${id}-trigger`}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label="Select Property Type"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border-[1.5px] transition-all cursor-pointer select-none text-left focus:outline-none group"
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
              color: selectedType || isOpen ? "var(--gold)" : "var(--text-muted)",
            }}
          />
          <span
            className={`text-sm truncate transition-colors ${
              selectedType
                ? "text-[var(--text-heading)] font-semibold"
                : "text-[var(--text-muted)] group-hover:text-[var(--text-body)]"
            }`}
          >
            {selectedType ? selectedType : "Property Type"}
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
                    const isSelected = selectedType === item.value;
                    const ItemIcon = item.icon;

                    return (
                      <button
                        key={item.value}
                        type="button"
                        role="option"
                        aria-selected={isSelected}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedType(item.value);
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

// ── Custom Date Picker ─────────────────────────────────────────────────────────
function DatePickerField({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Today at midnight for clean comparison
  const getToday = useCallback(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const today = getToday();

  // Month currently displayed in calendar popover
  const [viewDate, setViewDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  // Currently focused date for keyboard navigation
  const [focusedDate, setFocusedDate] = useState<Date>(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Position state for portal popover
  const [popoverPos, setPopoverPos] = useState<{
    top: number;
    left: number;
    width: number;
    isAbove: boolean;
  }>({ top: 0, left: 0, width: 0, isAbove: false });

  // Update floating popover position dynamically relative to viewport
  const updatePosition = useCallback(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    const estimatedPopoverHeight = 370;
    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    // Decide whether to display popover above or below the input field
    const placeAbove =
      spaceBelow < estimatedPopoverHeight && spaceAbove > spaceBelow;

    const padding = 16;
    // Provide comfortable minimum 350px width for the calendar popover
    const minCalendarWidth = 350;
    const targetWidth = Math.min(
      Math.max(minCalendarWidth, rect.width),
      viewportWidth - padding * 2
    );
    let left = rect.left;

    if (left + targetWidth > viewportWidth - padding) {
      left = viewportWidth - targetWidth - padding;
    }
    if (left < padding) {
      left = padding;
    }

    let top = 0;
    if (placeAbove) {
      top = Math.max(padding, rect.top - estimatedPopoverHeight - 8);
    } else {
      top = rect.bottom + 8;
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

  // Close calendar on outside click
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

  // Handle keyboard navigation when popover is open
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      return;
    }

    let nextDate = new Date(focusedDate);

    if (e.key === "ArrowLeft") {
      e.preventDefault();
      nextDate.setDate(nextDate.getDate() - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      nextDate.setDate(nextDate.getDate() + 1);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      nextDate.setDate(nextDate.getDate() - 7);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      nextDate.setDate(nextDate.getDate() + 7);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (focusedDate >= today) {
        setSelectedDate(focusedDate);
        setIsOpen(false);
      }
      return;
    } else {
      return;
    }

    // Ensure we don't focus past dates
    if (nextDate < today) {
      nextDate = new Date(today);
    }

    setFocusedDate(nextDate);

    // Keep viewDate aligned with focused date's month
    if (
      nextDate.getMonth() !== viewDate.getMonth() ||
      nextDate.getFullYear() !== viewDate.getFullYear()
    ) {
      setViewDate(new Date(nextDate.getFullYear(), nextDate.getMonth(), 1));
    }
  };

  // Month navigation
  const handlePrevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    const prev = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    const minMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    if (prev >= minMonth) {
      setViewDate(prev);
    }
  };

  const handleNextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  // Check if prev month navigation should be disabled
  const isPrevDisabled =
    viewDate.getFullYear() === today.getFullYear() &&
    viewDate.getMonth() === today.getMonth();

  // Generate calendar days grid
  const getDaysGrid = useCallback(() => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();

    const firstDayIndex = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const prevMonthDays = new Date(year, month, 0).getDate();

    const grid: { date: Date; isCurrentMonth: boolean }[] = [];

    // Previous month padding
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      grid.push({
        date: new Date(year, month - 1, prevMonthDays - i),
        isCurrentMonth: false,
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      grid.push({
        date: new Date(year, month, d),
        isCurrentMonth: true,
      });
    }

    // Next month padding to fill grid
    const remaining = (7 - (grid.length % 7)) % 7;
    for (let i = 1; i <= remaining; i++) {
      grid.push({
        date: new Date(year, month + 1, i),
        isCurrentMonth: false,
      });
    }

    return grid;
  }, [viewDate]);

  const days = getDaysGrid();

  const formattedSelectedDate = selectedDate
    ? selectedDate.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";

  const isoValue = selectedDate
    ? `${selectedDate.getFullYear()}-${String(
        selectedDate.getMonth() + 1
      ).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
    : "";

  const isSameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const monthYearString = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative w-full" ref={containerRef}>
      <input type="hidden" id={id} name="preferredDate" value={isoValue} />

      {/* ── Trigger Container (Entire Input Area Clickable) ── */}
      <button
        type="button"
        id={`${id}-trigger`}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-label="What is your preferred installation date?"
        onClick={() => {
          setIsOpen(!isOpen);
          if (!isOpen && selectedDate) {
            setFocusedDate(selectedDate);
            setViewDate(
              new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1)
            );
          }
        }}
        onKeyDown={handleKeyDown}
        className="w-full flex items-center justify-between gap-3 px-4 py-3.5 rounded-xl border-[1.5px] transition-all cursor-pointer select-none text-left focus:outline-none group"
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
          <CalendarDays
            size={16}
            className="shrink-0 transition-colors"
            style={{
              color: selectedDate || isOpen ? "var(--gold)" : "var(--text-muted)",
            }}
          />
          <span
            className={`text-sm truncate transition-colors ${
              selectedDate
                ? "text-[var(--text-heading)] font-semibold"
                : "text-[var(--text-muted)] group-hover:text-[var(--text-body)]"
            }`}
          >
            {selectedDate
              ? formattedSelectedDate
              : "Preferred Installation Date"}
          </span>
        </div>

        <ChevronDown
          size={16}
          className={`shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[var(--gold)]" : "text-[var(--text-muted)]"
          }`}
        />
      </button>

      {/* ── Custom Popover Calendar Rendered via Portal to avoid overflow-hidden clipping ── */}
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
                className="p-4.5 sm:p-5 rounded-2xl border-[1.5px] shadow-[0_24px_60px_rgba(0,0,0,0.92),0_0_30px_rgba(217,53,53,0.22)] backdrop-blur-2xl bg-[var(--bg-glass-card)] overflow-hidden"
                style={{
                  position: "fixed",
                  top: popoverPos.top,
                  left: popoverPos.left,
                  width: popoverPos.width,
                  zIndex: 9999,
                  borderColor: "var(--border-strong)",
                }}
                role="dialog"
                aria-label="Calendar date picker"
              >
                {/* Ambient gold shimmer line at top of popover */}
                <div
                  className="absolute top-0 inset-x-8 h-px pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, var(--gold), transparent)",
                  }}
                />

                {/* Header: Month / Year Navigation */}
                <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[var(--gold)] animate-pulse" />
                    <h3 className="text-sm sm:text-base font-bold text-[var(--text-heading)] tracking-wide">
                      {monthYearString}
                    </h3>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrevMonth}
                      disabled={isPrevDisabled}
                      aria-label="Previous Month"
                      className="p-1.5 sm:p-2 rounded-lg border border-white/10 text-[var(--text-body)] hover:text-white hover:bg-white/10 hover:border-[var(--gold)]/40 disabled:opacity-25 disabled:pointer-events-none transition-all active:scale-95 cursor-pointer"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button
                      type="button"
                      onClick={handleNextMonth}
                      aria-label="Next Month"
                      className="p-1.5 sm:p-2 rounded-lg border border-white/10 text-[var(--text-body)] hover:text-white hover:bg-white/10 hover:border-[var(--gold)]/40 transition-all active:scale-95 cursor-pointer"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Days of Week Header */}
                <div className="grid grid-cols-7 gap-1.5 mb-2.5 text-center">
                  {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                    <span
                      key={day}
                      className="text-xs font-bold text-[var(--gold)] uppercase tracking-wider py-1"
                    >
                      {day}
                    </span>
                  ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1.5 text-center" role="grid">
                  {days.map(({ date, isCurrentMonth }, idx) => {
                    const isPast = date < today;
                    const isSelected = isSameDay(date, selectedDate);
                    const isToday = isSameDay(date, today);
                    const isFocused = isSameDay(date, focusedDate);

                    let cellClasses =
                      "h-9.5 sm:h-10 w-full rounded-xl text-xs sm:text-sm font-medium flex items-center justify-center transition-all select-none relative focus:outline-none";

                    if (isPast || !isCurrentMonth) {
                      cellClasses +=
                        " opacity-25 cursor-not-allowed text-[var(--text-muted-dark)]";
                    } else if (isSelected) {
                      cellClasses +=
                        " bg-gradient-to-r from-[var(--accent)] to-[var(--gold-dark)] text-white font-bold shadow-[0_2px_12px_rgba(217,53,53,0.6)] scale-105 z-10 cursor-pointer";
                    } else {
                      cellClasses +=
                        " text-[var(--text-body)] hover:text-[var(--text-heading)] hover:bg-[var(--gold-glow-faint)] hover:border hover:border-[var(--gold)]/40 cursor-pointer active:scale-95";
                    }

                    if (isToday && !isSelected) {
                      cellClasses +=
                        " border border-[var(--gold)]/60 text-[var(--gold-light)] font-bold shadow-[0_0_8px_rgba(245,200,106,0.25)]";
                    }

                    if (isFocused && !isSelected && !isPast && isCurrentMonth) {
                      cellClasses += " ring-1 ring-[var(--gold)] bg-white/5";
                    }

                    return (
                      <button
                        key={idx}
                        type="button"
                        disabled={isPast || !isCurrentMonth}
                        onClick={(e) => {
                          e.stopPropagation();
                          if (!isPast && isCurrentMonth) {
                            setSelectedDate(date);
                            setFocusedDate(date);
                            setIsOpen(false);
                          }
                        }}
                        onMouseEnter={() => {
                          if (!isPast && isCurrentMonth) {
                            setFocusedDate(date);
                          }
                        }}
                        className={cellClasses}
                        aria-selected={isSelected}
                        aria-disabled={isPast || !isCurrentMonth}
                      >
                        {date.getDate()}
                        {isToday && !isSelected && (
                          <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[var(--gold)]" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Footer / Quick Actions */}
                <div className="flex items-center justify-between pt-3.5 mt-3.5 border-t border-white/10 text-xs sm:text-sm">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDate(today);
                      setFocusedDate(today);
                      setViewDate(
                        new Date(today.getFullYear(), today.getMonth(), 1)
                      );
                      setIsOpen(false);
                    }}
                    className="font-semibold text-[var(--gold)] hover:text-[var(--gold-light)] hover:underline transition-all cursor-pointer flex items-center gap-1"
                  >
                    Select Today
                  </button>

                  {selectedDate && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedDate(null);
                      }}
                      className="text-[var(--text-muted)] hover:text-white transition-colors cursor-pointer"
                    >
                      Clear Selection
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
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

          {/* Form fields */}
          <form
            className="flex flex-col gap-4 sm:gap-4.5"
            onSubmit={(e) => e.preventDefault()}
          >
            {/* 2-column grid layout for fields 1-6, full-width for Message */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4.5">
              {/* 1. Full Name */}
              <FormField id="quote-name" icon={User} placeholder="Full Name" />

              {/* 2. Work Email */}
              <FormField
                id="quote-email"
                icon={Mail}
                placeholder="Work Email"
                type="email"
              />

              {/* 3. Phone Number */}
              <FormField
                id="quote-phone"
                icon={Phone}
                placeholder="Phone Number"
                type="tel"
              />

              {/* 4. Property Address */}
              <FormField
                id="quote-address"
                icon={MapPin}
                placeholder="Property Address"
              />

              {/* 5. Property Type */}
              <PropertyTypeField id="quote-type" />

              {/* 6. Preferred Installation Date */}
              <DatePickerField id="quote-date" />

              {/* 7. Message */}
              <div className="sm:col-span-2">
                <FormField
                  id="quote-message"
                  icon={MessageSquare}
                  placeholder="Message"
                  isTextarea
                />
              </div>
            </div>

            {/* ── Submit Button ── */}
            <motion.button
              id="quote-submit"
              type="submit"
              whileHover={{
                scale: 1.025,
                boxShadow: `0 8px 32px rgba(245, 200, 106, 0.55), 0 0 24px rgba(255, 220, 140, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.8), inset 0 -2px 4px rgba(120, 65, 8, 0.6)`,
              }}
              whileTap={{ scale: 0.98 }}
              className="relative w-full max-w-[380px] mx-auto mt-2 py-4 px-6 rounded-xl font-extrabold text-sm sm:text-base tracking-[0.16em] uppercase flex items-center justify-center overflow-hidden cursor-pointer group transition-all duration-300"
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
              <span className="relative flex-1 text-center font-extrabold">
                GET A FREE QUOTE
              </span>
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
