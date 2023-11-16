import getAllDrivers from "@/app/actions/getAllDrivers";
import getAllVehicles from "@/app/actions/getAllVehicles";
import getCurrentDriver from "@/app/actions/getCurrentDriver";
import ClientOnly from "@/app/components/ClientOnly";
import VehiclePageContainer from "@/app/components/ForVehiclePage/VehiclePageContainer";
import PracBody from "@/app/components/navbar/pracNav/PracBody";
import PracNav from "@/app/components/navbar/pracNav/PracNav";
import { SafeDriver, SafeVehicle } from "@/app/types";
import React from "react";

const Pojazd = async () => {
  const theCurrentDriver = await getCurrentDriver();
  let PracNavItems = ["Podgląd pojazdu"];

  if (theCurrentDriver?.role === "ZARZAD") {
    PracNavItems.push(...["Zarządzanie pojazdami", "Przypisz pojazd kierowcy"]);
  }

  let allTheDrivers: SafeDriver[] = await getAllDrivers();
  let allTheVehicles: SafeVehicle[] | null = await getAllVehicles();
  return (
    <div className="bg-[url('/images/truckWireMesh.png')] bg-no-repeat bg-cover bg-right-bottom h-screen w-full min-h-full flex flex-row justify-center pt-6">
      <section
        className={`navAndBody rounded-xl w-11/12 md:w-4/5 lg:w-2/3 md:min-h-5/6 md:h-5/6 flex flex-col max-h-[600px]`}
      >
        <ClientOnly>
          <PracNav PracNavItems={PracNavItems} />
          <PracBody>
            <VehiclePageContainer
              allTheVehicles={allTheVehicles}
              allTheDrivers={allTheDrivers}
              firmId={theCurrentDriver?.currentFirm?.id}
            />
          </PracBody>
        </ClientOnly>
      </section>
    </div>
  );
};

export default Pojazd;
