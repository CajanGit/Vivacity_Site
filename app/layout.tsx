import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/Navbar"
import "./globals.css";
import Footer from "./components/Footer";
import localFont from 'next/font/local'
import ParticleBackground from "./components/ParticleBackground";

const aquire = localFont({
  src: [
    {
      path: '../public/fonts/AquireLight.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/AquireRegular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/AquireBold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-aquire',
})

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
    <html lang="en" className={aquire.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}>
        <ParticleBackground />
        <Navbar />
        <main className="flex-1 w-full">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  );
}
