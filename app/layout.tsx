import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VYZZ | The AI Visibility Platform",
  description: "Become the #1 brand AI assistants recommend. Track your ranking, get more deals, and generate more profit with VYZZ.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
      <body className="antialiased font-sans bg-background text-foreground selection:bg-accent-primary selection:text-white">
        {children}
      </body>
    </html>
  );
}
