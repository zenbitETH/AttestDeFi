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
      className=" flex flex-col flex-1 md:min-h-fit items-center md:h-[580px] md:justify-between md"
    >
      <motion.section
        variants={pageVariant}
        // initial={location.hasOwnProperty("state.name") ? "initial" : "initial2"}
        animate="animate"
        exit="exit"
        className=" "
      >
        <Title title="Select the Attest Network 🎖️">In which network the attestations were granted?</Title>
        <select
          name="baseNetwork"
          value={disperseFormData.baseNetwork}
          onChange={event => setDisperseFormData("baseNetwork", event.target.value)}
          className="mb-3 bg-zen/50 text-gray-600"
        >
          <option value="">Select a network</option>
          <option value="Ethereum">⬜ Ethereum</option>
          <option value="Optimism">🟥 Optimism</option>
          <option value="Base">🟦 Base</option>
          {/* <option value="Celo">Celo</option> */}
          {/* <option value="Mode">Mode</option> */}
        </select>
      </motion.section>
      <Next goBack={false} next={true} />
    </form>
  );
}

export default Step1;
