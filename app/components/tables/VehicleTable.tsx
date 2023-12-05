import React, { useEffect, useState } from "react";
import useAllVehicles from "@/app/hooks/useAllVehicles";
import Image from "next/image";
import { SafeDriver, SafeVehicle } from "@/app/types";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import { Vehicle } from "@prisma/client";
import useDriver from "@/app/hooks/useCurrentDriver";

interface VehicleTableProps {
  allTheVehicles: SafeVehicle[] | null;
}

const VehicleTable: React.FC<VehicleTableProps> = ({ allTheVehicles }) => {
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let { theVehicles, setTheVehicles } = useAllVehicles();
  let { setDriver, currentDriver, setCurrentDriver } = useDriver();

  useEffect(() => {
    if (theVehicles?.length < 1 && allTheVehicles) {
      setTheVehicles(allTheVehicles);
    }
  }, [allTheVehicles, setTheVehicles, theVehicles]);

  let onUsun = (driverId: string, vehicleId: string) => {
    setIsLoading(true);
    let deets = {
      driverId,
      vehicleId,
    };
    let toDb = JSON.stringify(deets);

    axios
      .post("/api/vehicles/delete", toDb)
      .then(
        (
          res: AxiosResponse<{
            message: string;
            code?: string | number;
            allTheVehicles?: Partial<SafeVehicle>[];
            affectedDriver: Partial<SafeDriver> | null;
          }>
        ) => {
          console.log(res.data.allTheVehicles);
          setTheVehicles(res.data.allTheVehicles as Partial<SafeVehicle>[]);
          if (res.data.affectedDriver) {
            if (res.data.affectedDriver.id == currentDriver?.id) {
              setCurrentDriver(res.data.affectedDriver);
            }
            setDriver(res.data.affectedDriver);
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
  };

  return (
    <div
      className={`md:max-w-full md:min-w-[45%] w-full flex flex-col gap-2 items-start p-4 rounded-md bg-gray-950`}
    >
      <div className={`w-full p-2 pl-0 overflow-y-auto`}>
        <h3 className="text-white font-extrabold md:text-xl text-sm mb-1">
          Usuń pojazd
        </h3>
        <p className="text-gray-500 font-semibold md:text-sm text-xs mb-3">
          {`Kliknij przycisk Usuń, aby usunąć pojazd z rejestru`}
        </p>
        <div className="max-w-[11/12] overflow-x-auto pb-3">
          <table className="table table-zebra rounded-md">
            <thead>
              <tr>
                <th></th>
                <th className={`text-gray-100`}>Szczegóły pojazdu</th>
                <th className={`text-gray-100`}>Kierowca</th>
                <th className={`text-gray-100`}>Usuñ</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {theVehicles &&
                theVehicles.map((vehicle, index) => {
                  return (
                    <tr key={index} className={`border-none hover`}>
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
                        {vehicle.currentDriver?.username || "Kierowca"}
                      </td>
                      <td
                        className={`${
                          index % 2 == 1 && "rounded-tr-md rounded-br-md"
                        }`}
                      >
                        <button
                          onClick={() =>
                            onUsun(
                              vehicle?.currentDriver?.id as string,
                              vehicle?.id as string
                            )
                          }
                          disabled={isLoading}
                          className="p-2 rounded-md bg-red-400 disabled:bg-red-300 font-bold text-white"
                        >
                          Usuń
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
  );
};

export default VehicleTable;
