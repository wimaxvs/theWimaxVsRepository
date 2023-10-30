"use client";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useDriver from "@/app/hooks/useCurrentDriver";

import { MdOutlinePermIdentity } from "react-icons/md";
import { AiOutlineIdcard } from "react-icons/ai";
import { CiMapPin } from "react-icons/ci";
import { BsPinMap, BsPostageHeart } from "react-icons/bs";
import { Driver } from "@prisma/client";
import { nextResponseMessage } from "@/app/api/drupdate/route";

const DriverUpdateForm = () => {
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
      name: "",
      userName: "",
      image: "",
      currentLocation: { country: "", city: "", zipCode: "" },
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

      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`md:max-w-[50%] md:min-w-[45%] w-full flex flex-col gap-2 items-start p-4 rounded-md bg-white`}
      >
        <div className={`w-full p-2 pl-0 md:max-h-[380px] overflow-y-scroll`}>
          <div className="relative w-full">
            <label htmlFor="email" className="mb-3 font-semibold text-black">
              Wpisz tutaj swoje imię i nazwisko, a następnie nową nazwę
              użytkownika:
            </label>
            <div className="absolute left-2 top-[65%] inline-block h-5 w-5">
              <MdOutlinePermIdentity size={20} color={"black"} />
            </div>

            <input
              type="text"
              className="mb-2 md:mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-8"
              placeholder={`${currentDriver?.name || "Twoje imię i nazwisko"}`}
              {...register("name", {
                required: false,
                maxLength: 256,
              })}
            />
          </div>
          <div className="relative w-full">
            <div className="absolute left-2 top-[26%] inline-block h-5 w-5">
              <AiOutlineIdcard size={20} color={"black"} />
            </div>
            <input
              type="text"
              className="mb-2 md:mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-8"
              placeholder={`${currentDriver?.username || "Twój nick"}`}
              {...register("username", {
                required: false,
                maxLength: 256,
              })}
            />
          </div>
          <h3 className="text-md text-black font-semibold my-2 ">
            Gdzie jesteś teraz?
          </h3>
          <div className="relative w-full">
            <div className="absolute left-2 top-[26%] inline-block h-5 w-5">
              <CiMapPin size={20} color={"black"} />
            </div>
            <input
              type="text"
              className="mb-2 md:mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-8"
              placeholder={`${
                currentDriver?.currentLocation?.city || "Obecne miasto"
              }`}
              {...register("currentLocation.city", {
                required: false,
                maxLength: 256,
              })}
            />
          </div>
          <div className={`w-full flex flex-row justify-between`}>
            <div className="relative max-w-[50%]">
              <div className="absolute left-2 top-[26%] inline-block h-5 w-5">
                <BsPinMap size={20} color={"black"} />
              </div>
              <input
                type="text"
                className="mb-2 md:mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-8"
                placeholder={`${
                  currentDriver?.currentLocation?.country || "Obecne kraj"
                }`}
                {...register("currentLocation.country", {
                  required: false,
                  maxLength: 256,
                })}
              />
            </div>
            <div className="relative max-w-[45%]">
              <div className="absolute left-2 top-[26%] inline-block h-5 w-5">
                <BsPostageHeart size={20} color={"black"} />
              </div>
              <input
                type="text"
                className="mb-2 md:mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-8"
                placeholder={`${
                  currentDriver?.currentLocation?.zipCode || "Kod Pocztowy"
                }`}
                {...register("currentLocation.zipCode", {
                  required: false,
                  maxLength: 256,
                })}
              />
            </div>
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
    </>
  );
};

export default DriverUpdateForm;
