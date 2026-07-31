"use client";

/**
 * ProcessSection.jsx
 * "Our Simple Process" — three-step horizontal timeline section.
 *
 * Stack: Next.js (App Router) + Tailwind CSS + GSAP (entrance/choreography)
 *        + Motion for React (button hover interaction) + Lucide React icons.
 *
 * TIMELINE LINE — v2
 * The step number now sits ABOVE each icon circle (instead of beside it).
 * That's what actually fixes the intersection issue: previously the number
 * shared the same row/vertical-center as the icon, so any horizontal line
 * drawn through that row inevitably crossed the middle step's number. With
 * the number stacked above, the connecting line can run cleanly through the
 * icon circles only.
 *
 * The line itself is no longer a fixed-percentage guess — its left/width/top
 * are measured live from the actual first/middle/last icon-circle centers
 * (see the `measure()` effect below) via ResizeObserver + a resize listener.
 * That keeps it pixel-accurate at every breakpoint without hardcoding offsets.
 *
 * COLOR TOKENS
 * References the project's existing CSS variables, with fallbacks matching
 * the reference design so it still renders correctly out of the box. Point
 * these at your real globals.css tokens — do not introduce new colors:
 *
 *   --color-bg           : primary near-black background (e.g. #070502)
 *   --color-bg-elevated  : slightly lighter dark surface for glass fills
 *   --color-gold-light   : lightest gold, gradient highlight (e.g. #f8e3ab)
 *   --color-gold         : core gold accent (e.g. #e8b873)
 *   --color-gold-dark    : deeper gold, gradient shadow (e.g. #a9762f)
 *   --color-text-primary : primary text, near-white (e.g. #f7f3ec)
 *   --color-text-muted   : secondary/muted text (e.g. #cbc3b6)
 *   --color-button-text  : dark text sitting on the gold button (e.g. #241804)
 */

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  Snowflake,
  Sparkle,
  ClipboardPen,
  Home,
  TreePine,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Clock,
  Star,
} from "lucide-react";

const CONTENT = {
  eyebrow: "Our Simple Process",
  heading: {
    line1: "Professional Christmas Light",
    line2Prefix: "Installation in ",
    line2Highlight: "Three Simple Steps",
  },
  subtitle: "From quote to glow we make it effortless.",
  steps: [
    {
      number: "01",
      icon: ClipboardPen,
      title: "Request Your Free Quote",
      description:
        "Tell us about your home, preferred lighting style and ideal installation timeline.",
    },
    {
      number: "02",
      icon: Home,
      title: "Approve Your Lighting Plan",
      description:
        "We'll recommend a design and provide a clear proposal for your residential Christmas light installation.",
    },
    {
      number: "03",
      icon: TreePine,
      title: "Enjoy Your Holiday Display",
      description:
        "Our team installs your lights so you can enjoy a professionally decorated home without doing the work yourself.",
    },
  ],
  cta: "Start My Free Quote",
  trust: [
    { icon: ShieldCheck, label: "Fully Insured" },
    { icon: Clock, label: "On-Time Installation" },
    { icon: Star, label: "Satisfaction Guaranteed" },
  ],
};

// Fixed, deterministic particle field so server/client markup always matches.
const DUST = Array.from({ length: 24 }, (_, i) => {
  const x = (i * 41 + 7) % 100;
  const y = (i * 29 + 11) % 100;
  const size = 2 + (i % 3);
  const duration = 16 + (i % 6) * 3;
  const delay = (i % 8) * 1.4;
  const alt = i % 2 === 0;
  return { id: i, x, y, size, duration, delay, alt };
});

const SPARKLES = Array.from({ length: 6 }, (_, i) => {
  const x = (i * 63 + 17) % 100;
  const y = (i * 31 + 9) % 100;
  const duration = 5 + (i % 3);
  const delay = i * 0.8;
  return { id: i, x, y, duration, delay };
});

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const timelineRowRef = useRef(null); // the 3-col grid; also the line's positioning context
  const lineTrackRef = useRef(null); // the gradient base line (GSAP scaleX entrance target)
  const mobileLineRef = useRef(null);
  const stepRefs = useRef([]);
  const iconRefs = useRef([]); // circle wrapper refs — used for float anim AND line measurement
  const glowRef = useRef(null);

  const [line, setLine] = useState({ left: 0, width: 0, top: 0, midLeft: 0 });

  // Measure the true centers of the first/middle/last icon circles so the
  // connecting line lands exactly on them — never on the numbers above.
  useEffect(() => {
    function measure() {
      const container = timelineRowRef.current;
      const first = iconRefs.current[0];
      const mid = iconRefs.current[1];
      const last = iconRefs.current[2];
      if (!container || !first || !mid || !last) return;

      const containerRect = container.getBoundingClientRect();
      const firstRect = first.getBoundingClientRect();
      const midRect = mid.getBoundingClientRect();
      const lastRect = last.getBoundingClientRect();

      const firstCenterX = firstRect.left + firstRect.width / 2 - containerRect.left;
      const midCenterX = midRect.left + midRect.width / 2 - containerRect.left;
      const lastCenterX = lastRect.left + lastRect.width / 2 - containerRect.left;
      const centerY = firstRect.top + firstRect.height / 2 - containerRect.top;

      setLine({
        left: firstCenterX,
        width: lastCenterX - firstCenterX,
        top: centerY,
        midLeft: midCenterX - firstCenterX,
      });
    }

    measure();
    const raf = requestAnimationFrame(measure); // catch late font/layout shifts

    let ro;
    if (typeof ResizeObserver !== "undefined" && timelineRowRef.current) {
      ro = new ResizeObserver(measure);
      ro.observe(timelineRowRef.current);
    }
    window.addEventListener("resize", measure);

    return () => {
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let ctx;

    import("gsap").then(({ gsap }) => {
      import("gsap/ScrollTrigger").then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          if (prefersReducedMotion) {
            gsap.set(
              [
                ".process-eyebrow",
                ".process-heading",
                ".process-divider",
                ".process-subtitle",
                ".process-step",
                ".process-cta",
                ".process-trust",
                ".timeline-assembly",
              ],
              { opacity: 1, y: 0, scaleX: 1, scaleY: 1 },
            );
            return;
          }

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 88%",
              once: true,
            },
          });

          tl.from(".process-eyebrow", {
            opacity: 0,
            y: 16,
            duration: 0.4,
            ease: "power2.out",
          })
            .from(
              ".process-heading",
              { opacity: 0, y: 20, duration: 0.45, ease: "power2.out" },
              "-=0.25",
            )
            .from(
              ".process-divider",
              { opacity: 0, scaleX: 0, duration: 0.35, ease: "power2.out" },
              "-=0.3",
            )
            .from(
              ".process-subtitle",
              { opacity: 0, y: 12, duration: 0.35, ease: "power2.out" },
              "-=0.25",
            )
            .from(
              stepRefs.current,
              {
                opacity: 0,
                y: 24,
                duration: 0.45,
                stagger: 0.1,
                ease: "power2.out",
              },
              "-=0.2",
            )
            .from(
              ".timeline-assembly",
              { opacity: 0, duration: 0.3, ease: "power1.out" },
              "-=0.45",
            )
            .fromTo(
              lineTrackRef.current,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 0.6,
                ease: "power2.inOut",
                transformOrigin: "left center",
              },
              "-=0.3",
            )
            .fromTo(
              mobileLineRef.current,
              { scaleY: 0 },
              {
                scaleY: 1,
                duration: 0.6,
                ease: "power2.inOut",
                transformOrigin: "top center",
              },
              "-=0.6",
            )
            .from(
              ".process-cta",
              { opacity: 0, y: 16, duration: 0.4, ease: "power2.out" },
              "-=0.35",
            )
            .from(
              ".process-trust",
              { opacity: 0, y: 10, duration: 0.35, ease: "power2.out" },
              "-=0.25",
            );

          // Gentle floating loop for each icon circle.
          iconRefs.current.forEach((el, i) => {
            if (!el) return;
            gsap.to(el, {
              y: -6,
              duration: 2.6 + i * 0.3,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
              delay: i * 0.4,
            });
          });

          // Soft glow pulse on the CTA every few seconds.
          if (glowRef.current) {
            gsap.to(glowRef.current, {
              opacity: 0.9,
              scale: 1.08,
              duration: 2.2,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut",
            });
          }
        }, sectionRef);
      });
    });

    return () => ctx && ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative w-full overflow-hidden bg-[var(--color-bg,#070502)] py-28 sm:py-32 md:py-12"
    >
      {/* Background Image Layer */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/Process/Background.webp"
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-cover object-center opacity-40 sm:opacity-90 md:opacity-50 brightness-95 saturate-110 contrast-105"
          quality={95}
        />
        {/* Soft Heading Legibility Mask (Center-Top only, keeping left/right trees bright) */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 75% 45% at 50% 22%, rgba(7,5,2,0.72) 0%, rgba(7,5,2,0.40) 60%, transparent 100%)",
          }}
        />
        {/* Top and Bottom Edge Smooth Fades */}
        <div
          className="absolute inset-x-0 top-0 h-16 pointer-events-none"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-bg,#070502) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
          style={{
            background:
              "linear-gradient(to top, var(--color-bg,#070502) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* Ambient Golden Radial Glows — Focused LOWER behind the timeline */}
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Subtle top sky glow */}
        <div className="absolute left-1/2 top-0 h-[18rem] w-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[var(--color-gold,#e8b873)]/[0.08] blur-[120px]" />
        {/* Main Golden Horizon Glow — position lower directly behind timeline step icons */}
        <div className="absolute left-1/2 top-[58%] h-[24rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-gold,#e8b873)]/[0.22] blur-[90px]" />
        {/* Lower side ambient fills */}
        <div className="absolute left-1/4 top-[65%] h-56 w-56 -translate-x-1/2 rounded-full bg-[var(--color-gold,#e8b873)]/[0.10] blur-[90px]" />
        <div className="absolute right-1/4 top-[65%] h-56 w-56 translate-x-1/2 rounded-full bg-[var(--color-gold,#e8b873)]/[0.10] blur-[90px]" />
      </div>

      {/* Floating golden dust */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {DUST.map((p) => (
          <span
            key={p.id}
            className="absolute rounded-full bg-[var(--color-gold-light,#f8e3ab)]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: 0.12,
              animation: `${
                p.alt ? "process-float-alt" : "process-float"
              } ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
        {/* Tiny sparkles */}
        {SPARKLES.map((s) => (
          <Sparkle
            key={s.id}
            className="absolute text-[var(--color-gold-light,#f8e3ab)]"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: 10,
              height: 10,
              opacity: 0.14,
              animation: `process-twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
            }}
            strokeWidth={1}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 text-center">
        {/* Eyebrow */}
        <div className="process-eyebrow flex flex-col items-center gap-3">
          <Snowflake
            className="h-4 w-4 text-[var(--color-gold,#e8b873)] drop-shadow-[0_0_6px_var(--color-gold,#e8b873)]"
            strokeWidth={1.5}
          />
          <div className="flex items-center gap-4">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-[var(--color-gold,#e8b873)]/60 sm:w-16" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold,#e8b873)] sm:text-sm">
              {CONTENT.eyebrow}
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-[var(--color-gold,#e8b873)]/60 sm:w-16" />
          </div>
        </div>

        {/* Heading */}
        <h2 className="process-heading mt-6 flex flex-col items-center gap-1 font-sans text-[2.1rem] font-bold tracking-tight text-[var(--color-text-primary,#f7f3ec)] sm:gap-2 sm:text-4xl md:text-5xl lg:text-[3.75rem]">
          <span className="leading-[1.2]">{CONTENT.heading.line1} </span>
          <span className="leading-[1.2]">
            {CONTENT.heading.line2Prefix}
            <span className="bg-gradient-to-b from-[var(--color-gold-light,#f8e3ab)] via-[var(--color-gold,#e8b873)] to-[var(--color-gold-dark,#a9762f)] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(232,184,115,0.35)]">
              {CONTENT.heading.line2Highlight}
            </span>
          </span>
        </h2>

        {/* Divider between heading and subtitle */}
        <div className="process-divider mt-6 flex items-center gap-3">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-[var(--color-gold,#e8b873)]/50 sm:w-20" />
          <Snowflake
            className="h-3 w-3 shrink-0 text-[var(--color-gold,#e8b873)]/70"
            strokeWidth={1.5}
          />
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-[var(--color-gold,#e8b873)]/50 sm:w-20" />
        </div>

        {/* Subtitle */}
        <p className="process-subtitle mt-5 max-w-xl text-sm text-[var(--color-text-muted,#cbc3b6)]/80 sm:text-base">
          {CONTENT.subtitle}
        </p>

        {/* Timeline */}
        <div className="relative mt-12 w-full sm:mt-24 md:mt-10">
          {/* Mobile connecting line (vertical) */}
          <div className="pointer-events-none absolute bottom-10 left-1/2 top-10 w-2 -translate-x-1/2 overflow-hidden md:hidden">
            <div className="absolute inset-0 rounded-full bg-[var(--color-gold,#e8b873)]/20 blur-[6px]" />
            <div
              ref={mobileLineRef}
              className="absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-[var(--color-gold,#e8b873)]/70 via-[var(--color-gold-light,#f8e3ab)]/80 to-[var(--color-gold,#e8b873)]/70"
            />
            {/* traveling shine, vertical */}
            <div className="timeline-shine-vertical absolute left-1/2 top-0 h-20 w-px -translate-x-1/2 rounded-full bg-gradient-to-b from-transparent via-[var(--color-gold-light,#ffffff)] to-transparent drop-shadow-[0_0_8px_rgba(248,227,171,1)]" />
          </div>

          <div
            ref={timelineRowRef}
            className="relative grid grid-cols-1 gap-16 sm:gap-20 md:grid-cols-3 md:gap-6"
          >
            {/* Desktop connecting line — positioned from measured icon centers,
                so it always lands on the circles and never on the numbers. */}
            {line.width > 0 && (
              <div
                className="timeline-assembly pointer-events-none absolute hidden md:block"
                style={{ left: line.left, top: line.top, width: line.width, height: 0 }}
              >
                <div className="relative h-0 w-full">
                  {/* outer ambient glow (stationary) */}
                  <div className="absolute inset-x-0 top-0 h-4 -translate-y-1/2 rounded-full bg-[var(--color-gold,#e8b873)]/35 blur-[14px]" />
                  {/* base gradient line — COMPLETELY STATIONARY and fixed */}
                  <div
                    ref={lineTrackRef}
                    className="absolute inset-x-0 top-0 h-[2px] origin-left -translate-y-1/2 rounded-full bg-gradient-to-r from-[var(--color-gold-dark,#a9762f)]/50 via-[var(--color-gold,#e8b873)] to-[var(--color-gold-dark,#a9762f)]/50 shadow-[0_0_12px_3px_rgba(232,184,115,0.5)]"
                  />
                  {/* Clipping container for the single traveling light beam/reflection */}
                  <div className="absolute inset-x-0 top-0 h-6 -translate-y-1/2 overflow-hidden">
                    {/* Single sleek golden light beam reflection gliding over the fixed metallic line */}
                    <div className="timeline-shine absolute top-1/2 h-[3px] w-28 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-white via-[var(--color-gold-light,#f8e3ab)] to-transparent drop-shadow-[0_0_10px_rgba(248,227,171,1)]" />
                  </div>

                  {/* soft glow pulses where the line meets each icon circle (stationary) */}
                  <span
                    className="timeline-connector-glow absolute top-0 h-2.5 w-2.5 rounded-full bg-[var(--color-gold-light,#f8e3ab)] opacity-0 shadow-[0_0_14px_4px_rgba(232,184,115,0.55)]"
                    style={{ left: 0 }}
                  />
                  <span
                    className="timeline-connector-glow absolute top-0 h-2.5 w-2.5 rounded-full bg-[var(--color-gold-light,#f8e3ab)] opacity-0 shadow-[0_0_14px_4px_rgba(232,184,115,0.55)]"
                    style={{ left: line.midLeft, animationDelay: "1.1s" }}
                  />
                  <span
                    className="timeline-connector-glow absolute top-0 h-2.5 w-2.5 rounded-full bg-[var(--color-gold-light,#f8e3ab)] opacity-0 shadow-[0_0_14px_4px_rgba(232,184,115,0.55)]"
                    style={{ left: line.width, animationDelay: "2.2s" }}
                  />
                </div>
              </div>
            )}

            {CONTENT.steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  ref={(el) => (stepRefs.current[i] = el)}
                  className="process-step relative flex flex-col items-center"
                >
                  {/* Number — sits above the icon so the connecting line
                      never crosses it */}
                  <span className="select-none bg-gradient-to-b from-[var(--color-gold-light,#f8e3ab)] via-[var(--color-gold,#e8b873)] to-[var(--color-gold-dark,#a9762f)] bg-clip-text font-sans text-5xl font-black text-transparent opacity-60 drop-shadow-[0_0_14px_rgba(232,184,115,0.4)] sm:text-6xl">
                    {step.number}
                  </span>

                  {/* Icon circle */}
                  <div className="relative mt-4 sm:mt-5">
                    <div className="absolute -inset-6 rounded-full bg-[var(--color-gold,#e8b873)]/35 blur-2xl" />
                    <div
                      ref={(el) => (iconRefs.current[i] = el)}
                      className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-b from-[var(--color-gold-light,#f8e3ab)]/80 via-[var(--color-gold,#e8b873)]/40 to-[var(--color-gold-dark,#a9762f)]/70 p-[1.5px] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.7)] sm:h-28 sm:w-28"
                    >
                      <div className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-to-b from-[var(--color-bg-elevated,#1a130a)]/90 to-[var(--color-bg,#070502)]/95 shadow-[inset_0_2px_3px_rgba(255,255,255,0.18),inset_0_-10px_18px_rgba(0,0,0,0.55)] backdrop-blur-sm">
                        <div className="absolute inset-0 rounded-full bg-[var(--color-gold,#e8b873)]/10 blur-md" />
                        <Icon
                          className="relative h-9 w-9 text-[var(--color-gold-light,#f8e3ab)] drop-shadow-[0_0_8px_rgba(232,184,115,0.85)] sm:h-10 sm:w-10"
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mt-8 text-xl font-bold text-[var(--color-text-primary,#f7f3ec)] sm:text-xl">
                    {step.title}
                  </h3>

                  {/* Divider */}
                  <span className="mt-3 h-px w-11 bg-gradient-to-r from-transparent via-[var(--color-gold,#e8b873)]/70 to-transparent" />

                  {/* Description */}
                  <p className="mx-auto mt-4 max-w-[15rem] text-sm leading-relaxed text-[var(--color-text-muted,#cbc3b6)]/75">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="process-cta relative mt-10 sm:mt-10">
          <div
            ref={glowRef}
            className="pointer-events-none absolute -inset-6 rounded-full bg-[var(--color-gold,#e8b873)]/50 opacity-70 blur-2xl"
          />
          <motion.button
            type="button"
            className="relative flex w-full max-w-md items-center justify-between gap-3 rounded-full bg-gradient-to-b from-[var(--color-gold-light,#f8e3ab)]/90 via-[var(--color-gold,#e8b873)]/70 to-[var(--color-gold-dark,#a9762f)]/90 p-[1.5px] shadow-[0_14px_34px_-10px_rgba(0,0,0,0.65)] sm:w-auto"
            whileHover={{ y: -3 }}
            whileTap={{ y: 0, scale: 0.99 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <span className="flex w-full items-center justify-between gap-3 rounded-full bg-gradient-to-b from-[var(--color-gold-light,#f8e3ab)] via-[var(--color-gold,#e8b873)] to-[var(--color-gold-dark,#a9762f)] px-3 py-3 shadow-[inset_0_2px_2px_rgba(255,255,255,0.65),inset_0_-6px_10px_rgba(0,0,0,0.3)] sm:px-4">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]">
                <Sparkles
                  className="h-4 w-4 text-[var(--color-button-text,#241804)]"
                  strokeWidth={2}
                />
              </span>
              <span className="flex-1 whitespace-nowrap px-2 text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-button-text,#241804)] sm:text-sm">
                {CONTENT.cta}
              </span>
              <motion.span
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]"
                whileHover={{ x: 3 }}
              >
                <ArrowRight
                  className="h-4 w-4 text-[var(--color-button-text,#241804)]"
                  strokeWidth={2}
                />
              </motion.span>
            </span>
          </motion.button>
        </div>

        {/* Trust indicators */}
        <div className="process-trust mt-8 flex flex-col items-center gap-3 text-[var(--color-text-muted,#cbc3b6)]/65 sm:mt-9 sm:flex-row sm:gap-0 sm:divide-x sm:divide-[var(--color-gold,#e8b873)]/20">
          {CONTENT.trust.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.label}
                className="flex items-center gap-2 sm:px-5 first:sm:pl-0 last:sm:pr-0"
              >
                <Icon
                  className="h-3.5 w-3.5 text-[var(--color-gold,#e8b873)]/80 drop-shadow-[0_0_4px_rgba(232,184,115,0.5)]"
                  strokeWidth={1.5}
                />
                <span className="text-xs sm:text-sm">{item.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes process-float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(6px, -14px);
          }
        }
        @keyframes process-float-alt {
          0%,
          100% {
            transform: translate(0, 0);
          }
          50% {
            transform: translate(-8px, -10px);
          }
        }
        @keyframes process-twinkle {
          0%,
          100% {
            opacity: 0.05;
            transform: scale(0.85);
          }
          50% {
            opacity: 0.22;
            transform: scale(1.1);
          }
        }

        /* --- Timeline line effects: Stationary Line + Single Animated Light Reflection --- */

        @keyframes timeline-shine-travel {
          0% {
            left: 0%;
            transform: translate(-100%, -50%);
          }
          100% {
            left: 100%;
            transform: translate(0%, -50%);
          }
        }
        .timeline-shine {
          animation: timeline-shine-travel 3.5s linear infinite;
        }

        @keyframes timeline-shine-travel-vertical {
          0% {
            top: 0%;
            transform: translate(-50%, -100%);
          }
          100% {
            top: 100%;
            transform: translate(-50%, 0%);
          }
        }
        .timeline-shine-vertical {
          animation: timeline-shine-travel-vertical 3.5s linear infinite;
        }

        @keyframes timeline-connector-pulse {
          0%,
          100% {
            opacity: 0.35;
            transform: translate(-50%, -50%) scale(0.85);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.25);
          }
        }
        .timeline-connector-glow {
          animation: timeline-connector-pulse 3.4s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .process-eyebrow,
          .process-heading,
          .process-divider,
          .process-subtitle,
          .process-step,
          .process-cta,
          .process-trust,
          .timeline-shine,
          .timeline-shine-vertical,
          .timeline-connector-glow,
          [style*="process-float"],
          [style*="process-twinkle"] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}