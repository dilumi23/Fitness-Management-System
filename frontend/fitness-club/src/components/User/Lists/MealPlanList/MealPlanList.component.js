import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FastfoodIcon from "@material-ui/icons/Fastfood";

import Background from "./img/1.jpg";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    color: "#dadce0",
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function MealPlanList() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [mealplan, setMealPlan] = useState([]);

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
        console.log("meal paln is " + data.mealplan);
        console.log(data.mealplan.length);

        if (data.mealplan.length > 0) {
          setMealPlan(data.mealplan);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      style={{
        borderRadius: "20px",
        // border: "2px solid blue",
        backgroundImage: `url(${Background})`,
        backgroundRepeat: "no-repeat" /* Do not repeat the image */,
        backgroundSize: "cover",
        boxShadow: "10px 7px 10px rgba(110, 107, 107, 0.548)",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      //   subheader={
      //     <ListSubheader component="div" id="nested-list-subheader">
      //       Nested List Items
      //     </ListSubheader>
      //   }
      className={classes.root}
    >
      <ListItem button onClick={handleClick}>
        <ListItemIcon>
          <FastfoodIcon style={{ color: "white" }} />
        </ListItemIcon>
        <ListItemText primary="Meal Plan" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <List component="div" disablePadding>
            {mealplan.map((currentMeal) => {
              return (
                <ListItem button className={classes.nested}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={currentMeal.meal} />
                </ListItem>
              );
            })}
          </List>
        </List>
      </Collapse>
    </List>
  );
}
