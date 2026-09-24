import { Modal } from "../common/Feedback";
import { Field, Input } from "../common/ui";
import { useToast } from "../../context/ToastContext";
import { useState } from "react";

const QUICK_AMOUNTS = [500, 1000, 2000, 5000];

/* ---------- Add Money Modal ---------- */
export function AddMoneyModal({ open, onClose, onAdded }) {
  const [selected, setSelected] = useState(1000);
  const [custom, setCustom] = useState("");
  const [step, setStep] = useState("amount");
  const { push } = useToast();

  const amount = custom ? Number(custom) : selected;

  const reset = () => {
    setStep("amount");
    setCustom("");
    setSelected(1000);
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (!amount || amount < 100) return;
    onAdded?.(amount);
    push(`₹${amount.toLocaleString("en-IN")} added to your wallet`, "success");
    reset();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Money" sub="Demo wallet top-up. No real payment is processed.">
      {step === "amount" ? (
        <form onSubmit={handleContinue} className="space-y-5">
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {QUICK_AMOUNTS.map((a) => (
              <button
                type="button"
                key={a}
                onClick={() => {
                  setSelected(a);
                  setCustom("");
                }}
                className={`h-14 rounded-[14px] border text-sm font-semibold transition-all ${
                  !custom && selected === a
                    ? "border-emerald-brand bg-emerald-soft text-emerald-deep shadow-[0_4px_14px_-6px_rgba(11,122,90,0.4)]"
                    : "border-line bg-white text-ink hover:border-emerald-brand/40"
                }`}
              >
                ₹{a.toLocaleString("en-IN")}
              </button>
            ))}
          </div>

          <Field label="Custom Amount" hint="Minimum ₹100">
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted">₹</span>
              <Input
                type="number"
                min="100"
                placeholder="Enter amount"
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
                className="pl-8"
              />
            </div>
          </Field>

          <div className="flex items-center justify-between rounded-[14px] bg-offwhite px-4 py-3">
            <span className="text-[13px] text-muted">You will add</span>
            <span className="font-display text-lg font-semibold text-ink">₹{(amount || 0).toLocaleString("en-IN")}</span>
          </div>

          <button
            type="submit"
            disabled={!amount || amount < 100}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-[12px] bg-emerald-brand text-sm font-semibold text-white shadow-[0_6px_16px_-6px_rgba(11,122,90,0.5)] transition-all hover:-translate-y-0.5 hover:bg-emerald-deep disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0"
          >
            Continue
          </button>
        </form>
      ) : (
        <div className="py-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gold-soft/60">
            <svg className="h-8 w-8 text-gold-deep" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h4 className="mt-4 font-display text-lg font-semibold text-ink">Demo Mode</h4>
          <p className="mx-auto mt-2 max-w-xs text-[13px] leading-relaxed text-muted">
            Payment gateway integration will be connected in the next development phase.
          </p>
          <button
            onClick={() => {
              reset();
              onClose();
            }}
            className="mt-6 h-11 rounded-[12px] bg-ink px-6 text-sm font-medium text-white transition-colors hover:bg-ink-soft"
          >
            Done
          </button>
        </div>
      )}
    </Modal>
  );
}

/* ---------- Withdraw Modal ---------- */
export function WithdrawModal({ open, onClose, onWithdraw }) {
  const [form, setForm] = useState({ amount: "", upi: "", account: "" });
  const [errors, setErrors] = useState({});
  const [done, setDone] = useState(false);
  const { push } = useToast();

  const validate = () => {
    const e = {};
    if (!form.amount || Number(form.amount) < 100) e.amount = "Enter a valid amount (min ₹100)";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.upi)) e.upi = "Enter a valid UPI ID";
    if (form.account.replace(/\s/g, "").length < 9) e.account = "Enter a valid account number";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    onWithdraw?.(Number(form.amount));
    push("Withdrawal request submitted — demo mode", "info");
    setDone(true);
  };

  const reset = () => {
    setForm({ amount: "", upi: "", account: "" });
    setErrors({});
    setDone(false);
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        reset();
        onClose();
      }}
      title="Withdraw Money"
      sub="Demo withdrawal. No real money will be transferred."
    >
      {!done ? (
        <form onSubmit={submit} className="space-y-4">
          <Field label="Amount" error={errors.amount} hint="Minimum ₹100">
            <div className="relative">
              <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted">₹</span>
              <Input
                type="number"
                placeholder="0"
                value={form.amount}
                onChange={(e) => setForm({ ...form, amount: e.target.value })}
                className="pl-8"
                error={!!errors.amount}
              />
            </div>
          </Field>
          <Field label="UPI ID" error={errors.upi}>
            <Input
              placeholder="name@bank"
              value={form.upi}
              onChange={(e) => setForm({ ...form, upi: e.target.value })}
              error={!!errors.upi}
            />
          </Field>
          <Field label="Bank Account Number" error={errors.account}>
            <Input
              placeholder="Account number"
              inputMode="numeric"
              value={form.account}
              onChange={(e) => setForm({ ...form, account: e.target.value })}
              error={!!errors.account}
            />
          </Field>
          <button
            type="submit"
            className="flex h-12 w-full items-center justify-center rounded-[12px] bg-ink text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
          >
            Continue
          </button>
          <p className="rounded-xl bg-offwhite px-4 py-3 text-center text-xs leading-relaxed text-muted">
            Demo mode — withdrawal processing is simulated for this prototype.
          </p>
        </form>
      ) : (
        <div className="py-6 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-soft">
            <svg className="h-8 w-8 text-emerald-brand" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h4 className="mt-4 font-display text-lg font-semibold text-ink">Request Received</h4>
          <p className="mx-auto mt-2 max-w-xs text-[13px] leading-relaxed text-muted">
            Your withdrawal request has been recorded in demo mode. No real transfer will occur.
          </p>
          <button
            onClick={() => {
              reset();
              onClose();
            }}
            className="mt-6 h-11 rounded-[12px] bg-emerald-brand px-6 text-sm font-medium text-white transition-colors hover:bg-emerald-deep"
          >
            Done
          </button>
        </div>
      )}
    </Modal>
  );
}
