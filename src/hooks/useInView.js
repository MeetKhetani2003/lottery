import { useEffect, useRef, useState } from "react";

export function useInView(options = { once: true, margin: "-60px" }) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setInView(true);
        if (options.once) obs.disconnect();
      } else if (!options.once) {
        setInView(false);
      }
    }, { threshold: 0.15, rootMargin: options.margin });
    obs.observe(el);
    return () => obs.disconnect();
  }, [options.once, options.margin]);

  return [ref, inView];
}
