type backType = {
  goBack: boolean;
  next: boolean;
};

export default function Next({ goBack, next }: backType) {
  return (
    <div className="box-border w-full flex justify-between md:mt-0 absolute bottom-0 bg-white p-[5%] md:py-0 md:self-end md:bg-[transparent] md:relative md:px-[15%] md:mb-5 ">
      {goBack && (
        <button type="submit" name="back" className="">
          Go Back
        </button>
      )}
      <div />
      {next && (
        <button type="submit" name="next" className="">
          Next Step
        </button>
      )}
      {!next && (
        <button type="submit" name="next" className="">
          Confirm
        </button>
      )}
    </div>
  );
}
