import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { projects } from "@/lib/data";
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/projects", "/experience", "/skills", "/certifications","/contact", ...projects.map((p) => `/projects/${p.slug}`)];
  return pages.map((p) => ({ url: `${site.url}${p}`, lastModified: new Date() }));
}
