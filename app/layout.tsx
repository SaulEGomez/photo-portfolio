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
  metadataBase: new URL("https://saulgomez.vercel.app"),
  title: "Saul Gomez — Photography Portfolio",
  description: "A curated archive of analog and digital photography.",
  icons: {
    icon: "/og-image-favi.png",
    apple: "/og-image-favi.png",
  },
  openGraph: {
    title: "Saul Gomez — Photography Portfolio",
    description: "A curated archive of analog and digital photography.",
    url: "https://saulgomez.vercel.app",
    siteName: "Saul Gomez Photography",
    images: [
      {
        url: "/og-image-meta.png",
        width: 1200,
        height: 630,
        alt: "Saul Gomez Photography Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Saul Gomez — Photography Portfolio",
    description: "A curated archive of analog and digital photography.",
    images: ["/og-image-meta.png"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}