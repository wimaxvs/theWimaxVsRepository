"use client";

import React from "react";

import useCurrentTemplate from "@/app/hooks/useCurrentTemplate";

const SectionTemplate = () => {
  const { currentTemplate, setCurrentTemplate, existentDocs } =
    useCurrentTemplate();

  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        Pick a template
      </label>

      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        value={currentTemplate}
        onChange={(e) => setCurrentTemplate(e.target.value)}
      >
        {existentDocs.map((option, i) => {
          return <option key={i}>{option}</option>;
        })}
      </select>

      {/* <h2>{selected}</h2> */}
    </>
  );
};

export default SectionTemplate;
