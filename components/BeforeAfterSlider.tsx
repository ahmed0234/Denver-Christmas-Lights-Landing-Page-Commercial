"use client";

/**
 * BeforeAfterSlider.tsx
 * Ultra-performance, zero-jank Before & After image comparison slider.
 *
 * Performance Architecture:
 * 1. Zero React Re-Renders During Dragging:
 *    Drag movements update CSS custom property `--slider-pos` directly on the container via
 *    requestAnimationFrame. React does not re-render the component tree on pointermove.
 * 2. Layout Thrashing Elimination:
 *    Container geometry (getBoundingClientRect) is measured ONCE on pointerdown and cached in a ref.
 *    Pointermove performs pure arithmetic with zero synchronous reflows.
 * 3. Unified Pointer Events & Capture:
 *    Uses modern Pointer Events (`setPointerCapture`) for instant, unified touch, mouse, and pen handling.
 *    Dragging never gets lost even if moving fast or outside the container.
 * 4. Touch-Action Optimization:
 *    `touch-action: none` prevents mobile browsers from delaying, fighting, or canceling drag gestures
 *    for native vertical scrolling.
 * 5. GPU Compositing:
 *    The clipped before image uses `will-change: clip-path` and GPU `inset()`.
 *    Divider and handle use `translate3d` on dedicated composite layers.
 * 6. Image Clarity:
 *    Next.js `<Image fill quality={85} />` with exact responsive sizes. No canvas scaling or blur.
 */

import { useRef, useEffect, useState, useCallback, memo } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt: string;
  afterAlt: string;
  badgePosition?: "top" | "bottom";
  sizes?: string;
  handleSize?: "sm" | "md";
  initialPos?: number;
  className?: string;
}

export const BeforeAfterSlider = memo(function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  badgePosition = "top",
  sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw",
  handleSize = "md",
  initialPos = 50,
  className = "",
}: BeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const rectRef = useRef<{ left: number; width: number }>({ left: 0, width: 0 });
  const posRef = useRef(initialPos);
  const rafId = useRef<number | null>(null);

  // Accessible state (only updated on drag end or keyboard interaction to avoid render spam)
  const [ariaPos, setAriaPos] = useState(initialPos);

  // Helper to schedule a CSS custom property update on the container
  const scheduleCssUpdate = useCallback((percentage: number) => {
    posRef.current = percentage;
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        if (containerRef.current) {
          containerRef.current.style.setProperty("--slider-pos", `${posRef.current}%`);
        }
      });
    }
  }, []);

  // Compute position from a clientX coordinate using cached rect
  const handleClientX = useCallback(
    (clientX: number) => {
      const { left, width } = rectRef.current;
      if (width <= 0) return;
      const raw = ((clientX - left) / width) * 100;
      const clamped = Math.max(0, Math.min(100, raw));
      scheduleCssUpdate(clamped);
    },
    [scheduleCssUpdate],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      // Only respond to primary button (left mouse click or touch)
      if (e.button !== 0) return;

      const container = containerRef.current;
      if (!container) return;

      isDragging.current = true;

      // Lock pointer events to this container
      try {
        container.setPointerCapture(e.pointerId);
      } catch {
        // Fallback for browsers with strict capture rules
      }

      // Measure ONCE at drag start to completely avoid layout thrashing during drag
      const rect = container.getBoundingClientRect();
      rectRef.current = { left: rect.left, width: rect.width };

      handleClientX(e.clientX);
    },
    [handleClientX],
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      handleClientX(e.clientX);
    },
    [handleClientX],
  );

  const onPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDragging.current) return;
      isDragging.current = false;

      const container = containerRef.current;
      if (container) {
        try {
          if (container.hasPointerCapture(e.pointerId)) {
            container.releasePointerCapture(e.pointerId);
          }
        } catch {
          // Silent catch
        }
      }

      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }

      // Final synchronization
      if (container) {
        container.style.setProperty("--slider-pos", `${posRef.current}%`);
      }
      setAriaPos(Math.round(posRef.current));
    },
    [],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        e.preventDefault();
        const delta = e.key === "ArrowLeft" ? -4 : 4;
        const next = Math.max(0, Math.min(100, posRef.current + delta));
        posRef.current = next;
        if (containerRef.current) {
          containerRef.current.style.setProperty("--slider-pos", `${next}%`);
        }
        setAriaPos(Math.round(next));
      }
    },
    [],
  );

  // Cleanup pending RAF on unmount
  useEffect(() => {
    return () => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full select-none overflow-hidden cursor-col-resize touch-none bg-[#14110e] ${className}`}
      style={
        {
          "--slider-pos": `${initialPos}%`,
          touchAction: "none",
          userSelect: "none",
          WebkitUserSelect: "none",
        } as React.CSSProperties
      }
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={ariaPos}
      aria-label="Before and after comparison slider"
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      {/* ── Base "After" Image (Underneath, full size) ── */}
      <Image
        src={afterImage}
        alt={afterAlt}
        fill
        sizes={sizes}
        className="object-cover pointer-events-none select-none"
        draggable={false}
        loading="lazy"
        quality={85}
      />

      {/* ── Top "Before" Image (Clipped via GPU clip-path, zero React re-renders) ── */}
      <div
        className="absolute inset-0 pointer-events-none will-change-[clip-path]"
        style={{
          clipPath: "inset(0 calc(100% - var(--slider-pos, 50%)) 0 0)",
          WebkitClipPath: "inset(0 calc(100% - var(--slider-pos, 50%)) 0 0)",
        }}
      >
        <Image
          src={beforeImage}
          alt={beforeAlt}
          fill
          sizes={sizes}
          className="object-cover pointer-events-none select-none"
          draggable={false}
          loading="lazy"
          quality={85}
        />
      </div>

      {/* ── Vertical Divider Line (GPU Translated) ── */}
      <div
        className="absolute top-0 bottom-0 w-[2px] pointer-events-none will-change-[left]"
        style={{
          left: "var(--slider-pos, 50%)",
          transform: "translate3d(-50%, 0, 0)",
          background:
            "linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.92) 15%, rgba(255,255,255,0.92) 85%, rgba(255,255,255,0) 100%)",
        }}
      />

      {/* ── Circular Center Drag Handle ── */}
      <div
        className="absolute top-1/2 z-10 pointer-events-none will-change-[left]"
        style={{
          left: "var(--slider-pos, 50%)",
          transform: "translate3d(-50%, -50%, 0)",
        }}
      >
        <div
          className={`${
            handleSize === "sm" ? "w-8 h-8" : "w-9 h-9"
          } rounded-full flex items-center justify-center transition-transform duration-150 active:scale-95`}
          style={{
            background: "rgba(255,255,255,0.96)",
            boxShadow:
              "0 2px 16px rgba(0,0,0,0.65), 0 0 0 1.5px rgba(255,255,255,0.4)",
          }}
        >
          <ChevronLeft
            size={handleSize === "sm" ? 10 : 11}
            className="text-neutral-700"
            style={{ marginRight: "-1px" }}
          />
          <ChevronRight
            size={handleSize === "sm" ? 10 : 11}
            className="text-neutral-700"
            style={{ marginLeft: "-1px" }}
          />
        </div>
      </div>

      {/* ── Labels / Badges ── */}
      {badgePosition === "top" ? (
        <>
          <div
            className="absolute top-3 left-3 px-2.5 py-1 rounded text-xs font-semibold text-white tracking-wide pointer-events-none z-10"
            style={{
              background: "rgba(10,8,8,0.72)",
              backdropFilter: "blur(6px)",
              WebkitBackdropFilter: "blur(6px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Before
          </div>
          <div
            className="absolute top-3 right-3 px-2.5 py-1 rounded text-xs font-semibold text-white tracking-wide pointer-events-none z-10"
            style={{
              background: "var(--accent)",
              boxShadow: "0 2px 8px var(--accent-glow-soft)",
            }}
          >
            After
          </div>
        </>
      ) : (
        <>
          <div
            className="absolute bottom-3 left-3 px-2.5 py-1 text-[10px] font-bold tracking-[0.15em] uppercase text-white pointer-events-none z-10"
            style={{
              background: "rgba(9,7,7,0.78)",
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Before
          </div>
          <div
            className="absolute bottom-3 right-3 px-2.5 py-1 text-[10px] font-bold tracking-[0.15em] uppercase text-white pointer-events-none z-10"
            style={{
              background: "var(--accent)",
              boxShadow: "0 2px 8px var(--accent-glow-soft)",
            }}
          >
            After
          </div>
        </>
      )}
    </div>
  );
});

export default BeforeAfterSlider;
