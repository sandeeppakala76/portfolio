import { ExternalLink as ExternalLinkIcon, Github } from "lucide-react";
import ExternalLink from "@/components/portfolio/ExternalLink";

const projects = [
  {
    title: "Student Management System",
    desc: "Web-based application built with Python, HTML, CSS and Oracle SQL to manage student records — add, update, delete and search with secure DB connectivity.",
    tags: ["Python", "HTML", "CSS", "Oracle SQL"],
    github: "https://github.com/sandeeppakala76",
  },
  {
    title: "Personal Portfolio Website",
    desc: "Responsive portfolio built with HTML and CSS showcasing skills, certifications and projects with a clean, mobile-friendly layout.",
    tags: ["HTML", "CSS", "Responsive"],
    github: "https://github.com/sandeeppakala76",
  },
];

const certifications = [
  "AI & ML Internship — Embrizon Technologies",
  "IoT Internship — Data Valley",
  "Cisco Certified Network Associate (CCNA) — Indian Tech Keys",
  "PCB Design — Indian Tech Keys",
  "NPTEL IoT — 7.9 CGPA",
  "Embedded Systems — Dhara Global Solutions",
];

const Projects = () => (
  <section id="projects" className="py-20 md:py-28 bg-[hsl(var(--card)/0.4)]">
    <div className="container mx-auto px-4">
      <h2 className="text-center text-4xl md:text-5xl font-extrabold mb-14">
        My <span className="text-primary">Projects</span>
      </h2>

      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
        {projects.map((p) => (
          <article key={p.title} className="neon-card p-7 flex flex-col">
            <h3 className="text-xl font-semibold text-foreground mb-3">{p.title}</h3>
            <p className="text-foreground/70 leading-relaxed mb-5 flex-1">{p.desc}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1 rounded-full border border-primary/40 text-primary bg-primary/5"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <ExternalLink
                href={p.github}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <Github size={16} /> Code
              </ExternalLink>
              <ExternalLink
                href={p.github}
                className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
              >
                <ExternalLinkIcon size={16} /> View
              </ExternalLink>
            </div>
          </article>
        ))}
      </div>

      <h3 className="text-center text-2xl md:text-3xl font-bold mb-8">
        Certifications & <span className="text-primary">Internships</span>
      </h3>
      <ul className="grid sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {certifications.map((c) => (
          <li
            key={c}
            className="neon-card p-4 text-sm text-foreground/85 flex items-start gap-3"
          >
            <span className="mt-1 inline-block w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
            {c}
          </li>
        ))}
      </ul>
    </div>
  </section>
);

export default Projects;