"use client";
import { SafeDriver } from "@/app/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useDriver from "@/app/hooks/useCurrentDriver";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";

interface DriverTableProps {
  initialDrivers: Partial<SafeDriver>[];
}

const DriverTable: React.FC<DriverTableProps> = ({ initialDrivers }) => {
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let {
    currentDriver,
    setAllDrivers,
    setDriver,
    allDrivers: drivers,
  } = useDriver();

  useEffect(() => {
    //if the user is deleted from the db, this still won't run because drivers.length !== 0. Because the ui is rendering drivers, the only way to get it to work as expected is by making the value of drivers change even though useEffect isn't running. UseEffect in this instance is being used to instantiate the value of an empty drivers array.
    if (initialDrivers && drivers.length == 0) {
      setAllDrivers(initialDrivers);
    }
  }, [initialDrivers, drivers, setAllDrivers]);

  let onUsun = (driverId: string) => {
    setIsLoading(true);
    let deets = {
      driverId,
    };
    let toDb = JSON.stringify(deets);

    axios
      .post("/api/drupdate/delete", toDb)
      .then(
        (
          res: AxiosResponse<{
            message: string;
            code?: string | number;
            allTheDrivers?: Partial<SafeDriver>[];
            affectedDriver: Partial<SafeDriver> | null;
          }>
        ) => {
          if (res.data.code === 500 || res.data.code === 400) {
            throw new Error(res.data.message);
          }
          console.log(res.data.allTheDrivers);
          setAllDrivers(res.data.allTheDrivers as Partial<SafeDriver>[]);
          if (res.data.affectedDriver) {
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
    <>
      <div
        className={`kierowcyPage w-full min-h-screen flex flex-row justify-center py-10 bg-[url('/images/wiremeshBlue.png')] bg-no-repeat bg-cover bg-center`}
      >
        {/* bg-gradient-to-br from-gray-500 to-gray-200 */}
        <section
          className={`formSection rounded-md bg-gradient-to-br from-gray-800 to-gray-950 w-11/12 md:w-4/5 lg:w-2/3 md:min-h-5/6 md:h-5/6 md:max-h-[600px] p-2 md:p-10 flex flex-col gap-3 border border-primary`}
        >
          {/* Table Title */}

          <h2
            className={`text-m md:text-xl lg:text-4xl font-bold text-white`}
          >{`Gdyby Europa była płótnem...`}</h2>
          <p
            className={`text-sm md:text-md lg:text-xl font-semibold mb-3 text-gray-500`}
          >
            Ci ludzie byliby wcieleniami <b>Da Vinci</b>...
          </p>
          <div className="max-w-[11/12] overflow-x-auto pb-3">
            <table className="table table-zebra rounded-md">
              <thead>
                <tr>
                  <th className={`text-gray-100`}></th>
                  <th className={`text-gray-100`}>Nick</th>
                  <th className={`text-gray-100`}>Pojazd</th>
                  <th className={`text-gray-100`}>
                    Całkowita liczba kilometrów
                  </th>
                  <th className={`text-gray-100`}>Stanowisko</th>
                  {currentDriver?.role !== "KIEROWCA" &&
                    currentDriver?.role !== "PROBNY" && <th>Usuń Kierowca</th>}
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {drivers &&
                  drivers.map((driver, index) => {
                    return (
                      <tr key={index} className={`border-none`}>
                        <th
                          className={`${
                            index % 2 == 1 &&
                            "rounded-tl-md rounded-bl-md text-gray-100"
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
                              <div className="text-sm text-gray-100 opacity-50">
                                {driver.name ? driver.name : "Imię zastrzeżone"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td
                          className={`font-semibold text-gray-100 flex flex-col gap-1`}
                        >
                          {driver.vehicle?.[0]
                            ? driver.vehicle?.[0]?.carMark
                            : "Brak pojazdu"}
                          <br />
                          {driver?.vehicle?.[0] && <span className={`flex flex-row items-center gap-1`}>
                            {/* <span className="rounded-xl bg-[#1fb2a6] text-white text-xs p-1">
                              {`${driver.currentLocation?.city || "Miasto"} `}
                            </span> */}
                            <span className="rounded-xl border border-solid border-[#1fb2a6] text-[#1fb2a6] text-xs p-0.5 px-1">
                              {`${
                                driver?.vehicle?.[0]?.registration ||
                                "Tablicę rejestracyjną"
                              } `}
                            </span>
                          </span>}
                        </td>
                        <td className={`text-gray-100`}>{`${
                          driver.totKms || 0
                        } `}</td>
                        <td className={`text-gray-100`}>
                          {driver.role || "Kierowca"}
                        </td>
                        {currentDriver?.role !== "KIEROWCA" &&
                          currentDriver?.role !== "PROBNY" && (
                            <td
                              className={`${
                                index % 2 == 1 && "rounded-tr-md rounded-br-md"
                              }`}
                            >
                              <button
                                disabled={isLoading}
                                onClick={() => onUsun(driver?.id!)}
                                className="bg-red-500 p-2 text-white disabled:opacity-50 font-extrabold rounded-md"
                              >
                                Usuń
                              </button>
                            </td>
                          )}
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </>
  );
};

export default DriverTable;
