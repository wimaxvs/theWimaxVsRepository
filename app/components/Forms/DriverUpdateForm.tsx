"use client";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { MdOutlinePermIdentity } from "react-icons/md";
import useDriver from "@/app/hooks/useCurrentDriver";
import { AiOutlineIdcard } from "react-icons/ai";
import {CiMapPin } from "react-icons/ci"

const DriverUpdateForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentDriver } = useDriver();

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
    console.log(data);
    const extractedData = { ...data.firmDetails };
    let links = extractedData.firmSocials.map(
      (link: { link: string }) => link.link
    );

    let toDb = { ...extractedData, firmSocials: links };
    console.log(toDb);

    let deets = JSON.stringify(toDb);

    axios
      .post("/api/firms", deets)
      .then((res: AxiosResponse<any>) => {
        toast.success(
          <>
            <div className="p-4 text-bold text-green-800 flex flex-col items-center bg-green-100 rounded-lg my-4">
              {`${res.data.message}`}
            </div>
          </>
        );
        return reset();
      })
      .catch((error: any) => {
        console.log(error);
        switch (error.code) {
          case "ERR_BAD_RESPONSE":
            toast.error(`Błąd: Masz już firmę.`);
            break;

          default:
            break;
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`max-w-[50%] min-w-[45%]`}
      >
        <div
          className={`w-full flex flex-col gap-2 items-start mt-4 p-4 rounded-md bg-white`}
        >
          <div className={`w-full max-h-[350px] overflow-y-scroll p-2`}>
            <div className="relative w-full">
              <div className="absolute left-2 top-[26%] inline-block h-5 w-5">
                <MdOutlinePermIdentity size={20} />
              </div>

              <input
                type="text"
                className="mb-2 md:mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-8"
                placeholder={`${
                  currentDriver?.name || "Twoje imię i nazwisko"
                }`}
                {...register("name", {
                  required: false,
                  maxLength: 256,
                })}
              />
            </div>
            <div className="relative w-full">
              <div className="absolute left-2 top-[26%] inline-block h-5 w-5">
                <AiOutlineIdcard size={20} />
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
                <CiMapPin size={20} />
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
        </div>
      </form>
    </>
  );
};

export default DriverUpdateForm;
