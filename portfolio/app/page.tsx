import type { Metadata } from "next";
import Link from "next/link";
import { PageHead, CvButton, Socials, Portrait } from "@/components/ui";
import { site } from "@/lib/site";
export const metadata: Metadata = { title: "About" };
export default function Page() {
  return <><PageHead title="About" />
    <div className="wrap grid gap-10 md:grid-cols-[260px_1fr]">
      <div><Portrait size={260} rounded={false} /></div>
      <div className="max-w-2xl space-y-5 text-slate-300">
        <p>I'm a final-year Data Science &amp; AI engineering student at Tek-Up University, interested in building intelligent applications that connect machine learning research with practical software solutions. Through academic projects and industry experience, I've worked across data processing, NLP, recommendation systems, and LLM-powered applications. I'm particularly interested in AI engineering, Generative AI, and systems that make complex workflows more efficient.</p>
        <p><strong className="text-white">How I work.</strong> I start from a concrete use case and build a working end-to-end version, from the model to the API and the interface. Then I improve the parts that matter most: data quality, retrieval, evaluation and deployment.</p>
        <p><strong className="text-white">Education.</strong> Engineering Cycle at Tek-Up University (2024–present), after the Preparatory Cycle there (2022–2024).</p>
        <p><strong className="text-white">Languages.</strong> Arabic, English and French.</p>
        <p><strong className="text-white">Current objective.</strong> {site.availability}.</p>
        <div className="flex flex-wrap items-center gap-4 pt-2"><CvButton /><Link href="/contact" className="btn-ghost">Contact</Link><Socials /></div>
      </div>
    </div></>;
}