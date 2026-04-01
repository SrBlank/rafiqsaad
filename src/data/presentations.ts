export interface Presentation {
  id: string;
  title: string;
  event: string;
  date: string;
  description: string;
  link?: string;
  images: { src: string; alt: string }[];
}

export const presentations: Presentation[] = [
  {
    id: "pres-1",
    title: "Building Scalable Systems",
    event: "Tech Conference 2024",
    date: "March 2024",
    description: "Explored patterns for building systems that scale to millions of users.",
    link: "https://example.com/slides",
    images: [],
  },
];
