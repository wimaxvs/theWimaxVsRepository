"use client";
import { SafeDriver } from "@/app/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface DriverTableProps {
  allTheDrivers: Partial<SafeDriver>[];
}

const DriverTable: React.FC<DriverTableProps> = ({ allTheDrivers }) => {
  let [stateDrivers, setStateDrivers] =
    useState<Partial<SafeDriver>[]>(allTheDrivers);
  useEffect(() => setStateDrivers(allTheDrivers), [allTheDrivers]);
  
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
          <p className={`text-sm md:text-md lg:text-xl font-semibold mb-3`}>
            Ci ludzie byliby wcieleniami <b>Da Vinci</b>...
          </p>
          <div className="max-w-[11/12] overflow-x-auto pb-3">
            <table className="table table-zebra rounded-md">
              <thead>
                <tr>
                  <th></th>
                  <th>Przezwisko</th>
                  <th>Aktualna lokalizacja</th>
                  <th>Całkowita liczba kilometrów</th>
                  <th>Zyski</th>
                  <th>Stanowisko</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {stateDrivers &&
                  stateDrivers.map((driver, index) => {
                    return (
                      <>
                        <tr key={index} className={`border-none`}>
                          <th
                            className={`${
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
                          <td className={`font-semibold flex flex-col gap-1`}>
                            {driver.currentLocation?.country
                              ? driver.currentLocation?.country
                              : "Kraj"}
                            <br />
                            <span
                              className={`flex flex-row items-center gap-1`}
                            >
                              <span className="font-normal badge badge-accent badge-sm">
                                {`${driver.currentLocation?.city || "Miasto"} `}
                              </span>
                              <span className="rounded-xl border border-solid border-[#1fb2a6] text-[#1fb2a6] text-xs p-0.5">
                                {`${
                                  driver.currentLocation?.zipCode ||
                                  "kod pocztowy"
                                } `}
                              </span>
                            </span>
                          </td>
                          <td>{`${driver.totKms || 0} `}</td>
                          <td>{`${driver.balance || 0} `}</td>
                          <td
                            className={`${
                              index % 2 == 1 && "rounded-tr-md rounded-br-md"
                            }`}
                          >
                            {driver.seniority || "Kierowca"}
                          </td>
                        </tr>
                      </>
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
