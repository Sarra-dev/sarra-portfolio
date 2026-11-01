export const categories = ["Machine Learning", "Generative AI & RAG", "NLP & Recommendation Systems", "Data Engineering & Analytics", "AI Automation"] as const;
export type Category = (typeof categories)[number];

export type Project = {
  slug: string; title: string; summary: string; category: Category; tech: string[];
  role: string; overview: string; problem: string; objectives: string[]; solution: string;
  architecture: string[]; archNote?: string; implementation: string[];
  decisions: { t: string; why: string }[]; challenges: { c: string; a: string }[];
  results: string[]; lessons: string[]; github?: string; demo?: string; featured?: boolean;
  status?: string; images?: { src: string; alt: string }[];
};

export const projects: Project[] = [
    {
    slug: "tunidata-compass", title: "TuniData Compass", category: "NLP & Recommendation Systems", featured: true,
    summary: "An AI platform for the Tunisian IT job market, from collected postings to hybrid candidate–job matching.",
    tech: ["Python", "SBERT", "FastAPI", "React", "MongoDB", "Docker", "Gemini API"],
    role: "Team project. I built the job-matching engine (hybrid scoring and skill-gap analysis) and the CV upload feature.",
    overview: "An intelligent platform for the Tunisian IT job market. It collects job postings, extracts skills with NLP, classifies offers by domain, and compares a candidate's profile with the offers. It also shows the skills a candidate is missing and can generate a tailored cover letter with Gemini.",
    problem: "Students and job seekers struggle to find the offers that really match their profile, and to understand which skills the market actually asks for.",
    objectives: ["Collect job postings from several sources", "Extract skills and classify offers into domains such as Data Science, Software Engineering, DevOps and Cybersecurity", "Recommend offers from a candidate's CV and show their skill gaps"],
    solution: "A candidate uploads a CV, and the matching engine scores every offer with a hybrid of three signals: skill overlap, Sentence-BERT semantic similarity and domain match. It then reports the missing skills for each offer.",
    architecture: ["Job sources (scrapers)", "Processing & skill extraction", "Domain classification", "CV upload", "Hybrid matching engine", "Skill-gap analysis", "React / FastAPI app"],
    archNote: "Simplified view of the platform's main stages.",
    implementation: [
      "Hybrid score: 40% skill overlap, 45% SBERT semantic similarity, 15% domain match",
      "Skill-gap analysis: for each domain, the most frequent skills in the offers are compared with the candidate's skills",
      "CV upload feature feeding the matching engine",
      "Built by the team: scrapers collecting title, company, description and location, JWT + bcrypt authentication, MongoDB for user data, Gemini cover-letter generation, and a Docker setup for collaboration",
    ],
    decisions: [
      { t: "Hybrid scoring", why: "Keyword-only matching misses synonyms, while embedding-only matching can recommend an offer that is close in meaning but not in required skills. Combining the three signals offsets each one's weakness." },
      { t: "Sentence-BERT", why: "It turns texts into vectors that represent their meaning, so a profile and an offer can be compared beyond exact words." },
    ],
    challenges: [{ c: "Slow application start-up because SBERT embeddings take time to compute", a: "The API starts with a lighter TF-IDF search while the SBERT embeddings are generated in a background thread and cached. Once ready, the system switches to semantic search automatically." }],
    results: ["1,062+ job postings collected from 3 sources", "287+ skills extracted with NLP", "Postings classified into 10 domains", "Evaluation was qualitative: tested with different profiles, and the recommended offers matched their skills and domain"],
    lessons: ["Falling back to a lighter method at start-up keeps the API available while heavier models load.", "Next steps: evaluate matching quality on labelled CV–job pairs."],
    github: "https://github.com/weslatiwissem/TuniData-Compass", demo: "",
    images: [
      { src: "/images/Tunidata_compass1.png", alt: "" },
      { src: "/images/Tunidata_compass2.png", alt: "" },
      { src: "/images/Tunidata_compass3.png", alt: "" },
      { src: "/images/Tunidata_compass4.png", alt: "" },
      { src: "/images/Tunidata_compass5.png", alt: "" },
    ],
  },
    {
    slug: "fitness-assistant-rag", title: "Fitness Assistant RAG", category: "Generative AI & RAG", featured: true,
    summary: "A conversational fitness assistant that answers from a local knowledge base and keeps working if the LLM is down.",
    tech: ["React", "FastAPI", "Gemini API", "TF-IDF", "Python"],
    role: "Sole developer. I designed and built the whole application: the RAG pipeline, the FastAPI backend, the React frontend, the tests and the deployment.",
    overview: "A web application where a user asks questions about sport, exercises and nutrition. The assistant retrieves the most relevant entries from a small local knowledge base, sends them to Gemini as context, and returns a personalised answer with its sources.",
    problem: "A generic chatbot gives fitness advice that is not grounded in a curated source, and an app that depends on an external LLM stops working when that service fails.",
    objectives: ["Ground answers in a curated knowledge base", "Return structured workout and diet plans the interface can display", "Keep the application working when Gemini is unavailable"],
    solution: "FastAPI retrieves context with TF-IDF and cosine similarity, builds a framed prompt for Gemini, and returns the answer with its sources. A rules-based fallback answers when Gemini fails.",
    architecture: ["React frontend", "POST /api/chat → FastAPI", "TF-IDF + cosine similarity (knowledge base)", "Gemini with framed prompt", "Answer + sources", "Fallback: rules-based plan"],
    implementation: [
      "Knowledge base of 24 exercises and 13 nutrition tips, searched with TF-IDF and cosine similarity; the 4 closest entries are kept",
      "The prompt contains a coach system prompt limited to fitness and nutrition, the last 8 messages of the conversation, and the retrieved entries",
      "Plans use a strict WORKOUT PLAN: / DIET PLAN: format so the frontend can display them reliably",
      "If the Gemini key is missing or invalid, or Gemini is down, a fallback module detects the goal (weight loss, muscle, endurance) and level, then builds a plan from rules",
      "The API returns the answer and its sources (title and category), which the interface displays",
      "Backend on Render and frontend on Vercel; the Gemini key lives in an environment variable, not in the code",
    ],
    decisions: [
      { t: "TF-IDF instead of embeddings", why: "The knowledge base is small, and TF-IDF is simple, fast and light enough. If it grew or needed semantic queries, I would move to embeddings with FAISS or pgvector." },
      { t: "Gemini, with a fallback", why: "Gemini met the generation needs and was easy to integrate, and the fallback stops the external dependency from becoming a single point of failure." },
      { t: "FastAPI and React", why: "FastAPI suits Python AI and data work and builds a REST API quickly; React gives a dynamic interface that connects easily to an API." },
    ],
    challenges: [
      { c: "Avoiding a single point of failure on the LLM", a: "A rules-based fallback takes over when Gemini is unavailable, so the application always answers." },
      { c: "Making LLM responses predictable for the interface", a: "A defined output format in the prompt separates workout plans from diet plans." },
    ],
    results: ["24 exercises and 13 nutrition tips indexed", "Backend tested with pytest and the FastAPI TestClient, with an offline mode so tests do not depend on Gemini", "Deployed: backend on Render, frontend on Vercel"],
    lessons: ["A simple retriever is enough for a small, focused corpus.", "Next steps: embedding-based retrieval if the corpus grows, and an evaluation set for answer quality."],
    github: "https://github.com/Sarra-dev/fitness-assistant", demo: "https://fitness-assistant-weld.vercel.app/",
    images: [
      { src: "/images/fitness_chatbot1.png", alt: "" },
      { src: "/images/fitness_chatbot2.png", alt: "" },
      { src: "/images/fitness_chatbot3.png", alt: "" },
    ],
  },
  {
    slug: "market-analysis", title: "Market Analysis", category: "Data Engineering & Analytics", featured: true,
    summary: "International IT job postings collected, processed and exposed through an API and dashboard.",
    tech: ["Scrapy", "Adzuna API", "PostgreSQL", "spaCy", "FastAPI", "React", "Recharts"],
    role: "I built the project end to end: data collection, storage, entity extraction, the API and the dashboard.",
    overview: "A job-market analytics platform that collects international IT job postings, processes the data, extracts information, and exposes analytics through an API and dashboard.",
    problem: "Raw job postings are unstructured text spread over many searches and countries, which makes market trends hard to read.",
    objectives: ["Collect IT job postings across several countries", "Extract entities from posting text", "Expose analytics through an API and an interactive dashboard"],
    solution: "Postings are collected with Scrapy and the Adzuna API, stored in PostgreSQL, enriched with spaCy entity extraction, and served by FastAPI to a React and Recharts dashboard.",
    architecture: ["Adzuna API + Scrapy", "Processing", "spaCy extraction", "PostgreSQL", "FastAPI", "React + Recharts dashboard"],
    implementation: ["Collection driven by 13 IT-related search keywords across five countries", "spaCy-based entity extraction from posting text", "FastAPI endpoints feeding an interactive dashboard with filters and statistics"],
    decisions: [{ t: "PostgreSQL as the central store", why: "A relational database keeps collected postings and extracted entities queryable by the API." }],
    challenges: [{ c: "Collecting comparable data across five countries and 13 keywords", a: "Using one processing pipeline so every posting is stored and analysed the same way." }],
    results: ["3,506 job postings stored in PostgreSQL", "13 IT-related search keywords across five countries", "Interactive analytics dashboard"],
    lessons: ["Designing the storage schema early made the API and dashboard simple to build.", "Next steps: scheduled refreshes and trend comparisons over time."],
    github: "https://github.com/Sarra-dev/Market_Analysis", demo: "",
    images: [
      { src: "/images/market_analysis1.png", alt: "" },
      { src: "/images/market_analysis2.png", alt: "" },
      { src: "/images/market_analysis3.png", alt: "" },
    ],
  },
    {
    slug: "telegram-cv-bot", title: "Telegram CV Recommendation Bot", category: "AI Automation",
    summary: "A Telegram bot that reads a CV, asks the user to confirm it, and recommends matching job offers.",
    tech: ["Python", "Telegram Bot", "spaCy", "Tesseract OCR", "Adzuna API", "GraphQL", "Selenium"],
    role: "I developed the bot end to end during my AI & Automation internship at MindMesh (June–August 2025).",
    overview: "A Python bot that helps users search for jobs from their CV. The user sends a CV as a PDF, Word file or image, the bot extracts the key information, and then it finds matching offers through the Adzuna API.",
    problem: "Candidates have to compare their CV with many offers by hand to find the ones that fit.",
    objectives: ["Read CVs in several formats, including scans and photos", "Extract the key profile fields automatically", "Recommend offers based on job title, country and city"],
    solution: "The project works as a processing chain: extract the text, extract the information, let the user confirm it, then search for offers.",
    architecture: ["CV sent in Telegram", "Text extraction (PDF, Word, OCR)", "Information extraction (spaCy, regex, langdetect)", "User confirmation", "Profile via GraphQL / FastAPI backend", "Adzuna search (async)", "Offers in chat"],
    implementation: [
      "Text extraction depends on the format: PDF, Word (docx2txt) and images with Tesseract OCR, after image preprocessing such as grayscale and contrast enhancement",
      "spaCy detects the name and location, regular expressions find email and phone number, and langdetect identifies the CV's language",
      "Skills are matched against a predefined skills list using similarity, as a first version",
      "A conversation handler asks for the job title, country, city and level, then queries the Adzuna API asynchronously (France and Germany) and shows the best offers",
      "A human-in-the-loop step shows the extracted information to the user for confirmation before searching",
      
    ],
    decisions: [
      { t: "Telegram as the interface", why: "It gave users an interface right away, without developing a complete frontend." },
      { t: "GraphQL", why: "It lets the client request exactly the data it needs, and it was a chance to learn the technology." },
      { t: "Human-in-the-loop", why: "Extraction is not fully reliable, so the user confirms the data before it is used." },
    ],
    challenges: [{ c: "Automatically filling in job applications with Selenium", a: "Selenium autofill from the confirmed profile did not work reliably, because job postings use many different page layouts and form structures. It remains an experimental feature, and a more robust approach would need per-site handling or a standard application format." }],
    results: ["Supports PDF, Word and image CVs", "Returns 5 job offers per search (France and Germany)"],
    lessons: ["Skill extraction is still basic and partly rule-based. I would improve it with a skills taxonomy such as ESCO, sentence embeddings, or an LLM with structured output.", "The backend currently keeps profiles in memory. A real application would use PostgreSQL or MongoDB."],
    github: "https://github.com/Sarra-dev/job_agent/tree/main", demo: "",
    images: [
      { src: "/images/Job_Bot1.png", alt: "" },
      { src: "/images/Job_Bot2.png", alt: "" },
      { src: "/images/Job_Bot3.png", alt: "" },
      { src: "/images/Job_Bot4.png", alt: "" },
      { src: "/images/Job_Bot5.png", alt: "" },
      { src: "/images/Job_Bot6.png", alt: "" },
    ],
  },
  {
    slug: "road-damage-detection", title: "Road Damage Detection", category: "Machine Learning", status: "In progress",
    summary: "A computer vision project for detecting road damage, built with deployment in mind.",
    tech: ["Python", "Deep Learning", "Computer Vision", "MLOps"],
    role: "Sole developer. I am building the project myself.",
    overview: "A computer vision project focused on detecting road damage using machine learning and deployment-oriented practices. It is still in progress.",
    problem: "Finding damaged road sections by hand is slow, so an automatic detector could help prioritise repairs.",
    objectives: ["Train a model that detects road damage in images", "Track experiments and prepare the model for deployment"],
    solution: "A deep learning detection pipeline with MLOps practices for tracking and deployment, currently under development.",
    architecture: ["Road images", "Preprocessing", "Model training", "Evaluation", "Deployment"],
    archNote: "Planned pipeline. It may change as the project progresses.",
    implementation: ["Work in progress. Implementation details will be added when the pipeline is complete."],
    decisions: [{ t: "Deployment-oriented from the start", why: "Planning experiment tracking and deployment early avoids rework later." }],
    challenges: [{ c: "Project still in progress", a: "Challenges will be documented once training and evaluation are done." }],
    results: ["No results published yet. The dataset and metrics will be added when evaluation is complete."],
    lessons: ["To be added when the project is finished."],
    github: "https://github.com/Sarra-dev/road_damage_detection_project",
  },
];

export const experience = [
  { role: "Data & AI Intern", org: "Wevioo", place: "Tunisia", dates: "June–August 2026",
    points: ["Built an automated job-market data pipeline with data collection and PostgreSQL storage", "Integrated a FastAPI REST API and a React dashboard for job statistics and filtering", "Implemented NLP-based skill extraction from unstructured job descriptions using spaCy"] },
  { role: "AI & Automation Intern", org: "MindMesh", place: "Tunisia", dates: "June–August 2025",
    points: ["Developed a Telegram bot that analyses CVs in 7 formats (PDF, DOCX, TXT and images via OCR) and extracts 7 key fields using NLP", "Implemented a conversational job recommendation system returning 5 offers per search through the Adzuna API (France and Germany), with user profiles stored via a GraphQL API"] },
  { role: "Web Application Intern", org: "Wevioo", place: "Tunisia", dates: "July 2024",
    points: ["Developed a React web application for managing pet-related data and services", "Contributed to frontend development and application functionality"] },
];

export const skills = [
  { group: "AI & Machine Learning", items: ["Python", "Scikit-learn", "PyTorch", "Deep Learning", "Transformers", "SBERT", "NLP", "Feature engineering", "Model evaluation"] },
  { group: "Generative AI", items: ["LLMs", "Retrieval-Augmented Generation", "LangChain", "Embeddings", "Prompt engineering", "AI agents", "Gemini API"] },
  { group: "Data & Backend", items: ["SQL", "PostgreSQL", "MySQL", "MongoDB", "Pandas", "NumPy", "FastAPI", "Django", "REST APIs", "Data preprocessing"] },
  { group: "Frontend & Applications", items: ["React", "JavaScript", "TypeScript", "HTML", "CSS"] },
  { group: "Cloud & Tools", items: ["AWS", "Docker", "Git", "GitHub"] },
];

export const certifications = [
  { provider: "AWS", name: "AWS Cloud Practitioner", kind: "Certification", date: "", url: "" },
  { provider: "NVIDIA", name: "Fundamentals of Deep Learning", kind: "Course certificate", date: "", url: "" },
  { provider: "NVIDIA", name: "NCA Generative AI & Large Language Models (GenAI LLMs)", kind: "Certification", date: "", url: "" },
  { provider: "NVIDIA", name: "AI Infrastructure and Operations", kind: "Course certificate", date: "", url: "" },
];