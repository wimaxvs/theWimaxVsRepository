import ClientOnly from "../components/ClientOnly";
import HomeLoginButton from "../components/HomeLoginButton";
import Image from "next/image"

const About = () => {
  return (
    <>
      <section className="block max-h-screen overflow-y-scroll pt-20">
        <div className="py-12 md:py-16 lg:py-20 mx-auto w-full max-w-7xl px-5 md:px-10">
          <div className="flex items-stretch max-[991px]:min-h-[auto] max-[991px]:w-full max-[991px]:flex-col grid-cols-1 lg:grid-cols-[65%_30%] gap-8 lg:gap-20">
            <div className="flex-col flex-1 flex justify-center gap-8">
              <div className="flex-col flex gap-8">
                <h2 className="font-bold text-3xl md:text-5xl">About us</h2>
                <p className="max-[479px]:text-sm">
                  At <b className="text-velvet-blue">Me-CV</b>, we're on a
                  mission to revolutionize the traditional CV and reshape the
                  way professionals present themselves in today's rapidly
                  evolving workplace. As a small, yet passionate team, we have
                  grand aspirations, and our journey is far from over. Our
                  website is continuously evolving, with our team actively
                  working to create the most dynamic and effective
                  resume-building tool. <br />
                  <br /> What sets us apart is our shared experience of being
                  jobseekers ourselves. We've encountered the challenges,
                  experienced the joys of landing the perfect job, and
                  understood the frustrations of job hunting. This deep
                  understanding of the job-seeking process drives our commitment
                  to creating a platform that genuinely caters to your needs.
                  <br />
                  <br />
                  Our goal is to simplify the CV creation process, making it
                  efficient and enjoyable. We recognize that your time is
                  valuable, and we aim to streamline the application process. We
                  provide you with the tools and resources you need to craft a
                  standout CV, showcasing your skills and experiences in a
                  captivating way.
                  <br />
                  <br /> Join us on this exciting journey of transformation and
                  reinvention. We promise to keep striving for excellence as we
                  work to redefine the CV landscape, making it shorter and, most
                  importantly, better. Your career deserves the best, and we're
                  here to make that happen.
                  <br />
                  <br /> Thank you for being a part story and believing in our
                  vision. Together, we can revolutionize CV creation, and we
                  eagerly anticipate your insights and collaboration as we
                  continue to refine and enhance our platform.{" "}
                  <b className="text-velvet-blue">Me-CV</b> is more than just a
                  platform; it's a shared endeavor to redefine your professional
                  narrative, and we're thrilled to have you on board.
                </p>
              </div>
              <div
                className={`inline-block flex-none cursor-pointer bg-white font-semibold capitalize text-black transition hover:[box-shadow:rgb(0,_0,_0)_0px_0px] py-3 rounded-lg md:rounded-2xl text-base md:text-base pr-6 md:pr-6`}
              >
                <ClientOnly>
                  <HomeLoginButton
                    label={"Let's Go!"}
                    bgColor={"#f7d046"}
                    register
                  />
                </ClientOnly>
              </div>
              <div className="mb-8 mt-8 h-px w-full bg-black"></div>
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4">
                <div className="flex-col flex w-full items-start justify-between gap-4 border border-solid bg-[#f2f2f7] rounded-md p-6 md:p-4">
                  <div className="text-sm sm:text-sm">
                    I have been using the Business Solution services for the
                    past year, and I am extremely satisfied with the results.
                    Their innovative solutions and expertise have transformed my
                    business operations.
                  </div>
                  <div className="flex items-center gap-x-4 text-left max-[767px]:w-full max-[479px]:gap-2">
                    <div className="flex items-center gap-x-2">
                      <img
                        src="https://assets.website-files.com/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg"
                        alt=""
                        className="flex h-12 min-h-[48px] w-12 min-w-[48px] items-center rounded-[100%] object-cover"
                      />
                      <p className="font-semibold max-[479px]:text-sm">
                        Alleyah
                      </p>
                    </div>
                    <div className="w-px bg-[#636262] h-5"></div>
                    <div className="flex items-center gap-x-2">
                      <p className="font-semibold max-[479px]:text-sm">5.0</p>
                      <div className="flex text-[#f6ad1b]">
                        <div className="flex-col flex h-4 w-4 items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className=""
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex-col flex h-4 w-4 items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className=""
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex-col flex h-4 w-4 items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className=""
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex-col flex h-4 w-4 items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className=""
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex-col flex h-4 w-4 items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className=""
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-col flex w-full items-start justify-between gap-4 border border-solid bg-[#f2f2f7] rounded-md p-6 md:p-4">
                  <div className="text-sm sm:text-sm">
                    I have been using the Business Solution services for the
                    past year, and I am extremely satisfied with the results.
                    Their innovative solutions and expertise have transformed my
                    business operations.
                  </div>
                  <div className="flex items-center gap-x-4 text-left max-[767px]:w-full max-[479px]:gap-2">
                    <div className="flex items-center gap-x-2">
                      <img
                        src="https://assets.website-files.com/624380709031623bfe4aee60/6243807090316203124aee66_placeholder-image.svg"
                        alt=""
                        className="flex h-12 min-h-[48px] w-12 min-w-[48px] items-center rounded-[100%] object-cover"
                      />
                      <p className="font-semibold max-[479px]:text-sm">
                        Alleyah
                      </p>
                    </div>
                    <div className="w-px bg-[#636262] h-5"></div>
                    <div className="flex items-center gap-x-2">
                      <p className="font-semibold max-[479px]:text-sm">5.0</p>
                      <div className="flex text-[#f6ad1b]">
                        <div className="flex-col flex h-4 w-4 items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className=""
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex-col flex h-4 w-4 items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className=""
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex-col flex h-4 w-4 items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className=""
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex-col flex h-4 w-4 items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className=""
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex-col flex h-4 w-4 items-center justify-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                            className=""
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid meet"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="m12 17.27l4.15 2.51c.76.46 1.69-.22 1.49-1.08l-1.1-4.72l3.67-3.18c.67-.58.31-1.68-.57-1.75l-4.83-.41l-1.89-4.46c-.34-.81-1.5-.81-1.84 0L9.19 8.63l-4.83.41c-.88.07-1.24 1.17-.57 1.75l3.67 3.18l-1.1 4.72c-.2.86.73 1.54 1.49 1.08l4.15-2.5z"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
            <div className="block overflow-hidden bg-[#f2f2f7] max-[991px]:h-[475px] rounded-md w-full lg:w-[30%]">
              <Image
                src="/images/cvMosaic.png"
                height={906}
                width={906}
                alt="A mosaic of strewn paper lying on surface"
                className={`object-cover max-h-[906px] max-w-[906px]`}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
