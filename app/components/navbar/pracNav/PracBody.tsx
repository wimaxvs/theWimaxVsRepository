"use client";
import React, { useEffect } from "react";
import usePracNav from "@/app/hooks/usePracNav";
import { SafeDriver } from "@/app/types";
import PromotionTable from "../../tables/PromotionTable";
import { usePathname } from "next/navigation";

interface PracBodyProps {
  allTheDrivers?: Partial<SafeDriver>[];
  firmId?: string;
  children?: React.ReactNode;
}

const PracBody: React.FC<PracBodyProps> = ({
  allTheDrivers,
  firmId,
  children,
}) => {
  let { theLocation, isFirstTab, setTheLocation } = usePracNav();

  let pathname = usePathname();

  useEffect(() => {
    if (pathname?.includes("pracownicy")) {
      console.log("hit");
      setTheLocation("Zwolnij lub Awansuj");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`h-full bg-gray-700 rounded-b-xl rounded-tr-xl p-3 z-10 
        ${!isFirstTab && "rounded-tl-xl"}
      `}
    >
      {children && children}
      {!children && (
        <>
          {theLocation === "Zwolnij lub Awansuj" && (
            <PromotionTable
              allTheDrivers={allTheDrivers as Partial<SafeDriver>[]}
              firmId={firmId as string}
            />
          )}
        </>
      )}
    </div>
  );
};

export default PracBody;
