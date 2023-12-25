import React, { useState } from "react";
import InputDecipher from "./inputs/InputDecipher";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { GiTireTracks } from "react-icons/gi";
import { GiFinishLine } from "react-icons/gi";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { SafeSettlement } from "@/app/types";
import useAllTasks from "@/app/hooks/useAllTasks";

const TaskAdditionForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setTheTasks } = useAllTasks();
  

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      startLocation: "",
      endLocation: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
      setIsLoading((isLoading) => !isLoading);
      console.log(data);

    let toDb = JSON.stringify(data);

    axios
      .post("/api/rozpiski", toDb)
      .then(
        (
          res: AxiosResponse<{
            allTheTasks: Partial<SafeSettlement>[];
            code?: number;
            message?: string;
          }>
        ) => {
          if (res.data.code === 500 || res.data.code === 400) {
            console.log(res.data);
            throw new Error(res.data.message);
          }
          setTheTasks(res.data.allTheTasks);
          toast.success(
            <>
              <div className="p-4 text-bold text-green-800 flex flex-col items-center bg-green-100 rounded-lg my-4">
                {`${res.data.message}`}
              </div>
            </>
          );
          return reset();
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`md:min-w-[50%] md:max-w-[50%] w-full flex flex-col gap-2 items-start p-4 rounded-md bg-gray-950`}
    >
        <h3 className="text-white font-extrabold md:text-xl text-sm mb-2">
          Dodaj trasę
        </h3>
      <div className={`w-full p-2 pl-0 overflow-y-auto`}>
        <div className={`w-full flex flex-row justify-between`}>
          <InputDecipher
            widthSet="max-w-[50%]"
            IconPassed={<GiTireTracks size={20} color={"black"} />}
            register={register}
            registerId={"startLocation"}
            inputType={"text"}
            placeholder={"Miasto Start"}
            autocomplete={false}
          />
          <InputDecipher
            widthSet="max-w-[45%]"
            IconPassed={<GiFinishLine size={20} color={"black"} />}
            register={register}
            registerId={"endLocation"}
            inputType={"text"}
            placeholder={"Miasto konieć"}
            autocomplete={false}
          />
        </div>
      </div>
      <button
        disabled={isLoading}
        type="submit"
        className={
          "p-3 bg-deep-blue text-white font-semibold rounded-md disabled:opacity-75"
        }
      >
        Prześlij
      </button>
    </form>
  );
};

export default TaskAdditionForm;
