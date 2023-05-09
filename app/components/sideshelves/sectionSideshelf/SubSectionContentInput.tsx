import React from 'react'
import Button from "../../Button";
import Input from "../../Inputs/Input";
import { FieldArrayMethodProps, FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';
import { BsTrash } from "react-icons/bs";


interface InputArrayProps{
    fields: Record<"id", string>[];
    register: UseFormRegister<FieldValues>;
    remove: (index?: number | number[] | undefined) => void;
    errors: FieldErrors<FieldValues>;
    append: (value: unknown, options?: FieldArrayMethodProps | undefined) => void
}

const SubSectionContentInput: React.FC<InputArrayProps> = ({fields, register, remove, errors, append}) => {

    const inputSectionContentInputs: React.ReactNode = (
    <>
      {/* Dynamic array inputs */}
      {fields.map((field, index) => (
        <div
          className={`flex flex-row gap-4 items-center justify-start drop-shadow-none w-full`}
          key={field.id}
        >
          <Input
            id={`inputs[${index}].fieldName`}
            label={`Field ${index + 1}`}
            isBioData
            register={register}
            errors={errors}
            required
          />
          <div className="w-1/6">
            <Button
              label={"Bin"}
              iconColor={"red"}
              onClick={() => remove(index)}
              outline
              icon={BsTrash}
            />
          </div>
        </div>
      ))}

      <Button label={"Add Input"} onClick={() => append({ value: "" })} />
    </>
  );
    
  return (
    <>
      <p className="subSegmentContentArray text-deep-blue/40 font-bold text-md w-full">
        Care to specify further...?
      </p>
      <div className="contentInputArrays flex flex-col gap-2 w-full drop-shadow-md rounded-md my-2 py-2 items-center">
        {inputSectionContentInputs}
      </div>
    </>
  );
}

export default SubSectionContentInput