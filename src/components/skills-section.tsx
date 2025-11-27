"use client";

import { skills } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32 bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,243,255,0.1)_0%,transparent_70%)]" />

      <div className="container px-4 md:px-6 relative z-10">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-2"
          >
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
              Skills & Technologies
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed font-body">
              A selection of my technical skills and the tools I love to use.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-center"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={skill.name}
              variants={item}
              whileHover={{
                scale: 1.05,
                y: -5,
                boxShadow: "0 0 20px rgba(0, 243, 255, 0.3)"
              }}
              className="h-full"
            >
              <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/20 hover:border-primary transition-colors duration-300">
                <CardContent className="p-6 flex flex-col items-center justify-center gap-4 h-full">
                  <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
                    <skill.icon className="h-8 w-8" />
                  </div>
                  <p className="text-sm md:text-base font-semibold font-code text-foreground">{skill.name}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
