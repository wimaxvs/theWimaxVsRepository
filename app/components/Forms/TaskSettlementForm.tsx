"use client";
import useAllTasks from "@/app/hooks/useAllTasks";
import useTaskBeingSent from "@/app/hooks/useTaskBeingSent";
import React, { useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { IoArrowBackOutline } from "react-icons/io5";
import InputDecipher from "./inputs/InputDecipher";
import { GiFinishLine, GiTireTracks } from "react-icons/gi";
import { RiPinDistanceLine } from "react-icons/ri";
import { FaRoad } from "react-icons/fa";
import { MdDirectionsBoat, MdMiscellaneousServices } from "react-icons/md";
import { IoMdSpeedometer } from "react-icons/io";
import { GiPayMoney } from "react-icons/gi";
import { BsFuelPumpDiesel } from "react-icons/bs";

interface TaskSettlementFormProps {
  register: UseFormRegister<FieldValues>;
}

const TaskSettlementForm: React.FC<TaskSettlementFormProps> = ({
  register,
}) => {
  let { setTaskBeingAssigned } = useAllTasks();
  let { setPageNumber } = useTaskBeingSent();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  let goBack = () => {
    setTaskBeingAssigned({}, true);
  };

  let goForward = () => {
    setPageNumber(2);
  };

  return (
    <>
      <div
        className={`md:max-w-full md:min-w-[45%] w-full flex flex-col gap-2 items-start p-4 rounded-md bg-gray-950`}
      >
        <div className="w-full flex flex-row justify-start" onClick={goBack}>
          <IoArrowBackOutline size={18} color={"white"} />
        </div>
        <div className={`w-full p-2 pl-0 overflow-y-auto`}>
          {/* Table Title */}
          <h3 className="text-white font-extrabold md:text-xl text-sm mb-1">
            {`Wypełnij formularz, podając szczegóły dotyczące Twojej trasy`}
          </h3>
          <p
            className={`text-xs md:text-sm lg:text-md font-semibold mb-3 text-gray-500`}
          >
            {`kliknij "Dalej" aby dodać zdjęcia`}
          </p>
          <form
            className={`w-full flex flex-col gap-2 items-start p-4 rounded-md flex-wrap`}
          >
            <div className={`w-full p-2 pl-0 overflow-y-auto`}>
              <div
                className={`w-full flex flex-col md:flex-row md:flex-wrap md:justify-evenly gap-2 max-w-full overflow-x-hidden`}
              >
                {[
                  {
                    registerId: "startLocation",
                    placeholder: "Miasto Start",
                    inputType: "text",
                    IconPassed: <GiTireTracks size={20} color={"black"} />,
                  },
                  {
                    registerId: "endLocation",
                    placeholder: "Miasto Koniec",
                    inputType: "text",
                    IconPassed: <GiFinishLine size={20} color={"black"} />,
                  },
                  {
                    registerId: "distanceCoveredSettlement",
                    placeholder: "Przejechany dystans (KM)",
                    inputType: "number",
                    step: 0.01,
                    IconPassed: <RiPinDistanceLine size={20} color={"black"} />,
                  },
                  {
                    registerId: "fuelUsed",
                    placeholder: "Zużyte paliwo (L)",
                    inputType: "number",
                    step: 0.01,
                    IconPassed: <IoMdSpeedometer size={20} color={"black"} />,
                  },
                  {
                    registerId: "expensesSpent",
                    placeholder: "Pociągi (EUR)",
                    inputType: "number",
                    step: 0.01,
                    IconPassed: <GiPayMoney size={20} color={"black"} />,
                  },
                  {
                    registerId: "ferries",
                    placeholder: "Promy (EUR)",
                    inputType: "number",
                    step: 0.01,
                    IconPassed: <MdDirectionsBoat size={20} color={"black"} />,
                  },
                  {
                    registerId: "highways",
                    placeholder: "Autostrady (EUR)",
                    inputType: "number",
                    step: 0.01,
                    IconPassed: <FaRoad size={20} color={"black"} />,
                  },
                  {
                    registerId: "litersRefueled",
                    placeholder: "Zatankowane paliwo (L)",
                    inputType: "number",
                    step: 0.01,
                    IconPassed: <BsFuelPumpDiesel size={20} color={"black"} />,
                  },
                  {
                    registerId: "misc",
                    placeholder: "Inny",
                    inputType: "text",
                    IconPassed: (
                      <MdMiscellaneousServices size={20} color={"black"} />
                    ),
                  },
                ].map((deet, index) => (
                  <React.Fragment key={index}>
                    <InputDecipher
                      step={deet.step}
                      widthSet="md:max-w-[45%] min-w-[35%]"
                      IconPassed={deet.IconPassed ? deet.IconPassed : undefined}
                      register={register}
                      registerId={deet.registerId}
                      inputType={deet.inputType}
                      placeholder={deet.placeholder}
                      labelProvided={deet.placeholder}
                      labelColor={"text-white"}
                      autocomplete={false}
                    />
                  </React.Fragment>
                ))}
              </div>
            </div>
          </form>
          <button
            disabled={isLoading}
            onClick={goForward}
            className={
              "p-3 bg-deep-blue text-white font-semibold rounded-md disabled:opacity-75"
            }
          >
            Dalej
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskSettlementForm;
