import Link from "next/link";
import { Inter } from "next/font/google";
import Image from "next/image";

export const metadata = {
  title: "Wimax: Page not found",
  description: "Error 404: the page you're looking for is not in the registry",
};

const font = Inter({
  subsets: ["latin"],
});

const NotFound = () => {
  return (
    <section className={`${font.className} block`}>
      <div className="py-16 md:py-24 lg:py-32 px-5 md:px-10">
        <div className="mx-auto flex-col flex w-full max-w-3xl items-center">
          <Image
            height={500}
            width={500}
            src="/Images/LogoHiRes.png"
            alt="Wimax logo on 404 page"
            className="mb-8 mx-auto inline-block h-56 w-56 flex-none object-contain"
          />
          <div className="text-center">
            <h1 className="font-bold mb-4 text-4xl md:text-6xl">404 Error</h1>
            <div className="mx-auto max-w-[528px] mb-5 md:mb-6 lg:mb-8 flex flex-col gap-4">
              <p>The page you&apos;re looking for cannot be found.</p>
              <p className="text-base">
                Click on the menu in the top-right to get access to the full
                features.
              </p>
              <p>Or head home here:</p>{" "}
            </div>
            <Link href="/">
              <button className="inline-block items-center bg-velvet-blue rounded-md px-8 py-4 text-center font-bold text-white">
                Home
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
