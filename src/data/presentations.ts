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
    images: [{ src: "/images/presentations/numericalfinal/numericala.jpeg", alt: "Black-Scholes presentation" }],
  },
  {
    id: "pres-2",
    title: "Smart City Firefighting Autonomous Data Collection",
    event: "Texas State Data Analytics Showcase",
    location: "Texas State University, San Marcos, Texas",
    date: "Apr. 2023",
    images: [{ src: "/images/presentations/dataanalytics/data1.jpg", alt: "Data Analytics Showcase" },
      { src: "/images/presentations/dataanalytics/data2.jpg", alt: "Data Analytics Showcase" },
      { src: "/images/presentations/dataanalytics/data3.jpg", alt: "Data Analytics Showcase" },
    ],
  },
  {
    id: "pres-3",
    title: "RPCA and k-means Methods on Video Footage for Motion Detection",
    event: "Texas State Math Graduate Expo",
    location: "Texas State University, San Marcos, Texas",
    date: "Nov. 2022",
    images: [{ src: "/images/presentations/mathgradexpo/mathexpo1.jpg", alt: "Math Graduate Expo" }],
  },
  {
    id: "pres-4",
    title: "RPCA and k-means Methods on Video Footage for Motion Detection",
    event: "5th Annual Meeting of the SIAM Texas-Louisiana Section",
    location: "University of Houston, Houston, Texas",
    date: "Oct. 2022",
    images: [{ src: "/images/presentations/siam/siam1.jpg", alt: "SIAM presentation" },
      { src: "/images/presentations/siam/siam2.jpg", alt: "SIAM presentation" },
    ],
  },
  {
    id: "pres-5",
    title: "Smart City Firefighting Autonomous Data Collection",
    event: "Data Science Symposium (SyData 2022)",
    location: "Texas State University, San Marcos, Texas",
    date: "Sep. 2022",
    images: [
      { src: "/images/presentations/sydata/sydata1.jpg", alt: "SyData presentation" },
      { src: "/images/presentations/sydata/sydata2.jpg", alt: "SyData presentation" },
    ],
  },
  {
    id: "pres-6",
    title: "Smart City Firefighting Autonomous Data Collection",
    event: "Numerical Methods for Data Science and Engineering",
    location: "Texas State University, San Marcos, Texas",
    date: "Sep. 2022",
    images: [{ src: "/images/presentations/nmdse/nmdse.png", alt: "Numerical Methods presentation" }],
  },
  {
    id: "pres-7",
    title: "Smart City Firefighting Autonomous Data Collection",
    event: "NSF REU Presentation Competition",
    location: "Texas State University, San Marcos, Texas",
    date: "Jul. 2022",
    award: "First Place Awardee",
    images: [
      { src: "/images/presentations/nsfreu/r2.jpg", alt: "NSF REU presentation" },
      { src: "/images/presentations/nsfreu/r3.jpg", alt: "NSF REU presentation" },
      { src: "/images/presentations/nsfreu/r4.jpg", alt: "NSF REU presentation" },
      { src: "/images/presentations/nsfreu/r6.jpg", alt: "NSF REU presentation" },
      { src: "/images/presentations/nsfreu/r8.jpg", alt: "NSF REU presentation" },
      { src: "/images/presentations/nsfreu/reu-txst.jpg", alt: "NSF REU presentation" },
    ],
  },
  {
    id: "pres-8",
    title: "RPCA and k-means Methods on Video Footage for Motion Detection",
    event: "Undergraduate Research Conference",
    location: "Texas State University, San Marcos, Texas",
    date: "Apr. 2022",
    images: [
      { src: "/images/presentations/uhrc/uhrc1.jpg", alt: "Undergraduate Research Conference" },
      { src: "/images/presentations/uhrc/uhrc2.jpg", alt: "Undergraduate Research Conference" },
      { src: "/images/presentations/uhrc/uhrc3.jpg", alt: "Undergraduate Research Conference" },
    ],
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
