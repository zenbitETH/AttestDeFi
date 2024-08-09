import React, { SyntheticEvent, useState } from "react";
import Next from "./Next";
import { Title } from "./Title";
import { Variants, motion } from "framer-motion";
import { useGlobalState } from "~~/services/store/store";

const pageVariant: Variants = {
  initial: {
    x: "60%",
    opacity: 0,
  },
  animate: {
    x: "0%",
    opacity: 1,
    transition: {
      type: "tween",
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  exit: {
    x: "-60%",
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
  exit2: {
    x: "60%",
    opacity: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut",
    },
  },
};

export default function Step4({ handleNext, handleBack }: { handleNext: any; handleBack: any }) {
  const [goback, setGoBack] = useState<boolean>(false);

  const { disperseFormData, setDisperseFormData } = useGlobalState();

  const catchSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const typebtn = ((e.nativeEvent as SubmitEvent).submitter as HTMLInputElement).name;
    if (disperseFormData.destinationNetwork !== "") {
      if (typebtn === "back") {
        setGoBack(true);
        handleBack();
      } else if (typebtn === "next") {
        setGoBack(false);
        handleNext();
      }
    }
  };

  return (
    <form onSubmit={catchSubmit} className=" w-full flex flex-col  items-center md:h-[580px] md:justify-between">
      <motion.section
        variants={pageVariant}
        initial="initial"
        animate="animate"
        exit={goback ? "exit2" : "exit"}
        className="flex flex-col  mb-8 md:mb-0 bg-white w-[90%] rounded-2xl py-10 px-7  relative bottom-24 text-[14px] md:bottom-0 md:p-0 md:w-[70%] h-full"
      >
        <Title title="Select distribution network">
          Select the network where you want to disperse your rewards on.
        </Title>
        <div className="w-full flex flex-col space-y-4 md:space-y-5 bg-Alabaster p-6 rounded-xl md:p-8">
          <select
            name="selectRedDestin"
            value={disperseFormData.destinationNetwork}
            onChange={event => setDisperseFormData("destinationNetwork", event.target.value)}
            className="mt-4 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select the destination network</option>
            <option value="Optimism">Optimism</option>
            <option value="Base">Base</option>
            <option value="Celo">Celo</option>
            <option value="Mode">Mode</option>
            <option value="Hardhat">Hardhat</option>
          </select>
        </div>
      </motion.section>
      <Next goBack={true} next={false} />
    </form>
  );
}
