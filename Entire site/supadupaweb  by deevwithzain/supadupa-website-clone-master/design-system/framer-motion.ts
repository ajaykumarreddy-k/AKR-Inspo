import { Variants } from "framer-motion";

export const navVariants: Variants = {
  hidden: { y: "-100%", transition: { ease: [0.76, 0, 0.24, 1], duration: 1 } },
  vissible: { y: 0, transition: { ease: [0.76, 0, 0.24, 1], duration: 1, delay: 0.7 } }
};

export const opacityReveal: Variants = {
  initial: { opacity: 0 },
  enter: { opacity: 0.75, transition: { duration: 1, delay: 0.2 } },
};

export const textMaskReveal = (delayMultipler: number = 0.08): Variants => ({
  initial: { y: "100%" },
  animate: (i: number) => ({
    y: 0,
    transition: {
      delay: i * delayMultipler,
      duration: 1,
      ease: [0.4, 0, 0.2, 1],
    }
  })
});

export const lineDraw: Variants = {
  initial: { borderTopWidth: 0, width: "0%" },
  animate: { 
    borderTopWidth: 1, 
    width: "100%", 
    origin: "left",
    transition: { duration: 0.8, delay: 0.5, ease: "easeInOut" }
  }
};

export const infiniteRotate: Variants = {
  animate: {
    rotate: [-360, 360],
    transition: {
      repeat: Infinity,
      repeatType: "loop",
      duration: 20,
      ease: "linear",
    }
  }
};
