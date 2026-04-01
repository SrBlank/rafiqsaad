export interface Presentation {
  id: string;
  title: string;
  event: string;
  location: string;
  date: string;
  award?: string;
  images: { src: string; alt: string }[];
}

export interface Poster {
  id: string;
  title: string;
  image?: string;
}

export const presentations: Presentation[] = [
  {
    id: "pres-1",
    title: "Finite Difference Methods for Solving the Black-Scholes PDE for American Options Pricing",
    event: "Numerical Analysis Research Presentation",
    location: "Texas State University, San Marcos, Texas",
    date: "Apr. 2023",
    images: [],
  },
  {
    id: "pres-2",
    title: "Smart City Firefighting Autonomous Data Collection",
    event: "Texas State Data Analytics Showcase",
    location: "Texas State University, San Marcos, Texas",
    date: "Apr. 2023",
    images: [],
  },
  {
    id: "pres-3",
    title: "RPCA and k-means Methods on Video Footage for Motion Detection",
    event: "Texas State Math Graduate Expo",
    location: "Texas State University, San Marcos, Texas",
    date: "Nov. 2022",
    images: [],
  },
  {
    id: "pres-4",
    title: "RPCA and k-means Methods on Video Footage for Motion Detection",
    event: "5th Annual Meeting of the SIAM Texas-Louisiana Section",
    location: "University of Houston, Houston, Texas",
    date: "Oct. 2022",
    images: [],
  },
  {
    id: "pres-5",
    title: "Smart City Firefighting Autonomous Data Collection",
    event: "Data Science Symposium (SyData 2022)",
    location: "Texas State University, San Marcos, Texas",
    date: "Sep. 2022",
    images: [],
  },
  {
    id: "pres-6",
    title: "Smart City Firefighting Autonomous Data Collection",
    event: "Numerical Methods for Data Science and Engineering",
    location: "Texas State University, San Marcos, Texas",
    date: "Sep. 2022",
    images: [],
  },
  {
    id: "pres-7",
    title: "Smart City Firefighting Autonomous Data Collection",
    event: "NSF REU Presentation Competition",
    location: "Texas State University, San Marcos, Texas",
    date: "Jul. 2022",
    award: "First Place Awardee",
    images: [],
  },
  {
    id: "pres-8",
    title: "RPCA and k-means Methods on Video Footage for Motion Detection",
    event: "Undergraduate Research Conference",
    location: "Texas State University, San Marcos, Texas",
    date: "Apr. 2022",
    images: [],
  },
];

export const posters: Poster[] = [
  {
    id: "poster-1",
    title: "Modern Web Architecture Patterns",
    image: "",
  },
  {
    id: "poster-2",
    title: "Real-Time Applications",
    image: "",
  },
  {
    id: "poster-3",
    title: "Cloud Infrastructure",
    image: "",
  },
];
