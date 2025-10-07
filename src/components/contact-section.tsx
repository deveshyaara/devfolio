import { Button } from '@/components/ui/button';
import { Mail,Linkedin,Instagram, Icon } from 'lucide-react';
import { socialLinks } from '@/lib/data';
import React from 'react';

export default function ContactSection() {
  return (
    <section id="contact" className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold font-headline tracking-tighter md:text-4xl/tight text-primary">Get In Touch</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </div>
        <div className="mx-auto w-full max-w-sm space-y-2"  >
            {socialLinks.map((link) => (
                <Button key={link.name} variant="outline" size="icon" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                    {React.createElement(link.icon, { className: "h-5 w-5 text-primary" })}
                  </a>
                </Button>
              ))}
        </div>
      </div>
    </section>
  );
}
