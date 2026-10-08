import type { Metadata } from "next";
import "./globals.css";
import { seoMeta, personal } from "@/data/portfolioData";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";

export const metadata: Metadata = {
  title: seoMeta.title,
  description: seoMeta.description,
  keywords: seoMeta.keywords,
  authors: [{ name: personal.name }],
  openGraph: {
    title: seoMeta.title,
    description: seoMeta.description,
    type: "website",
    locale: "en_IN",
    siteName: `${personal.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: seoMeta.title,
    description: seoMeta.description,
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <ThemeProvider><SmoothScroll>{children}</SmoothScroll></ThemeProvider>
      </body>
    </html>
  );
}
