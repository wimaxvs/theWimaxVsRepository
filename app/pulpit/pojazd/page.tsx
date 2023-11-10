import ClientOnly from "@/app/components/ClientOnly";
import React from "react";

const Pojazd = () => {
  return (
    <div className="bg-[url('/images/truckWireMesh.png')] bg-no-repeat bg-cover bg-right-bottom h-screen w-full min-h-full flex flex-row justify-center pt-6">
      <section
        className={`navAndBody rounded-xl w-11/12 md:w-4/5 lg:w-2/3 md:min-h-5/6 md:h-5/6 flex flex-col max-h-[600px]`}
      >
        <ClientOnly><></></ClientOnly>
      </section>
    </div>
  );
};

export default Pojazd;
