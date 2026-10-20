"use client";

import { useSyncExternalStore } from "react";

// One bulb roughly every 48px, never fewer than 14 (matches the design script)
const bulbCount = () => Math.max(14, Math.round(window.innerWidth / 48));
const subscribe = (onChange: () => void) => {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
};

export default function StringLights() {
  const count = useSyncExternalStore(subscribe, bulbCount, () => 24);

  return (
    <div className="lights" aria-hidden="true">
      <svg className="wire" preserveAspectRatio="none" viewBox="0 0 100 34">
        <path
          d="M0 6 Q5 14 10 6 T20 6 T30 6 T40 6 T50 6 T60 6 T70 6 T80 6 T90 6 T100 6"
          stroke="#3f3f46"
          strokeWidth=".4"
          fill="none"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="bulbs">
        {Array.from({ length: count }, (_, i) => (
          <span key={i} className="bulb" />
        ))}
      </div>
    </div>
  );
}
