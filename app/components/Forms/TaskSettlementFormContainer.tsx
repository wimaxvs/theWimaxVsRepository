"use client";
import React, { useState, useEffect } from "react";
import useTaskBeingSent from "@/app/hooks/useTaskBeingSent";
import useAllTasks from "@/app/hooks/useAllTasks";
import TaskSettlementForm from "./TaskSettlementForm";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import TaskImageAdditionForm from "./TaskImageAdditionForm";
import axios, { AxiosResponse } from "axios";
import { SafeDriver, SafeSettlement } from "@/app/types";
import toast from "react-hot-toast";
import useIA from "./ImageAddition/hooks/useIA";
import useDriver from "@/app/hooks/useCurrentDriver";

interface TaskSettlementFormContainerProps {
  theCurrentDriver: SafeDriver | null;
}

const TaskSettlementFormContainer: React.FC<
  TaskSettlementFormContainerProps
> = ({ theCurrentDriver }) => {
  let { pageNumber, setPageNumber } = useTaskBeingSent();
  let { uploadFile } = useIA();
  let { taskBeingAssigned, setTheTasks, setTaskBeingAssigned } = useAllTasks();
  let { setCurrentDriver, setDriver, currentDriver } = useDriver();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  let goAllTheWayBack = () => {
    setPageNumber(1);
    setTaskBeingAssigned({}, true);
  };

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      beginImage: taskBeingAssigned?.beginImage || "",
      endImage: taskBeingAssigned?.endImage || "",
      distanceCoveredSettlement:
        taskBeingAssigned?.distanceCoveredSettlement || 0,
      fuelUsed: taskBeingAssigned?.fuelUsed || 0,
      litersRefueled: taskBeingAssigned?.litersRefueled || 0,
      expensesSpent: taskBeingAssigned?.expensesSpent || 0,
      weight: taskBeingAssigned?.weight || 0,
      ferries: taskBeingAssigned?.ferries || 0,
      highways: taskBeingAssigned?.highways || "",
      products: taskBeingAssigned?.products || "",
      misc: taskBeingAssigned?.misc || "",
      endLocation: taskBeingAssigned.endLocation?.city,
      startLocation: taskBeingAssigned.startLocation?.city,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading((isLoading) => !isLoading);
    console.log(currentDriver);
    if (!currentDriver?.vehicle?.[0]) {
      toast.error(
        <>
          <div className="p-4 text-bold text-red-800 flex flex-col items-center bg-rose-100 rounded-lg my-4">
            {`${"Nie masz jeszcze przypisanego pojazdu. Porozmawiaj ze Spedytorem lub Zarzadem, aby przydzielił ci pojazd."}`}
          </div>
        </>
      );
      reset();
      goAllTheWayBack();
      return setIsLoading(false);
    }

    let taskId = taskBeingAssigned?.id;
    let bgnImg: string;
    let ndImg: string;
    if (typeof data.beginImage[0] !== "object") {
      bgnImg = "";
    } else {
      bgnImg = await uploadFile(data.beginImage[0]);
    }

    if (typeof data.endImage[0] !== "object") {
      ndImg = "";
    } else {
      ndImg = await uploadFile(data.endImage[0]);
    }

    data = {
      taskId,
      ...data,
      beginImage: bgnImg,
      endImage: ndImg,
    };

    console.log(data);

    let toDb = JSON.stringify(data);
    setIsLoading((isLoading) => !isLoading);

    axios
      .post("/api/rozpiski/rozliczenieUpdated", toDb)
      .then(
        (
          res: AxiosResponse<{
            allTheTasks: Partial<SafeSettlement>[];
            affectedDriver: Partial<SafeDriver> | null;
            code?: number;
            message?: string;
          }>
        ) => {
          if (res.data.code === 500 || res.data.code === 400) {
            console.log(res.data);
            throw new Error(res.data.message);
          }
          if (res.data.affectedDriver) {
            if (res.data.affectedDriver.id == currentDriver?.id) {
              setCurrentDriver(res.data.affectedDriver);
            }
            setDriver(res.data.affectedDriver);
          }
          setTheTasks(res.data.allTheTasks);
          toast.success(
            <>
              <div className="p-4 text-bold text-green-800 flex flex-col items-center bg-green-100 rounded-lg my-4">
                {`${res.data.message}`}
              </div>
            </>
          );
          reset();
          return goAllTheWayBack();
        }
      )
      .catch((error: any) => {
        console.log(error);
        toast.error(
          <>
            <div className="p-4 text-bold text-red-800 flex flex-col items-center bg-rose-100 rounded-lg my-4">
              {`${error.message}`}
            </div>
          </>
        );
        return;
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  let tbaVals = Object.values(taskBeingAssigned).length;

  return (
    <>
      {tbaVals > 0 && pageNumber <= 1 && (
        <TaskSettlementForm
          register={register}
        />
      )}
      {tbaVals > 0 && pageNumber > 1 && (
        <TaskImageAdditionForm
          isLoading={isLoading}
          onClickFunc={onSubmit}
          submitHandler={handleSubmit}
          register={register}
        />
      )}
    </>
  );
};

export default TaskSettlementFormContainer;
