import React, { ReactElement } from "react";
import { IconType } from "react-icons";

interface OneStatProps {
  title: string;
  value: string | number;
  icon?: ReactElement<IconType>;
  subtitle?: string;
  index?: "first" | "last";
}
const Stat: React.FC<OneStatProps> = ({
  title,
  value,
  icon,
  subtitle,
  index,
}) => {
  return (
    <>
      <div
        className={`oneStat flex flex-row border-x border-slate-700 ${
          index === "first"
            ? "rounded-l-2xl border-l-0"
            : index === "last"
            ? "rounded-r-2xl border-r-0"
            : ""
        }`}
      >
        <div className={`flex flex-col justify-start items-start gap-2 px-3`}>
          <h4 className="text-xs font-semibold text-[#999]">{title}</h4>
          <h2 className="md:text-3xl font-black text-white">{`${value}`}</h2>
          {subtitle && (
            <h3 className="text-xs font-light text-slate-400">{subtitle}</h3>
          )}
        </div>
        {/* <div className={`flex flex-col justify-center items-center p-3`}>
          {icon}
        </div> */}
      </div>
    </>
  );
};

export default Stat;
