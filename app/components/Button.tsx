// "use client";
import { IconType } from "react-icons";

interface ButtonProps {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  third?: boolean;
  lightColored?: boolean;
  isBinToRight?: boolean;
  specifiedColor?: string;
  danger?: boolean;
  small?: boolean;
  icon?: IconType;
  iconColor?: string;
  sx?: string;
  isLoginRegister?: boolean
}

const Button: React.FC<ButtonProps> = ({
  isBinToRight,
  lightColored,
  specifiedColor,
  label,
  onClick,
  disabled,
  outline,
  third,
  danger,
  small,
  icon: Icon,
  iconColor,
  sx,
  isLoginRegister
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
      ${Icon && isLoginRegister ? "flex flex-row gap-2 justify-center" : Icon ? "flex flex-row gap justify-around" : ""} 
      ${
        outline
          ? "bg-white"
          : third
          ? "bg-deep-blue/40"
          : danger
          ? "bg-rose-200"
          : lightColored
          ? `${specifiedColor}`
          : "bg-velvet-blue"
      } 
      ${
        outline
          ? "border-black"
          : third
          ? "border-none"
          : danger
          ? "border-none"
          : lightColored
          ? "border-none"
          : "border-velvet-blue"
      } 
      ${outline ? "text-black" : danger ? "text-red-600" : "text-white"}
      ${isBinToRight ? "h-full py-4" : ""} 
      ${small ? "py-1" : "py-3"} 
      ${small ? "text-sm" : "text-md"}
      ${small ? "font-light" : "font-semibold"}
      ${small ? "border-[1px]" : "border-2"}`}
    >
      {Icon && <Icon size={24} color={iconColor} />}
      {/**className="absolute left-4 top-3" */}
      {label}
    </button>
  );
};

export default Button;
