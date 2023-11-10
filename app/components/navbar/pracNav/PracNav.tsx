"use client";
import React from "react";
import PracNavItem from "./PracNavItem";
import usePracNav from "@/app/hooks/usePracNav";

interface PracNavProps {
  PracNavItems: string[];
}

const PracNav: React.FC<PracNavProps> = ({ PracNavItems }) => {
  let { theLocation } = usePracNav();

  return (
    <div className={`rounded-tr-xl flex flex-row w-full z-0`}>
      {PracNavItems.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <PracNavItem
              label={item}
              selected={item === theLocation}
              position={
                index === 0
                  ? "first"
                  : index === PracNavItems.length - 1
                  ? "last"
                  : undefined
              }
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PracNav;
