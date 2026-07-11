'use client';

import * as React from 'react';
import Link from 'next/link';
import { Menu, Code } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Resume', href: '#resume' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState('');

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Section tracking logic
      const sections = ['about', 'projects', 'skills', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 100; // Header offset threshold

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
      scrolled 
        ? 'border-primary/20 bg-background/80 backdrop-blur-md shadow-[0_4px_20px_rgba(0,243,255,0.05)]' 
        : 'border-transparent bg-transparent'
    }`}>
      <div className="container flex h-16 items-center w-full max-w-7xl px-4 sm:px-6 lg:px-8 mx-auto">
        
        {/* Desktop Logo */}
        <div className="mr-4 hidden items-center lg:flex">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-lg font-headline group transition-transform duration-300 hover:scale-102">
            <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(0,243,255,0.3)]">
              <Code className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
            </div>
            <span className="font-bold text-white transition-colors duration-300">
              Devesh <span className="text-primary group-hover:text-accent transition-colors duration-300">Tiwari</span>
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-3 text-sm lg:flex flex-1 justify-end">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative font-code text-sm flex items-center justify-center h-9 px-4 rounded-full border transition-all duration-300 ${
                  isActive
                    ? 'bg-primary/25 border-primary/50 shadow-[0_0_15px_rgba(0,243,255,0.4)] text-primary font-semibold'
                    : 'bg-primary/5 text-muted-foreground border-primary/10 hover:bg-primary/15 hover:border-primary/25 hover:shadow-[0_0_12px_rgba(0,243,255,0.3)] hover:text-primary'
                }`}
              >
                <span className="relative z-10">&lt;{link.name} /&gt;</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Navigation */}
        <div className="flex flex-1 items-center justify-between lg:hidden">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline transition-transform duration-300 hover:scale-102 group">
            <Code className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
            <span className="text-white">Devesh <span className="text-primary group-hover:text-accent transition-colors duration-300">Tiwari</span></span>
          </Link>
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/10 hover:text-primary">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] border-l border-primary/20 bg-background/95 backdrop-blur-xl">
              <SheetHeader>
                <SheetTitle>
                  <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline" onClick={() => setOpen(false)}>
                    <Code className="h-6 w-6 text-primary" />
                    <span>Devesh <span className="text-primary">Tiwari</span></span>
                  </Link>
                </SheetTitle>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-4">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.href.substring(1);
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={`text-lg font-code font-medium transition-all w-max px-4 py-2 rounded-full border ${
                        isActive
                          ? 'bg-primary/25 border-primary/50 shadow-[0_0_15px_rgba(0,243,255,0.4)] text-primary font-semibold'
                          : 'bg-primary/5 text-muted-foreground border-primary/10 hover:text-primary'
                      }`}
                    >
                      &lt;{link.name} /&gt;
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
