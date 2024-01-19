"use client";
import React, { useCallback, useEffect } from "react";
import useDriver from "@/app/hooks/useCurrentDriver";
import Image from "next/image";
import { SafeDriver } from "@/app/types";

interface VehicleViewProps {
  allTheDrivers: SafeDriver[];
}

const VehicleView: React.FC<VehicleViewProps> = ({ allTheDrivers }) => {
  let { currentDriver, allDrivers, setAllDrivers } = useDriver();

  useEffect(() => {
    if (allTheDrivers && allDrivers.length < 1) {
      setAllDrivers(allTheDrivers);
    }
  }, [allDrivers.length, allTheDrivers, setAllDrivers, currentDriver]);

  let gimmeRelevantDrivers = useCallback(
    (allDrivers: Partial<SafeDriver>[]) => {
      return allDrivers.filter((d) => {
        console.log({
          driver: d.id,
          prevDrivers: currentDriver?.vehicle?.[0]?.prevDrivers,
          isInside: currentDriver?.vehicle?.[0]?.prevDrivers?.includes(
            d.id as string
          ),
        });
        return currentDriver?.vehicle?.[0]?.prevDrivers?.includes(
          d.id as string
        );
      });
    },
    [currentDriver?.vehicle]
  );

  return (
    <div
      className={`mainContainer w-full flex flex-col md:flex-row gap-3 max-w-full`}
    >
      <div className="leftPartition md:max-w-[1/2] md:min-w-[1/2] md:h-full md:min-h-full md:max-h-full rounded-xl flex gap-2 flex-col items-center w-full h-[346px] min-h-[265.5px] max-h-[265.5px] overflow-y-scroll">
        <div className="divWithCarsImage h-1/2 w-full max-w-full overflow-x-hidden rounded-xl flex flex-col gap-1 relative">
          <div className={`absolute pl-2 pr-3 pt-2 mr-4`}>
            <h3 className="text-white font-extrabold md:text-xl text-sm">
              {`Zdjęcia pojazdu`}
            </h3>
            {!currentDriver?.vehicle?.[0]?.carImage && (
              <p className="text-gray-500 font-semibold md:text-sm text-xs">
                {`Obecnie nie ma  żadnego zdjęcia przypisanego do Ciebie pojazdu.`}
              </p>
            )}
          </div>
          <Image
            src={
              (currentDriver?.vehicle?.[0]?.carImage as string) ||
              "/images/noCarB.png"
            }
            alt="Image of the current driver's vehicle"
            height={1024}
            width={1024}
            className="min-h-full min-w-full object-cover top-o left-0"
          />
        </div>
        <div className="divWithCarDetailsInRow h-1/2 w-full rounded-xl overflow-x-auto overflow-y-hidden whitespace-nowrap">
          {[
            {
              image: "bentoPlate",
              title: "Numer Rejestracyjne",
              subTitle:
                currentDriver?.vehicle?.[0]?.registration ||
                "Numer Rejestracyjne",
            },
            {
              image: "bentoMark",
              title: "Marka pojazdu",
              subTitle: currentDriver?.vehicle?.[0]?.carMark || "Marka Pojazdu",
            },
            {
              image: "bentoModel",
              title: "Model pojazdu",
              subTitle:
                currentDriver?.vehicle?.[0]?.carModel || "Model Pojazdu",
            },
          ].map((deets, index) => (
            <div
              key={index}
              className={`max-w-[2/3] min-w-[2/3] min-h-[95%] h-[95%] rounded-xl bg-cover bg-no-repeat inline-flex flex-col gap-1 pl-2 pr-3 pt-2 mr-4 mb-2
                  ${
                    deets.image === "bentoPlate"
                      ? "bg-[url('/images/bentoPlate.png')]"
                      : deets.image === "bentoModel"
                      ? "bg-[url('/images/bentoModel.png')]"
                      : deets.image === "bentoMark"
                      ? "bg-[url('/images/bentoMark.png')]"
                      : ""
                  }
              `}
            >
              <p className="text-gray-500 font-semibold md:text-sm text-xs">
                {deets.title}
              </p>
              <h3 className="text-white font-extrabold md:text-xl text-sm">
                {deets.subTitle}
              </h3>
            </div>
          ))}
        </div>
      </div>
      <div className="rightPartition md:max-w-[1/2] md:min-w-[1/2] md:max-h-full rounded-xl flex flex-col w-full h-[173px] min-h-[265.5px] max-h-[265.5px] overflow-y-scroll gap-1 pl-2 pr-3 pt-2 mr-4 bg-gray-950">
        <h3 className="text-white font-extrabold md:text-xl text-sm">
          {"Poprzedni kierowcy tego pojazdu"}
        </h3>
        {!currentDriver?.vehicle?.[0]?.prevDrivers && (
          <p className="text-gray-500 font-semibold md:text-sm text-xs">
            {"Nie można jeszcze wyświetlić poprzednich kierowców pojazdu."}
          </p>
        )}
        {currentDriver?.vehicle?.[0] &&
          currentDriver?.vehicle?.[0]?.prevDrivers?.length > 0 &&
          gimmeRelevantDrivers(allDrivers).map((driver, index) => (
            <div
              key={index}
              className={`w-11/12 rounded-xl flex flex-row gap-2 items-center p-2
                ${index % 2 === 0 && "bg-gray-500 text-gray-950"}
                `}
            >
              <p className="text-sm text-gray-500 font-bold">{index + 1}</p>
              <p className="text-sm text-gray-500 font-bold">{driver.name}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VehicleView;

//previous drivers r full
