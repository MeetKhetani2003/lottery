import { useState } from "react";
import { motion } from "framer-motion";
import { Database, Lock, UploadCloud } from "lucide-react";
import { Badge, Button, Card, Field, Input, Select } from "../../components/common/ui";
import { Reveal } from "../../components/common/Reveal";
import { useToast } from "../../context/ToastContext";
import { results } from "../../data/results";
import { lotteries } from "../../data/lotteries";

export default function AdminResults() {
  const { push } = useToast();
  const [lotteryId, setLotteryId] = useState(results[0].lotteryId);
  const [winningNumber, setWinningNumber] = useState("");
  const [drawDate, setDrawDate] = useState(results[0].date);

  const selected = results.find((r) => r.lotteryId === lotteryId);

  const submit = (e) => {
    e.preventDefault();
    push("Demo mode — result publishing requires backend integration.", "info");
  };

  return (
    <div className="space-y-6">
      <Reveal>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Result Publishing</h1>
          <p className="mt-1 text-sm text-muted">Manage the publication of official draw results.</p>
        </div>
      </Reveal>

      {/* Integration placeholder — important notice */}
      <Reveal>
        <div className="relative overflow-hidden rounded-[22px] border-2 border-dashed border-gold/50 bg-gold-soft/30 p-8 text-center sm:p-12">
          <div className="bg-ticket-pattern pointer-events-none absolute inset-0 opacity-10" />
          <div className="relative mx-auto flex max-w-lg flex-col items-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-card">
              <Lock className="h-7 w-7 text-gold-deep" />
            </span>
            <h2 className="mt-5 font-display text-xl font-semibold tracking-tight text-ink">
              Backend Integration Required
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Result publishing will be connected to the authorised official result source in the next development phase.
              This console currently provides a UI placeholder only.
            </p>
            <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
              <Badge tone="gold">
                <Database className="h-3 w-3" /> Authorised Source Pending
              </Badge>
              <Badge tone="neutral">Phase 2</Badge>
            </div>
          </div>
        </div>
      </Reveal>

      {/* Publishing form (placeholder) */}
      <Reveal delay={0.1}>
        <Card className="p-7">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-soft">
              <UploadCloud className="h-5 w-5 text-emerald-deep" />
            </span>
            <div>
              <h3 className="font-display text-base font-semibold text-ink">Publish a Result</h3>
              <p className="text-xs text-muted">Placeholder form — submission is simulated in this prototype.</p>
            </div>
          </div>

          <form onSubmit={submit} className="mt-7 grid gap-5 sm:grid-cols-2">
            <Field label="Lottery" className="sm:col-span-2">
              <Select value={lotteryId} onChange={(e) => setLotteryId(e.target.value)}>
                {lotteries.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Draw Date">
              <Input type="date" value={drawDate} onChange={(e) => setDrawDate(e.target.value)} />
            </Field>
            <Field label="Winning Number" hint="Format: 0-0-0-0">
              <Input
                value={winningNumber}
                onChange={(e) => setWinningNumber(e.target.value)}
                placeholder={selected?.winningNumber || "0-0-0-0"}
              />
            </Field>
            <div className="sm:col-span-2">
              <Button type="submit" variant="outline">
                Submit for Publishing
              </Button>
            </div>
          </form>
        </Card>
      </Reveal>

      {/* Published log */}
      <Reveal delay={0.15}>
        <Card className="overflow-hidden">
          <div className="border-b border-line px-6 py-4">
            <h3 className="font-display text-base font-semibold text-ink">Published Results Log</h3>
          </div>
          <div className="divide-y divide-line">
            {results.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex flex-wrap items-center gap-4 px-6 py-4"
              >
                <div className="flex-1">
                  <p className="text-sm font-semibold text-ink">{r.lotteryName}</p>
                  <p className="text-xs text-muted">{r.dateLabel} · {r.drawType}</p>
                </div>
                <p className="font-mono text-sm font-bold tracking-[0.16em] text-emerald-deep">{r.winningNumber}</p>
                <Badge tone="emerald">Published</Badge>
              </motion.div>
            ))}
          </div>
        </Card>
      </Reveal>
    </div>
  );
}
