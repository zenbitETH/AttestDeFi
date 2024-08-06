import { Variants, motion } from "framer-motion";

type NavItemType = {
  step: string;
  type: string;
  on: boolean;
};
const navItemVariant: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 1.5,
    },
  },
};

export const NavItem = ({ step, type, on }: NavItemType) => {
  return (
    <motion.div variants={navItemVariant} className="flex md:p-10 md:items-center md:py-0 md:space-x-5">
      <div
        className={
          "h-11 w-11 border font-bold border-white grid place-items-center rounded-full transition duration-500 ease-in-out " +
          (on && "bg-Light-blue border-Light-blue text-Marine-blue")
        }
      >
        {step}
      </div>
      <div className="hidden md:flex flex-col space-y-[-3px]">
        <p className="text-[13px] text-Light-gray">STEP {step}</p>
        <p className="font-[700] text-[14px] tracking-wider">{type}</p>
      </div>
    </motion.div>
  );
};
