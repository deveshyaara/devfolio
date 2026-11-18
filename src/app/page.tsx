import StoikPreloader from '@/components/stoik-preloader';
import StoikHeader from '@/components/stoik-header';
import StoikHero from '@/components/stoik-hero';
import StoikAbout from '@/components/stoik-about';
import StoikProjects from '@/components/stoik-projects';
import StoikExpertise from '@/components/stoik-expertise';
import StoikApproach from '@/components/stoik-approach';
import StoikContact from '@/components/stoik-contact';

export default function Home() {
  return (
    <div
      className="flex flex-col min-h-screen w-full"
      style={{ backgroundColor: '#ECECEC' }}
    >
      <StoikPreloader />
      <StoikHeader />
      <main className="stoik-main-grid flex-1 w-full">
        <StoikHero />
        <StoikAbout />
        <StoikProjects />
        <StoikExpertise />
        <StoikApproach />
      </main>
      <StoikContact />
    </div>
  );
}
