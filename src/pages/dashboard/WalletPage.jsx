import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Plus, Receipt, Sparkles, Wallet } from "lucide-react";
import { Button, Card, Badge } from "../../components/common/ui";
import { CountUp } from "../../components/common/CountUp";
import { Reveal } from "../../components/common/Reveal";
import { AddMoneyModal, WithdrawModal } from "../../components/wallet/WalletComponents";
import { transactions } from "../../data/transactions";
import { useToast } from "../../context/ToastContext";

export default function WalletPage() {
  const [addOpen, setAddOpen] = useState(false);
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const { push } = useToast();

  useState(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  });

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Wallet</h1>
            <p className="mt-1 text-sm text-muted">Manage your balance and track every transaction.</p>
          </div>
          <div className="flex gap-2.5">
            <Button variant="outline" size="sm" onClick={() => setWithdrawOpen(true)}>
              <ArrowUpRight className="h-4 w-4" /> Withdraw
            </Button>
            <Button size="sm" onClick={() => setAddOpen(true)}>
              <Plus className="h-4 w-4" /> Add Money
            </Button>
          </div>
        </div>
      </Reveal>

      {/* Balance card */}
      <Reveal delay={0.08}>
        <div className="relative overflow-hidden rounded-[24px] bg-gradient-to-br from-emerald-deep via-[#0A4A39] to-emerald-brand p-7 text-white sm:p-9">
          <div className="bg-grid-lines pointer-events-none absolute inset-0 opacity-60" />
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl" />
          <div className="relative flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60">
                <Wallet className="h-4 w-4" /> Available Balance
              </p>
              <p className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">
                <CountUp value={12450} prefix="₹" duration={1800} />
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Badge tone="gold">
                  <Sparkles className="h-3 w-3" /> Demo Wallet
                </Badge>
                <span className="text-xs text-white/50">Updated just now · No real funds held</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setAddOpen(true)}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-[14px] bg-gold px-6 text-sm font-semibold text-ink transition-all hover:-translate-y-0.5 hover:shadow-gold sm:flex-none"
              >
                <ArrowDownLeft className="h-4 w-4" /> Add Money
              </button>
              <button
                onClick={() => setWithdrawOpen(true)}
                className="flex h-12 flex-1 items-center justify-center gap-2 rounded-[14px] border border-white/20 bg-white/5 px-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-white/10 sm:flex-none"
              >
                <ArrowUpRight className="h-4 w-4" /> Withdraw
              </button>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Added", value: "₹7,000", icon: ArrowDownLeft, tone: "bg-emerald-soft text-emerald-deep" },
          { label: "Total Withdrawn", value: "₹0", icon: ArrowUpRight, tone: "bg-gold-soft text-gold-deep" },
          { label: "Transactions", value: transactions.length, icon: Receipt, tone: "bg-emerald-soft text-emerald-deep" },
        ].map((s, i) => (
          <Reveal key={s.label} delay={0.12 + i * 0.06}>
            <Card className="p-5 text-center">
              <span className={`mx-auto flex h-9 w-9 items-center justify-center rounded-xl ${s.tone}`}>
                <s.icon className="h-4.5 w-4.5" />
              </span>
              <p className="mt-3 font-display text-xl font-semibold tracking-tight text-ink">{s.value}</p>
              <p className="mt-0.5 text-xs font-medium text-muted">{s.label}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      {/* Recent transactions */}
      <Reveal delay={0.2}>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-semibold tracking-tight text-ink">Recent Transactions</h3>
            <button onClick={() => push("Statement export is available in the next phase.", "info")} className="text-[13px] font-semibold text-emerald-deep hover:underline">
              Export Statement
            </button>
          </div>
          <div className="mt-2">
            {loading
              ? [1, 2, 3].map((i) => <div key={i} className="h-16 animate-pulse rounded-xl bg-offwhite" />)
              : transactions.slice(0, 6).map((t) => (
                  <motion.div
                    key={t.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-4 border-b border-line py-3.5 last:border-0"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-soft text-emerald-deep">
                      <Receipt className="h-4.5 w-4.5" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[13px] font-semibold text-ink">{t.title}</p>
                      <p className="truncate text-xs text-muted">{t.subtitle} · {t.date}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-sm font-semibold ${t.amount >= 0 ? "text-success" : "text-ink"}`}>
                        {t.amount >= 0 ? "+" : "−"}₹{Math.abs(t.amount).toLocaleString("en-IN")}
                      </p>
                      <Badge tone={t.status === "success" ? "emerald" : "gold"} className="mt-1">
                        {t.status === "success" ? "Success" : t.status}
                      </Badge>
                    </div>
                  </motion.div>
                ))}
          </div>
        </Card>
      </Reveal>

      <AddMoneyModal open={addOpen} onClose={() => setAddOpen(false)} />
      <WithdrawModal open={withdrawOpen} onClose={() => setWithdrawOpen(false)} />
    </div>
  );
}
