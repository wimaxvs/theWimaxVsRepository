import Drawer from "../components/Drawer/Drawer";
import getCurrentUser from "../actions/getCurrentUser";
import Link from "next/link";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar/Navbar";

interface DashlayoutProps {
  children: React.ReactNode;
}

export const metadata = {
  title: "Wimax: Pulpit",
  description: "Pulpit systemu zarządzania firmą",
};

const font = Inter({
  subsets: ["latin"],
});

export default async function Dash({ children }: DashlayoutProps) {
  const currentDriver = await getCurrentUser();
  return (
    <>
      {currentDriver && (
        <>
          <Drawer navbar={<Navbar currentDriver={currentDriver} />}>
            {children}
          </Drawer>
        </>
      )}
      {!currentDriver && (
        <div
          className={`${font.className} fixed mt-40 w-full h-40 flex flex-col items-center justify-center`}
        >
          <div className="fixed flex flex-col items-center w-[50%] bg-black px-10 py-6 rounded-xl drop-shadow-md text-white font-bold gap-1">
            <p>Nie jesteś zalogowany.</p>
            <p className="text-base">
              Kliknij menu w prawym górnym rogu, aby uzyskać dostęp do całości
              cechy.
            </p>
            <p>Możesz też wrócić do domu tutaj:</p>
            <Link href="/">
              <button
                className={`bg-deep-blue mt-2 py-2 px-4 rounded-lg drop-shadow-lg`}
              >
                Home
              </button>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
