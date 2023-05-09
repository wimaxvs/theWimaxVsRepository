"use client";
import React, { useState } from "react";
import SubSectionInput from "./SubSectionInput";

const SubSectionContainer = () => {
  const [order, setOrder] = useState<number>(1);
  return (
    <div
      className={`subSectionInputContainer bg-light-purple/20 py-4 px-2 rounded-md flex flex-col`}
    >
      <div className="description flex w-full pl-2  flex flex-col justify-start">
        <p className={`text-deep-blue/70 font-bold text-xl pb-2`}>Subsegments:</p>
      </div>
      <SubSectionInput order={order} />
    </div>
  );
};

export default SubSectionContainer;
