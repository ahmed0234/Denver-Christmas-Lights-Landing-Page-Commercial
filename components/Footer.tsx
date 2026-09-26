import Link from "next/link";
import { Mail, MapPin, Phone, Sparkles } from "lucide-react";
import { ThemeLogoIcon } from "@/components/ThemeLogo";
import QuoteCTAButton from "@/components/QuoteCTAButton";

// Clean, lightweight inline SVG icons for social media (zero react-icons runtime overhead)
function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function TikTokIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.625c-.203.324-.262.774-.262 1.485v1.745h4.945l-.442 3.667h-4.503v7.98H9.101z" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    icon: InstagramIcon,
    href: "https://www.instagram.com/denverchristmas_lightsdisplay",
    label: "Instagram",
  },
  {
    icon: TikTokIcon,
    href: "https://www.tiktok.com/@denver.christmas",
    label: "TikTok",
  },
  {
    icon: FacebookIcon,
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
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border border-amber-500/20 bg-amber-950/10 text-amber-300 hover:text-amber-200 hover:border-amber-400/50 hover:bg-amber-500/15 transition-all duration-200 hover:scale-110 active:scale-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300"
                    style={{
                      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
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
              <QuoteCTAButton
                id="footer-get-quote-btn"
                className="relative group flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wide overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 cursor-pointer select-none transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
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
              </QuoteCTAButton>

              {/* Call Now CTA Button */}
              <a
                id="footer-call-now-btn"
                href="tel:7202967711"
                className="relative group flex items-center justify-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wide overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-white shrink-0 cursor-pointer select-none transition-all duration-200 hover:scale-[1.03] active:scale-[0.97]"
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
              </a>
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
            <Link
              href="/privacy-policy"
              className="hover:text-[var(--gold)] transition-colors focus:outline-none focus-visible:underline"
            >
              Privacy Policy
            </Link>
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
