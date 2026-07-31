"use client";

import type { SVGProps } from "react";

export function ThemeLogoIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      {...props}
      style={{
        filter: "drop-shadow(0 2px 10px var(--accent-glow))",
        ...props.style,
      }}
    >
      <defs>
        {/* Theme-aware primary metallic gradient */}
        <linearGradient id="nav-logo-gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--gold-light)" />
          <stop offset="50%" stopColor="var(--accent)" />
          <stop offset="100%" stopColor="var(--accent-deep)" />
        </linearGradient>
      </defs>

      {/* ── 1. Chimney ── */}
      <path
        d="M 32 16 V 11 H 36 V 20"
        stroke="url(#nav-logo-gold-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── 2. House Outer Silhouette ── */}
      <path
        d="M 8 22 L 24 7 L 40 22 V 43 H 8 Z"
        stroke="url(#nav-logo-gold-grad)"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Inner Bevel Detail for 3D metallic feel */}
      <path
        d="M 10.5 22.8 L 24 10.2 L 37.5 22.8 V 40.5 H 10.5 Z"
        stroke="var(--gold-light)"
        strokeWidth="0.75"
        strokeOpacity="0.45"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── 3. Arched Doorway ── */}
      <path
        d="M 18 43 V 34 C 18 30.6 20.6 28 24 28 C 27.4 28 30 30.6 30 34 V 43"
        stroke="url(#nav-logo-gold-grad)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* ── 4. Tiered Christmas Tree inside House ── */}
      {/* Top Tier */}
      <path d="M 24 15.5 L 19 22 H 29 Z" fill="url(#nav-logo-gold-grad)" opacity="0.95" />
      {/* Middle Tier */}
      <path d="M 24 19.5 L 16 27 H 32 Z" fill="url(#nav-logo-gold-grad)" opacity="0.9" />
      {/* Bottom Tier */}
      <path d="M 24 24.5 L 13 33 H 35 Z" fill="url(#nav-logo-gold-grad)" opacity="0.85" />

      {/* Tree Trunk */}
      <rect x="22.5" y="33" width="3" height="4" rx="0.5" fill="var(--accent-deep)" opacity="0.9" />

      {/* Tree Top Star */}
      <path
        d="M 24 12 L 24.7 13.7 L 26.5 13.7 L 25.1 14.8 L 25.6 16.5 L 24 15.4 L 22.4 16.5 L 22.9 14.8 L 21.5 13.7 L 23.3 13.7 Z"
        fill="var(--gold-light)"
      />

      {/* ── 5. Roof Peak Sparkle & Stars ── */}
      {/* Primary Peak Sparkle */}
      <g transform="translate(24, 5)">
        <path
          d="M 0 -4.5 L 1.2 -1.2 L 4.5 0 L 1.2 1.2 L 0 4.5 L -1.2 1.2 L -4.5 0 L -1.2 -1.2 Z"
          fill="var(--gold-light)"
        />
        <line x1="-8" y1="0" x2="8" y2="0" stroke="var(--gold-light)" strokeWidth="1" opacity="0.9" strokeLinecap="round" />
        <line x1="0" y1="-8" x2="0" y2="8" stroke="var(--gold-light)" strokeWidth="1" opacity="0.9" strokeLinecap="round" />
      </g>

      {/* Secondary Sparkle on Roof Right Slope */}
      <g transform="translate(34, 11)">
        <path
          d="M 0 -2.5 L 0.7 -0.7 L 2.5 0 L 0.7 0.7 L 0 2.5 L -0.7 0.7 L -2.5 0 L -0.7 -0.7 Z"
          fill="var(--gold-light)"
          opacity="0.85"
        />
        <line x1="-4" y1="0" x2="4" y2="0" stroke="var(--gold-light)" strokeWidth="0.8" opacity="0.75" />
      </g>

      {/* Left Wall Sparkle */}
      <g transform="translate(13, 26)">
        <path
          d="M 0 -2 L 0.6 -0.6 L 2 0 L 0.6 0.6 L 0 2 L -0.6 0.6 L -2 0 L -0.6 -0.6 Z"
          fill="var(--gold-light)"
          opacity="0.8"
        />
      </g>
    </svg>
  );
}
