import React from "react";
import ClientOnly from "../components/ClientOnly";
import StatPad from "../components/statPad/StatPad";
import getCurrentDriver from "../actions/getCurrentDriver";
import PulpitGraph from "../components/graph/PulpitGraph";

const page = async () => {
  let currentDriver = await getCurrentDriver();
  console.log(currentDriver);

  // a propos the date object
  let theDate = new Date();
  let currentMonth = theDate.getMonth();
  let currentYear = theDate.getFullYear();

  function getMonthName(monthValue: number): string | undefined {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    if (monthValue >= 0 && monthValue < 12) {
      return months[monthValue];
    } else {
      return undefined;
    }
  }
  let currentKmMonth = currentDriver?.kilometerMonths?.find((kmm) => {
    return (
      kmm.month == currentMonth.toString() && kmm.year == currentYear.toString()
    );
  });

  const kilometersArray = Array.from({ length: 12 }, (_, index) => {
    const matchingMonth = currentDriver?.kilometerMonths.find(
      (obj) =>
        Number(obj.month) === index &&
        obj.year === new Date().getFullYear().toString()
    );
    return matchingMonth ? matchingMonth.kms : 0;
  });

  //a propos distance covered under Wimax
  let companyKms = currentDriver?.companyKilometers?.kms;

  let deetsForKmPad: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: any;
  }[] = [
    {
      title: "W tym miesiącu",
      value: currentKmMonth?.kms
        ? `${currentKmMonth.kms.toFixed(2)} km`
        : `${0} km`,
      subtitle: "Przejechane",
    },
    {
      title: "Pod firmą Wimax",
      value: companyKms ? `${companyKms.toFixed(2)} km` : `${0} km`,
      subtitle: "Przejechane",
    },
    {
      title: "Łącznie",
      value: currentDriver?.totKms
        ? `${currentDriver.totKms.toFixed(2)} km`
        : `${0} km`,
      subtitle: "Przejechane",
    },
  ];

  let deetsForOtherPad: typeof deetsForKmPad = [
    {
      title: "Wykonane dostawy",
      value: currentDriver?.deliveries ? currentDriver.deliveries : 0,
      subtitle: "Wszyscy",
    },
    {
      title: "Średnie spalanie",
      value: currentDriver?.avgFuelConsumption
        ? `${currentDriver.avgFuelConsumption.toFixed(2)} l/km`
        : `${0} l/km`,
    },
  ];

  return (
    <div className="bg-[url('/images/pulpitBkg.png')] bg-no-repeat bg-cover bg-center h-screen w-full min-h-screen">
      <span
        className={` flex flex-row gap-6 items-start justify-start flex-wrap p-6`}
      >
        <ClientOnly>
          <StatPad
            itemArray={deetsForKmPad}
            padTitle={"Podgląd przebytego dystansu"}
          />
          <StatPad
            itemArray={deetsForOtherPad}
            padTitle={"Kluczowych wskaźników wydajności (KPI)."}
          />
          <PulpitGraph kilometersArray={kilometersArray} />
        </ClientOnly>
      </span>
    </div>
  );
};

export default page;
