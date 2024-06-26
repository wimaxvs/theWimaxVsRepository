"use client";

import { SafeDriver, SafeSettlement, SafeVehicle } from "@/app/types";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import useDriver from "@/app/hooks/useCurrentDriver";
import useAllVehicles from "@/app/hooks/useAllVehicles";
import { IoArrowBackOutline } from "react-icons/io5";
import useAllTasks from "@/app/hooks/useAllTasks";

interface DriverTableAssignVehicleProps {
  allTheDrivers?: Partial<SafeDriver>[];
  firmId?: string | undefined;
  isTras?: boolean;
}

const DriverTableAssignVehicle: React.FC<DriverTableAssignVehicleProps> = ({
  allTheDrivers,
  firmId,
  isTras,
}) => {
  let currentDriver = useDriver((state) => state.currentDriver);
  let setCurrentDriver = useDriver((state) => state.setCurrentDriver);
  let setDriver = useDriver((state) => state.setDriver);
  let drivers = useDriver((state) => state.allDrivers);
  let setAllDrivers = useDriver((state) => state.setAllDrivers);
  let { vehicleBeingAssigned, setVehicleBeingAssigned, setTheVehicles } =
    useAllVehicles();
  let { taskBeingAssigned, setTaskBeingAssigned, setTheTasks } = useAllTasks();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  let gimmeEligibleDrivers = useCallback(
    (drivers: Partial<SafeDriver>[]): Partial<SafeDriver>[] => {
      return drivers?.filter(
        (driver) =>
          driver?.currentFirm?.id === firmId
      );
    },
    [firmId]
  );

  useEffect(() => {
    //if the user is deleted from the db, this still won't run because drivers.length !== 0. Because the ui is rendering drivers, the only way to get it to work as expected is by making the value of drivers change even though useEffect isn't running. UseEffect in this instance is being used to instantiate the value of an empty drivers array.
    if (allTheDrivers && drivers.length == 0) {
      setAllDrivers(allTheDrivers);
    }
  }, [allTheDrivers, drivers, setAllDrivers]);

  const onButtonClick = (
    object: Partial<SafeVehicle> | Partial<SafeSettlement>,
    driverId?: string
  ) => {
    setIsLoading(true);
    if (!driverId) {
      return toast.error(
        <div className="p-4 text-bold text-red-800 flex flex-col items-center bg-red-100 rounded-lg my-4">
          {`Nie udało się przypisać sterownika`}
        </div>
      );
    }
    let data = JSON.stringify({
      driverId: driverId,
      vehicleId: object.id,
      taskId: object.id,
    });

    let route = isTras ? "/api/rozpiski/assign" : "/api/vehicles/assign";
    axios
      .post(route, data)
      .then(
        (
          res: AxiosResponse<{
            message: string;
            code?: string | number;
            allTheVehicles?: Partial<SafeVehicle>[];
            allTheTasks?: Partial<SafeSettlement>[];
            affectedDriver: Partial<SafeDriver> | null;
            allTheDrivers: Partial<SafeDriver>[] | null;
          }>
        ) => {
          isTras
            ? setTheTasks(res.data.allTheTasks as Partial<SafeSettlement>[])
            : setTheVehicles(res.data.allTheVehicles as Partial<SafeVehicle>[]);

          if (res.data.affectedDriver) {
            if (res.data.affectedDriver.id == currentDriver?.id) {
              setCurrentDriver(res.data.affectedDriver);
            }
            setDriver(res.data.affectedDriver);
          }
          if (res.data.allTheDrivers) {
            setAllDrivers(res.data.allTheDrivers);
          }

          return toast.success(
            <>
              <div className="p-4 text-bold text-green-800 flex flex-col items-center bg-green-100 rounded-lg my-4">
                {`${res.data.message}`}
              </div>
            </>
          );
        }
      )
      .catch((error: any) => {
        if (error.code) {
          switch (error.code) {
            case "ERR_BAD_RESPONSE":
              return toast.error(`Błąd`);
          }
        } else {
          return toast.error(error.message);
        }
      })
      .finally(() => {
        setIsLoading(false);
        goBack();
      });
  };

  let goBack = () => {
    if (isTras) {
      setTaskBeingAssigned({}, true);
    } else {
      setVehicleBeingAssigned({}, true);
    }
  };

  return (
    <>
      <div
        className={`md:max-w-full md:min-w-[45%] w-full flex flex-col gap-2 items-start p-4 rounded-md bg-gray-950`}
      >
        <div className="w-full flex flex-row justify-start" onClick={goBack}>
          <IoArrowBackOutline size={18} color={"white"} />
        </div>
        <div className={`w-full p-2 pl-0 overflow-y-auto`}>
          {/* Table Title */}
          <h3 className="text-white font-extrabold md:text-xl text-sm mb-1">
            {isTras
              ? "Wybierz, komu chcesz przypisać trasę"
              : "Wybierz kierowcę pojazdu:"}
          </h3>
          <p
            className={`text-xs md:text-sm lg:text-md font-semibold mb-3 text-gray-500`}
          >
            {!isTras && (
              <>
                <b>
                  {vehicleBeingAssigned.carMark} {vehicleBeingAssigned.carModel}
                </b>{" "}
                o rejestracji <b>{vehicleBeingAssigned.registration}</b>
              </>
            )}
            {isTras && "Do kierowcy można przypisać maksymalnie 6 tras"}
          </p>
          <div className="max-w-[11/12] overflow-x-auto pb-3 ">
            <table className="table rounded-md">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th className={`text-gray-100`}>Nick</th>
                  <th className={`text-gray-100`}>Aktualna stanowisko</th>
                  <th className={`text-gray-100`}>Wybieram</th>
                </tr>
              </thead>
              <tbody>
                {/* the rows */}
                {drivers &&
                  gimmeEligibleDrivers(drivers).map((driver, index) => {
                    let driverIncompleteRouteAmount =
                      driver?.settlements?.filter(
                        (sett) => !sett.approvalStatus
                      ).length;
                    let hasTwelve = driverIncompleteRouteAmount
                      ? driverIncompleteRouteAmount > 11
                      : false;
                    return (
                      <tr
                        key={index}
                        className={`border-none even:bg-gray-800`}
                      >
                        <td className={`rounded-l-md text-gray-100`}>
                          {index + 1}
                        </td>
                        <td>
                          <div className="flex items-center space-x-3">
                            <div className="avatar">
                              <div className="mask mask-squircle w-12 h-12">
                                <Image
                                  height={50}
                                  width={50}
                                  src={`${
                                    driver.image
                                      ? driver.image
                                      : "/images/placeholder.jpg"
                                  }`}
                                  alt="Avatar Tailwind CSS Component"
                                />
                              </div>
                            </div>
                            <div>
                              <div className="font-bold text-gray-100">
                                {driver.username}
                              </div>
                              <div className="text-sm opacity-50 text-gray-100">
                                {driver.name ? driver.name : "Imię zastrzeżone"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className={`text-gray-100`}>{driver?.role}</td>
                        <td
                          className={`${index == 3 ? "rounded-r-md " : ""}`}
                          key={index}
                        >
                          <button
                            onClick={() =>
                              onButtonClick(
                                !isTras
                                  ? vehicleBeingAssigned
                                  : taskBeingAssigned,
                                driver.id
                              )
                            }
                            disabled={
                              isLoading || !isTras
                                ? driver.vehicle?.length
                                  ? driver.vehicle.length >= 2
                                  : false
                                : hasTwelve
                            }
                            className={`p-2 rounded-md disabled:opacity-50 font-bold ${
                              !isTras &&
                              (driver.vehicle?.length
                                ? driver.vehicle.length >= 2
                                : false)
                                ? "bg-red-400"
                                : "bg-green-600"
                            } text-white`}
                          >
                            {(!isTras && driver.vehicle?.length
                              ? driver.vehicle.length >= 2
                              : false) ||
                            (isTras && hasTwelve)
                              ? "Przydzielono"
                              : "Wybieram"}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default DriverTableAssignVehicle;
