import React from "react";
import { Bar, defaults } from "react-chartjs-2";

//defaults.global.tooltips.enabled = false
//defaults.global.legend.position = 'bottom'

const BarChart = () => {
  return (
    <div>
      <Bar
        data={{
          labels: ["TLV", "RISHON", "NETANYA", "RAANANA", "KFAR SABA"],
          datasets: [
            {
              label: "PRODUCTS PER CITY",
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],

              borderWidth: 1,
            },
      
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                },
              },
            ],
          },
          legend: {
            labels: {
              fontSize: 25,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
