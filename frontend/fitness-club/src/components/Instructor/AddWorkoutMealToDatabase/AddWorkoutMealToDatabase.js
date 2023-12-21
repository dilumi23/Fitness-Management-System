import React, { useState } from "react";
import axios from "axios";

export default function AddWorkoutMealToDatabase() {
  const [MealName, setMealName] = useState();
  const [WorkoutName, setExercise] = useState("Enter Exercise");

  function onSubmitExercise(e) {
    e.preventDefault();

    const newExercise = {
      WorkoutName: WorkoutName,
    };

    axios
      .post(
        process.env.REACT_APP_BACKEND_URL + "/api/instructor/workout",
        newExercise
      )
      .then((res) => {
        alert("Exercise Added");
        setExercise("Enter Exercise");
      })
      .catch((err) => {
        alert(err);
      });
  }

  function onSubmitMeal(e) {
    e.preventDefault();

    const newMeal = {
      MealName: MealName,
    };

    axios
      .post(process.env.REACT_APP_BACKEND_URL + "/api/instructor/meal", newMeal)
      .then((res) => {
        alert("Meal Added");
        setMealName("Enter Meal");
      })
      .catch((err) => {
        alert(err);
      });
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12" style={{ marginTop: "20px" }}>
          <h4>Add Exercise And Meal</h4>
        </div>

        <div className="col-md-12" style={{ marginTop: "20px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Exercise Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder={WorkoutName}
                  onChange={(e) => {
                    setExercise(e.target.value);
                  }}
                />
              </div>

              <button onClick={onSubmitExercise} class="btn btn-primary">
                Add Exercise
              </button>
            </form>
          </div>
        </div>

        <div className="col-md-12" style={{ marginTop: "20px" }}>
          <div className="card" style={{ padding: "20px" }}>
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Meal Name</label>
                <input
                  type="text"
                  class="form-control"
                  placeholder="Enter Meal"
                  onChange={(e) => {
                    setMealName(e.target.value);
                  }}
                />
              </div>

              <button onClick={onSubmitMeal} class="btn btn-primary">
                Add Meal
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
