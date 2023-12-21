import React, { Component } from "react";
import { Typography } from "@material-ui/core";

import "./DailyMealPlanByUser.css";

import DailyMealTrackerTable from "../../Tables/DailyMealTrackerTable/DailyMealTrackerTable";
import InsertDailyMealPlanByUser from "../../Forms/InsertDailyMealPlanByUser/InsertDailyMealPlanByUser";

export default class DailyMealPlanByUser extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-md-12" style={{ textAlign: "center" }}>
          <Typography
            style={{ color: "#a1190a", fontSize: "20px", fontWeight: "bold" }}
            component="div"
            variant="body1"
          >
            Daily Meal Plan Tracker
            <hr />
          </Typography>
        </div>
        <div className="col-md-4">
          <InsertDailyMealPlanByUser />
        </div>

        <div className="col-md-8">
          <DailyMealTrackerTable />
        </div>
      </div>
    );
  }
}
