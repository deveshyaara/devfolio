'use client';

import { ExternalLink, Briefcase, GraduationCap, Award } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ResumeSection() {
  const education = [
    {
      degree: 'B.E. in Computer Science',
      institution: 'Sambhram Institute of Technology Bangalore',
      period: '2023 - 2027',
      description: 'Current CGPA: 8.85/10',
    },
  ];

  const experience = [
    {
      title: 'Creative Team Lead',
      company: 'OSCode, SAIT Chapter',
      period: 'Sep 2025 – Present',
      responsibilities: [
        'Led design and branding initiatives for impactful visual communication.',
        'Collaborated on creative ideas, graphics, and content strategies.',
        'Guided the creative team in producing innovative designs for events.',
      ],
    },
    {
      title: 'Artificial Intelligence Intern',
      company: 'Coincent.ai',
      period: 'June 2024 - August 2024',
      responsibilities: [
        'Developed a text classifier using TensorFlow.',
        'Implemented a Vision Transformer for image classification.',
        'Worked on data preprocessing, model building, training, and evaluation.',
      ],
    },
  ];

  const certifications = [
    {
      name: 'Google: Build Real World AI Applications',
      issuer: 'Coursera',
      date: '2025',
    },
    {
      name: 'Advanced System Design',
      issuer: 'Physics Wallah',
      date: ' ',
    },
    {
      name: 'Ethical Hacking',
      issuer: 'Physics Wallah',
      date: ' ',
    },
  ];

  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8 w-full">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Resume
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey, education, and achievements
          </p>
          <Link href="/resume">
            <Button 
              className="mt-6 gap-2"
              size="lg"
            >
              <ExternalLink className="w-4 h-4" />
              View Full Resume
            </Button>
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Education */}
          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {education.map((edu, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="font-semibold text-foreground">{edu.degree}</h3>
                  <p className="text-sm text-muted-foreground">{edu.institution}</p>
                  <p className="text-sm text-primary">{edu.period}</p>
                  <p className="text-sm text-muted-foreground">{edu.description}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Certifications */}
          <Card className="bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Certifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {certifications.map((cert, index) => (
                <div key={index} className="space-y-1">
                  <h3 className="font-semibold text-foreground">{cert.name}</h3>
                  <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  <p className="text-sm text-primary">{cert.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Experience */}
        <Card className="mt-8 bg-card/50 backdrop-blur border-border/50 hover:border-primary/50 transition-colors">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" />
              Experience
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {experience.map((exp, index) => (
              <div key={index} className="space-y-3">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">{exp.title}</h3>
                  <p className="text-muted-foreground">{exp.company}</p>
                  <p className="text-sm text-primary">{exp.period}</p>
                </div>
                <ul className="space-y-2 ml-4">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
