import type { Metadata } from "next";
import { PageHead } from "@/components/ui";
import { skills } from "@/lib/data";
export const metadata: Metadata = { title: "Skills" };
export default function Page() {
  return <><PageHead title="Skills" intro="Technologies I have used or studied well enough to discuss in depth." />
    <div className="wrap grid gap-6 md:grid-cols-2">{skills.map((s) => (
      <section key={s.group} className="panel p-5"><h2 className="font-display text-lg font-semibold">{s.group}</h2>
        <ul className="mt-3 flex flex-wrap gap-1.5">{s.items.map((i) => <li key={i} className="tag">{i}</li>)}</ul></section>))}</div></>;
}
