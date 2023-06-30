"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import InputDecipher from "./InputDecipher";

interface InputProps {
  isSummary?: boolean;
  id: string;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  isBioData?: boolean;
  placeholder?: string;
  isSubSegment?: boolean;
  defaultValue?: any;
}

const Input: React.FC<InputProps> = ({
  isSummary,
  id,
  label,
  type,
  disabled,
  formatPrice,
  required,
  register,
  errors,
  isBioData,
  placeholder,
  defaultValue,
  isSubSegment,
}) => {
  return (
    <div
      className={`${
        isSubSegment ? "w-full" : isBioData ? "w-5/6" : "w-full"
      } relative`}
    >
      {formatPrice && (
        <BiDollar
          size={24}
          className="text-neutral-700 absolute top-5 left-2"
        />
      )}
      <InputDecipher
        textarea={isSummary}
        id={id}
        disabled={disabled}
        register={register}
        required={required}
        placeholder={placeholder ? placeholder : " "}
        defaultValue={defaultValue ? defaultValue : undefined}
        type={type}
        classNameProp={`peer w-full p-4 pt-6 font-light 
        ${
          isBioData
            ? "bg-actual-white/60 hover:bg-actual-white"
            : "bg-white border-2 "
        } rounded-md outline-none transition disabled:opacity-70 disabled:cursor-not-allowed
              ${formatPrice ? "pl-9" : "pl-4"}
              ${
                errors[id]
                  ? "border-2 border-rose-500"
                  : isBioData
                  ? "border-blue-purple/30"
                  : "border-2 border-neutral-300"
              }
              ${
                errors[id]
                  ? "focus:border-2 focus:border-rose-500"
                  : isBioData
                  ? "focus:border-2 focus:border-blue-purple"
                  : "focus:border-2 focus:border-deep-blue"
              }
        `}
      />
      <label
        className={`absolute  duration-150 transform -translate-y-3 top-5 z-10 origin-[0]
      ${isBioData ? "font-medium text-sm" : "text-md"}
      ${formatPrice ? "left-9" : "left-4"}
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:translate-y-0
      peer-focus:scale-75
      peer-focus:-translate-y-4
      ${
        errors[id]
          ? "text-rose-500"
          : isBioData
          ? "text-blue-purple/40"
          : "text-zinc-400"
      }
      `}
      >
        {label}
      </label>
    </div>
  );
};

export default Input;
