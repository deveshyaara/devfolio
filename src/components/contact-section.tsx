import { Button } from '@/components/ui/button';
import { Mail } from 'lucide-react';

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
        <div className="mx-auto w-full max-w-sm space-y-2">
            <Button size="lg" asChild className="transition-transform duration-300 hover:scale-105">
                <a href="mailto:hello@example.com">
                    <Mail className="mr-2 h-5 w-5"/>
                    Contact Me
                </a>
            </Button>
        </div>
      </div>
    </section>
  );
}
