import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar"
import "./globals.css";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vivacity",
  description: "An aspiring Esports organization helping players thrive.",
  openGraph : {
    title: "Vivacity",
    description: "An aspiring Esports organization helping players thrive.",
    images:["/images/logo_transparent.png"],
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
