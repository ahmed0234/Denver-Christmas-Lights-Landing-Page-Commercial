"use client";

/**
 * Footer.tsx
 * Premium Commercial Christmas Lights Landing Page Footer.
 *
 * Desktop: Three-column layout — Brand/Contact | Navigation | CTA Card
 * Mobile:  Stacked layout matching the provided mobile reference design
 * Fully responsive, accessible, and production-ready.
 */

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ChevronRight,
  ChevronDown,
  Snowflake,
  Link as LinkIcon,
} from "lucide-react";
import { FaFacebookF, FaInstagram, FaPinterestP, FaYelp } from "react-icons/fa6";

// ─── Data ─────────────────────────────────────────────────────────────────────

const QUICK_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Services", href: "#services" },
  { label: "Why Choose Us", href: "#why-choose-us" },
  { label: "Our Process", href: "#process" },
  { label: "Gallery", href: "#before-after" },
  { label: "Service Areas", href: "#areas-we-serve" },
  { label: "Testimonials", href: "#reviews" },
  { label: "FAQs", href: "#faq" },
  { label: "Contact", href: "#quote" },
];

const SERVICES_LINKS = [
  { label: "Commercial Roofline Lighting", href: "#services" },
  { label: "Tree & Landscape Illumination", href: "#services" },
  { label: "Commercial Wreaths & Greenery", href: "#services" },
  { label: "HOA & Entryway Displays", href: "#services" },
  { label: "Shopping Center & Retail Lighting", href: "#services" },
  { label: "Custom Commercial Holiday Décor", href: "#services" },
];

const CONTACT_ITEMS = [
  {
    id: "area",
    icon: MapPin,
    title: "SERVICE AREA",
    lines: ["Denver, CO & Surrounding", "Areas"],
  },
  {
    id: "email",
    icon: Mail,
    title: "EMAIL US",
    lines: ["info@denverchristmaslights.com"],
    href: "mailto:info@denverchristmaslights.com",
  },
  {
    id: "hours",
    icon: Clock,
    title: "BUSINESS HOURS",
    lines: ["Mon - Sat: 8AM - 8PM", "Sun: 10AM - 6PM"],
  },
];

const SOCIAL_LINKS = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: FaInstagram, href: "#", label: "Instagram" },
  { icon: FaPinterestP, href: "#", label: "Pinterest" },
  { icon: FaYelp, href: "#", label: "Yelp" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

/** Circular glass social icon button */
function SocialButton({
  icon: Icon,
  href,
  label,
}: {
  icon: React.ElementType;
  href: string;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full border cursor-pointer transition-all duration-300"
      style={{
        borderColor: "var(--border-color)",
        background: "var(--bg-glass)",
        backdropFilter: "blur(8px)",
      }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 18px var(--accent-glow)",
        borderColor: "var(--accent)",
      }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-[18px] h-[18px] sm:w-5 sm:h-5" style={{ color: "var(--accent)" }} />
    </motion.a>
  );
}

/** Contact detail row */
function ContactItem({
  icon: Icon,
  title,
  lines,
  href,
}: {
  icon: React.ElementType;
  title: string;
  lines: string[];
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3 sm:gap-4">
      <div
        className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border flex items-center justify-center shrink-0"
        style={{
          borderColor: "var(--border-color)",
          background: "radial-gradient(circle at top, var(--bg-elevated), var(--bg-card))",
          boxShadow: "0 0 12px var(--accent-glow-faint)",
        }}
      >
        <Icon size={17} style={{ color: "var(--accent)" }} />
      </div>
      <div className="flex flex-col min-w-0">
        <span
          className="text-[10px] sm:text-xs font-bold tracking-[0.18em] uppercase mb-0.5"
          style={{ color: "var(--accent)" }}
        >
          {title}
        </span>
        {lines.map((line, i) => (
          <span
            key={i}
            className="text-xs sm:text-sm leading-snug"
            style={{ color: "var(--text-muted)" }}
          >
            {line}
          </span>
        ))}
      </div>
    </div>
  );

  if (href) {
    return (
      <a href={href} className="hover:opacity-80 transition-opacity duration-200">
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
}

/** Individual nav link */
function NavLink({ label, href }: { label: string; href: string }) {
  return (
    <li>
      <Link
        href={href}
        className="group flex items-center gap-1.5 text-xs sm:text-sm transition-all duration-200"
        style={{ color: "var(--text-muted)" }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-200 group-hover:scale-125"
          style={{ background: "var(--accent)", opacity: 0.7 }}
        />
        <span className="group-hover:underline group-hover:underline-offset-2 transition-all duration-200 group-hover:opacity-90">
          {label}
        </span>
      </Link>
    </li>
  );
}

/** Mobile collapsible "Quick Links" accordion */
function MobileNavAccordion() {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="w-full rounded-2xl border overflow-hidden"
      style={{
        borderColor: "var(--border-color)",
        background: "var(--bg-glass)",
        backdropFilter: "blur(8px)",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 sm:px-5 py-3.5 sm:py-4 cursor-pointer"
        aria-expanded={open}
      >
        <div className="flex items-center gap-2">
          <LinkIcon size={14} style={{ color: "var(--accent)" }} />
          <span
            className="text-xs sm:text-sm font-bold tracking-[0.15em] uppercase"
            style={{ color: "var(--accent)" }}
          >
            QUICK LINKS
          </span>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown size={16} style={{ color: "var(--text-muted)" }} />
        </motion.div>
      </button>

      <motion.div
        initial={false}
        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <div
          className="h-px w-full"
          style={{ background: "var(--border-color)", opacity: 0.5 }}
        />
        {QUICK_LINKS.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="flex items-center justify-between px-4 sm:px-5 py-3 border-b last:border-b-0 transition-all duration-200 hover:bg-white/5"
            style={{
              borderColor: "var(--border-color)",
              color: "var(--text-body)",
              opacity: 0.9,
            }}
          >
            <span className="text-sm">{link.label}</span>
            <ChevronRight size={14} style={{ color: "var(--text-muted)" }} />
          </Link>
        ))}
      </motion.div>
    </div>
  );
}

// ─── CTA Card ────────────────────────────────────────────────────────────────

function CTACard({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`relative w-full rounded-2xl sm:rounded-3xl border overflow-hidden ${compact ? "p-5 sm:p-6" : "p-6 sm:p-7 lg:p-8"}`}
      style={{
        borderColor: "var(--border-color)",
        background: "var(--bg-glass-card)",
        boxShadow: "var(--shadow-card-hover), 0 0 40px var(--accent-glow-faint)",
        backdropFilter: "blur(16px)",
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-3xl">
        <Image
          src="/ReviewTestimonial/ReviewsBackground.webp"
          alt=""
          fill
          className="object-cover object-right opacity-55 saturate-110 brightness-90"
          quality={90}
          sizes="(max-width: 768px) 100vw, 420px"
        />
        {/* Dark overlay for readability */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(145deg, rgba(8,8,7,0.88) 0%, rgba(8,8,7,0.55) 50%, rgba(8,8,7,0.3) 100%)",
          }}
        />
        {/* Gold shimmer top edge */}
        <div
          className="absolute inset-x-0 top-0 h-px pointer-events-none"
          style={{ background: "var(--card-border-gradient)" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-4 sm:gap-5">
        {/* Phone icon circle */}
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full border flex items-center justify-center self-start"
          style={{
            borderColor: "var(--border-color)",
            background: "radial-gradient(circle at top, var(--bg-elevated), var(--bg-card))",
            boxShadow: "0 0 18px var(--accent-glow-soft)",
          }}
        >
          <Phone
            size={22}
            style={{
              color: "var(--accent)",
              filter: "drop-shadow(0 0 6px var(--accent-glow))",
            }}
          />
        </div>

        {/* Heading */}
        <h3
          className="text-xl sm:text-2xl md:text-3xl font-bold leading-tight tracking-tight"
          style={{ color: "var(--text-heading)" }}
        >
          Ready to Light Up{" "}
          <span
            className="inline-block"
            style={{
              background: "var(--gradient-accent-text)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Your Property?
          </span>
        </h3>

        {/* Description */}
        <p
          className="text-xs sm:text-sm leading-relaxed max-w-[34ch]"
          style={{ color: "var(--text-muted)" }}
        >
          Schedule your free commercial consultation today and let us bring the holiday magic to your business.
        </p>

        {/* Call Now Button */}
        <motion.a
          href="tel:+17201234567"
          aria-label="Call our commercial lighting team now"
          className="group relative inline-flex items-center justify-center gap-2.5 rounded-full py-3.5 px-7 text-xs sm:text-sm font-bold tracking-[0.1em] uppercase overflow-hidden w-full sm:w-auto cursor-pointer"
          style={{
            background:
              "linear-gradient(180deg, var(--gradient-btn-top) 0%, var(--gradient-btn-mid) 50%, var(--gradient-btn-bottom) 100%)",
            color: "var(--bg-primary)",
            boxShadow: "var(--shadow-btn)",
          }}
          whileHover={{
            scale: 1.03,
            y: -2,
            boxShadow: "var(--shadow-btn-hover)",
          }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.2 }}
        >
          {/* Shine effect */}
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-full"
            style={{
              background:
                "linear-gradient(105deg, transparent 30%, var(--btn-inner-highlight) 50%, transparent 70%)",
            }}
          />
          <Phone size={16} className="shrink-0" />
          <span>CALL NOW</span>
        </motion.a>

        {/* Phone number */}
        <a
          href="tel:+17201234567"
          className="text-base sm:text-lg font-bold text-center sm:text-left tracking-wide hover:opacity-80 transition-opacity"
          style={{
            background: "var(--gradient-accent-text)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          (720) 123-4567
        </a>
      </div>
    </div>
  );
}

// ─── Snowy Bottom Landscape SVG ───────────────────────────────────────────────

function SnowyLandscape() {
  return (
    <div className="relative w-full h-24 sm:h-28 md:h-32 overflow-hidden pointer-events-none">
      {/* Background image strip */}
      <div className="absolute inset-0">
        <Image
          src="/ReviewTestimonial/ReviewsBackground.webp"
          alt=""
          fill
          className="object-cover object-bottom opacity-60 saturate-90 brightness-60"
          quality={80}
          sizes="100vw"
        />
        {/* strong top fade so it blends into footer above */}
        <div
          className="absolute inset-x-0 top-0 h-2/3"
          style={{
            background:
              "linear-gradient(180deg, var(--bg-primary) 0%, transparent 100%)",
          }}
        />
        {/* side fades */}
        <div
          className="absolute inset-y-0 left-0 w-24"
          style={{
            background:
              "linear-gradient(90deg, var(--bg-primary) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-y-0 right-0 w-24"
          style={{
            background:
              "linear-gradient(270deg, var(--bg-primary) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* SVG snow drifts on top */}
      <svg
        viewBox="0 0 1440 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 w-full"
        preserveAspectRatio="none"
      >
        {/* Back snow hill */}
        <path
          d="M0 80 Q180 40 360 65 Q540 90 720 55 Q900 20 1080 60 Q1260 90 1440 70 L1440 96 L0 96 Z"
          fill="rgba(255,255,255,0.04)"
        />
        {/* Front snow drift */}
        <path
          d="M0 88 Q120 75 240 82 Q400 92 560 78 Q720 64 900 80 Q1080 92 1260 82 Q1350 78 1440 84 L1440 96 L0 96 Z"
          fill="rgba(255,255,255,0.07)"
        />
        {/* Small trees silhouettes left */}
        <path
          d="M60 88 L72 64 L84 88Z M68 88 L72 70 L76 88Z"
          fill="rgba(10,10,8,0.9)"
        />
        <path
          d="M100 88 L115 58 L130 88Z M107 88 L115 66 L123 88Z"
          fill="rgba(10,10,8,0.85)"
        />
        {/* Small trees silhouettes right */}
        <path
          d="M1320 88 L1332 64 L1344 88Z M1328 88 L1332 70 L1336 88Z"
          fill="rgba(10,10,8,0.9)"
        />
        <path
          d="M1350 88 L1365 58 L1380 88Z M1357 88 L1365 66 L1373 88Z"
          fill="rgba(10,10,8,0.85)"
        />
        {/* Light strand dots across width */}
        {[120, 250, 400, 560, 680, 800, 920, 1040, 1160, 1300].map((x, i) => (
          <circle
            key={i}
            cx={x}
            cy={60 + Math.sin(i * 1.5) * 12}
            r={3}
            fill="rgba(245,200,106,0.75)"
            style={{ filter: "drop-shadow(0 0 4px rgba(245,200,106,0.9))" }}
          />
        ))}
        {/* Connect light strand with thin line */}
        <polyline
          points="80,68 120,60 250,62 400,56 560,60 680,55 800,58 920,60 1040,54 1160,60 1300,58 1380,65"
          stroke="rgba(245,200,106,0.3)"
          strokeWidth="1"
          fill="none"
        />
      </svg>
    </div>
  );
}

// ─── Main Footer Component ────────────────────────────────────────────────────

export default function Footer() {
  return (
    <footer
      className="relative w-full font-sans overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
      aria-label="Site Footer"
    >
      {/* ── Ambient Section Glows ─────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <div
          className="absolute left-1/4 top-1/3 w-[24rem] h-[24rem] rounded-full blur-[140px] opacity-15"
          style={{ background: "var(--accent-glow)" }}
        />
        <div
          className="absolute right-1/4 bottom-1/3 w-72 h-72 rounded-full blur-[100px] opacity-12"
          style={{ background: "var(--gold-glow)" }}
        />
      </div>

      {/* ── Main Footer Body ─────────────────────────────────────────────── */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pt-12 sm:pt-16 lg:pt-20 pb-6">

        {/* ───────────────── DESKTOP LAYOUT ─────────────────────────────── */}
        <div className="hidden lg:block">
          {/* Large luxury outer container */}
          <div
            className="relative w-full rounded-[28px] xl:rounded-[36px] border p-8 xl:p-10 overflow-hidden"
            style={{
              borderColor: "var(--border-color)",
              background:
                "linear-gradient(145deg, color-mix(in srgb, var(--bg-card) 90%, transparent), color-mix(in srgb, var(--bg-primary) 96%, transparent))",
              boxShadow:
                "var(--shadow-card-hover), 0 0 60px var(--accent-glow-faint), inset 0 1px 0 var(--highlight-surface)",
              backdropFilter: "blur(16px)",
            }}
          >
            {/* Shimmer top border */}
            <div
              className="absolute inset-x-0 top-0 h-px pointer-events-none"
              style={{ background: "var(--card-border-gradient)" }}
            />

            <div className="grid grid-cols-[1fr_auto_auto_340px] xl:grid-cols-[1fr_auto_auto_380px] gap-8 xl:gap-10">

              {/* ── COLUMN 1: Brand + Social + Contact ─────────────────── */}
              <div className="flex flex-col gap-6 pr-8 border-r" style={{ borderColor: "var(--border-color)" }}>
                {/* Logo */}
                <Link href="/" aria-label="Denver Christmas Lights Home">
                  <Image
                    src="/Footer/image.png"
                    alt="Denver Commercial Christmas Lights Logo"
                    width={180}
                    height={80}
                    className="object-contain h-16 xl:h-20 w-auto"
                    quality={95}
                    priority
                  />
                </Link>

                {/* Tagline */}
                <p
                  className="text-sm leading-relaxed max-w-[28ch]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Professional commercial Christmas light installation that makes your business and property shine bright all season long.
                </p>

                {/* Social */}
                <div className="flex flex-col gap-3">
                  <span
                    className="text-[10px] font-bold tracking-[0.2em] uppercase"
                    style={{ color: "var(--text-muted-dark)" }}
                  >
                    Connect With Us
                  </span>
                  <div className="flex items-center gap-2.5">
                    {SOCIAL_LINKS.map((s) => (
                      <SocialButton key={s.label} icon={s.icon} href={s.href} label={s.label} />
                    ))}
                  </div>
                </div>

                {/* Contact info */}
                <div
                  className="flex flex-col gap-4 mt-1 pt-5 border-t"
                  style={{ borderColor: "var(--border-color)", opacity: 0.9 }}
                >
                  {CONTACT_ITEMS.map((item) => (
                    <ContactItem
                      key={item.id}
                      icon={item.icon}
                      title={item.title}
                      lines={item.lines}
                      href={(item as { href?: string }).href}
                    />
                  ))}
                </div>
              </div>

              {/* ── COLUMN 2: Quick Links ───────────────────────────────── */}
              <div className="flex flex-col gap-5 px-6 xl:px-8">
                <h4
                  className="text-[10px] font-bold tracking-[0.2em] uppercase"
                  style={{ color: "var(--accent)" }}
                >
                  Quick Links
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {QUICK_LINKS.map((link) => (
                    <NavLink key={link.label} label={link.label} href={link.href} />
                  ))}
                </ul>
              </div>

              {/* ── COLUMN 3: Services ──────────────────────────────────── */}
              <div className="flex flex-col gap-5 px-6 xl:px-8 border-r" style={{ borderColor: "var(--border-color)" }}>
                <h4
                  className="text-[10px] font-bold tracking-[0.2em] uppercase"
                  style={{ color: "var(--accent)" }}
                >
                  Our Services
                </h4>
                <ul className="flex flex-col gap-3.5">
                  {SERVICES_LINKS.map((link) => (
                    <NavLink key={link.label} label={link.label} href={link.href} />
                  ))}
                </ul>
              </div>

              {/* ── COLUMN 4: CTA Card ──────────────────────────────────── */}
              <div>
                <CTACard />
              </div>
            </div>
          </div>
        </div>

        {/* ───────────────── MOBILE / TABLET LAYOUT ─────────────────────── */}
        <div className="lg:hidden flex flex-col items-center gap-7 sm:gap-8">

          {/* Logo centered */}
          <Link href="/" aria-label="Denver Christmas Lights Home" className="flex justify-center">
            <Image
              src="/Footer/image.png"
              alt="Denver Commercial Christmas Lights Logo"
              width={200}
              height={90}
              className="object-contain h-20 sm:h-24 w-auto"
              quality={95}
              priority
            />
          </Link>

          {/* Description */}
          <p
            className="text-sm sm:text-base leading-relaxed text-center max-w-[40ch]"
            style={{ color: "var(--text-muted)" }}
          >
            Professional commercial Christmas light installation that makes your business and property shine bright all season long.
          </p>

          {/* Decorative gold divider with snowflake */}
          <div className="flex items-center gap-3 w-full max-w-xs">
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(90deg, transparent, var(--accent))" }}
            />
            <Snowflake
              size={14}
              style={{
                color: "var(--accent)",
                filter: "drop-shadow(0 0 5px var(--accent-glow))",
              }}
            />
            <div
              className="flex-1 h-px"
              style={{ background: "linear-gradient(90deg, var(--accent), transparent)" }}
            />
          </div>

          {/* Social icons */}
          <div className="flex items-center justify-center gap-3 sm:gap-4">
            {SOCIAL_LINKS.map((s) => (
              <SocialButton key={s.label} icon={s.icon} href={s.href} label={s.label} />
            ))}
          </div>

          {/* CTA Card — full width */}
          <div className="w-full max-w-lg">
            <CTACard compact />
          </div>

          {/* Navigation accordion */}
          <div className="w-full max-w-lg">
            <MobileNavAccordion />
          </div>

          {/* Contact info */}
          <div className="w-full max-w-lg flex flex-col gap-4 sm:gap-5">
            {CONTACT_ITEMS.map((item) => (
              <ContactItem
                key={item.id}
                icon={item.icon}
                title={item.title}
                lines={item.lines}
                href={(item as { href?: string }).href}
              />
            ))}
          </div>
        </div>

        {/* ── BOTTOM BAR ────────────────────────────────────────────────── */}
        <div className="mt-8 sm:mt-12 lg:mt-10 relative z-10">
          <div
            className="h-px w-full mb-6 sm:mb-8"
            style={{ background: "var(--border-color)", opacity: 0.6 }}
          />

          <div className="flex flex-col items-center gap-2.5 text-center">
            {/* Decorative snowflake */}
            <Snowflake
              size={20}
              style={{
                color: "var(--accent)",
                filter: "drop-shadow(0 0 8px var(--accent-glow))",
              }}
            />

            <p
              className="text-xs sm:text-sm"
              style={{ color: "var(--text-muted)" }}
            >
              © 2026 Denver Christmas Lights. All rights reserved.
            </p>

            <div className="flex items-center gap-3 sm:gap-4">
              <span
                className="text-[11px] sm:text-xs"
                style={{ color: "var(--text-muted-dark)" }}
              >
                Licensed & Insured
              </span>
              <span style={{ color: "var(--border-color)" }}>|</span>
              <span
                className="text-[11px] sm:text-xs italic"
                style={{ color: "var(--text-muted-dark)" }}
              >
                Bringing Holiday Magic to Denver Commercial Properties & HOAs
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Snowy Landscape Bottom Strip ─────────────────────────────────── */}
      <SnowyLandscape />
    </footer>
  );
}
