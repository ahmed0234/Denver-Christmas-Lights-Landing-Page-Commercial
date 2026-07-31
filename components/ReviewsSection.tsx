"use client";

/**
 * ReviewsSection.tsx
 * "What Denver Homeowners Say" — Luxury Testimonials Carousel Section.
 *
 * Responsive Breakpoints:
 * - Desktop (1280px+): 4 cards
 * - Large Tablet (1024px - 1279px): 3 cards
 * - Tablet (640px - 1023px): 2 cards
 * - Mobile (< 640px): 1 card
 */

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "motion/react";
import { Star, User, ChevronLeft, ChevronRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// ─── Particle & Snowfall Data ──────────────────────────────────────────────────

const SNOWFLAKES = [
  { id: 1, left: "6%", top: "10%", size: "14px", dur: "7s", delay: "0s", opacity: 0.5 },
  { id: 2, left: "18%", top: "25%", size: "10px", dur: "9s", delay: "1.2s", opacity: 0.4 },
  { id: 3, left: "32%", top: "8%", size: "16px", dur: "8s", delay: "2.5s", opacity: 0.6 },
  { id: 4, left: "48%", top: "18%", size: "12px", dur: "10s", delay: "0.5s", opacity: 0.35 },
  { id: 5, left: "64%", top: "12%", size: "15px", dur: "7.5s", delay: "3s", opacity: 0.55 },
  { id: 6, left: "78%", top: "22%", size: "11px", dur: "8.5s", delay: "1.8s", opacity: 0.45 },
  { id: 7, left: "90%", top: "15%", size: "14px", dur: "9.5s", delay: "0.8s", opacity: 0.5 },
  { id: 8, left: "12%", top: "65%", size: "12px", dur: "8s", delay: "2s", opacity: 0.4 },
  { id: 9, left: "85%", top: "70%", size: "13px", dur: "7s", delay: "1s", opacity: 0.45 },
];

const BOKEH_LIGHTS = [
  { id: 1, left: "8%", top: "18%", size: "100px", color: "var(--gold-glow)", opacity: 0.15 },
  { id: 2, left: "82%", top: "22%", size: "140px", color: "var(--accent-glow)", opacity: 0.2 },
  { id: 3, left: "45%", top: "75%", size: "120px", color: "var(--gold-glow)", opacity: 0.12 },
  { id: 4, left: "92%", top: "68%", size: "90px", color: "var(--accent-glow)", opacity: 0.18 },
];

// ─── Testimonials Data ────────────────────────────────────────────────────────

interface ReviewItem {
  id: number;
  name: string;
  location: string;
  rating: number;
  text: string;
  avatar: string;
}

const REVIEWS: ReviewItem[] = [
  {
    id: 1,
    name: "Jessica M.",
    location: "Highlands Ranch, CO",
    rating: 5.0,
    text: "The team did an amazing job with our Christmas lights! The installation was flawless, and their attention to detail made our home the best on the block. Professional & on time!",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=250&q=80",
  },
  {
    id: 2,
    name: "Brandon T.",
    location: "Parker, CO",
    rating: 4.9,
    text: "Super reliable and great communication from start to finish. They showed up when they said they would, and our lights look absolutely stunning. Highly recommend!",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80",
  },
  {
    id: 3,
    name: "Melissa & Jason R.",
    location: "Greenwood Village, CO",
    rating: 4.8,
    text: "I love that they handle everything installation, maintenance, and takedown. When a bulb went out, they responded the same day. Beautiful work all season long!",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80",
  },
  {
    id: 4,
    name: "David & Karen K.",
    location: "Cherry Creek, Denver",
    rating: 5.0,
    text: "Top tier service! They customized the roofline lighting perfectly to fit our home's architecture. Takedown and storage in January was seamless. Worth every penny.",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80",
  },
  {
    id: 5,
    name: "Sarah P.",
    location: "Castle Pines, CO",
    rating: 4.9,
    text: "From initial design to final glowing lights, everything was handled with perfection. Our kids were thrilled, and neighbors kept complimenting the display!",
    avatar:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80",
  },
  {
    id: 6,
    name: "Michael & Elena B.",
    location: "Wash Park, Denver",
    rating: 4.8,
    text: "Prompt, safe, and professional installation. The warm gold glow on our roofline created a holiday atmosphere that exceeded all expectations.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=250&q=80",
  },
  {
    id: 7,
    name: "Robert H.",
    location: "Littleton, CO",
    rating: 4.9,
    text: "Extremely impressive attention to detail. No visible clips, straight lines, and hassle-free post-season removal. Will definitely use them every year!",
    avatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=250&q=80",
  },
];

// ─── Animation Variants ───────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1], delay },
  }),
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function ReviewsSection() {
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-60px" });

  const [swiperRef, setSwiperRef] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section
      ref={containerRef}
      id="reviews"
      className="relative w-full overflow-hidden py-8 sm:py-10 lg:py-8 font-sans"
      aria-label="Customer Reviews"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* ── Background Image Layer ───────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Image
          src="/ReviewTestimonial/ReviewsBackground.webp"
          alt=""
          fill
          priority
          className="object-cover object-center lg:object-right opacity-85 sm:opacity-90 saturate-110 contrast-105 brightness-95"
          quality={95}
        />

        {/* Lighter, Natural Radial Overlay so House & Lights Shine Brightly */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 30%, color-mix(in srgb, var(--bg-primary, #080807) 35%, transparent) 0%, color-mix(in srgb, var(--bg-primary, #080807) 65%, transparent) 60%, var(--bg-primary, #080807) 100%)",
          }}
        />

        {/* Linear Edge Fades */}
        <div
          className="absolute inset-x-0 top-0 h-20 sm:h-24"
          style={{
            background:
              "linear-gradient(180deg, var(--bg-primary, #080807) 0%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28 sm:h-32"
          style={{
            background:
              "linear-gradient(0deg, var(--bg-primary, #080807) 0%, transparent 100%)",
          }}
        />
      </div>

      {/* ── Winter Atmosphere: Soft Snowflakes & Golden Bokeh Glares ────── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {/* Soft Golden Bokeh Orbs */}
        {BOKEH_LIGHTS.map((bokeh) => (
          <div
            key={bokeh.id}
            className="absolute rounded-full blur-2xl animate-pulse"
            style={{
              left: bokeh.left,
              top: bokeh.top,
              width: bokeh.size,
              height: bokeh.size,
              background: bokeh.color,
              opacity: bokeh.opacity,
              animationDuration: "4s",
            }}
          />
        ))}

        {/* Falling Snowflakes */}
        {SNOWFLAKES.map((flake) => (
          <div
            key={flake.id}
            className="absolute text-white/70 select-none animate-bounce"
            style={{
              left: flake.left,
              top: flake.top,
              fontSize: flake.size,
              opacity: flake.opacity,
              animationDuration: flake.dur,
              animationDelay: flake.delay,
              filter: "drop-shadow(0 0 4px rgba(255,255,255,0.6))",
            }}
          >
            ❄
          </div>
        ))}
      </div>

      {/* ── Content Container (Matching Page Container Width & Padding) ───── */}
      <div className="relative z-10 w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
        
        {/* ── SECTION HEADER ────────────────────────────────────────────── */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-14 lg:mb-16">
          
          {/* Eyebrow Badge */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={0}
            className="flex flex-col items-center gap-1.5"
          >
            <div className="flex items-center gap-3">
              <div
                className="h-px w-8 sm:w-12"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, var(--accent) 100%)",
                }}
              />
              <span
                className="text-[11px] sm:text-xs font-bold tracking-[0.25em] uppercase"
                style={{ color: "var(--accent)" }}
              >
                REVIEWS
              </span>
              <div
                className="h-px w-8 sm:w-12"
                style={{
                  background:
                    "linear-gradient(90deg, var(--accent) 0%, transparent 100%)",
                }}
              />
            </div>

            {/* Tiny Golden Ornament */}
            <div className="text-[11px] leading-none" style={{ color: "var(--accent)" }}>
              ✻
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={0.1}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl 2xl:text-7xl font-bold tracking-tight mt-3 mb-4 leading-[1.15]"
            style={{
              fontFamily: "var(--font-playfair, Georgia, serif)",
              color: "var(--text-heading)",
            }}
          >
            What Denver
            <br />
            <span
              style={{
                background: "var(--gradient-accent-text)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                filter: "drop-shadow(0 2px 16px var(--accent-glow-soft))",
              }}
            >
              Homeowners Say
            </span>
          </motion.h2>

          {/* Supporting Text */}
          <motion.p
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeUp}
            custom={0.18}
            className="text-xs sm:text-sm md:text-base leading-relaxed max-w-[42ch]"
            style={{ color: "var(--text-muted)" }}
          >
            Real reviews from real Denver families who trust us to make their
            homes shine bright every holiday season.
          </motion.p>
        </div>

        {/* ── TESTIMONIALS SWIPER CAROUSEL ────────────────────────────────── */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          custom={0.25}
          className="w-full relative px-0"
        >
          {/* Custom Navigation Arrows (Desktop Only) */}
          <button
            onClick={() => swiperRef?.slidePrev()}
            aria-label="Previous Review"
            className="hidden lg:flex absolute -left-5 xl:-left-7 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 group cursor-pointer"
            style={{
              borderColor: "var(--border-color)",
              background: "var(--bg-glass-card)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <ChevronLeft
              size={18}
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
              style={{ color: "var(--accent)" }}
            />
          </button>

          <button
            onClick={() => swiperRef?.slideNext()}
            aria-label="Next Review"
            className="hidden lg:flex absolute -right-5 xl:-right-7 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 group cursor-pointer"
            style={{
              borderColor: "var(--border-color)",
              background: "var(--bg-glass-card)",
              boxShadow: "var(--shadow-card)",
            }}
          >
            <ChevronRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-0.5"
              style={{ color: "var(--accent)" }}
            />
          </button>

          <Swiper
            onSwiper={setSwiperRef}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            modules={[Autoplay, Pagination, Navigation]}
            loop={true}
            speed={700}
            autoplay={{
              delay: 3200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            spaceBetween={16}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 14 },
              640: { slidesPerView: 2, spaceBetween: 16 },
              1024: { slidesPerView: 3, spaceBetween: 18 },
              1280: { slidesPerView: 4, spaceBetween: 20 },
            }}
            className="w-full !pb-10"
          >
            {REVIEWS.map((review) => (
              <SwiperSlide key={review.id} className="h-full py-2">
                <div
                  className="group relative h-full flex flex-col justify-between p-5 sm:p-6 md:p-6 lg:p-6 xl:p-7 rounded-2xl sm:rounded-3xl border transition-all duration-500 cursor-grab active:cursor-grabbing select-none hover:scale-[1.02] hover:-translate-y-1"
                  style={{
                    borderColor: "var(--border-color)",
                    background: "var(--bg-glass-card)",
                    boxShadow: "var(--shadow-card)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                  }}
                >
                  {/* Subtle Hover Glow Border */}
                  <div
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
                    style={{
                      boxShadow: "inset 0 0 0 1.5px var(--accent)",
                    }}
                  />

                  {/* Ambient Background Glow on Hover */}
                  <div
                    className="absolute inset-0 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-15 transition-opacity duration-500 pointer-events-none blur-xl"
                    style={{ background: "var(--accent-glow)" }}
                  />

                  <div>
                    {/* Top Row: Numeric Rating + Rating Stars */}
                    <div className="flex items-center justify-between mb-4 sm:mb-5 z-10 relative">
                      <div className="flex items-center gap-2">
                        <span
                          className="text-sm sm:text-base font-bold tracking-tight"
                          style={{ color: "var(--accent)" }}
                        >
                          {review.rating.toFixed(1)}
                        </span>

                        <div className="flex items-center gap-0.5 sm:gap-1">
                          {[...Array(5)].map((_, i) => {
                            const isFull = i < Math.floor(review.rating);
                            const isPartial = !isFull && i < review.rating;
                            return (
                              <Star
                                key={i}
                                size={14}
                                className={isFull || isPartial ? "fill-current" : "opacity-35"}
                                style={{
                                  color: "var(--accent)",
                                  filter: isFull || isPartial ? "drop-shadow(0 0 4px var(--accent-glow))" : "none",
                                }}
                              />
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Review Content Body — Larger font for high legibility */}
                    <p
                      className="text-sm sm:text-sm md:text-[15px] leading-relaxed mb-6 z-10 relative font-normal"
                      style={{ color: "var(--text-body)" }}
                    >
                      &ldquo;{review.text}&rdquo;
                    </p>
                  </div>

                  {/* Bottom Divider & Author Info */}
                  <div className="z-10 relative mt-auto">
                    <div
                      className="h-px w-full mb-4 sm:mb-5"
                      style={{
                        background:
                          "linear-gradient(90deg, var(--border-color) 0%, transparent 100%)",
                      }}
                    />
                    <div className="flex items-center gap-3 sm:gap-3.5">
                      {/* Avatar Circle with Unsplash Profile Photo */}
                      <div
                        className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-full border overflow-hidden shrink-0 shadow-md transition-transform duration-300 group-hover:scale-105"
                        style={{
                          borderColor: "var(--border-color)",
                          boxShadow: "0 0 10px var(--accent-glow-faint)",
                        }}
                      >
                        <Image
                          src={review.avatar}
                          alt={review.name}
                          fill
                          sizes="(max-width: 640px) 36px, 40px"
                          className="object-cover object-center"
                          loading="lazy"
                        />
                      </div>

                      {/* Name & Location — Larger text & enhanced hierarchy */}
                      <div className="flex flex-col min-w-0">
                        <span
                          className="text-xs sm:text-sm md:text-[15px] font-bold tracking-wide leading-tight truncate"
                          style={{ color: "var(--text-heading)" }}
                        >
                          {review.name}
                        </span>
                        <span
                          className="text-xs sm:text-xs md:text-sm mt-1 leading-none truncate"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {review.location}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* ── CUSTOM GOLDEN PAGINATION CONTROLS ───────────────────────────── */}
          <div className="flex items-center justify-center gap-3 mt-4">
            <div
              className="h-px w-8 sm:w-16"
              style={{
                background: "linear-gradient(90deg, transparent, var(--border-color))",
              }}
            />

            <div className="flex items-center gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => swiperRef?.slideToLoop(i)}
                  aria-label={`Go to review ${i + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    activeIndex % REVIEWS.length === i
                      ? "w-6 sm:w-8"
                      : "w-2 hover:opacity-80"
                  }`}
                  style={{
                    background:
                      activeIndex % REVIEWS.length === i
                        ? "var(--accent)"
                        : "var(--border-color)",
                    boxShadow:
                      activeIndex % REVIEWS.length === i
                        ? "0 0 10px var(--accent-glow)"
                        : "none",
                  }}
                />
              ))}
            </div>

            <div
              className="h-px w-8 sm:w-16"
              style={{
                background: "linear-gradient(90deg, var(--border-color), transparent)",
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* ── BOTTOM DECORATIVE GOLDEN CURVE ─────────────────────────────────── */}
      <div className="relative w-full mt-10 sm:mt-14 pointer-events-none">
        <svg
          viewBox="0 0 1440 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-6 sm:h-10 preserve-3d"
        >
          <path
            d="M0 24C360 42 1080 42 1440 24"
            stroke="url(#gold-curve-gradient)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <defs>
            <linearGradient
              id="gold-curve-gradient"
              x1="0"
              y1="0"
              x2="1440"
              y2="0"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0" />
              <stop offset="25%" stopColor="var(--accent)" stopOpacity="0.4" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.9" />
              <stop offset="75%" stopColor="var(--accent)" stopOpacity="0.4" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
}
