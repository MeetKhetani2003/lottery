import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, ShieldCheck } from "lucide-react";
import { Avatar, Button, Card, Field, Input, Select } from "../../components/common/ui";
import { Reveal } from "../../components/common/Reveal";
import { useToast } from "../../context/ToastContext";
import { adminUser } from "../../data/users";

function Toggle({ label, description, defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      onClick={() => setOn(!on)}
      className="flex w-full items-center justify-between gap-4 py-4 text-left"
    >
      <span>
        <span className="block text-sm font-semibold text-ink">{label}</span>
        <span className="mt-0.5 block text-xs text-muted">{description}</span>
      </span>
      <span className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-emerald-brand" : "bg-slate-200"}`}>
        <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 32 }} className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow ${on ? "left-[22px]" : "left-0.5"}`} />
      </span>
    </button>
  );
}

export default function AdminSettings() {
  const { push } = useToast();
  const [saved, setSaved] = useState(false);
  const [saving, setSaving] = useState(false);
  const [platform, setPlatform] = useState({
    name: "Howladar Lottery Agency",
    supportEmail: "support@howladar.demo",
    commission: "2.5",
    currency: "INR (₹)",
    timezone: "IST (UTC+5:30)",
  });

  const save = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      push("Platform settings saved (demo).", "success");
      setTimeout(() => setSaved(false), 2500);
    }, 700);
  };

  return (
    <div className="space-y-6">
      <Reveal>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Platform Settings</h1>
          <p className="mt-1 text-sm text-muted">Configure platform-wide preferences.</p>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <Card className="p-7">
            <div className="flex items-center gap-4">
              <Avatar name={adminUser.name} size="lg" className="ring-4 ring-emerald-soft" />
              <div>
                <p className="font-display text-base font-semibold text-ink">{adminUser.name}</p>
                <p className="text-xs text-muted">{adminUser.email}</p>
                <p className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-emerald-deep">
                  <ShieldCheck className="h-3 w-3" /> {adminUser.role}
                </p>
              </div>
            </div>
            <form onSubmit={save} className="mt-7 space-y-5">
              <Field label="Platform Name">
                <Input value={platform.name} onChange={(e) => setPlatform({ ...platform, name: e.target.value })} />
              </Field>
              <Field label="Support Email">
                <Input type="email" value={platform.supportEmail} onChange={(e) => setPlatform({ ...platform, supportEmail: e.target.value })} />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Commission (%)">
                  <Input type="number" step="0.1" value={platform.commission} onChange={(e) => setPlatform({ ...platform, commission: e.target.value })} />
                </Field>
                <Field label="Default Currency">
                  <Select value={platform.currency} onChange={(e) => setPlatform({ ...platform, currency: e.target.value })}>
                    <option>INR (₹)</option>
                    <option>USD ($)</option>
                  </Select>
                </Field>
              </div>
              <Field label="Timezone">
                <Select value={platform.timezone} onChange={(e) => setPlatform({ ...platform, timezone: e.target.value })}>
                  <option>IST (UTC+5:30)</option>
                  <option>GMT (UTC+0:00)</option>
                </Select>
              </Field>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Saving…
                  </>
                ) : saved ? (
                  <>
                    <Check className="h-4 w-4" /> Saved
                  </>
                ) : (
                  "Save Settings"
                )}
              </Button>
            </form>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="divide-y divide-line px-7">
            <div className="pb-3 pt-6">
              <h3 className="font-display text-base font-semibold text-ink">Platform Behaviour</h3>
            </div>
            <div className="py-2">
              <Toggle label="Auto-publish results" description="Publish results automatically after draw closes." defaultOn />
              <Toggle label="Email notifications" description="Send email alerts for account activity." defaultOn />
              <Toggle label="Maintenance mode" description="Temporarily restrict customer access for updates." />
              <Toggle label="New draw approvals" description="Require super-admin approval before draws go live." defaultOn />
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.15}>
          <Card className="p-7">
            <h3 className="font-display text-base font-semibold text-ink">Security</h3>
            <div className="mt-4 space-y-3">
              {[
                { label: "Two-factor authentication", status: "Enabled", on: true },
                { label: "Session timeout", status: "30 minutes", on: true },
                { label: "Audit logging", status: "Active", on: true },
                { label: "API access", status: "Disabled", on: false },
              ].map((s) => (
                <div key={s.label} className="flex items-center justify-between rounded-xl bg-offwhite px-4 py-3.5">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className={`h-4 w-4 ${s.on ? "text-emerald-brand" : "text-muted"}`} />
                    <span className="text-[13px] font-semibold text-ink">{s.label}</span>
                  </div>
                  <span className={`text-xs font-semibold ${s.on ? "text-emerald-deep" : "text-muted"}`}>{s.status}</span>
                </div>
              ))}
            </div>
            <Button
              variant="outline"
              className="mt-5"
              onClick={() => push("Security policies are managed in the next phase.", "info")}
            >
              Manage Security Policies
            </Button>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
