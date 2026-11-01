import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { PageHead, CvButton, Socials } from "@/components/ui";
import { site } from "@/lib/site";
export const metadata: Metadata = { title: "Contact" };
export default function Page() {
  return <><PageHead title="Contact" intro={`${site.availability}. Recruiters and teams are welcome to reach out.`} />
    <div className="wrap grid gap-8 md:grid-cols-2">
      <div className="space-y-4 text-sm"><p>Email: {site.email ? <a className="text-accent hover:underline" href={`mailto:${site.email}`}>{site.email}</a> : <span className="todo">[TODO: professional email]</span>}</p>
        <Socials /><CvButton /></div>
      <ContactForm />
    </div></>;
}
