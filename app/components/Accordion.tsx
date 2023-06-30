import React, { ReactNode, ReactElement, useState } from "react";
import { IconType } from "react-icons";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";


type AccordionProps = {
  children: ReactNode;
  label: string;
  UpIcon?: ReactElement<IconType>;
  DownIcon?: ReactElement<IconType>;
  isAdded?: boolean
};

const Accordion: React.FC<AccordionProps> = ({
  label,
  UpIcon,
  DownIcon,
    children,
  isAdded
}) => {
    const [isVisible, setVisibility] =useState<boolean>(true)

    const UpIconInside = UpIcon ? (
      UpIcon
    ) : (
      <BsChevronUp size={20} color={"#343e83"} />
    );
    const DownIconInside = DownIcon ? (
      DownIcon
    ) : (
      <BsChevronDown size={20} color={"#343e83"} />
    );
  return (
    <>
      <div
        className={`accordionTitle w-full flex flex-row justify-between items-center px-3 `}
        onClick={() => setVisibility((prev) => !prev)}
      >
        <p
          className={`${
            isAdded ? " md:ml-2" : ""
          } sectionAdditionPrompt mt-2  text-deep-blue/50 font-bold text-base mb-3`}
        >
          {label}
        </p>
        {isVisible ? <>{UpIconInside}</> : <>{DownIconInside}</>}
      </div>
      <section
        className={`arrayOfChips ${
          isVisible ? "flex" : "hidden"
        } flex-col gap-2 pb-4 w-5/6`}
      >
        {children}
      </section>
    </>
  );
};

export default Accordion;
