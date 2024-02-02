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

  let gimmeEligibleDrivers = useCallback(
    (drivers: Partial<SafeDriver>[]): Partial<SafeDriver>[] => {
      return drivers?.filter((driver) => driver?.currentFirm?.id === firmId);
    },
    [firmId]
  );

  useEffect(() => {
    //if the user is deleted from the db, this still won't run because drivers.length !== 0. 
    //Because the ui is rendering drivers, the only way to get it to work as expected is by 
    //making the value of drivers change even though useEffect isn't running. 
    //UseEffect in this instance is being used to instantiate the value of an empty drivers array.
    if (allTheDrivers && drivers.length == 0) {
      setAllDrivers(allTheDrivers);
    }
  }, [allTheDrivers, drivers, setAllDrivers]);

  const onButtonClick = (driverId: string, optionChosen: string) => {
    let role = optionChosen === "Próbny" ? "Probny" : optionChosen;
    setIsLoading(true);
    let data = {
      driverId,
      role: role.toUpperCase(),
    };

    let deets = JSON.stringify(data);
    axios
      .post(
        `/api/drupdate/${optionChosen == "Zwolnij" ? "delete" : "awansuj"}`,
        deets
      )
      .then(
        (
          res: AxiosResponse<{
            message: string;
            code?: string | number;
            allTheDrivers?: Partial<SafeDriver>[];
          }>
        ) => {
          if (res.data.code === 500 || res.data.code === 400) {
            throw new Error(res.data.message);
          }
          if (optionChosen !== "Zwolnij") {
            console.log("hit");
            setDriver(
              res.data.allTheDrivers?.find(
                (driver) => driver.id == driverId
              ) as Partial<SafeDriver>
            );
          } else {
            setAllDrivers(res.data.allTheDrivers as Partial<SafeDriver>[]);
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
                  <th className={`text-gray-100`}></th>
                  <th className={`text-gray-100`}>Nick</th>
                  <th className={`text-gray-100`}>Aktualna stanowisko</th>
                  <th className={`text-gray-100`} colSpan={4}>
                    Nowe stanowisko
                  </th>
                  <th className={`text-gray-100`}>Zwolnij</th>
                </tr>
              </thead>
              <tbody>
                {/* the rows */}
                {drivers &&
                  gimmeEligibleDrivers(drivers).map((driver, index) => {
                    return (
                      <tr
                        key={index}
                        className={`border-none`}
                      >
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
                              <div className="font-bold text-gray-100">
                                {driver.username}
                              </div>
                              <div className="text-sm text-gray-100 opacity-50">
                                {driver.name ? driver.name : "Imię zastrzeżone"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>
                          <p className={`text-gray-100`}>
                            {driver?.role === "PROBNY"
                              ? "PRÓBNY"
                              : driver?.role}
                          </p>
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
                            label: "Próbny",
                            color: "from-blue-600 to-gray-900",
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
                                  button.label
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
