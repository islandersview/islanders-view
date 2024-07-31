import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar/Navbar";

const font = Poppins({ weight: "400", subsets: ["latin"] });

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
    <html lang="en" data-theme="my-theme">
      <body className={font.className + " flex flex-col min-h-screen"}>
        <Navbar />
        <div>
          {children}
        </div>
        <div className="mt-auto">
          <Footer />
        </div>
      </body>
    </html>
  );
}
