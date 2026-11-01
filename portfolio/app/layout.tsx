import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import Nav from "@/components/Nav";
import { Socials } from "@/components/ui";
import { site } from "@/lib/site";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display" });
const body = Inter({ subsets: ["latin"], variable: "--font-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

const description = "Final-year Data Science & AI engineering student building ML, NLP, RAG and LLM applications. Open to 6-month PFE internships from January 2027.";
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} · AI Engineer`, template: `%s · ${site.name}` },
  description,
  openGraph: { title: `${site.name} · AI Engineer`, description, type: "website", url: site.url },
  twitter: { card: "summary", title: site.name, description },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:bg-accent focus:p-2">Skip to content</a>
        <Nav />
        <main id="main">{children}</main>
        <footer className="mt-20 border-t border-slate-800 py-8">
          <div className="wrap flex flex-col justify-between gap-4 text-sm text-slate-400 sm:flex-row">
            <p>© {new Date().getFullYear()} {site.name}. <Link href="/contact" className="hover:text-white">Get in touch</Link></p>
            <Socials />
          </div>
        </footer>
      </body>
    </html>
  );
}
