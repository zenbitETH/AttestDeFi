"use client";

import React, { SyntheticEvent, useState } from "react";
import Next from "./Next";
import { Title } from "./Title";
import { Variants, motion } from "framer-motion";
import { isAddress } from "viem";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";
import { normalize } from "viem/ens";
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

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

export default function Step3({ handleNext, handleBack }: { handleNext: any; handleBack: any }) {
  const [goback, setGoBack] = useState<boolean>(false);
  const { disperseFormData, setDisperseFormData } = useGlobalState();

  const [showAttesterENS, setShowAttesterENS] = useState(false);

  const catchSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const typebtn = ((e.nativeEvent as SubmitEvent).submitter as HTMLInputElement).name;

    if (disperseFormData.attesterAddress !== "") {
      if (typebtn === "back") {
        setGoBack(true);
        handleBack();
      } else if (typebtn === "next") {
        setGoBack(false);
        handleNext();
      }
    }
  };

  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isAddress(e.target.value)) {
      setDisperseFormData("attesterAddress", e.target.value);
    } else {
      setDisperseFormData("attesterENS", e.target.value);
      setShowAttesterENS(true);

      const ensAddress = await publicClient.getEnsAddress({
        name: normalize(e.target.value),
      });

      if (ensAddress) {
        setDisperseFormData("attesterAddress", ensAddress);
      }
    }
  };

  return (
    <form onSubmit={catchSubmit} className=" w-full flex flex-col  items-center md:h-[580px] md:justify-between">
      <motion.section
        variants={pageVariant}
        // initial={location.state.name === "step2" ? "initial" : "initial2"}
        animate="animate"
        exit={goback ? "exit2" : "exit"}
        className="flex flex-col  mb-8 md:mb-0 bg-white w-[90%] rounded-2xl py-10 px-7 z-30 relative bottom-24 text-[14px] md:bottom-0 md:p-0 md:w-[70%] h-full"
      >
        <Title title="Enter attester address or ENS">
          Enter the attester address or ENS you want to validate the attestations from.
        </Title>
        <div className="w-full flex flex-col space-y-4 md:space-y-5">
          <input
            type="text"
            name="attesterAddress"
            value={!showAttesterENS ? disperseFormData.attesterAddress : disperseFormData.attesterENS}
            onChange={handleInputChange}
            placeholder="Enter attester address"
            className="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </motion.section>
      <Next goBack={true} next={true} />
    </form>
  );
}
