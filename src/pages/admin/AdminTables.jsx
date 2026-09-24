import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Avatar, Badge, Card, Input, Select } from "../../components/common/ui";
import { Reveal } from "../../components/common/Reveal";
import { customers } from "../../data/users";
import { tickets } from "../../data/tickets";
import { lotteries } from "../../data/lotteries";
import { cn } from "../../utils/cn";

/* ================= Tickets Management ================= */
export function AdminTickets() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");

  const rows = useMemo(
    () =>
      tickets.filter((t) => {
        const matchStatus = status === "all" || t.status === status;
        const matchQuery =
          !query ||
          t.id.toLowerCase().includes(query.toLowerCase()) ||
          t.lotteryName.toLowerCase().includes(query.toLowerCase());
        return matchStatus && matchQuery;
      }),
    [query, status]
  );

  const statusTone = { active: "emerald", completed: "neutral", result: "gold" };

  return (
    <div className="space-y-6">
      <Reveal>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Ticket Management</h1>
          <p className="mt-1 text-sm text-muted">Every ticket issued across all draws.</p>
        </div>
      </Reveal>

      <Reveal>
        <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input placeholder="Search by ticket no. or lottery…" value={query} onChange={(e) => setQuery(e.target.value)} className="h-10 pl-10" />
          </div>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} className="h-10 sm:w-44">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="result">Result Out</option>
          </Select>
        </Card>
      </Reveal>

      <Reveal delay={0.08}>
        <Card className="overflow-hidden">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-offwhite text-[11px] uppercase tracking-wider text-muted">
                  <th className="px-6 py-4 font-semibold">Ticket</th>
                  <th className="px-6 py-4 font-semibold">Lottery</th>
                  <th className="px-6 py-4 font-semibold">Draw Date</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((t) => (
                  <tr key={t.id} className="border-b border-line last:border-0 hover:bg-offwhite">
                    <td className="px-6 py-4 font-mono text-[13px] font-semibold text-ink">{t.id}</td>
                    <td className="px-6 py-4 text-muted">{t.lotteryName}</td>
                    <td className="px-6 py-4 text-muted">{t.drawDate}</td>
                    <td className="px-6 py-4 font-semibold text-ink">₹{t.price}</td>
                    <td className="px-6 py-4">
                      <Badge tone={statusTone[t.status]}>{t.status === "result" ? "Result Out" : t.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-3 p-4 md:hidden">
            {rows.map((t) => (
              <div key={t.id} className="rounded-2xl border border-line bg-white p-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[13px] font-semibold text-ink">{t.id}</span>
                  <Badge tone={statusTone[t.status]}>{t.status === "result" ? "Result Out" : t.status}</Badge>
                </div>
                <p className="mt-2 text-sm font-medium text-ink">{t.lotteryName}</p>
                <p className="mt-0.5 text-xs text-muted">Draw {t.drawDate} · ₹{t.price}</p>
              </div>
            ))}
          </div>
          {rows.length === 0 && <p className="py-12 text-center text-sm text-muted">No tickets match your filters.</p>}
        </Card>
      </Reveal>
    </div>
  );
}

/* ================= Customers Management ================= */
export function AdminCustomers() {
  const [query, setQuery] = useState("");
  const [city, setCity] = useState("all");

  const cities = ["all", ...new Set(customers.map((c) => c.city))];

  const rows = useMemo(
    () =>
      customers.filter((c) => {
        const matchCity = city === "all" || c.city === city;
        const matchQuery =
          !query ||
          c.name.toLowerCase().includes(query.toLowerCase()) ||
          c.email.toLowerCase().includes(query.toLowerCase()) ||
          c.mobile.includes(query);
        return matchCity && matchQuery;
      }),
    [query, city]
  );

  return (
    <div className="space-y-6">
      <Reveal>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Customer Management</h1>
          <p className="mt-1 text-sm text-muted">Registered players and their activity.</p>
        </div>
      </Reveal>

      <Reveal>
        <Card className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input placeholder="Search name, email or mobile…" value={query} onChange={(e) => setQuery(e.target.value)} className="h-10 pl-10" />
          </div>
          <Select value={city} onChange={(e) => setCity(e.target.value)} className="h-10 sm:w-44">
            {cities.map((c) => (
              <option key={c} value={c}>
                {c === "all" ? "All Cities" : c}
              </option>
            ))}
          </Select>
        </Card>
      </Reveal>

      <Reveal delay={0.08}>
        <Card className="overflow-hidden">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-offwhite text-[11px] uppercase tracking-wider text-muted">
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Mobile</th>
                  <th className="px-6 py-4 font-semibold">City</th>
                  <th className="px-6 py-4 font-semibold">Joined</th>
                  <th className="px-6 py-4 font-semibold">Tickets</th>
                  <th className="px-6 py-4 font-semibold">Total Spent</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <tr key={c.id} className="border-b border-line last:border-0 hover:bg-offwhite">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar name={c.name} size="sm" />
                        <div>
                          <p className="font-semibold text-ink">{c.name}</p>
                          <p className="text-xs text-muted">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted">{c.mobile}</td>
                    <td className="px-6 py-4 text-muted">{c.city}</td>
                    <td className="px-6 py-4 text-muted">{c.joined}</td>
                    <td className="px-6 py-4 font-semibold text-ink">{c.tickets}</td>
                    <td className="px-6 py-4 font-semibold text-ink">₹{c.spent.toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4">
                      <Badge tone={c.status === "active" ? "emerald" : "neutral"}>{c.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-3 p-4 md:hidden">
            {rows.map((c) => (
              <div key={c.id} className="rounded-2xl border border-line bg-white p-4">
                <div className="flex items-center gap-3">
                  <Avatar name={c.name} />
                  <div>
                    <p className="text-sm font-semibold text-ink">{c.name}</p>
                    <p className="text-xs text-muted">{c.city} · Joined {c.joined}</p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-xs text-muted">
                  <span>{c.tickets} tickets · ₹{c.spent.toLocaleString("en-IN")}</span>
                  <Badge tone={c.status === "active" ? "emerald" : "neutral"}>{c.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>
    </div>
  );
}

/* ================= Wallet & Transactions ================= */
const adminTxns = [
  { id: "TXN-9081", customer: "Ananya Menon", title: "Ticket Purchase", amount: -500, date: "02 Sep", method: "Wallet", status: "success" },
  { id: "TXN-9076", customer: "Diya Nair", title: "Wallet Credit", amount: 2000, date: "02 Sep", method: "UPI", status: "success" },
  { id: "TXN-9064", customer: "Isha Reddy", title: "Ticket Purchase", amount: -200, date: "01 Sep", method: "Wallet", status: "success" },
  { id: "TXN-9052", customer: "Diya Nair", title: "Prize Credited", amount: 100000, date: "07 Sep", method: "Bank", status: "success" },
  { id: "TXN-9044", customer: "Arjun Mehta", title: "Ticket Purchase", amount: -250, date: "25 Aug", method: "Wallet", status: "success" },
  { id: "TXN-9031", customer: "Meera Iyer", title: "Wallet Credit", amount: 5000, date: "24 Aug", method: "Card", status: "pending" },
];

export function AdminWallet() {
  const totalIn = adminTxns.filter((t) => t.amount > 0).reduce((s, t) => s + t.amount, 0);
  const totalOut = adminTxns.filter((t) => t.amount < 0).reduce((s, t) => s + Math.abs(t.amount), 0);

  return (
    <div className="space-y-6">
      <Reveal>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Wallet & Transactions</h1>
          <p className="mt-1 text-sm text-muted">Platform-wide wallet movement and payouts.</p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Wallet Balance Held", value: "₹84.2L", tone: "bg-emerald-soft text-emerald-deep" },
          { label: "Total Credits", value: `₹${(totalIn / 100000).toFixed(1)}L`, tone: "bg-emerald-soft text-emerald-deep" },
          { label: "Total Debits", value: `₹${(totalOut / 1000).toFixed(1)}K`, tone: "bg-gold-soft text-gold-deep" },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <Card className="p-5">
              <p className="text-xs font-medium text-muted">{s.label}</p>
              <p className="mt-2 font-display text-2xl font-semibold tracking-tight text-ink">{s.value}</p>
              <span className={`mt-3 inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold ${s.tone}`}>Demo data</span>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.15}>
        <Card className="overflow-hidden">
          <div className="border-b border-line px-6 py-4">
            <h3 className="font-display text-base font-semibold text-ink">Recent Transactions</h3>
          </div>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-offwhite text-[11px] uppercase tracking-wider text-muted">
                  <th className="px-6 py-4 font-semibold">ID</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Type</th>
                  <th className="px-6 py-4 font-semibold">Method</th>
                  <th className="px-6 py-4 font-semibold">Amount</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {adminTxns.map((t) => (
                  <tr key={t.id} className="border-b border-line last:border-0 hover:bg-offwhite">
                    <td className="px-6 py-4 font-mono text-xs text-muted">{t.id}</td>
                    <td className="px-6 py-4 font-semibold text-ink">{t.customer}</td>
                    <td className="px-6 py-4 text-muted">{t.title}</td>
                    <td className="px-6 py-4 text-muted">{t.method}</td>
                    <td className={cn("px-6 py-4 font-semibold", t.amount > 0 ? "text-success" : "text-ink")}>
                      {t.amount > 0 ? "+" : "−"}₹{Math.abs(t.amount).toLocaleString("en-IN")}
                    </td>
                    <td className="px-6 py-4">
                      <Badge tone={t.status === "success" ? "emerald" : "gold"}>{t.status}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="space-y-3 p-4 md:hidden">
            {adminTxns.map((t) => (
              <div key={t.id} className="flex items-center gap-3 rounded-2xl border border-line bg-white p-4">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink">{t.customer}</p>
                  <p className="text-xs text-muted">{t.title} · {t.date}</p>
                </div>
                <p className={cn("text-sm font-semibold", t.amount > 0 ? "text-success" : "text-ink")}>
                  {t.amount > 0 ? "+" : "−"}₹{Math.abs(t.amount).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
