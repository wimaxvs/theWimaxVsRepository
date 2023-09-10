"use client";
import { ReactElement } from "react";
import { IconType } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";
import useSubSectionModal from "@/app/hooks/modalHooks/useSubSectionModal";
import useSubSectionModalEditDelete from "@/app/hooks/modalHooks/useSubSectionModalEditDelete";
import useBioModal from "@/app/hooks/modalHooks/useBioModal";
import useCurrentSection from "@/app/hooks/useCurrentSection";

interface SectionChipProps {
  label: string;
  icon?: ReactElement<IconType>;
  addOrNum?: number;
  edilete?: boolean
  isBio?: boolean
  isBioEdit?: boolean
}
const SectionChip: React.FC<SectionChipProps> = ({
  label,
  isBio,
  isBioEdit,
  edilete,
  icon: Icon,
  addOrNum,
}) => {
  const subSectionModal = useSubSectionModal();
  const subSectionModalEditDelete = useSubSectionModalEditDelete();
  const BioModal = useBioModal();
  const [ setCurrentSection ] = useCurrentSection((state)=> [state.setCurrentSection])

  const menuActions = (los: string) => {
    switch (los) {
      case "addSub":
        subSectionModal.onOpen();
        setCurrentSection(label)
        break;
      case "edileteSub":
        subSectionModalEditDelete.onOpen();
        setCurrentSection(label)
        break;
      case "isBio":
        BioModal.onOpen();
        setCurrentSection(label)
        break;
      case "isBioEdit":
        BioModal.onEdit();
        setCurrentSection(label)
        break;

      default:
        break;
    }
  };

  return (
    <button
      onClick={
        edilete
          ? () => menuActions("edileteSub")
          : isBio
          ? () => menuActions("isBio")
          : isBioEdit
          ? () => menuActions("isBioEdit")
          : () => menuActions("addSub")
      }
      className="sectionChip py-2 px-3 rounded-md hover:bg-deep-blue/10 transition hover:ease-in ease-in duration-300 text-deep-blue w-full flex flex-row items-center justify-between "
    >
      <div className="flex flex-row gap-2 items-center w-2/3">
        <i className={`md:hidden lg:block`}>{Icon && Icon}</i>
        <p className="flex flex-row justify-items-start items-start text-left pl-0">
          {label}
        </p>
      </div>
      {addOrNum ? (
        <div className="px-2 rounded-full bg-deep-blue">
          <p className="text-bold text-white">{addOrNum}</p>
        </div>
      ) : (
        <AiOutlinePlus size={20} color={"#343e83"} />
      )}
    </button>
  );
};

export default SectionChip;
