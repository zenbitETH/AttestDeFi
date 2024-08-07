"use client";

import React, { SyntheticEvent, useEffect, useState } from "react";
import { Title } from "./Title";
import { gql, useQuery } from "@apollo/client";
import { Variants, motion } from "framer-motion";
import { parseEther } from "viem";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
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

export default function Step6() {
  const { disperseFormData } = useGlobalState();
  const [sum, setSum] = useState(0);
  const [inputs, setInputs] = useState<any>({});

  const GET_ATTESTERS = gql`
    query Attestations($schemaID: String!, $attesterAddress: String!) {
      attestations(where: { schemaId: { equals: $schemaID }, attester: { equals: $attesterAddress } }) {
        id
        attester
        recipient
        schemaId
      }
    }
  `;

  const { data } = useQuery(GET_ATTESTERS, {
    variables: {
      schemaID: disperseFormData.schemaID, // 0xddc12d29e4863e857d1b6429f2afd4bf3d687110bbb425e730b87d5f1efcda5a
      attesterAddress: disperseFormData.attesterAddress, // 0xe2A45CA9Ec5780FC389FBD8991980397b8B470AF
    },
  });

  const { writeContractAsync } = useScaffoldWriteContract("Disperse");

  function getSum() {
    const values: any = Object.values(inputs);
    const sum = values.reduce((acc: number, c: number) => acc + c, 0);
    setSum(sum);
  }

  function handleInput(e: any) {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: +value });
  }

  useEffect(() => getSum(), [inputs]);

  const catchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (disperseFormData.typeOfReward !== "") {
      if (disperseFormData.typeOfReward === "custom" && disperseFormData.erc20address !== "") {
      } else if (disperseFormData.typeOfReward === "ETH") {
        const recipientsAddresses = data.attestations.map((att: any) => att.recipient);
        let valuesToDisperse: any = Object.values(inputs); //.map((val: string) => parseEther(val));
        valuesToDisperse = valuesToDisperse.map((value: any) => parseEther(value.toString(), "gwei"));
        console.log({ recipientsAddresses, valuesToDisperse });

        await writeContractAsync(
          {
            functionName: "disperseEther",
            args: [recipientsAddresses, valuesToDisperse],
          },
          {
            onSuccess: (data, variables, context) => {
              console.log({ data, variables, context });
              alert("success");
            },
          },
        );
      }
    }
  };

  const handleDisperseRewards = () => {
    console.log("disperse rewards");
  };

  return (
    <form onSubmit={catchSubmit} className=" w-full flex flex-col  items-center md:h-[580px] md:justify-between">
      <motion.section
        variants={pageVariant}
        initial="initial"
        animate="animate"
        exit={"exit"}
        className="flex flex-col  mb-8 md:mb-0 bg-white w-[90%] rounded-2xl py-10 px-7 z-30 relative bottom-24 text-[14px] md:bottom-0 md:p-0 md:w-[70%] h-full"
      >
        <Title title="Configure transfer">Transfer funds to multiple receivers.</Title>
        <div className="w-full flex flex-col space-y-4 md:space-y-3 bg-Alabaster p-6 rounded-xl md:p-8 overflow-y-auto">
          <table className="table">
            <thead>
              <tr>
                <th></th>
                <th>Recipient Address</th>
                <th>Reward ammount</th>
              </tr>
            </thead>
            <tbody>
              {data?.attestations?.map((attestation: any, idx: number) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{attestation.recipient}</td>
                  <td>
                    <input
                      type="number"
                      name={`ammount-${idx + 1}`}
                      value={inputs[idx + 1]}
                      onChange={handleInput}
                      className="mt-4 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="sum">Total tokens: {sum}</div>
          <button type="submit" className="btn" onClick={handleDisperseRewards}>
            Disperse
          </button>
        </div>
      </motion.section>
    </form>
  );
}
