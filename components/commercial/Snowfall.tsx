// Seeded PRNG so the "random" flakes are identical on server and client
// (no hydration mismatch, and no client JS needed).
function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(1225);
const FLAKES = Array.from({ length: 40 }, () => ({
  left: `${(rand() * 100).toFixed(2)}%`,
  fontSize: `${(8 + rand() * 10).toFixed(1)}px`,
  opacity: Number((0.3 + rand() * 0.6).toFixed(2)),
  animationDuration: `${(9 + rand() * 12).toFixed(2)}s`,
  animationDelay: `${(-rand() * 20).toFixed(2)}s`,
}));

export default function Snowfall() {
  return (
    <div className="snow" aria-hidden="true">
      {FLAKES.map((style, i) => (
        <span key={i} className="flake" style={style}>
          ❄
        </span>
      ))}
    </div>
  );
}
