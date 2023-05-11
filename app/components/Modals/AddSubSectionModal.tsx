"use client";

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import useSubSectionModal from "@/app/hooks/useSubSectionModal";

import Modal from "@/app/components/Modals/Modal";
import SubSectionContainer from "../sideshelves/sectionSideshelf/SubSectionContainer";
import Heading from "@/app/components/Heading";
import useCurrentSection from "@/app/hooks/useCurrentSection";



const AddSubSectionModal = () => {
  const subSectionModal = useSubSectionModal();
  const [currentSection] = useCurrentSection((state) => [state.currentSection]);
  const [isLoading, setIsLoading] = useState(false);

  const onDiscard = useCallback(() => {
    console.log("Discard button hit");
    subSectionModal.onClose();
    setIsLoading(false);
  }, []);

  const onSubmit = useCallback(() => {
    console.log("Discard button hit");
    subSectionModal.onClose();
    setIsLoading(false);
  }, []);

  const bodyContent = (
    <div className="flex flex-col gap-2">
      <Heading
        title="Fill Out Your Section"
        subtitle={`Add subsegments to the ${currentSection} section`}
      />
      <SubSectionContainer/>
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
          In essence:
          <span
            onClick={() => {}}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            The subsegments are pieces of your {currentSection} section pie. 🍰
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      isInputModal
      disabled={isLoading}
      isOpen={subSectionModal.isOpen}
      title={currentSection}
      actionLabel="Continue"
      secondaryAction={onDiscard}
      secondaryActionLabel="Discard"
      onClose={subSectionModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default AddSubSectionModal;