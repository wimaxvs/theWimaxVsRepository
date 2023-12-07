"use client";
import { SafeDriver, SafeVehicle } from "@/app/types";
import React from "react";
import VehicleTableAssign from "../tables/VehicleTableAssign";
import useAllVehicles from "@/app/hooks/useAllVehicles";
import DriverTableAssignVehicle from "../tables/DriverTableAssignVehicle.tsx";

interface AssignCarProps {
  allTheVehicles: SafeVehicle[] | null | undefined;
  allTheDrivers: Partial<SafeDriver>[];
  firmId: string | undefined;
  isTrailer?: boolean;
}

const AssignCar: React.FC<AssignCarProps> = ({
  allTheVehicles,
  allTheDrivers,
  firmId,
  isTrailer,
}) => {
  let { vehicleBeingAssigned } = useAllVehicles();

  let vbaKeys = Object.keys(vehicleBeingAssigned);

  return (
    <div
      className={`mainContainer w-full flex flex-col md:flex-row justify-center gap-3 max-w-full`}
    >
      <div className="rightPartition md:max-w-[1/2] md:min-w-[1/2] md:max-h-full rounded-xl flex flex-col w-full min-h-[265.5px] max-h-[265.5px] overflow-y-scroll gap-1 pl-2 pr-3 pt-2 mr-4 bg-gray-950">
        {vbaKeys.length < 1 && (
          <VehicleTableAssign
            isTrailer={isTrailer}
            allTheVehicles={allTheVehicles}
          />
        )}
        {vbaKeys.length >= 1 && (
          <DriverTableAssignVehicle
            allTheDrivers={allTheDrivers}
            firmId={firmId}
          />
        )}
      </div>
    </div>
  );
};

export default AssignCar;
