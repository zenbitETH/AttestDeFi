type FinishProp = {
  data: {
    price: number;
    picked: boolean;
  };
  moydata: string;
  type: string;
};

export default function FinishUp({ data, moydata, type }: FinishProp) {
  return (
    <>
      {data.picked && (
        <div className="flex justify-between md:text-[15px]">
          <p className="text-Cool-gray">{type}</p>
          <p className="text-Marine-blue font-[500]">
            +${data.price}/{moydata === "month" ? "mo" : "yr"}
          </p>
        </div>
      )}
    </>
  );
}
