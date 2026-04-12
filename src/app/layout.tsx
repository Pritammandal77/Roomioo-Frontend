import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import ReduxProvider from "@/lib/rtk/providers/ReduxProvider";
import { Toaster } from "sonner";

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
    default: "Roomio – Find Your Perfect Roommate",
    template: "%s | Roomio",
  },
  description:
    "Roomio helps you find the perfect roommate/flatmate based on lifestyle, preferences, and compatibility. Discover shared living made smarter.",

  keywords: [
    "roommate finder",
    "find roommate",
    "room rental",
    "flatmate finder",
    "shared living",
    "roommate app India",
    "Roomio",
  ],

  authors: [{ name: "Roomio Team" }],
  creator: "Roomio",

  metadataBase: new URL("https://roomio.vercel.app"), // change after domain

  openGraph: {
    title: "Roomio – Smart Roommate Finder",
    description:
      "Find compatible roommates easily with Roomio. Smart matching based on lifestyle.",
    url: "https://roomio.vercel.app",
    siteName: "Roomio",
    images: [
      {
        url: "/RoomioLogo.jpeg", // add later
        width: 1200,
        height: 630,
        alt: "Roomio App Preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Roomio – Find Your Perfect Roommate",
    description:
      "Smart roommate matching platform for better shared living.",
    images: ["/RoomioLogo.jpeg"],
  },

  icons: {
    // icon: "/favicon.ico",
     icon: "/RoomioLogo.jpeg",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          <Navbar />
          {children}
          <Toaster position="top-center" richColors closeButton />
        </ReduxProvider>
      </body>
    </html>
  );
}