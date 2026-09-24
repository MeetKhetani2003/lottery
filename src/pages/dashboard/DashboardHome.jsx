import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Plus, Receipt, Star, Ticket, Wallet } from "lucide-react";
import { Button, ButtonLink, Card, Badge } from "../../components/common/ui";
import { CountUp, CountUpRaw } from "../../components/common/CountUp";
import { Reveal } from "../../components/common/Reveal";
import { StatCard, DashboardHeroCard, ActivityList, ProfileSummary } from "../../components/dashboard/DashboardWidgets";
import { tickets } from "../../data/tickets";
import { transactions } from "../../data/transactions";
import { results } from "../../data/results";
import { useAuth } from "../../context/AuthContext";

export default function DashboardHome() {
  const { user } = useAuth();
  const activeTickets = tickets.filter((t) => t.status === "active").length;

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[13px] font-medium text-muted">
              {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })}
            </p>
            <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight text-ink sm:text-[1.7rem]">
              Good morning, {user?.name?.split(" ")[0] || "there"} 
            </h1>
            <p className="mt-1 text-sm text-muted">Here's what's happening with your account.</p>
          </div>
          <ButtonLink to="/lotteries" size="sm" className="group" arrow>
            Browse Draws
          </ButtonLink>
        </div>
      </Reveal>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard label="Wallet Balance" value={12450} prefix="₹" delta={12.4} icon={Wallet} delay={0} />
        <StatCard label="Active Tickets" value={activeTickets} suffix="" delta={8.2} icon={Ticket} delay={0.06} />
        <StatCard label="Completed Draws" value={2} delta={0} icon={CheckCircle2} delay={0.12} />
        <StatCard label="Total Purchases" value={20} delta={15.7} icon={Receipt} delay={0.18} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-6">
          <DashboardHeroCard activeTickets={activeTickets} />

          {/* Recent tickets */}
          <Reveal>
            <Card className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-display text-base font-semibold tracking-tight text-ink">Recent Tickets</h3>
                <Link to="/dashboard/tickets" className="text-[13px] font-semibold text-emerald-deep hover:underline">
                  View all →
                </Link>
              </div>
              <div className="mt-4 space-y-3">
                {tickets.slice(0, 3).map((t, i) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.08 }}
                    className="flex items-center gap-4 rounded-2xl border border-line bg-offwhite p-4"
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.colorway === "gold-emerald" ? "bg-gold-soft text-gold-deep" : "bg-emerald-soft text-emerald-deep"}`}>
                      <Ticket className="h-5 w-5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-ink">{t.lotteryName}</p>
                      <p className="text-xs text-muted">{t.id} · Draw {t.drawDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-ink">₹{t.price}</p>
                      <Badge tone={t.status === "active" ? "emerald" : "neutral"} className="mt-1">
                        {t.status === "active" ? "Active" : t.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </Reveal>

          {/* Recent transactions */}
          <ActivityList
            title="Recent Transactions"
            link="/dashboard/transactions"
            rows={transactions.slice(0, 4).map((t) => ({
              id: t.id,
              title: t.title,
              sub: t.subtitle,
              amount: t.amount,
              meta: t.date,
              icon: <Receipt className="h-4 w-4" />,
            }))}
          />
        </div>

        <div className="space-y-6">
          <ProfileSummary name={user?.name || "Arjun Krishna"} email={user?.email || "arjun.krishna@example.com"} memberSince="January 2026" />

          {/* Quick actions */}
          <Reveal delay={0.1}>
            <Card className="p-6">
              <h3 className="font-display text-base font-semibold tracking-tight text-ink">Quick Actions</h3>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Link to="/lotteries" className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-offwhite p-4 text-center transition-all hover:-translate-y-0.5 hover:border-emerald-brand/30 hover:bg-emerald-soft/50">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-brand text-white">
                    <Ticket className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold text-ink">Buy Ticket</span>
                </Link>
                <Link to="/dashboard/wallet" className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-offwhite p-4 text-center transition-all hover:-translate-y-0.5 hover:border-emerald-brand/30 hover:bg-emerald-soft/50">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold text-ink">
                    <Plus className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold text-ink">Add Money</span>
                </Link>
                <Link to="/results" className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-offwhite p-4 text-center transition-all hover:-translate-y-0.5 hover:border-emerald-brand/30 hover:bg-emerald-soft/50">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-soft text-emerald-deep">
                    <Star className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-semibold text-ink">Check Results</span>
                </Link>
                <Link to="/dashboard/transactions" className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-offwhite p-4 text-center transition-all hover:-translate-y-0.5 hover:border-emerald-brand/30 hover:bg-emerald-soft/50">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-soft text-emerald-deep">
                    <Receipt className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-xs font-semibold text-ink">Statements</span>
                </Link>
              </div>
            </Card>
          </Reveal>

          {/* Latest result */}
          <Reveal delay={0.15}>
            <Link to="/results" className="group block">
              <Card className="overflow-hidden transition-all hover:-translate-y-1 hover:shadow-lift">
                <div className="bg-gradient-to-br from-emerald-deep to-emerald-brand p-6 text-center">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">Latest Result</p>
                  <p className="mt-1.5 font-mono text-xl font-bold tracking-[0.18em] text-gold">{results[0].winningNumber}</p>
                  <p className="mt-2 text-xs font-medium text-white/70">{results[0].lotteryName}</p>
                </div>
                <div className="flex items-center justify-between px-5 py-4">
                  <span className="flex items-center gap-1.5 text-[12px] font-semibold text-success">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Published
                  </span>
                  <span className="inline-flex items-center gap-1 text-[13px] font-semibold text-emerald-deep">
                    View Result
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </div>
              </Card>
            </Link>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
