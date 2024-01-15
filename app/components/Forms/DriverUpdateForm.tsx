"use client";
import axios, { AxiosResponse } from "axios";
import React, { useState } from "react";
import useIA from "./ImageAddition/hooks/useIA";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useDriver from "@/app/hooks/useCurrentDriver";
import ImageAddition from "./ImageAddition/ImageAddition";

import { MdOutlinePermIdentity } from "react-icons/md";
import { AiOutlineIdcard } from "react-icons/ai";
import { CiMapPin } from "react-icons/ci";
import { BsPinMap, BsPostageHeart } from "react-icons/bs";
import { Driver } from "@prisma/client";
import InputDecipher from "./inputs/InputDecipher";

const DriverUpdateForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { currentDriver, setCurrentDriver } = useDriver();
  const { uploadFile } = useIA();

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      username: "",
      image: "",
      currentLocation: { country: "", city: "", zipCode: "" },
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading((isLoading) => !isLoading);

    let imgData: string;
    if (typeof data.image[0] !== "object") {
      imgData = currentDriver?.image as string;
    } else {
      imgData = await uploadFile(data.image[0]);
    }
    data = {
      ...data,
      image: imgData,
    };

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
        className={`md:max-w-[50%] md:min-w-[45%] w-full flex flex-col gap-2 items-start p-4 rounded-md `} //bg-white
      >
        <div className={`w-full p-2 pl-0 md:max-h-[380px] overflow-y-scroll`}>
          <h3 className="text-md text-white font-semibold my-2 ">
            Twoje prawdziwe imię i nazwisko, a następnie nazwa użytkownika...{" "}
          </h3>
          <InputDecipher
            IconPassed={<MdOutlinePermIdentity size={20} color={"black"} />}
            register={register}
            registerId={"name"}
            inputType={"text"}
            placeholder={currentDriver?.name!}
            ifPlaceholderMissing={"Twoje imię i nazwisko"}
          />
          <InputDecipher
            IconPassed={<AiOutlineIdcard size={20} color={"black"} />}
            register={register}
            registerId={"username"}
            inputType={"text"}
            placeholder={currentDriver?.username!}
            ifPlaceholderMissing={"Twój nick"}
          />
          <h3 className="text-md text-white font-semibold my-2 ">
            Gdzie jesteś teraz?
          </h3>
          <InputDecipher
            IconPassed={<CiMapPin size={20} color={"black"} />}
            register={register}
            registerId={"currentLocation.city"}
            inputType={"text"}
            placeholder={currentDriver?.currentLocation?.city!}
            ifPlaceholderMissing={"Obecne miasto"}
          />

          <div className={`w-full flex flex-row justify-between`}>
            <InputDecipher
              widthSet="max-w-[50%]"
              IconPassed={<BsPinMap size={20} color={"black"} />}
              register={register}
              registerId={"currentLocation.country"}
              inputType={"text"}
              placeholder={currentDriver?.currentLocation?.country!}
              ifPlaceholderMissing={"Obecne kraj"}
            />
            <InputDecipher
              widthSet="max-w-[45%]"
              IconPassed={<BsPostageHeart size={20} color={"black"} />}
              register={register}
              registerId={"currentLocation.zipCode"}
              inputType={"text"}
              placeholder={currentDriver?.currentLocation?.zipCode!}
              ifPlaceholderMissing={"Kod Pocztowy"}
            />
          </div>
          <ImageAddition id={"image"} register={register} />
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
