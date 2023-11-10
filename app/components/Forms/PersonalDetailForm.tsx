"use client";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useDriver from "@/app/hooks/useCurrentDriver";

import { MdOutlineMailOutline, MdOutlinePermIdentity } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import { nextResponseMessage } from "@/app/api/drupdate/route";
import { Driver } from "@prisma/client";
import InputDecipher from "./inputs/InputDecipher";

const PersonalDetailForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentDriver, setCurrentDriver } = useDriver();

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data: FieldValues) => {
    setIsLoading((isLoading) => !isLoading);

    let toDb = JSON.stringify(data);

    axios
      .post("/api/drupdate", toDb)
      .then(
        (
          res: AxiosResponse<{
            driver: Driver;
            code?: number;
            message?: string;
          }>
        ) => {
          if (res.data.code === 500 || res.data.code === 400) {
            throw new Error(res.data.message);
          }
          setCurrentDriver(res.data.driver);
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
        toast.error(
          <>
            <div className="p-4 text-bold text-red-800 flex flex-col items-center bg-rose-100 rounded-lg my-4">
              {`${error}`}
            </div>
          </>
        );
        return reset();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`md:max-w-[50%] md:min-w-[45%]`}
      >
        <div
          className={`w-full flex flex-col gap-1 items-start rounded-md max-h-[350px] p-6 bg-rose-200 md:overflow-y-auto`}
        >
          <h2 className="text-m md:text-lg lg:text-2xl font-bold mb-3 text-red-500">
            Strefa zagrozenia
          </h2>
          <div className={`w-full pl-0`}>
            <InputDecipher
              labelProvided={"Twój nowy adres e-mail"}
              IconPassed={<MdOutlineMailOutline size={20} color={"black"} />}
              register={register}
              registerId={"email"}
              inputType={"text"}
              placeholder={currentDriver?.email!}
              ifPlaceholderMissing={"Adres email"}
            />
            <InputDecipher
              labelProvided={"Twoje nowe hasło"}
              IconPassed={<RiLockPasswordLine size={20} color={"black"} />}
              register={register}
              registerId={"password"}
              inputType={"password"}
              placeholder={`Hasło`}
            />
          </div>
          <p className="text-xs text-black font-medium max-w-11/12 px-2">
            {`*Po zmianie adresu e-mail konieczne będzie ponowne zalogowanie się.`}
          </p>
          <button
            disabled={isLoading}
            type="submit"
            className={
              "p-3 bg-red-500 text-white font-semibold rounded-md disabled:opacity-75"
            }
          >
            Prześlij
          </button>
        </div>
      </form>
    </>
  );
};

export default PersonalDetailForm;
