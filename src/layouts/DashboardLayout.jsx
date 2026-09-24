import { useState } from "react";
import { Link, NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  ChevronDown,
  Gift,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Receipt,
  Settings,
  Star,
  Ticket,
  User,
  Wallet,
  X,
} from "lucide-react";
import { Logo, Avatar } from "../components/common/ui";
import { notifications } from "../data/notifications";
import { useAuth } from "../context/AuthContext";

const nav = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/tickets", label: "My Tickets", icon: Ticket },
  { to: "/dashboard/wallet", label: "Wallet", icon: Wallet },
  { to: "/dashboard/transactions", label: "Transactions", icon: Receipt },
  { to: "/dashboard/results", label: "Results", icon: Star },
  { to: "/dashboard/notifications", label: "Notifications", icon: Bell },
];

const bottomNav = [
  { to: "/dashboard", label: "Home", icon: Home, end: true },
  { to: "/lotteries", label: "Lotteries", icon: Gift },
  { to: "/dashboard/tickets", label: "Tickets", icon: Ticket },
  { to: "/dashboard/wallet", label: "Wallet", icon: Wallet },
  { to: "/dashboard/profile", label: "Profile", icon: User },
];

function SidebarContent({ onNavigate }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 pt-6">
        <Logo to="/" />
      </div>
      <nav className="mt-8 flex-1 space-y-1 px-3">
        {nav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `group flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-emerald-soft text-emerald-deep"
                  : "text-muted hover:bg-offwhite hover:text-ink"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`h-[18px] w-[18px] ${isActive ? "text-emerald-brand" : "text-muted group-hover:text-ink"}`} />
                {item.label}
                {isActive && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-gold" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="px-3 pb-3">
        <Link
          to="/dashboard/settings"
          onClick={onNavigate}
          className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-offwhite hover:text-ink"
        >
          <Settings className="h-[18px] w-[18px]" /> Settings
        </Link>
        <button
          onClick={() => {
            logout();
            navigate("/");
          }}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted transition-colors hover:bg-red-50 hover:text-danger"
        >
          <LogOut className="h-[18px] w-[18px]" /> Logout
        </button>
      </div>
      <div className="mx-3 mb-3 rounded-[16px] border border-line bg-offwhite p-3.5">
        <div className="flex items-center gap-3">
          <Avatar name={user?.name || "Guest"} />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-ink">{user?.name || "Guest"}</p>
            <p className="truncate text-xs text-muted">DEMO ACCOUNT</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardLayout() {
  const [drawer, setDrawer] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const unread = notifications.filter((n) => n.unread).length;

  const currentTitle =
    nav.find((n) => (n.end ? location.pathname === n.to : location.pathname.startsWith(n.to)))?.label || "Overview";

  return (
    <div className="flex min-h-screen bg-offwhite">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-[264px] border-r border-line bg-white lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawer && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDrawer(false)}
              className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px] lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed inset-y-0 left-0 z-50 w-[280px] bg-white shadow-lift lg:hidden"
            >
              <button
                onClick={() => setDrawer(false)}
                className="absolute right-4 top-5 rounded-lg p-1.5 text-muted hover:bg-offwhite"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
              <SidebarContent onNavigate={() => setDrawer(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main */}
      <div className="flex min-h-screen flex-1 flex-col lg:pl-[264px]">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-line bg-white/90 px-4 backdrop-blur-md sm:px-6">
          <button
            onClick={() => setDrawer(true)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-line text-ink lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-[18px] w-[18px]" />
          </button>
          <h1 className="font-display text-lg font-semibold tracking-tight text-ink">{currentTitle}</h1>

          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => {
                  setNotifOpen(!notifOpen);
                  setProfileOpen(false);
                }}
                className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-line bg-white text-muted transition-colors hover:text-ink"
                aria-label="Notifications"
              >
                <Bell className="h-[18px] w-[18px]" />
                {unread > 0 && (
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-danger px-1 text-[9px] font-bold text-white">
                    {unread}
                  </span>
                )}
              </button>
              <AnimatePresence>
                {notifOpen && (
                  <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setNotifOpen(false)} className="fixed inset-0 z-40" />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      className="absolute right-0 z-50 mt-2 w-[320px] overflow-hidden rounded-2xl border border-line bg-white shadow-lift"
                    >
                      <div className="border-b border-line px-4 py-3">
                        <p className="text-sm font-semibold text-ink">Notifications</p>
                      </div>
                      <div className="max-h-72 overflow-y-auto">
                        {notifications.slice(0, 4).map((n) => (
                          <div key={n.id} className="flex gap-3 border-b border-line px-4 py-3 last:border-0 hover:bg-offwhite">
                            <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-gold" />
                            <div>
                              <p className="text-[13px] font-medium text-ink">{n.title}</p>
                              <p className="mt-0.5 text-xs leading-relaxed text-muted">{n.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Link
                        to="/dashboard/notifications"
                        onClick={() => setNotifOpen(false)}
                        className="block bg-offwhite py-2.5 text-center text-[13px] font-medium text-emerald-deep hover:bg-emerald-soft"
                      >
                        View all
                      </Link>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotifOpen(false);
                }}
                className="flex items-center gap-2 rounded-xl border border-line py-1 pl-1 pr-2 transition-colors hover:bg-offwhite"
              >
                <Avatar name={user?.name || "Guest"} size="sm" />
                <ChevronDown className="h-3.5 w-3.5 text-muted" />
              </button>
              <AnimatePresence>
                {profileOpen && (
                  <>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setProfileOpen(false)} className="fixed inset-0 z-40" />
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      className="absolute right-0 z-50 mt-2 w-56 overflow-hidden rounded-2xl border border-line bg-white shadow-lift"
                    >
                      <div className="border-b border-line px-4 py-3">
                        <p className="text-sm font-semibold text-ink">{user?.name}</p>
                        <p className="text-xs text-muted">{user?.email}</p>
                      </div>
                      <Link to="/dashboard/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink hover:bg-offwhite">
                        <User className="h-4 w-4 text-muted" /> My Profile
                      </Link>
                      <Link to="/dashboard/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-ink hover:bg-offwhite">
                        <Settings className="h-4 w-4 text-muted" /> Settings
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          navigate("/");
                        }}
                        className="flex w-full items-center gap-2.5 border-t border-line px-4 py-2.5 text-sm text-danger hover:bg-red-50"
                      >
                        <LogOut className="h-4 w-4" /> Logout
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-6 sm:px-6 lg:pb-10">
          <Outlet />
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 flex items-stretch justify-around border-t border-line bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-md lg:hidden">
        {bottomNav.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `flex flex-1 flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors ${
                isActive ? "text-emerald-deep" : "text-muted"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={`h-[19px] w-[19px] ${isActive ? "text-emerald-brand" : ""}`} />
                {item.label}
                {isActive && <span className="h-0.5 w-4 rounded-full bg-gold" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
