import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import { Bar } from "react-chartjs-2";

import "./MealBarChart.css";

import loadingBarChart from "./img/bar_chart.png";

const EmptyBarChart = () => (
  <div>
    <p>Meal Intake</p>
    <img src={loadingBarChart} style={{ width: "60%" }} alt="bar cahrt" />
  </div>
);

export default function MealBarChart() {
  const [mealCalories, setMealCalories] = useState([]);

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
        console.log(data.dailymeallist);
        console.log(data.dailymeallist.length);

        if (data.dailymeallist.length > 0) {
          setMealCalories(data.dailymeallist);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const pieChart = (
    <Bar
      data={{
        labels: mealCalories
          .slice(0, 6)
          .map((mealcalories) => mealcalories.mealName)
          .reverse(),
        datasets: [
          {
            data: mealCalories
              .slice(0, 6)
              .map((mealcalories) => mealcalories.calories)
              .reverse(),
            backgroundColor: [
              "#3da19c",
              "#06adbf",
              "#f7d619",
              "#bf00c2",
              "#ff2684",
              "#3254a8",
            ],
            label: "Meal Calorie Intake",
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
                display: false,
                drawBorder: true,
                drawOnChartArea: false,
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
          {mealCalories.length === 0 ? <EmptyBarChart /> : pieChart}
        </Paper>
      </div>
    </div>
  );
}
