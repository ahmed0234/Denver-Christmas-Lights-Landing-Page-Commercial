"use client";

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

export const PHONE_CONVERSION_SEND_TO = "AW-959322441/yn4TCPqn09wcEMmyuMkD";

/**
 * Reports Google Ads Phone Call Conversion event on user click.
 */
export const reportPhoneConversion = () => {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "conversion", {
      send_to: PHONE_CONVERSION_SEND_TO,
    });
  }
};
