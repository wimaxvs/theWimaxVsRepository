import getAllTasks from "@/app/actions/getAllTasks";
import getCurrentDriver from "@/app/actions/getCurrentDriver";
import ClientOnly from "@/app/components/ClientOnly";
import PracBody from "@/app/components/navbar/pracNav/PracBody";
import PracNav from "@/app/components/navbar/pracNav/PracNav";
import {  SafeDriver, SafeSettlement } from "@/app/types";
import React from "react";
import RozliczTaskPageContainer from "@/app/components/forRozliczeniaPage/RozliczTaskPageContainer";


const page = async () => {
  let theCurrentDriver = await getCurrentDriver();
  let currentDriver = {...theCurrentDriver, id: theCurrentDriver?.id || "", firmId: theCurrentDriver?.firmId || null, balance: theCurrentDriver?.balance || 0}
  let PracNavItems = ["Ustal trasy"];

  if (
    theCurrentDriver?.role !== "KIEROWCA" &&
    theCurrentDriver?.role !== "PROBNY"
  ) {
    PracNavItems.push(...["Akceptuj lub anuluj ukończone trasy"]);
  }

  let allTheTasks: SafeSettlement[] | null = await getAllTasks();
  allTheTasks = allTheTasks?.filter(task => !task.approvalStatus)|| null

  return (
    <div className="bg-[url('/images/bkg_5.jpg')] bg-no-repeat bg-cover bg-left-bottom h-screen w-full min-h-full flex flex-row justify-center pt-6">
      <section
        className={`navAndBody rounded-xl w-11/12 md:w-4/5 lg:w-2/3 md:min-h-5/6 md:h-5/6 flex flex-col max-h-[600px]`}
      >
        <ClientOnly>
          <PracNav PracNavItems={PracNavItems} />
          <PracBody>
            <RozliczTaskPageContainer
              theCurrentDriver={currentDriver}
              allTheTasks={allTheTasks}
            />
          </PracBody>
        </ClientOnly>
      </section>
    </div>
  );
};

export default page;
