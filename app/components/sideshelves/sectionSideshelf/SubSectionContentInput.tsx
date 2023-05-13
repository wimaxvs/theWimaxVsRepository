import React from "react";
import Button from "../../Button";
import Input from "../../Inputs/Input";
import {
  Control,
  FieldArrayMethodProps,
  FieldErrors,
  FieldValues,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";
import { BsTrash } from "react-icons/bs";

interface InputArrayProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors<FieldValues>;
  control: Control<FieldValues, any>;
  order: number
}

const SubSectionContentInput: React.FC<InputArrayProps> = ({
  register,
  errors,
  control,
  order
}) => {

  const { fields, append, remove } = useFieldArray({
    control,
    name: `subsegments[${order}].content`, // unique name for your Field Array
  });

  const addContent = () => {
    append({});
  }

  const inputSectionContentInputs: React.ReactNode = (
    <>
      {/* Dynamic array inputs */}
      {fields.map((field, index) => (
        <div
          className={`flex flex-row gap-4 items-center justify-start drop-shadow-none w-full`}
          key={field.id}
        >
          <Input
            id={`subsegments[${order}].content[${index}].description`}
            label={`Field ${index + 1}`}
            isBioData
            disabled={false}
            register={register}
            errors={errors}
            required
          />
          <div className="w-1/6 h-full">
            <Button
              isBinToRight
              danger
              label={""}
              iconColor={"red"}
              onClick={() => remove(index)}
              icon={BsTrash}
            />
          </div>
        </div>
      ))}

      <Button third label={"Add Content"} onClick={addContent} />
    </>
  );

  return (
    <>
      <p className="subSegmentContentArray text-deep-blue/40 font-bold text-md w-full">
        Care to specify further...?
      </p>
      <div className="contentInputArrays flex flex-col gap-2 w-full drop-shadow-md rounded-md items-center">
        {inputSectionContentInputs}
      </div>
    </>
  );
};

export default SubSectionContentInput;
