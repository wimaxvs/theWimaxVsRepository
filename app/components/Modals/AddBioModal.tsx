"use client";

import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import useBioModal from "@/app/hooks/modalHooks/useBioModal";
import Modal from "@/app/components/Modals/Modal";
import EssentialInputsContainer from "../sideshelves/cvsideshelfinputs/EssentialInputsContainer";
import Heading from "@/app/components/Modals/Heading";
import useCurrentSection from "@/app/hooks/useCurrentSection";

const AddSubSectionModal = () => {
  const bioModal = useBioModal();

  const [currentSection] = useCurrentSection((state) => [state.currentSection]);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(() => {
    console.log("Discard button hit");
    bioModal.onClose();
    setIsLoading(false);
  }, [bioModal]);

  const bodyContent = (
    <div className="flex flex-col gap-2">
      <Heading
        title={`${bioModal.editing ? "Edit" : "Fill in"} your bio-data`}
        subtitle={`${
          bioModal.editing
            ? `Let's see what part of the ${currentSection} section needs a change. 🤔`
            : `The ${currentSection} section is where you let the world know who you are. 😎🗺️`
        }`}
      />
      <EssentialInputsContainer />
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
            Click on the &quot;camera&quot; icon to add a picture 🤳
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      isInputModal
      disabled={isLoading}
      isOpen={bioModal.isOpen}
      title={currentSection}
      onClose={bioModal.onClose}
      onSubmit={onSubmit}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default AddSubSectionModal;
