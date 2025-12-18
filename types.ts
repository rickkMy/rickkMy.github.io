export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  link?: string;
  year: string;
  highlight?: boolean; // For visual emphasis
}

export interface Skill {
  subject: string;
  A: number; // Proficiency level (0-100) for Radar Chart
  fullMark: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  username?: string;
  icon?: string; // key for icon component mapping
}

export interface NewsItem {
  date: string;
  content: string;
  link?: string;
}

export enum SectionId {
  HERO = 'hero',
  ABOUT = 'about',
  RESEARCH = 'research',
  PROJECTS = 'projects',
  CONTACT = 'contact',
}