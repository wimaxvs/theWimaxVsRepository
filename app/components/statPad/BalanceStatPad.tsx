"use client";
import React, { ReactElement } from "react";
import { IconType } from "react-icons";
import StatPad from "./StatPad";
import StatPadModalButton from "./StatPadModalButton";


interface BalanceStatPadProps {
  itemArray: {
    title: string;
    value: number | string;
    subtitle?: string;
    icon?: ReactElement<IconType>;
  }[];
  padTitle?: string;
  role?: "ZARZAD";
}

const BalanceStatPad: React.FC<BalanceStatPadProps> = ({
  itemArray,
  padTitle,
  role,
}) => {
  return (
    <div>
      {role && role === "ZARZAD" && (
        <StatPadModalButton>
          <StatPad itemArray={itemArray} padTitle={padTitle} />
        </StatPadModalButton>
      )}
    </div>
  );
};

export default BalanceStatPad;
