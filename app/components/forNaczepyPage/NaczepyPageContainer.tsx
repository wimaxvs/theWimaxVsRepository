"use client";
import usePracNav from "@/app/hooks/usePracNav";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import { SafeDriver, SafeVehicle } from "@/app/types";
import NaczepyView from "./NaczepyView";
import AddOrDeleteCar from "../ForVehiclePage/AddOrDeleteCar";
import AssignCar from "../ForVehiclePage/AssignCar";
import AddEditDeleteCar from "../ForVehiclePage/AddEditDeleteCar";

interface VehiclePageContainerProps {
  currentDriver: any;
  allTheDrivers: any[];
  allTheVehicles: SafeVehicle[] | null;
  firmId: string | undefined;
}

const VehiclePageContainer: React.FC<VehiclePageContainerProps> = ({
  currentDriver,
  allTheDrivers,
  allTheVehicles,
  firmId,
}) => {
  let { theLocation, setTheLocation } = usePracNav();
  let pathname = usePathname();

  let [trailer, setTrailer] = React.useState<Partial<SafeVehicle> | null>();

  useEffect(() => {
    if (pathname?.includes("naczepy")) {
      setTheLocation("Podgląd naczepy/przyczepy");
    }
    setTrailer((prev) => {
      return {
        ...prev,
        ...allTheVehicles?.find(
          (vehicle) =>
            vehicle.currentDriver?.id == currentDriver?.id &&
            vehicle?.isTrailer == true
        ),
      };
    });
  }, [allTheVehicles, currentDriver?.id, pathname, setTheLocation]);

  return (
    <div className={`w-full h-full flex flex-row p-3`}>
      {theLocation == "Podgląd naczepy/przyczepy" && (
        <NaczepyView vehicle={trailer} />
      )}
      {theLocation == "Zarządzanie naczepy" && (
        <AddEditDeleteCar allTheDrivers={allTheDrivers} allTheVehicles={allTheVehicles} isTrailer />
      )}
      {theLocation == "Przypisz przyczepę kierowcy" && (
        <AssignCar
          isTrailer
          allTheVehicles={allTheVehicles}
          allTheDrivers={allTheDrivers}
          firmId={firmId}
        />
      )}
    </div>
  );
};

export default VehiclePageContainer;
