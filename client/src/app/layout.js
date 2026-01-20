import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: 'swap',
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: 'swap',
});

export const metadata = {
  title: {
    default: "Oriki.ng | The Ultimate Yoruba Knowledge Zone",
    template: "%s | Oriki.ng"
  },
  description: "Discover the depth of Yoruba heritage. Oriki.ng is the premier digital archive for verified Yoruba history, culture, genealogies (Oriki), legends, and language. Reconnect with your roots today.",
  keywords: ["Yoruba", "History", "Culture", "Oriki", "Nigeria", "Heritage", "Genealogy", "Yoruba Language", "African History", "Oral Tradition"],
  authors: [{ name: "Oriki.ng Team" }],
  creator: "Oriki.ng",
  openGraph: {
    title: "Oriki.ng | The Ultimate Yoruba Knowledge Zone",
    description: "The #1 platform for verified Yoruba history, culture, and stories. Access thousands of Orikis, historical records, and audio pronunciations.",
    url: "https://oriki.ng",
    siteName: "Oriki.ng",
    images: [
      {
        url: "https://oriki.ng/og-image.jpg", // Ideally replace with actual hosted image
        width: 1200,
        height: 630,
        alt: "Oriki.ng - Discover Your Heritage",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Oriki.ng | The Ultimate Yoruba Knowledge Zone",
    description: "Discover verified Yoruba history, culture, and heritage. The digital home for the Yoruba race.",
    images: ["https://oriki.ng/og-image.jpg"], // Ideally replace with actual hosted image
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${headingFont.variable} ${bodyFont.variable} font-sans min-h-screen flex flex-col`}>
        <AuthProvider>
          <Navbar />
          <main className="flex-grow pt-16">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
