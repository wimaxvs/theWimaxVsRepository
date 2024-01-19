"use client";
import { SafeDriver, SafeVehicle } from "@/app/types";
import React, { useEffect } from "react";
import useAllVehicles from "@/app/hooks/useAllVehicles";
// import DriverTableAssignVehicle from "../tables/DriverTableAssignVehicle.tsx";
import AddOrDeleteCar from "./AddOrDeleteCar";
import VehicleAdditionForm from "../Forms/VehicleAdditionForm";
import { IoArrowBackOutline } from "react-icons/io5";

interface AddEditDeleteCarProps {
  allTheVehicles: SafeVehicle[] | null;
  allTheDrivers: Partial<SafeDriver>[];
  isTrailer?: boolean;
}

const AddEditDeleteCar: React.FC<AddEditDeleteCarProps> = ({
  allTheVehicles,
  isTrailer
}) => {

  let { vehicleBeingEdited, setVehicleBeingEdited } = useAllVehicles();

  useEffect(()=>{}, [vehicleBeingEdited])

  let vbeKeys = Object.keys(vehicleBeingEdited);
  let goBack = () => {
    setVehicleBeingEdited({}, true);
  };

  return (
    <div
      className={`mainContainer w-full flex flex-col md:flex-row justify-center gap-3 max-w-full`}
    >
      <div className="md:max-w-[1/2] md:min-w-[1/2] md:max-h-full rounded-xl flex flex-col w-full min-h-[265.5px] max-h-[265.5px] overflow-y-scroll gap-1 pl-2 pr-3 pt-2 mr-4 bg-gray-950">
        {vbeKeys.length < 1 && (
          <AddOrDeleteCar allTheVehicles={allTheVehicles} isTrailer={isTrailer} />
        )}
        {vbeKeys.length >= 1 && (
          <div
            className={`md:max-w-full md:min-w-[45%] w-full flex flex-col gap-2 items-start p-4 rounded-md bg-gray-950`}
          >
            <div
              className="w-full flex flex-row justify-start"
              onClick={goBack}
            >
              <IoArrowBackOutline size={18} color={"white"} />
            </div>
            <VehicleAdditionForm wereEditing vehicle={vehicleBeingEdited} />
          </div>
        )}
      </div>
    </div>
  );
};

export default AddEditDeleteCar;
