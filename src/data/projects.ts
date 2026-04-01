export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  images: { src: string; alt: string }[];
}

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "Project Alpha",
    description: "A full-stack web application for managing team workflows with real-time collaboration features.",
    technologies: ["React", "TypeScript", "Supabase"],
    link: "https://example.com",
    github: "https://github.com",
    images: [],
  },
  {
    id: "proj-2",
    title: "CLI Tool",
    description: "A developer CLI tool that automates repetitive tasks and boosts productivity.",
    technologies: ["Rust", "CLI"],
    github: "https://github.com",
    images: [],
  },
];
