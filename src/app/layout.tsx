import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AnimatedBackground from "@/components/AnimatedBackground";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: {
  title: string;
  description: string;
} = {
  title: "Anchor",
  description: "A solo developer's creative showcase.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* The <body> has horizontal padding to create the left/right "gutters" */}
      <body className={`${inter.variable} font-sans bg-[var(--background)] px-[1.5rem] md:px-[2.5rem] snap-y snap-proximity`}>
        
        {/* The Lightbox: Fixed behind everything */}
        <div className="fixed inset-0 z-0">
          <AnimatedBackground />
        </div>

        {/* The Film Strip: This is our content. It scrolls with the window. */}
        <main 
          className="
            relative z-10 
            bg-background 
            my-[5vh] 
            rounded-[2.5rem] md:rounded-[3rem]
          "
          > 
            <div className="px-10 rounded-[0rem] md:rounded-[0rem]">
              {children}
          </div>
        </main>
      </body>
    </html>
  );
}