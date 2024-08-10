type TitleProp = {
  children: string;
  title: string;
};

export const Title = ({ children, title }: TitleProp) => {
  return (
    <div className="mb-7 md:my-12 space-y-2">
      <h1 className="font-ral text-[24px] md:text-[30px] font-bold dark:text-white">{title}</h1>
      <p className="font-oxy font-[400] text-Cool-gray  text-[16px] dark:text-white">{children}</p>
    </div>
  );
};
