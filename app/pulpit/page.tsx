import React from "react";
import ClientOnly from "../components/ClientOnly";
import StatPad from "../components/statPad/StatPad";
import getCurrentDriver from "../actions/getCurrentDriver";
import TbSum from "react-icons/tb"

const page = async () => {
  let currentDriver = await getCurrentDriver();
  console.log(currentDriver);

  // a propos the date object
  let theDate = new Date();
  let currentMonth = theDate.getMonth();
  let currentYear = theDate.getFullYear();
  console.log(currentYear);

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
  let companyKms = currentDriver?.companyKilometers?.kms

  let deetsForPad: {
    title: string;
    value: string | number;
    subtitle?: string;
    icon?: any;
  }[] = [
    {
      title: "W tym miesiącu",
      value: currentKmMonth?.kms ? currentKmMonth.kms : 0,
      subtitle: "Przejechane",
    },
    {
      title: "Pod firmą Wimax",
      value: companyKms ? companyKms : 0,
      subtitle: "Przejechane",
    },
    {
      title: "Łącznie",
      value: currentDriver?.totKms ? currentDriver.totKms : 0,
      subtitle: "Przejechane",
    },
  ];

  return (
    <div className="bg-[url('/images/pulpitBkg.png')] bg-no-repeat bg-cover bg-center h-screen w-full min-h-screen flex flex-row items-start justify-start flex-wrap p-6">
      <ClientOnly>
        <StatPad
          itemArray={deetsForPad}
          padTitle={"Podgląd przebytego dystansu"}
        />
      </ClientOnly>
    </div>
  );
};

export default page;
