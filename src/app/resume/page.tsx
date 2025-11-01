'use client';

import { Button } from '@/components/ui/button';
import {
  ArrowDownToLine,
  Github,
  Linkedin,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Award,
  Code,
  ExternalLink,
} from 'lucide-react';

export default function ResumePage() {
  const skills = [
    { category: 'Programming Languages', items: 'Python, JavaScript, Java, C++, C, HTML, CSS' },
    { category: 'Web Development', items: 'Node.js, Express.js, MongoDB, Mongoose, API Development, Back-End Web Development, Postman API' },
    { category: 'Frameworks & Libraries', items: 'Spring Boot, TensorFlow, pandas, NumPy, Matplotlib' },
    { category: 'Database & Systems', items: 'MongoDB, Database Design, Systems Design, System Architecture, Microservices, Distributed Systems' },
    { category: 'Software Engineering', items: 'Object-Oriented Programming (OOP), SDLC, Version Control, Debugging, Code Refactoring' },
    { category: 'DevOps & CI/CD', items: 'DevOps, Continuous Integration, Jenkins' },
    { category: 'AI & Data Science', items: 'Natural Language Processing (NLP), Artificial Intelligence, Clustering' },
    { category: 'Cybersecurity', items: 'Ethical Hacking, Network Security, Penetration Testing, Vulnerability Assessment, Cryptography, Kali Linux, Nmap' },
  ];

  const projects = [
    {
      name: 'WealthWise - AI Finance Manager',
      description: 'Developed an AI-powered personal finance platform using Next.js, Supabase, and Google Gemini API; features include receipt scanning, multi-account tracking, budgeting, analytics, and automated reports. Integrated Clerk for auth, Inngest for recurring jobs, and Recharts for visual insights.',
      links: [
        { name: 'GitHub', url: 'https://github.com/deveshyaara/WealthWise' },
        { name: 'Live Demo', url: 'https://wealthwise-ai.vercel.app/' },
      ],
    },
    {
      name: 'E-Commerce API',
      description: 'Developed a RESTful API using Node.js, Express, and MongoDB with JWT-based authentication; implemented modules for user auth, category & product CRUD, and cart management. Documented endpoints in Postman for easy API testing.',
      links: [
        { name: 'GitHub', url: 'https://github.com/deveshyaara/E-commerce-API' },
        { name: 'Postman Docs', url: 'https://documenter.getpostman.com/view/25684224/2sA3dsoEa9' },
      ],
    },
    {
      name: 'Vision Transformer (ViT) - Image Classification',
      description: 'Implemented ViT architecture using TensorFlow to classify images from the CIFAR-10 dataset; incorporated patch extraction, encoding, and multi-head self-attention for end-to-end learning. Achieved competitive test accuracy showcasing ViT’s effectiveness in vision tasks.',
      links: [
        { name: 'GitHub', url: 'https://github.com/deveshyaara/Vision-Transformer-ViT-for-Image-Classification' },
      ],
    },
  ];

  return (
    <div className="flex flex-col items-center min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <main className="w-full max-w-5xl bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl shadow-lg p-8 sm:p-12 print:shadow-none print:border-none print:bg-white print:text-black">
        {/* Header */}
        <header className="relative text-center border-b border-border/50 pb-6 mb-8 print:border-black">
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent print:text-black print:bg-none">
            Devesh Tiwari
          </h1>
          <div className="absolute top-0 right-0 print:hidden">
            <a href="/resume.pdf" download="Devesh_Tiwari_Resume.pdf">
              <Button
                variant="outline"
                size="icon"
                className="bg-card/50 hover:bg-primary/20"
              >
                <ArrowDownToLine className="h-4 w-4" />
                <span className="sr-only">Download PDF</span>
              </Button>
            </a>
          </div>
          <div className="mt-4 flex justify-center items-center flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground print:text-black">
            <a href="tel:9506592662" className="flex items-center gap-2 hover:text-primary">
              <Phone className="w-4 h-4" />
              9506592662
            </a>
            <a href="mailto:tiwaridewesh234@gmail.com" className="flex items-center gap-2 hover:text-primary">
              <Mail className="w-4 h-4" />
              tiwaridewesh234@gmail.com
            </a>
            <a href="https://github.com/deveshyaara" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
              <Github className="w-4 h-4" />
              github.com/deveshyaara
            </a>
            <a href="https://www.linkedin.com/in/deveshcodes" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
              <Linkedin className="w-4 h-4" />
              linkedin.com/in/deveshcodes
            </a>
          </div>
        </header>

        {/* Main Content */}
        <div className="space-y-10">
          {/* Education */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-primary border-b border-border/50 pb-2 print:border-black">
              <GraduationCap /> Education
            </h2>
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-foreground">B.E. in Computer Science</h3>
              <p className="text-muted-foreground">Sambhram Institute of Technology Bangalore, Karnataka, India</p>
              <div className="flex justify-between text-sm text-primary">
                <span>2023 - 2027</span>
                <span>Current CGPA: 8.85/10</span>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-primary border-b border-border/50 pb-2 print:border-black">
              <Code /> Technical Skills
            </h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.category} className="grid grid-cols-1 md:grid-cols-4 gap-1 text-sm">
                  <strong className="md:col-span-1 text-foreground">{skill.category}:</strong>
                  <p className="md:col-span-3 text-muted-foreground">{skill.items}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-primary border-b border-border/50 pb-2 print:border-black">
              <Briefcase /> Work Experience
            </h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold text-foreground">Creative Team Lead</h3>
                  <span className="text-sm text-primary">Sep 2025 – Present</span>
                </div>
                <p className="text-muted-foreground">OSCode, SAIT Chapter</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-2">
                  <li>Led design and branding initiatives to ensure impactful visual communication across events, posts, and campaigns.</li>
                  <li>Collaborated with team members to generate creative ideas, design engaging graphics, and manage content strategies that enhanced community engagement.</li>
                  <li>Guided the creative team in producing innovative designs for workshops, awareness sessions, and collaborations.</li>
                  <li>Upheld the identity and vision of the OSCode SAIT Chapter while fostering creativity and innovation.</li>
                </ul>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-semibold text-foreground">Artificial Intelligence Intern</h3>
                  <span className="text-sm text-primary">June 2024 - August 2024</span>
                </div>
                <p className="text-muted-foreground">Coincent.ai</p>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-2">
                  <li>Developed a text classifier using TensorFlow to categorize text data based on content.</li>
                  <li>Implemented a Vision Transformer for image classification using a transformer-based architecture.</li>
                  <li>Worked on data preprocessing, model building, training, and evaluation to ensure high accuracy.</li>
                  <li>Utilized NLP, pandas, NumPy, Python, and Matplotlib for efficient data handling and visualization.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-primary border-b border-border/50 pb-2 print:border-black">
              <Github /> Projects
            </h2>
            <div className="space-y-6">
              {projects.map((project) => (
                <div key={project.name} className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  <div className="flex flex-wrap gap-4">
                    {project.links.map(link => (
                      <a key={link.name} href={link.url} target="_blank" rel="noopener noreferrer" className="text-sm text-accent-foreground hover:text-primary flex items-center gap-1">
                        {link.name} <ExternalLink className="w-3 h-3" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-primary border-b border-border/50 pb-2 print:border-black">
              <Award /> Certifications & Simulations
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground pl-2">
              <li>
                <strong>Google:</strong> Build Real World AI Applications with Gemini and Imagen, Prompt Design in Vertex AI (Apr 2025)
                <a href="https://coursera.org/share/e32c1a6e411718423a941a935b2d6f9d" target="_blank" rel="noopener noreferrer" className="text-accent-foreground hover:text-primary ml-2">[Link]</a>
              </li>
              <li><strong>Physics Wallah:</strong> Advanced System Design (Microservices, Distributed Systems), Backend Development (Spring Boot, Node.js), Ethical Hacking (Kali Linux, Penetration Testing)</li>
              <li><strong>Industry Job Simulations:</strong> JPMorgan Chase (API Development, Java), Goldman Sachs (Cryptography), Accenture (CI/CD, DevOps), Wells Fargo (Spring Boot), Walmart (Java, Python)</li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
