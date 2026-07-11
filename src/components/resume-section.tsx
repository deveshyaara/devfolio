'use client';

import { ExternalLink, Briefcase, GraduationCap, Award } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { education, experience, certifications } from '@/lib/data';

// Helper to highlight key metrics and tech in experience descriptions
const highlightKeywords = (text: string) => {
  const keywords = [
    '108%', '15%', '80%', '10+', '7', '120', '250',
    'Next.js', 'Supabase', 'Python', 'Pandas', 'PostgreSQL', 
    'Power BI', 'Isolation Forest', 'K-Means clustering', 
    'Django REST API', 'Redis', 'HMAC-SHA256',
    'TensorFlow', 'Vision Transformer', 'ViT', 'CNN', 
    'NumPy', 'Matplotlib'
  ];
  
  // Create a regex to match any of the keywords
  const regex = new RegExp(`(${keywords.join('|').replace(/[+.]/g, '\\$&')})`, 'g');
  
  const parts = text.split(regex);
  return parts.map((part, i) => {
    if (keywords.includes(part)) {
      return <span key={i} className="font-bold text-accent drop-shadow-[0_0_8px_rgba(255,0,255,0.4)]">{part}</span>;
    }
    return part;
  });
};

export default function ResumeSection() {
  return (
    <section id="resume" className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 w-full bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,119,198,0.05),transparent_50%)]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-headline bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Resume
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto font-body">
            My professional journey, education, and achievements
          </p>
          <Link href="/resume">
            <Button
              className="mt-6 gap-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground border border-primary/20 hover:shadow-[0_0_15px_rgba(0,243,255,0.5)] transition-all duration-300"
              size="lg"
            >
              <ExternalLink className="w-4 h-4" />
              View Full Resume
            </Button>
          </Link>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-primary">
                  <GraduationCap className="w-5 h-5" />
                  Education
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {education.map((edu, index) => (
                  <div key={index} className="space-y-1.5 border-l-2 border-primary/20 pl-4">
                    <h3 className="font-semibold text-foreground font-headline">{edu.degree}</h3>
                    <p className="text-sm text-muted-foreground font-body">{edu.institution}</p>
                    <p className="text-sm text-primary font-code">{edu.period}</p>
                    <p className="text-sm text-muted-foreground font-body">{edu.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary transition-colors duration-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-primary">
                  <Award className="w-5 h-5" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {certifications.map((cert, index) => (
                  <div key={index} className="space-y-1 border-l-2 border-accent/20 pl-4">
                    <h3 className="font-semibold text-foreground font-headline">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground font-body">{cert.issuer}</p>
                    <p className="text-sm text-primary font-code">{cert.date}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Experience - Scroll Snap Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <div className="flex items-center gap-2 font-headline text-primary mb-4 text-2xl font-bold px-2">
            <Briefcase className="w-6 h-6" />
            Experience
          </div>
          
          <div className="relative h-[450px] sm:h-[400px] overflow-y-auto snap-y snap-mandatory rounded-xl border border-primary/30 shadow-[0_0_20px_rgba(0,243,255,0.1)] [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-primary/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-primary/40">
            {experience.map((exp, index) => (
              <div 
                key={index} 
                className="snap-start snap-always min-h-full w-full flex flex-col justify-center p-6 sm:p-10 relative bg-background border-b border-primary/10 last:border-0"
                style={{ zIndex: experience.length - index }}
              >
                <div className="border-l-2 border-secondary/40 pl-6 space-y-4 max-w-4xl">
                  <div>
                    <h3 className="font-bold text-xl sm:text-2xl text-foreground font-headline text-primary">{exp.title}</h3>
                    <p className="text-muted-foreground font-body text-lg">{exp.company}</p>
                    <p className="text-sm text-accent font-code mt-1">{exp.period}</p>
                  </div>
                  <ul className="space-y-2.5">
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx} className="text-sm sm:text-base text-muted-foreground flex items-start font-body leading-relaxed">
                        <span className="text-secondary mr-3 mt-1.5 font-bold">•</span>
                        <span>{highlightKeywords(resp)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
