"use client";
import { useMemo, useState } from "react";
import { categories, projects, type Category } from "@/lib/data";
import { ProjectCard } from "./ui";

export default function ProjectsGallery() {
  const [cat, setCat] = useState<Category | null>(null);
  const [q, setQ] = useState("");
  const list = useMemo(() => projects.filter((p) =>
    (!cat || p.category === cat) && (p.title + p.summary + p.tech.join(" ")).toLowerCase().includes(q.toLowerCase())), [cat, q]);
  const active = cat !== null || q !== "";
  return (
    <div className="wrap pb-20">
      <div className="mb-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter projects by category">
        {categories.map((c) => (
          <button key={c} aria-pressed={cat === c} onClick={() => setCat(cat === c ? null : c)}
            className={`rounded-full border px-3 py-1.5 text-sm ${cat === c ? "border-accent bg-accent text-white" : "border-slate-600 text-slate-300 hover:border-accent"}`}>{c}</button>
        ))}
        <label className="sr-only" htmlFor="q">Search projects</label>
        <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or technology"
          className="ml-auto w-full rounded-md border border-slate-600 bg-card px-3 py-1.5 text-sm sm:w-64" />
        {active && <button className="text-sm text-accent underline" onClick={() => { setCat(null); setQ(""); }}>Reset filters</button>}
      </div>
      <p className="mb-4 text-sm text-slate-400" aria-live="polite">{list.length} project{list.length === 1 ? "" : "s"}</p>
      {list.length === 0 ? (
        <div className="panel p-10 text-center"><p className="font-medium">No project matches these filters.</p>
          <button className="btn-primary mt-4" onClick={() => { setCat(null); setQ(""); }}>Show all projects</button></div>
      ) : <div className="grid gap-6 md:grid-cols-2">{list.map((p) => <ProjectCard key={p.slug} p={p} />)}</div>}
    </div>
  );
}
