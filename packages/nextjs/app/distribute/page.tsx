"use client";

import React, { useState } from "react";
import Navbar from "./_components/Navbar";
import Step1 from "./_components/Step1";
import Step2 from "./_components/Step2";
import Step3 from "./_components/Step3";
import Step4 from "./_components/Step4";
import Step5 from "./_components/Step5";
import Step6 from "./_components/Step6";
import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";

const Distribute: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    { index: 1, label: "Step 1", content: "Select a network" },
    { index: 2, label: "Step 2", content: "Enter the schema ID" },
    { index: 3, label: "Step 3", content: "Enter the attester address" },
    { index: 4, label: "Step 4", content: "Select a destination network" },
    { index: 5, label: "Step 5", content: "Type of rewards" },
    { index: 6, label: "Step 6", content: "Configure transfer" },
  ];
  const isLastStep = currentStep === steps.length;
  const isFirstStep = currentStep === 1;

  const handleNext = () => {
    if (!isLastStep) {
      setCurrentStep(prevStep => prevStep + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      setCurrentStep(prevStep => prevStep - 1);
    }
  };

  return (
    <main
      className="bg-Light-gray grid place-items-center w-screen md:min-h-full box-border overflow-x-hidden"
      style={{ fontFamily: "Ubuntu" }}
    >
      <main className=" flex flex-col items-center min-h-full md:min-h-full w-screen md:max-w-[1280px] md:flex-row md:bg-white md:rounded-xl md:p-5 relative md:h-fit md:overflow-x-hidden md:overflow-hidden">
        <Navbar step={currentStep} />
        <section className="w-full flex flex-1 gap-4 flex-col items-center md:h-full md:justify-between md:mb-0">
          <AnimatePresence mode="wait">
            {steps.map(step => (
              <div
                key={step.index}
                data-hs-stepper-content-item={`{ "index": ${step.index} }`}
                className={`${currentStep === step.index ? "active w-full p-4" : ""}`}
                style={{ display: currentStep === step.index ? "block" : "none" }}
              >
                <div className="w-full p-4 bg-gray-50 flex justify-center items-center border border-dashed text-gray-500 dark:text-neutral-500 rounded-xl dark:bg-neutral-800 dark:border-neutral-700">
                  {step.index === 1 && <Step1 handleNext={handleNext} />}

                  {step.index === 2 && <Step2 handleNext={handleNext} handleBack={handleBack} />}

                  {step.index === 3 && <Step3 handleNext={handleNext} handleBack={handleBack} />}

                  {step.index === 4 && <Step4 handleNext={handleNext} handleBack={handleBack} />}

                  {step.index === 5 && <Step5 handleNext={handleNext} handleBack={handleBack} />}

                  {step.index === 6 && <Step6 />}
                </div>
              </div>
            ))}
          </AnimatePresence>
        </section>
      </main>
    </main>
  );
};

export default Distribute;

// <div className="mt-4 gap-8">
//   <h4 className="text-sm font-medium text-gray-800 dark:text-neutral-200 ">
//     Please confirm your selections:
//   </h4>
//   <hr />
//   <ul className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
//     <li>Network: {disperseFormData.baseNetwork}</li>
//     <li>Schema ID: {disperseFormData.schemaID}</li>
//     <li>Attester Address: {disperseFormData.attesterAddress}</li>
//     <li>Destination Network: {disperseFormData.destinationNetwork}</li>
//     <li>Type of Reward: {disperseFormData.typeOfReward}</li>
//     {disperseFormData.typeOfReward === "custom" ? (
//       <li>Custom ERC20 contract address: {disperseFormData.erc20address}</li>
//     ) : null}
//   </ul>
//   <button
//     className="btn btn-primary mt-4 mx-14"
//     onClick={() => alert("Your rewards will be distributed.")}
//   >
//     Disperse
//   </button>
// </div>
// )}
