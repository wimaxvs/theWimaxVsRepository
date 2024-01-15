"use client";
import React from "react";
import useFilter from "@/app/hooks/useFilter";

const DatePicker = () => {
  let { setEndDate, setStartDate } = useFilter();

  return (
    <div
      className={`flex flex-col md:flex-row gap-2 items-start md:items-center wrap `}
    >
      <p className={`text-sm font-semibold mb-3 text-white`}>
        wybierz rok i miesiąc rozpoczęcia i zakończenia z list rozwijanych:
      </p>
      <div className="flex flex-row items-center gap-2">
        <div className="relative w-[50%]">
          <label htmlFor="start" className={"mb-3 text-sm text-white"}>
            Początek:
          </label>
          <input
            type="month"
            className="block w-full align-middle text-white  border border-primary focus:border-[#3898ec] text-sm rounded-md h-9 py-4 px-4"
            onChange={(e) => setStartDate(e.target.value)}
            name="start"
            min={"2023-11"}
          />
        </div>
        <div className="relative w-[50%]">
          <label htmlFor="End" className={"mb-3 text-sm text-white"}>
            Koniec:
          </label>
          <input
            type="month"
            className="block w-full align-middle text-white  border border-primary focus:border-[#3898ec] text-sm rounded-md h-9 py-4 px-4"
            onChange={(e) => setEndDate(e.target.value)}
            name="end"
            min={"2023-11"}
          />
        </div>
      </div>
    </div>
  );
};

export default DatePicker;
