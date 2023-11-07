"use client";

import { SafeDriver } from "@/app/types";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import useDriver from "@/app/hooks/useCurrentDriver";

interface PromotionTableProps {
  allTheDrivers: Partial<SafeDriver>[];
  firmId: string;
}

const PromotionTable: React.FC<PromotionTableProps> = ({
  allTheDrivers,
  firmId,
}) => {
  let setDriver = useDriver((state) => state.setDriver);
  let drivers = useDriver((state) => state.allDrivers);
  let setAllDrivers = useDriver((state) => state.setAllDrivers);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  let returnEligibleDrivers = useCallback(
    (drivers: Partial<SafeDriver>[]): Partial<SafeDriver>[] => {
      return drivers?.filter(
        (driver) =>
          driver?.joinRequest &&
          driver?.currentFirm?.id === firmId &&
          driver?.joinRequest?.status
      );
    },
    [firmId]
  );

  useEffect(() => {
    if (allTheDrivers && drivers.length == 0) {
      setAllDrivers(returnEligibleDrivers(allTheDrivers));
    }
  });

  const onButtonClick = (driverId: string, optionChosen: string) => {
    setIsLoading(true);
    let data = {
      driverId,
      role: optionChosen.toUpperCase(),
    };

    let deets = JSON.stringify(data);
    axios
      .post("/api/drupdate/awansuj", deets)
      .then(
        (
          res: AxiosResponse<{
            message: string;
            code?: string | number;
            allTheDrivers: Partial<SafeDriver>[];
          }>
        ) => {
          if (res.data.code === 500 || res.data.code === 400)
            throw new Error(res.data.message);
          toast.success(
            <>
              <div className="p-4 text-bold text-green-800 flex flex-col items-center bg-green-100 rounded-lg my-4">
                {`${res.data.message}`}
              </div>
            </>
          );
          return setDriver(
            res.data.allTheDrivers.find(
              (driver) => driver.id == driverId
            ) as Partial<SafeDriver>
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
          return toast.error(error);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    setIsLoading(false);
  };

  return (
    <>
      <>
        <section
          className={`formSection rounded-md bg-gradient-to-br from-gray-800 to-gray-950 w-full f-full p-2 md:p-10 flex flex-col max-h-full`}
        >
          {/* Table Title */}
          <h2
            className={`text-m md:text-xl lg:text-2xl font-extrabold text-white`}
          >
            Awansuj lub zwalniaj pracownika
          </h2>
          <p
            className={`text-sm md:text-md lg:text-xl font-semibold mb-3 text-white`}
          >
            Jaki im został dany los?
          </p>
          <p
            className={`text-xs md:text-sm lg:text-md font-semibold mb-3 text-gray-500`}
          >
            {"Naciśnij jeden z przycisków, aby dokonać odpowiedniej zmiany"}
          </p>
          <div className="max-w-[11/12] overflow-x-auto pb-3">
            <table className="table rounded-md">
              {/* head */}
              <thead>
                <tr>
                  <th></th>
                  <th>Nick</th>
                  <th>Aktualna stanowisko</th>
                  <th colSpan={3}>Nowe stanowisko</th>
                  <th>Zwolnij</th>
                </tr>
              </thead>
              <tbody>
                {/* the rows */}
                {drivers &&
                  drivers.map((driver, index) => {
                    return (
                      <>
                        <tr key={index} className={`border-none hover`}>
                          <td className={`rounded-l-md`}>{index + 1}</td>
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
                                <div className="font-bold">
                                  {driver.username}
                                </div>
                                <div className="text-sm opacity-50">
                                  {driver.name
                                    ? driver.name
                                    : "Imię zastrzeżone"}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>
                            {driver?.role == "DRIVER"
                              ? "Kierowca".toUpperCase()
                              : driver.role == "SPEDYTOR" ||
                                driver?.role === "ZARZAD"
                              ? driver?.role
                              : "Kierowca".toUpperCase()}
                          </td>

                          {[
                            {
                              label: "Zarzad",
                              color: "from-amber-500 to-yellow-200",
                              textColor: "text-white",
                            },
                            {
                              label: "Spedytor",
                              color: "from-gray-500 to-blue-100",
                              textColor: "text-blue-950",
                            },
                            {
                              label: "Kierowca",
                              color: "from-yellow-600 to-amber-900",
                              textColor: "text-white",
                            },
                            {
                              label: "Zwolnij",
                              color: "from-red-400 to-red-600",
                              textColor: "text-white",
                            },
                          ].map((button, index) => (
                            <td
                              className={`${index == 3 ? "rounded-r-md" : ""}`}
                              key={index}
                            >
                              <button
                                onClick={() =>
                                  onButtonClick(
                                    driver?.id as string,
                                    button.label == "Kierowca"
                                      ? "Driver"
                                      : button.label
                                  )
                                }
                                disabled={isLoading}
                                className={`p-2 rounded-md bg-gradient-to-br disabled:opacity-50 font-bold ${button.color} ${button.textColor}`}
                              >
                                {button.label}
                              </button>
                            </td>
                          ))}
                        </tr>
                      </>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>
      </>
    </>
  );
};

export default PromotionTable;
