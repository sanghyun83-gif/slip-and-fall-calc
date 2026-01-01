import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { SITE } from "./site-config";

const GA_MEASUREMENT_ID = "G-CLQYC4HRE3";
const ADSENSE_ID = "ca-pub-6678501910155801";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${SITE.name} | Free ${SITE.year} Premises Liability Estimator`,
  description: SITE.description,
  keywords: [
    "slip and fall calculator",
    "premises liability settlement",
    "trip and fall compensation",
    "slip and fall lawyer",
    "property owner negligence",
    "fall injury settlement",
    "slip and fall claim value",
  ],
  verification: {
    google: "qlPMVO_Hb-be3_hFHNT9SBbsHO-b_wCOfWfLmTb4EQc",
  },
  openGraph: {
    title: `Free Slip and Fall Settlement Calculator ${SITE.year}`,
    description: "Calculate your slip and fall settlement value. Free calculator for premises liability claims and property owner negligence.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
