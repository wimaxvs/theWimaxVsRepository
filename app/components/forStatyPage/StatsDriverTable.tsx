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

  function firmBalanceAmount(amount: number) {
    // Split the number into integer and decimal parts
    const parts = amount.toString().split(".");
    let integerPart = parts[0];
    const decimalPart = parts[1] ? "." + parts[1] : "";

    // Add commas to the integer part
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    // Combine the integer and decimal parts
    return integerPart + decimalPart;
  }

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
          ferries: number;
          refuelled: number;
          highways: number;
          expenses: number;
        };
      } = {};
      let totalDistanceCoveredEveryone = 0;
      let totalFuelExpenditureEveryone = 0;
      let totalExpenditureEveryone = 0;
      let totalRefillsEveryone = 0;

      let filteredSettlements = settlements.filter(
        (s) => s.approvalStatus === true
      );

      filteredSettlements.forEach((settlement) => {
        const {
          driver,
          fuelUsed,
          highwaysBeta: highways,
          ferries,
          expensesSpent: expenses,
          litersRefueled: refilled,
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
              avgFuelConsumption: driver?.avgFuelConsumption
                ? driver?.avgFuelConsumption
                : 0,
              actualName: driver?.name ? driver.name : undefined,
              image: driver?.image,
              count: 1,
              totalFuelUsed: fuelUsed || 0,
              totalDistanceCovered: distanceCovered || 0,
              ferries: ferries || 0,
              highways: highways || 0,
              expenses: expenses || 0,
              refuelled: refilled || 0,
            };
          } else {
            driverStats[driver?.username as string].count++;
            driverStats[driver?.username as string].totalFuelUsed +=
              fuelUsed || 0;
            driverStats[driver?.username as string].ferries += ferries || 0;
            driverStats[driver?.username as string].highways += highways || 0;
            driverStats[driver?.username as string].expenses += expenses || 0;
            driverStats[driver?.username as string].refuelled += refilled || 0;
            driverStats[driver?.username as string].totalDistanceCovered +=
              distanceCovered || 0;
          }
          totalDistanceCoveredEveryone += distanceCovered || 0;
          totalFuelExpenditureEveryone += fuelUsed || 0;
          totalExpenditureEveryone +=
            (ferries || 0) + (expenses || 0) + (highways || 0);
          totalRefillsEveryone += refilled || 0;
        }
      });

      const drivers = Object.keys(driverStats).map((driver) => {
        const averageFuelPer100Kms =
          (driverStats[driver].totalFuelUsed /
            driverStats[driver].totalDistanceCovered) *
            100 || 0;

        return {
          ...driverStats[driver],
          username: driver,
          settlementsCount: driverStats[driver].count,
          averageFuelPer100Kms: averageFuelPer100Kms.toFixed(2), // Rounded to 2 decimal places
          refuelled: driverStats[driver].refuelled.toFixed(2), // Rounded to 2 decimal places
        };
      });

      return {
        drivers,
        dce: totalDistanceCoveredEveryone,
        fee: totalFuelExpenditureEveryone,
        tee: totalExpenditureEveryone,
        tre: totalRefillsEveryone,
      };
    },
    [isInDateRange]
  );

  let [dataToMap, setDataToMap] = React.useState(
    calculateDriverStatsWithDateRange(
      settlements as Partial<SafeSettlement>[],
      Number((startDate as string)?.split("-")[0]),
      Number((startDate as string)?.split("-")[1]),
      Number((endDate as string)?.split("-")[0]),
      Number((endDate as string)?.split("-")[1])
    )
  );

  useEffect(() => {
    setDataToMap((prev) => ({
      ...prev,
      ...calculateDriverStatsWithDateRange(
        settlements as Partial<SafeSettlement>[],
        Number((startDate as string)?.split("-")[0]),
        Number((startDate as string)?.split("-")[1]),
        Number((endDate as string)?.split("-")[0]),
        Number((endDate as string)?.split("-")[1])
      ),
    }));
  }, [startDate, endDate, calculateDriverStatsWithDateRange, settlements]);

  return (
    <div className="max-w-[11/12] overflow-y-auto overflow-x-auto pb-3">
      <table className="table rounded-md max-h-[100px] h-[100px] overflow-y-scroll">
        <thead>
          <tr>
            <th className={`text-gray-100`}></th>
            <th className={`text-gray-100`}>Nick</th>
            <th className={`text-gray-100`}>Przejechane kilometry</th>
            <th className={`text-gray-100`}>Dostawy zrealizowane</th>
            <th colSpan={2} className={`text-gray-100`}>
              Średnie zużycie paliwa
            </th>
            <th colSpan={4} className={`text-gray-100`}>
              Wydatków
            </th>
            <th></th>
          </tr>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th className={`text-gray-600`}>W wybranym okresie</th>
            <th className={`text-gray-600`}>Z ostatniej dostawy</th>

            <th className={`text-gray-600`}>Autostrady</th>
            <th className={`text-gray-600`}>Promy</th>
            <th className={`text-gray-600`}>Wydatki</th>
            <th className={`text-gray-600`}>Zatankowane litry</th>
          </tr>
        </thead>
        <tbody>
          {settlements &&
            dataToMap.drivers
              .sort(
                (a, b) =>
                  Number(a.averageFuelPer100Kms) -
                  Number(b.averageFuelPer100Kms)
              )
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
                    <td className={`text-gray-100`}>{`${firmBalanceAmount(
                      driver.totalDistanceCovered || 0
                    )} km `}</td>
                    <td className={`text-gray-100`}>{`${firmBalanceAmount(
                      driver.settlementsCount || 0
                    )} `}</td>
                    <td className={`text-gray-100`}>
                      {`${firmBalanceAmount(
                        Number(driver.averageFuelPer100Kms) || 0
                      )} l/km`}
                    </td>
                    <td className={`text-gray-100`}>
                      {`${firmBalanceAmount(
                        driver.avgFuelConsumption || 0
                      )} l/km`}
                    </td>
                    <td className={`text-gray-100`}>
                      {`${firmBalanceAmount(driver.highways || 0)} eur`}
                    </td>
                    <td className={`text-gray-100`}>
                      {`${firmBalanceAmount(driver.ferries || 0)} eur`}
                    </td>
                    <td className={`text-gray-100`}>
                      {`${firmBalanceAmount(driver.expenses || 0)} eur`}
                    </td>
                    <td className={`text-gray-100`}>
                      {`${firmBalanceAmount(Number(driver.refuelled) || 0)} L`}
                    </td>
                  </tr>
                );
              })}
          {settlements && (
            <tr>
              <th className={`${"rounded-tl-md rounded-bl-md text-gray-100"}`}>
                {``}
              </th>
              <td
                className={`font-light text-gray-500`}
              >{`Całkowita liczba przebytych kilometrów:`}</td>
              <td className={`text-gray-100 font-extrabold`}>
                {firmBalanceAmount(Number(dataToMap.dce))} km
              </td>
              <td
                className={`font-light text-gray-500`}
              >{`Średnie zużycie paliwa na 100 km (wszyscy):`}</td>
              <td className={`text-gray-100 font-extrabold`}>
                {firmBalanceAmount(
                  Number(((dataToMap.fee / dataToMap.dce) * 100).toFixed(2))
                )}{" "}
                l/km
              </td>
              <td className={`font-light text-gray-500`}>{`Całkowite wydatki (wszyscy):`}</td>
              <td className={`text-gray-100 font-extrabold`}>
                -{firmBalanceAmount(Number(dataToMap.tee.toFixed(2)))} Eur
              </td>
              <td></td>
              <td className={`font-light text-gray-500`}>{`Całkowita ilość zatankowanego paliwa (wszyscy):`}</td>
              <td className={`text-gray-100 font-extrabold`}>
                {firmBalanceAmount(Number(dataToMap.tre.toFixed(2)))} L
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StatsDriverTable;
