import { useState } from "react";
import { Code2, Database, Globe } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const services = [
  {
    icon: Code2,
    title: "Full Stack Development",
    desc: "Building responsive, end-to-end web applications with Python, HTML, CSS and Django — from clean UI to secure backend logic.",
    details: {
      overview:
        "I build complete web applications end-to-end — from pixel-perfect interfaces to robust server-side logic and database integration.",
      highlights: [
        "Frontend with HTML5, CSS3, Django templates and modern responsive layouts",
        "Backend logic in Python (Flask / Django style patterns)",
        "REST API design, form handling and authentication flows",
        "Integration with Oracle SQL for persistent storage",
        "Clean, maintainable, version-controlled code (Git & GitHub)",
      ],
    },
  },
  {
    icon: Globe,
    title: "Web Design",
    desc: "Designing modern, mobile-friendly layouts with thoughtful typography, color and motion to make every page feel polished.",
    details: {
      overview:
        "I design interfaces that feel modern, fast and intentional — focused on clarity, hierarchy and a strong visual identity.",
      highlights: [
        "Mobile-first, fully responsive layouts",
        "Typography systems and consistent color palettes",
        "Smooth micro-interactions and scroll animations",
        "Accessible color contrast and semantic HTML",
        "Reusable component-driven design with Tailwind CSS",
      ],
    },
  },
  {
    icon: Database,
    title: "Database Solutions",
    desc: "Designing and integrating Oracle SQL databases — schema design, CRUD operations and reliable backend connectivity.",
    details: {
      overview:
        "I design relational databases and wire them into applications with reliable, secure data access layers.",
      highlights: [
        "Schema design, normalization and indexing in Oracle SQL",
        "Writing efficient queries, joins and stored procedures",
        "Full CRUD operations connected to Python backends",
        "Data validation, constraints and error handling",
        "Backup-friendly structures and clear documentation",
      ],
    },
  },
];

const Services = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex !== null ? services[activeIndex] : null;

  return (
    <section id="services" className="py-20 md:py-28 bg-[hsl(var(--card)/0.4)]">
    <div className="container mx-auto px-4">
      <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-14">
        My <span className="text-primary">Services</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((s, i) => (
          <article key={s.title} className="neon-card p-8">
            <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-5">
              <s.icon size={26} />
            </div>
            <h3 className="text-xl font-semibold mb-3 text-foreground">{s.title}</h3>
            <p className="text-foreground/70 leading-relaxed mb-6">{s.desc}</p>
            <button
              onClick={() => setActiveIndex(i)}
              className="neon-button px-5 py-2 rounded-full text-sm font-semibold"
            >
              Read More
            </button>
          </article>
        ))}
      </div>
    </div>

    <Dialog open={active !== null} onOpenChange={(open) => !open && setActiveIndex(null)}>
      <DialogContent className="bg-card border-primary/30">
        {active && (
          <>
            <DialogHeader>
              <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-3">
                <active.icon size={26} />
              </div>
              <DialogTitle className="text-2xl">{active.title}</DialogTitle>
              <DialogDescription className="text-foreground/70 pt-2">
                {active.details.overview}
              </DialogDescription>
            </DialogHeader>
            <ul className="mt-2 space-y-2">
              {active.details.highlights.map((h) => (
                <li key={h} className="flex gap-2 text-sm text-foreground/80">
                  <span className="text-primary mt-1">▹</span>
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </DialogContent>
    </Dialog>
  </section>
  );
};

export default Services;