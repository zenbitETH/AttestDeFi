"use client";

import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import Step1 from "~~/components/Step1";
import Step2 from "~~/components/Step2";
import Step3 from "~~/components/Step3";
import Step4 from "~~/components/Step4";
import Step5 from "~~/components/Step5";
import Step6 from "~~/components/Step6";
import Navbar from "~~/components/StepperPanel";

const Home: NextPage = () => {
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
      className="grid place-items-center md:min-h-full box-border overflow-x-hidden "
      style={{ fontFamily: "Ubuntu" }}
    >
      <Navbar step={currentStep} />
      <main className=" absolute top-1/2 -translate-y-1/2 flex flex-col w-5/12 items-center h-full md:min-h-full md:flex-row md:rounded-xl  md:h-fit md:overflow-x-hidden md:overflow-hidden">
        <AnimatePresence mode="wait">
          {steps.map(step => (
            <div
              key={step.index}
              data-hs-stepper-content-item={`{ "index": ${step.index} }`}
              className={`${currentStep === step.index ? "active h-full w-full " : ""}`}
              style={{ display: currentStep === step.index ? "block" : "none" }}
            >
              <div className=" flex justify-center items-center text-gray-600 dark:text-neutral-600 rounded-md dark:bg-neutral-800 dark:border-neutral-700">
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
      </main>
    </main>
  );
};

export default Home;
