import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { socialLinks, bio, name as devName } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function HeroSection() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile-picture');
  
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex items-center justify-center">
            {profileImage && (
                <Image
                src={profileImage.imageUrl}
                alt="Profile Picture"
                width={400}
                height={400}
                className="rounded-full object-cover aspect-square shadow-2xl shadow-primary/20"
                data-ai-hint={profileImage.imageHint}
                />
            )}
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
                Hello, I'm {devName}
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {bio}
              </p>
            </div>
            <div className="flex items-center gap-2 pt-4">
              {socialLinks.map((link) => (
                <Button key={link.name} variant="outline" size="icon" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                    <link.icon className="h-5 w-5 text-primary" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
