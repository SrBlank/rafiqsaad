export interface Project {
  id: string;
  title: string;
  period: string;
  description: string;
  technologies: string[];
  link?: string;
  github?: string;
  images: { src: string; alt: string }[];
}

export const projects: Project[] = [
  {
    id: "proj-1",
    title: "ShellSweeper",
    period: "Mar 2026",
    description: "Built ShellSweeper, a terminal-based Minesweeper-style game that runs entirely in the command line with real-time keyboard interaction using curses. Implemented core game logic, grid generation, and a responsive text-based UI. Packaged and distributed the project via a GitHub-hosted APT repository for easy installation on Debian-based systems.",
    technologies: ["Python", "curses", "CLI", "Linux", "GitHub", "APT"],
    images: [
      { src: "/images/projects/shellsweeper/home.png", alt: "ShellSweeper home" },
      { src: "/images/projects/shellsweeper/start.png", alt: "ShellSweeper start" },
      { src: "/images/projects/shellsweeper/game.png", alt: "ShellSweeper game" },
    ],
  },
  {
    id: "proj-2",
    title: "WallpaperGen — Automated System Wallpaper Generator",
    period: "Dec 2024 — Jan 2026",
    description:
      "Designed and built a Python-based wallpaper generation pipeline that composes astronomical visuals, weather data, and UI widgets into high-resolution desktop wallpapers. Implemented OS-aware automation with systemd timers and a config-driven (YAML) architecture for customizable, reliable updates across Linux environments. Engineered robust API integrations and image processing workflows (Pillow) to ensure dynamic, cross-desktop compatibility and reproducible deployment.",
    technologies: ["Python", "Pillow", "systemd", "YAML", "Linux"],
    images: [
      { src: "/images/projects/wallpapergen/composite_plot.png", alt: "WallpaperGen composite" },
    ],
  },
  {
    id: "proj-3",
    title: "SLAM Person Mapping",
    period: "Aug 2024 — Dec 2024",
    description:
      "Developed a real-time SLAM-based system for detecting and mapping people in dynamic indoor environments, combining computer vision with robotics. Integrated MobileNet-SSD for human detection with LiDAR-based SLAM (Hector SLAM) to continuously localize and update positions, bridging Python 3 vision pipelines with a Python 2 ROS stack. This project was completed as part of a computer vision course and extended into research, demonstrating practical applications in autonomous robotics and human-aware mapping.",
    technologies: ["Python", "ROS2", "OpenCV", "SLAM", "LiDAR", "Hector SLAM", "Computer Vision", "Sensors", "Depth Camera"],
    images: [],
  },
  {
    id: "proj-4",
    title: "Black Scholes Methods",
    period: "Apr 2023 — May 2023",
    description:
      "In this project, we conduct a comparative analysis of numerical methods for pricing American-style options under the Black-Scholes framework. Specifically, we evaluate the Binomial Tree method, the Crank–Nicolson finite difference scheme, and an explicit Runge–Kutta SERKv2 approach with respect to computational efficiency, numerical stability, and convergence behavior. By analyzing their performance across varying discretization parameters and market conditions, we identify the practical trade-offs that influence method selection for solving free-boundary option pricing problems.",
    technologies: ["Python", "NumPy", "Matplotlib", "Financial Mathematics"],
    images: [],
  },
  {
    id: "proj-5",
    title: "RPI-Alarm",
    period: "Oct 2022 — Feb 2023",
    description:
      "Built RPI-Alarm, a network-based alarm system using Flask that allows remote scheduling and control from any device on a local network, motivated by my own difficulty waking up and the need for a more reliable, speaker-connected solution. The system integrates an ESP32 with an HC-SR04 proximity sensor, along with GPIO and keyboard inputs, and supports both Windows and Linux environments. This project demonstrates my experience in full-stack development, embedded systems integration, and event-driven design, with a focus on reliability and real-world usability.",
    technologies: ["Python", "Flask", "ESP32", "Raspberry Pi", "IoT"],
    images: [
      { src: "/images/projects/rpialarm/RPI_main.png", alt: "RPI-Alarm main" },
      { src: "/images/projects/rpialarm/RPI_new.png", alt: "RPI-Alarm new" },
      { src: "/images/projects/rpialarm/rpi_new_alarms.png", alt: "RPI-Alarm new alarms" },
      { src: "/images/projects/rpialarm/RPI_settings.png", alt: "RPI-Alarm settings" },
    ],
  },
  {
    id: "proj-6",
    title: "Movie Reviews",
    period: "Nov 2022",
    description: "Built a simple Flask web app that displays a random movie on each refresh and allows logged-in users to leave reviews. Integrated The Movie Database and Wikimedia APIs to fetch movie details and related content, with reviews stored in PostgreSQL. Deployed the application on Fly.io.",
    technologies: ["Python", "Flask", "PostgreSQL", "TMDb API", "Wikimedia API", "Fly.io", "HTML", "CSS"],
    images: [
      { src: "/images/projects/moviereviews/sav1.png", alt: "Movie Reviews screenshot 1" },
      { src: "/images/projects/moviereviews/save2.png", alt: "Movie Reviews screenshot 2" },
    ],
  },
  {
    id: "proj-7",
    title: "TextSum",
    period: "Nov 2022",
    description: "Built a Flask web app that summarizes user-provided text using the Hugging Face inference API. Added optional user accounts to save summaries in a database or use the tool anonymously. Deployed the application on Fly.io.",
    technologies: ["Python", "Flask", "Hugging Face Inference API", "PostgreSQL", "Fly.io", "HTML", "CSS"],
    images: [
      { src: "/images/projects/txstsum/123.png", alt: "TextSum screenshot 1" },
      { src: "/images/projects/txstsum/1234.png", alt: "TextSum screenshot 2" },
      { src: "/images/projects/txstsum/12345-1.png", alt: "TextSum screenshot 3" },
    ],
  },
];
