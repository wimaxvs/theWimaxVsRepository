"use client";
import usePracNav from "@/app/hooks/usePracNav";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import VehicleView from "./VehicleView";
import AddOrDeleteCar from "./AddOrDeleteCar";
import AssignCar from "./AssignCar";
import { SafeDriver, SafeVehicle } from "@/app/types";


interface VehiclePageContainerProps {
  allTheDrivers: SafeDriver[];
  allTheVehicles: SafeVehicle[] | null;
  firmId: string | undefined;
}

const VehiclePageContainer: React.FC<VehiclePageContainerProps> = ({
  allTheDrivers,
  allTheVehicles,
  firmId
}) => {
  let { theLocation, setTheLocation } = usePracNav();
  let pathname = usePathname();

  useEffect(() => {
    if (pathname?.includes("pojazd")) {
      setTheLocation("Podgląd pojazdu");
    }
  }, [pathname, setTheLocation]);

  return (
    <div className={`w-full h-full flex flex-row p-3`}>
      {theLocation == "Podgląd pojazdu" && (
        <VehicleView allTheDrivers={allTheDrivers} />
      )}
      {theLocation == "Zarządzanie pojazdami" && (
        <AddOrDeleteCar allTheVehicles={allTheVehicles} />
      )}
      {theLocation == "Przypisz pojazd kierowcy" && (
        <AssignCar allTheVehicles={allTheVehicles} allTheDrivers={allTheDrivers} firmId={firmId} />
      )}
    </div>
  );
};

export default VehiclePageContainer;
