import Link from "next/link";
import { Inter } from "next/font/google";

export const metadata = {
  title: "Me-CV: Page not found",
  description: "Error 404: the page you're looking for is not in the registry",
};

const font = Inter({
  subsets: ["latin"],
});

const NotFound = () => {
  return (
    <div
      className={`${font.className} fixed mt-40 w-full h-40 flex flex-col items-center justify-center`}
    >
      <div className="fixed flex flex-col items-center w-[50%] bg-off-white px-10 py-6 rounded-xl drop-shadow-md text-white font-bold gap-1">
        <p>The page you're looking for cannot be found.</p>
        <p className="text-base">
          Click on the menu in the top-right to get access to the full features.
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
};

export default NotFound;
