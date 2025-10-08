import { Github, Linkedin, Instagram, Codepen, Mail, Wind, Database, Server, FileCode2, RectangleHorizontal,Code,Code2, CodeSquare } from 'lucide-react';
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
  { name: 'GitHub', url: 'https://github.com/deveshyaara', icon: Github },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/deveshcodes', icon: Linkedin },
  { name: 'Instagram', url: 'https://www.instagram.com/devesh_yaara_', icon: Instagram },
  { name: 'Gmail', url: 'mailto:tiwaridewesh234@gmail.com', icon: Mail }
];

export const projects: Project[] = [
  {
    id: 'project-1',
    title: 'E-Commerce Platform-Backend',
    description: 'This project provides a RESTful API for managing e-commerce operations such as user authentication, category management, product management, and cart functionality. It is built using Node.js, Express.js, and MongoDB, and includes features like JWT-based authentication, CRUD operations for categories and products, and cart management with quantity updates.',
    image: 'project-1',
    liveDemoUrl: 'https://documenter.getpostman.com/view/34764585/2sA3JQ3yun',
    repoUrl: 'https://github.com/deveshyaara/E-Commerce-Backend.git',
  },
  {
    id: 'project-2',
    title: 'WealthWise-AI Finance Platform',
    description: 'Built a modern, AI-powered personal finance management platform that enables users to track income and expenses, manage multiple financial accounts, set budgets, and gain personalized financial insights. The platform includes a Google Gemini-powered receipt scanner to automatically extract transaction details from images, as well as features for recurring transactions, monthly financial reports, budget alerts, and interactive visual analytics.',
    image: 'project-2',
    liveDemoUrl: 'https://wealth-wise-kappa.vercel.app/',
    repoUrl: 'https://github.com/deveshyaara/WealthWise',
  },
  {
    id: 'project-3',
    title: 'Portfolio Website',
    description: 'A personal portfolio site to showcase my work and skills, with a focus on clean design.',
    image: 'project-3',
    liveDemoUrl: 'https://devfolio-taupe.vercel.app/',
    repoUrl: 'https://github.com/deveshyaara/devfolio.git',
  },
];

export const skills: Skill[] = [
    { name: 'React', icon: Codepen },
    { name: 'Next.js', icon: RectangleHorizontal },
    { name: 'JavaScript', icon: Code2 },
    { name: 'TypeScript', icon: Code2 },
    { name: 'HTML', icon: CodeSquare },
    { name: 'CSS', icon: CodeSquare },
    { name: 'Node.js', icon: Server },
    { name: 'Express.js', icon: Server },
    { name: 'Tailwind CSS', icon: Wind },
    { name: 'Firebase', icon: Database },
    { name: 'Python', icon: FileCode2 },
    { name: 'Machine Learning', icon: FileCode2 },
    { name: 'PostgreSQL', icon: Database },
    { name: 'MongoDB', icon: Database },
    { name: 'SQLite', icon: Database },
    { name: 'Docker', icon: Server },
    { name: 'Git', icon: Github },
    { name: 'RESTful APIs', icon: Server },
    { name: 'System Design', icon: Wind },
    { name: 'Backend Development', icon: Server },
    { name: 'Object-Oriented Programming', icon: FileCode2 },
    { name: 'Data Structures & Algorithms', icon: CodeSquare },
    { name: 'NLP', icon: FileCode2 },
    { name: 'Pandas', icon: FileCode2 },
    { name: 'NumPy', icon: FileCode2 },
    { name: 'Scikit-Learn', icon: FileCode2 },
    { name: 'TensorFlow', icon: Code2 },
    { name: 'Keras', icon: FileCode2 },

];

export const name: string = "Devesh Tiwari";
export const bio: string = "Software engineer with a solid foundation in machine learning, cybersecurity, and backend development with a dedicated and result-oriented approach. I have the demonstrated ability to apply cutting-edge technologies like TensorFlow and Python with regard to the development of new solutions for complex problems. In addition, my skills include NLP, ethical hacking, and back-end development experience that outlines aspects of JavaScript, Node.js, MongoDB, and API development. Solid passion for continuous learning and professional growth is demonstrated with successfully completed certifications and challenging internship experience. ";
