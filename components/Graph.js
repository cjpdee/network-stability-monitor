import { Bar } from "react-chartjs-2";
import { useEffect, useReducer, useRef, useState } from "react";
import { getNetworkDatum } from "../util/network";

const LABEL_WIDTH = 35;
const BAR_WIDTH = 12;

export default function Graph({ dataType, format, networkData, dispatch }) {
  const chartRef = useRef(undefined);

  useEffect(() => {
    setTimeout(async () => {
      const datum = await getNetworkDatum();
      dispatch({ payload: datum });
      chartRef.current.canvas.parentNode.style.width =
        networkData.length * BAR_WIDTH + LABEL_WIDTH + "px";
      chartRef.current.canvas.parentNode.style.height = "100vh";
    }, 1000);
  }, [networkData]);

  const formatData = (networkData) => ({
    labels: networkData.slice().map((datum) => ""),
    datasets: [
      {
        data: networkData
          .slice()
          .reverse()
          .map((datum) => {
            console.log("datum", datum);
            return dataType === "ping" ? datum.ping : datum[dataType][format];
          }),
        backgroundColor: networkData
          .slice()
          .reverse()
          .map((datum) => {
            switch (dataType) {
              case "ping":
                return datum.ping > 100 ? "red" : "green";
              case "up":
                // return "green";
                return datum.up[format] > 100 ? "red" : "green";
              case "down":
                // return "green";
                return datum.down[format] > 100 ? "red" : "green";
            }
          }),
      },
    ],
  });

  return (
    <Bar
      ref={chartRef}
      className="overflow-hidden"
      data={formatData(networkData)}
      legend={{ display: false }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        animation: { duration: 0 },
        barPercentage: 1,
        categoryPercentage: 1,

        plugins: {
          legend: {
            display: false,
          },
        },

        scales: {
          y: {
            min: 0,
            max:
              dataType === "ping"
                ? 200
                : format === "mbps"
                ? 80
                : format === "kbps"
                ? 80000
                : format === "bps"
                ? 80000000
                : 200,
          },
          x: {
            categoryPercentage: 1.0,
            barPercentage: 1.0,
            grid: {
              offset: false,
            },
          },
        },
      }}
    />
  );
}
