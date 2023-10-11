import ClientOnly from "./components/ClientOnly";
import HomeLoginButton from "./components/HomeLoginButton";
import Image from "next/image";
import HomeReasons from "./components/HomeReasons";
import HomeFooter from "./components/HomeFooter";

export default function Home() {
  return (
    <>
      <div className="min-w-full overflow-hidden max-h-screen overflow-y-scroll">
        <div className="px-5 md:px-10">
          <div className="mx-auto w-full max-w-7xl">
            <div className="md:pt-36 lg:pt-56 pt-40">
              <div className="flex-col flex items-center gap-y-15 text-lg">
                <div className="flex-col flex min-w-full items-center gap-y-20">
                  <div className="mb-20 flex-col flex items-center gap-y-10">
                    <div className="flex-col flex max-w-[800px] items-center gap-y-3">
                      <h1 className="text-center font-bold text-4xl sm:text-4xl md:text-5xl lg:text-6xl">
                        {"Quick and easy 3-step CV maker"}
                      </h1>
                      <h2 className="text-center font-semibold text-base sm:text-4xl md:base">
                        {"First 3 months "}
                        <b>{"ABSOLUTELY FREE! 📣📣"}</b>
                      </h2>
                      <div className="max-w-[600px]">
                        <p className="text-center font-normal text-[#636262] text-xl sm:text-lg">
                          {
                            "Just log in, fill in your details, pick a template and "
                          }
                          <b>{"DOWNLOAD FOR FREE!"}</b>
                        </p>
                      </div>
                    </div>
                    <ClientOnly>
                      <HomeLoginButton />
                    </ClientOnly>
                  </div>
                </div>
                <div className="flex-col flex w-full max-w-7xl items-center gap-y-20">
                  <div className="flex-col flex min-w-full items-center max-[479px]:hidden">
                    <div className="flex-row flex max-w-[100vw] items-start justify-start max-[479px]:hidden max-[479px]:gap-x-2 min-[479px]:overflow-x-auto min-[479px]:whitespace-nowrap">
                      {[
                        "/images/introspect_template.png",
                        "/images/beetle_template.png",
                        "/images/dolphin_template.png",
                        "/images/utopia_template.png",
                        "/images/prince_template.png",
                        "/images/mellaYella_template.png",
                        "/images/chikane_template.png",
                        "/images/zoid_template.png",
                        "/images/cooper_template.png",
                        "/images/structura_template.png",
                      ].map((link, index) => (
                        <section
                          key={index}
                          className={`index${index} inline-block h-[540px] w-[460px]  min-w-[460px] max-w-full text-[#d6a701] ${
                            index !== 0 && "ml-[-80px]"
                          } transition rounded-xl`}
                        >
                          <Image
                            src={link}
                            alt={`How the CV/resume template ${link.slice(
                              8,
                              -13
                            )} is to look with your specifics input.`}
                            width={"460"}
                            height={"540"}
                            className="inline-block h-full w-full max-w-full flex-none object-cover max-[479px]:max-h-[260px] max-[479px]:min-w-[230px]"
                          />
                        </section>
                      ))}
                    </div>
                  </div>
                  <div className="flex min-h-[124px] min-w-[100vw] items-center justify-center bg-white py-10 max-[991px]:px-10 max-[767px]:px-5">
                    <HomeReasons />
                  </div>
                  <div className="flex min-h-[124px] min-w-[100vw] items-center justify-center bg-white py-10 max-[991px]:px-10 max-[767px]:px-5">
                    <HomeFooter />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
