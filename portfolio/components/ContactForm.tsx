"use client";
import { useState } from "react";
import { site } from "@/lib/site";

export default function ContactForm() {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  if (!site.formEndpoint)
    return <p className="panel p-5 text-sm todo">The contact form is not connected yet. Set NEXT_PUBLIC_FORM_ENDPOINT (for example a Formspree URL) in your environment to enable it.</p>;
  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setState("loading");
    const f = e.currentTarget;
    try {
      const r = await fetch(site.formEndpoint, { method: "POST", headers: { Accept: "application/json" }, body: new FormData(f) });
      if (!r.ok) throw new Error();
      f.reset(); setState("ok");
    } catch { setState("error"); }
  }
  const field = "mt-1 w-full rounded-md border border-slate-600 bg-navy px-3 py-2 text-sm";
  return (
    <form onSubmit={submit} className="panel grid gap-4 p-5" aria-busy={state === "loading"}>
      <label className="text-sm">Name<input name="name" required minLength={2} autoComplete="name" className={field} /></label>
      <label className="text-sm">Email<input name="email" type="email" required autoComplete="email" className={field} /></label>
      <label className="text-sm">Subject<input name="subject" required minLength={3} className={field} /></label>
      <label className="text-sm">Message<textarea name="message" required minLength={10} rows={5} className={field} /></label>
      <button className="btn-primary justify-center disabled:opacity-60" disabled={state === "loading"}>{state === "loading" ? "Sending…" : "Send message"}</button>
      <p role="status" className="text-sm">
        {state === "ok" && <span className="text-emerald-400">Message sent. I'll reply as soon as I can.</span>}
        {state === "error" && <span className="text-red-400">The message could not be sent. Check your connection and try again{site.email ? `, or write to ${site.email}` : ""}.</span>}
      </p>
    </form>
  );
}
