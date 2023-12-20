import { SafeDriver, SafeSettlement } from "@/app/types";
import React, { useEffect } from "react";
import usePracNav from "@/app/hooks/usePracNav";
import useAllTasks from "@/app/hooks/useAllTasks";
import TaskTableAssign from "../tables/TaskTableAssign";
import DriverTableAssignVehicle from "../tables/DriverTableAssignVehicle.tsx";

interface TaskViewProps {
  allTheTasks: SafeSettlement[] | null;
  allTheDrivers: Partial<SafeDriver>[];
  firmId: string | undefined;
}

const TaskView: React.FC<TaskViewProps> = ({
  allTheTasks,
  allTheDrivers,
  firmId,
}) => {
  let { setIsFirstTab } = usePracNav();
  useEffect(() => {
    setIsFirstTab(true);
  }, [setIsFirstTab]);

  let { taskBeingAssigned } = useAllTasks();

  let tbaKeys = Object.keys(taskBeingAssigned);

  return (
    <div
      className={`mainContainer w-full flex flex-col md:flex-row justify-center gap-3 max-w-full`}
    >
      <div className="rightPartition md:max-w-[1/2] md:min-w-[1/2] md:max-h-full rounded-xl flex flex-col w-full min-h-[265.5px] max-h-[265.5px] overflow-y-scroll gap-1 pl-2 pr-3 pt-2 mr-4 bg-gray-950">
        {tbaKeys.length < 1 && <TaskTableAssign allTheTasks={allTheTasks} />}
        {tbaKeys.length >= 1 && (
          <DriverTableAssignVehicle
            isTras
            allTheDrivers={allTheDrivers}
            firmId={firmId}
        />
        )}
      </div>
    </div>
  );
};

export default TaskView;
