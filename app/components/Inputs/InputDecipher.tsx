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
  return <input {...options} {...register(id, { required })} type={type} />;
};

export default InputDecipher;
