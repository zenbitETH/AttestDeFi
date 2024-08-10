type TitleProp = {
  children: string;
  title: string;
};

export const Title = ({ children, title }: TitleProp) => {
  return (
    <div className="mb-7 md:my-12 space-y-2">
      <h1 className="font-oxy text-[24px] md:text-[30px] font-bold text-Marine-blue">{title}</h1>
      <p className="font-rob font-[400] text-Cool-gray  text-[16px]">{children}</p>
    </div>
  );
};
