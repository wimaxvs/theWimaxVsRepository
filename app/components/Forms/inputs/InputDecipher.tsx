import React, { ReactElement } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { IconType } from "react-icons";

interface InputDecipherProps {
  register: UseFormRegister<FieldValues>;
  registerId: string;
  placeholder: string;
  inputType: string;
  ifPlaceholderMissing?: string;
  IconPassed?: ReactElement<IconType>;
  widthSet?: string;
  labelProvided?: string;
  labelColor?: string;
  autocomplete?: boolean;
  step?: string | number;
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
  labelColor,
  autocomplete,
  step,
}) => {
  return (
    <>
      <div className={`relative ${widthSet ? widthSet : "w-full"}`}>
        {labelProvided && (
          <label
            htmlFor={registerId}
            className={`mb-2 font-semibold ${
              labelColor ? labelColor : "text-black"
            }`}
          >
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
          min={inputType === "number" ? 0 : undefined}
          type={inputType}
          step={step ? step : 1}
          autoComplete={autocomplete ? `${autocomplete.toString()}` : "false"}
          className="mb-1 md:mb-2 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-8"
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
