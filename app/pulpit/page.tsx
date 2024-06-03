import React from "react";
import ClientOnly from "../components/ClientOnly";
import StatPad from "../components/statPad/StatPad";
import BalanceStatPad from "../components/statPad/BalanceStatPad";
import getCurrentDriver from "../actions/getCurrentDriver";
import PulpitGraph from "../components/graph/PulpitGraph";
import { FaRegMoneyBillAlt } from "react-icons/fa";
import getFirmBalance from "../actions/getFirmBalance";
import getAllKmms from "../actions/getAllKmms";
// import getCurrentKmMonth from "../actions/getCurrentKmMonth";

const page = async () => {
  let currentDriver = await getCurrentDriver();
  let firmBalance = await getFirmBalance();

  // a propos the date object
  let theDate = new Date();
  let currentMonth = theDate.getMonth();
  let currentYear = theDate.getFullYear();

  let everyonesKms = await getAllKmms();
  everyonesKms = Math.ceil(everyonesKms);

  // function getMonthName(monthValue: number): string | undefined {
  //   const months = [
  //     "January",
  //     "February",
  //     "March",
  //     "April",
  //     "May",
  //     "June",
  //     "July",
  //     "August",
  //     "September",
  //     "October",
  //     "November",
  //     "December",
  //   ];

  //   if (monthValue >= 0 && monthValue < 12) {
  //     return months[monthValue];
  //   } else {
  //     return undefined;
  //   }
  // }

  let currentKmMonth = currentDriver?.kilometerMonths?.find((kmm) => {
    return (
      kmm.month == currentMonth.toString() && kmm.year == currentYear.toString()
    );
  });

  // let currentKmMonth = await getCurrentKmMonth(currentDriver?.id)

  const kilometersArray = Array.from({ length: 12 }, (_, index) => {
    const matchingMonth = currentDriver?.kilometerMonths?.find(
      (obj) =>
        Number(obj.month) === index &&
        obj.year === new Date().getFullYear().toString()
    );
    return matchingMonth ? matchingMonth.kms : 0;
  });

  let firmBalanceAmount = (amount: number) => {
    // Split the number into integer and decimal parts
    const parts = amount.toString().split(".");
    let integerPart = parts[0];
    const decimalPart = parts[1] ? "." + parts[1] : "";

    // Add commas to the integer part
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");

    // Combine the integer and decimal parts
    return integerPart + decimalPart;
  };

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
        ? `${firmBalanceAmount(currentKmMonth.kms)} km`
        : `${0} km`,
      subtitle: "Przejechane",
    },
    {
      title: "Pod firmą Wimax",
      value: companyKms ? `${firmBalanceAmount(companyKms)} km` : `${0} km`,
      subtitle: "Przejechane",
    },
    {
      title: "Łącznie",
      value: `${firmBalanceAmount(everyonesKms) || 0} km`,
      subtitle: "Wszyscy",
    },
  ];

  let deetsForOtherPad: typeof deetsForKmPad = [
    {
      title: "Wykonane dostawy",
      value: currentDriver?.deliveries ? currentDriver.deliveries : 0,
      subtitle: "Twoje dostawy",
    },
    {
      title: "Średnie spalanie",
      value: currentDriver?.avgFuelConsumption
        ? `${currentDriver.avgFuelConsumption.toFixed(2)} l/km`
        : `${0} l/km`,
    },
  ];

  let deetsForBalanceStatPad: typeof deetsForKmPad = [
    {
      title: "W Euro",
      value:
        firmBalanceAmount(firmBalance?.amount ? firmBalance.amount : 0) || 0,
      icon: <FaRegMoneyBillAlt size={28} color={"white"} />,
    },
  ];

  return (
    <div className="bg-[url('/images/bkg_1.png')] bg-no-repeat bg-cover bg-center md:h-screen w-full md:min-h-screen md:max-h-screen oveflow-y-hidden">
      <span
        className={` flex flex-row gap-6 items-start justify-start p-6 max-h-[90%]  overflow-y-scroll flex-wrap`}
      >
        <ClientOnly>
          <StatPad
            itemArray={deetsForKmPad}
            padTitle={"Podgląd przebytego dystansu"}
          />
          <StatPad
            itemArray={deetsForOtherPad}
            padTitle={"Kluczowych wskaźnik wydajności (KPI)."}
          />
          <BalanceStatPad
            itemArray={deetsForBalanceStatPad}
            padTitle={"Saldo Firmy"}
            role={
              currentDriver?.role == "ZARZAD" ? currentDriver.role : undefined
            }
          />
          <PulpitGraph kilometersArray={kilometersArray} />
        </ClientOnly>
      </span>
    </div>
  );
};

export default page;
