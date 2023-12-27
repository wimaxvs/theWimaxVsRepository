"use client";
import React, { useEffect } from "react";
import useAllTasks from "@/app/hooks/useAllTasks";
import { SafeSettlement } from "@/app/types";
import useDriver from "@/app/hooks/useCurrentDriver";
import RozliczenieModalButton from "../forRozliczeniaPage/RozliczenieModalButton";

interface TaskTableAcceptDenyProps {
  allTheTasks: SafeSettlement[] | null;
  isRozliczenie?: boolean;
}

const TaskTableAcceptDeny: React.FC<TaskTableAcceptDenyProps> = ({
  allTheTasks,
  isRozliczenie,
}) => {
  let { theTasks, setTheTasks } = useAllTasks();
  let { currentDriver } = useDriver();

  let tasksToMap = theTasks.filter(
    (task) => task.isSettled && !task?.approvalStatus
  );

  useEffect(() => {
    console.log(tasksToMap);
    if (theTasks?.length < 1 && allTheTasks) {
      setTheTasks(allTheTasks);
    }
  }, [allTheTasks, setTheTasks, theTasks?.length]);

  return (
    <div
      className={`md:max-w-full md:min-w-[45%] w-full flex flex-col gap-2 items-start p-4 rounded-md bg-gray-950`}
    >
      <div className={`w-full p-2 pl-0 overflow-y-auto`}>
        <h3 className="text-white font-extrabold md:text-xl text-sm mb-1">
          {`Poniżej znajdują się rozliczony trasy`}{" "}
        </h3>
        <p className="text-gray-500 font-semibold md:text-sm text-xs mb-3">
          {isRozliczenie
            ? `Kliknij „Pogląd”, aby wyświetlić i zaakceptować/odrzucić rozliczenie`
            : `Kliknij „Przypisz trasę”, aby przypisać trasę kierowcy`}
        </p>
        <div className="max-w-[11/12] overflow-x-auto pb-3">
          <table className="table table-zebra rounded-md">
            <thead>
              <tr>
                <th></th>
                <th className={`text-gray-100`}>Miasto Start</th>
                <th className={`text-gray-100`}>Miasto Koniec</th>
                <th className={`text-gray-100`} colSpan={2}>
                  Status
                </th>
                {currentDriver?.role !== "KIEROWCA" &&
                  currentDriver?.role !== "PROBNY" && (
                    <>
                      <th>Pogląd</th>
                    </>
                  )}
              </tr>
            </thead>
            <tbody>
              {tasksToMap &&
                tasksToMap.map((task, index) => {
                  return (
                    <tr key={index} className={`border-none hover`}>
                      <th
                        className={`${
                          index % 2 == 1 && "rounded-tl-md rounded-bl-md"
                        }`}
                      >
                        {index + 1}
                      </th>
                      <td>
                        <div className="text-sm opacity-50 flex flex-col items-start">
                          <p className="text-sm text-gray-300 font-semibold">
                            {task?.startLocation?.city}
                          </p>
                          <p className="text-md text-gray-300 font-semibold">
                            {task?.startLocation?.country}
                          </p>
                          <p className="text-sm text-gray-300 font-semibold">
                            {task?.startLocation?.zipCode}
                          </p>
                        </div>
                      </td>
                      <td>
                        {" "}
                        <div className="text-sm opacity-50 flex flex-col items-start">
                          <p className="text-sm text-gray-300 font-semibold">
                            {task?.endLocation?.city}
                          </p>
                          <p className="text-md text-gray-300 font-semibold">
                            {task?.endLocation?.country}
                          </p>
                          <p className="text-sm text-gray-300 font-semibold">
                            {task?.endLocation?.zipCode}
                          </p>
                        </div>
                      </td>
                      <td>
                        <p className="text-sm text-gray-300 font-semibold">
                          {task?.isSettled == true
                            ? "Ustalona"
                            : "Nie ustalona"}
                        </p>
                      </td>
                      <td>
                        <p className="text-sm text-gray-300 font-semibold">
                          {task?.approvalStatus == true
                            ? "Zaakceptowana"
                            : "Nie zaakceptowany"}
                        </p>
                      </td>
                      {currentDriver?.role !== "KIEROWCA" &&
                        currentDriver?.role !== "PROBNY" && (
                          <>
                            <td>
                              <RozliczenieModalButton
                                task={task}
                                buttonId={task.id!}
                              />
                            </td>
                          </>
                        )}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TaskTableAcceptDeny;
