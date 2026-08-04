import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

/* Local dev bypass for TLS verification issues when antivirus/proxy breaks HTTPS */
if (process.env.RESEND_INSECURE_TLS === "true") {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

function getResend() {
  return new Resend(process.env.RESEND_API_KEY);
}

/** RFC 5322 display name formatting */
function formatFromAddress(displayName: string, mailbox: string): string {
  const escaped = displayName.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
  return `"${escaped}" <${mailbox}>`;
}

// ── CORS Headers Helper ───────────────────────────────────────────────────────
function getCorsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export async function OPTIONS(req: NextRequest) {
  const origin = req.headers.get("origin");
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(origin),
  });
}

// ── Universal Dark/Light Mode Compatible Email Template ───────────────────────
function getBusinessEmailHtml(data: {
  name: string;
  email: string;
  zip: string;
  propertyType: string;
  message: string;
}) {
  const formattedPropertyType = data.propertyType
    ? `<span style="display:inline-block; background-color:#2a2316; border:1px solid #d4af37; color:#fff4ce !important; padding:6px 14px; border-radius:20px; font-size:12px; font-weight:700; margin:3px 6px 3px 0; text-transform:uppercase; letter-spacing:0.5px;">${data.propertyType.trim()}</span>`
    : '<span style="color:#a1a1aa !important; font-style:italic;">None specified</span>';

  return `
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <title>New Quote Inquiry — Denver Christmas Lights</title>
        <style type="text/css">
          /* Email Client Reset & Force Contrast */
          body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
          table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
          img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
          body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; background-color: #0b0b0c !important; }
          
          /* Dark mode engine overrides */
          @media (prefers-color-scheme: dark) {
            .bg-main { background-color: #0b0b0c !important; }
            .bg-card { background-color: #141416 !important; }
            .bg-details { background-color: #1f1f24 !important; }
            .text-gold { color: #d4af37 !important; }
            .text-white { color: #ffffff !important; }
            .text-muted { color: #a1a1aa !important; }
          }
        </style>
      </head>
      <body style="margin:0; padding:0; background-color:#0b0b0c; font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color:#ffffff;">
        <!-- OUTER WRAPPER TABLE -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#0b0b0c; padding:30px 12px;" class="bg-main">
          <tr>
            <td align="center">
              
              <!-- MAIN CONTAINER CARD -->
              <table width="600" border="0" cellspacing="0" cellpadding="0" style="max-width:600px; width:100%; background-color:#141416; border:2px solid #d4af37; border-radius:16px; overflow:hidden; box-shadow:0 16px 48px rgba(0,0,0,0.8);" class="bg-card">
                
                <!-- HEADER SECTION -->
                <tr>
                  <td align="center" style="padding:36px 30px 28px 30px; background-color:#1a191c; border-bottom:2px solid #362a15; text-align:center;">
                    <div style="font-size:11px; font-weight:800; letter-spacing:3px; color:#d4af37 !important; text-transform:uppercase; margin-bottom:8px;" class="text-gold">
                      ✨ NEW COMMERCIAL QUOTE INQUIRY ✨
                    </div>
                    <h1 style="margin:0; font-size:26px; font-weight:800; color:#ffffff !important; letter-spacing:0.5px; line-height:1.2;" class="text-white">
                      Denver Christmas Lights
                    </h1>
                  </td>
                </tr>

                <!-- MAIN CONTENT SECTION -->
                <tr>
                  <td style="padding:32px 30px;">
                    <p style="margin:0 0 24px 0; font-size:15px; color:#e4e4e7 !important; line-height:1.6;" class="text-white">
                      A new commercial Christmas lighting quote request has been received from the website:
                    </p>

                    <!-- CUSTOMER DETAILS CARD -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color:#1f1f24; border:1px solid #38342b; border-radius:12px; margin-bottom:28px;" class="bg-details">
                      <tr>
                        <td style="padding:20px;">
                          <table width="100%" border="0" cellspacing="0" cellpadding="0">
                            <!-- Name -->
                            <tr>
                              <td style="padding-bottom:12px; font-size:14px; border-bottom:1px solid #2d2b33;">
                                <span style="color:#d4af37 !important; font-weight:700; display:inline-block; min-width:130px;" class="text-gold">Customer Name:</span>
                                <strong style="color:#ffffff !important; font-size:15px;" class="text-white">${data.name}</strong>
                              </td>
                            </tr>
                            <!-- Email -->
                            <tr>
                              <td style="padding:12px 0; font-size:14px; border-bottom:1px solid #2d2b33;">
                                <span style="color:#d4af37 !important; font-weight:700; display:inline-block; min-width:130px;" class="text-gold">Email Address:</span>
                                <a href="mailto:${data.email}" style="color:#f5c86a !important; font-weight:700; text-decoration:underline;">${data.email}</a>
                              </td>
                            </tr>
                            <!-- ZIP -->
                            <tr>
                              <td style="padding-top:12px; font-size:14px;">
                                <span style="color:#d4af37 !important; font-weight:700; display:inline-block; min-width:130px;" class="text-gold">ZIP Code:</span>
                                <strong style="color:#ffffff !important; font-size:15px;" class="text-white">${data.zip || "Not provided"}</strong>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- PROPERTY TYPE -->
                    <div style="margin-bottom:24px;">
                      <div style="font-size:12px; font-weight:800; color:#d4af37 !important; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:10px;" class="text-gold">
                        PROPERTY TYPE:
                      </div>
                      <div>${formattedPropertyType}</div>
                    </div>

                    <!-- CUSTOMER MESSAGE -->
                    <div style="margin-bottom:32px;">
                      <div style="font-size:12px; font-weight:800; color:#d4af37 !important; text-transform:uppercase; letter-spacing:1.5px; margin-bottom:8px;" class="text-gold">
                        CUSTOMER MESSAGE:
                      </div>
                      <div style="background-color:#19191c; border:1px solid #333338; border-radius:10px; padding:18px; font-size:14px; color:#ffffff !important; line-height:1.6; font-style:${data.message ? "normal" : "italic"};">
                        ${data.message || "No additional message provided."}
                      </div>
                    </div>

                    <!-- CTA BUTTON TABLE -->
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td align="center">
                          <table border="0" cellspacing="0" cellpadding="0">
                            <tr>
                              <td align="center" style="background-color:#d4af37; border-radius:30px; padding:14px 32px; box-shadow:0 4px 16px rgba(212,175,55,0.4);">
                                <a href="mailto:${data.email}" style="color:#000000 !important; font-size:13px; font-weight:900; letter-spacing:1.5px; text-transform:uppercase; text-decoration:none; display:inline-block; whitespace:nowrap;">
                                  REPLY TO CUSTOMER VIA EMAIL
                                </a>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>

                <!-- FOOTER SECTION -->
                <tr>
                  <td align="center" style="padding:22px 30px; background-color:#0d0d0e; border-top:1px solid #26262b; text-align:center; font-size:12px; color:#a1a1aa !important;" class="text-muted">
                    <strong style="color:#d4af37 !important;" class="text-gold">Denver Christmas Lights</strong> • Lead Management<br/>
                    Submitted on ${new Date().toLocaleString("en-US", { timeZone: "America/Denver" })} MT
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
}

// ── Main POST Handler ────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  console.log("\n=======================================================");
  console.log("[contact API] Step 1: POST Request Received");
  console.log("=======================================================");

  const origin = req.headers.get("origin");
  const corsHeaders = getCorsHeaders(origin);

  let rawBody: Record<string, unknown>;
  try {
    rawBody = await req.json();
    console.log("[contact API] Step 1 Payload:", JSON.stringify(rawBody, null, 2));
  } catch (err) {
    console.error("[contact API] Step 1 ERROR: Failed to parse request JSON:", err);
    return NextResponse.json(
      { ok: false, success: false, error: "Invalid request body. Expected JSON." },
      { status: 400, headers: corsHeaders }
    );
  }

  // 1. Anti-spam / Honeypot Check
  const honeypot = String(rawBody.honeypot || "").trim();
  if (honeypot !== "") {
    console.warn("[contact API] Spam bot submission rejected via honeypot.");
    return NextResponse.json(
      { ok: false, success: false, error: "Spam submission detected." },
      { status: 400, headers: corsHeaders }
    );
  }

  // 2. Extract Data
  const name = String(rawBody.name || rawBody.fullName || "").trim();
  const email = String(rawBody.email || "").trim();
  const zip = String(rawBody.zip || rawBody.zipCode || "").trim();
  const propertyType = String(rawBody.propertyType || rawBody.property_type || rawBody.type || "").trim();
  const message = String(rawBody.message || rawBody.comments || "").trim();

  console.log("[contact API] Step 2: Extracted Fields ->", { name, email, zip, propertyType, message });

  // 3. Validation
  if (!name || name.length < 2) {
    console.warn("[contact API] Validation Failed: Missing or short name");
    return NextResponse.json(
      { ok: false, success: false, error: "Please enter your full name." },
      { status: 400, headers: corsHeaders }
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    console.warn("[contact API] Validation Failed: Invalid email format:", email);
    return NextResponse.json(
      { ok: false, success: false, error: "Please enter a valid email address." },
      { status: 400, headers: corsHeaders }
    );
  }

  // 4. Environment Variables Check
  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) {
    console.error("[contact API] CRITICAL ERROR: RESEND_API_KEY is not defined in environment!");
    return NextResponse.json(
      { ok: false, success: false, error: "Server configuration error: RESEND_API_KEY missing." },
      { status: 500, headers: corsHeaders }
    );
  }
  console.log("[contact API] Step 3: RESEND_API_KEY Loaded Successfully (Prefix:", resendApiKey.substring(0, 6) + "...)");

  const business1 = process.env.BUSINESS_EMAIL ?? "";
  const business2 = process.env.BUSINESS_EMAIL_2 ?? "";
  const recipients = [business1, business2].filter(Boolean);

  console.log("[contact API] Step 4: Business Inbox Recipients ->", recipients);

  if (recipients.length === 0) {
    console.error("[contact API] CRITICAL ERROR: No recipients found in BUSINESS_EMAIL or BUSINESS_EMAIL_2");
    return NextResponse.json(
      { ok: false, success: false, error: "Server configuration error: No business recipients set." },
      { status: 500, headers: corsHeaders }
    );
  }

  try {
    const resend = getResend();

    // Standardized sender using verified domain mailbox support@ikhtiyaar.com
    const fromAddress = formatFromAddress(name || "Website Lead", "support@ikhtiyaar.com");

    console.log(`[contact API] Step 5: Sending Business Notification Email via Resend to ${recipients.length} recipients...`);
    console.log(`[contact API] From: ${fromAddress}`);
    console.log(`[contact API] To: ${JSON.stringify(recipients)}`);
    console.log(`[contact API] ReplyTo: ${email}`);

    const businessPayload = {
      from: fromAddress,
      to: recipients,
      replyTo: email,
      subject: `🎄 New Commercial Christmas Light Quote Request — ${name}`,
      html: getBusinessEmailHtml({ name, email, zip, propertyType, message }),
    };

    /* Send ONLY to business recipients defined in environment variables */
    const businessResult = await resend.emails.send(businessPayload);
    console.log("[contact API] Step 6: Resend Business Email Full Response ->", JSON.stringify(businessResult, null, 2));

    if (businessResult.error) {
      console.error("[contact API] Step 6 ERROR: Resend API Error Sending Business Email:", businessResult.error);
      return NextResponse.json(
        {
          ok: false,
          success: false,
          error: `Resend Error: ${businessResult.error.message || "Failed to deliver email."}`,
          details: businessResult.error,
        },
        { status: 502, headers: corsHeaders }
      );
    }

    console.log("[contact API] === Successfully Sent Lead Notification to Business Inboxes ===");

    return NextResponse.json(
      {
        ok: true,
        success: true,
        message: "Message received. We'll be in touch soon.",
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (err: any) {
    console.error("[contact API] Step EXCEPTION: Unexpected runtime failure:", err);
    return NextResponse.json(
      {
        ok: false,
        success: false,
        error: err?.message || "An unexpected error occurred while sending your request.",
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
