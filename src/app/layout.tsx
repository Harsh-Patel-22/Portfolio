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
  title: "Harsh Patel | Backend & Systems Engineer",
  description: "B.Tech Computer Science student specializing in C#, ASP.NET Core, database indexing, and distributed data processing. Explore projects, terminal simulation, and technical achievements.",
  keywords: ["Harsh Patel", "Software Engineer", "Backend Developer", "ASP.NET Core", "C# API", "Computer Science Student", "Database Optimization", "Developer Portfolio"],
  authors: [{ name: "Harsh Patel" }],
  creator: "Harsh Patel",
  metadataBase: new URL("https://harsh-patel.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://harsh-patel.vercel.app",
    title: "Harsh Patel | Backend & Systems Engineer",
    description: "B.Tech Computer Science student specializing in C#, ASP.NET Core, database indexing, and distributed data processing.",
    siteName: "Harsh Patel Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Harsh Patel | Backend & Systems Engineer",
    description: "B.Tech Computer Science student specializing in C#, ASP.NET Core, and distributed systems engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
