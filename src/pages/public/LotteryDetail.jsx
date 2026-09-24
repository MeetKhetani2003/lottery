import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Check, ChevronRight, Clock, IndianRupee, Ticket, Users } from "lucide-react";
import { Badge, Button, ButtonLink, Card, Section } from "../../components/common/ui";
import { Reveal, RevealGroup, RevealItem } from "../../components/common/Reveal";
import { useToast } from "../../context/ToastContext";
import { getLotteryById, lotteries } from "../../data/lotteries";
import { LotteryCard } from "../../components/lottery/LotteryCard";
import { EmptyState } from "../../components/common/Feedback";

export default function LotteryDetail() {
  const { id } = useParams();
  const { push } = useToast();
  const lottery = getLotteryById(id);

  if (!lottery) {
    return (
      <Section className="py-20">
        <EmptyState
          title="Draw not found"
          message="This lottery draw may have been archived or the link is incorrect."
          action={
            <ButtonLink to="/lotteries" variant="outline">
              Browse All Lotteries
            </ButtonLink>
          }
        />
      </Section>
    );
  }

  const soldPct = Math.round((lottery.ticketsSold / lottery.ticketsTotal) * 100);

  return (
    <div className="pb-24">
      {/* Hero band */}
      <section className="relative overflow-hidden border-b border-line bg-white">
        <div className="bg-ticket-pattern pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="pointer-events-none absolute -left-24 top-0 h-80 w-80 rounded-full bg-gold/10 blur-3xl" />
        <Section className="relative grid gap-10 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: 22, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-sm"
          >
            <div className="absolute -inset-4 rounded-[28px] bg-gold/15 blur-2xl" />
            <img src={lottery.image} alt={`${lottery.name} artwork`} className="relative w-full drop-shadow-[0_24px_48px_rgba(15,23,32,0.16)]" />
          </motion.div>

          <div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
              <Link to="/lotteries" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors hover:text-emerald-deep">
                <ArrowLeft className="h-3.5 w-3.5" /> All Lotteries
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.16 }} className="mt-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge tone={lottery.colorway === "gold-emerald" ? "gold" : "emerald"}>{lottery.type}</Badge>
                {lottery.status === "open" ? (
                  <Badge tone="emerald">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-brand" /> Registrations Open
                  </Badge>
                ) : (
                  <Badge tone="neutral">Registrations Closed</Badge>
                )}
              </div>
              <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{lottery.name}</h1>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-muted">{lottery.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4"
            >
              {[
                { icon: IndianRupee, label: "Ticket Price", value: `₹${lottery.price}` },
                { icon: Calendar, label: "Next Draw", value: lottery.drawDay },
                { icon: Clock, label: "Draw Time", value: lottery.drawTime },
                { icon: Users, label: "Claimed", value: `${soldPct}%` },
              ].map((s) => (
                <div key={s.label} className="rounded-[16px] border border-line bg-offwhite px-4 py-3.5">
                  <s.icon className="h-4 w-4 text-emerald-brand" />
                  <p className="mt-2 text-[11px] font-medium uppercase tracking-wider text-muted">{s.label}</p>
                  <p className="mt-0.5 text-sm font-semibold text-ink">{s.value}</p>
                </div>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.32 }} className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                size="lg"
                className="group"
                onClick={() => push("Ticket purchase is a demo action — no real purchase is made.", "info")}
              >
                <Ticket className="h-4.5 w-4.5" />
                Buy Ticket · ₹{lottery.price}
              </Button>
              <ButtonLink to="/results" size="lg" variant="outline">
                View Results
              </ButtonLink>
            </motion.div>
          </div>
        </Section>
      </section>

      <Section className="grid gap-12 pt-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">Prize Structure</h2>
            <p className="mt-2 text-sm text-muted">Every draw publishes a clear, fixed prize structure before tickets go on sale.</p>
          </Reveal>
          <RevealGroup className="mt-7 space-y-3" stagger={0.07}>
            {lottery.prizes.map((p, i) => (
              <RevealItem key={p.rank}>
                <div className="group flex items-center gap-4 rounded-[16px] border border-line bg-white px-5 py-4 shadow-card transition-all hover:border-emerald-brand/30">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-soft font-display text-sm font-bold text-emerald-deep">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink">{p.rank}</p>
                    <p className="text-xs text-muted">{p.winners} winner{p.winners > 1 ? "s" : ""}</p>
                  </div>
                  <p className="font-display text-lg font-semibold text-emerald-deep">{p.amount}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-12">
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">How This Draw Works</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {[
                { t: "Pick your draw", d: "Choose this lottery and secure a digital ticket." },
                { t: "Draw day arrives", d: `The draw happens ${lottery.drawDay} at ${lottery.drawTime}.` },
                { t: "Results publish", d: "The winning number is published instantly on our results page." },
              ].map((s, i) => (
                <div key={s.t} className="rounded-[16px] border border-line bg-white p-5 shadow-card">
                  <span className="font-display text-sm font-bold text-gold-deep">0{i + 1}</span>
                  <p className="mt-2 text-sm font-semibold text-ink">{s.t}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">{s.d}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <Card className="p-7">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-ink">Draw Availability</h3>
                <Badge tone={lottery.status === "open" ? "emerald" : "neutral"}>
                  {lottery.status === "open" ? "Open" : "Closed"}
                </Badge>
              </div>
              <div className="mt-6">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-medium text-muted">Tickets claimed</span>
                  <span className="font-semibold text-ink">
                    {lottery.ticketsSold.toLocaleString("en-IN")} / {lottery.ticketsTotal.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${lottery.colorway === "gold-emerald" ? "bg-gold" : "bg-emerald-brand"}`} style={{ width: `${soldPct}%` }} />
                </div>
              </div>
              <div className="mt-7 space-y-3 border-t border-line pt-6 text-sm">
                <p className="flex items-center justify-between">
                  <span className="text-muted">Category</span>
                  <span className="font-medium text-ink">{lottery.type}</span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-muted">Draw schedule</span>
                  <span className="font-medium text-ink">
                    {lottery.drawDay}, {lottery.drawTime}
                  </span>
                </p>
                <p className="flex items-center justify-between">
                  <span className="text-muted">Result publication</span>
                  <span className="font-medium text-ink">Instant, on this platform</span>
                </p>
              </div>
              <Button
                className="mt-7 w-full"
                onClick={() => push("Ticket purchase is a demo action — no real purchase is made.", "info")}
              >
                Buy Ticket · ₹{lottery.price}
              </Button>
              <p className="mt-3 text-center text-[11px] text-muted">Demo prototype — no real lottery purchases</p>
            </Card>
          </Reveal>

          <Reveal delay={0.1} className="mt-6">
            <h3 className="font-display text-base font-semibold text-ink">Other draws you may like</h3>
            <div className="mt-4 space-y-4">
              {lotteries
                .filter((l) => l.id !== lottery.id)
                .slice(0, 2)
                .map((l) => (
                  <Link
                    key={l.id}
                    to={`/lotteries/${l.id}`}
                    className="group flex items-center gap-4 rounded-[16px] border border-line bg-white p-3.5 shadow-card transition-all hover:border-emerald-brand/30"
                  >
                    <img src={l.image} alt="" className="h-16 w-16 rounded-xl object-cover" loading="lazy" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-ink group-hover:text-emerald-deep">{l.name}</p>
                      <p className="mt-0.5 text-xs text-muted">{l.type} · {l.drawDay}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-ink">₹{l.price}</p>
                      <ChevronRight className="ml-auto h-4 w-4 text-emerald-brand transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                ))}
            </div>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
