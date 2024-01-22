"use client";
import React, { useEffect, useState } from "react";
import InputDecipher from "./inputs/InputDecipher";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useIA from "./ImageAddition/hooks/useIA";
import ImageAddition from "./ImageAddition/ImageAddition";

import { ImInsertTemplate } from "react-icons/im";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { SafeVehicle } from "@/app/types";
import useAllVehicles from "@/app/hooks/useAllVehicles";
import { TbBrandCodesandbox } from "react-icons/tb";
import { IoLogoModelS } from "react-icons/io";
import { CiLineHeight } from "react-icons/ci";
import { AiOutlineColumnWidth } from "react-icons/ai";
import { CgArrowLongRightC } from "react-icons/cg";
import { FaWeight } from "react-icons/fa";
import { SlSpeedometer } from "react-icons/sl";

interface VehicleAdditionFormProps {
  wereEditing?: boolean;
  isTrailer?: boolean;
  vehicle?: Partial<SafeVehicle>;
}

const VehicleAdditionForm: React.FC<VehicleAdditionFormProps> = ({
  wereEditing,
  isTrailer,
  vehicle,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { uploadFile } = useIA();
  const { setTheVehicles } = useAllVehicles();

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      id: vehicle ? vehicle.id : "",
      registration: vehicle ? vehicle.registration : "",
      carMark: vehicle ? vehicle.carMark : "",
      carModel: vehicle ? vehicle.carModel : "",
      image: vehicle ? vehicle.carImage : "",
      height: vehicle ? vehicle.height : 0,
      width: vehicle ? vehicle.width : 0,
      length: vehicle ? vehicle.length : 0,
      maxWeight: vehicle ? vehicle.maxWeight : 0,
      mileage: vehicle ? vehicle.mileage : 0,
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
    setIsLoading((isLoading) => !isLoading);
    let imgData: string = "";

    if (typeof data.image[0] !== "object") {
      imgData = "";
    } else {
      imgData = await uploadFile(data.image[0]);
    }

    console.log(imgData);

    data = {
      ...data,
      carImage: imgData,
      isTrailer: isTrailer,
    };
    console.log(data);

    let toDb = JSON.stringify(data);

    let route = wereEditing ? "/api/vehicles/edit" : "/api/vehicles";

    axios
      .post(route, toDb)
      .then(
        (
          res: AxiosResponse<{
            allTheVehicles: Partial<SafeVehicle>[];
            code?: number;
            message?: string;
          }>
        ) => {
          if (res.data.code === 500 || res.data.code === 400) {
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
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`${
        wereEditing ? "md:w-4/5" : "md:max-w-full"
      } md:min-w-[45%] w-full flex flex-col gap-2 items-start p-4 rounded-md bg-gray-950 md:mx-auto`}
    >
      <div className={`w-full p-2 pl-0 overflow-y-scroll md:max-h-[92%]`}>
        <h3 className="text-white font-extrabold md:text-xl text-sm mb-1">
          {wereEditing
            ? "Edytuj poprzez wypełnienie formularza"
            : isTrailer
            ? "Dodaj przyczepę "
            : "Dodaj pojazd"}
        </h3>
        <p className="text-gray-500 font-semibold md:text-sm text-xs mb-3">
          {`Dodaj szczegóły ${
            isTrailer ? "przyczepy" : "pojazdu"
          } i kliknij przycisk Prześlij.`}
        </p>
        <InputDecipher
          IconPassed={<ImInsertTemplate size={20} color={"black"} />}
          register={register}
          registerId={"registration"}
          inputType={"text"}
          placeholder={"Numer Rejestracyjny"}
          autocomplete={false}
        />

        <div className={`w-full flex flex-row justify-between flex-wrap`}>
          {[
            {
              widthSet: "max-w-[50%] min-w-[50%]",
              registerId: "carMark",
              inputType: "text",
              placeholder: "Marka Pojazdu",
              isTrailer: false,
              IconPassed: <TbBrandCodesandbox size={20} color={"black"} />,
            },
            {
              widthSet: "max-w-[45%] min-w-[45%]",
              registerId: "carModel",
              inputType: "text",
              placeholder: "Model Pojazdu",
              isTrailer: false,
              IconPassed: <IoLogoModelS size={20} color={"black"} />,
            },
            {
              widthSet: "max-w-[45%] min-w-[45%]",
              registerId: "height",
              inputType: "number",
              step: 0.01,
              placeholder: "Wysokość (M)",
              isTrailer: true,
              IconPassed: <CiLineHeight size={20} color={"black"} />,
            },
            {
              widthSet: "max-w-[50%] min-w-[50%]",
              registerId: "width",
              inputType: "number",
              step: 0.01,
              placeholder: "Szerokość (M)",
              isTrailer: true,
              IconPassed: <AiOutlineColumnWidth size={20} color={"black"} />,
            },
            {
              widthSet: "max-w-[50%] min-w-[50%]",
              registerId: "length",
              inputType: "number",
              step: 0.01,
              placeholder: "Długość (M)",
              isTrailer: true,
              IconPassed: <CgArrowLongRightC size={20} color={"black"} />,
            },
            {
              widthSet: "max-w-[45%] min-w-[45%]",
              registerId: "maxWeight",
              inputType: "number",
              step: 0.01,
              placeholder: "Pojemność (kg)",
              isTrailer: true,
              IconPassed: <FaWeight size={20} color={"black"} />,
            },
            {
              widthSet: "w-full min-w-[45%]",
              registerId: "mileage",
              inputType: "number",
              step: 0.01,
              placeholder: "Przebieg (km)",
              IconPassed: <SlSpeedometer size={20} color={"black"} />,
            },
          ]
            .filter((item) =>
              isTrailer
                ? item.isTrailer
                : wereEditing
                ? true
                : item.isTrailer === false
            )
            .map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <InputDecipher
                    step={item.step}
                    widthSet={item.widthSet}
                    IconPassed={item.IconPassed}
                    register={register}
                    registerId={item.registerId}
                    inputType={item.inputType}
                    placeholder={item.placeholder}
                    autocomplete={false}
                  />
                </React.Fragment>
              );
            })}
        </div>
        <ImageAddition
          id={"image"}
          register={register}
          label={wereEditing ? "Nowe zdjęcia" : "Dodaj zdjęcie"}
        />
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
