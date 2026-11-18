import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowDownToLine,
  ArrowLeft,
  Github,
  Linkedin,
  Mail,
  Phone,
  GraduationCap,
  Briefcase,
  Award,
  Code,
  ExternalLink,
  Trophy,
} from 'lucide-react';
import {
  name as devName,
  education,
  experience,
  resumeSkills,
  resumeProjects,
  resumeCertDetails,
  achievements,
} from '@/lib/data';

export const metadata: Metadata = {
  title: 'Resume — Devesh Tiwari',
  description:
    'Online resume of Devesh Tiwari — Software Engineer (Backend, Full-Stack, AI/ML). Education, verified experience, shipped engineering projects, certifications, and PDF CV download.',
  alternates: {
    canonical: '/resume',
  },
  openGraph: {
    title: 'Resume — Devesh Tiwari',
    description:
      'Software Engineer specializing in backend systems, full-stack web products, and applied AI/ML.',
    url: '/resume',
    type: 'profile',
  },
};

export default function ResumePage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-[#ECECEC] text-[#0A0A0A] p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-5xl mb-4 flex items-center justify-between print:hidden">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.08em] text-black/70 hover:text-[#0052FF] transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Portfolio
        </Link>
        <a
          href="/devesh_resume.pdf"
          download="Devesh_Tiwari_Resume.pdf"
          className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-mono uppercase tracking-[0.06em] bg-[#0A0A0A] text-white hover:bg-[#0052FF] transition-colors stoik-chamfer-sm"
        >
          <ArrowDownToLine className="h-3.5 w-3.5" />
          Download PDF
        </a>
      </div>
      <main className="w-full max-w-5xl bg-white border border-black/10 stoik-chamfer-lg shadow-sm p-8 sm:p-12 print:shadow-none print:border-none print:bg-white print:text-black">
        {/* Header */}
        <header className="relative text-center border-b border-black/10 pb-6 mb-8 print:border-black">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-[-0.03em] text-[#0A0A0A] print:text-black">
            {devName}
          </h1>
          <p className="text-sm mt-2 text-[#0052FF] font-medium">
            Software Engineer | Backend · Full-Stack · AI/ML
          </p>
          <div className="absolute top-0 right-0 print:hidden">
            <a
              href="/devesh_resume.pdf"
              download="Devesh_Tiwari_Resume.pdf"
              aria-label="Download PDF"
              className="inline-flex items-center justify-center h-10 w-10 bg-white hover:bg-[#0052FF]/10 border border-black/15 transition-colors"
            >
              <ArrowDownToLine className="h-4 w-4 text-[#0A0A0A]" />
              <span className="sr-only">Download PDF</span>
            </a>
          </div>
          <div className="mt-4 flex justify-center items-center flex-wrap gap-x-6 gap-y-2 text-sm text-black/65 print:text-black">
            <a href="tel:9506592662" className="flex items-center gap-2 hover:text-[#0052FF]">
              <Phone className="w-4 h-4" />
              9506592662
            </a>
            <a href="mailto:tiwaridewesh234@gmail.com" className="flex items-center gap-2 hover:text-[#0052FF]">
              <Mail className="w-4 h-4" />
              tiwaridewesh234@gmail.com
            </a>
            <a href="https://github.com/deveshyaara" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#0052FF]">
              <Github className="w-4 h-4" />
              github.com/deveshyaara
            </a>
            <a href="https://www.linkedin.com/in/deveshcodes/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#0052FF]">
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
            {education.map((edu, index) => (
              <div key={index} className="space-y-1">
                <h3 className="text-lg font-semibold text-foreground">{edu.degree}</h3>
                <p className="text-muted-foreground">
                  {edu.institution}{edu.location ? `, ${edu.location}` : ''}
                </p>
                <div className="flex justify-between text-sm text-primary">
                  <span>{edu.period}</span>
                  <span>{edu.description}</span>
                </div>
              </div>
            ))}
          </section>

          {/* Skills */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-primary border-b border-border/50 pb-2 print:border-black">
              <Code /> Technical Skills
            </h2>
            <div className="space-y-3">
              {resumeSkills.map((skill) => (
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
              {experience.map((exp, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex flex-wrap justify-between items-baseline gap-2">
                    <h3 className="text-lg font-semibold text-foreground">{exp.company}</h3>
                    <span className="text-sm font-medium text-[#0052FF]">
                      {`${exp.title} | ${exp.period}`}
                    </span>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground pl-2">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-primary border-b border-border/50 pb-2 print:border-black">
              <Github /> Projects
            </h2>
            <div className="space-y-6">
              {resumeProjects.map((project) => (
                <div key={project.name} className="space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{project.name}</h3>
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  {project.links.length > 0 && (
                    <div className="flex flex-wrap gap-4">
                      {project.links.map((link) => (
                        <a
                          key={link.name}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-[#0052FF] hover:underline flex items-center gap-1"
                        >
                          {link.name} <ExternalLink className="w-3 h-3" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-primary border-b border-border/50 pb-2 print:border-black">
              <Award /> Certifications &amp; Simulations
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground pl-2">
              {resumeCertDetails.map((cert, index) => (
                <li key={index}>
                  <strong className="text-foreground">{cert.label}:</strong> {cert.text}
                  {cert.link && (
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0052FF] font-medium hover:underline ml-2"
                    >
                      [Verify ↗]
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </section>

          {/* Achievements */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-3 text-primary border-b border-border/50 pb-2 print:border-black">
              <Trophy /> Achievements
            </h2>
            <div className="space-y-4">
              {achievements.map((achievement, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="text-lg font-semibold text-foreground">{achievement.title}</h3>
                  <p className="text-sm text-muted-foreground">{achievement.organization}</p>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
