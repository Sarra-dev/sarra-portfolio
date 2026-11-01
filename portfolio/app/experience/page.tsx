import type { Metadata } from "next";
import { PageHead, Txt } from "@/components/ui";
import { experience } from "@/lib/data";
export const metadata: Metadata = { title: "Experience" };
export default function Page() {
  return <><PageHead title="Experience" />
    <div className="wrap">
      <ol className="max-w-3xl space-y-8 border-l border-slate-700 pl-6">{experience.map((e) => (
        <li key={e.role + e.dates}><p className="font-mono text-xs text-accent"><Txt s={e.dates} /></p>
          <h2 className="font-display text-xl font-semibold">{e.role} · {e.org}</h2>{e.place && <p className="text-sm text-slate-400">{e.place}</p>}
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-300">{e.points.map((p, k) => <li key={k}><Txt s={p} /></li>)}</ul></li>))}
      </ol>
    </div></>;
}