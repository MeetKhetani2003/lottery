import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Ticket } from "lucide-react";
import { Card, Avatar } from "../common/ui";
import { CountUp, CountUpRaw } from "../common/CountUp";
import { cn } from "../../utils/cn";

export function StatCard({ label, value, prefix, suffix, delta, icon: Icon, delay = 0, decimals = 0 }) {
  const positive = delta >= 0;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card className="group p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lift sm:p-6">
        <div className="flex items-center justify-between">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-soft text-emerald-deep transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-5 w-5" />
          </span>
          {delta !== undefined && (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-1 text-[11px] font-bold",
                positive ? "bg-emerald-soft text-emerald-deep" : "bg-red-50 text-danger"
              )}
            >
              {positive ? "+" : ""}
              {delta}%
            </span>
          )}
        </div>
        <p className="mt-4 font-display text-[1.7rem] font-semibold tracking-tight text-ink">
          {prefix ? <CountUp value={value} prefix={prefix} duration={1400} /> : <CountUpRaw value={value} duration={1400} />}
          {suffix && <span className="text-gold">{suffix}</span>}
        </p>
        <p className="mt-1 text-[13px] font-medium text-muted">{label}</p>
      </Card>
    </motion.div>
  );
}

export function DashboardHeroCard({ activeTickets = 3 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden rounded-[22px] bg-gradient-to-br from-emerald-deep via-[#0A4A39] to-emerald-brand p-7 text-white sm:p-8"
    >
      <div className="bg-grid-lines pointer-events-none absolute inset-0 opacity-60" />
      <div className="pointer-events-none absolute -right-10 -top-16 h-56 w-56 rounded-full bg-gold/20 blur-3xl" />
      {/* Floating ticket graphic */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-4, -1, -4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute -right-6 top-8 hidden opacity-90 md:block"
      >
        <div className="flex h-24 w-40 -rotate-6 items-center justify-center rounded-2xl border border-gold/40 bg-white/10 backdrop-blur-sm">
          <Ticket className="h-10 w-10 text-gold" />
        </div>
      </motion.div>
      <div className="relative">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-gold">Your Tickets</p>
        <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight sm:text-[1.7rem]">
          Your tickets are ready.
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-relaxed text-white/70">
          You have <span className="font-bold text-gold">{activeTickets} active tickets</span> across upcoming draws. Track them and
          check results from one place.
        </p>
        <Link
          to="/dashboard/tickets"
          className="group mt-6 inline-flex items-center gap-2 rounded-[12px] bg-gold px-5 py-3 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:shadow-gold"
        >
          View Tickets
          <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
        </Link>
      </div>
    </motion.div>
  );
}

export function ActivityList({ items, compact = false, onSeeAll }) {
  return (
    <Card className={cn("p-6", compact && "p-5")}>
      <div className="flex items-center justify-between">
        <h3 className="font-display text-base font-semibold tracking-tight text-ink">{items.title}</h3>
        {onSeeAll && (
          <Link to={items.link} className="text-[13px] font-semibold text-emerald-deep hover:underline">
            See all →
          </Link>
        )}
      </div>
      <div className="mt-4 space-y-1">
        {items.rows.map((row) => (
          <div key={row.id} className="flex items-center gap-3.5 rounded-xl px-2 py-3 transition-colors hover:bg-offwhite">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-soft text-emerald-deep">
              {row.icon}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-semibold text-ink">{row.title}</p>
              <p className="truncate text-xs text-muted">{row.sub}</p>
            </div>
            <div className="text-right">
              <p className={cn("text-[13px] font-semibold", row.amount >= 0 ? "text-success" : "text-ink")}>
                {row.amount >= 0 ? "+" : "−"}₹{Math.abs(row.amount).toLocaleString("en-IN")}
              </p>
              <p className="text-[11px] text-muted">{row.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

export function ProfileSummary({ name, email, memberSince }) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-4">
        <Avatar name={name} size="lg" />
        <div className="min-w-0">
          <p className="truncate font-display text-base font-semibold text-ink">{name}</p>
          <p className="truncate text-xs text-muted">{email}</p>
          <p className="mt-1 text-[11px] font-medium text-muted">Member since {memberSince}</p>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-3 divide-x divide-line rounded-xl bg-offwhite py-3 text-center">
        <div>
          <p className="font-display text-sm font-semibold text-ink">12</p>
          <p className="text-[10px] font-medium text-muted">Draws played</p>
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-ink">5</p>
          <p className="text-[10px] font-medium text-muted">Wins</p>
        </div>
        <div>
          <p className="font-display text-sm font-semibold text-ink">₹1.1L</p>
          <p className="text-[10px] font-medium text-muted">Total won</p>
        </div>
      </div>
    </Card>
  );
}
