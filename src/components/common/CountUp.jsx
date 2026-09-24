import { useCountUp } from "../../hooks/useCountUp";
import { formatINR } from "../../utils/cn";

export function CountUp({ value, prefix = "", duration = 1600, className }) {
  const n = useCountUp(value, duration);
  return <span className={className}>{prefix}{formatINR(n)}</span>;
}

export function CountUpRaw({ value, duration = 1600, className }) {
  const n = useCountUp(value, duration);
  return <span className={className}>{n.toLocaleString("en-IN")}</span>;
}
