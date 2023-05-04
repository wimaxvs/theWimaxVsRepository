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
        "ease-in flex flex-col items-center justify-center hover:scale-110 hover:bg-white/20 hover:p-1.5 hover:rounded-md hover:drop-shadow-mdsb transition"
      }
      onClick={onClick}
    >
      {icon}
      <div
        className="pt-1 text-xs text-white font-semibold"
      >
        {label}
      </div>
    </button>
  );
};

export default MenuItem;
