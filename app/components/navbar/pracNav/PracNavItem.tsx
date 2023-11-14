"use client";
import React from "react";
import usePracNav from "@/app/hooks/usePracNav";

interface PracNavItemProps {
  label: string;
  position?: "first" | "last";
  selected: boolean;
}
const PracNavItem: React.FC<PracNavItemProps> = ({
  label,
  position,
  selected: isActive,
}) => {
  let isFirst = position === "first";
  let { setTheLocation, setIsFirstTab } = usePracNav();

  let onClickFunc = (label: string) => {
    setIsFirstTab(isFirst);
    return setTheLocation(label);
  };

  return (
    <button
      onClick={() => onClickFunc(label)}
      className={` rounded-t-xl relative text-[#1fb2a6] 
        ${isActive ? "p-4 font-extrabold mr-2" : "font-semibold bg-gray-900 px-2 py-0 text-gray-500 mb-2 mr-2 rounded-xl hover:bg-gray-800"}
        ${
          isActive &&
          "bg-gray-700 after:h-4 after:w-4 after:rounded-full after:right-[-16px] after:bottom-0 after:content-[''] after:bg-transparent after:absolute after:shadow-[-8px_10px_rgb(55,65,81)] "
        }
        ${
          isActive &&
          !isFirst &&
          "before:h-4 before:w-4 before:rounded-full before:left-[-16px] before:bottom-0 before:content-[''] before:bg-transparent before:absolute before:shadow-[8px_10px_rgb(55,65,81)]"
        }
      `}
    >
      {label}
    </button>
  );
};

export default PracNavItem;
