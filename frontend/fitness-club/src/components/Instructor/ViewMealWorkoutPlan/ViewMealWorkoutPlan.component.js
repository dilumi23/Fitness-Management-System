import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import AccessibilityIcon from "@material-ui/icons/Accessibility";

import Background from "./img/1.jpg";
import BackgroundUser from "./img/userList.png";
import BackgroundWorkout from "./img/gym.jpg";

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

export default function ViewMealWorkoutPlan() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div>
      <div className="row">
        <div className="col-md-4">
          <List
            style={{
              borderRadius: "20px",
              backgroundImage: `url(${BackgroundUser})`,
              backgroundRepeat: "no-repeat" /* Do not repeat the image */,
              backgroundSize: "cover",
              boxShadow: "10px 7px 10px rgba(110, 107, 107, 0.548)",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
          >
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <AccessibilityIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="User Requirement" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Dilumi" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Male" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Weigth 60 kg" />
                </ListItem>

                <ListItem button className={classes.nested}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Height 174 cm" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="lipsum as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled parts " />
                </ListItem>
                <br />
                <br />
              </List>
            </Collapse>
          </List>
        </div>

        <div className="col-md-4">
          <List
            style={{
              borderRadius: "20px",
              backgroundImage: `url(${BackgroundWorkout})`,
              backgroundRepeat: "no-repeat" /* Do not repeat the image */,
              backgroundSize: "cover",
              boxShadow: "10px 7px 10px rgba(110, 107, 107, 0.548)",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
            className={classes.root}
          >
            <ListItem button onClick={handleClick}>
              <ListItemIcon>
                <FitnessCenterIcon style={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Workout Plan" />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Chest – Barbell Bench Press – 4 sets of 8 reps" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Back – Lat-pulldowns – 4 sets of 10 reps" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Shoulders – Seated Dumbbell Press – 4 sets of 10 reps" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Legs – Leg Extensions – 4 sets of 10 reps" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Biceps – Barbell Bbicep Curls – 3 sets of 10 reps" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Triceps – Triceps Rope Pushdowns – 3 sets of 15 reps" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </div>

        <div className="col-md-4">
          <List
            style={{
              borderRadius: "20px",
              backgroundImage: `url(${Background})`,
              backgroundRepeat: "no-repeat" /* Do not repeat the image */,
              backgroundSize: "cover",
              boxShadow: "10px 7px 10px rgba(110, 107, 107, 0.548)",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
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
                <ListItem button className={classes.nested}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Chest – Barbell Bench Press – 4 sets of 8 reps" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Back – Lat-pulldowns – 4 sets of 10 reps" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Shoulders – Seated Dumbbell Press – 4 sets of 10 reps" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Legs – Leg Extensions – 4 sets of 10 reps" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Biceps – Barbell Bbicep Curls – 3 sets of 10 reps" />
                </ListItem>
                <ListItem button className={classes.nested}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary="Triceps – Triceps Rope Pushdowns – 3 sets of 15 reps" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </div>
      </div>
    </div>
  );
}
