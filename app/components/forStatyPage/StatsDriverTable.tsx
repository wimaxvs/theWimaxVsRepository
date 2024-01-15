"use client";
import React, { useEffect, useCallback } from "react";
import useFilter from "@/app/hooks/useFilter";
import { SafeSettlement } from "@/app/types";
import Image from "next/image";

interface StatsDriverTableProps {
  settlements: Partial<SafeSettlement>[] | null;
}

const StatsDriverTable: React.FC<StatsDriverTableProps> = ({ settlements }) => {
  let { startDate, endDate } = useFilter();

  let isInDateRange = useCallback(
    (
      givenDate: string,
      startYear: number,
      startMonth: number,
      endYear: number,
      endMonth: number
    ) => {
      let settlementDate = new Date(givenDate);

      const defaultStartYear = Number.MIN_SAFE_INTEGER;
      const defaultEndYear = Number.MAX_SAFE_INTEGER;

      const defaultStartFraction = 0;
      const defaultEndFraction = 11 / 12;

      const startFraction = (startMonth - 1) / 12 || 0;
      const endFraction = (endMonth - 1) / 12 || 0;

      let startDate = startYear
        ? startYear + startFraction
        : defaultStartYear + defaultStartFraction;
      let endDate = endYear
        ? endYear + endFraction
        : defaultEndYear + defaultEndFraction;

      let settlementNumber =
        settlementDate.getFullYear() + settlementDate.getMonth() / 12;

      let isAfterStartDate = settlementNumber >= startDate;
      let isBeforeEndDate = settlementNumber <= endDate;

      return isAfterStartDate && isBeforeEndDate;
    },
    []
  );

  let calculateDriverStatsWithDateRange = useCallback(
    (
      settlements: Partial<SafeSettlement>[],
      startYear: number | undefined,
      startMonth: number | undefined,
      endYear: number | undefined,
      endMonth: number | undefined
    ) => {
      const driverStats: {
        [key: string]: {
          avgFuelConsumption: number | undefined;
          actualName: string | undefined;
          image: string | null | undefined;
          count: number;
          totalFuelUsed: number;
          totalDistanceCovered: number;
        };
      } = {};

      settlements.forEach((settlement) => {
        const {
          driver,
          fuelUsed,
          distanceCoveredSettlement: distanceCovered,
          updatedAt: date,
        } = settlement;

        // Check if settlement is within the specified date range

        const isWithinDateRange = isInDateRange(
          date as string,
          startYear as number,
          startMonth as number,
          endYear as number,
          endMonth as number
        );

        if (isWithinDateRange) {
          if (!driverStats[driver?.username as string]) {
            driverStats[driver?.username as string] = {
              avgFuelConsumption: driver?.avgFuelConsumption ? driver?.avgFuelConsumption : 0,
              actualName: driver?.name ? driver.name : undefined,
              image: driver?.image,
              count: 1,
              totalFuelUsed: fuelUsed || 0,
              totalDistanceCovered: distanceCovered || 0,
            };
          } else {
            driverStats[driver?.username as string].count++;
            driverStats[driver?.username as string].totalFuelUsed +=
              fuelUsed || 0;
            driverStats[driver?.username as string].totalDistanceCovered +=
              distanceCovered || 0;
          }
        }
      });

      const drivers = Object.keys(driverStats).map((driver) => {
        const averageFuelPer100Kms =
          (driverStats[driver].totalFuelUsed /
            driverStats[driver].totalDistanceCovered) *
            100 || 0;

        return {
          avgFuelConsumption: driverStats[driver].avgFuelConsumption,
          username: driver,
          image: driverStats[driver].image,
          actualName: driverStats[driver].actualName,
          settlementsCount: driverStats[driver].count,
          averageFuelPer100Kms: averageFuelPer100Kms.toFixed(2), // Rounded to 2 decimal places
          totalDistanceCovered: driverStats[driver].totalDistanceCovered,
        };
      });

      return drivers;
    },
    [isInDateRange]
  );

  useEffect(() => {}, [
    startDate,
    endDate,
    calculateDriverStatsWithDateRange,
    settlements,
  ]);

  return (
    <div className="max-w-[11/12] overflow-y-auto overflow-x-auto pb-3">
      <table className="table rounded-md max-h-[100px] h-[100px] overflow-y-scroll">
        <thead>
          <tr>
            <th className={`text-gray-100`}></th>
            <th className={`text-gray-100`}>Nick</th>
            <th className={`text-gray-100`}>Przejechane kilometry</th>
            <th className={`text-gray-100`}>Dostawy zrealizowane</th>
            <th className={`text-gray-100`}>Średnie zużycie paliwa</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {settlements &&
            calculateDriverStatsWithDateRange(
              settlements as Partial<SafeSettlement>[],
              Number((startDate as string)?.split("-")[0]),
              Number((startDate as string)?.split("-")[1]),
              Number((endDate as string)?.split("-")[0]),
              Number((endDate as string)?.split("-")[1])
            )
              .sort((a, b) => b.totalDistanceCovered - a.totalDistanceCovered)
              .map((driver, index) => {
                return (
                  <tr
                    key={index}
                    className={`border-none ${"even:bg-gray-800"}`}
                  >
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
                            {driver.actualName
                              ? driver.actualName
                              : "Imię zastrzeżone"}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className={`text-gray-100`}>{`${
                      driver.totalDistanceCovered || 0
                    } `}</td>
                    <td className={`text-gray-100`}>{`${
                      driver.settlementsCount || 0
                    } `}</td>
                    <td className={`text-gray-100`}>
                      {driver.avgFuelConsumption || 0}
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
};

export default StatsDriverTable;
