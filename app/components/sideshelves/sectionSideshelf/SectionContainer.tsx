import SectionSelect from "./SectionSelect";
import AddedSections from "./AddedSections";
import SectionTemplate from "./TemplateSelect";

const SectionContainer = () => {
  return (
    <div className={`sectionAddedSelectContainer w-full grid grid-cols-2 gap-5`}>
      <div className="flex flex-col items-center">
        <SectionSelect />
        <AddedSections />
      </div>
      <div>
        <SectionTemplate />
      </div>
    </div>
  );
};

export default SectionContainer;
