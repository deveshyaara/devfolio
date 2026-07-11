"use client";

import dynamic from "next/dynamic";
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { socialLinks, name as devName } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { FileCode2, Server, Code2, Cloud } from 'lucide-react';

const ParticleField = dynamic(() => import("@/components/particle-field"), {
  ssr: false,
});

const roles = ["Software Engineer", "Full Stack & AI Developer", "Generative AI Engineer"];

const techStack = [
  { name: 'Java', icon: FileCode2 },
  { name: 'Python', icon: FileCode2 },
  { name: 'Next.js', icon: Code2 },
  { name: 'TypeScript', icon: Code2 },
  { name: 'REST APIs', icon: Server },
  { name: 'CI/CD', icon: Cloud },
];

export default function HeroSection() {
  const profileImage = PlaceHolderImages.find(p => p.id === 'profile-picture');
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typeSpeed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        setText(currentRole.substring(0, text.length + (isDeleting ? -1 : 1)));
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, roleIndex]);

  return (
    <section id="about" className="relative w-full min-h-[90vh] py-12 md:py-24 lg:py-32 overflow-hidden bg-background flex flex-col justify-center">
      {/* Ambient particle background */}
      <div className="absolute inset-0 w-full h-full">
        <ParticleField />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Main Content */}
      <div className="container relative px-4 md:px-6 z-10 pl-16 sm:pl-28 lg:pl-32 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 items-center gap-12 lg:gap-8">

          {/* Profile Image with Glow */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center order-2 lg:order-2 relative"
          >
            {/* Visual connector line for large screens */}
            <div className="hidden lg:block absolute right-[85%] top-1/2 w-32 h-px bg-gradient-to-r from-transparent via-primary/50 to-primary/80" />
            
            <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-full blur-3xl opacity-30 animate-pulse" />
              {profileImage && (
                <Image
                  src={profileImage.imageUrl}
                  alt="Profile Picture"
                  fill
                  priority
                  className="rounded-full object-cover border-2 border-primary/50 shadow-[0_0_40px_rgba(0,243,255,0.2)] relative z-10"
                  data-ai-hint={profileImage.imageHint}
                  sizes="(max-width: 768px) 280px, 400px"
                />
              )}
              {/* Status Badge */}
              <div className="absolute bottom-2 -right-4 md:bottom-6 md:-right-8 z-20 bg-background/80 backdrop-blur-md border border-primary/30 rounded-full px-4 py-2 flex items-center gap-2 shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <span className="text-xs md:text-sm font-code text-foreground whitespace-nowrap">Open to opportunities</span>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <div className="flex flex-col justify-center space-y-6 text-center lg:text-left order-1 lg:order-1 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4"
            >
              <h1 className="font-headline text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-400 pb-2">
                Hello, I&apos;m <br />
                <span className="text-primary">{devName}</span>
              </h1>

              <div className="h-8 md:h-10 mt-2">
                <span className="font-code text-xl md:text-2xl text-accent">
                  &gt; {text}
                  <span className="animate-pulse">_</span>
                </span>
              </div>

              {/* Compact Social Row */}
              <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.name}
                    className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-110"
                  >
                    <link.icon className="h-6 w-6" />
                  </a>
                ))}
              </div>

              <p className="max-w-[600px] text-[#B8BCC8] md:text-lg mx-auto lg:mx-0 font-body leading-relaxed pt-2">
                I&apos;m an Undergraduate Computer Science student with strong foundations in software engineering and system design. I specialize in building scalable full-stack and AI-driven applications.
              </p>
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-2"
            >
              {techStack.map((tech) => (
                <div key={tech.name} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-sm font-code text-primary/90 hover:bg-primary/20 hover:text-primary transition-colors cursor-default">
                  <tech.icon className="w-3.5 h-3.5" />
                  <span>{tech.name}</span>
                </div>
              ))}
            </motion.div>

            {/* Stat Highlight & CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center gap-6 pt-6 justify-center lg:justify-start"
            >
              <div className="flex gap-4">
                <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_20px_rgba(0,243,255,0.5)] transition-all px-8 py-6 text-base font-semibold">
                  <a href="#projects">View Projects</a>
                </Button>
                <Button variant="outline" asChild className="rounded-full border-secondary text-secondary hover:bg-secondary/10 hover:shadow-[0_0_20px_rgba(255,0,255,0.4)] transition-all px-8 py-6 text-base font-semibold">
                  <a href="#resume">Download Resume</a>
                </Button>
              </div>

              {/* Standout Stat */}
              <div className="hidden sm:block w-px h-12 bg-border"></div>
              
              <div className="flex flex-col items-center sm:items-start group cursor-default bg-primary/5 px-4 py-2 rounded-xl border border-primary/10 hover:border-primary/30 transition-colors">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary group-hover:drop-shadow-[0_0_10px_rgba(0,243,255,0.5)] transition-all">
                  108%
                </div>
                <div className="text-xs text-muted-foreground font-code uppercase tracking-wider mt-0.5">
                  Community Engagement
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
