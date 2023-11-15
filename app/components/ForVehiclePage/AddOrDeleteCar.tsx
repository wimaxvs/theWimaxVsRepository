"use client";
import React from "react";
import VehicleAdditionForm from "../Forms/VehicleAdditionForm";
import VehicleTable from "../tables/VehicleTable";
import { SafeVehicle } from "@/app/types";

interface AddOrDeleteCarProps {
  allTheVehicles: SafeVehicle[] | null
}

const AddOrDeleteCar: React.FC<AddOrDeleteCarProps> = ({allTheVehicles}) => {
  return (
    <div
      className={`mainContainer w-full flex flex-col md:flex-row justify-center gap-3 max-w-full`}
    >
      <div className="leftPartition md:max-w-[1/2] md:min-w-[1/2] md:max-h-full rounded-xl flex flex-col w-full min-h-[265.5px] max-h-[265.5px] overflow-y-scroll gap-1 pl-2 pr-3 pt-2 mr-4 bg-gray-950">
        <VehicleAdditionForm />
      </div>
      <div className="rightPartition md:max-w-[1/2] md:min-w-[1/2] md:max-h-full rounded-xl flex flex-col w-full min-h-[265.5px] max-h-[265.5px] overflow-y-scroll gap-1 pl-2 pr-3 pt-2 mr-4 bg-gray-950">
        <VehicleTable allTheVehicles={allTheVehicles} />
      </div>
    </div>
  );
};

export default AddOrDeleteCar;
