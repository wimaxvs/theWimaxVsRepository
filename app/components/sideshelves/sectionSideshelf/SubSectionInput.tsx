"use client";

import React, { useState } from "react";
import {
  FieldValues,
  UseFormRegister,
  FieldErrors,
  Control,
} from "react-hook-form";
import Input from "../../Inputs/Input";
import SubSectionContentInput from "./SubSectionContentInput";

interface SubSectionInputProps {
  order: number;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues, any>;
}

const SubSectionInput: React.FC<SubSectionInputProps> = ({
  order,
  register,
  errors,
  control,
}) => {
  const [innerOrder, setInnerOrder] = useState<number>(order + 1);

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
        defaultValue: innerOrder,
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
          <React.Fragment key={index}>
            <div
              className={`${theDiv
                .map((obj, i) => `${obj.inputId} ${i}`)
                .join(
                  "-"
                )} flex flex-row gap-4 items-center justify-start drop-shadow-none w-full`}
            >
              {theDiv.map((obj, i) => {
                return (
                  <React.Fragment key={i}>
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
                        id={`subsegments[${order}][${obj.inputId}]`}
                        label={obj.inputLabel}
                        type={obj.type ? obj.type : ""}
                        disabled={false}
                        register={register}
                        errors={errors}
                        required={obj.inputId === "title"}
                        isSubSegment
                        defaultValue={
                          obj.defaultValue ? obj.defaultValue : undefined
                        }
                      />
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </React.Fragment>
        );
      })}
    </>
  );

  return (
    <section
      className={`subSectionInput mt-6  drop-shadow-md rounded-md px-2 pt-4 flex flex-col w-11/12 gap-2 items-center`}
    >
      {inputSectionDivs}
      <SubSectionContentInput
        register={register}
        errors={errors}
        control={control}
        order={order}
      />
    </section>
  );
};

export default SubSectionInput;
