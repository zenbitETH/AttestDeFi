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
  const [inputs, setInputs] = useState<any>({}); //  valores de los inputs
  const [attestations, setAttestations] = useState([]); // manejo atestaciones

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

  function getSum() {
    const values: any = Object.values(inputs); // obtiene el valor del array
    const sum = values.reduce((acc: number, c: number) => acc + c, 0); // suma el valor
    setSum(sum); // muestra valor
  }

  //  cambio del imput
  function handleInput(e: any) {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: +value });
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
      } else if (disperseFormData.typeOfReward === "ETH") {
        const recipientsAddresses = data.attestations.map((att: any) => att.recipient);

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
        <div className="w-full flex flex-col space-y-4 md:space-y-3 bg-Alabaster rounded-xl overflow-y-auto">
          <table className="table">
            <thead>
              <tr className="font-ral">
                <th></th>
                <th>Recipient Address</th>
                <th>Reward Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {attestations.map((attestation: any, idx: number) => (
                <tr className="font-oxy" key={idx}>
                  <th>{idx + 1}</th>
                  <td>
                    <Address address={attestation.recipient} />
                  </td>
                  <td>
                    <input
                      defaultValue={10}
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
                      className="text-gray-500 text-lg font-bold hover:text-gray-700"
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
          <div className="sum font-ral text-lg text-center">Total tokens: {sum}</div>
          <button type="submit" className="">
            Disperse
          </button>
        </div>
      </motion.section>
    </form>
  );
}
