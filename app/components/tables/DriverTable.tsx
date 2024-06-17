"use client";
import { SafeDriver } from "@/app/types";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface DriverTableProps {
  initialDrivers: Partial<SafeDriver>[];
}

const DriverTable: React.FC<DriverTableProps> = ({ initialDrivers }) => {
  const [drivers, setDrivers] = useState<Partial<SafeDriver>[]>(initialDrivers);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/drivers");
        const data: Partial<SafeDriver>[] = await res.json();
        setDrivers(data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []); // Removed the dependency on drivers

  return (
    <div className="kierowcyPage w-full min-h-screen flex flex-row justify-center py-10 bg-[url('/images/bkg_7.webp')] bg-no-repeat bg-cover bg-left-bottom">
      <section className="formSection rounded-md bg-gradient-to-br from-gray-800 to-gray-950 w-11/12 md:w-4/5 lg:w-2/3 md:min-h-5/6 md:h-5/6 md:max-h-[600px] p-2 md:p-10 flex flex-col gap-3 border border-primary">
        <h2 className="text-m md:text-xl lg:text-4xl font-bold text-white">
          {`Gdyby Europa była płótnem...`}
        </h2>
        <p className="text-sm md:text-md lg:text-xl font-semibold mb-3 text-gray-500">
          Ci ludzie byliby wcieleniami <b>Da Vinci</b>...
        </p>
        <div className="max-w-[11/12] overflow-x-auto pb-3">
          <table className="table rounded-md ">
            <thead>
              <tr>
                <th className="text-gray-100"></th>
                <th className="text-gray-100">Nick</th>
                <th className="text-gray-100">Pojazd</th>
                <th className="text-gray-100">Całkowita liczba kilometrów</th>
                <th className="text-gray-100">Stanowisko</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {!loading &&
                drivers?.map((driver, index) => (
                  <tr
                    key={index}
                    className={`border-none ${
                      index % 2 === 1 ? "even:bg-gray-800" : ""
                    }`}
                  >
                    <th
                      className={`${
                        index % 2 === 1
                          ? "rounded-tl-md rounded-bl-md text-gray-100"
                          : ""
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
                              src={
                                driver.image
                                  ? driver.image
                                  : "/images/placeholder.jpg"
                              }
                              alt="Avatar"
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
                    <td className="font-semibold text-gray-100 flex flex-col gap-1">
                      {driver.vehicle?.[0]
                        ? driver.vehicle[0].carMark
                        : "Brak pojazdu"}
                      <br />
                      {driver.vehicle?.[0] && (
                        <span className="flex flex-row items-center gap-1">
                          <span className="rounded-xl border border-solid border-[#1fb2a6] text-[#1fb2a6] text-xs p-0.5 px-1">
                            {driver.vehicle[0].registration ||
                              "Tablicę rejestracyjną"}
                          </span>
                        </span>
                      )}
                    </td>
                    <td className="text-gray-100">{driver.totKms || 0}</td>
                    <td className="text-gray-100">
                      {driver.role || "Kierowca"}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default DriverTable;
