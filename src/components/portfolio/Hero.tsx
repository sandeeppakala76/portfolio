import { useEffect, useState } from "react";
import { Download, Github, Linkedin, Mail, Phone } from "lucide-react";
import sandeepPhoto from "@/assets/sandeep-photo.jpeg";
import ExternalLink from "@/components/portfolio/ExternalLink";

const roles = ["Full Stack Developer", "Python Developer", "Web Designer"];
const linkedInUrl = "https://www.linkedin.com/in/sandeep-pakala-63b815307/";

const Hero = () => {
  const [text, setText] = useState("");
  const [roleIdx, setRoleIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  const handleResumeDownload = async () => {
    const resumePath = "/Sandeep_Pakala_Resume.pdf";

    try {
      const response = await fetch(resumePath, { cache: "no-store" });
      if (!response.ok) throw new Error("Resume PDF could not be loaded");

      const blob = await response.blob();
      const url = URL.createObjectURL(new Blob([blob], { type: "application/pdf" }));
      const link = document.createElement("a");
      link.href = url;
      link.download = "Sandeep_Pakala_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch {
      window.open(resumePath, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    const current = roles[roleIdx];
    const speed = deleting ? 60 : 110;
    const timeout = setTimeout(() => {
      const next = deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1);
      setText(next);
      if (!deleting && next === current) setTimeout(() => setDeleting(true), 1200);
      else if (deleting && next === "") {
        setDeleting(false);
        setRoleIdx((i) => (i + 1) % roles.length);
      }
    }, speed);
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIdx]);

  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <p className="text-lg md:text-xl text-foreground/80 mb-3">Hello, It's Me</p>
          <h1 className="text-5xl md:text-6xl font-extrabold neon-text mb-3 leading-tight">
            Sandeep Pakala
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-5">
            And I'm a <span className="text-primary">{text}</span>
            <span className="animate-pulse text-primary">|</span>
          </h2>
          <p className="text-foreground/70 max-w-lg mb-8 leading-relaxed">
            Recent B.Tech graduate passionate about building responsive, full-stack web
            applications using Python, HTML, CSS and Oracle SQL. I love crafting clean code and
            polished user experiences.
          </p>

          <div className="flex items-center gap-4 mb-8">
            <ExternalLink
              href={linkedInUrl}
              aria-label="LinkedIn"
              className="p-3 rounded-full border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground transition-colors shadow-[0_0_15px_hsl(var(--primary)/0.4)]"
            >
              <Linkedin size={20} />
            </ExternalLink>
            <ExternalLink
              href="https://github.com/sandeeppakala76"
              aria-label="GitHub"
              className="p-3 rounded-full border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground transition-colors shadow-[0_0_15px_hsl(var(--primary)/0.4)]"
            >
              <Github size={20} />
            </ExternalLink>
            <ExternalLink
              href="mailto:sandeeppakala76@gmail.com"
              aria-label="Email"
              className="p-3 rounded-full border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground transition-colors shadow-[0_0_15px_hsl(var(--primary)/0.4)]"
            >
              <Mail size={20} />
            </ExternalLink>
            <ExternalLink
              href="tel:+918977833209"
              aria-label="Phone"
              className="p-3 rounded-full border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground transition-colors shadow-[0_0_15px_hsl(var(--primary)/0.4)]"
            >
              <Phone size={20} />
            </ExternalLink>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })}
              className="neon-button px-8 py-3 rounded-full font-semibold"
            >
              More About Me
            </button>
            <button
              type="button"
              onClick={handleResumeDownload}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold border border-primary/60 text-primary hover:bg-primary hover:text-primary-foreground transition-colors shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
            >
              <Download size={18} />
              Download Resume
            </button>
          </div>
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <div className="neon-ring w-64 h-64 md:w-80 md:h-80">
            <img
              src={sandeepPhoto}
              alt="Sandeep Pakala — Full Stack Developer portrait"
              className="w-full h-full rounded-full object-cover object-top bg-card"
              style={{ objectPosition: "50% 18%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;