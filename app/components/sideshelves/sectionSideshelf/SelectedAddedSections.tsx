"use client";
import React, { ReactElement, useEffect } from "react";
import { IconType } from "react-icons/lib";
import SectionChip from "./SectionChip";
// import { FaGraduationCap } from "react-icons/fa";
import { BiPaint, BiCertification } from "react-icons/bi";
import {
  MdWorkOutline,
  MdLanguage,
  MdOutlineSchool,
  MdOutlinePersonalInjury,
} from "react-icons/md";
import { BsBuildingGear, BsAward } from "react-icons/bs";
import useCvData from "../docViewer/hooks/useCvData";
import AddedSections from "./AddedSections";


const SectionSelect = () => {
  const iconOptions = { size: 18, color: "#343e83" };
  const sections = useCvData().sections;

  useEffect(() => {}, [sections]);

  const chipProps: {
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
    <React.Fragment>
      <p
        className={`sectionAdditionPrompt mt-2  text-deep-blue font-bold text-base mb-3`}
      >
        {"Pick A Section: "}
      </p>
      {chipProps
        .filter((prop) => sections?.indexOf(prop.label) < 0)
        .map((prop, index) => {
          return (
            <React.Fragment key={index}>
              <SectionChip
                isBio={prop.label === "Bio" ? true : false}
                label={prop.label}
                icon={prop.icon}
              />
            </React.Fragment>
          );
        })}
      <AddedSections />
    </React.Fragment>
  );
};

export default SectionSelect;
