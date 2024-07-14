import Link from "next/link";
import { Inter } from "next/font/google";
import Image from "next/image";

export const metadata = {
  title: "TopTrans: Page not found",
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
            height={64}
            width={275}
            src="/Images/Logo.webp"
            alt="TopTrans logo on 404 page"
            className="mb-8 mx-auto inline-block h-56 w-56 flex-none object-contain"
          />
          <div className="text-center">
            <h1 className="font-bold mb-4 text-4xl md:text-6xl">Bląd 404</h1>
            <div className="mx-auto max-w-[528px] mb-5 md:mb-6 lg:mb-8 flex flex-col gap-4">
              <p>{`Strona, której szukasz, nie została znaleziona`}.</p>
              <p>{`Przejdź do pulpitu nawigacyjnego tutaj:`}</p>{" "}
            </div>
            <Link href="/pulpit">
              <button className="inline-block items-center bg-velvet-blue rounded-md px-8 py-4 text-center font-bold text-white">
                Pulpit
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
