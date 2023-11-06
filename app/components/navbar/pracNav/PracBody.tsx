"use client";
import React from "react";
import usePracNav from "@/app/hooks/usePracNav";
import RequestTable from "../../tables/RequestTable";
import { SafeDriver } from "@/app/types";

interface PracBodyProps {
    allTheDrivers: Partial<SafeDriver>[];
    firmId: string
}

const PracBody: React.FC<PracBodyProps> = ({ allTheDrivers, firmId }) => {
  let { theLocation } = usePracNav();
  return (
    <div className={`h-full bg-gray-700 rounded-b-xl rounded-tr-xl p-3 z-10`}>
      {theLocation === "Zatrudnij" && (
        <RequestTable allTheDrivers={allTheDrivers} firmId={firmId} />
      )}
    </div>
  );
};

export default PracBody;
