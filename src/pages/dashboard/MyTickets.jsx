import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { QrCode, Star, Ticket } from "lucide-react";
import { ButtonLink, Card } from "../../components/common/ui";
import { Reveal } from "../../components/common/Reveal";
import { EmptyState } from "../../components/common/Feedback";
import { TicketCard } from "../../components/tickets/TicketCard";
import { tickets as allTickets } from "../../data/tickets";
import { cn } from "../../utils/cn";

const tabs = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "completed", label: "Completed" },
  { id: "result", label: "Results" },
];

export default function MyTickets() {
  const [tab, setTab] = useState("all");
  const [loading, setLoading] = useState(true);

  useMemo(() => {
    const t = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(t);
  }, [tab]);

  const list = useMemo(() => (tab === "all" ? allTickets : allTickets.filter((t) => t.status === tab)), [tab]);

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">My Tickets</h1>
            <p className="mt-1 text-sm text-muted">Every ticket you've purchased, organised by status.</p>
          </div>
          <ButtonLink to="/lotteries" size="sm" variant="outline">
            Buy New Ticket
          </ButtonLink>
        </div>
      </Reveal>

      <Reveal>
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => {
                setTab(t.id);
                setLoading(true);
              }}
              className={cn(
                "rounded-full border px-4 py-2 text-[13px] font-semibold transition-all",
                tab === t.id
                  ? "border-emerald-brand bg-emerald-brand text-white shadow-[0_6px_16px_-8px_rgba(11,122,90,0.6)]"
                  : "border-line bg-white text-muted hover:border-emerald-brand/40 hover:text-ink"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </Reveal>

      {loading ? (
        <div className="grid gap-5 md:grid-cols-2">
          {[1, 2].map((i) => (
            <div key={i} className="h-52 animate-pulse rounded-[20px] bg-white ring-1 ring-line" />
          ))}
        </div>
      ) : list.length === 0 ? (
        <EmptyState
          title="No tickets here yet"
          message="Your purchased tickets will appear here once you buy your first draw."
          action={
            <ButtonLink to="/lotteries" variant="outline">
              Explore Lotteries
            </ButtonLink>
          }
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2">
          {list.map((t, i) => (
            <div key={t.id} className="space-y-3">
              <TicketCard ticket={t} index={i} />
              {t.status === "result" && (
                <div className="flex items-center justify-between rounded-xl border border-gold/30 bg-gold-soft/30 px-4 py-3">
                  <span className="flex items-center gap-2 text-[13px] font-semibold text-gold-deep">
                    <Star className="h-4 w-4" /> {t.result}
                  </span>
                  <button className="inline-flex items-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-emerald-deep ring-1 ring-line transition-colors hover:bg-emerald-soft">
                    <QrCode className="h-3.5 w-3.5" /> Ticket QR
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      <Reveal>
        <Card className="flex flex-wrap items-center justify-between gap-4 bg-gradient-to-r from-emerald-deep to-emerald-brand p-6 text-white">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10">
              <Ticket className="h-5 w-5 text-gold" />
            </span>
            <div>
              <p className="font-display text-base font-semibold">Want more chances to win?</p>
              <p className="text-sm text-white/70">Explore upcoming weekly and special draws.</p>
            </div>
          </div>
          <ButtonLink to="/lotteries" size="sm" className="bg-gold text-ink hover:bg-[#f0aa2a]">
            Explore Lotteries
          </ButtonLink>
        </Card>
      </Reveal>
    </div>
  );
}
