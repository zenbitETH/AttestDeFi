import { motion } from "framer-motion";

export default function Confirm() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: {
          duration: 0.8,
          ease: "easeInOut",
        },
      }}
      className="flex flex-col bg-white w-[90%] rounded-2xl px-9 z-30 relative bottom-24 text-[14px] md:bottom-0 md:p-0 md:w-[70%] items-center text-center py-28 md:h-full md:justify-center"
    >
      <div className="mb-6">
        <img className="h-[55px] md:h-[80px]" src="./assets/images/icon-thank-you.svg" alt="" />
      </div>
      <h1 className="text-[24px] font-[700] mb-3 text-Marine-blue md:text-[33px]">Thank you!</h1>
      <p className="text-[15px] text-Cool-gray md:text-[16px]">
        Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support,
        please feel free to email us at support@loremgaming.com.
      </p>
    </motion.div>
  );
}
