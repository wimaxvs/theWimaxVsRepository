import React from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputDecipherProps {
  id: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
  defaultValue?: string;
  placeholder?: string;
  textarea?: boolean;
  classNameProp?: string;
  type?: string;
  required?: boolean;
  setMax10?:boolean
}

const InputDecipher: React.FC<InputDecipherProps> = ({
  id,
  disabled,
  register,
  placeholder,
  textarea,
  classNameProp,
  type,
  required,
  defaultValue,
  setMax10
}) => {
  const options = {
    id: id,
    disabled,
    placeholder,
    className: classNameProp,
    defaultValue,
  };

  if (textarea) {
    return <textarea {...options} {...register(id, { required })} rows={5} />;
  }
  return <input {...options} {...register(id, { required })} type={type} min={1} max={setMax10 ? 10 : 20} />;
};

export default InputDecipher;
