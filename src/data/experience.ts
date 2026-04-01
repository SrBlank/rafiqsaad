export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  technologies: string[];
  images: { src: string; alt: string }[];
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Example Corp",
    role: "Senior Software Engineer",
    period: "2022 — Present",
    description: "Led development of scalable microservices architecture. Mentored junior engineers and drove adoption of best practices.",
    technologies: ["React", "TypeScript", "Node.js", "AWS"],
    images: [],
  },
  {
    id: "exp-2",
    company: "Startup Inc",
    role: "Software Engineer",
    period: "2020 — 2022",
    description: "Built core product features from scratch. Improved CI/CD pipeline reducing deployment time by 60%.",
    technologies: ["Python", "Django", "PostgreSQL", "Docker"],
    images: [],
  },
];
