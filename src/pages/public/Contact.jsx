import { useState } from "react";
import { motion } from "framer-motion";
import { Clock, Mail, MapPin, MessageSquare, Phone, Send } from "lucide-react";
import { Button, Card, Field, Input, Textarea } from "../../components/common/ui";
import { Reveal } from "../../components/common/Reveal";
import { useToast } from "../../context/ToastContext";

const channels = [
  { icon: Phone, title: "Phone", value: "+91 98470 00000", hint: "Mon–Sat, 9:00 AM – 7:00 PM" },
  { icon: Mail, title: "Email", value: "support@howladar.demo", hint: "Replies within 24 hours" },
  { icon: MapPin, title: "Office", value: "Marine Drive, Kochi, Kerala", hint: "By appointment only" },
  { icon: Clock, title: "Business Hours", value: "Mon – Sat · 9 AM – 7 PM", hint: "IST (UTC+5:30)" },
];

export default function Contact() {
  const { push } = useToast();
  const [form, setForm] = useState({ name: "", mobile: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Please enter your name";
    if (!/^[6-9]\d{9}$/.test(form.mobile)) err.mobile = "Enter a valid 10-digit mobile number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Enter a valid email address";
    if (!form.message.trim()) err.message = "Please enter a message";
    setErrors(err);
    if (Object.keys(err).length) return;
    setSending(true);
    setTimeout(() => {
      setSending(false);
      push("Message sent — we'll get back to you within 24 hours (demo).", "success");
      setForm({ name: "", mobile: "", email: "", message: "" });
    }, 900);
  };

  return (
    <div className="pb-24">
      <section className="border-b border-line bg-white">
        <div className="mx-auto w-full max-w-7xl px-5 py-14 sm:px-8 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-emerald-brand">Get In Touch</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">We'd love to hear from you</h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              Questions about draws, tickets or your account? Our team is here to help — reach out through any channel
              below.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 pt-12 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:pt-16">
        {/* Channels */}
        <div>
          <Reveal>
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">Contact channels</h2>
            <p className="mt-2 text-sm text-muted">Choose what's most comfortable for you.</p>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {channels.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.07}>
                <Card className="h-full p-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-soft text-emerald-brand">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{c.title}</p>
                  <p className="mt-1.5 text-sm font-semibold text-ink">{c.value}</p>
                  <p className="mt-1 text-xs text-muted">{c.hint}</p>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className="mt-6">
            <Card className="flex items-start gap-4 bg-gradient-to-br from-emerald-deep to-emerald-brand p-6 text-white">
              <MessageSquare className="mt-0.5 h-6 w-6 shrink-0 text-gold" />
              <div>
                <p className="font-display text-base font-semibold">Prefer self-service?</p>
                <p className="mt-1.5 text-sm leading-relaxed text-white/70">
                  Most answers are already in our FAQ — from checking results to managing your wallet.
                </p>
                <a href="/faq" className="mt-3 inline-block text-sm font-semibold text-gold transition-colors hover:text-white">
                  Visit the Help Centre →
                </a>
              </div>
            </Card>
          </Reveal>
        </div>

        {/* Form */}
        <Reveal delay={0.1}>
          <Card className="p-7 sm:p-9">
            <h2 className="font-display text-xl font-semibold tracking-tight text-ink">Send a message</h2>
            <p className="mt-1.5 text-sm text-muted">We usually respond within one business day.</p>

            <form onSubmit={submit} className="mt-7 space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full Name" error={errors.name}>
                  <Input value={form.name} onChange={set("name")} placeholder="Arjun Krishna" error={!!errors.name} />
                </Field>
                <Field label="Mobile Number" error={errors.mobile}>
                  <Input value={form.mobile} onChange={set("mobile")} placeholder="98470 00000" inputMode="numeric" error={!!errors.mobile} />
                </Field>
              </div>
              <Field label="Email Address" error={errors.email}>
                <Input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" error={!!errors.email} />
              </Field>
              <Field label="Message" error={errors.message}>
                <Textarea value={form.message} onChange={set("message")} placeholder="How can we help?" error={!!errors.message} />
              </Field>
              <Button type="submit" size="lg" className="w-full" disabled={sending}>
                {sending ? (
                  <>
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4Z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send Message
                  </>
                )}
              </Button>
              <p className="text-center text-[11px] text-muted">Frontend demo — no message is actually sent.</p>
            </form>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
