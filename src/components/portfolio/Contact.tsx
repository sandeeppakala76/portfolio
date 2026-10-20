import { useState } from "react";
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import ExternalLink from "@/components/portfolio/ExternalLink";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Please enter a valid email").max(255, "Email must be under 255 characters"),
  subject: z.string().trim().max(150, "Subject must be under 150 characters").optional().or(z.literal("")),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be under 1000 characters"),
});

type FormData = { name: string; email: string; subject: string; message: string };
type FormErrors = Partial<Record<keyof FormData, string>>;

const initialForm: FormData = { name: "", email: "", subject: "", message: "" };
const linkedInUrl = "https://www.linkedin.com/in/sandeep-pakala-63b815307/";

const Contact = () => {
  const [form, setForm] = useState<FormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [busy, setBusy] = useState(false);

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);

    if (!parsed.success) {
      const nextErrors: FormErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FormData;
        if (key && !nextErrors[key]) nextErrors[key] = issue.message;
      }
      setErrors(nextErrors);
      toast({ title: "Please fix the errors", description: "Complete the form before sending.", variant: "destructive" });
      return;
    }

    setBusy(true);
    const { name, email, subject, message } = parsed.data;
    const mailto = `mailto:sandeeppakala76@gmail.com?subject=${encodeURIComponent(subject || "Portfolio enquiry")}&body=${encodeURIComponent(`Hi Sandeep,\n\n${message}\n\n— ${name} (${email})`)}`;
    window.location.href = mailto;
    toast({ title: "Opening email app", description: "Your message is ready to send." });
    setForm(initialForm);
    setErrors({});
    setTimeout(() => setBusy(false), 800);
  };

  const inputClass = (field: keyof FormData) =>
    `w-full rounded-lg border bg-input/60 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none transition-colors ${
      errors[field] ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"
    }`;

  return (
    <section id="contact" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <h2 className="mb-14 text-center text-4xl font-extrabold md:text-5xl">
          Contact <span className="text-primary">Me</span>
        </h2>

        <div className="mx-auto grid max-w-5xl gap-12 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-xl font-semibold">Let's Work Together</h3>
            <p className="mb-6 leading-relaxed text-foreground/70">
              Have a project, opportunity or collaboration in mind? Send me a message and I’ll get back to you soon.
            </p>

            <ul className="mb-6 space-y-3 text-sm">
              <li className="flex items-center gap-3 text-foreground/80">
                <Mail size={18} className="text-primary" />
                <ExternalLink href="mailto:sandeeppakala76@gmail.com" className="hover:text-primary">sandeeppakala76@gmail.com</ExternalLink>
              </li>
              <li className="flex items-center gap-3 text-foreground/80">
                <Phone size={18} className="text-primary" />
                <ExternalLink href="tel:+918977833209" className="hover:text-primary">+91 89778 33209</ExternalLink>
              </li>
            </ul>

            <div className="flex gap-3">
              <ExternalLink href={linkedInUrl} aria-label="LinkedIn" className="rounded-full border border-primary/50 p-3 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                <Linkedin size={18} />
              </ExternalLink>
              <ExternalLink href="https://github.com/sandeeppakala76" aria-label="GitHub" className="rounded-full border border-primary/50 p-3 text-primary transition-colors hover:bg-primary hover:text-primary-foreground">
                <Github size={18} />
              </ExternalLink>
            </div>
          </div>

          <form onSubmit={onSubmit} noValidate className="space-y-4">
            <div>
              <input value={form.name} onChange={(e) => update("name", e.target.value)} maxLength={100} placeholder="Enter Your Name" className={inputClass("name")} />
              {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
            </div>
            <div>
              <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={255} placeholder="Enter Your Email" className={inputClass("email")} />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>
            <div>
              <input value={form.subject} onChange={(e) => update("subject", e.target.value)} maxLength={150} placeholder="Enter Your Subject (optional)" className={inputClass("subject")} />
              {errors.subject && <p className="mt-1 text-xs text-destructive">{errors.subject}</p>}
            </div>
            <div>
              <textarea value={form.message} onChange={(e) => update("message", e.target.value)} maxLength={1000} rows={5} placeholder="Enter Your Message" className={`${inputClass("message")} resize-none`} />
              <div className="mt-1 flex justify-between text-xs">
                <span className="text-destructive">{errors.message ?? ""}</span>
                <span className="text-muted-foreground">{form.message.length}/1000</span>
              </div>
            </div>
            <button type="submit" disabled={busy} className="neon-button w-full rounded-full py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-60">
              {busy ? "Opening email…" : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;