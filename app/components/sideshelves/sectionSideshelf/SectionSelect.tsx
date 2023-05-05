import { ReactElement } from "react";
import { IconType } from "react-icons/lib";
import SectionChip from "./SectionChip";
import { FaGraduationCap } from "react-icons/fa";
import { BiPaint, BiCertification } from "react-icons/bi";
import { MdOutlineSummarize, MdOutlineWork, MdLanguage } from "react-icons/md";
import { BsBuildingGear, BsAward } from "react-icons/bs";

const SectionSelect = () => {
  const buttonProps: {
    color?: string;
    label: string;
    icon: ReactElement<IconType>;
  }[] = [
    {
      label: "Education",
      icon: <FaGraduationCap size={18} color={"#343e83"}/>,
    },
    {
      label: "Work Experience",
      icon: <MdOutlineWork size={18} color={"#343e83"}/>,
    },
    {
      label: "Skills",
      icon: <BsBuildingGear size={18} color={"#343e83"}/>,
    },
    {
      label: "Summary",
      icon: <MdOutlineSummarize size={18} color={"#343e83"}/>,
    },
    {
      label: "Hobbies",
      icon: <BiPaint size={18} color={"#343e83"}/>,
    },
    {
      label: "Certifications",
      icon: <BiCertification size={18} color={"#343e83"}/>,
    },
    {
      label: "Languages",
      icon: <MdLanguage size={18} color={"#343e83"}/>,
    },
    {
      label: "Awards",
      icon: <BsAward size={18} color={"#343e83"}/>,
    },
  ];

  return (
    <div
      className={`SectionAddition z-7 md:w-[270px] bg-white mt-2 flex flex-row md:flex-col items-center justify-around md:justify-normal rounded-xl drop-shadow-md`}
    >
      <p className=" sectionAdditionPrompt mt-2 text-deep-blue/50 font-bold text-base mb-3">
        Pick a section to add below:
      </p>
      <section className="arrayOfChips flex flex-col gap-2 pb-4 w-5/6">
        {buttonProps.map((prop, index) => {
          return (
            <div className="" key={index}>
              <SectionChip
                label={prop.label}
                icon={prop.icon}
              />
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default SectionSelect;
