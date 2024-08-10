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

export default function Step5({ handleNext, handleBack }: { handleNext: any; handleBack: any }) {
  const [goback, setGoBack] = useState<boolean>(false);

  const { disperseFormData, setDisperseFormData } = useGlobalState();

  const catchSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const typebtn = ((e.nativeEvent as SubmitEvent).submitter as HTMLInputElement).name;
    if (disperseFormData.typeOfReward !== "") {
      if (disperseFormData.typeOfReward === "custom" && disperseFormData.erc20address !== "") {
        if (typebtn === "back") {
          setGoBack(true);
          handleBack();
        } else if (typebtn === "next") {
          setGoBack(false);
          handleNext();
        }
      } else if (disperseFormData.typeOfReward === "ETH") {
        if (typebtn === "back") {
          setGoBack(true);
          handleBack();
        } else if (typebtn === "next") {
          setGoBack(false);
          handleNext();
        }
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
        className="flex flex-col  mb-8 md:mb-0  rounded-2xl py-10 px-7 z-30 relative bottom-24 text-[14px] md:bottom-0 md:p-0 md:w-[70%] h-full"
      >
        <Title title="Type of rewards 🪙">Select the type of rewards you want to disperse.</Title>
        <div className="w-full flex flex-col space-y-4 md:space-y-5 bg-Alabaster rounded-xl ">
          <select
            name="typeOfReward"
            value={disperseFormData.typeOfReward}
            onChange={event => setDisperseFormData("typeOfReward", event.target.value)}
            className=""
          >
            <option value="">Select type of reward</option>
            <option value="ETH">ETH 💠</option>
            <option value="custom">Custom ERC20 token 🪙</option>
          </select>
          {disperseFormData.typeOfReward === "custom" ? (
            <input
              type="text"
              name="erc20address"
              placeholder="Enter ERC20 contract address. 0x...."
              value={disperseFormData.erc20address}
              onChange={event => setDisperseFormData("erc20address", event.target.value)}
              className="placeholder:text-white/60"
            />
          ) : null}
        </div>
      </motion.section>
      <Next goBack={true} next={false} />
    </form>
  );
}
