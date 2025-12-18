import React from 'react';
import { Project, Skill, SocialLink, NewsItem } from './types';
import { MailIcon, GithubIcon, LinkedinIcon, BookIcon, TwitterIcon, CloudIcon } from './components/Icons';

export const CV_PDF_URL = `${import.meta.env.BASE_URL}Myrick_Wang_CV.pdf`;

export const PERSONAL_INFO = {
  name: "Myrick Wang",
  title: "Electrical & Electronic Engineering",
  institution: "University of Bristol",
  location: "Bristol, UK / Xiamen, China",
  email: "myrickwan9@gmail.com",
  phone: "+86 15160733691",
  shortBio: "Specializing in Semiconductors, Mixed-Signal Circuits, and Power Electronics.",
  fullBio: "Electrical & Electronic Engineering at the University of Bristol. Focusing on semiconductor physics, analog & digital circuit design, communication systems, signals, and power conversion technologies.",
};

export const NEWS: NewsItem[] = [
  { date: "Sep 2024", content: "Started Year 2 of BEng Electrical and Electronic Engineering at University of Bristol." },
  { date: "Jun 2024", content: "Completed 'Social Network Simulation' independent research project." },
  { date: "May 2024", content: "Presented 'Optimizing Graph Traversal' at the Undergraduate Research Symposium." },
  { date: "Sep 2023", content: "Joined the Automatic Lamp Post design group as Lead Hardware Engineer." }
];

export const LANGUAGES = [
  { language: "Mandarin Chinese", level: "Native" },
  { language: "English", level: "Fluent" }
];

export const CAREER_OBJECTIVES = [
  {
    title: "Hardware Engineering & Electronic Circuit Design",
    subtitle: "AVAILABLE FOR 2025"
  },
  {
    title: "Embedded Systems Development",
    subtitle: "AVAILABLE FOR 2025"
  },
  {
    title: "Automation & Control Systems Engineering",
    subtitle: "AVAILABLE FOR 2025"
  },
  {
    title: "Technical Analysis & Engineering Consulting",
    subtitle: "AVAILABLE FOR 2025"
  }
];

export const RESEARCH_INTERESTS = [
  "Signal Processing & Analysis",
  "Embedded Systems Design",
  "Circuit Analysis & Simulation",
  "Machine Learning in Hardware",
  "Network Topology Simulation"
];

export const TECHNICAL_SKILLS = [
  {
    category: "Programming",
    items: [
      { name: "Python", details: "Data analysis, simulation, and automation (NumPy, Matplotlib, argparse)" },
      { name: "C / C++", details: "Embedded firmware, microcontroller programming" },
      { name: "MATLAB", details: "Signal processing, numerical computation" }
    ]
  },
  {
    category: "Engineering Tools",
    items: [
      { name: "Arduino", details: "Hardware prototyping & control" },
      { name: "Fusion 360", details: "3D modeling, enclosure & mechanical design" },
      { name: "Office / Workspace", details: "Documentation & collaboration" }
    ]
  }
];

export const SKILLS_DATA: Skill[] = [
  { subject: 'Python (NumPy/Matplotlib)', A: 90, fullMark: 100 },
  { subject: 'C/C++ (Embedded)', A: 85, fullMark: 100 },
  { subject: 'MATLAB', A: 80, fullMark: 100 },
  { subject: 'Circuit Design', A: 75, fullMark: 100 },
  { subject: 'Fusion 360', A: 70, fullMark: 100 },
  { subject: 'Data Analysis', A: 85, fullMark: 100 },
];

export const PROJECTS: Project[] = [
  {
    id: 'network-sim',
    title: "Social Network Simulation",
    year: "2024",
    description: "Developed a Python-based simulation framework utilizing NumPy, Matplotlib, and argparse to model random, ring, and small-world network topologies. Analyzed network properties including clustering coefficients and shortest path algorithms to visualize information spread across nodes.",
    tags: ["Python", "NumPy", "Matplotlib", "Algorithms"],
    highlight: true
  },
  {
    id: 'lamp-post',
    title: "Automatic Lamp Post Circuit",
    year: "2023",
    description: "Designed and built an energy-efficient adaptive lighting system using infrared sensors and analog comparators. Implemented control logic on Arduino (C++) to achieve reliable object detection and automated brightness adjustment within a team environment.",
    tags: ["Embedded C++", "Arduino", "Analog Circuits", "Sensors"],
    highlight: false
  },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "Email", url: `mailto:${PERSONAL_INFO.email}`, icon: "Mail", username: PERSONAL_INFO.email },
  { platform: "LinkedIn", url: "https://linkedin.com", icon: "Linkedin", username: "Myrick Wang" },
  { platform: "GitHub", url: "https://github.com/rickkwang", icon: "Github", username: "rickkwang" },
  { platform: "Google Scholar", url: "https://scholar.google.com/citations?user=PS_CX0AAAAAJ", icon: "BookOpen" },
  { platform: "Bluesky", url: "https://bsky.app/profile/myrwang.bsky.social", icon: "Cloud", username: "@myrwang" },
  { platform: "X / Twitter", url: "https://x.com/rickMygod", icon: "Twitter", username: "@rickMygod" },
];

export const ICON_MAP: Record<string, React.ElementType> = {
  Mail: MailIcon,
  Github: GithubIcon,
  Linkedin: LinkedinIcon,
  BookOpen: BookIcon,
  Twitter: TwitterIcon,
  Cloud: CloudIcon
};
