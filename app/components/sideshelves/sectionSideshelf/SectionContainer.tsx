import TemplateSelect from "./TemplateSelect";
import SelectedAddedSections from "./SelectedAddedSections";

const SectionContainer = () => {
  return (
    <div
      className={`sectionAddedSelectContainer w-full flex flex-wrap flex-row gap-3`}
    >
      {[<SelectedAddedSections />, <TemplateSelect />].map(
        (component, index) => (
          <div key={index} className="flex flex-row flex-wrap items-center gap-2 max-w-[95%] ml-4">
            {component}
          </div>
        )
      )}
    </div>
  );
};

export default SectionContainer;
