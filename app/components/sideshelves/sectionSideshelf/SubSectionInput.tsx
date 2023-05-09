"use client";

import React, { useState } from "react";
import Button from "../../Button";
import Input from "../../Inputs/Input";
import SubSectionInputContainer from './SubSectionInputContainer'
import { useFieldArray, FieldValues, SubmitHandler, useForm } from "react-hook-form";
import SubSectionContentInput from "./SubSectionContentInput";

interface SubSectionInputProps {
  order: number;
}

const SubSectionInput: React.FC<SubSectionInputProps> = ({ order }) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      order: 0,
      title: "",
      subTitle: "",
      dateFrom: "",
      dateTo: "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "content", // unique name for your Field Array
    rules: { minLength: 4 },
  });

  const inputSectionDivContent: {
    inputId: string;
    inputLabel: string;
    type?: string;
    defaultValue?: any;
  }[][] = [
    [
      {
        inputId: "order",
        inputLabel: "Order",
        type: "number",
        defaultValue: order,
      },
      { inputId: "title", inputLabel: "Title" },
    ],
    [
      { inputId: "subTitle", inputLabel: "SubTitle" },
      { inputId: "dateFrom", inputLabel: "From", type: "date" },
      { inputId: "dateTo", inputLabel: "To", type: "date" },
    ],
  ];

  const inputSectionDivs: React.ReactNode = (
    <>
      {inputSectionDivContent.map((theDiv, index) => {
        return (
          <>
            <div
              key={index}
              className={`${theDiv
                .map((obj) => obj.inputId)
                .join(
                  "-"
                )} flex flex-row gap-4 items-center justify-start drop-shadow-none w-full`}
            >
              {theDiv.map((obj, index) => {
                console.log(obj)
                return (
                  <>
                    <div
                      className={`${
                        obj.inputId === "title"
                          ? "w-full"
                          : obj.inputId === "subTitle"
                          ? "w-full"
                          : "w-1/6"
                      }`}
                    >
                      <Input
                        isBioData
                        key={index}
                        id={obj.inputId}
                        label={obj.inputLabel}
                        type={obj.type ? obj.type : ""}
                        disabled={false}
                        register={register}
                        errors={errors}
                        required
                        isSubSegment
                      />
                    </div>
                  </>
                );
              })}
            </div>
          </>
        );
      })}
    </>
  );

  return (
    <section
      className={`subSectionInput bg-off-white/40 drop-shadow-md rounded-md px-2 py-4 flex flex-col gap-2 items-center`}
    >
      {inputSectionDivs}
      <SubSectionContentInput fields={fields} register={register} remove={remove} errors={errors} append={append}/>
      
    </section>
  );
};

export default SubSectionInput;
