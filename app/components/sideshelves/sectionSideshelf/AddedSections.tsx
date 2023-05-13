"use client";

import React from "react";
import useCvSubSegments from "@/app/hooks/useCvSubSegments";
import SectionChip from "./SectionChip";
import { useEffect } from "react";

const AddedSections = () => {
  const subsegments = useCvSubSegments().subsegments;

  useEffect(() => {
    console.log(subsegments);
  }, []);

  const sectionsSelected = (() => {
    const sectionCounts = subsegments?.reduce(
      (acc: { [key: string]: any }, obj) => {
        const { parentSection } = obj;
        if (parentSection) acc[parentSection] = (acc[parentSection] || 0) + 1;
        return acc;
      },
      {}
    );

    return (
      <>
        {Object.entries(sectionCounts).map(([parentSection, count]) => (
          <React.Fragment key={parentSection}>
            <SectionChip edilete label={parentSection} addOrNum={count} />
          </React.Fragment>
        ))}
      </>
    );
  })();

  if (subsegments?.length > 0) {
    return (
      <>
        <div
          className={`AddedSections z-7 md:w-[270px] bg-white mt-2 flex flex-row md:flex-col items-center justify-around md:justify-normal rounded-xl drop-shadow-md`}
        >
          <p className=" addedSectionNotif mt-2 text-deep-blue/50 font-bold text-base mb-3">
            These sections are in your CV:
          </p>
          <section className="arrayOfAddedChips flex flex-col gap-2 pb-4 w-5/6">
            {sectionsSelected}
          </section>
        </div>
      </>
    );
  } else {
    return null;
  }
};

export default AddedSections;
