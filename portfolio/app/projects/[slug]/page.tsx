import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Github, ExternalLink } from "lucide-react";
import { projects } from "@/lib/data";
import { ArchDiagram, Txt } from "@/components/ui";
import Image from "next/image";

export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  return p ? { title: p.title, description: p.summary } : {};
}
const Sec = ({ t, children }: { t: string; children: React.ReactNode }) => (
  <section className="mt-12"><h2 className="font-display text-2xl font-semibold">{t}</h2><div className="mt-3 space-y-3 text-slate-300">{children}</div></section>
);
const List = ({ items }: { items: string[] }) => <ul className="list-disc space-y-1 pl-5">{items.map((i, k) => <li key={k}><Txt s={i} /></li>)}</ul>;

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = projects.findIndex((x) => x.slug === slug);
  if (i < 0) notFound();
  const p = projects[i], prev = projects[i - 1], next = projects[i + 1];
  return (
    <article className="wrap max-w-3xl pb-10 pt-14">
      <Link href="/projects" className="text-sm text-accent hover:underline">All projects</Link>
      <h1 className="mt-4 font-display text-4xl font-semibold">{p.title}</h1>
      {p.status && <p className="mt-2 inline-block rounded-full border border-amber-400/50 px-3 py-0.5 font-mono text-xs text-amber-300">{p.status}</p>}
      <p className="mt-3 text-slate-400">{p.summary}</p>
      <dl className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
        <div><dt className="text-slate-400">Type</dt><dd>{p.category}</dd></div>
        <div><dt className="text-slate-400">My role</dt><dd><Txt s={p.role} /></dd></div>
      </dl>
      <div className="mt-5 flex flex-wrap gap-3">
        {p.github ? <a className="btn-ghost" href={p.github} target="_blank" rel="noopener noreferrer"><Github size={16} aria-hidden />Repository</a> : <span className="btn-off">Repository link to add</span>}
        {p.demo ? <a className="btn-ghost" href={p.demo} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} aria-hidden />Live demo</a> : <span className="btn-off">No public demo</span>}
      </div>
      <Sec t="Overview"><p>{p.overview}</p></Sec>
      <Sec t="Problem"><p><Txt s={p.problem} /></p></Sec>
      <Sec t="Objectives"><List items={p.objectives} /></Sec>
      <Sec t="Solution"><p><Txt s={p.solution} /></p></Sec>
      <Sec t="System architecture"><div className="panel overflow-x-auto p-5"><ArchDiagram steps={p.architecture} /></div>
        {p.archNote && <p className="text-sm text-slate-400"><Txt s={p.archNote} /></p>}</Sec>
      <Sec t="Technical implementation"><List items={p.implementation} /></Sec>
      <Sec t="Key decisions">{p.decisions.map((d, k) => <p key={k}><strong className="text-white"><Txt s={d.t} />.</strong> <Txt s={d.why} /></p>)}</Sec>
      <Sec t="Challenges">{p.challenges.map((c, k) => <p key={k}><strong className="text-white"><Txt s={c.c} />.</strong> <Txt s={c.a} /></p>)}</Sec>
      <Sec t="Results and evaluation"><List items={p.results} /></Sec>
      <Sec t="Screenshots and demo">{p.images?.length
  ? <div className="grid gap-4">{p.images.map((im) => <Image key={im.src} src={im.src} alt={im.alt} width={1200} height={700} className="h-auto w-full rounded-lg border border-slate-700" />)}</div>
  : <p className="text-slate-400">Screenshots will be added soon. {p.github ? "The repository is linked above." : ""}</p>}</Sec>
      <Sec t="Lessons and next steps"><List items={p.lessons} /></Sec>
      <Sec t="Technologies"><ul className="flex flex-wrap gap-1.5">{p.tech.map((t) => <li key={t} className="tag"><Txt s={t} /></li>)}</ul></Sec>
      <nav className="mt-14 flex justify-between border-t border-slate-800 pt-6 text-sm" aria-label="Project navigation">
        {prev ? <Link href={`/projects/${prev.slug}`} className="text-accent hover:underline">← {prev.title}</Link> : <span />}
        {next ? <Link href={`/projects/${next.slug}`} className="text-accent hover:underline">{next.title} →</Link> : <span />}
      </nav>
    </article>
  );
}
