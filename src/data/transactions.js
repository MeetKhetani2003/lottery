// Mock wallet transactions — frontend demo data only.
export const transactions = [
  { id: "TXN-9081", title: "Ticket Purchase", subtitle: "Festival Special · HL-2026-4821", date: "02 Sep 2026", time: "4:12 PM", amount: -500, type: "debit", status: "success", method: "Wallet" },
  { id: "TXN-9076", title: "Wallet Credit", subtitle: "UPI · HDFC Bank", date: "02 Sep 2026", time: "11:40 AM", amount: 2000, type: "credit", status: "success", method: "UPI" },
  { id: "TXN-9064", title: "Ticket Purchase", subtitle: "State Special · HL-2026-3762", date: "01 Sep 2026", time: "7:05 PM", amount: -200, type: "debit", status: "success", method: "Wallet" },
  { id: "TXN-9052", title: "Prize Credited", subtitle: "Kerala Weekly · 2nd Prize", date: "07 Sep 2026", time: "8:20 PM", amount: 100000, type: "credit", status: "success", method: "Bank" },
  { id: "TXN-9044", title: "Ticket Purchase", subtitle: "Gold Rush Draw · HL-2026-3410", date: "25 Aug 2026", time: "6:48 PM", amount: -250, type: "debit", status: "success", method: "Wallet" },
  { id: "TXN-9031", title: "Wallet Credit", subtitle: "Card · Visa ending 4421", date: "24 Aug 2026", time: "3:15 PM", amount: 5000, type: "credit", status: "success", method: "Card" },
  { id: "TXN-9025", title: "Ticket Purchase", subtitle: "Punjab Weekly · HL-2026-3887", date: "29 Aug 2026", time: "5:30 PM", amount: -100, type: "debit", status: "success", method: "Wallet" },
  { id: "TXN-9010", title: "Ticket Purchase", subtitle: "Kerala Weekly · HL-2026-3904", date: "30 Aug 2026", time: "9:02 AM", amount: -50, type: "debit", status: "success", method: "Wallet" },
];

export const txnStatusMeta = {
  success: { label: "Success", classes: "bg-emerald-soft text-emerald-deep ring-1 ring-emerald-brand/20" },
  pending: { label: "Pending", classes: "bg-gold-soft/50 text-gold-deep ring-1 ring-gold/40" },
  failed: { label: "Failed", classes: "bg-red-50 text-danger ring-1 ring-red-200" },
};
