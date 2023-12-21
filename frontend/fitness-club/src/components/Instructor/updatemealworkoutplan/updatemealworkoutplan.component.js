import React, { Component } from "react";
import { Paper, Card } from "@material-ui/core";

import Background from "./img/gym.jpg";
import BackgroundMeal from "./img/meal.jpg";

import "./updatemealworkoutplan.css";

export default class UpdateMealWorkoutPlan extends Component {
  render() {
    return (
      <div>
        <div>
          <div className="row text-center">
            <h3 style={{ color: "#073370" }}>Update Meal & Workout Plan </h3>
          </div>

          <Paper
            elevation={3}
            style={{
              margin: "20px 0px",

              borderRadius: "15px",
            }}
          >
            <Card
              style={{
                margin: "20px 0px",
                padding: "30px",
              }}
            >
              <div className="row">
                <div className="col-md-3">
                  <p>Dilumi </p>
                </div>

                <div className="col-md-3">
                  <p>Weight 60 kg</p>
                </div>
                <div className="col-md-3">
                  <p>Height 180 cm</p>
                </div>
                <div className="col-md-3">
                  <p>
                    Contrary to popular belief, Lorem Ipsum is not simply random
                    text. It has roots in a piece of classical Latin literature
                  </p>
                </div>
              </div>
            </Card>
          </Paper>

          <div class="row" style={{ margin: "10px" }}>
            <div class="col-md-6">
              <div class="card" style={{ borderRadius: "15px" }}>
                <div
                  class="card-body"
                  style={{
                    borderRadius: "15px",
                    boxShadow: "4px 5px 7px rgba(68,69,69,0.44)",
                    backgroundImage: `url(${Background})`,
                    backgroundRepeat: "no-repeat" /* Do not repeat the image */,
                    backgroundSize: "cover",
                    backgroundOpacity: 0.5,
                  }}
                >
                  <form>
                    {/* Workout 1  */}
                    <div class="form-row" style={{ margin: "10px 0px" }}>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="Workout 1" selected="">
                            Workout 1
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 2
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 3
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 4
                          </option>
                        </select>
                      </div>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="sets" selected="">
                            sets
                          </option>
                          <option value="5" selected="">
                            5
                          </option>
                          <option value="10" selected="">
                            10
                          </option>
                          <option value="15" selected="">
                            15
                          </option>
                          <option value="20" selected="">
                            20
                          </option>
                        </select>
                      </div>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="reps" selected="">
                            reps
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>

                    {/* Workout 1 End */}

                    {/* Workout 1  */}
                    <div class="form-row" style={{ margin: "10px 0px" }}>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="Workout 1" selected="">
                            Workout 1
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 2
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 3
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 4
                          </option>
                        </select>
                      </div>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="sets" selected="">
                            sets
                          </option>
                          <option value="5" selected="">
                            5
                          </option>
                          <option value="10" selected="">
                            10
                          </option>
                          <option value="15" selected="">
                            15
                          </option>
                          <option value="20" selected="">
                            20
                          </option>
                        </select>
                      </div>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="reps" selected="">
                            reps
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>

                    {/* Workout 1 End */}

                    {/* Workout 2  */}
                    <div class="form-row" style={{ margin: "10px 0px" }}>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="Workout 1" selected="">
                            Workout 1
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 2
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 3
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 4
                          </option>
                        </select>
                      </div>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="sets" selected="">
                            sets
                          </option>
                          <option value="5" selected="">
                            5
                          </option>
                          <option value="10" selected="">
                            10
                          </option>
                          <option value="15" selected="">
                            15
                          </option>
                          <option value="20" selected="">
                            20
                          </option>
                        </select>
                      </div>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="reps" selected="">
                            reps
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>

                    {/* Workout 2 End */}

                    {/* Workout 3  */}
                    <div class="form-row" style={{ margin: "10px 0px" }}>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="Workout 1" selected="">
                            Workout 1
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 2
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 3
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 4
                          </option>
                        </select>
                      </div>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="sets" selected="">
                            sets
                          </option>
                          <option value="5" selected="">
                            5
                          </option>
                          <option value="10" selected="">
                            10
                          </option>
                          <option value="15" selected="">
                            15
                          </option>
                          <option value="20" selected="">
                            20
                          </option>
                        </select>
                      </div>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="reps" selected="">
                            reps
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>

                    {/* Workout 3 End */}

                    {/* Workout 4  */}
                    <div class="form-row" style={{ margin: "10px 0px" }}>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="Workout 1" selected="">
                            Workout 1
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 2
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 3
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 4
                          </option>
                        </select>
                      </div>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="sets" selected="">
                            sets
                          </option>
                          <option value="5" selected="">
                            5
                          </option>
                          <option value="10" selected="">
                            10
                          </option>
                          <option value="15" selected="">
                            15
                          </option>
                          <option value="20" selected="">
                            20
                          </option>
                        </select>
                      </div>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="reps" selected="">
                            reps
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>

                    {/* Workout 4 End */}

                    {/* Workout 5  */}
                    <div class="form-row" style={{ margin: "10px 0px" }}>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="Workout 1" selected="">
                            Workout 1
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 2
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 3
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 4
                          </option>
                        </select>
                      </div>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="sets" selected="">
                            sets
                          </option>
                          <option value="5" selected="">
                            5
                          </option>
                          <option value="10" selected="">
                            10
                          </option>
                          <option value="15" selected="">
                            15
                          </option>
                          <option value="20" selected="">
                            20
                          </option>
                        </select>
                      </div>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="reps" selected="">
                            reps
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>

                    {/* Workout 5 End */}

                    {/* Workout 6  */}
                    <div class="form-row" style={{ margin: "10px 0px" }}>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="Workout 1" selected="">
                            Workout 1
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 2
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 3
                          </option>
                          <option value="Workout 1" selected="">
                            Exercise 4
                          </option>
                        </select>
                      </div>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="sets" selected="">
                            sets
                          </option>
                          <option value="5" selected="">
                            5
                          </option>
                          <option value="10" selected="">
                            10
                          </option>
                          <option value="15" selected="">
                            15
                          </option>
                          <option value="20" selected="">
                            20
                          </option>
                        </select>
                      </div>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="reps" selected="">
                            reps
                          </option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select>
                      </div>
                    </div>

                    {/* Workout 6 End */}

                    <div class="form-row" style={{ margin: "10px 0px" }}>
                      <div class="col text-center">
                        <button class="btn btn-primary" type="button">
                          Add Workout Plan
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card" style={{ borderRadius: "15px" }}>
                <div
                  class="card-body"
                  style={{
                    borderRadius: "15px",
                    boxShadow: "4px 5px 7px rgba(68,69,69,0.44)",
                    backgroundImage: `url(${BackgroundMeal})`,
                    backgroundRepeat: "no-repeat" /* Do not repeat the image */,
                    backgroundSize: "cover",
                    backgroundOpacity: 0.5,
                  }}
                >
                  <form>
                    {/* Meal 1 */}
                    <div class="form-row" style={{ margin: "10px 0px" }}>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="Workout 1" selected="">
                            Meal 1
                          </option>
                          <option value="Workout 1" selected="">
                            Meal 2
                          </option>
                          <option value="Workout 1" selected="">
                            Meal 3
                          </option>
                        </select>
                      </div>
                    </div>
                    {/* End of Meal 1 */}

                    {/* Meal 1 */}
                    <div class="form-row" style={{ margin: "10px 0px" }}>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="Workout 1" selected="">
                            Meal 1
                          </option>
                          <option value="Workout 1" selected="">
                            Meal 2
                          </option>
                          <option value="Workout 1" selected="">
                            Meal 3
                          </option>
                        </select>
                      </div>
                    </div>
                    {/* End of Meal 1 */}

                    {/* Meal 1 */}
                    <div class="form-row" style={{ margin: "10px 0px" }}>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="Workout 1" selected="">
                            Meal 1
                          </option>
                          <option value="Workout 1" selected="">
                            Meal 2
                          </option>
                          <option value="Workout 1" selected="">
                            Meal 3
                          </option>
                        </select>
                      </div>
                    </div>
                    {/* End of Meal 1 */}

                    {/* Meal 1 */}
                    <div class="form-row" style={{ margin: "10px 0px" }}>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="Workout 1" selected="">
                            Meal 1
                          </option>
                          <option value="Workout 1" selected="">
                            Meal 2
                          </option>
                          <option value="Workout 1" selected="">
                            Meal 3
                          </option>
                        </select>
                      </div>
                    </div>
                    {/* End of Meal 1 */}

                    {/* Meal 1 */}
                    <div class="form-row" style={{ margin: "10px 0px" }}>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="Workout 1" selected="">
                            Meal 1
                          </option>
                          <option value="Workout 1" selected="">
                            Meal 2
                          </option>
                          <option value="Workout 1" selected="">
                            Meal 3
                          </option>
                        </select>
                      </div>
                    </div>
                    {/* End of Meal 1 */}

                    {/* Meal 1 */}
                    <div class="form-row" style={{ margin: "10px 0px" }}>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="Workout 1" selected="">
                            Meal 1
                          </option>
                          <option value="Workout 1" selected="">
                            Meal 2
                          </option>
                          <option value="Workout 1" selected="">
                            Meal 3
                          </option>
                        </select>
                      </div>
                    </div>
                    {/* End of Meal 1 */}

                    {/* Meal 1 */}
                    <div class="form-row" style={{ margin: "10px 0px" }}>
                      <div class="col">
                        <select
                          class="form-control"
                          style={{
                            borderRadius: "10px",
                            backgroundColor: "rgba(243,243,243,0)",
                            color: "rgb(255,255,255)",
                            borderWidth: "1.5px",
                            borderColor: "rgb(252,252,252)",
                          }}
                        >
                          <option value="Workout 1" selected="">
                            Meal 1
                          </option>
                          <option value="Workout 1" selected="">
                            Meal 2
                          </option>
                          <option value="Workout 1" selected="">
                            Meal 3
                          </option>
                        </select>
                      </div>
                    </div>
                    {/* End of Meal 1 */}
                    <div class="form-row" style={{ margin: "10px 0px" }}>
                      <div class="col text-center">
                        <button class="btn btn-primary" type="button">
                          Add Meal Plan
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
