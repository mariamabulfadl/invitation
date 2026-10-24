import type { Metadata, Viewport } from "next";
import { event } from "@/data/event";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")),
  title: "Marwan & Sohila | 27.11.2026",
  description: event.socialDescription,
  openGraph: {
    title: "Marwan & Sohila | 27.11.2026",
    description: event.socialDescription,
    type: "website",
    images: [{ url: "/images/social-preview.jpg", width: 1200, height: 630, alt: "Marwan and Sohila engagement invitation" }]
  },
  twitter: { card: "summary_large_image", title: "Marwan & Sohila | 27.11.2026", description: event.socialDescription, images: ["/images/social-preview.jpg"] }
};

export const viewport: Viewport = { themeColor: "#f2dfc1", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
