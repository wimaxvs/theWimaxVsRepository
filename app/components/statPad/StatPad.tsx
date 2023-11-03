import React, { ReactElement } from "react";
import Stat from "./Stat";
import { IconType } from "react-icons";

interface StatPadProps {
  itemArray: {
    title: string;
    value: number | string;
    subtitle?: string;
    icon?: ReactElement<IconType>;
  }[];
  padTitle?: string;
}

const StatPad: React.FC<StatPadProps> = ({ itemArray, padTitle }) => {
  return (
    <>
      <section
        className={`flex flex-col gap-3 bg-gradient-to-br from-gray-800 to-gray-950 rounded-2xl p-4`}
      >
        <h2 className="font-extrabold text-white text-xl pl-3">{padTitle}</h2>
        <div className="statPad flex flex-row">
          {itemArray &&
            itemArray.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <Stat
                    title={item.title}
                    value={item.value}
                    subtitle={item.subtitle}
                    icon={item.icon}
                    index={
                      index === 0
                        ? "first"
                        : index === itemArray.length - 1
                        ? "last"
                        : undefined
                    }
                  />
                </React.Fragment>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default StatPad;
