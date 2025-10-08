import type { Metadata } from "next";
import { Source_Serif_4, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const sourceSerifPro = Source_Serif_4({
  variable: "--font-source-serif-pro",
  subsets: ["latin"],
  weight: ["200", "300", "400", "600", "700", "900"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Naija Nutri Hub",
  description:
    "An end-to-end, AI-powered food platform focused on Nigerian food",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sourceSerifPro.variable} ${manrope.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
