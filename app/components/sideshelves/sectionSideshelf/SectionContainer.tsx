import SectionSelect from "./SectionSelect";
import AddedSections from "./AddedSections";

const SectionContainer = () => {
  return (
    <div className={`sectionAddedSelectContainer w-full flex flex-col items-center`}>
      <SectionSelect />
      <AddedSections />
    </div>
  );
};

export default SectionContainer;
