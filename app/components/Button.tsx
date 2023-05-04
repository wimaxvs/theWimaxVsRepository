"use client";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
  sx?: string
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
  sx
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      //make sure index of "w-" attribute is str.length-1
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition 
      ${
        !sx
          ? `w-full`
          : sx?.indexOf("w-") !== -1
          ? `${sx}`
          : `${sx.slice(0, sx.indexOf("w-"))} w-full`
      } 
      ${outline ? "bg-white" : "bg-velvet-blue"} 
      ${outline ? "border-black" : "border-velvet-blue"} 
      ${outline ? "text-black" : "text-white"}
      ${small ? "py-1" : "py-3"} 
      ${small ? "text-sm" : "text-md"}
      ${small ? "font-light" : "font-semibold"}
      ${small ? "border-[1px]" : "border-2"}`}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {label}
    </button>
  );
};

export default Button;
