import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import dynamic from 'next/dynamic';

const ProjectsSection = dynamic(() => import('@/components/projects-section'), { ssr: true });
const SkillsSection = dynamic(() => import('@/components/skills-section'), { ssr: true });
const ResumeSection = dynamic(() => import('@/components/resume-section'), { ssr: true });
const ContactSection = dynamic(() => import('@/components/contact-section'), { ssr: true });
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background w-full items-center">
      <Header />
      <main className="flex-1 w-full">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ResumeSection />
        <ContactSection />
      </main>
    </div>
  );
}
