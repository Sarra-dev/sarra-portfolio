export const site = {
  name: "Sarra Ben Bettaieb",
  short: "Sarra.",
  title: "AI Engineer",
  tagline: "Machine Learning · Generative AI · NLP · LLM Applications",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  email: "srrbettaieb@gmail.com",
  github: "https://github.com/Sarra-dev",
  linkedin: "https://www.linkedin.com/in/sarra-ben-bettaieb-951818264",
  // Copy your PDF to public/cv/Sarra_Ben_Bettaieb_CV.pdf, then set available: true
  cv: { path: "/cv/Resume_Sarra_Ben_Bettaieb.pdf", available: true },
  // Copy your photo to public/images/sarra.jpg (portrait, about 800x1000), then set available: true
  photo: { path: "/images/sarra.png", available: true },
  availability: "Open to 6-month PFE internships · January 2027",
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
};
export const nav = [
  ["Home", "/"], ["Projects", "/projects"], ["Experience", "/experience"], ["Skills", "/skills"],
  ["Certifications", "/certifications"],["Contact", "/contact"],
] as const;