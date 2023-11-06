import React from "react";
import ClientOnly from "../components/ClientOnly";
import StatPad from "../components/statPad/StatPad";
import getCurrentDriver from "../actions/getCurrentDriver";

const page = async () => {
  let currentDriver = await getCurrentDriver();

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
    kmm.month === getMonthName(currentMonth) &&
      kmm.year === currentYear.toString();
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
      value: currentKmMonth?.kms ? `${currentKmMonth.kms} km` : `${0} km`,
      subtitle: "Przejechane",
    },
    {
      title: "Pod firmą Wimax",
      value: companyKms ? `${companyKms} km` : `${0} km`,
      subtitle: "Przejechane",
    },
    {
      title: "Łącznie",
      value: currentDriver?.totKms ? `${currentDriver.totKms} km` : `${0} km`,
      subtitle: "Przejechane",
    },
  ];

  let deetsForOtherPad: typeof deetsForKmPad = [
    {
      title: "Wykonany dostawy",
      value: currentDriver?.deliveries ? currentDriver.deliveries : 0,
      subtitle: "Wszyscy",
    },
    {
      title: "Srednie spalanie",
      value: currentDriver?.avgFuelConsumption
        ? `${currentDriver.avgFuelConsumption} km/l`
        : `${0} km/l`,
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
        </ClientOnly>
      </span>
    </div>
  );
};

export default page;
