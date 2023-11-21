import React, { useEffect, useState } from "react";
import InputDecipher from "./inputs/InputDecipher";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useIA from "./ImageAddition/hooks/useIA";
import ImageAddition from "./ImageAddition/ImageAddition";
import useDriver from "@/app/hooks/useCurrentDriver";

import { ImInsertTemplate } from "react-icons/im";
import { TbBrandCodesandbox } from "react-icons/tb";
import { IoLogoModelS } from "react-icons/io";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { SafeVehicle } from "@/app/types";
import useAllVehicles from "@/app/hooks/useAllVehicles";

const VehicleAdditionForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { uploadFile } = useIA();
  const { currentDriver } = useDriver();
  const { setTheVehicles } = useAllVehicles();

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      registration: "",
      carMark: "",
      carModel: "",
      image: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading((isLoading) => !isLoading);
    let imgData: string;
    if (typeof data.image[0] !== "object") {
      imgData = "";
    } else {
      imgData = await uploadFile(data.image[0]);
    }
    data = {
      ...data,
      carImage: imgData,
    };

    let toDb = JSON.stringify(data);

    axios
      .post("/api/vehicles", toDb)
      .then(
        (
          res: AxiosResponse<{
            allTheVehicles: Partial<SafeVehicle>[];
            code?: number;
            message?: string;
            hitPoints?: { [key: string]: string };
          }>
        ) => {
          if (res.data.code === 500 || res.data.code === 400) {
            console.log(
              Object.values(res.data.hitPoints as { [key: string]: string })
            );
            throw new Error(res.data.message);
          }
          setTheVehicles(res.data.allTheVehicles);
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
      className={`md:max-w-full md:min-w-[45%] w-full flex flex-col gap-2 items-start p-4 rounded-md bg-gray-950`}
    >
      <div className={`w-full p-2 pl-0 overflow-y-auto`}>
        <h3 className="text-white font-extrabold md:text-xl text-sm mb-1">
          Dodaj pojazd
        </h3>
        <p className="text-gray-500 font-semibold md:text-sm text-xs mb-3">
          {`Dodaj szczegóły pojazdu i kliknij przycisk Prześlij.`}
        </p>
        <InputDecipher
          IconPassed={<ImInsertTemplate size={20} color={"black"} />}
          register={register}
          registerId={"registration"}
          inputType={"text"}
          placeholder={"Numer Rejestracyjne"}
          autocomplete={false}
        />

        <div className={`w-full flex flex-row justify-between`}>
          <InputDecipher
            widthSet="max-w-[50%]"
            IconPassed={<TbBrandCodesandbox size={20} color={"black"} />}
            register={register}
            registerId={"carMark"}
            inputType={"text"}
            placeholder={"Marka Pojazdu"}
            autocomplete={false}
          />
          <InputDecipher
            widthSet="max-w-[45%]"
            IconPassed={<IoLogoModelS size={20} color={"black"} />}
            register={register}
            registerId={"carModel"}
            inputType={"text"}
            placeholder={"Model Pojazdu"}
            autocomplete={false}
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
  );
};

export default VehicleAdditionForm;
