import { createContext, useCallback, useContext, useMemo, useRef, useState } from "react";
import { CheckCircle2, Info, X, XCircle } from "lucide-react";

const ToastContext = createContext(null);

let toastId = 0;

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const timers = useRef({});

  const dismiss = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id));
    clearTimeout(timers.current[id]);
  }, []);

  const push = useCallback(
    (message, tone = "success") => {
      const id = ++toastId;
      setToasts((t) => [...t, { id, message, tone }]);
      timers.current[id] = setTimeout(() => dismiss(id), 4200);
    },
    [dismiss]
  );

  const value = useMemo(() => ({ push, dismiss }), [push, dismiss]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="pointer-events-none fixed bottom-5 right-5 z-[100] flex w-[calc(100vw-2.5rem)] max-w-sm flex-col gap-2.5">
        {toasts.map((t) => (
          <div
            key={t.id}
            className="pointer-events-auto flex items-start gap-3 rounded-xl border border-line bg-white p-3.5 shadow-lift"
          >
            <span
              className={
                t.tone === "error"
                  ? "mt-0.5 text-danger"
                  : t.tone === "info"
                    ? "mt-0.5 text-muted"
                    : "mt-0.5 text-emerald-brand"
              }
            >
              {t.tone === "error" ? (
                <XCircle className="h-5 w-5" />
              ) : t.tone === "info" ? (
                <Info className="h-5 w-5" />
              ) : (
                <CheckCircle2 className="h-5 w-5" />
              )}
            </span>
            <p className="flex-1 text-[13px] leading-snug text-ink">{t.message}</p>
            <button
              onClick={() => dismiss(t.id)}
              className="rounded-md p-1 text-muted transition-colors hover:bg-offwhite hover:text-ink"
              aria-label="Dismiss"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
}
