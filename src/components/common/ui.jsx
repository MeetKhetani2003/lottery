import { forwardRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "../../utils/cn";

/* ---------- Logo ---------- */
export function Logo({ dark = false, to = "/" }) {
  return (
    <Link to={to} className="group flex items-center gap-2.5">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-[11px] bg-gradient-to-br from-emerald-deep to-emerald-brand shadow-[0_4px_12px_-4px_rgba(11,122,90,0.5)] transition-transform duration-300 group-hover:scale-[1.04]">
        <TicketMark className="h-5 w-5 text-gold" />
      </span>
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[15px] font-semibold tracking-tight", dark ? "text-white" : "text-ink")}>
          Howladar
        </span>
        <span className={cn("text-[10px] font-medium uppercase tracking-[0.14em]", dark ? "text-white/60" : "text-muted")}>
          Lottery Agency
        </span>
      </span>
    </Link>
  );
}

export function TicketMark({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2.5 2.5 0 0 0 0 5v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2.5 2.5 0 0 0 0-5Z" />
      <path d="M13 5v2" strokeDasharray="2 2" />
      <path d="M13 11v2" strokeDasharray="2 2" />
      <path d="M13 17v2" strokeDasharray="2 2" />
    </svg>
  );
}

/* ---------- Button ---------- */
const btnBase =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-[12px] font-medium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-brand disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]";

const btnVariants = {
  primary:
    "bg-emerald-brand text-white shadow-[0_6px_16px_-6px_rgba(11,122,90,0.5)] hover:-translate-y-0.5 hover:bg-emerald-deep hover:shadow-[0_10px_22px_-8px_rgba(11,122,90,0.55)]",
  gold: "bg-gold text-ink shadow-[0_6px_16px_-6px_rgba(244,183,64,0.6)] hover:-translate-y-0.5 hover:bg-[#f0aa2a]",
  outline: "border border-line bg-white text-ink hover:border-emerald-brand/40 hover:bg-emerald-soft/60",
  ghost: "text-ink hover:bg-offwhite",
  dark: "bg-ink text-white hover:bg-ink-soft",
};

const btnSizes = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-5 text-sm",
  lg: "h-[52px] px-7 text-[15px]",
};

export const Button = forwardRef(function Button(
  { variant = "primary", size = "md", className, children, arrow = false, ...props },
  ref
) {
  return (
    <button ref={ref} className={cn(btnBase, btnVariants[variant], btnSizes[size], className)} {...props}>
      <span>{children}</span>
      {arrow && <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />}
    </button>
  );
});

export function ButtonLink({ to, variant = "primary", size = "md", className, children, arrow = false, ...props }) {
  return (
    <Link to={to} className={cn(btnBase, btnVariants[variant], btnSizes[size], "group", className)} {...props}>
      <span>{children}</span>
      {arrow ? (
        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" />
      ) : (
        <ArrowUpRight className="h-4 w-4 opacity-70" />
      )}
    </Link>
  );
}

/* ---------- Badge ---------- */
export function Badge({ tone = "emerald", className, children }) {
  const tones = {
    emerald: "bg-emerald-soft text-emerald-deep ring-emerald-brand/25",
    gold: "bg-gold-soft/60 text-gold-deep ring-gold/40",
    neutral: "bg-slate-100 text-muted ring-slate-200",
    dark: "bg-ink text-white/90 ring-white/10",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] ring-1",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}

export function StatusDot({ tone = "emerald", pulse = true }) {
  const tones = { emerald: "bg-emerald-brand", gold: "bg-gold", muted: "bg-slate-400" };
  return (
    <span className="relative flex h-2 w-2">
      {pulse && (
        <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-60", tones[tone])} />
      )}
      <span className={cn("relative inline-flex h-2 w-2 rounded-full", tones[tone])} />
    </span>
  );
}

/* ---------- Card ---------- */
export function Card({ className, children, hover = false, ...props }) {
  return (
    <div
      className={cn(
        "rounded-[20px] border border-line bg-white shadow-card",
        hover && "transition-all duration-300 hover:-translate-y-1.5 hover:border-emerald-brand/25 hover:shadow-lift",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* ---------- Section ---------- */
export function Section({ className, children, id }) {
  return (
    <section id={id} className={cn("relative mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      {children}
    </section>
  );
}

export function SectionHeading({ eyebrow, title, sub, align = "center", dark = false }) {
  return (
    <div className={cn("max-w-2xl", align === "center" ? "mx-auto text-center" : "text-left")}>
      {eyebrow && (
        <p className={cn("mb-3 text-[12px] font-semibold uppercase tracking-[0.16em]", dark ? "text-gold" : "text-emerald-brand")}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn("font-display text-3xl font-semibold tracking-tight text-balance sm:text-[2.6rem] sm:leading-[1.15]", dark ? "text-white" : "text-ink")}>
        {title}
      </h2>
      {sub && <p className={cn("mt-4 text-[15px] leading-relaxed", dark ? "text-white/70" : "text-muted")}>{sub}</p>}
    </div>
  );
}

/* ---------- Form fields ---------- */
export function Field({ label, hint, error, children, className }) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1.5 block text-[13px] font-medium text-ink">{label}</span>
      {children}
      {hint && !error && <span className="mt-1.5 block text-xs text-muted">{hint}</span>}
      {error && <span className="mt-1.5 block text-xs font-medium text-danger">{error}</span>}
    </label>
  );
}

const inputBase =
  "w-full rounded-[12px] border border-line bg-white px-3.5 text-sm text-ink placeholder:text-slate-400 transition-colors focus:border-emerald-brand focus:outline-none focus:ring-2 focus:ring-emerald-brand/15";

export function Input({ error, className, ...props }) {
  return <input className={cn(inputBase, "h-11", error && "border-danger focus:border-danger focus:ring-danger/15", className)} {...props} />;
}

export function Select({ error, className, children, ...props }) {
  return (
    <select className={cn(inputBase, "h-11 appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2364748B%22%20stroke-width%222%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22%2F%3E%3C%2Fsvg%3E')] bg-[position:right_0.9rem_center] bg-no-repeat pr-9", error && "border-danger focus:border-danger focus:ring-danger/15", className)} {...props}>
      {children}
    </select>
  );
}

export function Textarea({ error, className, rows = 4, ...props }) {
  return <textarea rows={rows} className={cn(inputBase, "py-3", error && "border-danger focus:border-danger focus:ring-danger/15", className)} {...props} />;
}

/* ---------- Avatar ---------- */
const avatarTones = ["bg-emerald-deep", "bg-emerald-brand", "bg-gold-deep", "bg-ink"];
export function Avatar({ name, size = "md", className }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  const sizeClasses = { sm: "h-8 w-8 text-[11px]", md: "h-10 w-10 text-xs", lg: "h-12 w-12 text-sm" };
  const tone = avatarTones[(name?.length || 0) % avatarTones.length];
  return (
    <span className={cn("inline-flex shrink-0 items-center justify-center rounded-full font-semibold text-white", sizeClasses[size], tone, className)}>
      {initials}
    </span>
  );
}
