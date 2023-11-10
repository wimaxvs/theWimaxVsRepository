"use client";
import React, { useEffect } from "react";
import usePracNav from "@/app/hooks/usePracNav";
import RequestTable from "../../tables/RequestTable";
import { SafeDriver } from "@/app/types";
import PromotionTable from "../../tables/PromotionTable";
import useDriver from "@/app/hooks/useCurrentDriver";

interface PracBodyProps {
  allTheDrivers: Partial<SafeDriver>[];
  firmId: string;
  children?: React.ReactNode;
}

const PracBody: React.FC<PracBodyProps> = ({
  allTheDrivers,
  firmId,
  children,
}) => {
  let { theLocation, isFirstTab } = usePracNav();

  return (
    <div
      className={`h-full bg-gray-700 rounded-b-xl rounded-tr-xl p-3 z-10 
        ${!isFirstTab && "rounded-tl-xl"}
      `}
    >
      {children && children}
      {!children && (
        <>
          {theLocation === "Zatrudnij" && (
            <RequestTable allTheDrivers={allTheDrivers} firmId={firmId} />
          )}
          {theLocation === "Zwolnij lub Awansuj" && (
            <PromotionTable allTheDrivers={allTheDrivers} firmId={firmId} />
          )}
        </>
      )}
    </div>
  );
};

export default PracBody;
