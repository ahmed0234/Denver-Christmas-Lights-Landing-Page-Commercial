# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `npm run dev` — dev server on http://localhost:3000
- `npm run build` — production build. Note `next.config.ts` sets `typescript.ignoreBuildErrors: true`, so the build does **not** catch type errors; run `npx tsc --noEmit` to type-check.
- `npm run lint` — ESLint 9 flat config (`eslint-config-next` core-web-vitals + typescript)
- No test suite exists.

Both `package-lock.json` and `bun.lock` are committed; npm scripts work with either.

## What this is

A single-page lead-generation landing site for a commercial Christmas light installation business in Denver (Next.js 16 App Router, React 19, Tailwind CSS v4, `motion` for animation, `swiper` for carousels, `lucide-react`/`react-icons` for icons).

- `app/page.tsx` composes the whole homepage from section components in `components/` (Navbar → Hero → Before/After → Services → Areas → Process → WhyChooseUs → Reviews → FAQ → FinalCTA → Footer, plus `FloatingCTA`).
- Other routes: `app/privacy-policy/`, `app/success/` (post-submission thank-you page), and `app/api/contact/route.ts`.
- Path alias `@/*` maps to the repo root.

## Lead flow (cross-file)

1. Every "Get Free Quote" CTA calls `handleGetQuoteClick` from `lib/scrollUtils.ts`, which scrolls to the element `#quote` (fallback `#quote-form-container`) with a 90px header offset, then dispatches a `quote-form-trigger-attention` window event.
2. `components/QuoteForm.tsx` (rendered inside `HeroSection`) listens for that event to play its attention animation and focus `#quote-name`. Keep these IDs/event name in sync if renaming.
3. The form POSTs JSON to `/api/contact`, then `router.push("/success")`. The commercial form (`components/commercial/QuoteForm.tsx`) posts to `${NEXT_PUBLIC_API_URI}/api/contact` via `lib/api.ts` and tags its payload `formType: "commercial"`; the route hands those to `lib/contact/commercial.ts` (own fields: firstName/lastName, phone, business, services[], zip, message; own email template). Untagged payloads take the residential path below.
4. `app/api/contact/route.ts` (Node runtime) checks a `honeypot` field, validates name/email, accepts several field-name aliases (`name|fullName`, `zip|zipCode`, `propertyType|property_type|type`, `message|comments`), and sends an HTML notification via Resend to the recipients from `lib/contact/recipients.ts` with `replyTo` set to the customer. Sender mailbox is hardcoded (`support@ikhtiyaar.com`, a Resend-verified domain).

Env vars (`.env.local`): `RESEND_API_KEY`; `BUSINESS_EMAIL_1` / `BUSINESS_EMAIL_2`, both optional (blank ones are skipped, legacy `BUSINESS_EMAIL` is a fallback for `_1`, and with neither set the lead is accepted with a server warning but not emailed); `NEXT_PUBLIC_API_URI` (backend origin, inlined at build time; unset means same origin); optional `RESEND_INSECURE_TLS=true` (local-dev TLS bypass only).

## Google Ads conversion tracking

- `app/layout.tsx` loads gtag (`AW-959322441`) and phone-call conversion config.
- `app/success/layout.tsx` fires the form-submission conversion event — so `/success` must only be reached after a successful submit.
- `lib/gtag.ts` exposes `reportPhoneConversion()` for click-to-call tracking.

## Theming

- Colors are CSS variables defined in `app/globals.css`: `:root` holds the "classic" theme, and `[data-theme="golden" | "winter" | "emerald"]` blocks override them. A `@theme inline` block at the bottom registers them as Tailwind colors (e.g. `bg-background-card`, `text-gold`, `text-heading`; both kebab and camelCase aliases exist).
- `components/ThemeContext.tsx` sets `data-theme` on `<html>`. The site is currently locked to `golden` (`getStoredTheme` only honors "golden", and `layout.tsx` sets `data-theme="golden"`); the other themes and `ThemeSwitcher` remain but aren't active. Use theme variables/tokens rather than hardcoded colors so all themes keep working.

## Images

Images live in `public/` by section folder and are served via `next/image` with AVIF/WebP. `next.config.ts` whitelists `images.qualities` (`[50, 75, 85, 90, 100]`) — any `quality` prop must be one of those values. Static assets get a 1-year immutable cache header, so rename files rather than overwrite them when content changes. `.unused_assets_backup/` holds retired assets and is not served.
