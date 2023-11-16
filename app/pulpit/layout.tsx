import Drawer from "../components/Drawer/Drawer";
import getCurrentDriver from "../actions/getCurrentDriver";
import Link from "next/link";
import { Inter } from "next/font/google";
import Navbar from "../components/navbar/Navbar";
import ClientOnly from "../components/ClientOnly";
import NotLoggedInButton from "../components/NotLoggedInButton";

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

export default async function Pulpit({ children }: DashlayoutProps) {
  const currentDriver = await getCurrentDriver();

  let firmName = currentDriver?.currentFirm?.firmName;
  let role = currentDriver?.role;
  return (
    <>
      {currentDriver && (
        <>
          <Drawer
            role={role}
            firmName={firmName}
            navbar={<Navbar currentDriver={currentDriver} />}
          >
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
            <p className="text-base">Kliknij tutaj aby sie zalogowac 👇</p>
            <ClientOnly>
              <NotLoggedInButton />{" "}
            </ClientOnly>
          </div>
        </div>
      )}
    </>
  );
}
