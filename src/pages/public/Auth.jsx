import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Loader2, ShieldCheck, Sparkles } from "lucide-react";
import { Button, Field, Input } from "../../components/common/ui";
import { useToast } from "../../context/ToastContext";
import { useAuth, DEMO_CREDENTIALS } from "../../context/AuthContext";

/* ================= Login ================= */
function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { push } = useToast();
  const [form, setForm] = useState({ mobile: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!/^[6-9]\d{9}$/.test(form.mobile)) err.mobile = "Enter a valid 10-digit mobile number";
    if (!form.password) err.password = "Enter your password";
    setErrors(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    setTimeout(() => {
      if (form.mobile === DEMO_CREDENTIALS.customer.mobile && form.password === DEMO_CREDENTIALS.customer.password) {
        login("customer");
        push("Welcome back — signed in as demo customer.", "success");
        navigate("/dashboard");
      } else {
        setLoading(false);
        push("Invalid credentials. Use the demo account details below.", "error");
      }
    }, 700);
  };

  return (
    <form onSubmit={submit} className="space-y-5" noValidate>
      <Field label="Mobile Number" error={errors.mobile}>
        <Input
          value={form.mobile}
          onChange={(e) => setForm({ ...form, mobile: e.target.value })}
          placeholder="99999 99999"
          inputMode="numeric"
          error={!!errors.mobile}
        />
      </Field>
      <Field label="Password" error={errors.password}>
        <div className="relative">
          <Input
            type={showPw ? "text" : "password"}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="Enter your password"
            error={!!errors.password}
            className="pr-11"
          />
          <button
            type="button"
            onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted hover:text-ink"
            aria-label={showPw ? "Hide password" : "Show password"}
          >
            {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </Field>

      <div className="flex items-center justify-between text-[13px]">
        <label className="flex cursor-pointer items-center gap-2 text-muted">
          <input type="checkbox" className="h-4 w-4 rounded border-line accent-emerald-brand" defaultChecked />
          Remember me
        </label>
        <a href="#" onClick={(e) => e.preventDefault()} className="font-medium text-emerald-deep hover:underline">
          Forgot password?
        </a>
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Signing in…
          </>
        ) : (
          <>
            Sign In <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

/* ================= Register ================= */
function RegisterForm() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { push } = useToast();
  const [form, setForm] = useState({ name: "", mobile: "", email: "", password: "", confirm: "", terms: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = "Please enter your full name";
    if (!/^[6-9]\d{9}$/.test(form.mobile)) err.mobile = "Enter a valid 10-digit mobile number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = "Enter a valid email address";
    if (form.password.length < 6) err.password = "Password must be at least 6 characters";
    if (form.confirm !== form.password) err.confirm = "Passwords do not match";
    if (!form.terms) err.terms = "Please accept the terms to continue";
    setErrors(err);
    if (Object.keys(err).length) return;
    setLoading(true);
    setTimeout(() => {
      login("customer");
      push("Account created — welcome to Howladar (demo).", "success");
      navigate("/dashboard");
    }, 800);
  };

  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <Field label="Full Name" error={errors.name}>
        <Input value={form.name} onChange={set("name")} placeholder="Arjun Krishna" error={!!errors.name} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Mobile Number" error={errors.mobile}>
          <Input value={form.mobile} onChange={set("mobile")} placeholder="98470 00000" inputMode="numeric" error={!!errors.mobile} />
        </Field>
        <Field label="Email" error={errors.email}>
          <Input type="email" value={form.email} onChange={set("email")} placeholder="you@example.com" error={!!errors.email} />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Password" error={errors.password}>
          <Input type="password" value={form.password} onChange={set("password")} placeholder="Min. 6 characters" error={!!errors.password} />
        </Field>
        <Field label="Confirm Password" error={errors.confirm}>
          <Input type="password" value={form.confirm} onChange={set("confirm")} placeholder="Re-enter password" error={!!errors.confirm} />
        </Field>
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-2.5 text-[13px] text-muted">
          <input
            type="checkbox"
            checked={form.terms}
            onChange={(e) => setForm({ ...form, terms: e.target.checked })}
            className="mt-0.5 h-4 w-4 rounded border-line accent-emerald-brand"
          />
          I agree to the <a href="#" onClick={(e) => e.preventDefault()} className="font-medium text-emerald-deep hover:underline">Terms of Service</a> and{" "}
          <a href="#" onClick={(e) => e.preventDefault()} className="font-medium text-emerald-deep hover:underline">Privacy Policy</a>
        </label>
        {errors.terms && <p className="mt-1.5 text-xs font-medium text-danger">{errors.terms}</p>}
      </div>
      <Button type="submit" size="lg" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Creating account…
          </>
        ) : (
          <>
            Create Account <ArrowRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </form>
  );
}

/* ================= Shared brand panel ================= */
function BrandPanel() {
  return (
    <div className="relative hidden overflow-hidden bg-gradient-to-br from-emerald-deep via-[#0A4A39] to-emerald-brand lg:block">
      <div className="bg-ticket-pattern pointer-events-none absolute inset-0 opacity-10" />
      <div className="pointer-events-none absolute -left-20 top-1/4 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-16 h-96 w-96 rounded-full bg-emerald-300/20 blur-3xl" />
      <div className="relative flex h-full flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-white/10 backdrop-blur">
            <TicketIcon className="h-5.5 w-5.5 text-gold" />
          </span>
          <span className="leading-tight">
            <span className="block font-display text-[17px] font-semibold text-white">Howladar</span>
            <span className="block text-[10px] uppercase tracking-[0.16em] text-white/60">Lottery Agency</span>
          </span>
        </Link>

        <div>
          <h2 className="max-w-md font-display text-[2.2rem] font-semibold leading-[1.15] tracking-tight text-white">
            Your chance. Your ticket. <span className="text-gold">Your moment.</span>
          </h2>
          <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-white/70">
            Join thousands of players who manage their lottery journey from one beautifully simple dashboard.
          </p>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[
              { v: "128K+", l: "Players" },
              { v: "312+", l: "Draws" },
              { v: "4.9★", l: "Rating" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
                <p className="font-display text-xl font-semibold text-gold">{s.v}</p>
                <p className="mt-0.5 text-[11px] font-medium text-white/60">{s.l}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
          <ShieldCheck className="h-5 w-5 shrink-0 text-gold" />
          <p className="text-[12.5px] leading-relaxed text-white/70">
            This is a design prototype. Demo credentials only — no real accounts or payments exist.
          </p>
        </div>
      </div>
    </div>
  );
}

function TicketIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2.5 2.5 0 0 0 0 5v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2.5 2.5 0 0 0 0-5Z" />
      <path d="M13 5v2M13 11v2M13 17v2" strokeDasharray="2 2" />
    </svg>
  );
}

/* ================= Page ================= */
export default function Auth({ mode = "login" }) {
  const isLogin = mode === "login";
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <BrandPanel />
      <div className="flex items-center justify-center bg-offwhite px-5 py-16 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <Link to="/" className="mb-10 flex items-center gap-2.5 lg:hidden">
            <span className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-emerald-deep to-emerald-brand">
              <TicketIcon className="h-5.5 w-5.5 text-gold" />
            </span>
            <span className="leading-tight">
              <span className="block font-display text-[16px] font-semibold text-ink">Howladar</span>
              <span className="block text-[10px] uppercase tracking-[0.16em] text-muted">Lottery Agency</span>
            </span>
          </Link>

          <div className="flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.14em] text-emerald-brand">
            <Sparkles className="h-3.5 w-3.5" /> Demo Access
          </div>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink">
            {isLogin ? "Welcome back" : "Create your account"}
          </h1>
          <p className="mt-2 text-sm text-muted">
            {isLogin ? "Sign in to manage your tickets, wallet and results." : "It only takes a minute to join the platform."}
          </p>

          <div className="mt-8">{isLogin ? <LoginForm /> : <RegisterForm />}</div>

          <div className="mt-8 rounded-[16px] border border-gold/30 bg-gold-soft/40 p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-gold-deep">Demo Account</p>
            <div className="mt-2.5 space-y-1.5 text-[13px]">
              <p className="flex justify-between">
                <span className="text-muted">Mobile</span>
                <span className="font-mono font-semibold text-ink">{DEMO_CREDENTIALS.customer.mobile}</span>
              </p>
              <p className="flex justify-between">
                <span className="text-muted">Password</span>
                <span className="font-mono font-semibold text-ink">{DEMO_CREDENTIALS.customer.password}</span>
              </p>
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-muted">
            {isLogin ? (
              <>
                New to Howladar?{" "}
                <Link to="/register" className="font-semibold text-emerald-deep hover:underline">
                  Create an account
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-emerald-deep hover:underline">
                  Sign in
                </Link>
              </>
            )}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
