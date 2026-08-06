"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "motion/react";
import {
  ClipboardList,
  Settings2,
  BarChart3,
  Cookie,
  Share2,
  Lock,
  ExternalLink,
  UserCheck,
  Mail,
  CheckCircle2,
  ShieldCheck,
  Phone,
  Calendar,
  Building2,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

// ─── Reduced-motion hook (native, version-agnostic) ───────────────────────────
function usePrefersReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}

// ─── Shared card surface styles ───────────────────────────────────────────────
const cardBase: React.CSSProperties = {
  background:
    "linear-gradient(160deg, var(--gradient-card-top) 0%, var(--gradient-card-bottom) 100%)",
  backdropFilter: "blur(18px) saturate(190%)",
  WebkitBackdropFilter: "blur(18px) saturate(190%)",
  border: "1px solid var(--border-color)",
  boxShadow: "var(--shadow-card), inset 0 1px 0 var(--highlight-card)",
  borderRadius: "18px",
};

// ─── Bento Card wrapper ───────────────────────────────────────────────────────
function BentoCard({
  children,
  className = "",
  id,
  index,
  prefersReducedMotion,
  style,
  "aria-labelledby": ariaLabelledby,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  index: number;
  prefersReducedMotion: boolean;
  style?: React.CSSProperties;
  "aria-labelledby"?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-48px 0px" });

  return (
    <motion.article
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 20 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: prefersReducedMotion ? 0 : 20 }
      }
      transition={{
        duration: 0.48,
        delay: prefersReducedMotion ? 0 : index * 0.055,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={
        prefersReducedMotion
          ? {}
          : {
              y: -3,
              boxShadow:
                "0 18px 56px rgba(0,0,0,0.85), 0 4px 18px rgba(0,0,0,0.5), inset 0 1px 0 var(--highlight-card)",
            }
      }
      className={`relative overflow-hidden group ${className}`}
      style={{ ...cardBase, ...style }}
      aria-labelledby={ariaLabelledby}
    >
      {/* Top edge shimmer */}
      <div
        className="absolute inset-x-0 top-0 h-px pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--gold-glow) 40%, var(--accent-glow-soft) 65%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      {/* Corner hover glow */}
      <div
        className="absolute -top-6 -right-6 w-24 h-24 rounded-full blur-[36px] opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
        style={{ background: "var(--accent-glow-faint)" }}
        aria-hidden="true"
      />
      {children}
    </motion.article>
  );
}

// ─── Section Icon Container ───────────────────────────────────────────────────
function SectionIcon({
  Icon,
  size = 18,
}: {
  Icon: React.ElementType;
  size?: number;
}) {
  return (
    <div
      className="shrink-0 w-9 h-9 rounded-[11px] flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, var(--accent-glow-soft) 0%, var(--bg-elevated) 100%)",
        border: "1px solid var(--border-color)",
        boxShadow:
          "var(--benefit-icon-shadow), inset 0 1px 0 var(--highlight-surface)",
      }}
      aria-hidden="true"
    >
      <Icon
        size={size}
        style={{
          color: "var(--gold)",
          filter: "drop-shadow(0 0 5px var(--gold-glow))",
        }}
      />
    </div>
  );
}

// ─── Gold Bullet List ─────────────────────────────────────────────────────────
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5 mt-2" role="list">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span
            className="mt-[7px] shrink-0 w-1.5 h-1.5 rounded-full"
            style={{
              background: "var(--gold)",
              boxShadow: "0 0 5px var(--gold-glow)",
            }}
            aria-hidden="true"
          />
          <span
            className="text-sm leading-snug"
            style={{ color: "var(--text-body)" }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

// ─── Card Heading ─────────────────────────────────────────────────────────────
function CardHeading({
  id,
  icon: Icon,
  children,
}: {
  id: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <SectionIcon Icon={Icon} />
      <h2
        id={id}
        className="font-playfair text-base sm:text-lg font-bold leading-tight"
        style={{ color: "var(--text-heading)" }}
      >
        {children}
      </h2>
    </div>
  );
}

// ─── Thin gold divider ────────────────────────────────────────────────────────
function GoldDivider() {
  return (
    <div
      className="h-px mb-4"
      style={{
        background:
          "linear-gradient(90deg, var(--accent-glow-soft) 0%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}

// ─── Body text ────────────────────────────────────────────────────────────────
function Body({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm leading-relaxed" style={{ color: "var(--text-body)" }}>
      {children}
    </p>
  );
}

// ─── Background ambient decoration ───────────────────────────────────────────
function PageBackground() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full blur-[130px] opacity-[0.14]"
        style={{ background: "var(--accent-glow)" }}
      />
      <div
        className="absolute top-1/4 -right-32 w-[380px] h-[380px] rounded-full blur-[110px] opacity-[0.10]"
        style={{ background: "var(--gold-glow)" }}
      />
      <div
        className="absolute bottom-0 left-1/3 w-[500px] h-[220px] rounded-full blur-[140px] opacity-[0.08]"
        style={{ background: "var(--gold-glow)" }}
      />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function PrivacyPolicyPage() {
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <PageBackground />
      <Navbar />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-12">

        {/* ── BENTO GRID ──────────────────────────────────────────────────── */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          role="region"
          aria-label="Privacy Policy content"
        >

          {/* ┌─────────────────────────────┐ ┌─────────────────┐
              │   HEADER CARD (col-span-2)  │ │  INFO COLLECT   │
              └─────────────────────────────┘ └─────────────────┘ */}

          {/* ── 1. Header / Title Card (col-span-2) ── */}
          <BentoCard
            index={0}
            prefersReducedMotion={prefersReducedMotion}
            className="md:col-span-2 lg:col-span-2"
            style={{
              ...cardBase,
              background:
                "linear-gradient(145deg, var(--gradient-card-top) 0%, rgba(30,18,6,0.98) 100%)",
            }}
          >
            <div className="p-6 sm:p-8 flex flex-col justify-between h-full min-h-[180px]">
              {/* Top row */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  {/* Badge */}
                  <span
                    className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.2em] uppercase px-3 py-1 rounded-full mb-3"
                    style={{
                      background: "var(--accent-glow-faint)",
                      border: "1px solid var(--border-color)",
                      color: "var(--gold)",
                    }}
                  >
                    <Calendar size={10} aria-hidden="true" />
                    Last Updated: August 2026
                  </span>

                  {/* H1 */}
                  <h1
                    className="font-playfair text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight"
                    style={{ color: "var(--text-heading)" }}
                  >
                    Privacy{" "}
                    <span className="text-accent-gradient">Policy</span>
                  </h1>
                </div>

                {/* Icon */}
                <div
                  className="shrink-0 w-14 h-14 rounded-[16px] flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent-glow-soft) 0%, var(--bg-elevated) 100%)",
                    border: "1px solid var(--border-color)",
                    boxShadow:
                      "0 0 24px var(--gold-glow), inset 0 1px 0 var(--highlight-surface)",
                  }}
                  aria-hidden="true"
                >
                  <ShieldCheck
                    size={26}
                    style={{
                      color: "var(--gold)",
                      filter: "drop-shadow(0 0 8px var(--gold-glow))",
                    }}
                  />
                </div>
              </div>

              {/* Divider */}
              <div
                className="h-px my-4"
                style={{
                  background:
                    "linear-gradient(90deg, var(--accent-glow-soft) 0%, transparent 60%)",
                }}
                aria-hidden="true"
              />

              {/* Intro */}
              <p
                className="text-sm sm:text-base leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                At Denver Christmas Lights we respect your privacy and are committed to protecting
                the personal information you provide through our website.
              </p>
            </div>
          </BentoCard>

          {/* ── 2. Information We Collect (col-span-1, taller) ── */}
          <BentoCard
            index={1}
            prefersReducedMotion={prefersReducedMotion}
            className="md:col-span-1"
            id="information-we-collect"
            aria-labelledby="collect-heading"
          >
            <div className="p-5 sm:p-6">
              <CardHeading id="collect-heading" icon={ClipboardList}>
                Information We Collect
              </CardHeading>
              <GoldDivider />
              <Body>When you contact us, we may collect:</Body>
              <BulletList
                items={[
                  "Name & email address",
                  "Phone number",
                  "Property address",
                  "Service & project details",
                  "Any information you provide",
                ]}
              />
              <p
                className="text-xs font-semibold tracking-[0.15em] uppercase mt-4 mb-1.5"
                style={{ color: "var(--text-muted)" }}
              >
                Automatically Collected
              </p>
              <BulletList
                items={[
                  "IP address & browser type",
                  "Device & pages visited",
                  "Referral & usage data",
                ]}
              />
            </div>
          </BentoCard>

          {/* ── 3. How We Use Info ── */}
          <BentoCard
            index={2}
            prefersReducedMotion={prefersReducedMotion}
            id="how-we-use-information"
            aria-labelledby="use-heading"
          >
            <div className="p-5 sm:p-6">
              <CardHeading id="use-heading" icon={Settings2}>
                How We Use Your Information
              </CardHeading>
              <GoldDivider />
              <BulletList
                items={[
                  "Provide quotes & estimates",
                  "Respond to inquiries",
                  "Schedule consultations",
                  "Improve our website",
                  "Analyze marketing performance",
                  "Comply with legal obligations",
                ]}
              />
            </div>
          </BentoCard>

          {/* ── 4. Google Ads & Analytics ── */}
          <BentoCard
            index={3}
            prefersReducedMotion={prefersReducedMotion}
            id="google-ads-analytics"
            aria-labelledby="google-heading"
          >
            <div className="p-5 sm:p-6">
              <CardHeading id="google-heading" icon={BarChart3}>
                Google Ads & Analytics
              </CardHeading>
              <GoldDivider />
              <Body>
                Our website uses Google Ads, Analytics, and Tag Manager to
                understand visitor behavior and improve advertising. These tools
                may collect page views, actions, and conversions.
              </Body>
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-xs font-semibold underline underline-offset-2 hover:opacity-75 transition-opacity focus:outline-none focus-visible:ring-2 rounded"
                style={{ color: "var(--gold)" }}
                aria-label="Google Privacy Policy (opens in new tab)"
              >
                <ExternalLink size={11} aria-hidden="true" />
                View Google&apos;s Privacy Policy
              </a>
            </div>
          </BentoCard>

          {/* ── 5. Cookies ── */}
          <BentoCard
            index={4}
            prefersReducedMotion={prefersReducedMotion}
            id="cookies"
            aria-labelledby="cookies-heading"
          >
            <div className="p-5 sm:p-6">
              <CardHeading id="cookies-heading" icon={Cookie}>
                Cookies
              </CardHeading>
              <GoldDivider />
              <Body>
                We use cookies and similar tracking technologies to enhance your
                experience. You may disable cookies in your browser settings,
                though some features may not function properly.
              </Body>
            </div>
          </BentoCard>

          {/* ┌────────────────────────────────────┐ ┌──────────────────┐
              │  Information Sharing (col-span-2)  │ │  Data Security   │
              └────────────────────────────────────┘ └──────────────────┘ */}

          {/* ── 6. Information Sharing (col-span-2) ── */}
          <BentoCard
            index={5}
            prefersReducedMotion={prefersReducedMotion}
            className="md:col-span-2 lg:col-span-2"
            id="information-sharing"
            aria-labelledby="sharing-heading"
          >
            <div className="p-5 sm:p-6 sm:flex sm:gap-8">
              <div className="sm:flex-1">
                <CardHeading id="sharing-heading" icon={Share2}>
                  Information Sharing
                </CardHeading>
                <GoldDivider />
                <Body>
                  We do not sell, rent, or trade your personal information.
                </Body>
              </div>
              <div className="mt-4 sm:mt-0 sm:flex-1">
                <p
                  className="text-xs font-bold tracking-[0.15em] uppercase mb-2 mt-3 sm:mt-8"
                  style={{ color: "var(--text-muted)" }}
                >
                  We may share with:
                </p>
                <BulletList
                  items={[
                    "Trusted service providers (bound by confidentiality)",
                    "Legal authorities when required by law",
                    "Parties needed to protect our legal rights",
                  ]}
                />
              </div>
            </div>
          </BentoCard>

          {/* ── 7. Data Security ── */}
          <BentoCard
            index={6}
            prefersReducedMotion={prefersReducedMotion}
            id="data-security"
            aria-labelledby="security-heading"
          >
            <div className="p-5 sm:p-6">
              <CardHeading id="security-heading" icon={Lock}>
                Data Security
              </CardHeading>
              <GoldDivider />
              <Body>
                We implement reasonable administrative, technical, and physical
                safeguards to protect your data. However, no Internet
                transmission is completely secure.
              </Body>
            </div>
          </BentoCard>

          {/* ┌──────────────────┐ ┌──────────────────┐ ┌───────────────┐
              │  Third-Party Lnk │ │   Your Rights    │ │   Consent     │
              └──────────────────┘ └──────────────────┘ └───────────────┘ */}

          {/* ── 8. Third-Party Links ── */}
          <BentoCard
            index={7}
            prefersReducedMotion={prefersReducedMotion}
            id="third-party-links"
            aria-labelledby="thirdparty-heading"
          >
            <div className="p-5 sm:p-6">
              <CardHeading id="thirdparty-heading" icon={ExternalLink}>
                Third-Party Links
              </CardHeading>
              <GoldDivider />
              <Body>
                Our website may link to third-party sites. We are not
                responsible for their privacy practices or content.
              </Body>
            </div>
          </BentoCard>

          {/* ── 9. Your Rights ── */}
          <BentoCard
            index={8}
            prefersReducedMotion={prefersReducedMotion}
            id="your-rights"
            aria-labelledby="rights-heading"
          >
            <div className="p-5 sm:p-6">
              <CardHeading id="rights-heading" icon={UserCheck}>
                Your Rights
              </CardHeading>
              <GoldDivider />
              <Body>
                Depending on your location, you may have the right to request
                access, correction, or deletion of your personal data.
              </Body>
              <p
                className="mt-3 text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                To exercise your rights, please use the contact information
                below.
              </p>
            </div>
          </BentoCard>

          {/* ── 10. Consent ── */}
          <BentoCard
            index={9}
            prefersReducedMotion={prefersReducedMotion}
            id="consent"
            aria-labelledby="consent-heading"
          >
            <div className="p-5 sm:p-6">
              <CardHeading id="consent-heading" icon={CheckCircle2}>
                Consent
              </CardHeading>
              <GoldDivider />
              <Body>
                By using this website and submitting information through our
                forms, you consent to the collection and use of information as
                described in this Privacy Policy.
              </Body>
            </div>
          </BentoCard>

          {/* ── 11. Contact Card (full width) ── */}
          <BentoCard
            index={10}
            prefersReducedMotion={prefersReducedMotion}
            className="md:col-span-2 lg:col-span-3"
            id="contact-us"
            aria-labelledby="contact-heading"
            style={{
              ...cardBase,
              background:
                "linear-gradient(145deg, var(--gradient-card-top) 0%, rgba(24,16,4,0.98) 100%)",
              boxShadow:
                "0 16px 60px rgba(0,0,0,0.8), 0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 var(--highlight-card)",
            }}
          >
            {/* Gold top-edge shimmer — brighter on contact card */}
            <div
              className="absolute inset-x-0 top-0 h-px pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(90deg, transparent 5%, var(--gold) 50%, transparent 95%)",
                opacity: 0.55,
              }}
              aria-hidden="true"
            />

            <div className="p-5 sm:p-7 md:flex md:items-center md:gap-10">
              {/* Left: brand + label */}
              <div className="shrink-0 mb-5 md:mb-0 flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-[14px] flex items-center justify-center"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--accent-glow-soft) 0%, var(--bg-elevated) 100%)",
                    border: "1px solid var(--border-color)",
                    boxShadow:
                      "0 0 22px var(--gold-glow), inset 0 1px 0 var(--highlight-surface)",
                  }}
                  aria-hidden="true"
                >
                  <Mail
                    size={20}
                    style={{
                      color: "var(--gold)",
                      filter: "drop-shadow(0 0 7px var(--gold-glow))",
                    }}
                  />
                </div>
                <div>
                  <h2
                    id="contact-heading"
                    className="font-playfair text-xl font-bold leading-tight"
                    style={{ color: "var(--text-heading)" }}
                  >
                    Contact Us
                  </h2>
                  <p
                    className="text-xs mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Questions about this policy?
                  </p>
                </div>
              </div>

              {/* Vertical divider (desktop) */}
              <div
                className="hidden md:block w-px self-stretch"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 0%, var(--border-color) 30%, var(--border-color) 70%, transparent 100%)",
                }}
                aria-hidden="true"
              />

              {/* Contact cards row */}
              <div className="flex flex-col sm:flex-row gap-3 flex-1">
                {/* Company */}
                <div
                  className="flex items-center gap-3 flex-1 rounded-[13px] px-4 py-3.5"
                  style={{
                    background: "var(--accent-glow-faint)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                    style={{
                      background: "var(--accent-glow-soft)",
                      border: "1px solid var(--border-color)",
                    }}
                    aria-hidden="true"
                  >
                    <Building2
                      size={14}
                      style={{ color: "var(--gold)" }}
                    />
                  </span>
                  <div>
                    <p
                      className="text-[10px] font-bold tracking-[0.18em] uppercase"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Company
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-heading)" }}
                    >
                      Denver Christmas Lights
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <a
                  href="tel:7202967711"
                  className="group flex items-center gap-3 flex-1 rounded-[13px] px-4 py-3.5 transition-opacity duration-200 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{
                    background: "var(--accent-glow-faint)",
                    border: "1px solid var(--border-color)",
                  }}
                  aria-label="Call Denver Christmas Lights"
                >
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                    style={{
                      background: "var(--accent-glow-soft)",
                      border: "1px solid var(--border-color)",
                    }}
                    aria-hidden="true"
                  >
                    <Phone
                      size={14}
                      style={{
                        color: "var(--gold)",
                        filter: "drop-shadow(0 0 4px var(--gold-glow))",
                      }}
                    />
                  </span>
                  <div>
                    <p
                      className="text-[10px] font-bold tracking-[0.18em] uppercase"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Phone
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-heading)" }}
                    >
                      (720) 296-7711
                    </p>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:mrxmasdecorator@gmail.com"
                  className="group flex items-center gap-3 flex-1 rounded-[13px] px-4 py-3.5 transition-opacity duration-200 hover:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  style={{
                    background: "var(--accent-glow-faint)",
                    border: "1px solid var(--border-color)",
                  }}
                  aria-label="Email Denver Christmas Lights"
                >
                  <span
                    className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200"
                    style={{
                      background: "var(--accent-glow-soft)",
                      border: "1px solid var(--border-color)",
                    }}
                    aria-hidden="true"
                  >
                    <Mail
                      size={14}
                      style={{
                        color: "var(--gold)",
                        filter: "drop-shadow(0 0 4px var(--gold-glow))",
                      }}
                    />
                  </span>
                  <div>
                    <p
                      className="text-[10px] font-bold tracking-[0.18em] uppercase"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Email
                    </p>
                    <p
                      className="text-sm font-semibold"
                      style={{ color: "var(--text-heading)" }}
                    >
                      mrxmasdecorator@gmail.com
                    </p>
                  </div>
                </a>
              </div>
            </div>
          </BentoCard>

        </div>
        {/* ── END BENTO GRID ─────────────────────────────────────────────── */}
      </div>

      <Footer />
      <FloatingCTA />
    </main>
  );
}
