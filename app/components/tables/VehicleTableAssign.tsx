import React, { useCallback, useEffect, useState } from "react";
import useAllVehicles from "@/app/hooks/useAllVehicles";
import Image from "next/image";
import { SafeDriver, SafeVehicle } from "@/app/types";
import axios, { AxiosResponse } from "axios";
import useCurrentDriver from "@/app/hooks/useCurrentDriver";
import toast from "react-hot-toast";

interface VehicleTableAssignProps {
  allTheVehicles: SafeVehicle[] | null | undefined;
  isTrailer?: boolean;
}

const VehicleTableAssign: React.FC<VehicleTableAssignProps> = ({
  allTheVehicles,
  isTrailer,
}) => {
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let { theVehicles, setTheVehicles, setVehicleBeingAssigned } =
    useAllVehicles();
  let { setCurrentDriver, currentDriver, setDriver, setAllDrivers } =
    useCurrentDriver();

  useEffect(() => {
    if (theVehicles?.length < 1 && allTheVehicles) {
      setTheVehicles(allTheVehicles);
    }
  }, [allTheVehicles, setTheVehicles, theVehicles]);

  let gimmeEligibleVehicles = useCallback(
    (vehicles: Partial<SafeVehicle>[]) => {
      return vehicles.filter((vehicle) => {
        if (isTrailer) {
          return vehicle.isTrailer == true;
        } else {
          return vehicle.isTrailer !== true;
        }
      });
    },
    [isTrailer]
  );

  let onPrzypisz = (
    vehicle: Partial<SafeVehicle>,
    option: "connect" | "disconnect"
  ) => {
    setIsLoading(true);
    if (option == "connect") {
      setVehicleBeingAssigned(vehicle);
    } else if (option == "disconnect") {
      let data = JSON.stringify({
        driverId: vehicle.currentDriver?.id,
        vehicleId: vehicle.id,
      });
      axios
        .post("/api/vehicles/unassign", data)
        .then(
          (
            res: AxiosResponse<{
              message: string;
              code?: string | number;
              allTheVehicles?: Partial<SafeVehicle>[];
              affectedDriver: Partial<SafeDriver> | null;
              allTheDrivers: Partial<SafeDriver>[] | null;
            }>
          ) => {
            setTheVehicles(res.data.allTheVehicles as Partial<SafeVehicle>[]);
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
        });
    }
  };

  return (
    <div
      className={`md:max-w-full md:min-w-[45%] w-full flex flex-col gap-2 items-start p-4 rounded-md bg-gray-950`}
    >
      <div className={`w-full p-2 pl-0 overflow-y-auto`}>
        <h3 className="text-white font-extrabold md:text-xl text-sm mb-1">
          {`Przypisz lub anuluj przypisanie ${
            isTrailer ? "Przyczepy/Naczepy" : "pojazdu"
          }`}{" "}
        </h3>
        <p className="text-gray-500 font-semibold md:text-sm text-xs mb-3">
          {`Wybierz ${
            isTrailer ? "Przyczepy/Naczepy" : "pojazd"
          }, w związku z którym chcesz podjąć działania`}
        </p>
        <div className="max-w-[11/12] overflow-x-auto pb-3">
          <table className="table rounded-md">
            <thead>
              <tr>
                <th></th>
                <th className={`text-gray-100`}>{`Szczegóły ${
                  isTrailer ? "Przyczepy/Naczepy" : "pojazdu"
                }`}</th>
                <th className={`text-gray-100`}>Przebieg</th>
                <th className={`text-gray-100`}>Przypisz</th>
                <th className={`text-gray-100`}>Anuluj przypisanie</th>
              </tr>
            </thead>
            <tbody>
              {theVehicles &&
                gimmeEligibleVehicles(theVehicles).map((vehicle, index) => {
                  return (
                    <tr
                      key={index}
                      className={`border-none even:bg-gray-800`}
                    >
                      <th
                        className={`text-gray-100 ${
                          index % 2 == 1 && "rounded-tl-md rounded-bl-md"
                        }`}
                      >
                        {index + 1}
                      </th>
                      <td>
                        <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <Image
                                height={50}
                                width={50}
                                src={`${
                                  vehicle.carImage
                                    ? vehicle.carImage
                                    : "/images/truckPlaceholder.png"
                                }`}
                                alt="Avatar Tailwind CSS Component"
                              />
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-100 text-sm opacity-50">
                              {vehicle.registration}
                            </div>
                            <div className="text-gray-100 font-bold">
                              {vehicle.carMark}
                            </div>
                            <div className="text-gray-100 text-sm opacity-50">
                              {vehicle.carModel}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className={`text-gray-100`}>
                        {" "}
                        {`${Number(vehicle.mileage)} km`}
                      </td>
                      <td>
                        {" "}
                        <button
                          onClick={() => onPrzypisz(vehicle, "connect")}
                          disabled={
                            (vehicle.currentDriver !== null &&
                              vehicle.currentDriver !== undefined) ||
                            isLoading
                          }
                          className="p-2 rounded-md bg-green-600 disabled:opacity-50 font-bold text-white"
                        >
                          {vehicle.currentDriver
                            ? vehicle.currentDriver.username
                            : "Przypisz"}
                        </button>
                      </td>
                      <td
                        className={`${
                          index % 2 == 1 && "rounded-tr-md rounded-br-md"
                        }`}
                      >
                        {vehicle.currentDriver && (
                          <button
                            onClick={() => onPrzypisz(vehicle, "disconnect")}
                            disabled={isLoading}
                            className="p-2 rounded-md bg-red-400 disabled:opacity-50 font-bold text-white"
                          >
                            Anuluj Przypisanie
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default VehicleTableAssign;
