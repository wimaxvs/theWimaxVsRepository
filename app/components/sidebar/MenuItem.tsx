"use client";

import { ReactElement } from "react";
import { IconType } from "react-icons";

interface MenuItemProps {
  onClick: () => void | undefined;
  label: string;
  icon: ReactElement<IconType>;
}
const MenuItem: React.FC<MenuItemProps> = ({ onClick, label, icon }) => {
  return (
    <button
      className={
        "flex flex-col items-center justify-center hover:scale-110 hover:drop-shadow-mdsb transition"
      }
    >
      {icon}
      <div onClick={onClick} className="pt-1 text-xs text-white font-semibold">
        {label}
      </div>
    </button>
  );
};

export default MenuItem;
