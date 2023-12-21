import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { Line } from "react-chartjs-2";

import loadingchart from "./img/line_chart.png";

import "./WeightLineChart.css";
//https://codepen.io/SPRS/pen/ebMqNZ - donut chart

const EmptyLineChart = () => (
  <div>
    <p>Weigth Progress</p>
    <img src={loadingchart} style={{ width: "60%" }} alt="line cahrt" />
  </div>
);

export default function WeightLineChart(props) {
  const [dailyWeight, setDailyWeight] = useState([]);

  //fetching completed Exercise List data from the backend
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL + "/api/profile/user/" + props.userID
      )
      .then(({ data }) => {
        console.log(data.completedWorkoutList);
        console.log(data.completedWorkoutList.length);

        if (data.completedWorkoutList.length > 0) {
          setDailyWeight(data.completedWorkoutList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const lineChart = (
    <Line
      data={{
        labels: dailyWeight
          .slice(0, 15)
          .map((weight) => "")
          .reverse(),
        datasets: [
          {
            //get data decending order
            data: dailyWeight.map((weight) => weight.weight).reverse(),
            // data: dailyWeight
            //   .slice(0, 15)
            //   .map((weight) => weight.weight)
            //   .reverse(),
            label: "Weight",

            borderColor: "#06adbf",
            borderWidth: 3,
            lineTension: 2,
            radius: 3,
            pointStyle: "circle",
            fill: false,
            cubicInterpolationMode: "monotone",
            spanGaps: "false",

            // clip: { left: 5, top: false, right: -2, bottom: 0 },
          },
        ],
      }}
      options={{
        layout: {
          padding: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
          },
        },

        scales: {
          xAxes: [
            {
              gridLines: {
                display: false,
                drawBorder: true,
                drawOnChartArea: false,
              },
            },
          ],
          yAxes: [
            {
              gridLines: {
                display: true,
                drawBorder: false,
                drawOnChartArea: true,
              },
            },
          ],
        },
      }}
    />
  );

  return (
    <div>
      <div
        className="weightLineChart"
        style={{
          padding: "10px",
          textAlign: "center",
          margin: "auto",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "10px",
            textAlign: "center",
            margin: "auto",
            justifyContent: "center",
            borderRadius: "20px",
            boxShadow: "7px 10px 23px 0px rgba(110,109,109,1)",
          }}
        >
          {dailyWeight.length === 0 ? <EmptyLineChart /> : lineChart}
        </Paper>
      </div>
    </div>
  );
}
