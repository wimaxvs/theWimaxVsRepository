import Image from "next/image";
import ClientOnly from "./components/ClientOnly";
import LoginOrReg from "./components/Forms/LoginOrReg";

export default function Home() {
  return (
    <>
      <section className="grid h-auto md:h-screen grid-cols-1 md:grid-cols-2 gap-0">
        <div className="flex-col flex items-center justify-center bg-white bg-[url(/images/panel_logowania.png)] bg-contain bg-center bg-no-repeat">
          {/* <div className="py-16 md:py-24 lg:py-32 px-5 md:px-10">
            <div className="mx-auto text-left max-w-[480px] md:max-w-[480px] bg-white p-6 rounded-md">
              <div className="flex-col flex items-center justify-center h-14 w-14 mb-5 md:mb-6 lg:mb-8 rounded-sm p-2">
                <Image
                  height={56}
                  width={56}
                  src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a949eade6cf7d_Vector-2.svg"
                  alt=""
                  className="inline-block"
                />
              </div>
              <p className="max-[479px]:text-sm mb-8 md:mb-12 lg:mb-16">
                Poszukuję. Dążę. Robię to z całego serca.
              </p>
              <p className="font-bold max-[479px]:text-sm">Vincent Van Gogh</p>
              <p className="text-sm sm:text-sm">Malarz</p>
            </div>
          </div> */}
        </div>
        <div className="flex-col flex items-center justify-center bg-white">
          <div className="py-16 md:py-24 lg:py-32 px-5 md:px-10">
            <div className="text-center max-w-[480px] md:max-w-[480px]">
              <div
                className={`bg-red w-full h-full flex flex-col items-center gap-4 mb-4 md:mb-6 lg:mb-8`}
              >
                <Image
                  height={451}
                  width={1600}
                  alt="Vimax logo"
                  src={"/images/Logo.webp"}
                />
                <h2 className="font-bold text-md md:text-md">
                  Euro Truck Simulator 2 Company Management
                </h2>
                <p className="text-[#636262] text-sm sm:text-sm">
                  Witaj z powrotem!
                </p>
              </div>
              <div className="mx-auto max-w-[400px] mb-4 pb-4">
                <ClientOnly>
                  <LoginOrReg />
                </ClientOnly>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
