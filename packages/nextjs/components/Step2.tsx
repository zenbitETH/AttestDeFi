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
  initial2: {
    x: "-60%",
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

function Step2({ handleNext, handleBack }: { handleNext: any; handleBack: any }) {
  const [goback, setGoBack] = useState<boolean>(false);
  const { disperseFormData, setDisperseFormData } = useGlobalState();

  const catchSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const typebtn = ((e.nativeEvent as SubmitEvent).submitter as HTMLInputElement).name;

    if (disperseFormData.schemaID !== "") {
      if (typebtn === "back") {
        setGoBack(true);
        // navigate("/multi-step-form/", { state: { id: 2, name: "step2" } });
        handleBack();
      } else if (typebtn === "next") {
        setGoBack(false);
        // navigate("/multi-step-form/step3", { state: { id: 2, name: "step2" } });
        handleNext();
      }
    }
  };

  return (
    <form onSubmit={catchSubmit} className="w-full flex flex-col flex-1 items-center md:h-[580px] md:justify-between">
      <motion.section
        variants={pageVariant}
        // initial={location.state.name === "step1" ? "initial" : "initial2"}
        animate="animate"
        exit={goback ? "exit2" : "exit"}
        className="flex flex-col mb-8 md:mb-0 rounded-2xl p-10 z-30 relative bottom-24 text-[14px] md:bottom-0 md:p-0 md:w-[70%] h-full"
      >
        <Title title="Enter the Schema ID 📜">Enter the Schema ID from which the attestations were granted.</Title>
        <div className="space-y-4 md:space-y-0 flex flex-col md:flex-row md:space-x-6">
          <input
            type="text"
            name="schemaID"
            value={disperseFormData.schemaID}
            onChange={event => setDisperseFormData("schemaID", event.target.value)}
            placeholder="Enter schema ID"
            className="bg-zen/50 text-gray-600 dark:text-white text-base"
          />
        </div>
      </motion.section>
      <Next next={true} goBack={true} />
    </form>
  );
}

export default Step2;
