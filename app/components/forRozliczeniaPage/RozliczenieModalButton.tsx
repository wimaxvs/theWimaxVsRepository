"use client"
import React, { useState } from "react";
import { SafeDriver, SafeSettlement } from "../../types";
import Carousel from "../Carousel";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import useDriver from "../../hooks/useCurrentDriver";
import useAllTasks from "../../hooks/useAllTasks";

interface ModalButtonProps {
  task: Partial<SafeSettlement>;
  buttonId: string;
}

const RozliczenieModalButton: React.FC<ModalButtonProps> = ({ task, buttonId }) => {
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let { currentDriver, setCurrentDriver, setDriver, setAllDrivers } =
    useDriver();
  let { setTheTasks } = useAllTasks();

  let detailComponent = (key: string, value: string | number) => (
    <div className={`md:max-w-[45%] md:min-w-[40%] flex flex-col gap-2 mr-2`}>
      <h3 className="text-sm text-white font-extrabold">{key.toUpperCase()}</h3>
      <p className="text-sm font-thin text-white">{value}</p>
    </div>
  );

  let onAction = (task: Partial<SafeSettlement>, approvalStatus: boolean) => {
    let data = JSON.stringify({
      approvalStatus,
      taskId: task.id,
    });
    axios
      .post("/api/rozpiski/rozliczenieUpdated/accept_reject", data)
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
          if (res.data.code == 400 || res.data.code == 500) {
            throw new Error(res.data.message);
          }

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
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        disabled={isLoading}
        className="btn p-2 rounded-md bg-green-600 disabled:opacity-50 font-bold text-white"
        onClick={() =>
          (
            document.getElementById(`my_modal_2_${buttonId}`) as HTMLFormElement
          ).showModal()
        }
      >
        Pogląd
      </button>
      <dialog id={`my_modal_2_${buttonId}`} className="modal">
        <div className="modal-box bg-gray-950 flex flex-col border-[#1fb2a6] border">
          <h3 className="font-bold text-lg text-white">
            Rozliczenia od kierowcy {task?.driver?.username}
          </h3>
          <p className="py-4 text-xs md:text-sm lg:text-md font-semibold mb-3 text-gray-500">
            {`Naciśnij „Akceptuj” lub „Odrzuć”, aby wykonać odpowiednie czynności`}
          </p>
          <Carousel task={task} detailComponent={detailComponent} />
          <div className="w-full flex flex-row justify-between px-3 mt-5">
            <button
              disabled={isLoading || task?.approvalStatus}
              onClick={() => onAction(task, true)}
              className="p-2 text-white font-bold rounded-md bg-green-600  disabled:opacity-50"
            >
              Akceptuj
            </button>
            <button
              disabled={isLoading}
              onClick={() => onAction(task, false)}
              className="p-2 text-white font-bold rounded-md bg-red-400 disabled:opacity-50"
            >
              Odrzuć
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default RozliczenieModalButton;

//beginImage: "",
//endImage: "",
//distanceCoveredSettlement: 0,
//fuelUsed: 0,
//litersRefueled: 0,
//expensesSpent: 0,
//weight: 0,
//ferries: 0,
//highways: "",
//products: "",
//misc: "",
//endLocation: taskBeingAssigned.endLocation?.city,
//startLocation: taskBeingAssigned.startLocation?.city,
