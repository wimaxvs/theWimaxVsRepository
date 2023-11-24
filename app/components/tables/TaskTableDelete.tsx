import useAllTasks from "@/app/hooks/useAllTasks";
import useDriver from "@/app/hooks/useCurrentDriver";
import { SafeDriver, SafeSettlement } from "@/app/types";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const TaskTableDelete = () => {
  let [isLoading, setIsLoading] = useState<boolean>();
  const { theTasks, setTheTasks } = useAllTasks();
    let { setDriver, currentDriver, setCurrentDriver } = useDriver();


  let onUsun = (taskId: string, driverId: string) => {
    setIsLoading(true);
    let deets = {
      driverId,
      taskId,
    };
    let toDb = JSON.stringify(deets);

    axios
      .post("/api/rozpiski/delete", toDb)
      .then(
        (
          res: AxiosResponse<{
            message: string;
            code?: string | number;
            allTheTasks?: Partial<SafeSettlement>[];
            affectedDriver: Partial<SafeDriver> | null;
          }>
        ) => {
          console.log(res.data.allTheTasks);
          setTheTasks(res.data.allTheTasks as Partial<SafeSettlement>[]);
          if (res.data.affectedDriver) {
            if (res.data.affectedDriver.id == currentDriver?.id) {
              setCurrentDriver(res.data.affectedDriver);
            }
            setDriver(res.data.affectedDriver);
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
      className={`md:min-w-[50%] md:max-w-[50%] w-full flex flex-col gap-2 items-start p-4 rounded-md bg-gray-950`}
    >
      <h3 className="text-white font-extrabold md:text-xl text-sm mb-2">
        Usuń tras
      </h3>
      <div className={`w-full p-2 pl-0 overflow-y-auto`}>
        <table className="table table-zebra rounded-md">
          <thead>
            <tr>
              <th></th>
              <th>Miasto Start</th>
              <th>Miasto Konieć</th>
              <th>Usuñ</th>
            </tr>
          </thead>
          <tbody>
            {theTasks &&
              theTasks.map((task, index) => {
                return (
                  <tr key={index} className={`border-none hover`}>
                    <th
                      className={`${
                        index % 2 == 1 && "rounded-tl-md rounded-bl-md"
                      }`}
                    >
                      {index + 1}
                    </th>
                    <td>{task.startLocation?.city}</td>
                    <td> {task.endLocation?.city}</td>
                    <td
                      className={`${
                        index % 2 == 1 && "rounded-tr-md rounded-br-md"
                      }`}
                    >
                      <button
                        onClick={() =>
                          onUsun(task?.id as string, task?.driver?.id as string)
                        }
                        disabled={isLoading}
                        className="p-2 rounded-md bg-red-400 disabled:bg-red-300 font-bold text-white"
                      >
                        Usuń
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTableDelete;
