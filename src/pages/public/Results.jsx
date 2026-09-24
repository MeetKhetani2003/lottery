import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarDays, Check, ChevronRight, Search, Trophy } from "lucide-react";
import { Section, SectionHeading, Badge } from "../../components/common/ui";
import { Reveal } from "../../components/common/Reveal";
import { results } from "../../data/results";
import { formatDate } from "../../utils/cn";

const filters = ["All", "Weekly Draw", "Special Draw"];

export default function Results() {
  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return results.filter((r) => {
      const matchType = active === "All" || r.drawType === active;
      const matchQuery = !query || r.lotteryName.toLowerCase().includes(query.toLowerCase());
      return matchType && matchQuery;
    });
  }, [active, query]);

  return (
    <div className="pb-24">
      <section className="border-b border-line bg-white">
        <Section className="py-14 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-emerald-brand">Results Hub</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">Lottery Results</h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              Every published draw, with its winning number and complete prize structure — updated the moment each draw closes.
            </p>
          </motion.div>
        </Section>
      </section>

      <Section className="pt-10">
        {/* Toolbar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActive(f)}
                className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-all ${
                  active === f
                    ? "border-emerald-brand bg-emerald-brand text-white shadow-[0_6px_16px_-8px_rgba(11,122,90,0.6)]"
                    : "border-line bg-white text-muted hover:border-emerald-brand/40 hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search lottery…"
              className="h-11 w-full rounded-[12px] border border-line bg-white pl-10 pr-4 text-sm outline-none transition-colors focus:border-emerald-brand focus:ring-2 focus:ring-emerald-brand/15 sm:w-64"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {filtered.map((r, i) => (
            <Reveal key={r.id} delay={(i % 2) * 0.08}>
              <Link to={`/results/${r.id}`} className="group block">
                <div className="flex h-full flex-col rounded-[20px] border border-line bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-emerald-brand/30 hover:shadow-lift">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <Badge tone={r.drawType === "Special Draw" ? "gold" : "emerald"}>{r.drawType}</Badge>
                      </div>
                      <h3 className="mt-3 font-display text-xl font-semibold tracking-tight text-ink group-hover:text-emerald-deep">
                        {r.lotteryName}
                      </h3>
                      <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                        <CalendarDays className="h-3.5 w-3.5" /> {r.dateLabel}
                      </p>
                    </div>
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gold-soft/60 text-gold-deep">
                      <Trophy className="h-5 w-5" />
                    </span>
                  </div>

                  <div className="mt-6 rounded-[16px] bg-gradient-to-br from-emerald-deep to-emerald-brand p-5 text-center">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">Winning Number</p>
                    <p className="mt-1.5 font-mono text-2xl font-bold tracking-[0.2em] text-gold">{r.winningNumber}</p>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                    <span className="flex items-center gap-1.5 text-[12px] font-semibold text-success">
                      <Check className="h-3.5 w-3.5" /> Result Published
                    </span>
                    <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-emerald-deep">
                      View Full Result
                      <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center">
            <p className="font-display text-lg font-semibold text-ink">No results found</p>
            <p className="mt-1 text-sm text-muted">Try a different search or filter.</p>
          </div>
        )}
      </Section>
    </div>
  );
}
