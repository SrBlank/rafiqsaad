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
    images: [{ src: "/images/placeholder.png", alt: "Black-Scholes presentation" }],
  },
  {
    id: "pres-2",
    title: "Smart City Firefighting Autonomous Data Collection",
    event: "Texas State Data Analytics Showcase",
    location: "Texas State University, San Marcos, Texas",
    date: "Apr. 2023",
    images: [{ src: "/images/placeholder.png", alt: "Data Analytics Showcase" }],
  },
  {
    id: "pres-3",
    title: "RPCA and k-means Methods on Video Footage for Motion Detection",
    event: "Texas State Math Graduate Expo",
    location: "Texas State University, San Marcos, Texas",
    date: "Nov. 2022",
    images: [{ src: "/images/placeholder.png", alt: "Math Graduate Expo" }],
  },
  {
    id: "pres-4",
    title: "RPCA and k-means Methods on Video Footage for Motion Detection",
    event: "5th Annual Meeting of the SIAM Texas-Louisiana Section",
    location: "University of Houston, Houston, Texas",
    date: "Oct. 2022",
    images: [{ src: "/images/placeholder.png", alt: "SIAM presentation" }],
  },
  {
    id: "pres-5",
    title: "Smart City Firefighting Autonomous Data Collection",
    event: "Data Science Symposium (SyData 2022)",
    location: "Texas State University, San Marcos, Texas",
    date: "Sep. 2022",
    images: [{ src: "/images/placeholder.png", alt: "SyData presentation" }],
  },
  {
    id: "pres-6",
    title: "Smart City Firefighting Autonomous Data Collection",
    event: "Numerical Methods for Data Science and Engineering",
    location: "Texas State University, San Marcos, Texas",
    date: "Sep. 2022",
    images: [{ src: "/images/placeholder.png", alt: "Numerical Methods presentation" }],
  },
  {
    id: "pres-7",
    title: "Smart City Firefighting Autonomous Data Collection",
    event: "NSF REU Presentation Competition",
    location: "Texas State University, San Marcos, Texas",
    date: "Jul. 2022",
    award: "First Place Awardee",
    images: [
      { src: "/images/r2.jpg", alt: "NSF REU presentation audience" },
      { src: "/images/r3.jpg", alt: "Presenting with robot" },
      { src: "/images/r4.jpg", alt: "Poster presentation" },
      { src: "/images/r6.jpg", alt: "First place award ceremony" },
      { src: "/images/r8.jpg", alt: "Team photo" },
      { src: "/images/reu-txst.jpg", alt: "REU presentation with robot" },
    ],
  },
  {
    id: "pres-8",
    title: "RPCA and k-means Methods on Video Footage for Motion Detection",
    event: "Undergraduate Research Conference",
    location: "Texas State University, San Marcos, Texas",
    date: "Apr. 2022",
    images: [{ src: "/images/placeholder.png", alt: "Undergraduate Research Conference" }],
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
