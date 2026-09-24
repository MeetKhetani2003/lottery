import { motion } from "framer-motion";
import { Eye, Heart, ShieldCheck, Sparkles, Ticket, Users, Zap } from "lucide-react";
import { Section, SectionHeading, Card } from "../../components/common/ui";
import { Reveal, RevealGroup, RevealItem } from "../../components/common/Reveal";

const values = [
  { icon: Eye, title: "Transparent Information", text: "Every draw, price and prize structure is published clearly — before tickets go on sale, not after." },
  { icon: ShieldCheck, title: "Trust & Safety", text: "Protected profiles, clear records and a platform built to feel secure from the first click." },
  { icon: Zap, title: "Simple By Default", text: "No clutter, no confusion. Just the essential actions, arranged the way you'd expect from a modern fintech app." },
  { icon: Heart, title: "Player First", text: "Notifications, reminders and history designed around you — not around noise." },
];

const steps = [
  { icon: Ticket, title: "Browse the draws", text: "Explore weekly and special draws with transparent pricing." },
  { icon: Zap, title: "Get your ticket", text: "Secure a digital ticket in seconds, stored in your dashboard." },
  { icon: Eye, title: "Follow the draw", text: "Track status and get notified the moment results publish." },
];

const stats = [
  { value: "128K+", label: "Registered players" },
  { value: "312+", label: "Published draws" },
  { value: "42K+", label: "Digital tickets issued" },
  { value: "99.2%", label: "Platform uptime" },
];

export default function About() {
  return (
    <div className="pb-24">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line bg-white">
        <div className="bg-ticket-pattern pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-emerald-brand/10 blur-3xl" />
        <Section className="relative py-20 text-center lg:py-28">
          <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-emerald-brand">Our Story</p>
            <h1 className="mx-auto mt-4 max-w-2xl font-display text-4xl font-semibold tracking-tight text-balance text-ink sm:text-6xl sm:leading-[1.1]">
              Simple. <span className="text-emerald-brand">Transparent.</span> Connected.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-[15.5px] leading-relaxed text-muted">
              Howladar Lottery Agency began with one idea: a lottery platform should feel as considered as a banking app — calm,
              clear and genuinely trustworthy. Today we help players explore draws, manage tickets and follow results from
              one elegant dashboard.
            </p>
          </motion.div>
        </Section>
      </section>

      {/* Stats */}
      <section className="border-b border-line bg-white">
        <Section className="grid grid-cols-2 divide-line lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.07} className="px-6 py-10 text-center">
              <p className="font-display text-3xl font-semibold tracking-tight text-emerald-deep sm:text-4xl">{s.value}</p>
              <p className="mt-2 text-[13px] font-medium text-muted">{s.label}</p>
            </Reveal>
          ))}
        </Section>
      </section>

      {/* Who we are */}
      <Section className="grid items-center gap-14 py-20 lg:grid-cols-2 lg:py-28">
        <Reveal>
          <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-emerald-brand">Who We Are</p>
          <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            A modern take on an old ritual
          </h2>
          <p className="mt-5 text-[15px] leading-relaxed text-muted">
            For generations, the lottery has been about hope and community. We built Howladar to bring that experience into
            the digital age — without the noise, the clutter or the casino theatrics.
          </p>
          <p className="mt-4 text-[15px] leading-relaxed text-muted">
            Every ticket you buy is organised in a dashboard that feels like a modern financial app. Every result is
            published with full context. Every interaction is designed to be calm, considered and clear.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-emerald-soft px-4 py-2 text-[13px] font-semibold text-emerald-deep">
              <Sparkles className="h-4 w-4" /> Demo prototype environment
            </span>
            <span className="inline-flex items-center gap-2 rounded-full bg-offwhite px-4 py-2 text-[13px] font-semibold text-muted ring-1 ring-line">
              <Users className="h-4 w-4" /> Founded in Kochi, India
            </span>
          </div>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="relative">
            <div className="absolute -inset-4 rounded-[28px] bg-gradient-to-br from-gold/20 to-emerald-brand/20 blur-2xl" />
            <div className="relative overflow-hidden rounded-[26px] border border-line bg-white p-8 shadow-lift">
              <img src="/assets/images/hero-lottery.png" alt="Premium lottery experience" className="w-full rounded-[18px]" />
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                {[
                  { v: "4", l: "Core steps" },
                  { v: "6", l: "Platform features" },
                  { v: "0", l: "Clutter" },
                ].map((s) => (
                  <div key={s.l} className="rounded-2xl bg-offwhite py-4">
                    <p className="font-display text-2xl font-semibold text-emerald-deep">{s.v}</p>
                    <p className="mt-1 text-[11px] font-medium text-muted">{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* What we provide */}
      <section className="border-y border-line bg-white py-20 lg:py-28">
        <Section>
          <Reveal>
            <SectionHeading
              eyebrow="What We Provide"
              title="A complete lottery experience"
              sub="Everything a modern player needs — nothing they don't."
            />
          </Reveal>
          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
            {[
              { icon: Ticket, t: "Ticket Marketplace", d: "Browse and purchase digital tickets across weekly and special draws." },
              { icon: Eye, t: "Result Publishing", d: "Winning numbers published instantly with full prize structures." },
              { icon: Zap, t: "Wallet & Transactions", d: "Demo wallet with clear balance tracking and transaction history." },
              { icon: ShieldCheck, t: "Secure Profiles", d: "Manage your identity, tickets and activity from one protected place." },
            ].map((f) => (
              <RevealItem key={f.t}>
                <Card hover className="h-full p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-emerald-soft text-emerald-deep transition-transform duration-300 group-hover:scale-110">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-display text-[16px] font-semibold text-ink">{f.t}</h3>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted">{f.d}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </Section>
      </section>

      {/* Timeline */}
      <Section className="py-20 lg:py-28">
        <Reveal>
          <SectionHeading
            eyebrow="Our Journey"
            title="How the platform works"
            sub="From your first visit to checking your result — four clear stages."
          />
        </Reveal>
        <div className="relative mt-16">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-gold/60 via-emerald-brand/30 to-transparent lg:left-0 lg:right-0 lg:top-5 lg:h-px lg:w-auto lg:bg-gradient-to-r lg:from-gold/60 lg:via-emerald-brand/30 lg:to-transparent" />
          <RevealGroup className="grid gap-10 lg:grid-cols-3 lg:gap-6" stagger={0.1}>
            {steps.map((s, i) => (
              <RevealItem key={s.title} className="relative">
                <div className="flex items-start gap-5 lg:flex-col lg:gap-0">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-display text-[13px] font-bold text-emerald-deep shadow-[0_0_0_6px_#F8FAF9] ring-1 ring-gold/50">
                    {i + 1}
                  </div>
                  <div className="lg:mt-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-soft text-emerald-brand lg:mb-4">
                      <s.icon className="h-5 w-5" />
                    </span>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-ink">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* Trust */}
      <section className="border-t border-line bg-white">
        <Section className="py-20 lg:py-28">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Trust & Transparency"
                title="Built to earn confidence"
                sub="We treat every player like a customer of a modern financial service — because that's the standard we hold ourselves to."
              />
              <div className="mt-8 space-y-4">
                {[
                  "Clear, published prize structures for every draw",
                  "Instant result publishing with full context",
                  "Organised ticket history, always accessible",
                  "Privacy-first profile management",
                ].map((t) => (
                  <div key={t} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-soft">
                      <svg className="h-3 w-3 text-emerald-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                      </svg>
                    </span>
                    <p className="text-sm text-muted">{t}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="relative">
                <div className="absolute -inset-4 rounded-[28px] bg-emerald-brand/10 blur-2xl" />
                <div className="relative overflow-hidden rounded-[26px] border border-line bg-gradient-to-br from-emerald-deep to-emerald-brand p-10 text-white shadow-lift">
                  <div className="bg-grid-lines pointer-events-none absolute inset-0 opacity-60" />
                  <ShieldCheck className="relative h-10 w-10 text-gold" />
                  <h3 className="relative mt-6 font-display text-2xl font-semibold tracking-tight">Our commitment</h3>
                  <p className="relative mt-4 text-[15px] leading-relaxed text-white/70">
                    Howladar is a design prototype. It demonstrates a premium digital lottery experience with realistic
                    mock data — no real lottery purchases, wallet transactions or prize payouts occur on this platform.
                  </p>
                  <div className="relative mt-8 rounded-2xl border border-white/10 bg-white/5 p-5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-gold">Responsible Play</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">
                      Play responsibly. Set limits, take breaks, and treat lottery participation as entertainment, never as
                      income.
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </Section>
      </section>
    </div>
  );
}
