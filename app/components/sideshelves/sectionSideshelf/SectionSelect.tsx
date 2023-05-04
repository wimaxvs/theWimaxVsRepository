import { IconType } from "react-icons/lib";
import SectionChip from "./SectionChip";
import { FaGraduationCap } from "react-icons/fa";
import { BiPaint, BiCertification } from "react-icons/bi";
import { MdOutlineSummarize, MdOutlineWork, MdLanguage } from "react-icons/md";
import { BsBuildingGear, BsAward } from "react-icons/bs";


const SectionSelect = () => {
  const buttonProps: {
    color: string;
    label: string;
    icon: IconType;
  }[] = [
    {
      label: "Education",
      color: "",
      icon: FaGraduationCap,
    },
    {
      label: "Work Experience",
      color: "",
      icon: MdOutlineWork,
    },
    {
      label: "Skills",
      color: "",
      icon: BsBuildingGear,
    },
    {
      label: "Summary",
      color: "",
      icon: MdOutlineSummarize,
    },
    {
      label: "Hobbies",
      color: "",
      icon: BiPaint,
    },
    {
      label: "Certifications",
      color: "",
      icon: BiCertification,
    },
    {
      label: "Languages",
      color: "",
      icon: MdLanguage,
    },
    {
      label: "Awards",
      color: "",
      icon: BsAward,
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
                color={prop.color}
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
