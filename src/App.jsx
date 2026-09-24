import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { AuthProvider, useAuth } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { PublicLayout } from "./layouts/PublicLayout";
import { DashboardLayout } from "./layouts/DashboardLayout";
import { AdminLayout } from "./layouts/AdminLayout";

import Home from "./pages/public/Home";
import Lotteries from "./pages/public/Lotteries";
import LotteryDetail from "./pages/public/LotteryDetail";
import Results from "./pages/public/Results";
import ResultDetail from "./pages/public/ResultDetail";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import FAQ from "./pages/public/FAQ";
import Auth from "./pages/public/Auth";
import NotFound from "./pages/public/NotFound";

import DashboardHome from "./pages/dashboard/DashboardHome";
import MyTickets from "./pages/dashboard/MyTickets";
import WalletPage from "./pages/dashboard/WalletPage";
import TransactionsPage from "./pages/dashboard/TransactionsPage";
import DashboardResults from "./pages/dashboard/DashboardResults";
import NotificationsPage from "./pages/dashboard/NotificationsPage";
import { ProfilePage, SettingsPage } from "./pages/dashboard/AccountPages";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLotteries from "./pages/admin/AdminLotteries";
import { AdminTickets, AdminCustomers, AdminWallet } from "./pages/admin/AdminTables";
import AdminResults from "./pages/admin/AdminResults";
import AdminSettings from "./pages/admin/AdminSettings";

/* ---------- Scroll to top on route change ---------- */
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
  }, [pathname]);
  return null;
}

/* ---------- Page transition wrapper ---------- */
function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------- Auth guards ---------- */
function RequireCustomer({ children }) {
  const { isLoggedIn, user } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (user?.role !== "customer") return <Navigate to="/admin" replace />;
  return children;
}

function RequireAdmin({ children }) {
  const { isLoggedIn, user } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (user?.role !== "admin") return <Navigate to="/dashboard" replace />;
  return children;
}

function GuestOnly({ children }) {
  const { isLoggedIn, user } = useAuth();
  if (isLoggedIn) return <Navigate to={user?.role === "admin" ? "/admin" : "/dashboard"} replace />;
  return children;
}

/* ---------- Route trees ---------- */
function PublicRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Page><Home /></Page>} />
        <Route path="/lotteries" element={<Page><Lotteries /></Page>} />
        <Route path="/lotteries/:id" element={<Page><LotteryDetail /></Page>} />
        <Route path="/results" element={<Page><Results /></Page>} />
        <Route path="/results/:id" element={<Page><ResultDetail /></Page>} />
        <Route path="/about" element={<Page><About /></Page>} />
        <Route path="/contact" element={<Page><Contact /></Page>} />
        <Route path="/faq" element={<Page><FAQ /></Page>} />
        <Route path="/login" element={<GuestOnly><Page><Auth mode="login" /></Page></GuestOnly>} />
        <Route path="/register" element={<GuestOnly><Page><Auth mode="register" /></Page></GuestOnly>} />
        <Route path="*" element={<Page><NotFound /></Page>} />
      </Route>
    </Routes>
  );
}

function DashboardRoutes() {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route index element={<Page><DashboardHome /></Page>} />
        <Route path="tickets" element={<Page><MyTickets /></Page>} />
        <Route path="wallet" element={<Page><WalletPage /></Page>} />
        <Route path="transactions" element={<Page><TransactionsPage /></Page>} />
        <Route path="results" element={<Page><DashboardResults /></Page>} />
        <Route path="notifications" element={<Page><NotificationsPage /></Page>} />
        <Route path="profile" element={<Page><ProfilePage /></Page>} />
        <Route path="settings" element={<Page><SettingsPage /></Page>} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Page><AdminDashboard /></Page>} />
        <Route path="lotteries" element={<Page><AdminLotteries /></Page>} />
        <Route path="tickets" element={<Page><AdminTickets /></Page>} />
        <Route path="customers" element={<Page><AdminCustomers /></Page>} />
        <Route path="wallet" element={<Page><AdminWallet /></Page>} />
        <Route path="results" element={<Page><AdminResults /></Page>} />
        <Route path="settings" element={<Page><AdminSettings /></Page>} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  const location = useLocation();
  return (
    <AuthProvider>
      <ToastProvider>
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/dashboard/*" element={<RequireCustomer><DashboardRoutes /></RequireCustomer>} />
            <Route path="/admin/*" element={<RequireAdmin><AdminRoutes /></RequireAdmin>} />
            <Route path="/*" element={<PublicRoutes />} />
          </Routes>
        </AnimatePresence>
      </ToastProvider>
    </AuthProvider>
  );
}
