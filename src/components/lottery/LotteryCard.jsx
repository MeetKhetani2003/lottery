import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calendar, ChevronRight, Users } from "lucide-react";
import { Badge } from "../common/ui";
import { cn } from "../../utils/cn";

export function LotteryCard({ lottery, index = 0 }) {
  const soldPct = Math.round((lottery.ticketsSold / lottery.ticketsTotal) * 100);
  const closed = lottery.status === "closed";

  return (
    <motion.article
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group relative flex flex-col overflow-hidden rounded-[20px] border border-line bg-white shadow-card transition-shadow duration-300 hover:shadow-lift"
    >
      <Link to={`/lotteries/${lottery.id}`} className="relative block overflow-hidden">
        <div className="relative h-44 overflow-hidden sm:h-48">
          <img
            src={lottery.image}
            alt={`${lottery.name} artwork`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent" />
          <div className="absolute left-4 top-4">
            <Badge tone={closed ? "neutral" : lottery.colorway === "gold-emerald" ? "gold" : "emerald"}>
              {closed ? "Closed" : "Open"}
            </Badge>
          </div>
          <div className="absolute bottom-4 right-4 rounded-xl bg-white/95 px-3 py-1.5 shadow-card backdrop-blur">
            <span className="font-display text-sm font-semibold text-ink">{lottery.priceLabel || `₹${lottery.price}`}</span>
            <span className="text-[11px] text-muted"> / ticket</span>
          </div>
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted">{lottery.type}</p>
            <h3 className="mt-1 font-display text-lg font-semibold tracking-tight text-ink">{lottery.name}</h3>
          </div>
          <span
            className="mt-1 h-3 w-3 shrink-0 rounded-full ring-2 ring-white"
            style={{ backgroundColor: lottery.accent }}
            title="Draw identity colour"
          />
        </div>

        <div className="mt-4 space-y-2 text-[13px] text-muted">
          <p className="flex items-center gap-2">
            <Calendar className="h-3.5 w-3.5 text-emerald-brand" />
            {lottery.drawDay}, {lottery.drawTime}
          </p>
          <p className="flex items-center gap-2">
            <Users className="h-3.5 w-3.5 text-emerald-brand" />
            {lottery.ticketsSold.toLocaleString("en-IN")} of {lottery.ticketsTotal.toLocaleString("en-IN")} tickets claimed
          </p>
        </div>

        <div className="mt-4">
          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
            <div
              className={cn("h-full rounded-full transition-all duration-700", lottery.colorway === "gold-emerald" ? "bg-gold" : "bg-emerald-brand")}
              style={{ width: `${soldPct}%` }}
            />
          </div>
          <p className="mt-1.5 text-right text-[11px] font-medium text-muted">{soldPct}% claimed</p>
        </div>

        <Link
          to={`/lotteries/${lottery.id}`}
          className="group/cta mt-5 inline-flex items-center justify-between rounded-[12px] bg-offwhite px-4 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-emerald-soft"
        >
          View Lottery
          <ChevronRight className="h-4 w-4 text-emerald-brand transition-transform duration-200 group-hover/cta:translate-x-1.5" />
        </Link>
      </div>
    </motion.article>
  );
}
