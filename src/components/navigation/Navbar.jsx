import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Logo, ButtonLink } from "../common/ui";
import { cn } from "../../utils/cn";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/lotteries", label: "Lotteries" },
  { to: "/results", label: "Results" },
  { to: "/about", label: "How It Works" },
  { to: "/contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "border-b border-line bg-white/95 shadow-[0_1px_12px_rgba(15,23,32,0.06)] backdrop-blur-md" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  cn(
                    "relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors",
                    isActive ? "text-emerald-deep" : "text-muted hover:text-ink"
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-gold"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2.5 lg:flex">
            <Link
              to="/login"
              className="rounded-[12px] px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-offwhite"
            >
              Login
            </Link>
            <ButtonLink to="/register" size="sm" className="px-5">
              Create Account
            </ButtonLink>
          </div>

          <button
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-line bg-white text-ink lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-[2px] lg:hidden"
            onClick={() => setOpen(false)}
          >
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="absolute right-0 top-0 flex h-full w-[78%] max-w-xs flex-col bg-white p-6 pt-24 shadow-lift"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col gap-1">
                {links.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.05 }}
                  >
                    <NavLink
                      to={l.to}
                      end={l.end}
                      className={({ isActive }) =>
                        cn(
                          "block rounded-xl px-4 py-3 text-[15px] font-medium transition-colors",
                          isActive ? "bg-emerald-soft text-emerald-deep" : "text-ink hover:bg-offwhite"
                        )
                      }
                    >
                      {l.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
              <div className="mt-auto flex flex-col gap-2.5 border-t border-line pt-5">
                <Link to="/login" className="h-11 rounded-[12px] border border-line text-center text-sm font-medium leading-[44px] text-ink">
                  Login
                </Link>
                <ButtonLink to="/register" className="w-full">
                  Create Account
                </ButtonLink>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
