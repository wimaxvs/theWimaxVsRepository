import { IconType } from "react-icons";
import { AiOutlinePlus } from "react-icons/ai"

interface SectionChipProps {
  label: string;
  color: string;
  icon: IconType;
}
const SectionChip: React.FC<SectionChipProps> = ({ label, color, icon:Icon }) => {

  return (
    <button className="sectionChip py-2 px-3 rounded-md hover:border-2 hover:border-deep-blue-30 hover:bg-deep-blue/10 text-deep-blue w-full flex flex-row items-center justify-around ">
      <div className="flex flex-row gap-2 items-center w-2/3">
        <Icon size={18} color={"#343e83"} /> {label}
      </div>
      <AiOutlinePlus size={20} color={"#343e83"} />
    </button>
  );
};

export default SectionChip;
