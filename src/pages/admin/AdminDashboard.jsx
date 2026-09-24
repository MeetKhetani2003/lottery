import { motion } from "framer-motion";
import {
  ArrowUpRight,
  IndianRupee,
  Ticket,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "../../components/common/ui";
import { CountUpRaw } from "../../components/common/CountUp";
import { Reveal } from "../../components/common/Reveal";
import { customers } from "../../data/users";

const ticketActivity = [
  { name: "Mon", tickets: 420 },
  { name: "Tue", tickets: 610 },
  { name: "Wed", tickets: 540 },
  { name: "Thu", tickets: 780 },
  { name: "Fri", tickets: 920 },
  { name: "Sat", tickets: 1150 },
  { name: "Sun", tickets: 860 },
];

const customerGrowth = [
  { name: "Apr", customers: 82 },
  { name: "May", customers: 96 },
  { name: "Jun", customers: 118 },
  { name: "Jul", customers: 134 },
  { name: "Aug", customers: 151 },
  { name: "Sep", customers: 172 },
];

const transactionActivity = [
  { name: "Apr", amount: 180000 },
  { name: "May", amount: 220000 },
  { name: "Jun", amount: 195000 },
  { name: "Jul", amount: 280000 },
  { name: "Aug", amount: 340000 },
  { name: "Sep", amount: 410000 },
];

const tooltipStyle = {
  borderRadius: 12,
  border: "1px solid #e5ebe8",
  boxShadow: "0 8px 24px -12px rgba(15,23,32,0.2)",
  fontSize: 12,
};

const stats = [
  { label: "Total Customers", value: 128450, suffix: "", delta: 14.2, icon: Users, prefix: "" },
  { label: "Active Lotteries", value: 6, suffix: "", delta: 0, icon: Ticket, prefix: "" },
  { label: "Tickets Sold", value: 42380, suffix: "", delta: 18.6, icon: Ticket, prefix: "" },
  { label: "Transactions", value: 89240, suffix: "", delta: 9.4, icon: Wallet, prefix: "" },
];

export default function AdminDashboard() {
  const revenue = 8240000;
  const pendingWithdrawals = 12;

  return (
    <div className="space-y-6">
      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.06}>
            <Card className="group p-5 transition-all hover:-translate-y-1 hover:shadow-lift sm:p-6">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-soft text-emerald-deep transition-transform duration-300 group-hover:scale-110">
                  <s.icon className="h-5 w-5" />
                </span>
                {s.delta > 0 && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-soft px-2 py-1 text-[11px] font-bold text-emerald-deep">
                    <TrendingUp className="h-3 w-3" /> +{s.delta}%
                  </span>
                )}
              </div>
              <p className="mt-4 font-display text-[1.7rem] font-semibold tracking-tight text-ink">
                <CountUpRaw value={s.value} duration={1500} />
              </p>
              <p className="mt-1 text-[13px] font-medium text-muted">{s.label}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      {/* Revenue + pending */}
      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Reveal>
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-display text-base font-semibold tracking-tight text-ink">Ticket Activity</h3>
                <p className="text-xs text-muted">Tickets sold per day this week</p>
              </div>
              <span className="flex items-center gap-1 text-[12px] font-semibold text-emerald-deep">
                <ArrowUpRight className="h-3.5 w-3.5" /> +12.4% vs last week
              </span>
            </div>
            <div className="mt-5 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ticketActivity} barSize={28}>
                  <CartesianGrid strokeDasharray="3 6" stroke="#e5ebe8" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} dy={8} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#f8faf9" }} />
                  <Bar dataKey="tickets" radius={[8, 8, 0, 0]}>
                    {ticketActivity.map((_, i) => (
                      <Cell key={i} fill={i === 5 ? "#0B7A5A" : "#0B7A5A"} fillOpacity={i === 5 ? 1 : 0.35} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="flex h-full flex-col justify-between bg-gradient-to-br from-emerald-deep to-emerald-brand p-6 text-white">
            <div>
              <div className="bg-grid-lines pointer-events-none absolute inset-0 opacity-60" />
              <p className="relative text-[12px] font-semibold uppercase tracking-[0.16em] text-white/60">Total Revenue</p>
              <p className="relative mt-3 font-display text-4xl font-semibold tracking-tight">
                ₹<CountUpRaw value={revenue} duration={1800} />
              </p>
              <p className="relative mt-2 text-sm text-white/70">Across all active draws · Demo figures</p>
            </div>
            <div className="relative mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-display text-xl font-semibold text-gold">{pendingWithdrawals}</p>
                <p className="mt-0.5 text-[11px] font-medium text-white/60">Pending withdrawals</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="font-display text-xl font-semibold text-gold">₹8.4L</p>
                <p className="mt-0.5 text-[11px] font-medium text-white/60">Payouts this month</p>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Reveal>
          <Card className="p-6">
            <h3 className="font-display text-base font-semibold tracking-tight text-ink">Customer Growth</h3>
            <p className="text-xs text-muted">New registrations · Last 6 months</p>
            <div className="mt-5 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={customerGrowth}>
                  <CartesianGrid strokeDasharray="3 6" stroke="#e5ebe8" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} dy={8} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line type="monotone" dataKey="customers" stroke="#0B7A5A" strokeWidth={3} dot={{ r: 4, fill: "#F4B740", strokeWidth: 2, stroke: "#fff" }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="p-6">
            <h3 className="font-display text-base font-semibold tracking-tight text-ink">Transaction Activity</h3>
            <p className="text-xs text-muted">Wallet value processed · Last 6 months</p>
            <div className="mt-5 h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={transactionActivity}>
                  <defs>
                    <linearGradient id="txnGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0B7A5A" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#0B7A5A" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 6" stroke="#e5ebe8" vertical={false} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} dy={8} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} tickFormatter={(v) => `${v / 1000}k`} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Area type="monotone" dataKey="amount" stroke="#0B7A5A" strokeWidth={3} fill="url(#txnGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </Reveal>
      </div>

      {/* Recent customers */}
      <Reveal delay={0.1}>
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-base font-semibold tracking-tight text-ink">Recent Customers</h3>
            <a href="/admin/customers" className="text-[13px] font-semibold text-emerald-deep hover:underline">View all →</a>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-line text-[11px] uppercase tracking-wider text-muted">
                  <th className="pb-3 font-semibold">Customer</th>
                  <th className="pb-3 font-semibold">City</th>
                  <th className="pb-3 font-semibold">Joined</th>
                  <th className="pb-3 font-semibold">Tickets</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {customers.slice(0, 4).map((c) => (
                  <tr key={c.id} className="border-b border-line last:border-0">
                    <td className="py-3.5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-deep text-[11px] font-bold text-white">
                          {c.name.split(" ").map((w) => w[0]).join("")}
                        </span>
                        <div>
                          <p className="font-semibold text-ink">{c.name}</p>
                          <p className="text-xs text-muted">{c.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 text-muted">{c.city}</td>
                    <td className="py-3.5 text-muted">{c.joined}</td>
                    <td className="py-3.5 font-semibold text-ink">{c.tickets}</td>
                    <td className="py-3.5">
                      <span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${c.status === "active" ? "bg-emerald-soft text-emerald-deep" : "bg-slate-100 text-muted"}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
