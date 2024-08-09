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
      className="flex w-full pt-5 h-[170px] md:z-50 space-x-[17px] text-[16px] justify-center md:flex-col md:space-x-0 md:space-y-8  md:h-[720px] md:w-[290px] md:justify-start md:rounded-xl text-white"
    >
      <StepperPaneltem step="1" type="ATTEST NETWORK" on={step === 1} />
      <StepperPaneltem step="2" type="SCHEMA ID" on={step === 2} />
      <StepperPaneltem step="3" type="ATTESTER ADDRESS" on={step === 3} />
      <StepperPaneltem step="4" type="DESTINATION NETWORK" on={step === 4} />
      <StepperPaneltem step="5" type="REWARD TOKEN" on={step === 5} />
      <StepperPaneltem step="6" type="CONFIGURE TRANSFER" on={step === 6} />
    </motion.nav>
  );
}