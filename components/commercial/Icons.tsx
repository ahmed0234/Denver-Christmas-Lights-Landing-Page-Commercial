import type { SVGProps } from "react";

export type IconName =
  | "phone"
  | "star"
  | "check"
  | "arrow"
  | "shield"
  | "pen"
  | "tool"
  | "box"
  | "home"
  | "door"
  | "tree"
  | "bulb"
  | "clock"
  | "ladder"
  | "heart"
  | "pin"
  | "building"
  | "users"
  | "mail"
  | "snow"
  | "award"
  | "cal"
  | "car"
  | "church"
  | "bell"
  | "store";

/** References a symbol from <IconSprite />. Styling comes from the parent's CSS. */
export function Icon({
  name,
  ...props
}: { name: IconName | "holly" } & SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden="true" {...props}>
      <use href={`#i-${name}`} />
    </svg>
  );
}

/** Stroke icon that inherits the surrounding text colour (buttons, pills). */
export function LineIcon({ name }: { name: IconName }) {
  return <Icon name={name} fill="none" stroke="currentColor" strokeWidth={2} />;
}

export function IconSprite() {
  return (
    <svg
      width="0"
      height="0"
      style={{ position: "absolute" }}
      aria-hidden="true"
    >
      <symbol id="i-phone" viewBox="0 0 24 24">
        <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
      </symbol>
      <symbol id="i-star" viewBox="0 0 24 24">
        <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z" />
      </symbol>
      <symbol id="i-check" viewBox="0 0 24 24">
        <path d="M5 12.5l4.5 4.5L19 7.5" />
      </symbol>
      <symbol id="i-arrow" viewBox="0 0 24 24">
        <path d="M5 12h14M13 6l6 6-6 6" />
      </symbol>
      <symbol id="i-shield" viewBox="0 0 24 24">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </symbol>
      <symbol id="i-pen" viewBox="0 0 24 24">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" />
      </symbol>
      <symbol id="i-tool" viewBox="0 0 24 24">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.8-3.8a6 6 0 0 1-7.9 7.9l-6.9 6.9a2.1 2.1 0 0 1-3-3l6.9-6.9a6 6 0 0 1 7.9-7.9z" />
      </symbol>
      <symbol id="i-box" viewBox="0 0 24 24">
        <path d="M21 8l-9-5-9 5 9 5 9-5z" />
        <path d="M3 8v8l9 5 9-5V8" />
        <path d="M12 13v8" />
      </symbol>
      <symbol id="i-home" viewBox="0 0 24 24">
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M10 21v-6h4v6" />
      </symbol>
      <symbol id="i-door" viewBox="0 0 24 24">
        <path d="M5 21V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v17" />
        <path d="M3 21h18" />
        <circle cx="15" cy="12" r="1" />
      </symbol>
      <symbol id="i-tree" viewBox="0 0 24 24">
        <path d="M12 2l5 7h-3l4 6h-4l3 4H7l3-4H6l4-6H7z" />
        <path d="M12 19v3" />
      </symbol>
      <symbol id="i-bulb" viewBox="0 0 24 24">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a7 7 0 0 0-4 12.7V16h8v-1.3A7 7 0 0 0 12 2z" />
      </symbol>
      <symbol id="i-clock" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </symbol>
      <symbol id="i-ladder" viewBox="0 0 24 24">
        <path d="M7 2v20M17 2v20M7 6h10M7 11h10M7 16h10" />
      </symbol>
      <symbol id="i-heart" viewBox="0 0 24 24">
        <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21.2l8.8-8.8a5.5 5.5 0 0 0 0-7.8z" />
      </symbol>
      <symbol id="i-pin" viewBox="0 0 24 24">
        <path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z" />
        <circle cx="12" cy="10" r="2.5" />
      </symbol>
      <symbol id="i-building" viewBox="0 0 24 24">
        <path d="M4 21V5l8-3v19" />
        <path d="M12 8h8v13" />
        <path d="M2 21h20M8 8v.01M8 12v.01M8 16v.01M16 12v.01M16 16v.01" />
      </symbol>
      <symbol id="i-users" viewBox="0 0 24 24">
        <circle cx="9" cy="8" r="3.5" />
        <path d="M2 21a7 7 0 0 1 14 0" />
        <path d="M16 4.5a3.5 3.5 0 0 1 0 7M22 21a7 7 0 0 0-4-6.3" />
      </symbol>
      <symbol id="i-mail" viewBox="0 0 24 24">
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="M3 7l9 6 9-6" />
      </symbol>
      <symbol id="i-snow" viewBox="0 0 24 24">
        <path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7M9 4l3 2 3-2M9 20l3-2 3 2M4 10.5l3.4.2L6 13.8M20 10.5l-3.4.2 1.4 3.1" />
      </symbol>
      <symbol id="i-award" viewBox="0 0 24 24">
        <circle cx="12" cy="9" r="6" />
        <path d="M8.5 14L7 22l5-3 5 3-1.5-8" />
      </symbol>
      <symbol id="i-cal" viewBox="0 0 24 24">
        <rect x="3" y="4" width="18" height="17" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18" />
      </symbol>
      <symbol id="i-car" viewBox="0 0 24 24">
        <path d="M5 17H3v-5l2-5h14l2 5v5h-2M3 12h18M9.5 17h5" />
        <circle cx="7.5" cy="17" r="2" />
        <circle cx="16.5" cy="17" r="2" />
      </symbol>
      <symbol id="i-church" viewBox="0 0 24 24">
        <path d="M12 2v4M10 4h4" />
        <path d="M6 21V11l6-5 6 5v10" />
        <path d="M3 21h18M10 21v-4a2 2 0 0 1 4 0v4" />
      </symbol>
      <symbol id="i-bell" viewBox="0 0 24 24">
        <path d="M2 18h20M4 18a8 8 0 0 1 16 0" />
        <path d="M12 10V7M10 7h4" />
      </symbol>
      <symbol id="i-store" viewBox="0 0 24 24">
        <path d="M3 9l1.5-5h15L21 9" />
        <path d="M3 9h18v1a3 3 0 0 1-6 0a3 3 0 0 1-6 0a3 3 0 0 1-6 0z" />
        <path d="M5 13v8h14v-8M10 21v-5h4v5" />
      </symbol>
      <symbol id="i-holly" viewBox="0 0 64 30">
        <path
          d="M30 16c-6-1-10-6-10-12 3 3 6 2 8 0 0 3 2 5 4 6-2 2-2 4-2 6z"
          fill="#2E9E57"
        />
        <path
          d="M34 16c6-1 10-6 10-12-3 3-6 2-8 0 0 3-2 5-4 6 2 2 2 4 2 6z"
          fill="#2E9E57"
        />
        <circle cx="29" cy="20" r="4" fill="#fff" />
        <circle cx="35" cy="20" r="4" fill="#fff" />
        <circle cx="32" cy="25" r="4" fill="#fff" />
      </symbol>
    </svg>
  );
}

export function Stars() {
  return (
    <span className="stars" aria-label="5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <Icon key={i} name="star" />
      ))}
    </span>
  );
}

export function Tick() {
  return (
    <i className="tick">
      <Icon name="check" />
    </i>
  );
}
