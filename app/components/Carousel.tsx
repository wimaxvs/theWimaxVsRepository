"use client";
import React, { useState } from "react";
import { SafeSettlement } from "../types";
import Image from "next/image";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface CarouselProps {
  task: Partial<SafeSettlement>;
  detailComponent: (key: string, value: string | number) => JSX.Element;
}

const Carousel: React.FC<CarouselProps> = ({ task, detailComponent }) => {
  return (
    <>
      <div className="carousel w-full">
        <div
          id={`slide1_${task?.id}`}
          className="carousel-item relative w-full"
        >
          <div
            className={`flex flex-row gap-3 w-11/12 flex-wrap justify-start`}
          >
            {[
              {
                key: "Przejechany Dystans (KM)",
                value: task?.distanceCoveredSettlement! || 0,
              },
              {
                key: "Zużyte paliwo (L)",
                value: task?.fuelUsed! || 0,
              },
              {
                key: "Pociągi (Eur)",
                value: task?.expensesSpent! || 0,
              },
              {
                key: "Promy (Eur)",
                value: task?.ferries! || 0,
              },
              {
                key: "Autostrady (Eur)",
                value: task?.highwaysBeta || "N/A",
              },
              {
                key: "Zatankowane paliwo (L)",
                value: task?.litersRefueled! || 0,
              },
            ].map((item, index) => (
              <React.Fragment key={index}>
                {detailComponent(item.key, item.value)}
              </React.Fragment>
            ))}
          </div>
          <div className="absolute flex justify-end transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href={`#slide2_${task?.id}`} className="">
              <FaAngleRight color={"white"} size={18} />
            </a>
          </div>
        </div>
        <div
          id={`slide2_${task?.id}`}
          className="carousel-item relative w-full"
        >
          <Image
            width={700}
            height={700}
            alt={`Zrzut ekranu początkowy`}
            src={task?.beginImage || ""}
            className="w-full max-h-48"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href={`#slide1_${task?.id}`} className="">
              <FaAngleLeft color={"white"} size={18} />
            </a>
            <a href={`#slide3_${task?.id}`} className="">
              <FaAngleRight color={"white"} size={18} />
            </a>
          </div>
        </div>
        <div
          id={`slide3_${task?.id}`}
          className="carousel-item relative w-full"
        >
          <Image
            width={700}
            height={700}
            alt={`Zrżut ekran końcowy`}
            src={task?.endImage || ""}
            className="w-full max-h-48"
          />
          <div className="absolute flex justify-start transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href={`#slide2_${task?.id}`} className="">
              <FaAngleLeft color={"white"} size={18} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Carousel;
