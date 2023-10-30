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
    console.log(toDb);

    axios
      .post("/api/drupdate", toDb)
      .then(
        (
          res: AxiosResponse<{
            driver: Driver;
            successMessage: nextResponseMessage;
            message?: string;
          }>
        ) => {
          setCurrentDriver(res.data.driver);
          toast.success(
            <>
              <div className="p-4 text-bold text-green-800 flex flex-col items-center bg-green-100 rounded-lg my-4">
                {`${res.data.successMessage.message}`}
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
              {`${"Adres email jest już zajęty"}`}
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
          className={`w-full flex flex-col gap-2 items-start rounded-md max-h-[350px] p-6 bg-rose-200`}
        >
          <h2 className="text-m md:text-lg lg:text-2xl font-bold mb-3 text-red-500">
            Strefa zagrozenia
          </h2>
          <div className={`w-full pl-0`}>
            <div className="relative w-full">
              <label htmlFor="email" className="mb-2 font-semibold text-black">
                Twój nowy adres e-mail
              </label>
              <div className="absolute left-2 top-[50%] inline-block h-5 w-5">
                <MdOutlineMailOutline size={20} color={"black"} />
              </div>

              <input
                type="email"
                autoComplete="off"
                className="mb-2 md:mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-8"
                placeholder={`${currentDriver?.email || "Adres email"}`}
                {...register("email", {
                  required: false,
                  maxLength: 256,
                })}
              />
            </div>
            <div className="relative w-full">
              <label
                htmlFor="password"
                className="mb-2 font-semibold text-black"
              >
                Twoje nowe hasło
              </label>
              <div className="absolute left-2 top-[50%] inline-block h-5 w-5">
                <RiLockPasswordLine size={20} color={"black"} />
              </div>
              <input
                type="password"
                className="mb-2 md:mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-8"
                placeholder={`Hasło`}
                autoComplete="off"
                {...register("password", {
                  required: false,
                  maxLength: 256,
                })}
              />
            </div>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className={
              "p-3 bg-red-500 text-white font-semibold rounded-md disabled:opacity-75"
            }
          >
            Prześlij
          </button>
          <p className="text-sm text-black font-medium">
            {`*Po zmianie adresu e-mail konieczne będzie ponowne zalogowanie się.`}
          </p>
        </div>
      </form>
    </>
  );
};

export default PersonalDetailForm;
