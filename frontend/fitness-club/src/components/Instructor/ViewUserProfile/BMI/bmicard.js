import React, { useState, useEffect } from "react";
import axios from "axios";

import { Paper } from "@material-ui/core";

import "./bmicard.css";

export default function BMICardViewInstructor(props) {
  const [BMIDetails, setBMIdetails] = useState([]);
  const [BMIValue, setBMIValue] = useState(0);
  const [BMIWeight, setWeight] = useState(0);
  const [BMIHeight, setHeight] = useState(0);
  const [BMIColorClass, setBMIColorClass] = useState(
    "fas fa-stethoscope blinkingEmpty"
  );
  const [BMIParagraphColorClass, setBMIParagraphColorClass] = useState(
    "blinkingEmpty"
  );

  //fetching completed Exercise List data from the backend
  useEffect(() => {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL + "/api/profile/user/" + props.userID
      )
      .then(({ data }) => {
        console.log("Current Weight is " + data.currentWeight);
        setWeight(data.currentWeight);
        console.log("Current Height is " + data.currentHeight);
        setHeight(data.currentHeight);

        const bmi =
          data.currentWeight /
          ((data.currentHeight / 100) * (data.currentHeight / 100));
        setBMIValue(bmi.toFixed(2));

        if (bmi >= 30) {
          setBMIdetails("Obesity");
          setBMIColorClass("fas fa-stethoscope blinkingUnderOverWeight");
          setBMIParagraphColorClass("blinkingUnderOverWeight");
        } else if (bmi >= 25 && bmi < 29.9) {
          setBMIdetails("Overweight");
          setBMIColorClass("fas fa-stethoscope blinkingUnderOverWeight");
          setBMIParagraphColorClass("blinkingUnderOverWeight");
        } else if (bmi >= 18.5 && bmi < 24.9) {
          setBMIdetails("Healthy Range");
          setBMIColorClass("fas fa-stethoscope blinkingHealthy");
          setBMIParagraphColorClass("blinkingHealthy");
        } else if (bmi < 18.5) {
          setBMIdetails("Underweight ");
          setBMIColorClass("fas fa-stethoscope blinkingUnderOverWeight");
          setBMIParagraphColorClass("blinkingUnderOverWeight");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function updateWeightHeight(e) {
    e.preventDefault();

    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    const newHeightWeight = {
      currentWeight: BMIWeight,
      currentHeight: BMIHeight,
    };

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/api/profile/updateweightheight",
        newHeightWeight,
        config
      )
      .then(() => {
        alert("Update Success");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div>
      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                UPDATE | WEIGHT AND HEIGTH
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form>
                <div class="form-group">
                  <label for="weight">Weigth</label>
                  <input
                    type="text"
                    class="form-control"
                    id="weight"
                    placeholder="Enter New Weight"
                    onChange={(e) => {
                      setWeight(e.target.value);
                    }}
                  />
                </div>

                <div class="form-group">
                  <label for="weight">Height</label>
                  <input
                    type="text"
                    class="form-control"
                    id="weight"
                    placeholder="Enter New Height"
                    onChange={(e) => {
                      setHeight(e.target.value);
                    }}
                  />
                </div>

                <button
                  type="submit"
                  onClick={updateWeightHeight}
                  class="btn btn-primary"
                  data-dismiss="modal"
                >
                  EDIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

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
            padding: "65px",
            textAlign: "center",
            margin: "auto",
            justifyContent: "center",
            borderRadius: "20px",
            //fontWeight: "bold",
            fontFamily: "Kanit, sans-serif",
            fontSize: "18px",
            boxShadow: "7px 10px 23px 0px rgba(110,109,109,1)",
          }}
        >
          {/* <!-- Button trigger modal --> */}
          {/* <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
          > */}{" "}
          <i
            className="fas fa-cog fa-sm fa-fw mr-2"
            style={{ color: "grey" }}
            data-toggle="modal"
            data-target="#exampleModal"
          ></i>
          {/* </button> */}
          <p style={{ color: "#0c76f7" }}>
            <span>
              <i class="fas fa-weight" style={{ color: "#0c76f7" }}></i>&nbsp;
              &nbsp;
            </span>
            Current Weight {BMIWeight} Kg
          </p>
          <p style={{ color: "#29bcc2" }}>
            <span>
              <i class="fas fa-male" style={{ color: "#29bcc2" }}></i>&nbsp;
              &nbsp;
            </span>
            Current Height {BMIHeight} cm
          </p>
          <p style={{ color: "#e3c205" }}>
            {" "}
            <span>
              <i class="fas fa-laptop-medical" style={{ color: "#e3c205" }}></i>
              &nbsp; &nbsp;
            </span>
            Your BMI {BMIValue}
          </p>
          <p className={BMIParagraphColorClass}>
            {" "}
            <span>
              <i className={BMIColorClass} style={{ fontSize: "20px" }}></i>
              &nbsp; &nbsp;
            </span>
            {BMIDetails}
          </p>
        </Paper>
      </div>
    </div>
  );
}
