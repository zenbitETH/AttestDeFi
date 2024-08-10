import { StepperPaneltem } from "./StepperPaneltem";
import { Variants, motion } from "framer-motion";

const navVariant: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.7,
    },
  },
};

export default function StepperPanel({ step }: { step: number }) {
  return (
    <motion.nav
      variants={navVariant}
      initial="initial"
      animate="animate"
      className="bg-gradient-to-t from-bit to-zen fixed left-48 top-1/2 -translate-y-1/2  font-oxy flex w-full md:z-50 justify-center 
                   md:flex-col px-2 py-16 md:space-x-0 md:space-y-11 md:w-[290px] md:justify-start rounded-md text-white"
    >
      <StepperPaneltem step="1" type="Attest Network" on={step === 1} />
      <StepperPaneltem step="2" type="Schema ID" on={step === 2} />
      <StepperPaneltem step="3" type="Attester Address" on={step === 3} />

      <StepperPaneltem step="4" type="Distribution Network" on={step === 4} />
      <StepperPaneltem step="5" type="Reward token" on={step === 5} />

      <StepperPaneltem step="6" type="Verify & Send" on={step === 6} />
    </motion.nav>
  );
}
