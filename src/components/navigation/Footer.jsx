import { Link } from "react-router-dom";
import { AtSign, Globe, Hash, Mail, MessageCircle } from "lucide-react";
import { Logo, TicketMark } from "../common/ui";

const cols = [
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "How It Works", to: "/about" },
      { label: "Contact", to: "/contact" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Lotteries",
    links: [
      { label: "All Lotteries", to: "/lotteries" },
      { label: "Weekly Draws", to: "/lotteries?category=weekly" },
      { label: "Special Draws", to: "/lotteries?category=special" },
      { label: "Results", to: "/results" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "My Tickets", to: "/dashboard/tickets" },
      { label: "Wallet", to: "/dashboard/wallet" },
      { label: "Notifications", to: "/dashboard/notifications" },
      { label: "Help Centre", to: "/faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Terms of Service", to: "/faq" },
      { label: "Privacy Policy", to: "/faq" },
      { label: "Responsible Play", to: "/faq" },
      { label: "Grievance Redressal", to: "/contact" },
    ],
  },
];

const socials = [
  { icon: AtSign, label: "Instagram" },
  { icon: Hash, label: "Twitter" },
  { icon: MessageCircle, label: "Facebook" },
  { icon: Mail, label: "YouTube" },
  { icon: Globe, label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="bg-ticket-pattern pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-emerald-brand/20 blur-3xl" />

      <div className="relative mx-auto w-full max-w-7xl px-5 pb-10 pt-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_2fr]">
          <div>
            <Logo dark />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">
              Howladar Lottery Agency is a premium digital platform to explore lottery draws, manage your tickets and stay
              connected with every result — simply, transparently and securely.
            </p>
            <div className="mt-6 flex items-center gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/60 transition-all hover:border-gold/50 hover:bg-white/5 hover:text-gold"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {cols.map((col) => (
              <div key={col.title}>
                <h4 className="text-[13px] font-semibold uppercase tracking-[0.12em] text-white/50">{col.title}</h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="text-sm text-white/70 transition-colors hover:text-gold">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-7 sm:flex-row">
          <p className="flex items-center gap-2 text-xs text-white/40">
            <TicketMark className="h-3.5 w-3.5" />© 2026 Howladar Lottery Agency. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5 text-xs text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            Demo prototype — no real lottery or payment activity
          </p>
        </div>
      </div>
    </footer>
  );
}
