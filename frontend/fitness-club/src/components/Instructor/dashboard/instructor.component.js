import React, { useState, useEffect } from "react";
import axios from "axios";
//import PropTypes from "prop-types";
//import { BrowserRouter as Router, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Background1 from "../Images/1.jpg";
import Background2 from "../Images/2.jpg";
import Background3 from "../Images/Reports.jpg";
import Background4 from "../Images/4.jpg";
import Background5 from "../Images/5.jpg";
import Background6 from "../Images/6.jpg";
import Background7 from "../Images/7.jpg";
import Background8 from "../Images/8.jpg";
import Background9 from "../Images/9.jpg";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
    flexGrow: 1,
  },
  media: {
    height: 140,
  },
});

export default function Instructor() {
  const classes = useStyles();
  return (
    <div style={{ marginBottom: "100px" }}>
      <div className="container">
        <div className="row">
          {/*   Notices */}
          <div
            className="col-sm-6 col-md-4 col-lg-4"
            style={{ marginTop: "30px" }}
          >
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={Background7}
                  title="Gym Instructor"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    User Profiles
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Assigned User Profiles
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link to="/assigneduserlist" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    href="#contained-buttons"
                    style={{ color: "white" }}
                  >
                    View
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </div>

          {/*   Notices */}
          <div
            className="col-sm-6 col-md-4 col-lg-4"
            style={{ marginTop: "30px" }}
          >
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={Background8}
                  title="Gym Instructor"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Workout and Meal Plans
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Manage Workout and Meal Plans
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link to="/userrequirement" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    href="#contained-buttons"
                    style={{ color: "white" }}
                  >
                    List | Remove | Update
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </div>

          {/*    Add Workout and Meal  */}
          <div
            className="col-sm-6 col-md-4 col-lg-4"
            style={{ marginTop: "30px" }}
          >
            <Card className={classes.root}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={Background8}
                  title="Gym Instructor"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Workout and Meal Plans
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Add Workout and Meal
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Link to="/addworkoutmeal" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    href="#contained-buttons"
                    style={{ color: "white" }}
                  >
                    Add
                  </Button>
                </Link>
                <Link to="/addworkoutmeal" style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    href="#contained-buttons"
                    style={{ color: "white" }}
                  >
                    List | Remove | Update
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
