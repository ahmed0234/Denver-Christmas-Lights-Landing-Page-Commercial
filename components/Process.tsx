"use client";

import Image from "next/image";
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
import { handleGetQuoteClick } from "@/lib/scrollUtils";

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
        "Tell us about your property, preferred lighting style and ideal installation timeline.",
    },
    {
      number: "02",
      icon: Home,
      title: "Approve Your Lighting Plan",
      description:
        "We'll recommend a design and provide a clear proposal for your commercial Christmas light installation.",
    },
    {
      number: "03",
      icon: TreePine,
      title: "Enjoy Your Holiday Display",
      description:
        "Our team installs your lights so you can enjoy a professionally decorated property without doing the work yourself.",
    },
  ],
  cta: "Start My Free Quote",
  trust: [
    { icon: ShieldCheck, label: "Fully Insured" },
    { icon: Clock, label: "On-Time Installation" },
    { icon: Star, label: "Satisfaction Guaranteed" },
  ],
};

const DUST = Array.from({ length: 16 }, (_, i) => {
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
  return (
    <section
      id="process"
      className="relative w-full overflow-hidden bg-[var(--color-bg,#070502)] py-20 sm:py-24 md:py-16"
    >
      {/* Background Image Layer */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <Image
          src="/Process/Background.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-center opacity-25 sm:opacity-85 md:opacity-95 brightness-75 saturate-95 contrast-105"
          loading="lazy"
        />

        {/* Dark Legibility Overlay across section to keep background subtle */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,5,2,0.85) 0%, rgba(7,5,2,0.72) 40%, rgba(7,5,2,0.85) 100%)",
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

      {/* Ambient Golden Radial Glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-1/2 top-0 h-[18rem] w-[36rem] -translate-x-1/2 -translate-y-1/3 rounded-full bg-[var(--color-gold,#e8b873)]/[0.08] blur-[120px]" />
        <div className="absolute left-1/2 top-[58%] h-[24rem] w-[50rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-gold,#e8b873)]/[0.22] blur-[90px]" />
        <div className="absolute left-1/4 top-[65%] h-56 w-56 -translate-x-1/2 rounded-full bg-[var(--color-gold,#e8b873)]/[0.10] blur-[90px]" />
        <div className="absolute right-1/4 top-[65%] h-56 w-56 translate-x-1/2 rounded-full bg-[var(--color-gold,#e8b873)]/[0.10] blur-[90px]" />
      </div>

      {/* Floating golden dust */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {DUST.map((p, idx) => (
          <span
            key={p.id}
            className={`absolute rounded-full bg-[var(--color-gold-light,#f8e3ab)] ${
              idx > 8 ? "hidden sm:block" : ""
            }`}
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
        <div className="flex flex-col items-center gap-3">
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
        <h2 className="mt-6 flex flex-col items-center gap-1 font-sans text-[2.1rem] font-bold tracking-tight text-[var(--color-text-primary,#f7f3ec)] sm:gap-2 sm:text-4xl md:text-5xl lg:text-[3.75rem]">
          <span className="leading-[1.2]">{CONTENT.heading.line1} </span>
          <span className="leading-[1.2]">
            {CONTENT.heading.line2Prefix}
            <span className="bg-gradient-to-b from-[var(--color-gold-light,#f8e3ab)] via-[var(--color-gold,#e8b873)] to-[var(--color-gold-dark,#a9762f)] bg-clip-text text-transparent drop-shadow-[0_0_18px_rgba(232,184,115,0.35)]">
              {CONTENT.heading.line2Highlight}
            </span>
          </span>
        </h2>

        {/* Divider between heading and subtitle */}
        <div className="mt-6 flex items-center gap-3">
          <span className="h-px w-14 bg-gradient-to-r from-transparent to-[var(--color-gold,#e8b873)]/50 sm:w-20" />
          <Snowflake
            className="h-3 w-3 shrink-0 text-[var(--color-gold,#e8b873)]/70"
            strokeWidth={1.5}
          />
          <span className="h-px w-14 bg-gradient-to-l from-transparent to-[var(--color-gold,#e8b873)]/50 sm:w-20" />
        </div>

        {/* Subtitle */}
        <p className="mt-5 max-w-xl text-sm font-medium leading-relaxed text-[#e5ddd3] drop-shadow-[0_1.5px_4px_rgba(0,0,0,0.9)] sm:text-base">
          {CONTENT.subtitle}
        </p>

        {/* Timeline */}
        <div className="relative mt-12 w-full sm:mt-16 md:mt-12">
          {/* Mobile connecting line (vertical) */}
          <div className="pointer-events-none absolute bottom-12 left-1/2 top-12 w-2 -translate-x-1/2 overflow-hidden md:hidden">
            <div className="absolute inset-0 rounded-full bg-[var(--color-gold,#e8b873)]/20 blur-[6px]" />
            <div className="absolute left-1/2 top-0 h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-[var(--color-gold,#e8b873)]/70 via-[var(--color-gold-light,#f8e3ab)]/80 to-[var(--color-gold,#e8b873)]/70" />
          </div>

          {/* Desktop connecting line across the three circles */}
          <div className="pointer-events-none absolute top-[9.5rem] left-[16%] right-[16%] hidden h-[2px] -translate-y-1/2 md:block">
            <div className="absolute inset-x-0 top-0 h-3 -translate-y-1/2 rounded-full bg-[var(--color-gold,#e8b873)]/30 blur-[10px]" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--color-gold-dark,#a9762f)]/60 via-[var(--color-gold,#e8b873)] to-[var(--color-gold-dark,#a9762f)]/60 shadow-[0_0_12px_2px_rgba(232,184,115,0.4)]" />
          </div>

          <div className="relative grid grid-cols-1 gap-14 sm:gap-16 md:grid-cols-3 md:gap-6">
            {CONTENT.steps.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.number}
                  className="relative flex flex-col items-center group"
                >
                  {/* Number */}
                  <span className="select-none bg-gradient-to-b from-[var(--color-gold-light,#f8e3ab)] via-[var(--color-gold,#e8b873)] to-[var(--color-gold-dark,#a9762f)] bg-clip-text font-sans text-5xl font-black text-transparent opacity-60 drop-shadow-[0_0_14px_rgba(232,184,115,0.4)] sm:text-6xl">
                    {step.number}
                  </span>

                  {/* Icon circle */}
                  <div className="relative mt-4 sm:mt-5 transition-transform duration-300 group-hover:scale-105">
                    <div className="absolute -inset-6 rounded-full bg-[var(--color-gold,#e8b873)]/35 blur-2xl" />
                    <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-b from-[var(--color-gold-light,#f8e3ab)]/80 via-[var(--color-gold,#e8b873)]/40 to-[var(--color-gold-dark,#a9762f)]/70 p-[1.5px] shadow-[0_18px_30px_-12px_rgba(0,0,0,0.7)] sm:h-28 sm:w-28">
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
                  <h3 className="mt-8 text-xl font-bold text-[var(--color-text-primary,#f7f3ec)] sm:text-xl drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                    {step.title}
                  </h3>

                  {/* Divider */}
                  <span className="mt-3 h-px w-11 bg-gradient-to-r from-transparent via-[var(--color-gold,#e8b873)]/70 to-transparent" />

                  {/* Description container */}
                  <div className="mt-4 max-w-[16.5rem] rounded-xl bg-black/45 px-4 py-3 backdrop-blur-md border border-amber-500/15 shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
                    <p className="text-sm font-medium leading-relaxed text-[#f3ede4] drop-shadow-[0_1px_3px_rgba(0,0,0,0.95)]">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <div className="relative mt-12 sm:mt-14">
          <div className="pointer-events-none absolute -inset-6 rounded-full bg-[var(--color-gold,#e8b873)]/50 opacity-70 blur-2xl animate-pulse" />
          <button
            type="button"
            onClick={handleGetQuoteClick}
            className="relative flex w-full max-w-md items-center justify-between gap-3 rounded-full bg-gradient-to-b from-[var(--color-gold-light,#f8e3ab)]/90 via-[var(--color-gold,#e8b873)]/70 to-[var(--color-gold-dark,#a9762f)]/90 p-[1.5px] shadow-[0_14px_34px_-10px_rgba(0,0,0,0.65)] sm:w-auto cursor-pointer select-none transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
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
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black/10 shadow-[inset_0_1px_2px_rgba(255,255,255,0.4)]">
                <ArrowRight
                  className="h-4 w-4 text-[var(--color-button-text,#241804)]"
                  strokeWidth={2}
                />
              </span>
            </span>
          </button>
        </div>

        {/* Trust indicators */}
        <div className="mt-8 flex flex-col items-center gap-3 text-[var(--color-text-muted,#cbc3b6)]/65 sm:mt-9 sm:flex-row sm:gap-0 sm:divide-x sm:divide-[var(--color-gold,#e8b873)]/20">
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
    </section>
  );
}