import type { Metadata } from "next";
import { Inter, Work_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/themes-provider";

const interSerif = Inter({
  variable: "--font-inter-serif",
  subsets: ["latin"],
});

const workSansSerif = Work_Sans({
  variable: "--font-work-sans-serif",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Do Pad",
  description: "A Dontpad with new features",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
    <head />
    <body className={`${interSerif.variable} ${workSansSerif} antialiased`}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </body>
  </html>
  );
}
