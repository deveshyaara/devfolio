import { skills } from '@/lib/data';
import { Card, CardContent } from '@/components/ui/card';

export default function SkillsSection() {
  return (
    <section id="skills" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold font-headline tracking-tighter sm:text-5xl text-primary">Skills & Technologies</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              A selection of my technical skills and the tools I love to use.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-4xl justify-center gap-6 py-12 sm:grid-cols-2 md:grid-cols-3 lg:gap-8">
          {skills.map((skill) => (
            <Card key={skill.name} className="flex flex-col items-center justify-center p-6 text-center transition-all duration-300 hover:bg-accent hover:text-accent-foreground">
              <CardContent className="p-0 flex flex-col items-center justify-center gap-4">
                <skill.icon className="h-12 w-12 text-primary" />
                <p className="text-lg font-semibold">{skill.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
