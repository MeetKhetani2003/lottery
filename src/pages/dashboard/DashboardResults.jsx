import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, Trophy } from "lucide-react";
import { Card, Badge, SectionHeading } from "../../components/common/ui";
import { Reveal } from "../../components/common/Reveal";
import { results } from "../../data/results";
import { tickets } from "../../data/tickets";
import { formatDate } from "../../utils/cn";

export default function DashboardResults() {
  return (
    <div className="space-y-6">
      <Reveal>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Results</h1>
          <p className="mt-1 text-sm text-muted">Published draws and how your tickets performed.</p>
        </div>
      </Reveal>

      {/* Your performance */}
      <Reveal>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-semibold tracking-tight text-ink">Your Performance</h3>
            <Badge tone="emerald">
              <CheckCircle2 className="h-3 w-3" /> 2 Results Tracked
            </Badge>
          </div>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {tickets.filter((t) => t.status === "completed" || t.status === "result").map((t) => (
              <div key={t.id} className="rounded-2xl border border-line bg-offwhite p-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-ink">{t.lotteryName}</p>
                  <Badge tone={t.result === "No Win" ? "neutral" : "gold"}>{t.result}</Badge>
                </div>
                <p className="mt-1.5 text-xs text-muted">Ticket {t.id} · Drawn {formatDate(t.drawIso)}</p>
                <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[13px]">
                  <span className="text-muted">Ticket price</span>
                  <span className="font-semibold text-ink">₹{t.price}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>

      {/* Latest results */}
      <Reveal>
        <div>
          <SectionHeading align="left" eyebrow="Published" title="Latest Results" />
        </div>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {results.map((r, i) => (
          <Reveal key={r.id} delay={i * 0.06}>
            <Link to={`/results/${r.id}`}>
              <motion.div whileHover={{ y: -4 }} className="group">
                <Card className="flex h-full items-center gap-5 p-5 transition-all hover:border-emerald-brand/30 hover:shadow-lift">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-deep to-emerald-brand text-gold">
                    <Trophy className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink group-hover:text-emerald-deep">{r.lotteryName}</p>
                    <p className="text-xs text-muted">{r.drawType} · {r.dateLabel}</p>
                    <p className="mt-1 font-mono text-sm font-bold tracking-[0.16em] text-emerald-deep">{r.winningNumber}</p>
                  </div>
                  <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-emerald-deep">
                    Details <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Card>
              </motion.div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
