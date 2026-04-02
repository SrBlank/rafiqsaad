export interface Education {
  id: string;
  degree: string;
  institution: string;
  status: string;
}

export const education: Education[] = [
  {
    id: "edu-1",
    degree: "M.S. Computer Science",
    institution: "Georgia Institute of Technology",
    status: "Expected Graduation May 2028",
  },
  {
    id: "edu-2",
    degree: "B.S. Computer Science",
    institution: "Texas State University",
    status: "Graduated December 2024",
  },
  {
    id: "edu-3",
    degree: "B.S. Applied Mathematics",
    institution: "Texas State University",
    status: "Graduated December 2024",
  },
];
