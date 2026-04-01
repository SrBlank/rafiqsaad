export interface Publication {
  id: string;
  title: string;
  authors: string;
  venue: string;
  details?: string;
  doi?: string;
  link?: string;
}

export interface Organization {
  id: string;
  name: string;
  institution: string;
  roles: { title: string; period: string }[];
}

export interface CourseworkCategory {
  name: string;
  courses: string[];
}

export const publications: Publication[] = [
  {
    id: "pub-1",
    title: "Design of Autonomous Rover for Firefighter Rescue: Integrating Deep Learning with ROS2",
    authors: "A. Rafiq et al.",
    venue: "2024 IEEE World AI IoT Congress (AIIoT), Seattle, WA, USA, 2024, pp. 421-428",
    doi: "10.1109/AIIoT61789.2024.10578950",
  },
  {
    id: "pub-2",
    title: "Saving lives while reducing first responder risks – with AI",
    authors: "A. Rafiq, et al.",
    venue: "[White paper] Dell Technologies, 2023",
    link: "https://workstationguides.com/briefs/texasstateuniversity/",
  },
];

export const organizations: Organization[] = [
  {
    id: "org-1",
    name: "Institute of Electrical and Electronics Engineers (IEEE)",
    institution: "Texas State University",
    roles: [
      { title: "Tech Lead of Software Engineering", period: "Aug 2023 — May 2024" },
      { title: "Member", period: "Aug 2022 — May 2024" },
    ],
  },
  {
    id: "org-2",
    name: "Society of Hispanic Professional Engineers (SHPE)",
    institution: "Texas State University",
    roles: [
      { title: "Web Director", period: "Jan 2024 — Dec 2024" },
      { title: "Member", period: "Aug 2022 — Dec 2024" },
    ],
  },
  {
    id: "org-3",
    name: "Muslim Student Association (MSA)",
    institution: "Texas State University",
    roles: [{ title: "Member", period: "Aug 2023 — Dec 2024" }],
  },
  {
    id: "org-4",
    name: "New Braunfels Training Center (NBTC)",
    institution: "New Braunfels, Texas",
    roles: [{ title: "Member", period: "May 2023 — Dec 2024" }],
  },
  {
    id: "org-5",
    name: "Training for Warriors: ASTIG",
    institution: "Austin, Texas",
    roles: [{ title: "Member", period: "Feb 2021 — Dec 2024" }],
  },
];

export const coursework: CourseworkCategory[] = [
  {
    name: "Computer Science",
    courses: [
      "Data Mining & Information Retrieval",
      "Machine Learning",
      "Computer Vision",
      "Data Structures and Algorithms",
      "Parallel Programming",
      "Software Engineering",
      "Object Oriented Programming & Design",
      "Computer Systems Security",
      "Computing Systems Fundamentals",
      "Computer Architecture",
      "Assembly (MIPS)",
      "Computer Ethics",
      "Computer Science I & II",
    ],
  },
  {
    name: "Mathematics",
    courses: [
      "Linear Algebra",
      "Numerical Analysis II",
      "Numerical Analysis I",
      "Differential Equations",
      "Discrete Math II",
      "Discrete Math I",
      "Calculus III",
      "Calculus II",
      "Calculus I",
      "Analysis I",
      "Introduction to Advanced Math",
    ],
  },
];
