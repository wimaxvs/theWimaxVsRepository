import ClientOnly from "@/app/components/ClientOnly";

import AddSubSectionModal from "@/app/components/Modals/AddSubSectionModal";
import AddSubSectionModalEditDelete from "@/app/components/Modals/AddSubSectionModalEditDelete";
import AddBioModal from "@/app/components/Modals/AddBioModal";
import SectionContainer from "@/app/components/sideshelves/sectionSideshelf/SectionContainer";
import Viewer from "@/app/components/sideshelves/docViewer/Viewer";

export const metadata = {
  title: "Me-CV: New CV",
  description: "Create a new CV using the Me-CV tools",
};

export default function Page() {
  return (
    <>
      <div
        className={`sectionSelectAndPdfViewer w-full bg-off-white flex md:flex-row gap-4 overflow-y-auto`}
      >
        <section
          className={`CreateLayoutEssentials md:mr-0 z-10 mx-auto mt-24 md:mt-4 pb-4 md:ml-32 w-5/6 md:w-1/4 lg:w-1/6 overflow-y-auto h-5/6 flex flex-col items-center rounded-xl`}
        >
          <p className="font-bold text-lg text-blue-purple mt-2">CV Sections</p>
          <p className="font-bold text-md text-blue-purple/70">
            Add a section:
          </p>
          <>
            <ClientOnly>
              <AddBioModal />
              <AddSubSectionModal />
              <AddSubSectionModalEditDelete />
              <SectionContainer />
            </ClientOnly>
          </>
        </section>
        <section
          className={`pdfViewer md:w-1/2 md:mt-8 rounded-xl md:h-5/6 hidden md:block`}
        >
          <ClientOnly>
            <Viewer />
          </ClientOnly>
        </section>
      </div>
    </>
  );
}
