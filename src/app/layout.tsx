import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Free PDF Page Rotator - Rotate Individual or All Pages",
  description: "Rotate individual or all pages in your PDF effortlessly. No downloads or sign-ups. Fast, secure, and user-friendly. Try now!",
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main className="flex min-w-sm min-h-screen flex-col items-center p-24 overflow-hidden flexCenter scroll-smooth focus:scroll-auto
bg-[#f7f5ee]
        ">
          {children}
        </main>
        <Footer />
      </body>
    </html >
  );
}
