import { ReactElement } from "react";
import { IconType } from "react-icons/lib";
import SectionChip from "./SectionChip";
// import { FaGraduationCap } from "react-icons/fa";
import { BiPaint, BiCertification } from "react-icons/bi";
import {
  MdOutlineSummarize,
  MdWorkOutline,
  MdLanguage,
  MdOutlineSchool,
} from "react-icons/md";
import { BsBuildingGear, BsAward } from "react-icons/bs";

const SectionSelect = () => {

  const iconOptions ={size:18, color:"#343e83"}
  
  const buttonProps: {
    color?: string;
    label: string;
    icon: ReactElement<IconType>;
  }[] = [
    {
      label: "Education",
      icon: <MdOutlineSchool {...iconOptions} />,
    },
    {
      label: "Work Experience",
      icon: <MdWorkOutline {...iconOptions} />,
    },
    {
      label: "Skills",
      icon: <BsBuildingGear {...iconOptions} />,
    },
    {
      label: "Summary",
      icon: <MdOutlineSummarize {...iconOptions} />,
    },
    {
      label: "Hobbies",
      icon: <BiPaint {...iconOptions} />,
    },
    {
      label: "Certifications",
      icon: <BiCertification {...iconOptions} />,
    },
    {
      label: "Languages",
      icon: <MdLanguage {...iconOptions} />,
    },
    {
      label: "Awards",
      icon: <BsAward {...iconOptions} />,
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
