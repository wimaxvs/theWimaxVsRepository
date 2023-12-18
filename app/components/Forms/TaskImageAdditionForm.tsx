"use client";
import React from "react";
import ImageAddition from "./ImageAddition/ImageAddition";
import useTaskBeingSent from "@/app/hooks/useTaskBeingSent";
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
  UseFormRegister,
} from "react-hook-form";
import { IoArrowBackOutline } from "react-icons/io5";

interface TaskImageAdditionFormProps {
  onClickFunc: SubmitHandler<FieldValues>;
  submitHandler: UseFormHandleSubmit<FieldValues>;
  register: UseFormRegister<FieldValues>,
  isLoading: boolean
}

const TaskImageAdditionForm: React.FC<TaskImageAdditionFormProps> = ({
  onClickFunc,
  submitHandler,
  register,
  isLoading
}) => {
  const { setPageNumber } = useTaskBeingSent();

  let goBack = () => {
    setPageNumber(0);
  };

  return (
    <>
      <div
        className={`md:max-w-full md:min-w-[45%] w-full flex flex-col gap-2 items-start p-4 rounded-md bg-gray-950`}
      >
        <div className="w-full flex flex-row justify-start" onClick={goBack}>
          <IoArrowBackOutline size={18} color={"white"} />
        </div>
        <div className={`w-full p-2 pl-0 overflow-y-auto`}>
          {/* Table Title */}
          <h3 className="text-white font-extrabold md:text-xl text-sm mb-1">
            {`Część końcowa.. część obrazkowa:`}
          </h3>
          <p
            className={`text-xs md:text-sm lg:text-md font-semibold mb-3 text-gray-500`}
          >
            {`Kliknij „+”, aby dodać zrzuty ekranu początkowe i końcowe i naciśnij „wyślij”, aby przesłać`}
          </p>
        </div>
        <div className="w-full flex flex-col md:flex-row gap-2 justify-evenly overflow-x-hidden mb-2">
          <ImageAddition
            id={"beginImage"}
            register={register}
            label={"Początek"}
          />
          <ImageAddition id={"endImage"} register={register} label={"Konieć"} />
        </div>
        <button
          className={`p-3 bg-deep-blue text-white font-semibold rounded-md disabled:opacity-75`}
          onClick={submitHandler(onClickFunc)}
          disabled={isLoading}
        >
          Wyślij
        </button>
      </div>
    </>
  );
};

export default TaskImageAdditionForm;
