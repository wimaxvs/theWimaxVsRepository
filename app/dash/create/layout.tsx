import ClientOnly from "@/app/components/ClientOnly";
import EssentialInputsContainer from "@/app/components/sideshelves/cvsideshelfinputs/EssentialInputsContainer";
import { Inter } from "next/font/google";

interface CreatelayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Me-CV: New CV",
  description: "Create a new CV using the Me-CV tools",
};

const font = Inter({
  subsets: ["latin"],
});

export default async function Create({ children }: CreatelayoutProps) {
  return (
    <>
      <div className="createLayout w-full flex flex-row gap-4">
        <section
          className={`CreateLayoutEssentials z-10 ${font.className} ml-12 mt-24 md:mt-4 pb-4 md:ml-32 w-5/6 md:w-[300px] overflow-y-auto h-5/6 flex flex-col items-center rounded-xl`}
        >
          <p className="font-bold text-lg text-blue-purple mt-2">Essentials</p>
          <p className="font-bold text-md text-blue-purple/70">Bio Data</p>
          <div>
            <ClientOnly>
              <EssentialInputsContainer />
            </ClientOnly>
          </div>
        </section>
        {children}
      </div>
    </>
  );
}
