import { AnimatePresence, motion } from "framer-motion";
import { TicketMark } from "./ui";
import { cn } from "../../utils/cn";

/* ---------- Modal ---------- */
export function Modal({ open, onClose, title, sub, children, wide = false }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6" role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/50 backdrop-blur-[2px]"
          />
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className={cn(
              "relative w-full rounded-t-[22px] bg-white shadow-lift sm:rounded-[22px]",
              wide ? "sm:max-w-2xl" : "sm:max-w-md"
            )}
          >
            <div className="flex items-start justify-between gap-4 px-6 pt-6">
              <div>
                <h3 className="font-display text-lg font-semibold tracking-tight text-ink">{title}</h3>
                {sub && <p className="mt-1 text-[13px] leading-relaxed text-muted">{sub}</p>}
              </div>
              <button
                onClick={onClose}
                className="rounded-lg p-2 text-muted transition-colors hover:bg-offwhite hover:text-ink"
                aria-label="Close"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 pb-6 pt-5">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ---------- Skeletons ---------- */
export function Skeleton({ className }) {
  return <div className={cn("animate-shimmer rounded-lg bg-slate-200/70 bg-[length:200%_100%]", className)} />;
}

export function LotteryCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-[20px] border border-line bg-white p-4 shadow-card">
      <Skeleton className="h-36 w-full rounded-[14px]" />
      <div className="mt-4 space-y-2.5">
        <Skeleton className="h-4 w-2/3" />
        <Skeleton className="h-3 w-1/2" />
        <div className="mt-4 flex items-center justify-between">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-9 w-24" />
        </div>
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-[20px] border border-line bg-white p-5 shadow-card">
      <Skeleton className="h-9 w-9 rounded-xl" />
      <Skeleton className="mt-4 h-7 w-24" />
      <Skeleton className="mt-2 h-3 w-32" />
    </div>
  );
}

export function TxSkeleton() {
  return (
    <div className="flex items-center gap-3.5 border-b border-line py-3.5 last:border-0">
      <Skeleton className="h-10 w-10 rounded-xl" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3.5 w-1/3" />
        <Skeleton className="h-3 w-1/4" />
      </div>
      <Skeleton className="h-4 w-16" />
    </div>
  );
}

/* ---------- Empty state ---------- */
export function EmptyState({ title, message, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center rounded-[22px] border border-dashed border-slate-300 bg-white px-6 py-14 text-center"
    >
      <img src="/assets/images/empty-tickets.png" alt="" className="h-32 w-32 object-contain" loading="lazy" />
      <h3 className="mt-5 font-display text-lg font-semibold tracking-tight text-ink">{title}</h3>
      <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-muted">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  );
}

/* ---------- Page loading ---------- */
export function PageLoader() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <span className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-deep to-emerald-brand shadow-lg">
          <TicketMark className="h-6 w-6 animate-pulse text-gold" />
        </span>
        <p className="text-[13px] font-medium text-muted">Loading…</p>
      </div>
    </div>
  );
}

/* ---------- 404 ---------- */
export function NotFoundArt() {
  return <img src="/assets/images/404-lottery.png" alt="Lottery ticket illustration" className="mx-auto w-full max-w-xs" />;
}

/* ---------- Error state ---------- */
export function ErrorState({ onRetry }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-danger">
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" />
        </svg>
      </div>
      <h2 className="mt-5 font-display text-xl font-semibold text-ink">Something went wrong</h2>
      <p className="mt-1.5 text-sm text-muted">We couldn't load this section. Please try again.</p>
      <button
        onClick={onRetry}
        className="mt-5 inline-flex h-10 items-center rounded-[12px] bg-emerald-brand px-5 text-sm font-medium text-white transition-colors hover:bg-emerald-deep"
      >
        Try Again
      </button>
    </div>
  );
}
