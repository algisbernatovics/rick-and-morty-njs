import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Rick & Morty",
  description: "A premium Rick and Morty explorer built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased`}>
        <Navbar />
        <main className="min-h-screen bg-background">
          {children}
        </main>
        <footer className="py-10 border-t border-white/10 glass text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} Rick and Morty Explorer. Data provided by the <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Rick and Morty API</a>.
          </p>
        </footer>
      </body>
    </html>
  );
}
