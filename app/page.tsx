import Image from "next/image";
import ClientOnly from "./components/ClientOnly";

export default function Home() {
  return (
    <>
      {/* <div
        className={`h-screen w-screen bg-[url(/images/homepageBkg.png)] 
bg-no-repeat flex flex-col items-center justify-center`}
      ></div> */}

      <section className="grid h-auto md:h-screen grid-cols-1 md:grid-cols-2 gap-0">
        <div className="flex-col flex items-center justify-center bg-[url(/images/homepageBkg.png)] bg-no-repeat">
          <div className="py-16 md:py-24 lg:py-32 px-5 md:px-10">
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
          </div>
        </div>
        <div className="flex-col flex items-center justify-center bg-white">
          <div className="py-16 md:py-24 lg:py-32 px-5 md:px-10">
            <div className="text-center max-w-[480px] md:max-w-[480px]">
              <div
                className={`bg-red w-full h-full flex flex-col items-center gap-4`}
              >
                <Image
                  height={64}
                  width={275}
                  alt="Vimax logo"
                  src={"/images/logo.png"}
                />
                <h2 className="font-bold text-md md:text-md mb-8 md:mb-12 lg:mb-16">
                  Euro Truck Simulator 2 Company Management
                </h2>
              </div>
              <div className="mx-auto max-w-[400px] mb-4 pb-4">
                <form name="wf-form-password" method="get">
                  <div className="relative">
                    <Image
                      height={20}
                      width={20}
                      alt=""
                      src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a9455fae6cf89_EnvelopeSimple.svg"
                      className="absolute left-[5%] top-[26%] inline-block"
                    />
                    <input
                      type="email"
                      className="mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14"
                      maxLength={256}
                      name="name-3"
                      placeholder="Email Address"
                      required
                    />
                    <div></div>
                    <div></div>
                  </div>
                  <div className="relative mb-4">
                    <Image
                      height={20}
                      width={20}
                      alt=""
                      src="https://assets.website-files.com/6458c625291a94a195e6cf3a/6458c625291a946794e6cf8a_Lock-2.svg"
                      className="absolute left-[5%] top-[26%] inline-block"
                    />
                    <input
                      type="password"
                      className="mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14"
                      maxLength={256}
                      name="password-4"
                      placeholder="Password (min 8 characters)"
                      required
                    />
                    <div></div>
                    <div></div>
                  </div>
                  <label className="flex items-center justify-start font-medium before:table before:[grid-area:1/1/2/2] before:content-['_'] mb-6 md:mb-10 lg:mb-1 pb-12 pl-5">
                    <input
                      type="checkbox"
                      name="checkbox-3"
                      className="float-left -ml-[20px] mt-1"
                    />
                    <label
                      className="ml-4 inline-block cursor-pointer text-sm sm:text-sm"
                      htmlFor={"checkbox-3"}
                    >
                      I agree with the{" "}
                      <a href="#" className="font-bold text-[#0b0b1f]">
                        Terms &amp; Conditions
                      </a>
                    </label>
                  </label>
                  <input
                    type="submit"
                    value="Join Wimax"
                    className="inline-block w-full cursor-pointer items-center bg-black px-6 py-3 text-center font-semibold text-white"
                  />
                </form>
              </div>
              <p className="text-[#636262] text-sm sm:text-sm">
                Already have an account?{" "}
                <a href="#" className="font-bold text-[#0b0b1f]">
                  Login now
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
