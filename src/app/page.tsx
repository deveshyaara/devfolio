import Header from '@/components/header';
import HeroSection from '@/components/hero-section';
import ProjectsSection from '@/components/projects-section';
import SkillsSection from '@/components/skills-section';
import ContactSection from '@/components/contact-section';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <ContactSection />
      </main>
    </div>
  );
}
