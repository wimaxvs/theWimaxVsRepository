"use client";
import usePracNav from "@/app/hooks/usePracNav";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import VehicleView from "./VehicleView";
import AddOrDeleteCar from "./AddOrDeleteCar";
import AssignCar from "./AssignCar";
import { SafeDriver } from "@/app/types";


interface VehiclePageContainerProps {
  allTheDrivers: SafeDriver[]
}

const VehiclePageContainer:React.FC<VehiclePageContainerProps> = ({allTheDrivers}) => {
  let { theLocation, setTheLocation } = usePracNav();
  let pathname = usePathname();

  useEffect(() => {
    console.log(pathname);
    if (pathname?.includes("pojazd")) {
      setTheLocation("Podgląd pojazdu");
    }
  }, [pathname, setTheLocation]);

  return (
    <div className={`w-full h-full flex flex-row p-3`}>
      {theLocation == "Podgląd pojazdu" && <VehicleView allTheDrivers={allTheDrivers} />}
      {theLocation == "Zarządzanie pojazdami" && <AddOrDeleteCar />}
      {theLocation == "Przypisz pojazd kierowcy" && <AssignCar />}
    </div>
  );
};

export default VehiclePageContainer;
