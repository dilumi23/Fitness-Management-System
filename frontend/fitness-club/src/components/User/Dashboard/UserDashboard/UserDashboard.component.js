import React, { useState, useEffect } from "react";
import "./UserDashboard.css";
import axios from "axios";


import MuiAlert from "@material-ui/lab/Alert";

import HeaderCards from "../Cards/Cards.component";
import HeaderCardsNoPackage from "../Cards/CardsNotSelected.component";
import WorkoutList from "../../Lists/WorkoutList/WorkoutList.component";
import MealPlanList from "../../Lists/MealPlanList/MealPlanList.component";
import NewsList from "../../Lists/NewsList/NewsList.component";
import CompletedExercises from "../../Tables/CompletedExercises/CompletedExercises.component";
import DailyMealTrackerTable from "../../Tables/DailyMealTrackerTable/DailyMealTrackerTable";
import WeightLineChart from "../../Charts/WeightLineChart/WeightLineChart.component";
import ExercisesPieChart from "../../Charts/ExercisesPieChart/ExercisesPieChart.component";
import MealBarChart from "../../Charts/MealBarChart/MealBarChart.component";
import BMICard from "../../BMI/bmicard";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const UserDashboard = () => {
  const [profile, setProfile] = useState("true");
  const [remainingDates, setRemaingDates] = useState(0);
  const [errorType, setErrorType] = useState("warning");
  /*Redirect to login page if there is no token*/
  useEffect(() => {
    const token = localStorage.getItem("x-auth-token");
    const userRole = localStorage.getItem("userRole");

    if (!token) {
      window.location = "/userlogin";
    }

    if (userRole !== "user") {
      window.location = "/userlogin";
    }

    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    async function checkProfile() {
      await axios
        .get(process.env.REACT_APP_BACKEND_URL + "/api/profile/me", config)
        .then((response) => {
          if (response.data.package) {
            setProfile("true");
          } else {
            setProfile("false");
          }

          //check subscription date outdated or not
          if (response.data.subscriptionDate) {
            //get current data
            var currentDate = new Date();
            var date = currentDate.getDate();
            var month = currentDate.getMonth(); //Be careful! January is 0 not 1
            var year = currentDate.getFullYear();

            //month-day-year
            var currentDate = month + 1 + "-" + date + "-" + year;

           
            var arraySubscribedDate = response.data.subscriptionDate.split("-");

            //month-day-year
            var purchasedDate =
              arraySubscribedDate[1] +
              "-" +
              arraySubscribedDate[2] +
              "-" +
              arraySubscribedDate[0];

            // new Date("dateString") is browser-dependent and discouraged, so we'll write
            // a simple parse function for U.S. date format (which does no error checking)
            function parseDate(str) {
              var mdy = str.split("-");
              return new Date(mdy[2], mdy[0] - 1, mdy[1]);
            }

            function datediff(first, second) {
              // Take the difference between the dates and divide by milliseconds per day.
              // Round to nearest whole number to deal with DST.
              return Math.round((second - first) / (1000 * 60 * 60 * 24));
            }

            //alert("Current Date : " + currentDate)
            //alert("purchasedDate Date : " + purchasedDate)

            const dateDiffernce = parseInt(
              datediff(parseDate(purchasedDate), parseDate(currentDate)),
              10
            );
            //alert("Differnce Date : " + dateDiffernce);

            const packageTimePeriod = response.data.packagePeriod * 30;
            if (dateDiffernce < packageTimePeriod) {
              setRemaingDates(packageTimePeriod - dateDiffernce);
              setErrorType("success");
              //alert("Remaining DYAS " + (30 - dateDiffernce))
            } else {
              setRemaingDates("Your gym package has been expired");
              setErrorType("error");
            }
          }
        })
        .catch(setProfile("false"));
    }
    // Execute the checkProfile function directly
    checkProfile();
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-md-12 col-xl-12 mb-4">
          {/* <Alert severity={errorType}>
            {errorType == "warning"
              ? "You need to choose a gym package to get the full features"
              : errorType == "success"
              ? "You have another " + remainingDates + " days to expire"
              : remainingDates}
          </Alert> */}
        </div>
      </div>

      <div>
        {/* //if profile is true and errorType is success then customer can only navugate to those features */}
        {profile === "true" && errorType === "success" ? (
          <HeaderCards />
        ) : (
          <HeaderCardsNoPackage />
        )}
      </div>

      <div className="row">
        <div className="col-md-6 col-xl-4 mb-4">
          <WorkoutList />
        </div>
        <div className="col-md-6 col-xl-4 mb-4">
          <MealPlanList />
        </div>
        <div className="col-md-6 col-xl-4 mb-4">
          <NewsList />
        </div>
      </div>

      <hr />

      <div className="row">
        <div className="col-md-12 col-xl-6 mb-4">
          <BMICard />
        </div>
        <div className="col-md-12 col-xl-6 mb-4">
          <WeightLineChart />
          {/* <LineChart /> */}
        </div>
        <div className="col-md-12 col-xl-6 mb-4">
          <ExercisesPieChart />
          {/* <Exercises1PieChart /> */}
        </div>
        <div className="col-md-12 col-xl-6 mb-4">
          <MealBarChart />
        </div>
      </div>

      <hr />
      <div className="row">
        <div className="col-md-12 col-xl-6 mb-4">
          <h5
            style={{
              fontFamily: "Comic Sans MS",
              fontWeight: "bold",
              textAlign: "center",
              color: "#e3c100",
              height: 48,
              padding: "10px 30px",
            }}
          >
            Daily Exercise Tracker
          </h5>
          <CompletedExercises />
        </div>
        <div className="col-md-12 col-xl-6 mb-4">
          <h5
            style={{
              fontFamily: "Comic Sans MS",
              fontWeight: "bold",
              textAlign: "center",
              color: "#e0542d",
              height: 48,
              padding: "10px 30px",
            }}
          >
            Daily Meal Tracker
          </h5>
          <DailyMealTrackerTable />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
