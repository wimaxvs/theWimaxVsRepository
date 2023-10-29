"use client";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useDriver from "@/app/hooks/useCurrentDriver";

import { MdOutlineMailOutline, MdOutlinePermIdentity } from "react-icons/md";
import {RiLockPasswordLine} from "react-icons/ri"

const PersonalDetailForm = () => {
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
      email: "",
      password: "",
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

    // axios
    //   .post("/api/drupdate", deets)
    //   .then((res: AxiosResponse<any>) => {
    //     toast.success(
    //       <>
    //         <div className="p-4 text-bold text-green-800 flex flex-col items-center bg-green-100 rounded-lg my-4">
    //           {`${res.data.message}`}
    //         </div>
    //       </>
    //     );
    //     return reset();
    //   })
    //   .catch((error: any) => {
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });
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
          <h2 className="text-m md:text-xl lg:text-4xl font-bold mb-3 text-red-500">
            Strefa niebezpieczeństwa
          </h2>
          <div className={`w-full pl-0`}>
            <div className="relative w-full">
              <div className="absolute left-2 top-[26%] inline-block h-5 w-5">
                <MdOutlineMailOutline size={20} />
              </div>

              <input
                type="email"
                className="mb-2 md:mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-8"
                placeholder={`${currentDriver?.email || "Twój adres email"}`}
                {...register("email", {
                  required: false,
                  maxLength: 256,
                })}
              />
            </div>
            <div className="relative w-full">
              <div className="absolute left-2 top-[26%] inline-block h-5 w-5">
                <RiLockPasswordLine size={20} />
              </div>
              <input
                type="password"
                className="mb-2 md:mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-8"
                placeholder={`${currentDriver?.password || "Hasło"}`}
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
        </div>
      </form>
    </>
  );
};

export default PersonalDetailForm;
