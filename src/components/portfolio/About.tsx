import sandeepPhoto from "@/assets/sandeep-photo.jpeg";
import Reveal from "./Reveal";

const About = () => (
  <section id="about" className="py-20 md:py-28">
    <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
      <Reveal className="flex justify-center">
        <div className="neon-ring w-64 h-64 md:w-80 md:h-80">
          <img
            src={sandeepPhoto}
            alt="Sandeep Pakala portrait"
            className="w-full h-full rounded-full object-cover bg-card"
            style={{ objectPosition: "50% 18%" }}
          />
        </div>
      </Reveal>

      <Reveal delay={120}>
        <h2 className="text-4xl md:text-5xl font-extrabold mb-2">
          About <span className="text-primary">Me</span>
        </h2>
        <h3 className="text-xl md:text-2xl font-semibold text-foreground mb-5">
          Full Stack Developer!
        </h3>
        <p className="text-foreground/75 leading-relaxed mb-4">
          I'm Sandeep Pakala, a B.Tech graduate from Siddharth Institute of Engineering and
          Technology with a strong foundation in Python, HTML, CSS, Django and Oracle SQL.
          I enjoy turning ideas into clean, functional and visually appealing web experiences.
        </p>
        <p className="text-foreground/75 leading-relaxed mb-6">
          Backed by hands-on internships in AI/ML and IoT, plus certifications in CCNA, PCB
          Design and NPTEL IoT, I bring curiosity, leadership and strong communication to every
          project I take on. I'm always eager to learn new tools and grow as a developer.
        </p>
        <button
          onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
          className="neon-button px-8 py-3 rounded-full font-semibold"
        >
          More About Me
        </button>
      </Reveal>
    </div>
  </section>
);

export default About;