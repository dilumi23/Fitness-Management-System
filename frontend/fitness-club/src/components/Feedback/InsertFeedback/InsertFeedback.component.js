import React, { useState } from "react";
import axios from "axios";

import "./InsertFeedback.css";

import Background from "./img/gymbanner.jpg";

export default function InsertFeedback() {
  const [radioFeedbackOne, setradioFeedbackOne] = useState(null);
  const [radioFeedbackTwo, setradioFeedbackTwo] = useState(null);
  const [radioFeedbackThree, setradioFeedbackThree] = useState(null);
  const [radioFeedbackFour, setradioFeedbackFour] = useState(null);

  function onChangeRadioButtonOne(e) {
    e.preventDefault();

    setradioFeedbackOne(e.target.value);
  }

  function onChangeRadioButtonTwo(e) {
    e.preventDefault();

    setradioFeedbackTwo(e.target.value);
  }

  function onChangeRadioButtonThree(e) {
    e.preventDefault();

    setradioFeedbackThree(e.target.value);
  }

  function onChangeRadioButtonFour(e) {
    e.preventDefault();

    setradioFeedbackFour(e.target.value);
  }

  function OnSubmit(e) {
    e.preventDefault();

    if (
      radioFeedbackOne == null ||
      radioFeedbackTwo == null ||
      radioFeedbackThree == null ||
      radioFeedbackFour == null
    ) {
      alert("You must fill all the fields");
      return false;
    }
    const newFeedBack = {
      radioFeedbackOne,
      radioFeedbackTwo,
      radioFeedbackThree,
      radioFeedbackFour,
    };

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/feedback", newFeedBack)
      .then(() => {
        alert("Feedback Sent");
        window.location = "/";
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-9 col-lg-12 col-xl-10">
          <div
            class="card  o-hidden border-0 my-5"
            style={{
              // border: "2px solid blue",
              borderRadius: "15px",
              boxShadow: "10px 7px 10px rgba(110, 107, 107, 0.548)",
            }}
          >
            <div class="card-body p-0">
              <div class="row">
                <div class="col-lg-6 d-none d-lg-flex">
                  <div
                    class="flex-grow-1 bg-login-image"
                    style={{
                      backgroundImage: `url(${Background})`,
                    }}
                  >
                    {" "}
                  </div>
                </div>
                <div class="col-lg-12">
                  <div class="p-5">
                    <div class="text-center">
                      <h5 class="text-dark mb-4">
                        Please Rate the following aspects of your experience at
                        the FitnessClub Gym
                      </h5>
                    </div>
                    <form class="user" onSubmit={OnSubmit}>
                      <div class="form-group">
                        <p>
                          <i className="fas fa-bullhorn"></i>&nbsp;Gym
                          appearance of facility
                        </p>
                        <label className="radioStyle">
                          Excellent
                          <input
                            name="radioOne"
                            type="radio"
                            value="Excellent"
                            className="radioButtonStyle"
                            onChange={onChangeRadioButtonOne}
                          />
                        </label>

                        <label className="radioStyle">
                          Good
                          <input
                            name="radioOne"
                            type="radio"
                            value="Good"
                            className="radioButtonStyle"
                            onChange={onChangeRadioButtonOne}
                          />
                        </label>
                        <label className="radioStyle">
                          Fair
                          <input
                            name="radioOne"
                            type="radio"
                            value="Fair"
                            className="radioButtonStyle"
                            onChange={onChangeRadioButtonOne}
                          />
                        </label>
                        <label className="radioStyle">
                          Poor
                          <input
                            name="radioOne"
                            type="radio"
                            value="Poor"
                            className="radioButtonStyle"
                            onChange={onChangeRadioButtonOne}
                          />
                        </label>
                      </div>

                      <div class="form-group">
                        <p>
                          {" "}
                          <i className="fas fa-bullhorn"></i>&nbsp;Quality of
                          the Activities
                        </p>
                        <label className="radioStyle">
                          Excellent
                          <input
                            name="radioTwo"
                            type="radio"
                            value="Excellent"
                            className="radioButtonStyle"
                            onChange={onChangeRadioButtonTwo}
                          />
                        </label>

                        <label className="radioStyle">
                          Good
                          <input
                            name="radioTwo"
                            type="radio"
                            value="Good"
                            className="radioButtonStyle"
                            onChange={onChangeRadioButtonTwo}
                          />
                        </label>
                        <label className="radioStyle">
                          Fair
                          <input
                            name="radioTwo"
                            type="radio"
                            value="Fair"
                            className="radioButtonStyle"
                            onChange={onChangeRadioButtonTwo}
                          />
                        </label>
                        <label className="radioStyle">
                          Poor
                          <input
                            name="radioTwo"
                            type="radio"
                            value="Poor"
                            className="radioButtonStyle"
                            onChange={onChangeRadioButtonTwo}
                          />
                        </label>
                      </div>

                      <div class="form-group">
                        <p>
                          {" "}
                          <i className="fas fa-bullhorn"></i>&nbsp;Quality and
                          effectiveness of staff
                        </p>
                        <label className="radioStyle">
                          Excellent
                          <input
                            name="radioThree"
                            type="radio"
                            value="Excellent"
                            className="radioButtonStyle"
                            onChange={onChangeRadioButtonThree}
                          />
                        </label>

                        <label className="radioStyle">
                          Good
                          <input
                            name="radioThree"
                            type="radio"
                            value="Good"
                            className="radioButtonStyle"
                            onChange={onChangeRadioButtonThree}
                          />
                        </label>
                        <label className="radioStyle">
                          Fair
                          <input
                            name="radioThree"
                            type="radio"
                            value="Fair"
                            className="radioButtonStyle"
                            onChange={onChangeRadioButtonThree}
                          />
                        </label>
                        <label className="radioStyle">
                          Poor
                          <input
                            name="radioThree"
                            type="radio"
                            value="Poor"
                            className="radioButtonStyle"
                            onChange={onChangeRadioButtonThree}
                          />
                        </label>
                      </div>

                      <div class="form-group">
                        <p>
                          {" "}
                          <i className="fas fa-bullhorn"></i>&nbsp;Your Overall
                          satisfaction
                        </p>
                        <label className="radioStyle">
                          Excellent
                          <input
                            name="radioFour"
                            type="radio"
                            value="Excellent"
                            className="radioButtonStyle"
                            onChange={onChangeRadioButtonFour}
                          />
                        </label>

                        <label className="radioStyle">
                          Good
                          <input
                            name="radioFour"
                            type="radio"
                            value="Good"
                            className="radioButtonStyle"
                            onChange={onChangeRadioButtonFour}
                          />
                        </label>
                        <label className="radioStyle">
                          Fair
                          <input
                            name="radioFour"
                            type="radio"
                            value="Fair"
                            className="radioButtonStyle"
                            onChange={onChangeRadioButtonFour}
                          />
                        </label>
                        <label className="radioStyle">
                          Poor
                          <input
                            name="radioFour"
                            type="radio"
                            value="Poor"
                            className="radioButtonStyle"
                            onChange={onChangeRadioButtonFour}
                          />
                        </label>
                      </div>

                      <div class="form-group">
                        <button class=" btn btn-outline-success " type="submit">
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
