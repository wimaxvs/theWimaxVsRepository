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
  parentSection: string;
}

const SubSectionInput: React.FC<SubSectionInputProps> = ({
  order,
  register,
  errors,
  control,
  parentSection,
}) => {
  const [innerOrder, setInnerOrder] = useState<number>(order + 1);
  const noDate =[
    "Languages",
    "Skills",
    "Hobbies",
    "Awards",
  ];
  const noContent =[
    "Languages",
    "Skills",
    "Hobbies",
  ];

  const dontPutDate = noDate.indexOf(parentSection) >= 0;
  const dontPutContent = noContent.indexOf(parentSection) >= 0;
  const dontPutOrder = parentSection === "Hobbies";

  const inputSectionDivContent: {
    inputId: string;
    inputLabel: string;
    type?: string;
    defaultValue?: any;
  }[][] = [
    [
      {
        inputId: "order",
        inputLabel: dontPutContent ? "Level" : "Order",
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
                .join("-")} 
                flex flex-row gap-4 items-center justify-start drop-shadow-none w-full`}
            >
              {theDiv
                .filter((div) =>
                  dontPutDate
                    ? ["dateFrom", "dateTo"].indexOf(div.inputId) < 0
                    : true
                )
                .filter((div) =>
                  dontPutContent ? div.inputId !== "subTitle" : true
                )
                .filter((div) =>
                  dontPutOrder ? div.inputId !== "order" : true
                )
                .map((obj, i) => {
                  return (
                    <React.Fragment key={i}>
                      <div
                        className={`${
                          obj.inputId === "title"
                            ? "w-2/3 md:w-full"
                            : obj.inputId === "subTitle"
                            ? "w-full"
                            : "w-1/4"
                        }`}
                      >
                        <Input
                          setMax10 = {obj.inputLabel === "Level"}
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
      {!dontPutContent && (
        <SubSectionContentInput
          register={register}
          errors={errors}
          control={control}
          order={order}
        />
      )}
    </section>
  );
};

export default SubSectionInput;
