import React from "react";
import getAllDrivers from "@/app/actions/getAllDrivers";
import getAllFirms from "@/app/actions/getAllFirms";
import PracNav from "@/app/components/navbar/pracNav/PracNav";
import ClientOnly from "@/app/components/ClientOnly";
import PracBody from "@/app/components/navbar/pracNav/PracBody";
import { Firm } from "@prisma/client";

const page = async () => {
  let allTheDrivers = await getAllDrivers();

  let allTheFirms = await getAllFirms()
  let wimaxFirm: Firm = allTheFirms.find((f: Firm) => f.firmName === "Wimax")
  let firmId = wimaxFirm.id
  
  return (
    <div className="bg-[url('/images/handsWireMesh.png')] bg-no-repeat bg-cover bg-center h-screen w-full min-h-full flex flex-row justify-center pt-6">
      <section
        className={`navAndBody rounded-xl w-11/12 md:w-4/5 lg:w-2/3 md:min-h-5/6 md:h-5/6 flex flex-col max-h-[600px]`}
      >
        <ClientOnly>
          <PracNav />
          <PracBody allTheDrivers={allTheDrivers} firmId={firmId}/>
        </ClientOnly>
      </section>
    </div>
  );
};

export default page;
