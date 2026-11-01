# Sarra Ben Bettaieb — Portfolio

Personal portfolio of **Sarra Ben Bettaieb**, Data Science & AI engineering student at Tek-Up University (Tunisia), focused on Machine Learning, Generative AI, NLP and LLM applications.

**Live site:** https://sarra-portfolio-five.vercel.app

## Features

- Home page with hero section, availability status and downloadable CV
- Project gallery with a dedicated case-study page for each project
- Experience, skills and certifications pages
- Contact form (Formspree) with a disabled state when no endpoint is configured
- SEO ready: auto-generated `sitemap.xml`, `robots.txt` and Open Graph metadata
- Responsive, dark-themed design with smooth animations

## Featured projects

| Project | Category |
|---|---|
| TuniData Compass | NLP & Recommendation Systems |
| Fitness Assistant RAG | Generative AI & RAG |
| Market Analysis | Data Engineering & Analytics |
| Telegram CV Recommendation Bot | AI Automation |
| Road Damage Detection | Machine Learning (in progress) |

## Tech stack

| Layer | Tools |
|---|---|
| Framework | Next.js (App Router), React, TypeScript |
| Styling | Tailwind CSS |
| Animation / icons | Framer Motion, Lucide React |
| Contact form | Formspree |
| Hosting | Vercel |

## Project structure

```
sarra-portfolio/
└── portfolio/              # Next.js application (Vercel root directory)
    ├── app/                # Pages and routes (projects, experience, skills, ...)
    ├── components/         # Reusable UI components
    ├── lib/
    │   ├── site.ts         # Name, links, CV path, availability
    │   └── data.ts         # Projects, experience, skills, certifications
    └── public/
        ├── images/         # Photo and project screenshots
        └── cv/             # CV (PDF)
```

## Getting started

**Prerequisites:** Node.js 20 or later and npm.

```bash
git clone https://github.com/Sarra-dev/sarra-portfolio.git
cd sarra-portfolio/portfolio
npm install
```

Create a file named `.env.local` inside `portfolio/` (see the table below), then start the dev server:

```bash
npm run dev
```

The site is available at http://localhost:3000.

### Environment variables

| Variable | Description | Example |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Public URL of the site (sitemap, robots, Open Graph) | `https://sarra-portfolio-five.vercel.app` |
| `NEXT_PUBLIC_FORM_ENDPOINT` | Formspree endpoint for the contact form. Leave empty to disable the form | `https://formspree.io/f/xxxxxxx` |

> Both variables start with `NEXT_PUBLIC_`, so they are visible in the browser. Never put private keys or tokens in them.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build locally |

## Customizing the content

- **Personal info, links, CV path, availability:** `portfolio/lib/site.ts`
- **Projects, experience, skills, certifications:** `portfolio/lib/data.ts`
- **CV:** replace the PDF in `portfolio/public/cv/` and keep the path in `site.ts` in sync
- **Screenshots:** add images to `portfolio/public/images/` and reference them in `data.ts`

## Deployment (Vercel)

1. Push this repository to GitHub.
2. On [vercel.com](https://vercel.com), click **Add New → Project** and import the repository.
3. Set **Root Directory** to `portfolio`.
4. Add the two environment variables from the table above.
5. Click **Deploy**. Every push to `main` triggers a new deployment.

To use a custom domain, add it in **Settings → Domains**, then update `NEXT_PUBLIC_SITE_URL` and redeploy.

## Contact

- Email: srrbettaieb@gmail.com
- LinkedIn: https://www.linkedin.com/in/sarra-ben-bettaieb-951818264
- GitHub: https://github.com/Sarra-dev

Currently open to 6-month PFE internships starting January 2027.
