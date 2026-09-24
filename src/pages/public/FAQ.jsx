import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HelpCircle, Plus } from "lucide-react";
import { Section, SectionHeading } from "../../components/common/ui";
import { Reveal } from "../../components/common/Reveal";

const faqs = [
  {
    q: "How do I view available lotteries?",
    a: "Head to the Lotteries page from the navigation bar. You'll see every active draw with its type, ticket price, draw schedule and availability. Use the filters to browse weekly or special draws, and tap any card to see the full prize structure before buying.",
  },
  {
    q: "How can I check results?",
    a: "Every published draw appears on the Results page with its winning number, draw date and full prize structure. If you're signed in, your dashboard also shows results linked to your tickets, so you can see at a glance how each of your tickets performed.",
  },
  {
    q: "How do I manage my tickets?",
    a: "Once signed in, your tickets live in the My Tickets section of your dashboard. Each ticket shows its number, draw date, price and status — Active, Completed or Result Out. You can filter by status and view the perforated digital ticket card at any time.",
  },
  {
    q: "How does the wallet work?",
    a: "The wallet is your demo balance for purchasing tickets. You can add money, view your balance with a live animated counter, and track every credit and debit in the Transactions section. In this prototype, wallet actions are fully simulated — no real payments occur.",
  },
  {
    q: "How can I update my profile?",
    a: "Open your profile from the sidebar or the top-right menu. You can update your name, mobile number and email, and manage your session from the same page. All changes are saved locally in this demo environment.",
  },
  {
    q: "Is this a real lottery platform?",
    a: "No. Howladar Lottery Agency in this form is a frontend design prototype. All data — lotteries, tickets, results and wallet balances — is mock data used to demonstrate a premium user experience. No real lottery purchases, payments or prizes are involved.",
  },
];

function Item({ faq, open, onToggle, index }) {
  return (
    <div className={`overflow-hidden rounded-[18px] border transition-colors ${open ? "border-emerald-brand/30 bg-white" : "border-line bg-white hover:border-emerald-brand/20"}`}>
      <button
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-display text-xs font-bold transition-colors ${open ? "bg-emerald-brand text-white" : "bg-emerald-soft text-emerald-deep"}`}>
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex-1 text-[15px] font-semibold text-ink">{faq.q}</span>
        <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.25 }} className={open ? "text-emerald-brand" : "text-muted"}>
          <Plus className="h-4.5 w-4.5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="px-6 pb-6 pl-[4.25rem] text-sm leading-relaxed text-muted">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [open, setOpen] = useState(0);
  return (
    <div className="pb-24">
      <section className="border-b border-line bg-white">
        <Section className="py-14 text-center lg:py-20">
          <Reveal>
            <SectionHeading
              eyebrow="Help Centre"
              title="Frequently Asked Questions"
              sub="Everything you need to know about browsing draws, managing tickets and using your wallet."
            />
          </Reveal>
        </Section>
      </section>

      <Section className="max-w-3xl pt-12 lg:pt-16">
        <Reveal className="mb-8 flex items-center gap-3 rounded-2xl bg-emerald-soft/60 px-5 py-4 ring-1 ring-emerald-brand/20">
          <HelpCircle className="h-5 w-5 shrink-0 text-emerald-deep" />
          <p className="text-[13px] leading-relaxed text-emerald-deep">
            Can't find your answer? <a href="/contact" className="font-semibold underline underline-offset-2">Contact our team</a> —
            we reply within one business day.
          </p>
        </Reveal>

        <div className="space-y-3.5">
          {faqs.map((f, i) => (
            <Reveal key={f.q} delay={i * 0.05}>
              <Item faq={f} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} index={i} />
            </Reveal>
          ))}
        </div>
      </Section>
    </div>
  );
}
