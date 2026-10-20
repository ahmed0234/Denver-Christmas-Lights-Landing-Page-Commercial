import "@/app/landing.css";
import BrandLogo from "@/components/commercial/BrandLogo";
import { Icon, IconSprite, LineIcon } from "@/components/commercial/Icons";
import { PHONE_DISPLAY, PHONE_HREF } from "@/components/commercial/content";
import { montserrat, openSans } from "@/components/commercial/fonts";
import type { Metadata } from "next";
import Link from "next/link";

// The Ads form-submission conversion fires from ./layout.tsx — keep it there.

export const metadata: Metadata = {
  title: "Thank You | Denver Christmas Lights",
  description:
    "Your commercial Christmas lighting quote request was received. Here's what happens next.",
  robots: { index: false, follow: false },
};

const NEXT_STEPS = [
  {
    title: "We Review Your Property",
    text: "We look over your property details, building layout and goals so we understand exactly what your business has in mind.",
  },
  {
    title: "We Give You a Call",
    text: "A member of our team reaches out within 24 hours to answer questions and set up a free walkthrough.",
  },
  {
    title: "You Get Your Lighting Plan",
    text: "We send an itemized proposal with your custom design and pricing, easy to share for approval. No surprises.",
  },
  {
    title: "We Light Up Your Property",
    text: "Once approved, we install around your business hours, keep everything shining all season and take it down in January.",
  },
];

export default function SuccessPage() {
  return (
    <div className={`dcl ty ${montserrat.variable} ${openSans.variable}`}>
      <IconSprite />
      <header>
        <div className="wrap nav">
          <Link href="/" className="brand" aria-label="Denver Christmas Lights home">
            <BrandLogo eager />
            Denver Christmas Lights
          </Link>
          <div className="nav-cta">
            <a href={PHONE_HREF} className="btn btn-outline">
              <LineIcon name="phone" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </header>

      <main className="ty-main">
        <div className="wrap ty-wrap">
          <span className="ty-pill ty-in">
            <i aria-hidden="true" />
            Thanks! We got your request
          </span>
          <h1 className="ty-in" style={{ animationDelay: "60ms" }}>
            Here&rsquo;s What <span>Happens Next.</span>
          </h1>
          <p className="ty-lead ty-in" style={{ animationDelay: "120ms" }}>
            Your free quote request is in. A Denver Christmas Lights commercial
            specialist will review your details and reach out soon to help plan
            your holiday display.
          </p>

          <ol className="ty-steps">
            {NEXT_STEPS.map((s, i) => (
              <li
                key={s.title}
                className="ty-in"
                style={{ animationDelay: `${200 + i * 80}ms` }}
              >
                <span className="ty-num">{String(i + 1).padStart(2, "0")}</span>
                <h2>{s.title}</h2>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>

          <div className="ty-callout ty-in" style={{ animationDelay: "520ms" }}>
            <div className="ty-callout-text">
              <span className="ty-check">
                <Icon name="check" />
              </span>
              <div>
                <h3>No guesswork, no pressure.</h3>
                <p>
                  We&apos;ll keep you updated from the first call to your
                  install date. Have a question about your quote or want to lock
                  in a date sooner? Give us a call.
                </p>
              </div>
            </div>
            <a href={PHONE_HREF} className="ty-call">
              <span className="ty-call-ico">
                <LineIcon name="phone" />
              </span>
              <span>
                <small>Can&apos;t wait? Call us now</small>
                <b>{PHONE_DISPLAY}</b>
              </span>
            </a>
          </div>

          <Link href="/" className="ty-back">
            <Icon name="arrow" />
            Back to home
          </Link>
        </div>
      </main>
    </div>
  );
}
