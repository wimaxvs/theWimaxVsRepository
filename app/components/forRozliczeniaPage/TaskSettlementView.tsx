"use client"
import { SafeDriver, SafeSettlement } from "@/app/types";
import React, { useEffect } from "react";
import usePracNav from "@/app/hooks/usePracNav";
import useAllTasks from "@/app/hooks/useAllTasks";
import TaskTableRozlicz from "../tables/TaskTableRozlicz";
import TaskSettlementFormContainer from "../Forms/TaskSettlementFormContainer";

interface TaskSettlementViewProps {
  allTheTasks: SafeSettlement[] | null;
  theCurrentDriver: SafeDriver | null;
}

const TaskSettlementView: React.FC<TaskSettlementViewProps> = ({ allTheTasks, theCurrentDriver }) => {
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
        {tbaKeys.length < 1 && <TaskTableRozlicz allTheTasks={allTheTasks} />}
        {tbaKeys.length >= 1 && <TaskSettlementFormContainer theCurrentDriver={theCurrentDriver} />}
      </div>
    </div>
  );
};

export default TaskSettlementView;
