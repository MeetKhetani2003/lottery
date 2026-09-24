import { motion } from "framer-motion";
import { useInView } from "../../hooks/useInView";
import { cn } from "../../utils/cn";

export function Reveal({ children, className, delay = 0, y = 24, as = "div" }) {
  const [ref, inView] = useInView();
  const MotionTag = motion[as] || motion.div;
  return (
    <MotionTag
      ref={ref}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={cn(className)}
    >
      {children}
    </MotionTag>
  );
}

export function RevealGroup({ children, className, stagger = 0.08 }) {
  const [ref, inView] = useInView();
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({ children, className, y = 20 }) {
  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y }, show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } } }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
