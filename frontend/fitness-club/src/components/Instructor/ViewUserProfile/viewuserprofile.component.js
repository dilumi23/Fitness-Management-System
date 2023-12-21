import React, { useState, useEffect } from "react";
import BMICardViewInstructor from "./BMI/bmicard";
import WeightLineChart from "./Charts/WeightLineChart/WeightLineChart.component";
import ExercisesPieChart from "./Charts/ExercisesPieChart/ExercisesPieChart.component";
import MealBarChart from "./Charts/MealBarChart/MealBarChart.component";
import CompletedExercises from "./Tables/CompletedExercises/CompletedExercises.component";
import DailyMealTrackerTable from "./Tables/DailyMealTrackerTable/DailyMealTrackerTable";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Viewuserprofile(props) {
  const [customer, setCustomer] = useState([]);
  const [customerDetails, setCustomerDetails] = useState([]);

  useEffect(() => {
    if (!props.location.data) {
      window.location = "/assigneduserlist";
    }

    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/api/profile/user/" +
          props.location.data
      )
      .then((res) => {
        console.log(res);
        setCustomer(res.data);
        setCustomerDetails(res.data.user);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  return (
    <div>
      <center>
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <div className="container" style={{ padding: "20px" }}>
                <img
                  src={customerDetails.profImage}
                  style={{
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                  }}
                />
              </div>
            </div>
            <div class="col-md-6">
              <div className="container" style={{ padding: "20px" }}>
                <h6>
                  {" "}
                  {customerDetails.firstName + " " + customerDetails.lastName}
                </h6>
                <hr />
                <p> {customerDetails.email}</p>
                <p> {customerDetails.gender}</p>
                <p> {customer.package} </p>
                <Link to={"/userforms/" + customer._id}>
                  <button className="btn btn-success">Assign Plan</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </center>

      <hr />

      <div className="row">
        <div className="col-md-12 col-xl-6 mb-4">
          <BMICardViewInstructor userID={props.location.data} />
        </div>
        <div className="col-md-12 col-xl-6 mb-4">
          <WeightLineChart userID={props.location.data} />
        </div>
        <div className="col-md-12 col-xl-6 mb-4">
          <ExercisesPieChart userID={props.location.data} />
        </div>
        <div className="col-md-12 col-xl-6 mb-4">
          <MealBarChart userID={props.location.data} />
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
          <CompletedExercises userID={props.location.data} />
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
          <DailyMealTrackerTable userID={props.location.data} />
        </div>
      </div>
    </div>
  );
}
