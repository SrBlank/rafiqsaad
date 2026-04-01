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
    title: "WallpaperGen — Automated System Wallpaper Generator (Linux)",
    period: "Dec 2024 — Jan 2026",
    description:
      "Designed and built a Python-based wallpaper generation pipeline that programmatically composes astronomical star plots, weather data, and UI widgets into a single high-resolution desktop wallpaper. Implemented OS-aware automation using systemd user services and timers to schedule wallpaper updates at configurable intervals without blocking login or user sessions. Integrated external APIs (weather, geolocation) with robust caching, retry logic, and timezone handling to ensure reliable, deterministic rendering. Developed a config-driven architecture (YAML) enabling theme customization, layout scaling, and widget placement without code changes. Engineered image processing and compositing workflows using Pillow (alpha blending, scaling, rounded masks, transparency) to dynamically adapt layouts across screen resolutions. Built cross-desktop compatibility logic (GNOME, KDE, Arch/Ubuntu) for programmatic wallpaper setting via environment detection. Packaged the project with install/uninstall scripts, virtual environments, and documentation to support reproducible setup on fresh Linux systems.",
    technologies: ["Python", "Pillow", "systemd", "YAML", "Linux"],
    images: [],
  },
  {
    id: "proj-2",
    title: "Black Scholes Methods",
    period: "Apr 2023 — May 2023",
    description:
      "In this project, we conduct a comparative analysis of numerical methods for pricing American-style options under the Black–Scholes framework. Specifically, we evaluate the Binomial Tree method, the Crank–Nicolson finite difference scheme, and an explicit Runge–Kutta SERKv2 approach with respect to computational efficiency, numerical stability, and convergence behavior. By analyzing their performance across varying discretization parameters and market conditions, we identify the practical trade-offs that influence method selection for solving free-boundary option pricing problems.",
    technologies: ["Python", "NumPy", "Matplotlib", "Financial Mathematics"],
    images: [],
  },
  {
    id: "proj-3",
    title: "SLAM Person Mapping",
    period: "Aug 2024 — Dec 2024",
    description:
      "This project uses Simultaneous Localization and Mapping (SLAM) to track and map people in real-time within a changing environment. By combining a stream of footage and machine learning, the system will identify and follow people as they move, updating the map continuously. This project can be applied to areas like indoor navigation, autonomous robots, and smart surveillance, with a focus on reliable human detection.",
    technologies: ["Python", "ROS2", "OpenCV", "Machine Learning", "SLAM"],
    images: [],
  },
  {
    id: "proj-4",
    title: "RPI-Alarm",
    period: "Oct 2022 — Feb 2023",
    description:
      "In this project, we developed RPI-Alarm, a network-based alarm system built with Flask that enables users to schedule and control alarms remotely from any device on a local network. The system integrates software and hardware components, including an ESP32 microcontroller with an HC-SR04 proximity sensor, GPIO and keyboard inputs, and cross-platform support for Windows and Linux environments. Through this project, we explored full-stack web development, embedded systems communication, and event-driven design while addressing real-world reliability and usability challenges in alarm-based automation.",
    technologies: ["Python", "Flask", "ESP32", "Raspberry Pi", "IoT"],
    images: [],
  },
];
