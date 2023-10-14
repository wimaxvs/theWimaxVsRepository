import Image from "next/image";
import React, { Suspense } from "react";
import Loading from "../loading";
import TheMessageForm from "../components/contactForm/TheMessageForm";

const Contact = () => {
  return (
    <>
      <section className="block overflow-y-scroll max-h-screen pt-16">
        <div className="py-16 md:py-24 lg:py-32 mx-auto w-full max-w-7xl px-5 md:px-10">
          <div className="grid items-center max-[991px]:justify-items-start grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-20">
            <div className="max-[991px]:max-w-[720px]">
              <h2 className="font-bold mb-2 text-3xl md:text-5xl">
                It takes a village to raise a child!
              </h2>
              <div className="ml-0 mr-0 mt-4 max-w-[528px] mb-5 md:mb-6 lg:mb-8 pb-4">
                <p className="text-[#636262] max-[479px]:text-sm">
                  Likewise, we&apos;re gonna need{" "}
                  <i className="text-velvet-blue">you and the interwebs</i> to
                  make Me-CV better- <b>your voice is all we want to hear.</b>{" "}
                  😌
                </p>
              </div>
              <div className="mb-8 max-w-[480px]">
                <p className="text-[#636262] max-[479px]:text-sm">
                  If you have suggestions as to how we can make Me-CV better,
                  you wanna raise a complaint, you&apos;d like to say hi or
                  anything in between or beyond,{" "}
                  <b>we&apos;d be glad to hear from you</b>!
                </p>
              </div>

              <div className="ml-0 mr-0 mt-4 max-w-[528px] mb-5 md:mb-6 lg:mb-8 pb-4">
                <p className="text-[#636262] max-[479px]:text-sm">
                  Just fill in{" "}
                  <i className="text-velvet-blue">the message form</i> and
                  we&apos;ll get back to you soonest we can!
                </p>
              </div>
              <div className="flex-row flex items-center">
                <Image
                  width={16}
                  height={16}
                  src="/images/klaudiaB.jpg"
                  alt="Image of Klaudia Brakowska our head of marketing"
                  className="inline-block h-16 w-16 object-cover mr-4 rounded-full"
                />
                <div className="flex-col flex items-start">
                  <h6 className="text-base font-bold">Klaudia B.</h6>
                  <p className="text-[#636262] text-sm sm:text-sm">
                    Head Of Marketing
                  </p>
                </div>
              </div>
            </div>
            <Suspense fallback={<Loading />}>
              <TheMessageForm />
            </Suspense>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
