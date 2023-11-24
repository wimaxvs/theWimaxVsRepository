import React, { useEffect, useState } from "react";
import useAllTasks from "@/app/hooks/useAllTasks";
import { SafeDriver, SafeSettlement } from "@/app/types";
import useDriver from "@/app/hooks/useCurrentDriver";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";

interface TaskTableAssignProps {
  allTheTasks: SafeSettlement[] | null;
}

const TaskTableAssign: React.FC<TaskTableAssignProps> = ({ allTheTasks }) => {
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let { theTasks, setTheTasks, setTaskBeingAssigned } = useAllTasks();

  let { currentDriver, setCurrentDriver, setDriver, setAllDrivers } = useDriver();

  let tasksToMap =
    currentDriver?.role === "DRIVER"
      ? theTasks.filter((task) => task?.driver?.id === currentDriver?.id)
      : theTasks;

  useEffect(() => {
    if (theTasks?.length < 1 && allTheTasks) {
      setTheTasks(allTheTasks);
    }
  }, [allTheTasks, setTheTasks, theTasks?.length]);

  let onPrzypisz = (task: Partial<SafeSettlement>) => {
    setIsLoading(true);
    setTaskBeingAssigned(task);
    setIsLoading(false);
  };

  let onAnnul = (task: Partial<SafeSettlement>) => {
      let data = JSON.stringify({
        driverId: task.driver?.id,
        taskId: task.id,
      });
      axios
        .post("/api/rozpiski/unassign", data)
        .then(
          (
            res: AxiosResponse<{
              message: string;
              code?: string | number;
              allTheTasks?: Partial<SafeSettlement>[];
              affectedDriver: Partial<SafeDriver> | null;
              allTheDrivers: Partial<SafeDriver>[] | null;
            }>
          ) => {
            setTheTasks(res.data.allTheTasks as Partial<SafeSettlement>[]);
            if (res.data.affectedDriver) {
              if (res.data.affectedDriver.id == currentDriver?.id) {
                setCurrentDriver(res.data.affectedDriver);
              }
              setDriver(res.data.affectedDriver);
            }
            if (res.data.allTheDrivers) {
              setAllDrivers(res.data.allTheDrivers);
            }

            return toast.success(
              <>
                <div className="p-4 text-bold text-green-800 flex flex-col items-center bg-green-100 rounded-lg my-4">
                  {`${res.data.message}`}
                </div>
              </>
            );
          }
        )
        .catch((error: any) => {
          if (error.code) {
            switch (error.code) {
              case "ERR_BAD_RESPONSE":
                return toast.error(`Błąd`);
            }
          } else {
            return toast.error(error.message);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    
  };

  return (
    <div
      className={`md:max-w-full md:min-w-[45%] w-full flex flex-col gap-2 items-start p-4 rounded-md bg-gray-950`}
    >
      <div className={`w-full p-2 pl-0 overflow-y-auto`}>
        <h3 className="text-white font-extrabold md:text-xl text-sm mb-1">
          Poniżej znajdują się niekompletne trasy{" "}
        </h3>
        <p className="text-gray-500 font-semibold md:text-sm text-xs mb-3">
          {`Kliknij „Przypisz tras”, aby przypisać trasę kierowcy`}
        </p>
        <div className="max-w-[11/12] overflow-x-auto pb-3">
          <table className="table table-zebra rounded-md">
            <thead>
              <tr>
                <th></th>
                <th>Miasto Start</th>
                <th>Miasto Koniec</th>
                <th>Status</th>
                {currentDriver?.role !== "DRIVER" && (
                  <>
                    <th>Wyznacz tras</th>
                    <th>Anuluj przypisanie</th>
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
                          {task?.approvalStatus == true
                            ? "Zaakceptowana"
                            : "Nie zaakceptowany"}
                        </p>
                      </td>
                      {currentDriver?.role !== "DRIVER" && (
                        <>
                          <td>
                            {" "}
                            <button
                              onClick={() => onPrzypisz(task)}
                              disabled={
                                (Boolean(task.beginImage) &&
                                  Boolean(task.endImage)) ||
                                isLoading ||
                                Boolean(task.driver)
                              }
                              className="p-2 rounded-md bg-green-600 disabled:opacity-50 font-bold text-white"
                            >
                              {Boolean(task.driver)
                                ? "Przypisany"
                                : "Przypisz tras"}
                            </button>
                          </td>
                          <td>
                            {Boolean(task?.driver) && <button
                              onClick={() => onAnnul(task)}
                              disabled={isLoading}
                              className="p-2 rounded-md bg-red-400 disabled:opacity-50 font-bold text-white"
                            >
                              Anuluj przypisanie
                            </button>}
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

export default TaskTableAssign;
