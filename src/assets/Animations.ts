import type { Variants } from "motion";

export const popup_variant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
    },
  },
};

export const Text_fade_in_variant: Variants = {
  hidden: { width: 0 },
  visible: {
    width: "100%",
    transition: {
      ease: "easeInOut",
      duration: 1.5,
    },
  },
};
