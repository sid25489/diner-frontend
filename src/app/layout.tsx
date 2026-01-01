import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "American Diner Classics with a Latin Twist | Oakland Park, FL",
    template: "%s | Diner",
  },
  description: "A cozy daytime diner in Oakland Park, FL serving American classics with a Latin twist. Great coffee, fast service, colorful mural, breakfast & lunch. Dine-in, takeaway, outdoor seating. Open morning to 3 PM.",
  keywords: [
    "American diner",
    "Latin fusion restaurant",
    "Oakland Park restaurant",
    "breakfast diner",
    "lunch restaurant",
    "coffee shop",
    "Florida diner",
    "family restaurant",
    "comfort food",
    "American Latin cuisine",
  ],
  authors: [{ name: "Diner" }],
  creator: "Diner",
  publisher: "Diner",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://diner-website.vercel.app",
    siteName: "Diner",
    title: "American Diner Classics with a Latin Twist",
    description: "A cozy daytime diner serving breakfast, lunch, and fusion favorites in Oakland Park, FL. Great coffee, fast service, and a vibrant atmosphere.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Diner - American Classics with a Latin Twist",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "American Diner Classics with a Latin Twist",
    description: "A cozy daytime diner in Oakland Park, FL serving American classics with a Latin twist.",
    images: ["/og-image.jpg"],
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
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

import Header from "../components/Header";
import Footer from "../components/Footer";
import AppMotionWrapper from "./_app-motion-wrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-diner-cream`}>
        <Header />
        <main className="min-h-[70vh] flex flex-col items-center justify-center w-full">
          <AppMotionWrapper>
            {children}
          </AppMotionWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
