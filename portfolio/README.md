# Sarra Ben Bettaieb — Portfolio

Next.js 14 · TypeScript · Tailwind CSS · Framer Motion · Lucide.

## Run locally
    npm install
    cp .env.example .env.local
    npm run dev        # http://localhost:3000

## Fill in your real content (search the repo for "TODO")
- `lib/site.ts`: email, GitHub, LinkedIn, CV path (`cv.available`), availability.
- `lib/data.ts`: projects, experience, skills, certifications. Strings starting with `[TODO` show in amber on the site until replaced.
- CV: put your PDF at `public/cv/Sarra_Ben_Bettaieb_CV.pdf`, then set `cv.available: true`.
- Contact form: create a Formspree form and set `NEXT_PUBLIC_FORM_ENDPOINT`. Until then the form stays disabled.
- Screenshots: add images under `public/projects/<slug>/` and show them in the case study.

## Deploy on Vercel
1. Push the project to a GitHub repository.
2. On vercel.com choose Add New → Project and import the repository (framework: Next.js, auto-detected).
3. Add environment variables `NEXT_PUBLIC_SITE_URL` (your final URL) and `NEXT_PUBLIC_FORM_ENDPOINT`.
4. Click Deploy. Each push to `main` redeploys automatically.
5. Optional: add a custom domain in Project → Settings → Domains, then update `NEXT_PUBLIC_SITE_URL`.
