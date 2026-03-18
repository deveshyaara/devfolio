import { Github, Linkedin, Instagram, Codepen, Mail, Wind, Database, Server, FileCode2, RectangleHorizontal, Code, Code2, CodeSquare } from 'lucide-react';
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
    liveDemoUrl: 'https://wealthwise.devesh.co.in/',
    repoUrl: 'https://github.com/deveshyaara/WealthWise',
  },
  {
    id: 'project-3',
    title: 'Portfolio Website',
    description: 'Devfolio is a personal portfolio website that displays a developer’s projects, technical skills, certifications, and contact information. It serves as an interactive online resume, allowing visitors to view detailed overviews of completed work, technology expertise, and ways to connect or collaborate.',
    image: 'project-3',
    liveDemoUrl: 'https://devfolio-taupe.vercel.app/',
    repoUrl: 'https://github.com/deveshyaara/devfolio.git',
  },
  {
    id: 'project-4',
    title: 'Healthlink-Etherium Health Records',
    description: 'HealthLink is a decentralized health records management system built on the Ethereum blockchain. It allows patients to securely store and share their medical records with healthcare providers, ensuring data integrity and privacy through blockchain technology. The platform includes features for record creation, access control, and audit trails.',
    image: 'project-4',
    liveDemoUrl: 'https://healthlink.devesh.co.in/',
    repoUrl: 'https://github.com/deveshyaara/Healthlink_RPC.git',
  },
  {
    id: 'project-5',
    title: 'QR Mapper - Badge to Ticket Linker',
    description: 'A staff-facing QR mapping tool that links pre-printed badge QR codes to dynamic event ticket URLs. Staff scan a badge then scan the attendee\'s QR ticket to create a mapping in Supabase. When attendees later scan their own badge, they are instantly redirected to their ticket page. Built with Next.js 16 (App Router, TypeScript), Supabase (PostgreSQL), Tailwind CSS v4, and @yudiel/react-qr-scanner for camera-based scanning.',
    image: 'project-5',
    liveDemoUrl: 'https://qr-mapper-mu.vercel.app/',
    repoUrl: 'https://github.com/deveshyaara/qr-mapper',
  },
];

export const skills: Skill[] = [
    { name: 'Java', icon: FileCode2 },
    { name: 'Python', icon: FileCode2 },
    { name: 'C++', icon: FileCode2 },
    { name: 'JavaScript', icon: Code2 },
    { name: 'TypeScript', icon: Code2 },
    { name: 'SQL', icon: Database },
    { name: 'HTML5', icon: CodeSquare },
    { name: 'CSS3', icon: CodeSquare },
    { name: 'Next.js', icon: RectangleHorizontal },
    { name: 'React.js', icon: Codepen },
    { name: 'Node.js', icon: Server },
    { name: 'Express.js', icon: Server },
    { name: 'Spring Boot', icon: Server },
    { name: 'TensorFlow', icon: Code2 },
    { name: 'LangGraph', icon: Code },
    { name: 'Google Cloud (Vertex AI)', icon: Server },
    { name: 'MongoDB', icon: Database },
    { name: 'Supabase', icon: Database },
    { name: 'PostgreSQL', icon: Database },
    { name: 'Firebase', icon: Database },
    { name: 'Docker', icon: Server },
    { name: 'Generative AI', icon: FileCode2 },
    { name: 'RAG Pipelines', icon: FileCode2 },
    { name: 'Prompt Engineering', icon: FileCode2 },
    { name: 'NLP', icon: FileCode2 },
    { name: 'Penetration Testing', icon: Code },
    { name: 'Git', icon: Github },
    { name: 'Tailwind CSS', icon: Wind },
];

export const name: string = "Devesh Tiwari";
export const bio: string = "Undergraduate Computer Science student with strong foundations in software engineering, data structures, and system design. Experienced in building scalable full-stack and AI-driven applications using Java, Python, Next.js, and TypeScript. Skilled in RESTful APIs, cloud platforms, and database management, with hands-on experience in CI/CD pipelines and Agile workflows.";

// ---------- Resume / shared data ----------

export type Education = {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  description: string;
};

export type Experience = {
  title: string;
  company: string;
  period: string;
  responsibilities: string[];
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  link?: string;
};

export type ResumeSkillCategory = {
  category: string;
  items: string;
};

export type ResumeProject = {
  name: string;
  description: string;
  links: { name: string; url: string }[];
};

export type ResumeCertDetail = {
  label: string;
  text: string;
  link?: string;
};

export const education: Education[] = [
  {
    degree: 'B.E. in Computer Science',
    institution: 'Sambhram Institute of Technology',
    location: 'Bangalore, Karnataka, India',
    period: 'Aug 2023 – May 2027',
    description: 'CGPA: 8.76/10 · No active backlogs',
  },
  {
    degree: 'CBSE Class 12',
    institution: 'DAV Academy',
    location: 'Uttar Pradesh, India',
    period: '2023',
    description: 'Score: 71.4%',
  },
  {
    degree: 'CBSE Class 10',
    institution: 'Lord Buddha Public School',
    location: 'Uttar Pradesh, India',
    period: '2021',
    description: 'Score: 88.0%',
  },
];

export const experience: Experience[] = [
  {
    title: 'Creative Team Lead',
    company: 'OSCode, SAIT Chapter · Bengaluru, IN',
    period: 'Sep 2025 – Present',
    responsibilities: [
      'Led outreach and engagement initiatives, increasing event attendance by 108% (from 120 to 250+ participants).',
      'Built an automated QR-based check-in and certificate generation system using Next.js and Supabase, reducing administrative effort by 80% and minimizing manual errors.',
      'Collaborated with cross-functional teams to streamline event operations and improve workflow efficiency.',
      'Mentored junior members on UI/UX best practices, fostering a collaborative and innovation-driven team environment.',
    ],
  },
  {
    title: 'Artificial Intelligence Intern',
    company: 'Coincent.ai · Remote',
    period: 'Jun 2024 – Aug 2024',
    responsibilities: [
      'Engineered a text classification system using TensorFlow and NLP techniques.',
      'Designed and fine-tuned a Vision Transformer (ViT) model, improving performance over baseline CNN models by 15%.',
      'Performed large-scale data preprocessing and feature engineering using Pandas and NumPy.',
      'Analyzed and visualized model performance using Matplotlib.',
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: 'Applied Generative AI & Vertex AI',
    issuer: 'Google Cloud',
    date: '2025',
    link: 'https://coursera.org/share/e32c1a6e411718423a941a935b2d6f9d',
  },
  {
    name: 'Data Analytics & Java Development',
    issuer: 'Vtricks Technologies',
    date: '',
  },
  {
    name: 'System Design & Backend Engineering',
    issuer: 'Physics Wallah',
    date: '',
  },
  {
    name: 'Innovation & Design Thinking Program',
    issuer: 'COMED KARES',
    date: '',
  },
];

export const resumeSkills: ResumeSkillCategory[] = [
  { category: 'Languages', items: 'Java, Python, C++, JavaScript, TypeScript, SQL, HTML5, CSS3' },
  { category: 'Frameworks', items: 'Next.js, React.js, Node.js, Express.js, Spring Boot, TensorFlow, LangGraph' },
  { category: 'Cloud & Databases', items: 'Google Cloud (Vertex AI), MongoDB, PostgreSQL, Supabase, Firebase, Docker' },
  { category: 'Software Engineering', items: 'Data Structures & Algorithms, OOP, System Design, REST API Development, Debugging, Unit Testing' },
  { category: 'Tools & Practices', items: 'Git, GitHub, CI/CD, Agile Methodologies, Postman' },
  { category: 'AI & Security', items: 'Generative AI, RAG Pipelines, Prompt Engineering, NLP, Penetration Testing' },
];

export const resumeProjects: ResumeProject[] = [
  {
    name: 'WealthWise - AI Finance Manager | Next.js, Supabase, Google Gemini API, Clerk',
    description: 'Architected a full-stack financial platform utilizing Google Gemini AI for automated receipt parsing. Integrated secure authentication via Clerk and background job scheduling with Inngest, employing Recharts to visualize financial health through interactive dashboards.',
    links: [
      { name: 'GitHub', url: 'https://github.com/deveshyaara/WealthWise' },
      { name: 'Live Demo', url: 'https://wealthwise.devesh.co.in/' },
    ],
  },
  {
    name: 'E-Commerce Backend API | Node.js, Express, MongoDB, JWT',
    description: 'Developed a scalable RESTful API supporting secure JWT-based authentication and role-based access control. Structured optimized MongoDB schemas for product inventory and cart management, with comprehensive endpoint documentation maintained in Postman.',
    links: [
      { name: 'GitHub', url: 'https://github.com/deveshyaara/E-Commerce-Backend.git' },
      { name: 'Postman Docs', url: 'https://documenter.getpostman.com/view/34764585/2sA3JQ3yun' },
    ],
  },
  {
    name: 'DevFolio: AI-Integrated Portfolio Platform | Next.js 15, TypeScript, LangGraph, Google Gemini, RAG',
    description: 'Launched a responsive developer portfolio using Next.js 15 and TypeScript, featuring an embedded autonomous AI agent. Engineered the agent\'s core using LangGraph and a RAG pipeline with FAISS to semantically index GitHub repositories, ensuring real-time data synchronization.',
    links: [
      { name: 'GitHub', url: 'https://github.com/deveshyaara/devfolio' },
      { name: 'Live Demo', url: 'https://devfolio-taupe.vercel.app/' },
    ],
  },
  {
    name: 'Vision Transformer (ViT) Implementation | TensorFlow, Deep Learning, Python',
    description: "Built a Transformer-based architecture for image classification on the CIFAR-10 dataset, eliminating reliance on CNNs. Incorporated advanced mechanisms including patch extraction and Multi-head Self-Attention to achieve high validation accuracy in computer vision tasks.",
    links: [
      { name: 'GitHub', url: 'https://github.com/deveshyaara/Vision-Transformer-ViT-for-Image-Classification' },
    ],
  },
];

export const resumeCertDetails: ResumeCertDetail[] = [
  {
    label: 'Google Cloud',
    text: 'Earned credentials in Prompt Design and Building Real-World AI Applications. Built and integrated LLM-based solutions using Gemini for scalable application development.',
    link: 'https://coursera.org/share/e32c1a6e411718423a941a935b2d6f9d',
  },
  {
    label: 'Vtricks Technologies',
    text: 'Completed intensive training modules on Data Analytics, Big Data Concepts, NoSQL Database Design, and Core Java & SQL development.',
  },
  {
    label: 'Physics Wallah',
    text: 'Gained hands-on experience in Microservices, Distributed Systems, and Database Architecture. Separately certified in Ethical Hacking (Kali Linux/Nmap).',
  },
  {
    label: 'COMED KARES',
    text: 'Certified in user-centric problem-solving and rapid prototyping methodologies through a comprehensive 6-month innovation cohort.',
  },
  {
    label: 'Forage Simulations',
    text: 'Executed technical work simulations for JPMorgan Chase and Wells Fargo (RESTful APIs, Java, Spring Boot), Goldman Sachs (cryptography), and Accenture/Walmart (DevOps, CI/CD, Agile, Data Structures).',
  },
];

// ---------- Achievements ----------

export type Achievement = {
  title: string;
  organization: string;
  description: string;
};

export const achievements: Achievement[] = [
  {
    title: 'Top 5000 Shortlist - EY Techathon 6.0',
    organization: 'Ernst & Young',
    description: 'Achieved a perfect score in the first round and secured a Top 5000 shortlist position.',
  },
  {
    title: 'National Finalist - VOIS for Tech Innovation Marathon 2.0',
    organization: 'Edunet Foundation',
    description: 'Secured a position among the Top 75 teams nationally, selected for an intensive 12-week mentorship program to architect innovative technical solutions under industry guidance.',
  },
];
