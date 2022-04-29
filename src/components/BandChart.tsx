import { useEffect, useRef, useContext, useState } from "react";
import { Chart, registerables } from "chart.js";

import { SocketContext } from "../context/SocketContext";
import { Band } from "../interfaces/Band";

export const BandChart = () => {
  const { socket } = useContext(SocketContext);
  const [bands, setBands] = useState<Band[]>([]);
  const ctx = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    socket.on("current-bands", (bands: Band[]) => {
      setBands(bands);
    });

    return () => {
      socket.off("current-bands");
    };
  }, [socket]);

  useEffect(() => {
    Chart.register(...registerables);

    const myChart = new Chart(ctx.current?.getContext("2d")!, {
      type: "bar",
      data: {
        labels: bands.map((band) => band.name),
        datasets: [
          {
            label: "# of Votes",
            data: bands.map((band) => band.votes),
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(255, 159, 64, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
              "rgba(153, 102, 255, 1)",
              "rgba(255, 159, 64, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        animation: false,
        indexAxis: "y",
        scales: {
          x: {
            stacked: true,
          },
        },
      },
    });
    return () => {
      myChart.destroy();
    };
  }, [bands]);

  return <canvas id="myChart" ref={ctx}></canvas>;
};
