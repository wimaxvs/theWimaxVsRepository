"use client"
import { ReactElement, useState } from "react";
import { IconType } from "react-icons/lib";
import SectionChip from "./SectionChip";
// import { FaGraduationCap } from "react-icons/fa";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { BiPaint, BiCertification } from "react-icons/bi";
import {
  MdOutlineSummarize,
  MdWorkOutline,
  MdLanguage,
  MdOutlineSchool,
  MdOutlinePersonalInjury,
} from "react-icons/md";
import { BsBuildingGear, BsAward } from "react-icons/bs";
import Accordion from "../../Accordion";

const SectionSelect = () => {

  const iconOptions = { size: 18, color: "#343e83" }
  
  const [chipsVisible, setChipsVisible] = useState<boolean>(true) 
  
  const buttonProps: {
    color?: string;
    label: string;
    icon: ReactElement<IconType>;
  }[] = [
    {
      label: "Bio",
      icon: <MdOutlinePersonalInjury {...iconOptions} />,
    },
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
      className={`SectionAddition z-7 w-11/12 bg-white mt-2 flex flex-col items-center justify-around md:justify-normal rounded-xl drop-shadow-md`}
    >
      {/**Accordion */}
      <Accordion
        UpIcon={<BsChevronUp size={20} color={"#343e83"} />}
        DownIcon={<BsChevronDown size={20} color={"#343e83"} />}
        label={"Pick a section to add below:"}
      >
      {/**Accordion */}

      
        {buttonProps.map((prop, index) => {
          return (
            <div className="" key={index}>
              <SectionChip
                isBio={prop.label === "Bio" ? true : false}
                label={prop.label}
                icon={prop.icon}
              />
            </div>
          );
        })}
      </Accordion>
    </div>
  );
};

export default SectionSelect;
