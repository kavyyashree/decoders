import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/lib/auth";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CampusHub AI - Siddaganga Institute of Technology",
  description: "Smart campus platform for Siddaganga Institute of Technology. Real-time room availability, AI assistant, lost & found, events, and more.",
  keywords: ["CampusHub", "SIT", "Siddaganga Institute", "Next.js", "TypeScript", "Tailwind CSS", "AI campus", "React"],
  authors: [{ name: "CampusHub Team" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "CampusHub AI - SIT",
    description: "Smart campus platform for Siddaganga Institute of Technology",
    siteName: "CampusHub AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CampusHub AI - SIT",
    description: "Smart campus platform for Siddaganga Institute of Technology",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
