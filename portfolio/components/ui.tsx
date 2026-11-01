import Link from "next/link";
import Image from "next/image";
import { Download, Github, Linkedin, ArrowRight, ExternalLink } from "lucide-react";
import { site } from "@/lib/site";
import type { Project } from "@/lib/data";

export const Txt = ({ s }: { s: string }) => <span className={s.includes("[TODO") ? "todo" : ""}>{s}</span>;

export function CvButton({ className = "btn-ghost" }: { className?: string }) {
  if (!site.cv.available)
    return <span className="btn-off" title="Add your PDF in public/cv and set cv.available in lib/site.ts"><Download size={16} aria-hidden /> CV coming soon</span>;
  return <a className={className} href={site.cv.path} download><Download size={16} aria-hidden /> Download CV</a>;
}

export function Socials() {
  const l = [["GitHub", site.github, Github], ["LinkedIn", site.linkedin, Linkedin]] as const;
  return (
    <ul className="flex gap-4 text-sm text-slate-300">
      {l.map(([n, h, I]) => (
        <li key={n}>{h ? <a className="inline-flex items-center gap-1.5 hover:text-white" href={h} target="_blank" rel="noopener noreferrer"><I size={16} aria-hidden />{n}</a>
          : <span className="inline-flex items-center gap-1.5 text-slate-500"><I size={16} aria-hidden />{n} (link to add)</span>}</li>
      ))}
    </ul>
  );
}

export const PageHead = ({ title, intro }: { title: string; intro?: string }) => (
  <header className="wrap pb-10 pt-16"><h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
    {intro && <p className="mt-4 max-w-2xl text-slate-400">{intro}</p>}</header>
);

export function ArchDiagram({ steps }: { steps: string[] }) {
  return (
    <ol className="flex flex-col gap-2 md:flex-row md:flex-wrap md:items-center" aria-label="System architecture">
      {steps.map((s, i) => (
        <li key={i} className="flex items-center gap-2">
          <span className="rounded-md border border-accent/40 bg-navy px-3 py-2 font-mono text-xs text-slate-200"><Txt s={s} /></span>
          {i < steps.length - 1 && <ArrowRight size={14} className="rotate-90 text-accent md:rotate-0" aria-hidden />}
        </li>
      ))}
    </ol>
  );
}

export function ProjectCard({ p, large = false }: { p: Project; large?: boolean }) {
  return (
    <article className={`panel flex flex-col overflow-hidden ${large ? "md:flex-row" : ""}`}>
      <div className={`border-b border-slate-700/70 bg-navy/60 p-5 ${large ? "md:w-1/2 md:border-b-0 md:border-r" : ""}`}>
        <ArchDiagram steps={p.architecture.slice(0, large ? 7 : 4)} />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="font-mono text-xs text-accent">{p.category}{p.status ? ` · ${p.status}` : ""}</p>
        <h3 className="font-display text-xl font-semibold"><Link href={`/projects/${p.slug}`} className="hover:text-accent">{p.title}</Link></h3>
        <p className="text-sm text-slate-400">{p.summary}</p>
        <ul className="flex flex-wrap gap-1.5">{p.tech.slice(0, 5).map((t) => <li key={t} className="tag"><Txt s={t} /></li>)}</ul>
        <div className="mt-auto flex flex-wrap gap-4 pt-2 text-sm">
          <Link href={`/projects/${p.slug}`} className="inline-flex items-center gap-1 font-medium text-accent hover:underline">View case study <ArrowRight size={14} aria-hidden /></Link>
          {p.github && <a href={p.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-300 hover:text-white"><Github size={14} aria-hidden />GitHub</a>}
          {p.demo && <a href={p.demo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-slate-300 hover:text-white"><ExternalLink size={14} aria-hidden />Live demo</a>}
        </div>
      </div>
    </article>
  );
  
}
export function Portrait({ size = 72, rounded = true }: { size?: number; rounded?: boolean }) {
  const cls = `${rounded ? "rounded-full" : "rounded-lg"} border border-slate-600 object-cover`;
  if (site.photo.available)
    return <Image src={site.photo.path} alt="Portrait of Sarra Ben Bettaieb" width={size} height={rounded ? size : Math.round(size * 1.25)} className={cls} priority />;
  return (
    <div className={`${rounded ? "rounded-full" : "rounded-lg"} flex items-center justify-center border border-dashed border-slate-600 bg-card font-display text-slate-500`}
      style={{ width: size, height: rounded ? size : Math.round(size * 1.25) }} aria-hidden>SB</div>
  );
}
