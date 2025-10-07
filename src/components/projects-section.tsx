import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { projects } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Github, Link as LinkIcon } from 'lucide-react';

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">My Projects</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Here are some of the projects I've worked on. Feel free to check them out.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3">
          {projects.map((project) => {
             const projectImage = PlaceHolderImages.find(p => p.id === project.image);
             return (
              <Card key={project.id} className="h-full flex flex-col transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20">
                <CardHeader>
                    {projectImage && (
                        <Image
                            src={projectImage.imageUrl}
                            alt={`Screenshot of ${project.title}`}
                            width={600}
                            height={400}
                            className="rounded-lg object-cover aspect-[3/2]"
                            data-ai-hint={projectImage.imageHint}
                        />
                    )}
                </CardHeader>
                <CardContent className="flex-grow space-y-2">
                  <CardTitle className="font-headline text-xl font-bold">{project.title}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-start gap-4">
                  <Button variant="outline" asChild>
                    <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer">
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Live Demo
                    </a>
                  </Button>
                  <Button variant="ghost" asChild>
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            )}
          )}
        </div>
      </div>
    </section>
  );
}
