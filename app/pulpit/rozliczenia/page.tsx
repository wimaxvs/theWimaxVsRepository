import getAllTasks from "@/app/actions/getAllTasks";
import getCurrentDriver from "@/app/actions/getCurrentDriver";
import ClientOnly from "@/app/components/ClientOnly";
import PracBody from "@/app/components/navbar/pracNav/PracBody";
import PracNav from "@/app/components/navbar/pracNav/PracNav";
import {  SafeSettlement } from "@/app/types";
import React from "react";
import RozliczTaskPageContainer from "@/app/components/forRozliczeniaPage/RozliczTaskPageContainer";


const page = async () => {
  const theCurrentDriver = await getCurrentDriver();
  let PracNavItems = ["Ustal trasy"];

  if (
    theCurrentDriver?.role !== "KIEROWCA" &&
    theCurrentDriver?.role !== "PROBNY"
  ) {
    PracNavItems.push(...["Akceptuj lub anuluj ukończone trasy"]);
  }

  let allTheTasks: SafeSettlement[] | null = await getAllTasks();

  return (
    <div className="bg-[url('/images/rozpiskiBkg.png')] bg-no-repeat bg-cover bg-right-bottom h-screen w-full min-h-full flex flex-row justify-center pt-6">
      <section
        className={`navAndBody rounded-xl w-11/12 md:w-4/5 lg:w-2/3 md:min-h-5/6 md:h-5/6 flex flex-col max-h-[600px]`}
      >
        <ClientOnly>
          <PracNav PracNavItems={PracNavItems} />
          <PracBody>
            <RozliczTaskPageContainer
              theCurrentDriver={theCurrentDriver}
              allTheTasks={allTheTasks}
            />
          </PracBody>
        </ClientOnly>
      </section>
    </div>
  );
};

export default page;
