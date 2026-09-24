import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Plus, Power, Search, Ticket, X } from "lucide-react";
import { Button, Card, Field, Input, Select, Badge } from "../../components/common/ui";
import { Modal } from "../../components/common/Feedback";
import { Reveal } from "../../components/common/Reveal";
import { useToast } from "../../context/ToastContext";
import { lotteries as initial } from "../../data/lotteries";

const emptyForm = { name: "", type: "Weekly Draw", price: "", drawDay: "", drawTime: "", status: "open" };

export default function AdminLotteries() {
  const [items, setItems] = useState(initial);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(null); // { mode: 'create'|'edit', item }
  const [form, setForm] = useState(emptyForm);
  const { push } = useToast();

  const filtered = useMemo(
    () => items.filter((l) => !search || l.name.toLowerCase().includes(search.toLowerCase())),
    [items, search]
  );

  const openCreate = () => {
    setForm(emptyForm);
    setModal({ mode: "create" });
  };

  const openEdit = (item) => {
    setForm({ name: item.name, type: item.type, price: item.price, drawDay: item.drawDay, drawTime: item.drawTime, status: item.status });
    setModal({ mode: "edit", item });
  };

  const save = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.price) return;
    if (modal.mode === "create") {
      setItems([
        {
          id: `custom-${Date.now()}`,
          name: form.name,
          type: form.type,
          category: form.type.toLowerCase().includes("special") ? "special" : "weekly",
          price: Number(form.price),
          drawDay: form.drawDay || "TBA",
          drawTime: form.drawTime || "7:00 PM",
          nextDraw: "2026-10-01",
          status: form.status,
          image: "/assets/images/lottery-ticket-1.png",
          accent: "#075B46",
          accentSoft: "#E6F2EE",
          description: "A newly created draw managed from the admin console.",
          prizes: [],
          ticketsSold: 0,
          ticketsTotal: 10000,
          colorway: "emerald-gold",
        },
        ...items,
      ]);
      push(`Draw "${form.name}" created successfully.`, "success");
    } else {
      setItems(items.map((l) => (l.id === modal.item.id ? { ...l, ...form, price: Number(form.price) } : l)));
      push(`Draw "${form.name}" updated.`, "success");
    }
    setModal(null);
  };

  const toggleStatus = (item) => {
    const next = item.status === "open" ? "closed" : "open";
    setItems(items.map((l) => (l.id === item.id ? { ...l, status: next } : l)));
    push(`"${item.name}" is now ${next === "open" ? "open for registrations" : "closed"}.`, "info");
  };

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Lottery Management</h1>
            <p className="mt-1 text-sm text-muted">Create, edit and manage every draw on the platform.</p>
          </div>
          <Button onClick={openCreate}>
            <Plus className="h-4 w-4" /> Create Lottery
          </Button>
        </div>
      </Reveal>

      <Reveal>
        <Card className="p-4">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <Input placeholder="Search lotteries…" value={search} onChange={(e) => setSearch(e.target.value)} className="h-10 pl-10 sm:w-72" />
          </div>
        </Card>
      </Reveal>

      <Reveal delay={0.08}>
        <Card className="overflow-hidden">
          {/* Desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[820px] text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-offwhite text-[11px] uppercase tracking-wider text-muted">
                  <th className="px-6 py-4 font-semibold">Lottery</th>
                  <th className="px-6 py-4 font-semibold">Price</th>
                  <th className="px-6 py-4 font-semibold">Draw Date</th>
                  <th className="px-6 py-4 font-semibold">Tickets</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                  <th className="px-6 py-4 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l.id} className="border-b border-line transition-colors last:border-0 hover:bg-offwhite">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3.5">
                        <img src={l.image} alt="" className="h-11 w-11 rounded-xl object-cover" loading="lazy" />
                        <div>
                          <p className="font-semibold text-ink">{l.name}</p>
                          <p className="text-xs text-muted">{l.type}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-ink">₹{l.price}</td>
                    <td className="px-6 py-4 text-muted">
                      {l.drawDay}, {l.drawTime}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-20 overflow-hidden rounded-full bg-slate-100">
                          <div className="h-full rounded-full bg-emerald-brand" style={{ width: `${Math.round((l.ticketsSold / l.ticketsTotal) * 100)}%` }} />
                        </div>
                        <span className="text-xs text-muted">{l.ticketsSold.toLocaleString("en-IN")}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge tone={l.status === "open" ? "emerald" : "neutral"}>
                        {l.status === "open" ? "Open" : "Disabled"}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => openEdit(l)} className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-soft px-3 py-1.5 text-xs font-semibold text-emerald-deep transition-colors hover:bg-emerald-brand hover:text-white">
                          <Pencil className="h-3 w-3" /> Edit
                        </button>
                        <button
                          onClick={() => toggleStatus(l)}
                          className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                            l.status === "open"
                              ? "bg-slate-100 text-muted hover:bg-slate-200"
                              : "bg-emerald-soft text-emerald-deep hover:bg-emerald-brand hover:text-white"
                          }`}
                        >
                          <Power className="h-3 w-3" /> {l.status === "open" ? "Disable" : "Enable"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-3 p-4 md:hidden">
            {filtered.map((l) => (
              <div key={l.id} className="rounded-2xl border border-line bg-white p-4">
                <div className="flex items-center gap-3">
                  <img src={l.image} alt="" className="h-12 w-12 rounded-xl object-cover" loading="lazy" />
                  <div className="flex-1">
                    <p className="font-semibold text-ink">{l.name}</p>
                    <p className="text-xs text-muted">{l.type}</p>
                  </div>
                  <Badge tone={l.status === "open" ? "emerald" : "neutral"}>{l.status === "open" ? "Open" : "Disabled"}</Badge>
                </div>
                <div className="mt-3 flex items-center justify-between border-t border-line pt-3 text-xs text-muted">
                  <span>₹{l.price} · {l.drawDay}</span>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(l)} className="rounded-lg bg-emerald-soft px-3 py-1.5 font-semibold text-emerald-deep">
                      Edit
                    </button>
                    <button onClick={() => toggleStatus(l)} className="rounded-lg bg-slate-100 px-3 py-1.5 font-semibold text-muted">
                      {l.status === "open" ? "Disable" : "Enable"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </Reveal>

      <Modal open={!!modal} onClose={() => setModal(null)} title={modal?.mode === "create" ? "Create New Lottery" : "Edit Lottery"} wide>
        <form onSubmit={save} className="grid gap-4 sm:grid-cols-2">
          <Field label="Lottery Name" className="sm:col-span-2">
            <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Monsoon Special" required />
          </Field>
          <Field label="Draw Type">
            <Select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
              <option>Weekly Draw</option>
              <option>Monthly Draw</option>
              <option>Special Draw</option>
            </Select>
          </Field>
          <Field label="Ticket Price (₹)">
            <Input type="number" min="1" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="100" required />
          </Field>
          <Field label="Draw Day">
            <Input value={form.drawDay} onChange={(e) => setForm({ ...form, drawDay: e.target.value })} placeholder="Sunday" />
          </Field>
          <Field label="Draw Time">
            <Input value={form.drawTime} onChange={(e) => setForm({ ...form, drawTime: e.target.value })} placeholder="7:00 PM" />
          </Field>
          <Field label="Status">
            <Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </Select>
          </Field>
          <div className="sm:col-span-2 mt-2 flex gap-3">
            <Button type="submit" className="flex-1">
              {modal?.mode === "create" ? "Create Lottery" : "Save Changes"}
            </Button>
            <Button type="button" variant="outline" onClick={() => setModal(null)}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
