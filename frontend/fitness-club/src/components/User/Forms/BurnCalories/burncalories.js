import React, { Component } from "react";
import axios from "axios";
import {
  FormControl,
  TextField,
  Select,
  MenuItem,
  Button,
  CardContent,
  Card,
  Typography,
} from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

import "./burncalories.css";

import CompletedExercises from "../../Tables/CompletedExercises/CompletedExercises.component";

export default class BurnCalories extends Component {
  constructor(props) {
    super(props);

    this.onChangeWeight = this.onChangeWeight.bind(this);
    this.onChangeHeight = this.onChangeHeight.bind(this);
    this.onChangeGender = this.onChangeGender.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangeTime = this.onChangeTime.bind(this);
    this.onChangeExercise = this.onChangeExercise.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      date: new Date(),
      query: "Exercise",
      gender: "male",
      weight_kg: "",
      height_cm: "",
      age: "",
      nf_calories: 0,
      duration_min: 0,
      time: "",
      response: "",
      exerciseList: [],
    };
  }

  componentDidMount() {
    //reset the state after 9 seconds
    this.interval = setInterval(() => this.setState({ response: "" }), 10000);

    /*Redirect to login page if there is no token*/
    const token = localStorage.getItem("x-auth-token");

    if (!token) {
      window.location = "/userlogin";
    }

    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/profile/me", config)
      .then(({ data }) => {
        console.log("workout paln is " + data.workoutplan);
        console.log(data.workoutplan.length);

        if (data.workoutplan.length > 0) {
          this.setState({ exerciseList: data.workoutplan });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  //Clear interval
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  onChangeWeight(e) {
    this.setState({
      weight_kg: e.target.value,
    });
  }

  onChangeHeight(e) {
    this.setState({
      height_cm: e.target.value,
    });
  }

  onChangeGender(e) {
    this.setState({
      gender: e.target.value,
    });
  }

  onChangeAge(e) {
    this.setState({
      age: e.target.value,
    });
  }

  onChangeExercise(e) {
    this.setState({
      query: e.target.value,
    });
  }

  onChangeTime(e) {
    this.setState({
      time: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    this.setState({
      response: "Loading...",
    });

   
    if (this.state.date == "") {
      alert("Date is required");
      return false;
    }
    if (this.state.weight_kg == "") {
      alert("Weight is required");
      return false;
    }
    if (this.state.height_cm == "") {
      alert("Height is required");
      return false;
    }
    if (this.state.gender == "") {
      alert("Gender is required");
      return false;
    }
    if (this.state.age == "") {
      alert("Age is required");
      return false;
    }
    if (this.state.query == "" || this.state.query == "Exercise") {
      alert("Exercise is required");
      return false;
    }

    
    if (this.state.time == "") {
      alert("Time is required");
      return false;
    }
    if (!Number(this.state.weight_kg)) {
      alert("Weight must be a number");
      return false;
    }
    if (!Number(this.state.height_cm)) {
      alert("Height must be a number");
      return false;
    }
    if (!Number(this.state.age)) {
      alert("Age must be a number");
      return false;
    }
    if (!Number(this.state.time)) {
      alert("Duration must be a number");
      return false;
    }

    const exercise = {
      query: this.state.query + " " + this.state.time + "minutes",
      gender: this.state.gender,
      weight_kg: this.state.weight_kg,
      height_cm: this.state.height_cm,
      age: this.state.age,
    };

    console.log(exercise);

    const configuration = {
      headers: {
        "x-app-id": "7b8a6e15",
        "x-app-key": "e42616d1a55572b80b1669ac2f7254e0",
        "content-type": "application/json",
      },
    };

    await axios
      .post(
        "https://trackapi.nutritionix.com/v2/natural/exercise",
        exercise,
        configuration
      )
      .then(({ data }) => {
        console.log(data);
        this.setState({
          nf_calories: data.exercises[0].nf_calories,
          duration_min: data.exercises[0].duration_min,
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    //Pass Data into the backend

    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
        "Content-Type": "application/json",
      },
    };

    const newCompletedExercise = {
      weight: this.state.weight_kg,
      height: this.state.height_cm,
      exercise: this.state.query,
      time: this.state.time,
      calories: this.state.nf_calories,
      // calories: this.state.nf_calories.toFixed(2),
      date: this.state.date,
    };

    await axios
      .put(
        process.env.REACT_APP_BACKEND_URL +
          "/api/profile/addcompletedexerciselist",
        newCompletedExercise,
        config
      )
      .then((response) => {
        console.log(response);
        this.setState({
          response: "Workout Added",
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          response: "Unsuccessful",
        });
      });

    //Update Current Weight and Height into the backend
    const newWeightHeight = {
      weight: this.state.weight_kg,
      height: this.state.height_cm,
    };

    await axios
      .post(
        process.env.REACT_APP_BACKEND_URL +
          "/api/profile/addcurrentweightheight",
        newWeightHeight,
        config
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    //Refresh Page
    window.location = "/addcompletedexerciselist";
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12" style={{ textAlign: "center" }}>
          <Typography
            style={{ color: "#d18b08", fontSize: "20px", fontWeight: "bold" }}
            component="div"
            variant="body1"
          >
            Workout Tracker
            <hr />
          </Typography>
        </div>
        <div className="col-md-4">
          <Card
            className="card-border1"
            style={{
              // border: "1px solid #ccc",
              background: "linear-gradient(45deg, #ededed 30%, #fcfcfc 90%)",
              borderRadius: "20px",
              boxShadow: "10px 5px 10px rgba(110, 107, 107, 0.548)",
            }}
          >
            <CardContent>
              <div class="col-sm-12">
                <p style={{ color: "#E9A200", fontWeight: "bold" }}>
                  {this.state.response}
                </p>
              </div>
              <FormControl className="form1">
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Date picker dialog"
                    format="MM/dd/yyyy"
                    value={this.state.date}
                    onChange={this.onChangeDate}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
                <TextField
                  id="filled-basic"
                  className="formInputs"
                  label="Add Your Weight(kg)"
                  variant="outlined"
                  value={this.state.weight_kg}
                  onChange={this.onChangeWeight}
                />

                <TextField
                  id="filled-basic"
                  className="formInputs"
                  label="Add Your Height(cm)"
                  variant="outlined"
                  value={this.state.height_cm}
                  onChange={this.onChangeHeight}
                />
                <Select
                  labelId="demo-simple-select-filled-label"
                  className="formInputs"
                  id="demo-simple-select-filled"
                  value={this.state.gender}
                  onChange={this.onChangeGender}
                >
                  <MenuItem value={"male"}>Male</MenuItem>
                  <MenuItem value={"female"}>Female</MenuItem>
                </Select>
                <TextField
                  id="filled-basic"
                  className="formInputs"
                  label="Add Your Age"
                  variant="outlined"
                  value={this.state.age}
                  onChange={this.onChangeAge}
                />

                <Select
                  labelId="demo-simple-select-filled-label"
                  className="formInputs"
                  id="demo-simple-select-filled"
                  value={this.state.query}
                  onChange={this.onChangeExercise}
                >
                  <MenuItem value="Exercise">Exercise</MenuItem>
                  {this.state.exerciseList.map((currentexercise) => {
                    return (
                      <MenuItem value={currentexercise.exercise}>
                        {currentexercise.exercise}
                      </MenuItem>
                    );
                  })}
                </Select>

                <TextField
                  id="filled-basic"
                  className="formInputs"
                  label="Time (Minutes)"
                  variant="outlined"
                  value={this.state.time}
                  onChange={this.onChangeTime}
                />

                <Button
                  className="formInputs"
                  onClick={this.onSubmit}
                  variant="outlined"
                  color="primary"
                >
                  Estimate
                </Button>
              </FormControl>
            </CardContent>
          </Card>

          {}
        </div>

        <div className="col-md-8">
          <CompletedExercises />
        </div>
      </div>
    );
  }
}
