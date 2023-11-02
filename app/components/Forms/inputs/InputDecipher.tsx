import { SafeDriver } from "@/app/types";
import React, { ReactElement } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

interface InputDecipherProps {
  IconPassed: ReactElement<IconType>;
  register: UseFormRegister<FieldValues>;
  registerId: string;
  placeholder: string;
  inputType: string;
  ifPlaceholderMissing?: string;
  widthSet?: string;
  labelProvided?: string;
}

const InputDecipher: React.FC<InputDecipherProps> = ({
  IconPassed,
  register,
  registerId,
  placeholder,
  ifPlaceholderMissing,
  inputType,
  widthSet,
  labelProvided,
}) => {
  return (
    <>
      <div className={`relative ${widthSet ? widthSet : "w-full"}`}>
        {labelProvided && (
          <label htmlFor={registerId} className="mb-2 font-semibold text-black">
            {labelProvided}
          </label>
        )}
        <div
          className={`absolute left-2 ${
            labelProvided ? "top-[53%]" : "top-[26%]"
          } inline-block h-5 w-5`}
        >
          {IconPassed}
        </div>
        <input
          type={inputType}
          className="mb-2 md:mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-8"
          placeholder={`${placeholder || ifPlaceholderMissing}`}
          {...register(registerId, {
            required: false,
            maxLength: 256,
          })}
        />
      </div>
    </>
  );
};

export default InputDecipher;
