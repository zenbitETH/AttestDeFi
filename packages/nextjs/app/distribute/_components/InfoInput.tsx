import React, { useEffect, useState } from "react";

type InputProps = {
  children: string;
  type: string;
  placeholder: string;
  empty: boolean;
};

export const InfoInput = ({ children, type, placeholder, empty }: InputProps) => {
  const [data, setData] = useState<string | null>();

  useEffect(() => {
    const newData = sessionStorage.getItem(type);
    if (type) {
      setData(newData);
    }
  }, []);

  const catchChange = (e: React.FormEvent<HTMLInputElement>) => {
    setData((e.target as HTMLInputElement).value);
  };

  return (
    <div className="flex flex-col space-y-0">
      <div className="flex justify-between w-full">
        <label className="font-[500] tracking-tight text-[13px]" htmlFor="email">
          {children}
        </label>
        {empty && <p className="font-[700] text-red-500 text-Strawberry-red">This Field is required</p>}
      </div>

      <input
        className={
          "border font-[500] text-Marine-blue focus:outline-none focus:border-Purplish-blue border-Light-gray  px-5 py-3 rounded-md placeholder:font-[500] md:text-[16px] mt-2 md:rounded-lg md:py-4 md:px-5 " +
          (empty && "border-Strawberry-red")
        }
        type={type}
        onChange={catchChange}
        value={data ? data : ""}
        name={type}
        placeholder={placeholder}
        minLength={type === "phone" ? 7 : Infinity}
      />
    </div>
  );
};
