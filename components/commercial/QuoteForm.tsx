"use client";

import { CONTACT_API_URL } from "@/lib/api";
import { COMMERCIAL_FORM_TYPE } from "@/lib/contact/commercial";
import { readGclid } from "@/lib/gclid";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { PHONE_DISPLAY } from "./content";

const SERVICE_CHIPS = [
  "Rooflines & Facades",
  "Storefront & Entrance",
  "Trees & Grounds",
  "HOA / Community",
  "Multiple Locations",
  "Not Sure Yet",
];

const SERVICE_OPTIONS = [
  "Building Rooflines & Facades",
  "Storefront & Entrance Lighting",
  "Trees & Landscape Lighting",
  "HOA & Community Entrances",
  "Multi-Location / Large Property",
  "Not Sure Yet",
];

type Variant = "hero" | "contact";

const COPY: Record<Variant, { title: string; note: string; submit: string }> = {
  hero: {
    title: "Get Your Free Commercial Quote",
    note: "Itemized pricing for your property. No obligation.",
    submit: "Get My Free Quote",
  },
  contact: {
    title: "Request a Commercial Quote",
    note: "We'll reply with itemized pricing for your property.",
    submit: "Send Request",
  },
};

/** Posts to ${NEXT_PUBLIC_API_URI}/api/contact and redirects to /success (which fires the Ads conversion). */
export default function QuoteForm({ variant }: { variant: Variant }) {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const gclidRef = useRef<HTMLInputElement>(null);
  const id = (field: string) => (variant === "hero" ? field : `c-${field}`);
  const copy = COPY[variant];

  // Google Ads click ID from the landing URL (?gclid=...), kept in a hidden input
  useEffect(() => {
    if (gclidRef.current) gclidRef.current.value = readGclid();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    const field = (name: string) => String(data.get(name) ?? "").trim();
    const service = field("service");
    const services =
      variant === "hero"
        ? data.getAll("svc").map(String)
        : service && service !== "Choose one"
          ? [service]
          : [];

    setSubmitting(true);
    try {
      const res = await fetch(CONTACT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: COMMERCIAL_FORM_TYPE,
          firstName: field("first_name"),
          lastName: field("last_name"),
          // Lets a backend without the commercial handler still accept the lead
          name: `${field("first_name")} ${field("last_name")}`.trim(),
          email: field("email"),
          phone: field("phone"),
          business: field("business"),
          zip: field("zip"),
          services,
          message: field("message"),
          gclid: field("gclid") || null,
          honeypot: field("company"),
        }),
      });
      const result = await res.json().catch(() => ({}));
      if (res.ok && result.success) {
        router.push("/success");
        return;
      }
      setError(
        result.error ||
          "Something went wrong. Please try again or call us directly.",
      );
    } catch {
      setError(
        `Network error. Please try again or call us at ${PHONE_DISPLAY}.`,
      );
    }
    setSubmitting(false);
  };

  return (
    <form className="qform" onSubmit={handleSubmit}>
      <h2>{copy.title}</h2>
      <p className="note">{copy.note}</p>
      <div className="fgrid">
        <div>
          <label htmlFor={id("fn")}>First name *</label>
          <input
            id={id("fn")}
            name="first_name"
            required
            autoComplete="given-name"
            placeholder="First name"
          />
        </div>
        <div>
          <label htmlFor={id("ln")}>Last name *</label>
          <input
            id={id("ln")}
            name="last_name"
            required
            autoComplete="family-name"
            placeholder="Last name"
          />
        </div>
        <div>
          <label htmlFor={id("em")}>Work email *</label>
          <input
            id={id("em")}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
          />
        </div>
        <div>
          <label htmlFor={id("ph")}>Phone *</label>
          <input
            id={id("ph")}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="(720) 000-0000"
          />
        </div>
        <div className={variant === "hero" ? undefined : "full"}>
          <label htmlFor={id("biz")}>Business or property name</label>
          <input
            id={id("biz")}
            name="business"
            autoComplete="organization"
            placeholder="Business or property"
          />
        </div>
        {variant === "hero" ? (
          <>
            <div>
              <label htmlFor="zip">ZIP code *</label>
              <input
                id="zip"
                name="zip"
                inputMode="numeric"
                required
                autoComplete="postal-code"
                placeholder="80202"
              />
            </div>
            <div className="full">
              <label>Services needed</label>
              <div className="chips">
                {SERVICE_CHIPS.map((label) => (
                  <label key={label} className="chip">
                    <input type="checkbox" name="svc" value={label} />
                    <span>{label}</span>
                  </label>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="full">
            <label htmlFor="c-sv">Service needed</label>
            <select id="c-sv" name="service" defaultValue="Choose one">
              <option>Choose one</option>
              {SERVICE_OPTIONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        )}
        <div className="full">
          <label htmlFor={id("msg")}>Message</label>
          <textarea
            id={id("msg")}
            name="message"
            placeholder={
              variant === "hero"
                ? "Tell us about your property, number of buildings and ideal install date..."
                : "Tell us about your property..."
            }
          />
        </div>
      </div>
      {/* Honeypot: hidden from people, filled in by bots */}
      <div className="hp" aria-hidden="true">
        <input name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="gclid" ref={gclidRef} defaultValue="" />
      <button className="btn btn-red" type="submit" disabled={submitting}>
        {submitting ? "Sending..." : copy.submit}
      </button>
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      {variant === "hero" && (
        <p className="privacy">
          We respect your privacy. Your information is never shared.
        </p>
      )}
    </form>
  );
}
