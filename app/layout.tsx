import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Commercial Christmas Light Installation Denver | Denver Christmas Lights",
  description:
    "Commercial Christmas light installation in Denver for retail centers, HOAs, offices, hotels and commercial properties. Request a custom lighting proposal",
  icons: {
    icon: "/NavbarLogo.png",
    shortcut: "/NavbarLogo.png",
    apple: "/NavbarLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-theme="golden"
      suppressHydrationWarning
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
    >
      <head>
        {/* Preload Critical LCP Hero Background Image */}
        <link
          rel="preload"
          as="image"
          href="/HeroBackground.webp"
          type="image/webp"
          fetchPriority="high"
        />

        {/* DNS prefetch & preconnect for third-party analytics */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Google Tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=AW-959322441"
          strategy="afterInteractive"
        />
        <Script id="google-tag-aw" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'AW-959322441');
          `}
        </Script>

        {/* Google Ads Phone Call Conversion Tracking */}
        <Script id="google-phone-conversion" strategy="afterInteractive">
          {`
            gtag('config', 'AW-959322441/yn4TCPqn09wcEMmyuMkD', {
              'phone_conversion_number': '(720) 296-7711'
            });
          `}
        </Script>
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}

