import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Funnel } from "lucide-react";
import { Section, SectionHeading } from "../../components/common/ui";
import { Reveal } from "../../components/common/Reveal";
import { LotteryCardSkeleton } from "../../components/common/Feedback";
import { LotteryCard } from "../../components/lottery/LotteryCard";
import { lotteries } from "../../data/lotteries";

const tabs = [
  { id: "all", label: "All Draws" },
  { id: "weekly", label: "Weekly Draws" },
  { id: "special", label: "Special Draws" },
];

export default function Lotteries() {
  const [params, setParams] = useSearchParams();
  const category = params.get("category") || "all";
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("popular");

  useMemo(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const filtered = useMemo(() => {
    let list = category === "all" ? [...lotteries] : lotteries.filter((l) => l.category === category);
    if (sort === "price-low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-high") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [category, sort]);

  return (
    <div className="pb-24">
      {/* Page header */}
      <section className="relative overflow-hidden border-b border-line bg-white">
        <div className="bg-ticket-pattern pointer-events-none absolute inset-0 opacity-[0.05]" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-emerald-brand/10 blur-3xl" />
        <Section className="relative py-14 lg:py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-emerald-brand">Browse Draws</p>
            <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-ink sm:text-5xl">All Lotteries</h1>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              Explore every available draw — weekly, monthly and festival editions — with transparent pricing and draw
              schedules.
            </p>
          </motion.div>
        </Section>
      </section>

      <Section className="pt-10">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-1 rounded-full border border-line bg-white p-1">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setParams(t.id === "all" ? {} : { category: t.id });
                  setLoading(true);
                }}
                className={`relative rounded-full px-4 py-2 text-[13px] font-semibold transition-colors ${
                  category === t.id ? "text-white" : "text-muted hover:text-ink"
                }`}
              >
                {category === t.id && (
                  <motion.span layoutId="lottery-tab" className="absolute inset-0 rounded-full bg-emerald-brand" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                <span className="relative">{t.label}</span>
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <Funnel className="h-4 w-4" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-lg border-0 bg-transparent text-sm font-medium text-ink outline-none"
            >
              <option value="popular">Most popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {loading
            ? [1, 2, 3].map((i) => <LotteryCardSkeleton key={i} />)
            : filtered.map((l, i) => <LotteryCard key={l.id} lottery={l} index={i} />)}
        </div>

        {!loading && filtered.length === 0 && (
          <Reveal className="py-20 text-center">
            <p className="font-display text-lg font-semibold text-ink">No draws in this category yet</p>
            <p className="mt-1 text-sm text-muted">Check back soon for new announcements.</p>
          </Reveal>
        )}
      </Section>
    </div>
  );
}
