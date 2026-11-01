import type { Metadata } from "next";
import ProjectsGallery from "@/components/ProjectsGallery";
import { PageHead } from "@/components/ui";
export const metadata: Metadata = { title: "Projects", description: "AI, machine learning, RAG and data engineering projects by Sarra Ben Bettaieb." };
export default function Page() {
  return <><PageHead title="Projects" intro="Machine learning, RAG, NLP and data projects. Open a case study for architecture, decisions and verified results." /><ProjectsGallery /></>;
}
