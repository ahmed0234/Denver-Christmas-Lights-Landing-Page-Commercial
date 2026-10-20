import "@/app/landing.css";
import BeforeAfter from "@/components/commercial/BeforeAfter";
import BrandLogo from "@/components/commercial/BrandLogo";
import {
  Icon,
  IconSprite,
  LineIcon,
  Stars,
  Tick,
  type IconName,
} from "@/components/commercial/Icons";
import QuoteForm from "@/components/commercial/QuoteForm";
import SiteHeader from "@/components/commercial/SiteHeader";
import Snowfall from "@/components/commercial/Snowfall";
import StringLights from "@/components/commercial/StringLights";
import {
  AREAS,
  FAQS,
  initials,
  PHONE_DISPLAY,
  PHONE_HREF,
  PROPERTIES,
  REVIEWS,
  SERVICE_DETAILS,
  SERVICES,
  STATS,
  STEPS,
  TRUST,
  WHY,
} from "@/components/commercial/content";
import { montserrat, openSans } from "@/components/commercial/fonts";
import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title:
    "Commercial Christmas Light Installation Denver | Denver Christmas Lights",
  description:
    "Commercial Christmas light installation for Denver businesses, HOAs and property managers. Custom design, insured installation, season-long maintenance and takedown. Get a free quote.",
};

function SectionHead({
  icon,
  pill,
  title,
  children,
}: {
  icon?: ReactNode;
  pill: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="sec-head">
      <span className="pill">
        {icon}
        {pill}
      </span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

function CtaBand({
  image,
  title,
  text,
  primary,
}: {
  image: string;
  title: string;
  text: string;
  primary: string;
}) {
  return (
    <section className="band">
      <div className="band-bg">
        <Image src={image} alt="" fill sizes="100vw" />
      </div>
      <div className="wrap">
        <Icon name="holly" className="holly" />
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="btns">
          <a href="#quote" className="btn btn-white">
            {primary}
          </a>
          <a href={PHONE_HREF} className="btn btn-ghost">
            Call {PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </section>
  );
}

function IconBox({ name }: { name: IconName }) {
  return (
    <span className="ico">
      <Icon name={name} />
    </span>
  );
}

export default function Commercial() {
  return (
    <div className={`dcl ${montserrat.variable} ${openSans.variable}`}>
      <IconSprite />
      <SiteHeader />
      <StringLights />

      {/* HERO */}
      <section className="hero" id="top">
        <Snowfall />
        <div className="wrap">
          <div>
            <div className="badges">
              <span className="badge">
                <Icon name="star" fill="#F0B100" />
                4.9 Rated
              </span>
              <span className="badge">
                <Icon name="shield" fill="none" stroke="#fff" strokeWidth={2} />
                Fully Insured
              </span>
              <span className="badge">
                <Icon
                  name="building"
                  fill="none"
                  stroke="#fff"
                  strokeWidth={2}
                />
                Commercial Specialists
              </span>
            </div>
            <p className="eyebrow">Denver Christmas Lights · Commercial</p>
            <h1>
              <span>Commercial Christmas</span> <span>Lighting in Denver,</span>{" "}
              <span>Built for Business</span>
            </h1>
            <p className="hero-lead">
              Draw more holiday customers, impress tenants and make your
              property the standout on the block, without tying up your staff or
              budget on DIY.
            </p>
            <p className="hero-sub">
              One insured team handles custom design, professional installation,
              season-long maintenance and January takedown. Commercial-grade LED
              lights included, scheduled around your business hours.
            </p>
            <div className="btns">
              <a href={PHONE_HREF} className="btn btn-white">
                <LineIcon name="phone" />
                Call {PHONE_DISPLAY}
              </a>
              <a href="#quote" className="btn btn-ghost">
                Get Free Quote
              </a>
            </div>
            <div className="hero-meta">
              <div className="rating">
                4.9 <Stars />
                <small>average from local client reviews</small>
              </div>
              <div className="checks">
                {[
                  "Free on-site walkthrough",
                  "Maintenance all season",
                  "Certificate of insurance on request",
                ].map((t) => (
                  <span key={t}>
                    <Tick />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="form-card" id="quote">
            <svg
              className="garland"
              viewBox="0 0 300 24"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0 4 Q37 22 75 6 T150 6 T225 6 T300 4"
                stroke="#1E6B3B"
                strokeWidth="3"
                fill="none"
              />
              <circle cx="38" cy="14" r="4" fill="#CC2628" />
              <circle cx="112" cy="13" r="4" fill="#F0B100" />
              <circle cx="188" cy="13" r="4" fill="#CC2628" />
              <circle cx="262" cy="13" r="4" fill="#F0B100" />
            </svg>
            <QuoteForm variant="hero" />
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <div className="trust">
        <div className="wrap">
          {TRUST.map((t) => (
            <div key={t.title} className="trust-item">
              <IconBox name={t.icon} />
              <div>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* INTRO SPLIT */}
      <section className="intro">
        <div className="wrap narrow split">
          <div>
            <h2>Turnkey Holiday Lighting for Denver Businesses</h2>
            <p>
              Denver Christmas Lights is a locally owned holiday lighting
              company that manages every step of your{" "}
              <a href="#services">commercial Christmas light installation</a>.
              One insured crew designs your display, installs it with
              professional clips and commercial-grade LEDs, keeps it running all
              season and takes it down in January.
            </p>
            <p>
              Your staff stays off the ladders, your entrances stay open and
              your property looks polished from the first night of the season.
              One point of contact, one clear proposal and no surprises.
            </p>
            <div className="btns">
              <a href={PHONE_HREF} className="btn btn-red">
                Call {PHONE_DISPLAY}
              </a>
              <a href="#quote" className="btn btn-outline">
                Get Free Quote
              </a>
            </div>
          </div>
          <div className="photo">
            <Image
              src="/BeforeandAfterImages/RestaurantAfter.webp"
              alt="Restaurant entrance lit with warm white Christmas lights, garland and wreaths at night"
              fill
              sizes="(max-width: 1024px) 100vw, 506px"
            />
          </div>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="bg-pink services" id="services">
        <div className="wrap">
          <SectionHead
            icon={<LineIcon name="snow" />}
            pill="Our Services"
            title="Commercial Christmas Lighting for Every Industry"
          >
            From car dealerships and churches to hotels, shopping centers and
            HOAs, we design holiday lighting around your property, your
            customers and your brand.
          </SectionHead>
          <div className="grid3">
            {SERVICES.map((s) => (
              <div key={s.title} className="card svc-card">
                <IconBox name={s.icon} />
                <h3>{s.title}</h3>
                <p>{s.text}</p>
                <ul>
                  {s.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        image="/BeforeandAfterImages/RetailPlazasAfter.webp"
        title="Planning Your Holiday Display? We'll Handle It."
        text="Tell us about your property and get an itemized commercial Christmas lighting quote. Most quotes are ready within a day."
        primary="Get Free Quote"
      />

      {/* REVIEWS */}
      <section id="reviews">
        <div className="wrap">
          <SectionHead
            icon={<Icon name="star" fill="currentColor" />}
            pill="Reviews"
            title="What Our Clients Say"
          >
            Real reviews from Denver-area clients who trust us to make their
            properties shine every holiday season.
          </SectionHead>
          <div className="grid3">
            {REVIEWS.map((r) => (
              <div key={r.name} className="review">
                <div className="review-top">
                  <Stars />
                  <b>{r.rating}</b>
                </div>
                <blockquote>&ldquo;{r.quote}&rdquo;</blockquote>
                <div className="who">
                  <span className="avatar">{initials(r.name)}</span>
                  <div>
                    <strong>{r.name}</strong>
                    <span>{r.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICE DETAILS */}
      <section className="bg-pink">
        <div className="wrap details">
          <aside className="side">
            <h2>Commercial Christmas Light Installation Services</h2>
            <p>Drag the slider on each photo to see the before and after.</p>
            <ol>
              {SERVICE_DETAILS.map((s, i) => (
                <li key={s.id}>
                  <a href={`#${s.id}`}>
                    <span>{i + 1}</span>
                    {s.nav}
                  </a>
                </li>
              ))}
            </ol>
            <a href="#quote" className="btn btn-white">
              Get My Free Quote
            </a>
          </aside>
          <div>
            {SERVICE_DETAILS.map((s, i) => (
              <article key={s.id} className="svc" id={s.id}>
                <div className="svc-head">
                  <span className="num">{i + 1}</span>
                  <h3>{s.title}</h3>
                </div>
                <p>{s.text}</p>
                <BeforeAfter
                  title={s.title}
                  before={s.before}
                  after={s.after}
                />
                {s.faqs.map(([q, a]) => (
                  <details key={q}>
                    <summary>{q}</summary>
                    <div className="body">{a}</div>
                  </details>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHY CHOOSE */}
      <section className="why">
        <div className="wrap">
          <SectionHead
            icon={<LineIcon name="award" />}
            pill="Why Us"
            title="Why Businesses Choose Denver Christmas Lights"
          >
            Commercial holiday lighting that brings in customers, protects your
            property and takes the work off your team&apos;s plate.
          </SectionHead>
          <div className="grid3">
            {WHY.map((w, i) => (
              <div key={w.title} className="card why-card">
                <span className="k">{String(i + 1).padStart(2, "0")}</span>
                <IconBox name={w.icon} />
                <h3>{w.title}</h3>
                <p>{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <div className="strip bg-pink">
        <div className="wrap">
          {STATS.map((s) => (
            <div key={s.title}>
              <IconBox name={s.icon} />
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </div>

      <CtaBand
        image="/BeforeAfter/services/Hoas/after.webp"
        title="Reserve Your Commercial Install Date"
        text="Our calendar fills quickly from October, and commercial projects need time for design and approval. Book early and your lights will be up before your busiest weeks."
        primary="Start My Free Quote"
      />

      {/* HOW IT WORKS */}
      <section className="process" id="process">
        <div className="wrap narrow">
          <SectionHead
            icon={<LineIcon name="snow" />}
            pill="Our Simple Process"
            title="How It Works"
          >
            From walkthrough to glowing storefront, commercial holiday lighting
            in three simple steps.
          </SectionHead>
          <div className="steps">
            <div className="steps-line" aria-hidden="true">
              <span />
            </div>
            {STEPS.map((s, i) => (
              <div key={s.title} className="step">
                <div className="circle">{i + 1}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
        {/* wavy edge into the next section, lined with "bulb" dots */}
        <svg
          className="wave"
          viewBox="0 0 1440 90"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="wave-fill"
            d="M0 42 C180 12 360 72 540 46 S900 16 1080 46 S1320 72 1440 36 V90 H0 Z"
          />
          <path
            className="wave-line"
            d="M0 42 C180 12 360 72 540 46 S900 16 1080 46 S1320 72 1440 36"
          />
        </svg>
      </section>

      {/* PROPERTY TYPES */}
      <section>
        <div className="wrap">
          <SectionHead
            icon={<LineIcon name="building" />}
            pill="Properties We Light"
            title="Holiday Lighting for Every Type of Commercial Property"
          >
            From a single storefront to a multi-building campus, we design a
            display that fits your property and your goals.
          </SectionHead>
          <div className="ind">
            {PROPERTIES.map((p) => (
              <div key={p.title} className="card">
                <IconBox name={p.icon} />
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AREAS */}
      <section className="bg-pink service-areas" id="areas">
        <div className="wrap">
          <SectionHead
            icon={<LineIcon name="pin" />}
            pill="Areas We Serve"
            title="Commercial Holiday Lighting Across the Denver Metro"
          >
            Professional commercial Christmas lighting for businesses, HOAs and
            property managers in Denver and the surrounding communities.
          </SectionHead>
          <div className="areas">
            {AREAS.map((a) => (
              <a key={a} className="area" href="#quote">
                <span className="area-lights" aria-hidden="true" />
                <svg
                  className="area-peaks"
                  viewBox="0 0 200 80"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    className="back"
                    d="M0 80V50l20-12 16 9 26-25 20 16 20-11 24 21 22-23 22 17 30-12v50z"
                  />
                  <path
                    className="front"
                    d="M0 80V62l30-13 22 11 28-16 28 15 26-10 26 14 24-10 16 6v21z"
                  />
                </svg>
                <span className="area-pin">
                  <Icon name="pin" />
                </span>
                <span className="area-name">
                  {a}
                  <small>
                    Get a quote <Icon name="arrow" />
                  </small>
                </span>
              </a>
            ))}
          </div>
          <p className="area-note">
            Don&apos;t see your area listed?{" "}
            <a href="#quote">
              <b>Contact us</b>
            </a>{" "}
            to check service at your property.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-pink" id="faq">
        <div className="wrap">
          <SectionHead pill="FAQ" title="Frequently Asked Questions">
            Everything businesses and property managers ask about our commercial
            Christmas light installation service.
          </SectionHead>
          <div className="faq">
            {FAQS.map(([q, a], i) => (
              <details key={q} open={i === 0}>
                <summary>{q}</summary>
                <div className="body">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        image="/BeforeandAfterImages/shoppingcenterafter.webp"
        title="Focus on Your Business. We'll Light It Up."
        text="Get a professional, worry-free holiday display that works for your property all season long."
        primary="Get My Free Quote"
      />

      <footer>
        <div className="wrap">
          <div className="fcols">
            <div>
              <a href="#top" className="brand">
                <BrandLogo />
                Denver Christmas Lights
              </a>
              <p>
                Professional commercial Christmas light design, installation,
                maintenance and removal for Denver-area businesses.
              </p>
            </div>
            <div>
              <h4>Services</h4>
              <ul>
                <li>
                  <a href="#svc-dealerships">Car Dealerships</a>
                </li>
                <li>
                  <a href="#svc-churches">Churches &amp; Worship</a>
                </li>
                <li>
                  <a href="#svc-hotels">Hotels &amp; Hospitality</a>
                </li>
                <li>
                  <a href="#svc-offices">Office Buildings</a>
                </li>
                <li>
                  <a href="#svc-retail">Retail &amp; Shopping Centers</a>
                </li>
              </ul>
            </div>
            <div>
              <h4>Areas</h4>
              <ul>
                {["Denver", "Aurora", "Lakewood", "Highlands Ranch"].map(
                  (a) => (
                    <li key={a}>
                      <a href="#areas">{a}</a>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div>
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
                </li>
                <li>
                  <a href="#quote">Get a Free Quote</a>
                </li>
                <li>
                  <a href="#faq">FAQ</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="fbottom">
            <span>
              © {new Date().getFullYear()} Denver Christmas Lights. All rights
              reserved.
            </span>
            <span>Fully insured · Locally owned</span>
          </div>
        </div>
      </footer>

      <div className="sticky-call">
        <a href={PHONE_HREF} className="btn btn-outline">
          Call Now
        </a>
        <a href="#quote" className="btn btn-red">
          Free Quote
        </a>
      </div>
    </div>
  );
}
