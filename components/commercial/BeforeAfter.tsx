"use client";

import Image from "next/image";
import { useState } from "react";

const SIZES = "(max-width: 1024px) 100vw, 760px";

export default function BeforeAfter({
  title,
  before,
  after,
}: {
  title: string;
  before: string;
  after: string;
}) {
  const [pos, setPos] = useState(50);

  return (
    <div className="ba">
      <Image src={before} alt={`${title}: before`} fill sizes={SIZES} />
      <Image
        className="after"
        src={after}
        alt={`${title}: after`}
        fill
        sizes={SIZES}
        style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
      />
      <span className="tag l">BEFORE</span>
      <span className="tag r">AFTER</span>
      <span className="handle" style={{ left: `${pos}%` }} />
      <input
        type="range"
        min="0"
        max="100"
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Compare before and after for ${title}`}
      />
    </div>
  );
}
