"use client";
import React from "react";
import useCurrentTemplateForReal from "@/app/hooks/useCurrentTemplate";

const SectionTemplate = () => {
  const { currentTemplate, setCurrentTemplate, existentDocs } =
    useCurrentTemplateForReal();

  return (
    <React.Fragment>
      <p
        className={`sectionAdditionPrompt mt-2  text-deep-blue font-bold text-base mb-3`}
      >
        {"Pick A CV Template: "}
      </p>
      {existentDocs.map((option, i) => {
        return (
          <button
            className={`sectionChip py-2 px-3 rounded-md hover:bg-deep-blue/10 transition hover:ease-in ease-in duration-300 text-deep-blue flex flex-row items-center justify-around ${
              currentTemplate === option ? "bg-deep-blue/10" : ""
            }`}
            onClick={() => setCurrentTemplate(option)}
            key={i}
          >
            {option}
          </button>
        );
      })}
    </React.Fragment>
  );
};

export default SectionTemplate;
