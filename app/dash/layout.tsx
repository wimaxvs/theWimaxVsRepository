import Sidebar from "../components/sidebar/Sidebar";
import getCurrentUser from "../actions/getCurrentUser";
import Link from "next/link";
import { Inter } from "next/font/google";

interface DashlayoutProps{
  children: React.ReactNode
}

export const metadata = {
  title: "Me-CV: Dashboard",
  description: "Create a new CV, view your previous CVs or See CV templates",
};

const font = Inter({
  subsets: ["latin"],
});

export default async function Dash({children}:DashlayoutProps){
  const currentUser = await getCurrentUser();

  if (currentUser) {
    return (
      <>
        <div className="dashLayoutContainer min-h-full overflow-y-hidden w-full bg-off-white/30 pt-20 flex flex-row ">
          <Sidebar />
          {children}
        </div>
      </>
    );
  } else {
    return (
      <div
        className={`${font.className} fixed mt-40 w-full h-40 flex flex-col items-center justify-center`}
      >
        <div className="fixed flex flex-col items-center w-[50%] bg-off-white px-10 py-6 rounded-xl drop-shadow-md text-white font-bold gap-1">
          <p>You&apos;re signed out.</p>
          <p className="text-base">
            Click on the menu in the top-right to get access to the full
            features.
          </p>
          <p>Or head home here:</p>
          <Link href="/">
            <button
              className={`bg-deep-blue mt-2 py-2 px-4 rounded-lg drop-shadow-lg`}
            >
              Home
            </button>
          </Link>
        </div>
      </div>
    );
  }
}


