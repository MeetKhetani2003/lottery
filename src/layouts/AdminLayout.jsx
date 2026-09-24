import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  BarChart3,
  Cog,
  Menu,
  Receipt,
  Search,
  Settings,
  Ticket,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { adminUser } from "../data/users";

const nav = [
  { to: "/admin", label: "Dashboard", icon: BarChart3, end: true },
  { to: "/admin/lotteries", label: "Lotteries", icon: Ticket },
  { to: "/admin/tickets", label: "Tickets", icon: Receipt },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/wallet", label: "Wallet", icon: Wallet },
  { to: "/admin/results", label: "Results", icon: BarChart3 },
];

const titles = {
  "/admin": "Dashboard",
  "/admin/lotteries": "Lottery Management",
  "/admin/tickets": "Ticket Management",
  "/admin/customers": "Customer Management",
  "/admin/wallet": "Wallet & Transactions",
  "/admin/results": "Result Publishing",
  "/admin/settings": "Platform Settings",
};

function AdminSide({ onNavigate }) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  return (
    <div className="flex h-full flex-col bg-ink text-white">
      <div className="flex items-center gap-2.5 px-5 pt-6">
        <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-gradient-to-br from-emerald-deep to-emerald-brand">
          <TicketMark />
        </span>
        <span className="leading-tight">
          <span className="block font-display text-[15px] font-semibold">Howladar</span>
          <span className="block text-[10px] uppercase tracking-[0.14em] text-white/50">Admin Console</span>
        </span>
      </div>
      <nav className="mt-8 flex-1 space-y-1 px-3">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                isActive ? "bg-white/10 text-white" : "text-white/60 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`h-[18px] w-[18px] ${isActive ? "text-gold" : "text-white/50"}`} />
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 pb-4">
        <Link
          to="/admin/settings"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-white"
        >
          <Settings className="h-[18px] w-[18px]" /> Settings
        </Link>
        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-white/60 transition-colors hover:bg-white/5 hover:text-red-400"
        >
          <X className="h-[18px] w-[18px]" /> Logout
        </button>
      </div>
      <div className="mx-3 mb-3 rounded-[16px] border border-white/10 bg-white/5 p-3.5">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-xs font-bold text-ink">
            {adminUser.name.split(" ").map((w) => w[0]).join("")}
          </span>
          <div>
            <p className="text-sm font-semibold">{adminUser.name}</p>
            <p className="text-[11px] text-white/50">{adminUser.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TicketMark() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-gold" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2a2.5 2.5 0 0 0 0 5v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2a2.5 2.5 0 0 0 0-5Z" />
      <path d="M13 5v2M13 11v2M13 17v2" strokeDasharray="2 2" />
    </svg>
  );
}

export function AdminLayout() {
  const [drawer, setDrawer] = useState(false);
  const location = useLocation();
  const title = titles[location.pathname] || "Admin";

  return (
    <div className="flex min-h-screen bg-[#F4F7F6]">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[248px] lg:block">
        <AdminSide />
      </aside>

      <AnimatePresence>
        {drawer && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDrawer(false)} className="fixed inset-0 z-50 bg-ink/50 lg:hidden" />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 w-[260px] lg:hidden"
            >
              <button onClick={() => setDrawer(false)} className="absolute right-4 top-5 z-10 rounded-lg p-1.5 text-white/70 hover:bg-white/10" aria-label="Close">
                <X className="h-5 w-5" />
              </button>
              <AdminSide onNavigate={() => setDrawer(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-h-screen flex-1 flex-col lg:pl-[248px]">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white px-4 sm:px-6">
          <button onClick={() => setDrawer(true)} className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-ink lg:hidden" aria-label="Open menu">
            <Menu className="h-[18px] w-[18px]" />
          </button>
          <div>
            <h1 className="font-display text-lg font-semibold tracking-tight text-ink">{title}</h1>
            <p className="hidden text-xs text-muted sm:block">Howladar Lottery Agency · Admin Console</p>
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-2 rounded-xl border border-line bg-offwhite px-3.5 py-2 sm:flex">
              <Search className="h-4 w-4 text-muted" />
              <input placeholder="Search…" className="w-40 bg-transparent text-sm outline-none placeholder:text-muted" />
            </div>
            <span className="hidden items-center gap-1.5 rounded-full bg-emerald-soft px-3 py-1.5 text-xs font-semibold text-emerald-deep md:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-brand" /> Live
            </span>
          </div>
        </header>
        <main className="mx-auto w-full max-w-[1400px] flex-1 px-4 py-6 sm:px-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
