import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, Download, Receipt } from "lucide-react";
import { Button, Card, Badge, Input } from "../../components/common/ui";
import { Reveal } from "../../components/common/Reveal";
import { EmptyState } from "../../components/common/Feedback";
import { transactions } from "../../data/transactions";
import { useToast } from "../../context/ToastContext";

export default function TransactionsPage() {
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const { push } = useToast();

  const filtered = useMemo(
    () =>
      transactions.filter((t) => {
        const matchType = filter === "all" || (filter === "credit" ? t.amount > 0 : t.amount < 0);
        const matchQuery = !query || t.title.toLowerCase().includes(query.toLowerCase()) || t.subtitle.toLowerCase().includes(query.toLowerCase());
        return matchType && matchQuery;
      }),
    [filter, query]
  );

  const totalCredit = transactions.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalDebit = transactions.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Transactions</h1>
            <p className="mt-1 text-sm text-muted">A complete history of wallet credits and ticket purchases.</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => push("Statement export is available in the next phase.", "info")}>
            <Download className="h-4 w-4" /> Export
          </Button>
        </div>
      </Reveal>

      <div className="grid grid-cols-2 gap-4">
        <Reveal delay={0.06}>
          <Card className="p-5">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted">
              <ArrowDownLeft className="h-3.5 w-3.5 text-success" /> Total Credited
            </p>
            <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-success">+₹{totalCredit.toLocaleString("en-IN")}</p>
          </Card>
        </Reveal>
        <Reveal delay={0.12}>
          <Card className="p-5">
            <p className="flex items-center gap-1.5 text-xs font-medium text-muted">
              <ArrowUpRight className="h-3.5 w-3.5 text-ink" /> Total Spent
            </p>
            <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">−₹{totalDebit.toLocaleString("en-IN")}</p>
          </Card>
        </Reveal>
      </div>

      <Reveal>
        <Card className="p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2">
              {["all", "credit", "debit"].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-2 text-[13px] font-semibold capitalize transition-all ${
                    filter === f
                      ? "bg-emerald-brand text-white shadow-[0_6px_16px_-8px_rgba(11,122,90,0.6)]"
                      : "bg-offwhite text-muted hover:text-ink"
                  }`}
                >
                  {f === "all" ? "All" : f}
                </button>
              ))}
            </div>
            <Input
              placeholder="Search transactions…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="h-10 sm:w-64"
            />
          </div>
        </Card>
      </Reveal>

      <Reveal delay={0.1}>
        <Card className="p-6">
          {filtered.length === 0 ? (
            <EmptyState
              title="No transactions found"
              message="Try adjusting your filter or search term."
              action={
                <Button variant="outline" size="sm" onClick={() => { setFilter("all"); setQuery(""); }}>
                  Clear Filters
                </Button>
              }
            />
          ) : (
            <div>
              {filtered.map((t, i) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex items-center gap-4 border-b border-line py-4 last:border-0"
                >
                  <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${t.amount >= 0 ? "bg-emerald-soft text-emerald-deep" : "bg-offwhite text-muted"}`}>
                    {t.amount >= 0 ? <ArrowDownLeft className="h-4.5 w-4.5" /> : <Receipt className="h-4.5 w-4.5" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-ink">{t.title}</p>
                    <p className="truncate text-xs text-muted">{t.subtitle} · {t.date} · {t.method}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${t.amount >= 0 ? "text-success" : "text-ink"}`}>
                      {t.amount >= 0 ? "+" : "−"}₹{Math.abs(t.amount).toLocaleString("en-IN")}
                    </p>
                    <Badge tone={t.status === "success" ? "emerald" : "gold"} className="mt-1">
                      {t.status}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </Reveal>
    </div>
  );
}
