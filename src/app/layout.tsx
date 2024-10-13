import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../assets/globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";
import { Analytics } from "@vercel/analytics/react";

const font = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    absolute: "Islander's View",
    template: "%s | Islander's View",
  },
  description: "Find your dream properties here in Davao City!",
  icons: ["/logo.png"],
  keywords: ["real estate", "properties", "vehicles", "Davao City", "Samal"],
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Islander's View",
    description: "Find your dream properties here in Davao City!",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="my-theme">
      <body className={font.className + " flex flex-col min-h-screen"}>
        <Navbar />
        <div>{children}</div>
        <div className="mt-auto">
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  );
}
