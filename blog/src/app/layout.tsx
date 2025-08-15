import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const mavenPro = localFont({
  src: [
    {
      path: "../fonts/MavenPro/MavenProLight-300.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-maven-pro",
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Chris Kenrick's Blog | Frontend Development & Tech Insights",
  description: "Welcome to my blog where I share insights about frontend development, React, TypeScript, and modern web technologies.",
  keywords: ["frontend development", "React", "TypeScript", "web development", "JavaScript", "Next.js"],
  authors: [{ name: "Chris Kenrick" }],
  creator: "Chris Kenrick",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://chriskenrick.dev/blog",
    title: "Chris Kenrick's Blog",
    description: "Frontend development insights and tutorials",
    siteName: "Chris Kenrick's Blog",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chris Kenrick's Blog",
    description: "Frontend development insights and tutorials",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${mavenPro.variable} ${inter.variable} ${jetbrainsMono.variable} antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
