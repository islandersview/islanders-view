import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Islanders View",
  description: "Find your dream properties here in Davao City!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="emerald">
      <body className={inter.className + " flex flex-col min-h-screen"}>
        <Navbar />
        <div className="max-w-[1920px] mx-auto px-4 w-full py-2">
          {children}
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </body>
    </html>
  );
}
