import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Home } from "lucide-react";
import { ButtonLink } from "../../components/common/ui";
import { NotFoundArt } from "../../components/common/Feedback";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden px-5 py-20">
      <div className="bg-ticket-pattern pointer-events-none absolute inset-0 opacity-[0.05]" />
      <div className="pointer-events-none absolute -right-24 top-16 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
      <div className="pointer-events-none absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-emerald-brand/15 blur-3xl" />
      <div className="relative max-w-lg text-center">
        <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }}>
          <NotFoundArt />
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 font-display text-sm font-bold uppercase tracking-[0.3em] text-gold-deep"
        >
          Error 404
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28, duration: 0.5 }}
          className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
        >
          Looks like this ticket doesn't exist.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.36, duration: 0.5 }}
          className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-muted"
        >
          The page you're looking for may have been moved, renamed, or perhaps it was never drawn at all.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44, duration: 0.5 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <ButtonLink to="/" size="lg" className="group">
            <Home className="h-4.5 w-4.5" />
            Back to Home
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
          </ButtonLink>
          <ButtonLink to="/lotteries" size="lg" variant="outline">
            Browse Lotteries
          </ButtonLink>
        </motion.div>
      </div>
    </div>
  );
}
