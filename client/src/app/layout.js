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
  title: "Oriki.ng | The Yoruba Knowledge Zone",
  description: "The one-stop platform for Yoruba history, culture, verified stories, and heritage. Access the largest digital archive of Yoruba knowledge.",
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
