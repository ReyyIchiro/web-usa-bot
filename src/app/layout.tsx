import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import "fumadocs-ui/style.css";
import { brand } from "../../brand.config";
import { RootProvider } from "fumadocs-ui/provider/next";
import Script from "next/script";
import { CustomCursor } from "@/components/ui/CustomCursor";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.url),
  title: {
    default: `${brand.name} - ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  keywords: [...brand.keywords],
  authors: [{ name: brand.ownerName }],
  creator: brand.ownerName,
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: brand.url,
    siteName: brand.name,
    title: `${brand.name} - ${brand.tagline}`,
    description: brand.description,
    images: [
      {
        url: brand.ogImage,
        width: 1200,
        height: 630,
        alt: `${brand.name} Logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} - ${brand.tagline}`,
    description: brand.description,
    images: [brand.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [{ url: "/logo-v9.png", type: "image/png" }],
    apple: "/logo-v9.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${brand.url}/#organization`,
      name: brand.name,
      url: brand.url,
      logo: `${brand.url}${brand.logo}`,
      contactPoint: {
        "@type": "ContactPoint",
        email: brand.contactEmail,
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${brand.url}/#app`,
      name: brand.name,
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "Discord",
      description: brand.description,
      url: brand.url,
      softwareVersion: brand.version,
      author: {
        "@id": `${brand.url}/#organization`,
      },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "IDR",
        description: "Tier gratis tersedia",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable}`}
        style={{ fontFamily: "var(--font-inter, var(--font-sans))" }}
      >
        <CustomCursor />
        <div className="global-bg-grid" />
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <RootProvider>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
