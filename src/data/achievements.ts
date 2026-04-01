export interface Achievement {
  id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export const achievements: Achievement[] = [
  {
    id: "ach-1",
    title: "Best Innovation Award",
    organization: "Example Corp",
    date: "2023",
    description: "Recognized for developing an internal tool that saved 200+ engineering hours per quarter.",
  },
  {
    id: "ach-2",
    title: "Open Source Contributor",
    organization: "Major OSS Project",
    date: "2022",
    description: "Contributed key features adopted by thousands of developers worldwide.",
  },
];
