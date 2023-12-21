import React, { Component } from "react";
import axios from "axios";
import {
  FormControl,
  TextField,
  Button,
  CardContent,
  Card,
} from "@material-ui/core";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import DateFnsUtils from "@date-io/date-fns";

import "./InsertDailyMealPlanByUser.css";

export default class InsertDailyMealPlanByUser extends Component {
  constructor(props) {
    super(props);

    this.onChangeFoodName = this.onChangeFoodName.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      date: new Date(),

      ENERC_KCAL: "",
      PROCNT: "",
      FAT: "",
      CHOCDF: "",
      FIBTG: "",
      FoodName: "",
      response: "",
    };
  }

  componentDidMount() {
    //reset the state after 9 seconds
    this.interval = setInterval(() => this.setState({ response: "" }), 4000);

    /*Redirect to login page if there is no token*/
    const token = localStorage.getItem("x-auth-token");

    if (!token) {
      window.location = "/userlogin";
    }
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

  onChangeFoodName(e) {
    this.setState({
      FoodName: e.target.value,
    });
  }

  async onSubmit(e) {
    e.preventDefault();

    this.setState({
      response: "Loading...",
    });

    if (this.state.FoodName == "") {
      alert("Food is required");
      return false;
    }

    if (Number(this.state.FoodName)) {
      alert("Food Name should be a String");
      return false;
    }

    await axios
      .get(
        `https://api.edamam.com/api/food-database/v2/parser?nutrition-type=logging&ingr=${this.state.FoodName}&app_id=a2edaaed&app_key=57145938b514b65e64ce9ca1ce8d7da8`
        
      )
      .then((response) => {
        this.setState({
          ENERC_KCAL: response.data.parsed[0].food.nutrients.ENERC_KCAL,
          PROCNT: response.data.parsed[0].food.nutrients.PROCNT,
          FAT: response.data.parsed[0].food.nutrients.FAT,
          CHOCDF: response.data.parsed[0].food.nutrients.CHOCDF,
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

    const newMeal = {
      mealName: this.state.FoodName,
      calories: this.state.ENERC_KCAL,
      proteins: this.state.PROCNT,
      fat: this.state.FAT,
      date: this.state.date,
    };

    await axios
      .put(
        process.env.REACT_APP_BACKEND_URL + "/api/profile/addmeallist",
        newMeal,
        config
      )
      .then((response) => {
        console.log(response);
        this.setState({
          response: "Meal Added",
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          response: "Unsuccessful",
        });
      });

    window.location = "/adddailymeal";
  }

  render() {
    return (
      <>
        <Card
          className="card-border1"
          style={{
            background: "linear-gradient(45deg, #ededed 30%, #fcfcfc 90%)",
            borderRadius: "20px",
            boxShadow: "10px 5px 10px rgba(110, 107, 107, 0.548)",
          }}
        >
          <CardContent>
            <div class="col-sm-12">
              <p style={{ color: "#c44233", fontWeight: "bold" }}>
                {this.state.response}
              </p>
            </div>
            <FormControl className="form1">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  margin="normal"
                  id="date-picker-dialog"
                  label="Add Date"
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
                label="Add Meal"
                variant="outlined"
                value={this.state.FoodName}
                onChange={this.onChangeFoodName}
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
      </>
    );
  }
}
