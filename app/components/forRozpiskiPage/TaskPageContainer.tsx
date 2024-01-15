"use client";
import usePracNav from "@/app/hooks/usePracNav";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { SafeDriver, SafeSettlement } from "@/app/types";
import TaskView from "./TaskView";
import AddDeleteTasks from "./AddDeleteTasks";

interface TaskPageContainerProps {
  allTheTasks: SafeSettlement[] | null;
  allTheDrivers: SafeDriver[];

  firmId: string | undefined;
}

const TaskPageContainer: React.FC<TaskPageContainerProps> = ({
  allTheTasks,
  allTheDrivers,
  firmId,
}) => {
  let { theLocation, setTheLocation } = usePracNav();
  let pathname = usePathname();

  useEffect(() => {
    if (pathname?.includes("rozpiski")) {
      setTheLocation("Niewykonane trasy");
    }
  }, [pathname, setTheLocation]);

  return (
    <div className={`w-full h-full flex flex-row p-3`}>
      {theLocation == "Niewykonane trasy" && (
        <TaskView
          allTheTasks={allTheTasks}
          allTheDrivers={allTheDrivers}
          firmId={firmId}
        />
      )}

      {theLocation == "Dodaj lub usuń trasę" && <AddDeleteTasks />}
    </div>
  );
};

export default TaskPageContainer;
