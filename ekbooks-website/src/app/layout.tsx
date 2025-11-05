import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "EKBooks - Professional Accounting Services",
  description: "Expert accounting and bookkeeping services for businesses. Trusted financial solutions for entrepreneurs and corporations.",
  keywords: ["accounting", "bookkeeping", "tax services", "financial consulting", "EKBooks"],
  authors: [{ name: "EKBooks" }],
  creator: "EKBooks",
  publisher: "EKBooks",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://ekbooks.ca'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "EKBooks - Professional Accounting Services",
    description: "Expert accounting and bookkeeping services for businesses. Trusted financial solutions for entrepreneurs and corporations.",
    url: 'https://ekbooks.ca',
    siteName: 'EKBooks',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EKBooks - Professional Accounting Services',
      },
    ],
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "EKBooks - Professional Accounting Services",
    description: "Expert accounting and bookkeeping services for businesses.",
    images: ['/og-image.jpg'],
    creator: '@ekbooks',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="theme-ekbooks font-sans antialiased">
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
