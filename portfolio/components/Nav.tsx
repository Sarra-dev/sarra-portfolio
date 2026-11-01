"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/lib/site";
import { CvButton } from "./ui";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const path = usePathname();
  const link = (h: string) => `text-sm ${path === h || (h !== "/" && path.startsWith(h)) ? "text-white" : "text-slate-400 hover:text-white"}`;
  return (
    <header className="sticky top-0 z-40 border-b border-slate-800 bg-navy/95 backdrop-blur">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link href="/" className="font-display text-lg font-semibold" aria-label={`${site.name}, home`}>{site.short}</Link>
        <nav className="hidden items-center gap-5 lg:flex" aria-label="Main">
          {nav.map(([n, h]) => <Link key={h} href={h} className={link(h)}>{n}</Link>)}
        </nav>
        <div className="flex items-center gap-3">
          <span className="hidden sm:block"><CvButton className="btn-primary" /></span>
          <button className="lg:hidden" aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen(!open)}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="wrap flex flex-col gap-3 border-t border-slate-800 py-4 lg:hidden" aria-label="Mobile">
          {nav.map(([n, h]) => <Link key={h} href={h} className={link(h)} onClick={() => setOpen(false)}>{n}</Link>)}
          <div className="sm:hidden"><CvButton className="btn-primary" /></div>
        </nav>
      )}
    </header>
  );
}
