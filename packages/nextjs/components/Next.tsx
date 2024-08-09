type backType = {
  goBack: boolean;
  next: boolean;
};

export default function Next({ goBack, next }: backType) {
  return (
    <div className="box-border w-full flex justify-between md:mt-0 absolute bottom-0 bg-white p-[5%] md:py-0 md:self-end md:bg-[transparent] md:relative md:px-[15%] md:mb-5 ">
      {goBack && (
        <button
          type="submit"
          name="back"
          className="text-[16px] text-Purplish-blue transform duration-300 hover:text-Marine-blue font-[500]"
        >
          Go Back
        </button>
      )}
      <div />
      {next && (
        <button
          type="submit"
          name="next"
          className="bg-Marine-blue text-Light-blue hover:brightness-150 transform ease-in-out duration-300 font-[500] text-[16px] rounded-lg text-black py-3 px-4 md:py-4 md:px-8"
        >
          Next Step
        </button>
      )}
      {!next && (
        <button
          type="submit"
          name="next"
          className="bg-Purplish-blue hover:brightness-150 transform ease-in-out duration-300 font-[500] text-[16px] rounded-lg text-black py-3 px-6 md:py-4 md:px-10"
        >
          Confirm
        </button>
      )}
    </div>
  );
}
