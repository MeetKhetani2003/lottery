import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CalendarDays, Check, Info, Trophy } from "lucide-react";
import { Badge, Card } from "../../components/common/ui";
import { Reveal, RevealGroup, RevealItem } from "../../components/common/Reveal";
import { EmptyState } from "../../components/common/Feedback";
import { getResultById } from "../../data/results";

export default function ResultDetail() {
  const { id } = useParams();
  const result = getResultById(id);

  if (!result) {
    return (
      <Section className="py-20">
        <EmptyState
          title="Result not found"
          message="This result may have been archived or the link is incorrect."
          action={
            <Link to="/results" className="inline-flex h-11 items-center rounded-[12px] bg-emerald-brand px-5 text-sm font-medium text-white">
              Back to Results
            </Link>
          }
        />
      </Section>
    );
  }

  return (
    <div className="pb-24">
      <section className="border-b border-line bg-white">
        <Section className="py-12 lg:py-16">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to="/results" className="inline-flex items-center gap-1.5 text-[13px] font-medium text-muted transition-colors hover:text-emerald-deep">
              <ArrowLeft className="h-3.5 w-3.5" /> All Results
            </Link>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <Badge tone={result.drawType === "Special Draw" ? "gold" : "emerald"}>{result.drawType}</Badge>
              <Badge tone="emerald">Result Published</Badge>
            </div>
            <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">{result.lotteryName}</h1>
            <p className="mt-3 flex items-center gap-1.5 text-sm text-muted">
              <CalendarDays className="h-4 w-4" /> Draw date: {result.dateLabel}
            </p>
          </motion.div>
        </Section>
      </section>

      <Section className="grid gap-10 pt-12 lg:grid-cols-[0.85fr_1.15fr]">
        <div>
          <Reveal>
            <Card className="overflow-hidden">
              <div className="bg-gradient-to-br from-emerald-deep to-emerald-brand p-8 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                  <Trophy className="h-7 w-7 text-gold" />
                </div>
                <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/60">Winning Number</p>
                <p className="mt-2 font-mono text-4xl font-bold tracking-[0.18em] text-gold">{result.winningNumber}</p>
              </div>
              <div className="space-y-0 p-6">
                <p className="flex items-center justify-between border-b border-line py-3 text-sm">
                  <span className="text-muted">Lottery</span>
                  <span className="font-semibold text-ink">{result.lotteryName}</span>
                </p>
                <p className="flex items-center justify-between border-b border-line py-3 text-sm">
                  <span className="text-muted">Draw Type</span>
                  <span className="font-semibold text-ink">{result.drawType}</span>
                </p>
                <p className="flex items-center justify-between border-b border-line py-3 text-sm">
                  <span className="text-muted">Draw Date</span>
                  <span className="font-semibold text-ink">{result.dateLabel}</span>
                </p>
                <p className="flex items-center justify-between py-3 text-sm">
                  <span className="text-muted">Result Status</span>
                  <span className="font-semibold text-success">Published</span>
                </p>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.1} className="mt-5">
            <div className="flex items-start gap-3 rounded-[16px] border border-gold/30 bg-gold-soft/40 p-4">
              <Info className="mt-0.5 h-4.5 w-4.5 shrink-0 text-gold-deep" />
              <p className="text-xs leading-relaxed text-ink/70">
                Demo result data. Winning numbers shown here are illustrative and not connected to any real lottery draw.
              </p>
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">Prize Structure</h2>
            <p className="mt-2 text-sm text-muted">Published in advance of every draw. Demo figures shown below.</p>
          </Reveal>
          <RevealGroup className="mt-7 space-y-3" stagger={0.07}>
            {result.prizeStructure.map((p, i) => (
              <RevealItem key={p.rank}>
                <Card className="flex items-center gap-4 p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gold-soft/60 font-display text-sm font-bold text-gold-deep">
                    {i + 1}
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-ink">{p.rank}</p>
                    <p className="text-xs text-muted">{p.match} · {p.winners} winner{p.winners > 1 ? "s" : ""}</p>
                  </div>
                  <p className="font-display text-lg font-semibold text-emerald-deep">{p.amount}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-8">
            <Card className="p-6">
              <h3 className="font-display text-base font-semibold text-ink">Important Information</h3>
              <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted">
                <li className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-brand" />
                  Results are published on this platform immediately after each draw closes.
                </li>
                <li className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-brand" />
                  Prize structures are fixed before tickets go on sale and do not change mid-cycle.
                </li>
                <li className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-brand" />
                  Winning numbers can be verified against your ticket number in your dashboard.
                </li>
                <li className="flex gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-brand" />
                  Demo environment — no real prizes or payouts are associated with these figures.
                </li>
              </ul>
            </Card>
          </Reveal>
        </div>
      </Section>
    </div>
  );
}
