import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bell,
  Check,
  ChevronRight,
  Eye,
  Gift,
  ShieldCheck,
  Ticket,
  Wallet,
  Zap,
} from "lucide-react";
import { Button, ButtonLink, Card, Section, SectionHeading, Badge, StatusDot } from "../../components/common/ui";
import { Reveal, RevealGroup, RevealItem } from "../../components/common/Reveal";
import { CountUp, CountUpRaw } from "../../components/common/CountUp";
import { LotteryCard } from "../../components/lottery/LotteryCard";
import { lotteries } from "../../data/lotteries";
import { results } from "../../data/results";

/* ---------------- Hero ---------------- */
function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-deep via-[#0A4A39] to-emerald-brand">
      <div className="bg-ticket-pattern absolute inset-0 opacity-[0.06]" />
      <div className="pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[28rem] w-[28rem] rounded-full bg-emerald-300/20 blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-14 px-5 pb-24 pt-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pb-28 lg:pt-24">
        {/* Left */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 py-1.5 pl-2 pr-4 backdrop-blur-sm"
          >
            <span className="flex h-6 items-center rounded-full bg-gold px-2.5 text-[10px] font-bold uppercase tracking-wider text-ink">
              Trusted
            </span>
            <span className="text-[12.5px] font-medium text-white/85">Lottery Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 font-display text-[2.65rem] font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl"
          >
            Your Chance.
            <br />
            Your Ticket.
            <br />
            <span className="text-gold">Your Moment.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 max-w-lg text-[15.5px] leading-relaxed text-white/75"
          >
            Explore available lottery draws, manage your tickets and keep track of your results — all from one simple platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Button size="lg" className="group" arrow>
              Explore Lotteries
            </Button>
            <ButtonLink to="/results" size="lg" variant="outline" className="border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/10">
              Check Results
            </ButtonLink>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-3"
          >
            {[
              { icon: ShieldCheck, label: "Secure Platform" },
              { icon: Eye, label: "Transparent Information" },
              { icon: Ticket, label: "Easy Ticket Management" },
            ].map((t) => (
              <span key={t.label} className="flex items-center gap-2 text-[13px] font-medium text-white/80">
                <t.icon className="h-4 w-4 text-gold" />
                {t.label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto hidden w-full max-w-md sm:block lg:max-w-none"
        >
          <div className="absolute inset-8 rounded-full bg-gold/15 blur-3xl" />
          <motion.img
            src="/assets/images/hero-lottery.png"
            alt="Premium lottery tickets"
            className="relative w-full drop-shadow-[0_36px_60px_rgba(0,0,0,0.35)]"
            style={{ animation: "var(--animate-float)" }}
          />
          {/* Floating mini tickets */}
          <motion.div
            style={{ animation: "var(--animate-float-slow)", animationDelay: "0.8s", "--rot": "2deg" }}
            className="absolute -left-6 top-12 hidden rounded-2xl bg-white p-3.5 shadow-lift md:block"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gold-soft">
                <Ticket className="h-4.5 w-4.5 text-gold-deep" />
              </span>
              <div>
                <p className="text-xs font-bold text-ink">HL-2026-4821</p>
                <p className="text-[10px] text-muted">Festival Special</p>
              </div>
            </div>
          </motion.div>
          <motion.div
            style={{ animation: "var(--animate-float)", animationDelay: "1.6s", "--rot": "-3deg" }}
            className="absolute -right-4 bottom-16 hidden rounded-2xl bg-white p-3.5 shadow-lift md:block"
          >
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-soft">
                <Gift className="h-4.5 w-4.5 text-emerald-deep" />
              </span>
              <div>
                <p className="text-xs font-bold text-ink">Draw Live</p>
                <p className="text-[10px] text-muted">Sun · 7:00 PM</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Wave */}
      <div className="absolute inset-x-0 bottom-0 leading-none">
        <svg viewBox="0 0 1440 60" fill="none" className="w-full">
          <path d="M0 60V28c240 24 480 24 720 0s480-24 720 0v32H0Z" fill="#F8FAF9" />
        </svg>
      </div>
    </section>
  );
}

/* ---------------- Trust bar ---------------- */
function TrustBar() {
  const items = [
    { icon: ShieldCheck, title: "Secure Account Management", text: "Protected profiles with demo-grade controls" },
    { icon: Eye, title: "Transparent Information", text: "Clear draw times, prices and prize structures" },
    { icon: Ticket, title: "Easy Ticket Tracking", text: "Every ticket organised in one dashboard" },
    { icon: Zap, title: "Fast Access", text: "Results and draws available in seconds" },
  ];
  return (
    <section className="relative border-b border-line bg-white">
      <Section className="grid grid-cols-2 divide-x divide-line lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal key={item.title} delay={i * 0.06} className="px-5 py-7 sm:px-8">
            <div className="flex items-start gap-3.5">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-soft text-emerald-brand">
                <item.icon className="h-5 w-5" />
              </span>
              <div>
                <p className="text-[13.5px] font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted">{item.text}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </Section>
    </section>
  );
}

/* ---------------- Featured lotteries ---------------- */
function FeaturedLotteries() {
  const featured = lotteries.slice(0, 4);
  return (
    <Section className="py-20 lg:py-28">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <SectionHeading
            align="left"
            eyebrow="Featured Draws"
            title="Explore Latest Lotteries"
            sub="Browse available lottery draws and explore ticket details."
          />
        </div>
        <ButtonLink to="/lotteries" variant="ghost" className="group mb-1 hidden text-emerald-deep sm:inline-flex">
          View All
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
        </ButtonLink>
      </Reveal>

      <RevealGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
        {featured.map((l, i) => (
          <RevealItem key={l.id}>
            <LotteryCard lottery={l} index={i} />
          </RevealItem>
        ))}
      </RevealGroup>

      <div className="mt-8 text-center sm:hidden">
        <ButtonLink to="/lotteries" variant="outline">
          View All Lotteries
        </ButtonLink>
      </div>
    </Section>
  );
}

/* ---------------- How it works ---------------- */
const steps = [
  { n: "01", title: "Choose a Lottery", text: "Browse weekly and special draws with clear pricing and draw schedules.", icon: Ticket },
  { n: "02", title: "Select Your Ticket", text: "Pick a draw and secure your digital ticket in seconds.", icon: Wallet },
  { n: "03", title: "Track Your Ticket", text: "Follow every ticket from purchase to draw day in your dashboard.", icon: Bell },
  { n: "04", title: "Check Results", text: "Winning numbers are published the moment each draw closes.", icon: Eye },
];

function HowItWorks() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-white py-20 lg:py-28">
      <div className="bg-ticket-pattern pointer-events-none absolute inset-0 opacity-[0.04]" />
      <Section className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Simple by design"
            title="How It Works"
            sub="From choosing a draw to checking your result — four clear steps, zero confusion."
          />
        </Reveal>

        <div className="relative mt-16">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-gold/60 via-emerald-brand/30 to-transparent lg:left-0 lg:right-0 lg:top-5 lg:h-px lg:w-auto lg:bg-gradient-to-r lg:from-gold/60 lg:via-emerald-brand/30 lg:to-transparent" />
          <RevealGroup className="grid gap-10 lg:grid-cols-4 lg:gap-6" stagger={0.1}>
            {steps.map((s) => (
              <RevealItem key={s.n} className="relative">
                <div className="flex items-start gap-5 lg:flex-col lg:gap-0">
                  <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white font-display text-[13px] font-bold text-emerald-deep shadow-[0_0_0_6px_#ffffff] ring-1 ring-gold/50 lg:mx-auto">
                    {s.n}
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
    </section>
  );
}

/* ---------------- Features ---------------- */
const features = [
  { icon: Ticket, title: "Easy Ticket Management", text: "Every digital ticket organised by draw, date and status in one clean dashboard." },
  { icon: Wallet, title: "Wallet Management", text: "Add demo funds, track every rupee and keep purchases synced with your tickets." },
  { icon: Eye, title: "Result Tracking", text: "Published results with full prize structures, linked to every ticket you hold." },
  { icon: Bell, title: "Smart Notifications", text: "Draw reminders, result alerts and prize updates — only when they matter to you." },
  { icon: ShieldCheck, title: "Secure Profile", text: "Manage your details, preferences and session from a protected profile area." },
  { icon: Zap, title: "Instant Access", text: "Tickets, results and wallet activity are available the moment you sign in." },
];

function FeatureSection() {
  return (
    <Section className="py-20 lg:py-28">
      <Reveal>
        <SectionHeading
          eyebrow="Platform Features"
          title="Everything you need, nothing you don't"
          sub="A focused toolkit that keeps your lottery journey simple from first ticket to final result."
        />
      </Reveal>
      <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" stagger={0.07}>
        {features.map((f) => (
          <RevealItem key={f.title}>
            <Card hover className="group h-full p-7">
              <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-emerald-soft text-emerald-deep transition-transform duration-300 group-hover:scale-110 group-hover:bg-emerald-brand group-hover:text-white">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-[17px] font-semibold tracking-tight text-ink">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.text}</p>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </Section>
  );
}

/* ---------------- Results preview ---------------- */
function ResultsPreview() {
  const [tab, setTab] = useState("latest");
  const filtered = results.filter((r) => (tab === "latest" ? true : r.drawType.toLowerCase().includes(tab)));

  return (
    <section className="border-t border-line bg-white py-20 lg:py-28">
      <Section>
        <Reveal className="flex flex-wrap items-end justify-between gap-5">
          <SectionHeading
            align="left"
            eyebrow="Results"
            title="Latest Results"
            sub="Recently published draws with their winning numbers and prize structures."
          />
          <div className="flex items-center gap-1 rounded-full border border-line bg-offwhite p-1">
            {["latest", "weekly", "special"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`relative rounded-full px-4 py-2 text-[13px] font-semibold capitalize transition-colors ${
                  tab === t ? "text-white" : "text-muted hover:text-ink"
                }`}
              >
                {tab === t && (
                  <motion.span layoutId="results-tab" className="absolute inset-0 rounded-full bg-emerald-brand" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{t}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.slice(0, 3).map((r, i) => (
            <Reveal key={r.id} delay={i * 0.07}>
              <Card className="flex h-full flex-col p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{r.drawType}</p>
                    <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-ink">{r.lotteryName}</h3>
                  </div>
                  <StatusDot />
                </div>
                <p className="mt-1 text-xs text-muted">{r.dateLabel}</p>

                <div className="mt-5 rounded-[14px] bg-gradient-to-br from-emerald-deep to-emerald-brand p-5 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/60">Winning Number</p>
                  <p className="mt-1.5 font-mono text-2xl font-bold tracking-[0.18em] text-gold">{r.winningNumber}</p>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <Badge tone="emerald">
                    <Check className="h-3 w-3" /> Result Published
                  </Badge>
                </div>
                <p className="mt-4 flex items-center gap-1.5 text-[13px] font-semibold text-emerald-deep">
                  View Full Result
                  <ChevronRight className="h-3.5 w-3.5" />
                </p>
              </Card>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center">
          <ButtonLink to="/results" variant="outline">
            View All Results
          </ButtonLink>
        </Reveal>
      </Section>
    </section>
  );
}

/* ---------------- Wallet preview ---------------- */
function WalletPreview() {
  const txns = [
    { title: "Ticket Purchase", sub: "Festival Special · HL-2026-4821", amount: "-₹500", negative: true },
    { title: "Wallet Credit", sub: "UPI · HDFC Bank", amount: "+₹2,000", negative: false },
    { title: "Prize Credited", sub: "Kerala Weekly · 2nd Prize", amount: "+₹1,00,000", negative: false },
  ];
  return (
    <div className="relative overflow-hidden bg-ink py-20 text-white lg:py-28">
      <div className="bg-grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -left-32 top-1/3 h-96 w-96 rounded-full bg-emerald-brand/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />

      <Section className="relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gold">One wallet, full control</p>
            <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-balance sm:text-[2.6rem] sm:leading-[1.15]">
              Everything You Need, In One Place.
            </h2>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/65">
              Your balance, your tickets and every transaction — presented like a modern financial app. This is a UI preview with
              demo data.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 rounded-[24px] border border-white/10 bg-gradient-to-br from-emerald-deep to-emerald-brand p-7 shadow-[0_24px_60px_-20px_rgba(7,91,70,0.7)]">
              <div className="flex items-center justify-between">
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60">Available Balance</p>
                <span className="flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold text-gold">
                  <Wallet className="h-3.5 w-3.5" /> Demo Wallet
                </span>
              </div>
              <p className="mt-3 font-display text-[2.6rem] font-semibold tracking-tight">
                <CountUp value={12450} prefix="₹" />
              </p>
              <div className="mt-6 flex gap-3">
                <button className="h-11 flex-1 rounded-[12px] bg-gold text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:shadow-gold">
                  + Add Money
                </button>
                <button className="h-11 flex-1 rounded-[12px] border border-white/20 bg-white/5 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10">
                  Withdraw
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.18} className="mt-6 space-y-2.5">
            {txns.map((t) => (
              <div key={t.title} className="flex items-center gap-3.5 rounded-[14px] border border-white/10 bg-white/[0.04] px-4 py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
                  {t.negative ? <Ticket className="h-4 w-4 text-gold" /> : <Wallet className="h-4 w-4 text-emerald-300" />}
                </span>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold text-white">{t.title}</p>
                  <p className="text-[11px] text-white/50">{t.sub}</p>
                </div>
                <span className={`text-sm font-semibold ${t.negative ? "text-white/60" : "text-emerald-300"}`}>{t.amount}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal delay={0.15} className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-6 rounded-[32px] bg-gold/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[26px] border border-white/10 bg-white shadow-2xl">
            <img src="/assets/images/dashboard-wallet.png" alt="Wallet app preview" className="w-full" loading="lazy" />
          </div>
        </Reveal>
      </Section>
    </div>
  );
}

/* ---------------- Stats strip ---------------- */
function StatsStrip() {
  const stats = [
    { value: 42, suffix: "K+", label: "Tickets issued" },
    { value: 128, suffix: "K+", label: "Registered players" },
    { value: 312, suffix: "+", label: "Draws published" },
    { value: 99, suffix: ".2%", label: "Platform uptime" },
  ];
  return (
    <section className="border-b border-line bg-white">
      <Section className="grid grid-cols-2 divide-line lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.07} className="px-6 py-10 text-center">
            <p className="font-display text-3xl font-semibold tracking-tight text-emerald-deep sm:text-4xl">
              <CountUpRaw value={s.value} />
              <span className="text-gold">{s.suffix}</span>
            </p>
            <p className="mt-2 text-[13px] font-medium text-muted">{s.label}</p>
          </Reveal>
        ))}
      </Section>
    </section>
  );
}

/* ---------------- CTA ---------------- */
function CtaBand() {
  return (
    <Section className="py-20 lg:py-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[26px] bg-gradient-to-br from-emerald-deep to-emerald-brand px-7 py-14 text-center sm:px-14">
          <div className="bg-ticket-pattern pointer-events-none absolute inset-0 opacity-10" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Ready to play smart?
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/70">
              Create your free account, explore the draws and keep every ticket in one beautifully simple place.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" className="bg-gold text-ink hover:bg-[#f0aa2a]" arrow>
                Create Free Account
              </Button>
              <ButtonLink to="/lotteries" size="lg" variant="outline" className="border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-white/50 hover:bg-white/10">
                Explore Lotteries
              </ButtonLink>
            </div>
            <p className="mt-6 text-xs text-white/50">Free to join · No payment required to register</p>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <FeaturedLotteries />
      <HowItWorks />
      <FeatureSection />
      <ResultsPreview />
      <WalletPreview />
      <StatsStrip />
      <CtaBand />
    </>
  );
}
