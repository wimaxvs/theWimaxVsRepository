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
        className={`sectionSelectAndPdfViewer w-screen md:ml-24 bg-off-white flex md:flex-col gap-4 overflow-y-scroll overflow-x-hidden min-h-screen`}
      >
        <section
          className={`CreateLayoutEssentials md:mr-0 z-10 mx-auto mt-24 md:mt-4 pb-4 md:ml-4 w-full overflow-y-auto flex flex-col items-start rounded-xl md:px-4 `}
        >
          <>
            <ClientOnly>
              <AddBioModal />
              <AddSubSectionModal />
              <AddSubSectionModalEditDelete />
              <SectionContainer />
            </ClientOnly>
          </>
        </section>
        <section className={`pdfViewer hidden md:flex md:ml-10 rounded-xl`}>
          <ClientOnly>
            <Viewer />
          </ClientOnly>
        </section>
      </div>
    </>
  );
}
