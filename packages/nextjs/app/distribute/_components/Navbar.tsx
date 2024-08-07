import { NavItem } from "./NavItem";
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

export default function Navbar({ step }: { step: number }) {
  return (
    <motion.nav
      variants={navVariant}
      initial="initial"
      animate="animate"
      className="flex w-full pt-5 h-[170px] md:z-50 space-x-[17px] text-[16px] justify-center md:flex-col md:space-x-0 md:space-y-8  md:h-[720px] md:w-[290px] md:justify-start md:rounded-xl text-white"
    >
      <NavItem step="1" type="ATTEST NETWORK" on={step === 1} />
      <NavItem step="2" type="SCHEMA ID" on={step === 2} />
      <NavItem step="3" type="ATTESTER ADDRESS" on={step === 3} />
      <NavItem step="4" type="DESTINATION NETWORK" on={step === 4} />
      <NavItem step="5" type="REWARD TOKEN" on={step === 5} />
      <NavItem step="6" type="CONFIGURE TRANSFER" on={step === 6} />
    </motion.nav>
  );
}
