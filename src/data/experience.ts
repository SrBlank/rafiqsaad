export interface Experience {
  id: string;
  company: string;
  role: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
  images: { src: string; alt: string }[];
  videos?: string[];
  website?: string;
}

export const experiences: Experience[] = [
  {
    id: "exp-1",
    company: "Dell Technologies",
    role: "Software Engineering Intern",
    location: "Austin, TX",
    period: "May 2024 — Aug. 2024",
    description: [
      "Developed Python SDK for AWS, Azure, and GCP platforms for Dell APEX Protection Storage Virtual Edition (DDVE)",
      "Utilized object-oriented programming practices to design a scalable and maintainable SDK",
      "Implemented deployment and post deployment configuration to automate workflows",
      "Collaborated with a team of architects and managers to ensure product will be effective for consumers",
    ],
    technologies: ["Python", "AWS", "Azure", "GCP", "SDK Development"],
    images: [
      { src: "/images/placeholder.png", alt: "Dell Technologies internship" },
    ],
    website: "https://www.dell.com/en-us",
  },
  {
    id: "exp-2",
    company: "High Performance Engineering (HiPE) Lab",
    role: "Undergraduate Researcher",
    location: "San Marcos, TX",
    period: "Jan. 2023 — Aug. 2024",
    description: [
      "Pioneering the development of three distinct drones designed to enhance firefighting efforts by collecting critical data before firefighters arrive at the scene",
      "Drone 1: 43\" drone for autonomous circling of burning structures with temperature data collection, smoke analysis, and overhead human search",
      "Drone 2: 30\" drone for entering buildings with Hector-SLAM mapping, obstacle avoidance using lidar and OAK-D Pro W depth camera, autonomous indoor flight, and human detection",
      "Drone 3: 35\" hexacopter for wildfire scenarios with thermal camera for finding hotspots, path optimization, and escape route identification",
      "Developed UI for all three drones using React, Express, and MongoDB with live camera footage, data plotting, and mode switching capabilities",
      "Crafted autonomous flight code, optimized SLAM, and built exploration path planning with mobility constraints",
    ],
    technologies: ["React", "Express", "MongoDB", "Python", "ROS2", "SLAM", "Lidar"],
    images: [
      { src: "/images/experience/scout-front.jpg", alt: "Scout drone - front view" },
      { src: "/images/experience/scout-top.jpg", alt: "Scout drone - top view" },
      { src: "/images/experience/working.jpg", alt: "Working on drone configuration" },
    ],
    videos: [
      "https://youtu.be/N2GvwWyt6VY",
      "https://youtu.be/IgRzOHUe-v4",
    ],
    website: "https://hipe.wp.txstate.edu/",
  },
  {
    id: "exp-3",
    company: "High Performance Engineering (HiPE) Lab",
    role: "Software Engineer Intern",
    location: "San Marcos, TX",
    period: "Jun. 2022 — May 2023",
    description: [
      "July 2024: Published in IEEE World AI IoT Congress",
      "April 2024: Work accepted for publication at the 2024 IEEE World AI IoT Congress",
      "August 2023: Featured in Dell white paper",
      "Designed and built a robot with the ability to climb stairs, detect people, detect screams, and collect environmental data (temperature, humidity, air pressure, and air quality)",
      "Developed software in Python using Robot Operating System (ROS2) framework enabling firefighters to communicate with and control the robot via terminal",
      "Set up three Nvidia Jetson Nanos with custom Ubuntu image enabling client communication with ROS2 and Cuda",
      "Wrote software to publish robot data from all three Jetson Nanos in real-time using pub/sub design pattern",
      "Built physical hardware enabling the robot to efficiently climb stairs by adapting NASA Rocker Bogie design",
      "Integrated machine learning models for detecting people and screams using Python subprocess library",
      "Won first place in competition against other NSF REU students, invited to present at multiple seminars",
    ],
    technologies: ["Python", "ROS2", "Nvidia Jetson", "CUDA", "Machine Learning", "IEEE"],
    images: [],
    website: "https://hipe.wp.txstate.edu/",
  },
  {
    id: "exp-4",
    company: "IOR Research Team",
    role: "Machine Learning Researcher",
    location: "San Marcos, TX",
    period: "Aug. 2021 — May 2023",
    description: [
      "Worked in Dr. Ivan Ojeda-Ruiz's lab on reducing human error in the scoring of physical activities (martial arts and dance)",
      "Deeply studied Robust Principal Component Analysis (RPCA) and k-means algorithms through papers and case studies",
      "Developed an algorithm which isolates motion from a video by removing still parts using RPCA and clustering body parts using k-means",
      "Implemented the algorithm using MATLAB enabling parameter refinement for any .mp4 video file",
      "Presented research at the undergraduate research conference hosted by the honors college to faculty and students",
    ],
    technologies: ["MATLAB", "RPCA", "k-means", "Machine Learning", "Computer Vision"],
    images: [
      { src: "/images/placeholder.png", alt: "Machine Learning Research" },
    ],
    website: "https://sites.google.com/view/ivanojedaruiz?pli=1",
  },
  {
    id: "exp-5",
    company: "Texas State University Collaborative Learning Center",
    role: "Tutor",
    location: "San Marcos, TX",
    period: "Aug. 2021 — Present",
    description: [
      "Tutor all upper-level computer science and applied mathematics courses including C++, Python, and Assembly",
      "Guide students toward correct answers by breaking down complex ideas into simpler concepts and engaging in metacognition",
      "Mentor students with various studying techniques, advice, and resources from personal experience",
      "Collaborate with other tutors for higher-level problems to develop different teaching strategies",
    ],
    technologies: ["C++", "Python", "Assembly", "Mathematics"],
    images: [
      { src: "/images/placeholder.png", alt: "Tutoring" },
    ],
    website: "https://hlsamp.cose.txst.edu/collaborative-learning-center.html",
  },
  {
    id: "exp-6",
    company: "Texas State University Learning Assistant",
    role: "Calculus II Learning Assistant",
    location: "San Marcos, TX",
    period: "Aug. 2021 — Dec. 2021",
    description: [
      "Assisted students in the Calculus II lab with studying and homework",
      "Worked with other learning assistants and professors to develop lab activities each week",
      "Shared student needs with the professor to create a more comfortable classroom environment",
      "Recorded findings about student understanding of difficult concepts and presented findings at the end of the semester",
      "Redesigned Calculus II syllabus to better apply to student needs with the math department and other learning assistants",
    ],
    technologies: ["Calculus", "Teaching", "Curriculum Design"],
    images: [],
    website: "https://www.cose.txst.edu/beyond-the-classroom/stem-communities/student-opportunities.html",
  },
  {
    id: "exp-7",
    company: "Kumon",
    role: "Math and Reading Tutor",
    location: "Austin, TX",
    period: "Sep. 2018 — Mar. 2020",
    description: [
      "Tutored Math and English to students aged 7-15",
      "Led one-on-one sessions with students to explain more advanced math topics",
      "Excelled in data entry of students' homework grades",
      "Assisted management in logistics of multiple Kumon locations in Austin",
    ],
    technologies: ["Mathematics", "English", "Data Entry"],
    images: [],
    website: "https://www.kumon.com/",
  },
  {
    id: "exp-8",
    company: "Code Ninjas",
    role: "Code Tutor",
    location: "Austin, TX",
    period: "Mar. 2019 — Jul. 2020",
    description: [
      "Tutored students in Python and Javascript aged 7-14",
      "Explained programming concepts in different varieties to adapt to different learning styles and methods of thinking",
      "Led one-on-one sessions explaining advanced programming concepts such as Object Oriented Programming and Data Structures",
      "Developed weekly Python projects for one-on-one students to complete as homework",
      "Led multiple week-long coding camps with 30+ students including programming lectures, project building, game development, and team-building activities",
    ],
    technologies: ["Python", "JavaScript", "OOP", "Data Structures"],
    images: [],
    website: "https://www.codeninjas.com/",
  },
];
