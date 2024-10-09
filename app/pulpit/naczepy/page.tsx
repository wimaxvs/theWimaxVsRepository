import getAllDrivers from "@/app/actions/getAllDrivers";
import getAllVehicles from "@/app/actions/getAllVehicles";
import getCurrentDriver from "@/app/actions/getCurrentDriver";
import ClientOnly from "@/app/components/ClientOnly";
import NaczepyPageContainer from "@/app/components/forNaczepyPage/NaczepyPageContainer";
import PracBody from "@/app/components/navbar/pracNav/PracBody";
import PracNav from "@/app/components/navbar/pracNav/PracNav";
import { SafeDriver, SafeVehicle } from "@/app/types";
import { DriverBeta } from "@prisma/client";
import React from "react";

const page = async () => {
  const theCurrentDriver = await getCurrentDriver();
  let PracNavItems = ["Podgląd naczepy/przyczepy"];

  if (
    theCurrentDriver?.role === "ZARZAD" ||
    theCurrentDriver?.role === "SPEDYTOR"
  ) {
    PracNavItems.push(
      ...["Zarządzanie naczepy", "Przypisz przyczepę kierowcy"]
    );
  }

  let allTheDrivers: SafeDriver[] = await getAllDrivers();
  let allTheVehicles: Partial<SafeVehicle>[] | null = await getAllVehicles();
  return (
    <div className="bg-[url('/images/pojazdy_i_naczepy.jpg')] bg-no-repeat bg-cover bg-center-bottom h-screen w-full min-h-full flex flex-row justify-center pt-6">
      <section
        className={`navAndBody rounded-xl w-11/12 md:w-4/5 lg:w-2/3 md:min-h-5/6 md:h-5/6 flex flex-col max-h-[600px]`}
      >
        <ClientOnly>
          <PracNav PracNavItems={PracNavItems} />
          <PracBody>
            <NaczepyPageContainer
              currentDriver={theCurrentDriver}
              allTheDrivers={allTheDrivers}
              allTheVehicles={allTheVehicles as SafeVehicle[]}
              firmId={theCurrentDriver?.currentFirm?.id}
            />
          </PracBody>
        </ClientOnly>
      </section>
    </div>
  );
};

export default page;
