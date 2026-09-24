import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Camera, Check, Loader2, Lock, Mail, Phone, ShieldCheck, User } from "lucide-react";
import { Avatar, Badge, Button, Card, Field, Input, Select } from "../../components/common/ui";
import { Reveal } from "../../components/common/Reveal";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";

/* ================= Profile ================= */
export function ProfilePage() {
  const { user } = useAuth();
  const { push } = useToast();
  const [form, setForm] = useState({
    name: user?.name || "Arjun Krishna",
    mobile: user?.mobile || "98470 00000",
    email: user?.email || "arjun.krishna@example.com",
    city: "Kochi",
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const save = (e) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      push("Profile updated successfully.", "success");
      setTimeout(() => setSaved(false), 2500);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <Reveal>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Profile</h1>
          <p className="mt-1 text-sm text-muted">Manage your personal details and account preferences.</p>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <Reveal>
          <Card className="p-7 text-center">
            <div className="relative mx-auto w-fit">
              <Avatar name={form.name} size="lg" className="h-24 w-24 text-2xl ring-4 ring-emerald-soft" />
              <button
                onClick={() => push("Photo upload is a demo action.", "info")}
                className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-brand text-white shadow-card transition-transform hover:scale-105"
                aria-label="Change photo"
              >
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <h3 className="mt-4 font-display text-lg font-semibold text-ink">{form.name}</h3>
            <p className="text-sm text-muted">{form.email}</p>
            <div className="mt-4 flex justify-center">
              <Badge tone="emerald">
                <ShieldCheck className="h-3 w-3" /> Verified Account
              </Badge>
            </div>
            <div className="mt-6 grid grid-cols-3 divide-x divide-line rounded-2xl bg-offwhite py-4">
              {[
                { v: "12", l: "Draws" },
                { v: "₹21,050", l: "Spent" },
                { v: "₹1.1L", l: "Won" },
              ].map((s) => (
                <div key={s.l}>
                  <p className="font-display text-sm font-semibold text-ink">{s.v}</p>
                  <p className="text-[10px] font-medium text-muted">{s.l}</p>
                </div>
              ))}
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="p-7">
            <h3 className="font-display text-base font-semibold tracking-tight text-ink">Personal Details</h3>
            <form onSubmit={save} className="mt-6 space-y-5">
              <Field label="Full Name">
                <Input value={form.name} onChange={set("name")} />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Mobile Number">
                  <Input value={form.mobile} onChange={set("mobile")} inputMode="numeric" />
                </Field>
                <Field label="Email Address">
                  <Input type="email" value={form.email} onChange={set("email")} />
                </Field>
              </div>
              <Field label="City">
                <Select value={form.city} onChange={set("city")}>
                  <option>Kochi</option>
                  <option>Thiruvananthapuram</option>
                  <option>Kozhikode</option>
                  <option>Chennai</option>
                  <option>Bengaluru</option>
                </Select>
              </Field>
              <div className="flex items-center gap-3">
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
                    "Save Changes"
                  )}
                </Button>
                <span className="text-xs text-muted">Demo environment — changes are stored locally.</span>
              </div>
            </form>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}

/* ================= Settings ================= */
function Toggle({ label, description, defaultOn = false, onChange }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      type="button"
      onClick={() => {
        setOn(!on);
        onChange?.(!on);
      }}
      className="flex w-full items-center justify-between gap-4 py-4 text-left"
    >
      <span>
        <span className="block text-sm font-semibold text-ink">{label}</span>
        <span className="mt-0.5 block text-xs text-muted">{description}</span>
      </span>
      <span
        className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${on ? "bg-emerald-brand" : "bg-slate-200"}`}
      >
        <motion.span layout transition={{ type: "spring", stiffness: 500, damping: 32 }} className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow ${on ? "left-[22px]" : "left-0.5"}`} />
      </span>
    </button>
  );
}

export function SettingsPage() {
  const { push } = useToast();
  const { logout } = useAuth();
  const [passwords, setPasswords] = useState({ current: "", next: "", confirm: "" });
  const [errors, setErrors] = useState({});

  const changePassword = (e) => {
    e.preventDefault();
    const err = {};
    if (!passwords.current) err.current = "Enter your current password";
    if (passwords.next.length < 6) err.next = "New password must be at least 6 characters";
    if (passwords.confirm !== passwords.next) err.confirm = "Passwords do not match";
    setErrors(err);
    if (Object.keys(err).length) return;
    push("Password changed successfully.", "success");
    setPasswords({ current: "", next: "", confirm: "" });
  };

  return (
    <div className="space-y-6">
      <Reveal>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Settings</h1>
          <p className="mt-1 text-sm text-muted">Control notifications, security and session preferences.</p>
        </div>
      </Reveal>

      <div className="grid gap-6 lg:grid-cols-2">
        <Reveal>
          <Card className="divide-y divide-line px-7">
            <div className="flex items-center gap-2.5 pb-3 pt-6">
              <Bell className="h-4.5 w-4.5 text-emerald-brand" />
              <h3 className="font-display text-base font-semibold text-ink">Notifications</h3>
            </div>
            <div className="py-2">
              <Toggle label="Draw reminders" description="Get notified 24 hours before your draw." defaultOn />
              <Toggle label="Result alerts" description="Be the first to know when results publish." defaultOn />
              <Toggle label="Promotional updates" description="News about new draws and special editions." />
              <Toggle label="Wallet alerts" description="Alerts for every credit and debit." defaultOn />
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="p-7">
            <div className="flex items-center gap-2.5">
              <Lock className="h-4.5 w-4.5 text-emerald-brand" />
              <h3 className="font-display text-base font-semibold text-ink">Change Password</h3>
            </div>
            <form onSubmit={changePassword} className="mt-5 space-y-4">
              <Field label="Current Password" error={errors.current}>
                <Input type="password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} error={!!errors.current} />
              </Field>
              <Field label="New Password" error={errors.next}>
                <Input type="password" value={passwords.next} onChange={(e) => setPasswords({ ...passwords, next: e.target.value })} error={!!errors.next} />
              </Field>
              <Field label="Confirm New Password" error={errors.confirm}>
                <Input type="password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} error={!!errors.confirm} />
              </Field>
              <Button type="submit" className="w-full">
                Update Password
              </Button>
            </form>
          </Card>
        </Reveal>

        <Reveal delay={0.15}>
          <Card className="p-7">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="h-4.5 w-4.5 text-emerald-brand" />
              <h3 className="font-display text-base font-semibold text-ink">Security & Session</h3>
            </div>
            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-xl bg-offwhite px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-muted" />
                  <div>
                    <p className="text-[13px] font-semibold text-ink">Email</p>
                    <p className="text-xs text-muted">arjun.krishna@example.com</p>
                  </div>
                </div>
                <Badge tone="emerald">Verified</Badge>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-offwhite px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-muted" />
                  <div>
                    <p className="text-[13px] font-semibold text-ink">Mobile</p>
                    <p className="text-xs text-muted">98470 00000</p>
                  </div>
                </div>
                <Badge tone="emerald">Verified</Badge>
              </div>
              <button
                onClick={() => {
                  logout();
                  push("Signed out of demo session.", "info");
                }}
                className="mt-2 flex w-full items-center justify-center gap-2 rounded-[12px] border border-danger/30 bg-red-50 py-3 text-sm font-semibold text-danger transition-colors hover:bg-red-100"
              >
                Sign Out of All Devices
              </button>
            </div>
          </Card>
        </Reveal>

        <Reveal delay={0.2}>
          <Card className="p-7">
            <h3 className="font-display text-base font-semibold text-ink">Danger Zone</h3>
            <p className="mt-2 text-[13px] leading-relaxed text-muted">
              Once you deactivate your account, your tickets and wallet history will be hidden from this
              demo environment. This action cannot be undone.
            </p>
            <Button
              variant="outline"
              className="mt-5 border-danger/40 text-danger hover:border-danger hover:bg-red-50"
              onClick={() => push("Account deactivation is disabled in demo mode.", "info")}
            >
              Deactivate Account
            </Button>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}
