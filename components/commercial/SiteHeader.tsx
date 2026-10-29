"use client";

import { useState } from "react";
import BrandLogo from "./BrandLogo";
import { LineIcon } from "./Icons";
import { PHONE_DISPLAY, PHONE_HREF } from "./content";

const LINKS = [
  ["#services", "Services"],
  ["#work", "Our Work"],
  ["#process", "How It Works"],
  ["#reviews", "Reviews"],
  ["#areas", "Service Areas"],
  ["#faq", "FAQ"],
] as const;

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header>
      <div className="wrap nav">
        <a href="#top" className="brand" aria-label="Denver Christmas Lights home">
          <BrandLogo eager />
          Denver Christmas Lights
        </a>
        <ul className="menu">
          {LINKS.map(([href, label]) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
        <div className="nav-cta">
          <a
            href={PHONE_HREF}
            className="btn btn-outline"
            aria-label={`Call ${PHONE_DISPLAY}`}
          >
            <LineIcon name="phone" />
            <span className="nav-phone">{PHONE_DISPLAY}</span>
          </a>
          <a href="#quote" className="btn btn-red">
            <LineIcon name="cal" />
            GET FREE QUOTE
          </a>
        </div>
        <button
          className="burger"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
      <nav className={`mobile-menu${open ? " open" : ""}`} aria-label="Mobile">
        {LINKS.map(([href, label]) => (
          <a key={href} href={href} onClick={close}>
            {label}
          </a>
        ))}
        <a href={PHONE_HREF} onClick={close}>
          Call {PHONE_DISPLAY}
        </a>
      </nav>
    </header>
  );
}
