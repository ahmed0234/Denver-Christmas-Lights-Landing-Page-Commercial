import type { Metadata } from "next";
import PrivacyPolicyPage from "./PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Denver Christmas Lights",
  description:
    "Learn how Denver Christmas Lights collects, uses, and protects your personal information. Read our full privacy policy to understand your rights and how we safeguard your data.",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "Privacy Policy | Denver Christmas Lights",
    description:
      "Learn how Denver Christmas Lights collects, uses, and protects your personal information.",
    type: "website",
    siteName: "Denver Christmas Lights",
  },
};

export default function Page() {
  return <PrivacyPolicyPage />;
}
