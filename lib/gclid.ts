const STORAGE_KEY = "dcl_gclid";

/** Google Click IDs are URL-safe base64-ish tokens; anything else is dropped. */
export function sanitizeGclid(value: unknown): string {
  const v = typeof value === "string" ? value.trim() : "";
  return /^[A-Za-z0-9_-]{1,200}$/.test(v) ? v : "";
}

/**
 * Browser only. Returns the `gclid` from the current URL, falling back to the one
 * saved earlier this session (so a reload or in-tab navigation keeps it).
 */
export function readGclid(): string {
  const fromUrl = sanitizeGclid(
    new URLSearchParams(window.location.search).get("gclid"),
  );
  try {
    if (fromUrl) {
      sessionStorage.setItem(STORAGE_KEY, fromUrl);
      return fromUrl;
    }
    return sanitizeGclid(sessionStorage.getItem(STORAGE_KEY));
  } catch {
    // Storage blocked (private mode, disabled cookies): URL value only
    return fromUrl;
  }
}
