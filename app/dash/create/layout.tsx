// import EssentialInputsContainer from "@/app/components/sideshelves/cvsideshelfinputs/EssentialInputsContainer";
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
      <section
        className={`${font.className} createLayout w-full flex flex-row gap-4`}
      >
        {children}
      </section>
    </>
  );
}
