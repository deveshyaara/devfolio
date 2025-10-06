import { Github, Linkedin, Twitter, Codepen, Wind, Database, Server, FileCode2, RectangleHorizontal } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type SocialLink = {
    name: string;
    url: string;
    icon: LucideIcon;
};

type Project = {
    id: string;
    title: string;
    description: string;
    image: string;
    liveDemoUrl: string;
    repoUrl: string;
};

type Skill = {
    name: string;
    icon: LucideIcon;
};

export const socialLinks: SocialLink[] = [
  { name: 'GitHub', url: 'https://github.com', icon: Github },
  { name: 'LinkedIn', url: 'https://linkedin.com', icon: Linkedin },
  { name: 'Twitter', url: 'https://twitter.com', icon: Twitter },
];

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce site with a focus on user experience and performance, built with Next.js and Stripe.',
    image: 'project-1',
    liveDemoUrl: '#',
    repoUrl: '#',
  },
  {
    id: 'project-2',
    title: 'Task Management App',
    description: 'A collaborative task management application designed for teams, featuring real-time updates with Firebase.',
    image: 'project-2',
    liveDemoUrl: '#',
    repoUrl: '#',
  },
  {
    id: 'project-3',
    title: 'Portfolio Website',
    description: 'A personal portfolio site (like this one!) to showcase my work and skills, with a focus on clean design.',
    image: 'project-3',
    liveDemoUrl: '#',
    repoUrl: '#',
  },
];

export const skills: Skill[] = [
    { name: 'React', icon: Codepen },
    { name: 'Next.js', icon: RectangleHorizontal },
    { name: 'TypeScript', icon: FileCode2 },
    { name: 'Node.js', icon: Server },
    { name: 'Tailwind CSS', icon: Wind },
    { name: 'Firebase', icon: Database },
];

export const name: string = "Alex Doe";
export const bio: string = "I am a passionate developer with a love for creating beautiful and functional web applications. I specialize in modern frontend technologies and am always eager to learn and grow my skills.";
