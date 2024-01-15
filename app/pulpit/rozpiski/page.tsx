import getAllDrivers from "@/app/actions/getAllDrivers";
import getAllTasks from "@/app/actions/getAllTasks";
import getCurrentDriver from "@/app/actions/getCurrentDriver";
import ClientOnly from "@/app/components/ClientOnly";
import TaskPageContainer from "@/app/components/forRozpiskiPage/TaskPageContainer";
import PracBody from "@/app/components/navbar/pracNav/PracBody";
import PracNav from "@/app/components/navbar/pracNav/PracNav";
import { SafeDriver, SafeSettlement } from "@/app/types";
import React from "react";

const page = async () => {
  const theCurrentDriver = await getCurrentDriver();
  let PracNavItems = ["Niewykonane trasy"];

  if (
    theCurrentDriver?.role === "ZARZAD" ||
    theCurrentDriver?.role === "SPEDYTOR"
  ) {
    PracNavItems.push(...["Dodaj lub usuń trasę"]);
  }

  let allTheTasks: SafeSettlement[] | null = await getAllTasks();
  let allTheDrivers: SafeDriver[] = await getAllDrivers();

  return (
    <div className="bg-[url('/images/bkg_3.jpg')] bg-no-repeat bg-cover bg-right-bottom h-screen w-full min-h-full flex flex-row justify-center pt-6">
      <section
        className={`navAndBody rounded-xl w-11/12 md:w-4/5 lg:w-2/3 md:min-h-5/6 md:h-5/6 flex flex-col max-h-[600px]`}
      >
        <ClientOnly>
          <PracNav PracNavItems={PracNavItems} />
          <PracBody>
            <TaskPageContainer
              allTheTasks={allTheTasks}
              allTheDrivers={allTheDrivers}
              firmId={theCurrentDriver?.currentFirm?.id}
            />
          </PracBody>
        </ClientOnly>
      </section>
    </div>
  );
};

export default page;
