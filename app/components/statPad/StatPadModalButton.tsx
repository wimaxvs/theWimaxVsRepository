"use client";
import React, { useState } from "react";
import { SafeDriver, SafeSettlement } from "../../types";
import axios, { AxiosResponse } from "axios";
import toast from "react-hot-toast";
import useDriver from "../../hooks/useCurrentDriver";
import useAllTasks from "../../hooks/useAllTasks";
import Image from "next/image";
import { FirmBalance } from "@prisma/client";

interface StatPadModalButtonProps {
  children?: React.ReactNode;
}

const StatPadModalButton: React.FC<StatPadModalButtonProps> = ({
  children,
}) => {
  let [isLoading, setIsLoading] = useState<boolean>(false);
  let [amount, setAmount] = useState<number>(0.0);

  let onAction = (amount: number) => {
    setIsLoading(true);
    console.log(amount);
    let data = JSON.stringify({ amount });
    axios
      .post("/api/firmBalance", data)
      .then(
        (
          res: AxiosResponse<{
            message: string;
            code?: string | number;
            firmBalance?: FirmBalance;
          }>
        ) => {
          if (res.data.code == 400 || res.data.code == 500) {
            throw new Error(res.data.message);
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
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        disabled={isLoading}
        onClick={() =>
          (
            document.getElementById(`StatPadModal`) as HTMLFormElement
          ).showModal()
        }
      >
        {children}
      </button>
      <dialog id={`StatPadModal`} className="modal">
        <div className="modal-box bg-gray-950 flex flex-col border-[#1fb2a6] border">
          <h3 className="font-bold text-lg text-white">
            Ile zostało w firmie?{" "}
          </h3>
          <p className="py-4 text-xs md:text-sm lg:text-md font-semibold mb-3 text-gray-500">
            {`Wprowadź kwotę pozostałą w firmie i naciśnij „zapisz”`}
          </p>
          <div className="relative w-full">
            <Image
              height={20}
              width={20}
              alt="envelope Icon denoting email field"
              src="/images/moneyIcon.jpg"
              className="absolute left-[5%] top-[26%] inline-block"
            />
            <input
              onChange={(e) => setAmount((amt) => Number(e.target.value))}
              type={"number"}
              step={"0.01"}
              placeholder={"1,234,567.89"}
              className="mb-4 block w-full border border-solid border-black bg-white align-middle text-[#333333] focus:border-[#3898ec] text-sm px-3 rounded-md h-9 py-6 pl-14"
              maxLength={256}
            />
          </div>
          <div className="w-full flex flex-row justify-between px-3 mt-5">
            <button
              onClick={() => onAction(amount)}
              className="p-2 text-white font-bold rounded-md bg-green-600  disabled:opacity-50"
            >
              Zapisz
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default StatPadModalButton;

//beginImage: "",
//endImage: "",
//distanceCoveredSettlement: 0,
//fuelUsed: 0,
//litersRefueled: 0,
//expensesSpent: 0,
//weight: 0,
//ferries: 0,
//highways: "",
//products: "",
//misc: "",
//endLocation: taskBeingAssigned.endLocation?.city,
//startLocation: taskBeingAssigned.startLocation?.city,
