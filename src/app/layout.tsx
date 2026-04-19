import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Poppins } from "next/font/google";
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

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Roomioo – Find Your Perfect Roommate/Flatmate",
    template: "%s | Roomioo",
  },
  description:
    "Roomioo helps you find the perfect roommate/flatmate based on lifestyle, preferences, and compatibility. Discover shared living made smarter.",

  keywords: [
    "roommate finder",
    "find roommate",
    "room rental",
    "flatmate finder",
    "shared living",
    "roommate app India",
    "Roomioo",
  ],

  authors: [{ name: "Roomioo" }],
  creator: "Roomioo",

  metadataBase: new URL("https://Roomioo.vercel.app"), // change after domain

  openGraph: {
    title: "Roomioo – Smart Roommate Finder",
    description:
      "Find compatible roommates easily with Roomioo. Smart matching based on lifestyle.",
    url: "https://Roomioo.vercel.app",
    siteName: "Roomioo",
    images: [
      {
        url: "/RoomiooLogo.jpeg", // add later
        width: 1200,
        height: 630,
        alt: "Roomioo App Preview",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Roomioo – Find Your Perfect Roommate",
    description: "Smart roommate matching platform for better shared living.",
    images: ["/RoomiooLogo.jpeg"],
  },

  icons: {
    // icon: "/favicon.ico",
    icon: "/RoomiooLogo.jpeg",
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
      className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ReduxProvider>
          {children}
          <Toaster position="top-center" richColors closeButton />
        </ReduxProvider>
      </body>
    </html>
  );
}
