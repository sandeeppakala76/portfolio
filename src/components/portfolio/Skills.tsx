import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";

const technical = [
  { name: "Python", level: 85 },
  { name: "HTML & CSS", level: 90 },
  { name: "Django", level: 75 },
  { name: "Oracle SQL", level: 80 },
  { name: "GitHub", level: 80 },
];

const professional = [
  { name: "Communication", level: 90 },
  { name: "Time Management", level: 85 },
  { name: "Leadership", level: 85 },
  { name: "Teamwork", level: 88 },
  { name: "Problem Solving", level: 82 },
];

const Bar = ({ name, level }: { name: string; level: number }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimated(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="mb-5">
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-foreground/90">{name}</span>
        <span className="text-primary">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full transition-[width] duration-1000 ease-out"
          style={{
            width: animated ? `${level}%` : "0%",
            background: "var(--gradient-button)",
            boxShadow: "0 0 10px hsl(var(--primary) / 0.6)",
          }}
        />
      </div>
    </div>
  );
};

const Skills = () => (
  <section id="skills" className="py-20 md:py-28">
    <div className="container mx-auto px-4">
      <Reveal>
        <h2 className="mb-14 text-center text-4xl font-extrabold md:text-5xl">
          My <span className="text-primary">Skills</span>
        </h2>
      </Reveal>

      <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
        <Reveal>
          <h3 className="mb-6 inline-block border-b-2 border-primary pb-1 text-xl font-semibold text-foreground">
            Technical Skills
          </h3>
          {technical.map((skill) => (
            <Bar key={skill.name} {...skill} />
          ))}
        </Reveal>
        <Reveal delay={120}>
          <h3 className="mb-6 inline-block border-b-2 border-primary pb-1 text-xl font-semibold text-foreground">
            Professional Skills
          </h3>
          {professional.map((skill) => (
            <Bar key={skill.name} {...skill} />
          ))}
        </Reveal>
      </div>
    </div>
  </section>
);

export default Skills;