import type { Transition, Variants } from "framer-motion";

export const ease = {
  outQuart: [0.22, 1, 0.36, 1] as const,
  outExpo: [0.16, 1, 0.3, 1] as const,
  inOutQuart: [0.76, 0, 0.24, 1] as const,
};

export const springSoft: Transition = { type: "spring", stiffness: 100, damping: 20, mass: 1 };
export const springSnap: Transition = { type: "spring", stiffness: 400, damping: 30, mass: 0.6 };

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.outQuart },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: ease.outQuart } },
};

export const staggerChildren = (delay = 0.06): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: delay, delayChildren: 0.05 } },
});

export const wordStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

export const wordChild: Variants = {
  hidden: { opacity: 0, y: "50%" },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: ease.outExpo },
  },
};
