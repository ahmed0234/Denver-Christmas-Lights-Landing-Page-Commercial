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

A lead-generation landing site for a commercial Christmas light installation business in Denver (Next.js 16 App Router, React 19, Tailwind CSS v4, `motion`, `swiper`, `lucide-react`/`react-icons`). Path alias `@/*` maps to the repo root.

The codebase holds **two generations of UI**:

- **Current commercial landing page** (`/` and `/success`): `app/page.tsx` is one large server component that renders every section inline. Its building blocks live in `components/commercial/`, and all copy and data (services, reviews, FAQs, areas, phone number, etc.) live in `components/commercial/content.ts`, so edit content there, not in JSX. Styling is plain CSS in `app/landing.css`, with every rule scoped under the `.dcl` wrapper class and its own CSS variables (`--red`, `--gold`, …) and Montserrat/Open Sans fonts (`components/commercial/fonts.ts`; apply both `.variable`s next to `.dcl`). It doesn't use Tailwind or the theme system. In-page CTAs are plain `#quote` anchor links.
- **Legacy residential components** (top level of `components/`: Navbar, HeroSection, QuoteForm, FloatingCTA, ThemeSwitcher, …) are still used only by `app/privacy-policy/`. They use Tailwind with the theme tokens from `app/globals.css` and the `lib/scrollUtils.ts` scroll/attention flow (`handleGetQuoteClick` → scroll to `#quote` → `quote-form-trigger-attention` event that `components/QuoteForm.tsx` listens for). `app/backup/` holds an old page and isn't wired into the main page.

## Lead flow

1. `components/commercial/QuoteForm.tsx` (`variant="hero"` or the alternate variant; the alternate one prefixes input IDs with `c-`) POSTs JSON to `CONTACT_API_URL` from `lib/api.ts` (`${NEXT_PUBLIC_API_URI}/api/contact`, same origin when unset). The payload is tagged `formType: "commercial"` and includes `firstName`/`lastName` plus a combined `name`, `services[]`, `gclid`, and a `honeypot` (the hidden `company` field). On `{ success: true }` it does `router.push("/success")`.
2. `lib/gclid.ts` captures `?gclid=` from the landing URL into sessionStorage so it survives reloads, and the server re-sanitizes it.
3. `app/api/contact/route.ts` (Node runtime, with CORS + `OPTIONS` because the form may post cross-origin) rejects a filled honeypot, then:
   - routes `formType === "commercial"` payloads to `lib/contact/commercial.ts` (parse/validate, subject, HTML email template);
   - sends anything untagged down the legacy residential path, which accepts field aliases (`name|fullName`, `zip|zipCode`, `propertyType|property_type|type`, `message|comments`).
   Both send via Resend to `lib/contact/recipients.ts` with `replyTo` set to the customer. The sender (`support@ikhtiyaar.com`, a Resend-verified domain) is hardcoded.

Env vars (`.env.local`): `RESEND_API_KEY`; `BUSINESS_EMAIL_1` / `BUSINESS_EMAIL_2`, both optional (blank ones are skipped, legacy `BUSINESS_EMAIL` is a fallback for `_1`, and with neither set the lead is accepted with a server warning but not emailed); `NEXT_PUBLIC_API_URI` (backend origin, inlined at build time); optional `RESEND_INSECURE_TLS=true` (local-dev TLS bypass only).

## Google Ads conversion tracking

- `app/layout.tsx` loads gtag (`AW-959322441`) and the phone-call conversion config.
- `app/success/layout.tsx` fires the form-submission conversion event, so `/success` must only be reached after a successful submit. Keep the event in that layout, not in `page.tsx`.
- `lib/gtag.ts` exposes `reportPhoneConversion()` for click-to-call tracking.

## Theming (legacy routes only)

`app/globals.css` defines the theme colors as CSS variables: `:root` holds "classic", `[data-theme="golden" | "winter" | "emerald"]` override it, and a `@theme inline` block registers them as Tailwind colors (`bg-background-card`, `text-gold`, …). `components/ThemeContext.tsx` (wrapping every route via `app/layout.tsx`) locks the site to `golden`. Use these tokens in the legacy components. The `.dcl` landing CSS is independent of them.

## Images

Images live in `public/` by section folder and are served via `next/image` with AVIF/WebP. `next.config.ts` whitelists `images.qualities` (`[50, 75, 85, 90, 100]`), so any `quality` prop must be one of those values. Remote images are allowed only from `images.unsplash.com`. Static assets get a 1-year immutable cache header, so rename files rather than overwrite them when content changes. `.unused_assets_backup/` holds retired assets and is not served.
