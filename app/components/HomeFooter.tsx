import Link from "next/link";
import Navkeys from "./navbar/Navkeys";
import Image from "next/image";

const HomeFooter = () => {
  return (
    <>
      <footer className="w-11/12">
        <div className="pt-8 md:pt-12 lg:pt-16 pb-2 md:pb-3 lg:pb-4 mx-auto w-full max-w-full px-5 md:px-10">
          <div className="flex-row flex justify-between max-[767px]:flex-col max-[767px]:items-start">
            <div className="w-full max-w-[640px] max-[991px]:mr-4 max-[991px]:flex-initial max-[767px]:mr-0">
              <h2 className="font-bold text-3xl md:text-5xl">
                Let&apos;s get you out there faster, and{" "}
                <b className="text-pink-300">in style</b>
              </h2>
              <div className="mt-8 grid-cols-4 grid-flow-col grid w-full max-w-[208px] gap-3">
                {[
                  [
                    "https://www.instagram.com/mecvcom/",
                    "https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a945560e6cf77_Vector.svg",
                    "Instagram",
                  ],
                  [
                    "https://twitter.com/mecvcom",
                    "https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9433a9e6cf88_Vector-2.svg",
                    "Twitter/X",
                  ],
                ].map((link, index) => (
                  <Link
                    key={index}
                    href={link[0]}
                    className="mx-auto flex-col flex max-w-[24px] items-center justify-center text-black"
                  >
                    <Image
                      width={24}
                      height={24}
                      src={link[1]}
                      alt={`${link[2]} Icon with link to Me-CV ${link[2]} page`}
                      className="inline-block"
                    />
                  </Link>
                ))}
              </div>
            </div>
            <div className="max-[991px]:ml-4 max-[991px]:flex-none max-[767px]:ml-0 max-[767px]:mt-8">
              <div className="mb-4 flex max-w-[272px] items-start justify-start">
                <img
                  src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358f6e257ec977d799ff999_MapPin-2.svg"
                  alt=""
                  className="inline-block mr-3"
                />
                <p className="text-[#647084]">Gdansk, Poland</p>
              </div>
              <div className="mb-4 flex max-w-[272px] items-start justify-start">
                <img
                  src="https://assets.website-files.com/6357722e2a5f19121d37f84d/6358f6e24e55dd49a541fd06_EnvelopeSimple-3.svg"
                  alt=""
                  className="inline-block mr-3"
                />
                <p className="text-[#647084]">info@me-cv.com</p>
              </div>
            </div>
          </div>
          <div className="mb-7 w-full [border-bottom:1px_solid_rgb(100,_112,_132)] mt-8"></div>
          <div className="flex-row flex justify-between max-[767px]:flex-col max-[479px]:flex-col items-start md:items-center">
            <div className="font-semibold max-[991px]:ml-0 max-[991px]:mr-0 max-[479px]:mb-4 max-[991px]:py-1 text-center sm:text-center max-[479px]:ml-[-1.25rem]">
              <Navkeys />
            </div>
            <div className="max-[991px]:flex-none">
              <p className="text-[#647084]">
                © Copyright 2023. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default HomeFooter;
