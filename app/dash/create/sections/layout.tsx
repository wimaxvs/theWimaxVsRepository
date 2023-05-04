import ClientOnly from "@/app/components/ClientOnly";
import SectionContainer from "@/app/components/sideshelves/sectionSideshelf/SectionContainer";
import { Inter } from "next/font/google";

interface SectionsLayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Me-CV: Add Sections",
  description:
    "Add relevant segments to your CV highlighting your abilities and experience.",
};

const font = Inter({
  subsets: ["latin"],
});

export default async function Sections({ children }: SectionsLayoutProps) {
  return (
    <>
      <section
        className={`sectionsLayout ${font.className} z-10 md:mt-4 pb-4 w-5/6 md:w-[300px] overflow-y-auto h-5/6 flex flex-col items-center rounded-xl`}
      >
        <p className="font-bold text-lg text-deep-blue mt-2">CV Sections</p>

        <p className="font-bold text-md text-deep-blue/70">Add a section:</p>
        <div>
          <ClientOnly>
            <SectionContainer />
          </ClientOnly>
        </div>
      </section>
      {children}    
    </>
  );
}
