import ClientOnly from "@/app/components/ClientOnly";

import AddSubSectionModal from "@/app/components/Modals/AddSubSectionModal";
import AddSubSectionModalEditDelete from "@/app/components/Modals/AddSubSectionModalEditDelete";
import AddBioModal from "@/app/components/Modals/AddBioModal";
import SectionContainer from "@/app/components/sideshelves/sectionSideshelf/SectionContainer";
import SampleDoc from "../components/sideshelves/docViewer/SampleDoc";

export const metadata = {
  title: "Me-CV: New CV",
  description: "Create a new CV using the Me-CV tools",
};

export default function Page() {
  return (
    <>
      <section
        className={`CreateLayoutEssentials mt-20 md:mt-0 pt-4 md:ml-24 bg-off-white flex flex-col gap-4 overflow-y-hidden overflow-x-hidden md:mr-0 z-10 mx-auto pb-4 w-full items-start rounded-xl md:px-4`}
      >
        <>
          <ClientOnly>
            <AddBioModal />
            <AddSubSectionModal />
            <AddSubSectionModalEditDelete />
            <SectionContainer />
            <section
              className={`pdfViewer flex max-h-full rounded-xl p-4 w-full max-[500px]:w-full max-[500px]:overflow-x-auto max-[500px]:whitespace-nowrap`}
            >
              <SampleDoc />
            </section>
          </ClientOnly>
        </>
      </section>
    </>
  );
}
