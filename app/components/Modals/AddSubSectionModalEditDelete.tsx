"use client";

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import useSubSectionModalEditDelete from "@/app/hooks/modalHooks/useSubSectionModalEditDelete";
import Modal from "@/app/components/Modals/Modal";
import SubSectionContainer from "../sideshelves/sectionSideshelf/SubSectionContainer";
import Heading from "@/app/components/Modals/Heading";
import useCurrentSection from "@/app/hooks/useCurrentSection";

const AddSubSectionModalEditDelete = () => {
  const subSectionModalEdilete = useSubSectionModalEditDelete();

  const [currentSection] = useCurrentSection((state) => [state.currentSection]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(() => {
    console.log("Discard button hit");
    subSectionModalEdilete.onClose();
    setIsLoading(false);
  }, [subSectionModalEdilete]);

  const bodyContent = (
    <div className="flex flex-col gap-2">
      <Heading
        title="Edit or delete Subsegments"
        subtitle={`these are the subsegments in the ${currentSection} section. Save to reflect in the CV`}
      />
      <SubSectionContainer editable />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <div
        className="
      text-neutral-500 text-center mt-4 font-light"
      >
        <p>
          Pro tip:
          <span
            onClick={() => {}}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Remember to mark the order of each Sub-segments in the{" "}
            {currentSection} section. ☝️
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      isInputModal
      disabled={isLoading}
      isOpen={subSectionModalEdilete.isOpen}
      title={currentSection}
      onClose={subSectionModalEdilete.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default AddSubSectionModalEditDelete;
