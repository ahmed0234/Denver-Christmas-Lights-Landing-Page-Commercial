/**
 * Backend origin that hosts /api/contact, e.g. "https://api.example.com".
 * Set NEXT_PUBLIC_API_URI at build time (it is inlined into the client bundle).
 * Left unset, forms post to /api/contact on the same origin as the page.
 */
export const API_URI = (process.env.NEXT_PUBLIC_API_URI ?? "")
  .trim()
  .replace(/\/+$/, "");

export const CONTACT_API_URL = `${API_URI}/api/contact`;
