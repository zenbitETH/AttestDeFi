"use client";

import { useState } from "react";
import type { NextPage } from "next";

const Add: NextPage = () => {
  const [tokenRewardIsChecked, setTokenRewardIsChecked] = useState(false);

  const handleOnChange = (rewardMode: string) => {
    if (rewardMode === "eth") {
      setTokenRewardIsChecked(false);
    } else {
      setTokenRewardIsChecked(true);
    }
  };

  const handleOnSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      distribution_name: { value: string };
      distribution_date: { value: string };
      token_address: { value: string };
    };

    const distribution_name = target.distribution_name.value;
    const distribution_date = target.distribution_date.value;
    const distribution_mode = !tokenRewardIsChecked ? "eth" : "token";
    const custom_token_address = target.token_address ? target.token_address.value : "";

    const reqBody = {
      distribution_name,
      distribution_date,
      distribution_mode,
      custom_token_address,
    };
    const reqResponse = await fetch("/api/distribution", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    });

    const reqResult = await reqResponse.json();
    console.log({ reqResult });
  };

  // seleccionar red donde se hizo la attestation - OP,
  // seleccionar schema por schemaID
  // seleccionar attester del schemaID
  // seleccionar red donde se va a realizar la distribucion de rewards

  return (
    <>
      <div className="text-center mt-8 bg-secondary p-10">
        <h1 className="text-4xl my-0">Create New Distribution</h1>
        <p className="text-neutral">
          You can debug & interact with your deployed contracts here.
          <br /> Check{" "}
          <code className="italic bg-base-300 text-base font-bold [word-spacing:-0.5rem] px-1">
            packages / nextjs / app / debug / page.tsx
          </code>{" "}
        </p>
        <div>
          <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
            <div>
              <label>
                Distribution name:
                <input type="text" name="distribution_name" className="" placeholder="Enter distribution name" />
              </label>
            </div>
            <div>
              <label>
                Distribution Date:
                <input type="date" name="distribution_date" className="" />
              </label>
            </div>
            <div>
              <label>Distribution Rewards:</label>
              ETH:{" "}
              <input
                type="checkbox"
                id={`custom-checkbox-eth`}
                name={"eth"}
                value={"eth"}
                checked={!tokenRewardIsChecked}
                onChange={() => handleOnChange("eth")}
              />
              TOKEN:{" "}
              <input
                type="checkbox"
                id={`custom-checkbox-token`}
                name={"token"}
                value={"token"}
                checked={tokenRewardIsChecked}
                onChange={() => handleOnChange("token")}
              />
            </div>
            {tokenRewardIsChecked ? (
              <div>
                <label>Custom Token Address:</label>
                <input
                  type="text"
                  name="token_address"
                  className=""
                  placeholder="Enter custom token contract address, 0x..."
                />
              </div>
            ) : null}
            <div>
              <button className="border border-black px-4 py-2">Create</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Add;
