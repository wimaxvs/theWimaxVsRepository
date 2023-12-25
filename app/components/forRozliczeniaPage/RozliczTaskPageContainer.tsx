"use client";
import usePracNav from "@/app/hooks/usePracNav";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { SafeDriver, SafeSettlement } from "@/app/types";
import TaskSettlementView from "./TaskSettlementView";
import TaskTableAcceptDeny from "../tables/TaskTableAcceptDeny";

interface RozliczTaskPageContainerProps {
  allTheTasks: SafeSettlement[] | null;
  theCurrentDriver: SafeDriver | null;
}

const RozliczTaskPageContainer: React.FC<RozliczTaskPageContainerProps> = ({
  allTheTasks,
  theCurrentDriver,
}) => {
  let { theLocation, setTheLocation } = usePracNav();
  let pathname = usePathname();

  useEffect(() => {
    if (pathname?.includes("rozliczenia")) {
      setTheLocation("Ustal trasy");
    }
  }, [pathname, setTheLocation]);

  return (
    <div className={`w-full h-full flex flex-row p-3`}>
      {theLocation === "Ustal trasy" && (
        <TaskSettlementView
          allTheTasks={allTheTasks}
          theCurrentDriver={theCurrentDriver}
        />
      )}

      {theLocation == "Akceptuj lub anuluj ukończone trasy" && (
        <TaskTableAcceptDeny isRozliczenie allTheTasks={allTheTasks} />
      )}
    </div>
  );
};

export default RozliczTaskPageContainer;
