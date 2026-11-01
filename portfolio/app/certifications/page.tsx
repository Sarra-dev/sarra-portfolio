import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import { certifications } from "@/lib/data";
export const metadata: Metadata = { title: "Certifications" };
export default function Page() {
  return <><PageHead title="Certifications" intro="Formal certifications are labelled separately from course certificates." />
    <ul className="wrap grid gap-5 md:grid-cols-2">{certifications.map((c) => (
      <li key={c.name} className="panel p-5"><p className="font-mono text-xs text-accent">{c.kind}</p>
        <h2 className="mt-1 font-display text-lg font-semibold">{c.name}</h2><p className="text-sm text-slate-400">{c.provider}</p>
        {c.date && <p className="mt-2 text-sm">{c.date}</p>}
        {c.url && <a href={c.url} className="mt-2 inline-block text-sm text-accent hover:underline" target="_blank" rel="noopener noreferrer">Verify credential</a>}</li>))}</ul></>;
}