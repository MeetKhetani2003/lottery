import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, CheckCheck, Gift, Sparkles, Trophy, User, Wallet, CalendarDays } from "lucide-react";
import { Card, Button } from "../../components/common/ui";
import { Reveal } from "../../components/common/Reveal";
import { notifications } from "../../data/notifications";
import { useToast } from "../../context/ToastContext";

const iconMap = { calendar: CalendarDays, trophy: Trophy, wallet: Wallet, gift: Gift, sparkles: Sparkles, user: User };

export default function NotificationsPage() {
  const [items, setItems] = useState(notifications);
  const { push } = useToast();
  const unread = items.filter((n) => n.unread).length;

  const markAllRead = () => {
    setItems(items.map((n) => ({ ...n, unread: false })));
    push("All notifications marked as read.", "success");
  };

  return (
    <div className="space-y-6">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink">Notifications</h1>
            <p className="mt-1 text-sm text-muted">
              {unread > 0 ? `You have ${unread} unread notification${unread > 1 ? "s" : ""}.` : "You're all caught up."}
            </p>
          </div>
          {unread > 0 && (
            <Button variant="outline" size="sm" onClick={markAllRead}>
              <CheckCheck className="h-4 w-4" /> Mark all read
            </Button>
          )}
        </div>
      </Reveal>

      <div className="space-y-3">
        {items.map((n, i) => {
          const Icon = iconMap[n.icon] || Bell;
          return (
            <Reveal key={n.id} delay={i * 0.05}>
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-start gap-4 rounded-[18px] border p-5 transition-colors ${
                  n.unread ? "border-emerald-brand/25 bg-emerald-soft/40" : "border-line bg-white"
                }`}
              >
                <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${n.unread ? "bg-emerald-brand text-white" : "bg-emerald-soft text-emerald-deep"}`}>
                  <Icon className="h-4.5 w-4.5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-ink">{n.title}</p>
                    {n.unread && <span className="h-2 w-2 shrink-0 rounded-full bg-gold" />}
                  </div>
                  <p className="mt-1 text-[13px] leading-relaxed text-muted">{n.message}</p>
                  <p className="mt-2 text-[11px] font-medium text-muted">{n.time}</p>
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
