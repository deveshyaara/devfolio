"use client";

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
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full py-12 md:py-20 lg:py-32 bg-secondary/5 relative">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              My Projects
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body">
              Here are some of the projects I've worked on. Feel free to check them out.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto grid max-w-5xl items-start gap-8 py-12 sm:grid-cols-2 md:gap-12 lg:max-w-none lg:grid-cols-3"
        >
          {projects.map((project) => {
            const projectImage = PlaceHolderImages.find(p => p.id === project.image);
            return (
              <motion.div key={project.id} variants={item} className="h-full">
                <Card className="h-full flex flex-col bg-card/50 backdrop-blur-sm border-primary/20 overflow-hidden group hover:border-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,243,255,0.2)]">
                  <CardHeader className="p-0">
                    {projectImage && (
                      <div className="relative overflow-hidden aspect-[3/2]">
                        <Image
                          src={projectImage.imageUrl}
                          alt={`Screenshot of ${project.title}`}
                          fill
                          loading="lazy"
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          data-ai-hint={projectImage.imageHint}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                          <Button variant="outline" size="icon" asChild className="rounded-full bg-background/80 hover:bg-primary hover:text-primary-foreground border-primary/50">
                            <a href={project.liveDemoUrl} target="_blank" rel="noopener noreferrer" aria-label="Live Demo">
                              <LinkIcon className="h-5 w-5" />
                            </a>
                          </Button>
                          <Button variant="outline" size="icon" asChild className="rounded-full bg-background/80 hover:bg-primary hover:text-primary-foreground border-primary/50">
                            <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label="GitHub Repo">
                              <Github className="h-5 w-5" />
                            </a>
                          </Button>
                        </div>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="flex-grow space-y-2 p-6">
                    <CardTitle className="font-headline text-xl font-bold text-primary group-hover:text-accent transition-colors">{project.title}</CardTitle>
                    <CardDescription className="font-body line-clamp-3">{project.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <div className="flex flex-wrap gap-2">
                      {/* We could add tech stack tags here if available in data */}
                    </div>
                  </CardFooter>
                </Card>
              </motion.div>
            )
          }
          )}
        </motion.div>
      </div>
    </section>
  );
}
