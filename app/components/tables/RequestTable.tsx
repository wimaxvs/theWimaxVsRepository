"use client";
import { SafeDriver, SafeJoinRequest } from "@/app/types";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";

interface RequestTableProps {
  allTheDrivers: Partial<SafeDriver>[];
  firmId: string;
}

const RequestTable: React.FC<RequestTableProps> = ({
  allTheDrivers,
  firmId,
}) => {
  let [stateDrivers, setStateDrivers] = useState<
    Partial<SafeDriver>[] | undefined
  >(undefined);

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
    let eligibleDrivers = returnEligibleDrivers(allTheDrivers);
    console.log(eligibleDrivers);
    setStateDrivers(eligibleDrivers);
  }, [allTheDrivers, firmId, returnEligibleDrivers]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  let iconOptions: { size: number; color: string } = {
    size: 18,
    color: "rgb(166, 173, 186)",
  };

  let onZatrudnij = (requestId: string) => {
    let data = {
      requestId,
    };
    console.log(data);
    let deets = JSON.stringify(data);

    axios
      .post("/api/drupdate/zatrudnij", deets)
      .then(
        (
          res: AxiosResponse<{
            message: string;
            code?: string | number;
            theNewDrivers: Partial<SafeDriver>[];
          }>
        ) => {
          console.log(res.data.theNewDrivers);
          if (res.data.code === 500 || res.data.code === 400)
            throw new Error(res.data.message);
          toast.success(
            <>
              <div className="p-4 text-bold text-green-800 flex flex-col items-center bg-green-100 rounded-lg my-4">
                {`${res.data.message}`}
              </div>
            </>
          );
          return setStateDrivers(res.data.theNewDrivers);
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
        className={`formSection rounded-md bg-gradient-to-br from-gray-800 to-gray-950 w-full f-full p-2 md:p-10 flex flex-col`}
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
        <div className="max-w-[11/12] overflow-x-auto pb-3">
          <table className="table table-zebra rounded-md">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Przezwisko</th>
                <th>Aktualna lokalizacja</th>
                <th>Całkowita liczba kilometrów</th>
                <th>Zatrudnij</th>
                <th>Anuluj</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* the rows */}
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
                              <div className="font-bold">{driver.username}</div>
                              <div className="text-sm opacity-50">
                                {driver.name ? driver.name : "Imię zastrzeżone"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className={`font-semibold flex flex-col gap-1`}>
                          {driver.currentLocation?.country
                            ? driver.currentLocation?.country
                            : "Kraj"}
                          <br />
                          <span className={`flex flex-row items-center gap-1`}>
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
                        <td>
                          <button
                            onClick={()=>onZatrudnij(driver?.joinRequest?.id as string)}
                            disabled={isLoading}
                            className="p-2 rounded-md bg-green-400 disabled:bg-green-300 font-bold text-white"
                          >
                            Zatrudnij
                          </button>
                        </td>
                        <td className={`${index % 2 == 1 && "rounded-r-md"}`}>
                          <button
                            onClick={() => {
                              console.log(driver.id);
                            }}
                            disabled={isLoading}
                            className="p-2 rounded-md bg-red-400 disabled:bg-red-300 font-bold text-white"
                          >
                            Anuluj
                          </button>
                        </td>
                      </tr>
                    </>
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
