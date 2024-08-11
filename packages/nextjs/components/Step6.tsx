"use client";

import React, { SyntheticEvent, useEffect, useState } from "react";
import { Title } from "./Title";
import { Address } from "./scaffold-eth";
import { gql, useQuery } from "@apollo/client";
import { Variants, motion } from "framer-motion";
import { formatUnits, parseEther } from "viem";
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
  const [sum, setSum] = useState(0); //suma total
  const [inputs, setInputs] = useState<{ [key: string]: number }>({}); //  valores de los inputs
  const [attestations, setAttestations] = useState([]); // manejo atestaciones
  const [distributionAmount, setDistributionAmount] = useState(0); // impresion cantidad distrib

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
      schemaID: disperseFormData.schemaID,
      attesterAddress: disperseFormData.attesterAddress,
    },
  });

  useEffect(() => {
    if (data?.attestations) {
      setAttestations(data.attestations); //guarda el valor

      const initialInputs = data.attestations.reduce((acc: any) => {
        return acc;
      }, {});

      setInputs(initialInputs); // estado inicial
    }
  }, [data]);

  const { writeContractAsync } = useScaffoldWriteContract("Disperse");
  // const { writeContractAsync: approveAsync } = useScaffoldWriteContract("approve");

  function getSum() {
    const values: any = Object.values(inputs); // obtiene el valor del array
    const sum = values.reduce((acc: number, c: number) => acc + c, 0); // suma el valor
    setSum(sum); // muestra valor
  }
  console.log({ inputs });

  // Cantidad impresa imput
  function applyAmmout() {
    alert("weqwe");
    const updatedInputs = Object.keys(inputs).reduce((acc: { [key: string]: number }, key) => {
      console.log("applyAmmout k: " + key, { el: acc[key], distributionAmount });
      acc[key] = distributionAmount; // asigno valor a cada imput

      return acc;
    }, {});

    console.log({ inputs, updatedInputs });

    setInputs(updatedInputs);
  }

  //  cambio del imput
  function handleInput(e: any) {
    const { name, value } = e.target;
    const reg = new RegExp(/^\d*\.?\d*$/);
    if (reg.test(value)) {
      console.log("xd ", { value });
      setInputs({ ...inputs, [name]: value });
    }
  }

  // elimina fila
  function handleDelete(idx: number) {
    // filtro por id elimino
    const newAttestations = attestations.filter((_, index) => index !== idx);
    setAttestations(newAttestations); // actualizo  guardando en variable aux

    const newInputs = { ...inputs };
    delete newInputs[`ammount-${idx + 1}`];
    setInputs(newInputs); // actualiza

    // recalcula
    getSum();
  }

  useEffect(() => getSum(), [inputs]);

  const catchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    if (disperseFormData.typeOfReward !== "") {
      if (disperseFormData.typeOfReward === "custom" && disperseFormData.erc20address !== "") {
        alert("disperseToken. TODO: increaseAllowance()");
        const recipientsAddresses = attestations.map((att: any) => att.recipient);

        let valuesToDisperse: any = Object.values(inputs); //.map((val: string) => parseEther(val));
        valuesToDisperse = valuesToDisperse.map((value: any) => parseEther(value.toString(), "gwei")); // all the token rewards ammounts in bigint[]

        await writeContractAsync(
          {
            functionName: "disperseToken",
            args: ["0x6c8b35dC626Eb7906412f2e3e4F5254e28834a05", recipientsAddresses, valuesToDisperse],
          },
          {
            onSuccess: (data, variables, context) => {
              console.log("Diserse onSuccess ", { data, variables, context });
              alert("Diserse success");
            },
            onError: (error: any) => {
              console.log("disperToken onError! ", { error });
            },
          },
        );
      } else if (disperseFormData.typeOfReward === "ETH") {
        const recipientsAddresses = attestations.map((att: any) => att.recipient);

        let valuesToDisperse: any = Object.values(inputs); //.map((val: string) => parseEther(val));
        valuesToDisperse = valuesToDisperse.map((value: any) => parseEther(value.toString(), "gwei")); // all the token rewards ammounts in bigint[]
        const totalTokensToDisperse = valuesToDisperse.map((value: any) => value); // all the token rewards ammounts in number[]

        let total = 0;
        for (let i = 0; totalTokensToDisperse.length > i; i++) {
          total = total + Number(formatUnits(totalTokensToDisperse[i], 9));
        }
        const totalBigInt = parseEther(total.toString(), "wei");

        await writeContractAsync(
          {
            functionName: "disperseEther",
            args: [recipientsAddresses, valuesToDisperse],
            value: totalBigInt,
          },
          {
            onSuccess: (data, variables, context) => {
              console.log("Diserse onSuccess ", { data, variables, context });
              alert("Diserse success");
            },
            onError: (error: any) => {
              console.log("disperEther onError! ", { error });
            },
          },
        );
      }
    }
  };

  return (
    <form onSubmit={catchSubmit} className="w-full flex flex-col items-center md:justify-between pt-96">
      <motion.section
        variants={pageVariant}
        initial="initial"
        animate="animate"
        exit={"exit"}
        className="flex flex-col mb-20 rounded-md z-30 relative bottom-24 text-[14px] md:bottom-0 md:p-0 h-full"
      >
        <Title title="Verify & Send 🚀">Check the addresses and define the reward amount before send it.</Title>
        <div className="flex items-center mt-4 md:mt-0 space-x-2">
          <input
            type="number"
            value={distributionAmount}
            onChange={e => setDistributionAmount(+e.target.value)}
            placeholder="Distribution amount"
            className=" px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm w-full md:w-32"
          />
          <button
            type="button"
            onClick={() => applyAmmout()}
            className="text-gray-500 text-lg font-bold hover:text-gray-700 p-2 rounded-full border border-gray-300 flex items-center justify-center mt-2 md:mt-0 md:ml-2"
            title="Apply distribution amount"
            style={{ width: "40px", height: "40px" }}
          >
            +
          </button>
        </div>
        <div className="w-full flex flex-col space-y-4 md:space-y-3 bg-Alabaster rounded-xl overflow-y-auto">
          <table className="table">
            <thead>
              <tr className="font-ral dark:text-white">
                <th></th>
                <th>Recipient Address</th>
                <th>Reward Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {attestations.map((attestation: any, idx: number) => (
                <tr className="font-oxy dark:text-white" key={idx}>
                  <th>{idx + 1}</th>
                  <td>
                    <Address address={attestation.recipient} />
                  </td>
                  <td>
                    <input
                      type="text"
                      name={`ammount-${idx + 1}`} // id input
                      value={inputs[`ammount-${idx + 1}`] || ""} // valor del input
                      onChange={handleInput} // función de cambio
                      className=""
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={() => handleDelete(idx)} // button eliminar fila
                      className="text-gray-600 dark:text-white text-lg font-bold hover:text-gray-700"
                      aria-label="Eliminar fila"
                      title="Eliminar fila"
                    >
                      &times;
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="sum font-ral text-lg text-center dark:text-white">Total tokens: {sum}</div>
          <button type="submit" className="">
            Send funds 🚀
          </button>
        </div>
      </motion.section>
    </form>
  );
}
