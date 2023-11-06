"use client";
import React from "react";
import usePracNav from "@/app/hooks/usePracNav";
import PracNavItem from "./PracNavItem";

const PracNav = () => {
  let { theLocation, setTheLocation } = usePracNav();
  let PracNavItems = ["Zatrudnij", "Zwolnij"];
  return (
    <div
      className={`rounded-tr-xl flex flex-row w-full z-0`}
    >
      {PracNavItems.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <PracNavItem
              label={item}
              onClickFunc={setTheLocation}
              theLocation={theLocation}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PracNav;
