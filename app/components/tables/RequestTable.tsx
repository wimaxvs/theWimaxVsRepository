"use client";
import { SafeDriver } from "@/app/types";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import useDriver from "@/app/hooks/useCurrentDriver";

interface RequestTableProps {
  allTheDrivers: Partial<SafeDriver>[];
  firmId: string;
}

const RequestTable: React.FC<RequestTableProps> = ({
  allTheDrivers,
  firmId,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let setDriver = useDriver((state) => state.setDriver);
  let drivers = useDriver((state) => state.allDrivers);
  let setAllDrivers = useDriver((state) => state.setAllDrivers);

  let returnEligibleDrivers = useCallback(
    (drivers: Partial<SafeDriver>[]): Partial<SafeDriver>[] => {
      return drivers?.filter(
        (driver) =>
          driver?.joinRequest &&
          driver?.joinRequest?.firmId === firmId &&
          !driver?.joinRequest?.status
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

  let sDLength = returnEligibleDrivers(drivers)?.length;

  let onZatrudnij = (requestId: string, driverId: string, option?: boolean) => {
    let data = {
      requestId,
      option,
    };
    let deets = JSON.stringify(data);

    axios
      .post("/api/drupdate/zatrudnij", deets)
      .then(
        (
          res: AxiosResponse<{
            message: string;
            code?: string | number;
            allTheDrivers?: Partial<SafeDriver>[];
          }>
        ) => {
          if (res.data.code === 500 || res.data.code === 400)
            throw new Error(res.data.message);
          if (option === true || option === undefined) {
            setAllDrivers(res.data.allTheDrivers as Partial<SafeDriver>[]);
          }else{
            setDriver(
              res.data.allTheDrivers?.find(
                (driver) => driver.id == driverId
              ) as Partial<SafeDriver>
            );
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
      <section
        className={`tableSection rounded-md bg-gradient-to-br from-gray-800 to-gray-950 w-full h-full p-2 md:p-10 flex flex-col overflow-y-scroll`}
      >
        {/* Table Title */}
        <h2
          className={`text-m md:text-xl lg:text-2xl font-extrabold text-white`}
        >
          Kliknij <i className={`text-green-600`}> „Zatrudnij”</i>, aby
          zatrudnić kierowcę lub...
        </h2>
        <p
          className={`text-sm md:text-md lg:text-xl font-semibold mb-3 text-white`}
        >
          <i className={`text-red-600 font-extrabold`}>„Anuluj”</i>, aby
          odrzucić wniosek
        </p>
        <p
          className={`text-xs md:text-sm lg:text-md font-semibold mb-3 text-gray-500`}
        >
          {`Obecnie 
          ${sDLength && sDLength > 1 ? "mamy" : "jest"} 
          ${sDLength ? sDLength : 0} 
          ${
            sDLength && sDLength == 1
              ? "nowa"
              : sDLength && sDLength > 1
              ? "nowe"
              : "nowych"
          } 
          ${
            sDLength && sDLength == 1
              ? "prośba"
              : sDLength && sDLength > 1
              ? "prośby"
              : "próśb"
          }             o dołączenie`}
        </p>
        <div className="max-w-[11/12] overflow-x-auto pb-3">
          <table className="table rounded-md">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Nick</th>
                <th className={`hidden lg:table-cell`}>Aktualna lokalizacja</th>
                <th className={`hidden lg:table-cell`}>
                  Całkowita liczba kilometrów
                </th>
                <th>Zatrudnij</th>
                <th>Odrzuć</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* the rows */}
              {drivers &&
                returnEligibleDrivers(drivers).map((driver, index) => {
                  return (
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
                            <div className="font-bold">{driver.username}</div>
                            <div className="text-sm opacity-50">
                              {driver.name ? driver.name : "Imię zastrzeżone"}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td
                        className={`font-semibold hidden lg:table-cell lg:flex-col lg:gap-1 grow`}
                      >
                        {driver.currentLocation?.country
                          ? driver.currentLocation?.country
                          : "Kraj"}
                        <br />
                        <span className={`flex flex-col items-start gap-2`}>
                          <span className="font-normal badge badge-accent badge-sm">
                            {`${driver.currentLocation?.city || "Miasto"} `}
                          </span>
                          <span className="rounded-xl border border-solid border-[#1fb2a6] text-[#1fb2a6] text-xs p-0.5">
                            {`${
                              driver.currentLocation?.zipCode || "kod pocztowy"
                            } `}
                          </span>
                        </span>
                      </td>
                      <td className={`hidden lg:table-cell`}>{`${
                        driver.totKms || 0
                      } `}</td>
                      <td>
                        <button
                          onClick={() =>
                            onZatrudnij(
                              driver?.joinRequest?.id as string,
                              driver?.id as string
                            )
                          }
                          disabled={isLoading}
                          className="p-2 rounded-md bg-green-400 disabled:bg-green-300 font-bold text-white"
                        >
                          Zatrudnij
                        </button>
                      </td>
                      <td className={`${index % 2 == 1 && "rounded-r-md"}`}>
                        <button
                          onClick={() =>
                            onZatrudnij(
                              driver?.joinRequest?.id as string,
                              driver?.id as string,
                              false
                            )
                          }
                          disabled={isLoading}
                          className="p-2 rounded-md bg-red-400 disabled:bg-red-300 font-bold text-white"
                        >
                          Anuluj
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default RequestTable;
