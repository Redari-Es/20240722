import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  generator: 'Next.js',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'react-pdf', 'rotate-pdf'],
  authors: [{ name: 'ShonH' }],
  creator: 'ShonH',
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
        <link rel="icon" href="/favicon.png" sizes="any" />
        <Navbar />
        <main className="flex min-w-sm min-h-screen flex-col flex-1 pt-16 scroll-smooth focus:scroll-auto mx-auto
bg-[#f7f5ee]
        ">
          {children}
        </main>
        <Footer />
      </body>
    </html >
  );
}
