"use client";
import React from "react";
import Image from "next/image";
import { SafeVehicle } from "@/app/types";

interface NaczepyViewProps {
  vehicle?: Partial<SafeVehicle> | null;
}

const NaczepyView: React.FC<NaczepyViewProps> = ({ vehicle }) => {
  return (
    <div className={`w-11/12 flex flex-col md:flex-row gap-3 mx-auto`}>
      <div className="w-full md:w-1/2 flex flex-col relative">
        <div className={`absolute pl-2 pr-3 pt-2 mr-4`}>
          <h3 className="text-white font-extrabold md:text-xl text-sm">
            {`Zdjęcia przyczepę`}
          </h3>
          {!vehicle?.carImage && (
            <p className="text-gray-500 font-semibold md:text-sm text-xs">
              {`Obecnie nie ma żadnego zdjęcia przypisanego do Ciebie przyczepę.`}
            </p>
          )}
        </div>
        <Image
          src={(vehicle?.carImage as string) || "/images/noCarB.png"}
          alt="Image of the current driver's trailer"
          height={1024}
          width={1024}
          className="min-h-full min-w-full rounded-md object-cover top-o left-0"
        />{" "}
      </div>
      <div className="w-full md:w-1/2 rounded-md p-3 flex flex-col bg-gray-950">
        <h3 className="text-white font-extrabold md:text-xl text-sm">
          {`Szczegóły przyczepy`}
        </h3>
        {!vehicle?.carImage && (
          <p className="text-gray-500 font-semibold md:text-sm text-xs mb-2">
            {`Obecnie nie przypisano Ci żadnej przyczepy.`}
          </p>
        )}
        {[
          { title: "Rejestracja", content: vehicle?.registration },
          { title: "Wysokość", content: `${vehicle?.height} m` },
          { title: "Szerokość", content: `${vehicle?.width} m` },
          { title: "Długość", content: `${vehicle?.length} m` },
          { title: "Pojemność", content: `${vehicle?.maxWeight} kg` },
        ].map((item, index) => {
          return (
            <div key={index} className="w-11/12 flex flex-col gap-1 my-2">
              <h2 className="font-bold text-md text-white">{item.title}</h2>
              <p className="font-light text-sm text-gray-500">
                {item?.content || "Brak"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NaczepyView;
