"use client";
import React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

interface PulpitGraphProps {
  kilometersArray: (number | null)[];
}

const PulpitGraph: React.FC<PulpitGraphProps> = ({kilometersArray}) => {
  return (
    <div
      className={`bg-gradient-to-br from-gray-800 to-gray-950 rounded-2xl p-4`}
    >
      <LineChart
        sx={{
          //change left yAxis label styles
          "& .MuiChartsAxis-left .MuiChartsAxis-tickLabel": {
            strokeWidth: "0.4",
            fill: "#fff",
          },
          // bottomAxis Line Styles
          "& .MuiChartsAxis-bottom .MuiChartsAxis-line": {
            stroke: "white",
            strokeWidth: 2,
          },
          // leftAxis Line Styles
          "& .MuiChartsAxis-left .MuiChartsAxis-line": {
            stroke: "white",
            strokeWidth: 2,
          },
          // change bottom label styles
          "& .MuiChartsAxis-bottom .MuiChartsAxis-tickLabel": {
            strokeWidth: "0.5",
            fill: "#fff",
          },
          // change bottom label styles
          "& .MuiChartsLegend-series>text>tspan": {
            // strokeWidth: 2,
            fill: "#fff",
            color: "white",
          },
          "& .MuiChartsLegend-mark": {
            borderRadius: "50%",
          },
        }}
        
        xAxis={[
          {
            scaleType: "band",
            data: [
              "sty",
              "lut",
              "mar",
              "kwi",
              "maj",
              "cze",
              "lip",
              "sie",
              "wrz",
              "paź",
              "lis",
              "gru",
            ],
          },
        ]}
        series={[
          {
            data: kilometersArray,
            label: "Dystans pokonywany miesięcznie",
          },
        ]}
        width={500}
        height={300}
      />
    </div>
  );
};

export default PulpitGraph;
