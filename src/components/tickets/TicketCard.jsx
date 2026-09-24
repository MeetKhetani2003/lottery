import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { ticketStatusMeta } from "../../data/tickets";
import { cn } from "../../utils/cn";

export function TicketCard({ ticket, index = 0 }) {
  const meta = ticketStatusMeta[ticket.status];
  const gold = ticket.colorway === "gold-emerald";

  return (
    <motion.article
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-[20px] bg-white shadow-card ring-1 ring-line transition-shadow duration-300 hover:shadow-lift"
    >
      {/* Top strip */}
      <div className={cn("relative flex items-center justify-between px-5 py-3.5", gold ? "bg-gradient-to-r from-gold-deep to-gold" : "bg-gradient-to-r from-emerald-deep to-emerald-brand")}>
        <div className="flex items-center gap-2.5">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/15">
            <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2.5 2.5 0 0 0 0 5v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2.5 2.5 0 0 0 0-5Z" />
            </svg>
          </span>
          <div className="leading-tight">
            <p className={cn("text-[13px] font-bold tracking-wide", gold ? "text-ink" : "text-white")}>HOWLADAR</p>
            <p className={cn("text-[9px] font-semibold uppercase tracking-[0.2em]", gold ? "text-ink/60" : "text-white/70")}>Lucky Ticket</p>
          </div>
        </div>
        <span className={cn("rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider ring-1", meta.classes)}>
          {meta.label}
        </span>
      </div>

      {/* Body */}
      <div className="px-5 py-4">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-lg font-semibold tracking-tight text-ink">{ticket.lotteryName}</h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted">
              <CalendarDays className="h-3.5 w-3.5" /> Draw · {ticket.drawDate}
            </p>
          </div>
          <div className="text-right">
            <p className="font-display text-xl font-semibold text-ink">₹{ticket.price}</p>
            <p className="text-[10px] font-medium uppercase tracking-wider text-muted">Ticket</p>
          </div>
        </div>

        <div className="dotted-divider my-4" />

        <div className="flex items-center justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">Ticket No.</p>
            <p className="mt-0.5 font-mono text-sm font-semibold tracking-wider text-ink">{ticket.id}</p>
          </div>
          <Link
            to="/dashboard/tickets"
            className="inline-flex items-center gap-1.5 rounded-[10px] bg-emerald-soft px-3.5 py-2 text-[13px] font-semibold text-emerald-deep transition-all hover:bg-emerald-brand hover:text-white"
          >
            View Details
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>

      {/* Decorative watermark */}
      <span className={cn("pointer-events-none absolute -bottom-6 -right-4 font-display text-[92px] font-bold leading-none opacity-[0.05]", gold ? "text-gold-deep" : "text-emerald-deep")}>
        ₹
      </span>
    </motion.article>
  );
}
