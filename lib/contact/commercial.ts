/**
 * Commercial quote leads from components/commercial/QuoteForm.tsx. Kept apart from
 * the residential payload (name/email/zip/propertyType/message) handled inline in
 * app/api/contact/route.ts, because commercial leads also carry phone, business
 * and services.
 */

import { sanitizeGclid } from "@/lib/gclid";

export const COMMERCIAL_FORM_TYPE = "commercial";

export type CommercialLead = {
  name: string;
  email: string;
  phone: string;
  business: string;
  zip: string;
  services: string[];
  message: string;
  /** Google Ads click ID; empty when the visitor didn't arrive from an ad. */
  gclid: string;
};

type ParseResult =
  | { ok: true; lead: CommercialLead }
  | { ok: false; error: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const str = (value: unknown, max = 2000) =>
  (typeof value === "string" ? value : "").trim().slice(0, max);

export function parseCommercialLead(body: Record<string, unknown>): ParseResult {
  const firstName = str(body.firstName, 100);
  const lastName = str(body.lastName, 100);
  const name = `${firstName} ${lastName}`.trim() || str(body.name, 200);
  const email = str(body.email, 254);
  const phone = str(body.phone, 40);
  const services = (Array.isArray(body.services) ? body.services : [])
    .map((s) => str(s, 100))
    .filter(Boolean)
    .slice(0, 12);

  if (name.length < 2) return { ok: false, error: "Please enter your full name." };
  if (!EMAIL_RE.test(email))
    return { ok: false, error: "Please enter a valid email address." };
  if (phone.replace(/\D/g, "").length < 7)
    return { ok: false, error: "Please enter a valid phone number." };

  return {
    ok: true,
    lead: {
      name,
      email,
      phone,
      business: str(body.business, 200),
      zip: str(body.zip, 20),
      services,
      message: str(body.message, 5000),
      gclid: sanitizeGclid(body.gclid),
    },
  };
}

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export function commercialLeadSubject(lead: CommercialLead) {
  const who = lead.business ? `${lead.business} (${lead.name})` : lead.name;
  return `New Commercial Christmas Lighting Quote Request: ${who}`;
}

export function commercialLeadHtml(lead: CommercialLead) {
  const e = {
    name: escapeHtml(lead.name),
    email: escapeHtml(lead.email),
    phone: escapeHtml(lead.phone),
    business: escapeHtml(lead.business),
    zip: escapeHtml(lead.zip),
    message: escapeHtml(lead.message).replace(/\n/g, "<br />"),
  };
  const tel = lead.phone.replace(/[^\d+]/g, "");
  const missing = '<span style="color:#6a7282;font-style:italic;">Not provided</span>';

  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid #f3d4d4;font-size:14px;color:#6a7282;width:150px;vertical-align:top;">${label}</td>
      <td style="padding:10px 0;border-bottom:1px solid #f3d4d4;font-size:15px;color:#27272a;font-weight:600;">${value || missing}</td>
    </tr>`;

  const services = lead.services.length
    ? lead.services
        .map(
          (s) =>
            `<span style="display:inline-block;margin:3px 6px 3px 0;padding:5px 12px;border-radius:999px;background:#fef2f2;border:1px solid #cc2628;color:#a61f21;font-size:12px;font-weight:700;">${escapeHtml(s)}</span>`,
        )
        .join("")
    : missing;

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Commercial Quote Request</title>
  </head>
  <body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f3f4f6;padding:28px 12px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:14px;overflow:hidden;border:1px solid #e5e7eb;">
            <tr>
              <td style="background:#cc2628;padding:28px 30px;text-align:center;">
                <div style="font-size:11px;font-weight:800;letter-spacing:3px;color:#fee2e2;text-transform:uppercase;margin-bottom:6px;">New Commercial Quote Request</div>
                <div style="font-size:24px;font-weight:800;color:#ffffff;">Denver Christmas Lights</div>
              </td>
            </tr>
            <tr>
              <td style="padding:28px 30px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  ${row("Name", e.name)}
                  ${row("Business / property", e.business)}
                  ${row("Email", `<a href="mailto:${e.email}" style="color:#cc2628;">${e.email}</a>`)}
                  ${row("Phone", `<a href="tel:${tel}" style="color:#cc2628;">${e.phone}</a>`)}
                  ${row("ZIP code", e.zip)}
                  ${lead.gclid ? row("GCLID", `<span style="font-family:Consolas,Menlo,monospace;font-size:13px;word-break:break-all;">${escapeHtml(lead.gclid)}</span>`) : ""}
                </table>
                <div style="margin:24px 0 8px;font-size:12px;font-weight:800;letter-spacing:1.5px;color:#a61f21;text-transform:uppercase;">Services needed</div>
                <div>${services}</div>
                <div style="margin:24px 0 8px;font-size:12px;font-weight:800;letter-spacing:1.5px;color:#a61f21;text-transform:uppercase;">Message</div>
                <div style="background:#fef2f2;border-radius:10px;padding:16px;font-size:14px;line-height:1.6;color:#27272a;">${e.message || missing}</div>
                <table cellpadding="0" cellspacing="0" border="0" style="margin:28px auto 0;">
                  <tr>
                    <td style="background:#cc2628;border-radius:999px;padding:13px 28px;">
                      <a href="mailto:${e.email}" style="color:#ffffff;font-size:13px;font-weight:800;letter-spacing:1px;text-decoration:none;text-transform:uppercase;">Reply to ${e.name}</a>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 30px;background:#fafafa;border-top:1px solid #e5e7eb;text-align:center;font-size:12px;color:#6a7282;">
                Commercial lead from the website &middot; Submitted ${new Date().toLocaleString("en-US", { timeZone: "America/Denver" })} MT
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}
