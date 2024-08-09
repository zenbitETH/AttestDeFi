import React from "react";
import Next from "./Next";
import { Title } from "./Title";
import { Variants, motion } from "framer-motion";
import { useGlobalState } from "~~/services/store/store";

const pageVariant: Variants = {
  initial: {
    x: "-60%",
    opacity: 0,
  },
  initial2: {
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
};

function Step1({ handleNext }: { handleNext: any }) {
  const { disperseFormData, setDisperseFormData } = useGlobalState();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (disperseFormData.baseNetwork !== "") {
      handleNext();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-screen flex flex-col h-full flex-1 md:min-h-fit items-center md:h-[580px] md:justify-between border-4 border-Strawberry-red"
    >
      <motion.section
        variants={pageVariant}
        // initial={location.hasOwnProperty("state.name") ? "initial" : "initial2"}
        animate="animate"
        exit="exit"
        className="flex flex-col  mb-8 md:mb-0 bg-white w-screen rounded-2xl py-10 px-7 z-30 relative bottom-24 text-[14px] md:bottom-0 md:p-0 md:w-[70%]"
      >
        <Title title="Select attest network">
          Please, select the network you want to validate the attestations from.
        </Title>

        <div className="space-y-4 md:space-y-7 overflow-x-hidden">
          <select
            name="baseNetwork"
            value={disperseFormData.baseNetwork}
            onChange={event => setDisperseFormData("baseNetwork", event.target.value)}
            className="mt-4 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          >
            <option value="">Select a network</option>
            <option value="Ethereum">Ethereum</option>
            <option value="Optimism">Optimism</option>
            <option value="Base">Base</option>
            {/* <option value="Celo">Celo</option> */}
            {/* <option value="Mode">Mode</option> */}
          </select>
        </div>
      </motion.section>
      <Next goBack={false} next={true} />
    </form>
  );
}

export default Step1;
