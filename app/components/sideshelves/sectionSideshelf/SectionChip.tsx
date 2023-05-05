"use client";
import { ReactElement } from "react";
import { IconType } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai";
import useSubSectionModal from "@/app/hooks/useSubSectionModal";

interface SectionChipProps {
  label: string;
  color?: string;
  icon?: ReactElement<IconType>;
  addOrNum?: number;
}
const SectionChip: React.FC<SectionChipProps> = ({
  label,
  color,
  icon: Icon,
  addOrNum,
}) => {
  const subSectionModal = useSubSectionModal();

  const menuActions = (los: string) => {
    switch (los) {
      case "addSub":
        subSectionModal.onOpen();
        console.log(subSectionModal)
        break;
      // case "signup":
      //   registerModal.onOpen();
      //   break;

      default:
        break;
    }
  };

  return (
    <button
      onClick={() => menuActions("addSub")}
      className="sectionChip py-2 px-3 rounded-md hover:border-2 hover:border-deep-blue-30 hover:bg-deep-blue/10 transition hover:ease-in ease-in duration-300 text-deep-blue w-full flex flex-row items-center justify-around "
    >
      <div className="flex flex-row gap-2 items-center w-2/3">
        {Icon && Icon} {label}
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
