import SectionSelect from "./SectionSelect";
import AddedSections from "./AddedSections";

const SectionContainer = () => {
  return (
    <div className={`sectionAddedSelectContainer w-full md:w-[270px]`}>
      <SectionSelect />
      <AddedSections />
    </div>
  );
};

export default SectionContainer;
