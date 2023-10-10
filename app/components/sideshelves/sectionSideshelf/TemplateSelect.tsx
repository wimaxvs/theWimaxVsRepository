"use client";
import React from "react";
import useCurrentTemplateForReal from "@/app/hooks/useCurrentTemplate";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import Accordion from "../Accordion";

const SectionTemplate = () => {
  const { currentTemplate, setCurrentTemplate, existentDocs } =
    useCurrentTemplateForReal();

  return (
    <div
      className={`SectionAddition z-7 w-11/12 bg-white mt-2 flex flex-col items-center justify-around md:justify-normal rounded-xl drop-shadow-md transition ease-in duration-300`}
    >
      {/**Accordion */}
      <Accordion
        UpIcon={<BsChevronUp size={20} color={"#343e83"} />}
        DownIcon={<BsChevronDown size={20} color={"#343e83"} />}
        label={"Pick a template Below:"}
      >
        {existentDocs.map((option, i) => {
          return (
            <button
              className={`sectionChip py-2 px-3 rounded-md hover:bg-deep-blue/10 transition hover:ease-in ease-in duration-300 text-deep-blue w-full flex flex-row items-center justify-around ${
                currentTemplate === option ? "bg-deep-blue/10" : ""
              }`}
              onClick={() => setCurrentTemplate(option)}
              key={i}
            >
              {option}
            </button>
          );
        })}
      </Accordion>
    </div>
  );
};

export default SectionTemplate;
