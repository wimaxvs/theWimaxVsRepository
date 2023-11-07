"use client";
import React from "react";

interface PracNavItemProps {
  theLocation: string;
  onClickFunc: (location: string) => void;
  label: string;
}
const PracNavItem: React.FC<PracNavItemProps> = ({
  onClickFunc,
  label,
  theLocation,
}) => {
  let isAtZatrudnij = theLocation === "Zatrudnij";
  let isAtZwolnij = theLocation === "Zwolnij lub Awansuj";
  return (
    <button
      onClick={() => onClickFunc(label)}
      className={`p-4  rounded-t-xl relative
      ${
        theLocation === label
          ? "bg-gray-700 text-[#1fb2a6] font-extrabold"
          : theLocation !== label && isAtZatrudnij
          ? "font-semibold bg-gray-800 before:h-4 before:w-4 before:rounded-full before:left-0 before:bottom-0 before:content-[''] before:bg-transparent before:absolute before:shadow-[-8px_10px_rgb(55,65,81)]     after:h-4 after:w-4 after:rounded-full after:right-[-16px] after:bottom-0 after:content-[''] after:bg-transparent after:absolute after:shadow-[-8px_10px_rgb(31,41,55)] after:z-0"
          : "font-semibold bg-gray-800"
      }
      ${
        theLocation === label && isAtZwolnij
          ? "after:h-4 after:w-4 after:rounded-full after:right-[-16px] after:bottom-0 after:content-[''] after:bg-transparent after:absolute after:shadow-[-8px_10px_rgb(55,65,81)] before:h-4 before:w-4 before:rounded-full before:left-[-16px] before:bottom-0 before:content-[''] before:bg-transparent before:absolute before:shadow-[8px_10px_rgb(55,65,81)]"
          : ""
      }`}
    >
      {label}
    </button>
  );
};

export default PracNavItem;
