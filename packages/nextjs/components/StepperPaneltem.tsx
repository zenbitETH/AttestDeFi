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

export const StepperPaneltem = ({ step, type, on }: NavItemType) => {
  return (
    <motion.div variants={navItemVariant} className="flex md:p-3 md:items-center md:py-0 gap-3">
      <div
        className={`h-10 w-10 border font-bold border-white grid place-items-center rounded-full transition duration-500 ease-in-out ${on ? "bg-bit border-bit text-white" : ""}`}
      >
        {step}
      </div>
      <div className={'hidden md:flex flex-col ${on ? "bg-bit border-bit text-white" : ""}'}>
        <span className="font-oxy text-Light-gray">{type}</span>
      </div>
    </motion.div>
  );
};
