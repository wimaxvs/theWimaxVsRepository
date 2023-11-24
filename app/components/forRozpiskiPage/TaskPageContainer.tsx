"use client";
import usePracNav from "@/app/hooks/usePracNav";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { SafeDriver, SafeSettlement } from "@/app/types";
import TaskView from "./TaskView";
import AddDeleteTasks from "./AddDeleteTasks";

interface TaskPageContainerProps {
  allTheTasks: SafeSettlement[] | null;
  theCurrentDriver: SafeDriver | null;
  allTheDrivers: SafeDriver[];

  firmId: string | undefined;
}

const TaskPageContainer: React.FC<TaskPageContainerProps> = ({
  allTheTasks,
  theCurrentDriver,
  allTheDrivers,
  firmId,
}) => {
  let { theLocation, setTheLocation } = usePracNav();
  let pathname = usePathname();

  useEffect(() => {
    if (pathname?.includes("rozpiski")) {
      setTheLocation("Niewykonanych trasy");
    }
  }, [pathname, setTheLocation]);

  return (
    <div className={`w-full h-full flex flex-row p-3`}>
      {theLocation == "Niewykonanych trasy" && (
        <TaskView
          theCurrentDriver={theCurrentDriver}
          allTheTasks={allTheTasks}
          allTheDrivers={allTheDrivers}
          firmId={firmId}
        />
      )}

      {theLocation == "Dodaj lub usuń tras" && (
        <AddDeleteTasks
          allTheTasks={allTheTasks}
          driverId={theCurrentDriver?.id}
        />
      )}
    </div>
  );
};

export default TaskPageContainer;
