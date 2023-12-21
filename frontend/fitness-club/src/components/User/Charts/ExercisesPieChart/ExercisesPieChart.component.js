import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { Doughnut } from "react-chartjs-2";

import loadingpieChart from "./img/pie_chart.png";

import "./ExercisesPieChart.css";

const EmptyPieChart = () => (
  <div>
    <p>Exercise Tracker</p>
    <img src={loadingpieChart} style={{ width: "53%" }} alt="pie cahrt" />
  </div>
);

export default function ExercisesPieChart() {
  const [burnedCalories, setBurnedCalories] = useState([]);

  //fetching completed Exercise List data from the backend
  useEffect(() => {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/profile/me", config)
      .then(({ data }) => {
        console.log(data.completedWorkoutList);
        console.log(data.completedWorkoutList.length);

        if (data.completedWorkoutList.length > 0) {
          setBurnedCalories(data.completedWorkoutList);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const pieChart = (
    <Doughnut
      data={{
        labels: burnedCalories
          .slice(0, 6)
          .map((burnedcalories) => burnedcalories.exercise)
          .reverse(),
        datasets: [
          {
            data: burnedCalories
              .slice(0, 6)
              .map((burnedcalories) => burnedcalories.calories)
              .reverse(),
            backgroundColor: [
              "#bf00c2",
              "#ff2684",
              "#3254a8",
              "#3da19c",
              "#06adbf",
              "#f7d619",
            ],
            label: "Weight",
          },
        ],
      }}
      options={{
        animation: {
          animateScale: true,
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
          {burnedCalories.length === 0 ? <EmptyPieChart /> : pieChart}
        </Paper>
      </div>
    </div>
  );
}
