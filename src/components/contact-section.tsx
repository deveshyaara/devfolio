"use client";

import { Button } from '@/components/ui/button';
import { Mail, Copy, Check } from 'lucide-react';
import { socialLinks } from '@/lib/data';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const emailAddress = "tiwaridewesh234@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="w-full pt-16 pb-24 md:pt-24 md:pb-32 lg:pt-32 lg:pb-40 bg-secondary/5 relative overflow-hidden">
      {/* Visual Divider Transition */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent shadow-[0_0_20px_rgba(0,243,255,0.3)]" />
      <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="container mx-auto flex flex-col items-center justify-center gap-10 px-4 text-center md:px-6 relative z-10">
        
        {/* Header & Description */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="space-y-4 max-w-2xl"
        >
          <h2 className="text-4xl font-bold font-headline tracking-tighter md:text-5xl/tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary pb-2">
            Get In Touch
          </h2>
          <p className="mx-auto text-muted-foreground md:text-lg font-body leading-relaxed">
            Whether you have a project in mind, want to discuss a potential collaboration, or just want to say hi, my inbox is always open. I'll try my best to get back to you!
          </p>
        </motion.div>

        {/* Primary CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
        >
          <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-[0_0_25px_rgba(0,243,255,0.5)] transition-all px-10 py-7 text-lg font-semibold gap-2">
            <a href={`mailto:${emailAddress}`}>
              Say Hello 👋
            </a>
          </Button>
        </motion.div>

        {/* Email Address & Copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col items-center gap-3 mt-4"
        >
          <div className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-card/60 backdrop-blur-sm border border-primary/20 shadow-inner">
            <Mail className="w-5 h-5 text-primary" />
            <span className="font-code text-foreground text-sm md:text-base">{emailAddress}</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 rounded-full hover:bg-primary/20 hover:text-primary ml-2 transition-colors"
              onClick={handleCopyEmail}
              aria-label="Copy email address"
            >
              {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
        </motion.div>

        {/* Social Icons Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-10 mt-8"
        >
          {socialLinks.map((link) => (
            <a 
              key={link.name}
              href={link.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center gap-3"
            >
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-background border border-primary/20 group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300 shadow-sm group-hover:shadow-[0_0_20px_rgba(0,243,255,0.3)] group-hover:-translate-y-1">
                {React.createElement(link.icon, { className: "h-7 w-7 text-muted-foreground group-hover:text-primary transition-colors duration-300" })}
              </div>
              <span className="font-code text-xs md:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                {link.name}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
