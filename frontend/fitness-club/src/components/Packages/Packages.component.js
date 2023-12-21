import React, { Component } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";
import axios from "axios";
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class Packages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      packs: [],
    };
  }

  componentDidMount() {
    const config = {
      headers: {
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    };

    axios
      .get(process.env.REACT_APP_BACKEND_URL + "/api/packages", config)
      .then((response) => {
        this.setState({
          packs: response.data,
        });
     
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      <div className="row">
        {this.state.packs.map((pack, index) => (
          <div className="col-md-6 col-xl-4 mb-4">
            <List
              component="div"
              style={{
                borderRadius: "20px",
               
                backgroundImage: `url(${pack.ImgPath})`,
                backgroundRepeat: "no-repeat" /* Do not repeat the image */,
                backgroundSize: "cover",
                boxShadow: "10px 7px 10px rgba(110, 107, 107, 0.548)",
                width: "100%",
                maxWidth: 360,
                color: "#dadce0",
                paddingTop: "0px",
                paddingBottom: "0px",
              }}
              component="nav"
              aria-labelledby="nested-list-subheader"
            >
              <div
                style={{
                  background: "rgba(0, 0, 0, 0.6)",
                  color: "#fff",
                  borderRadius: "20px",
                }}
              >
                <div
                  style={{
                    background: "rgba(0, 0, 0, 0.6)",
                    color: "#fff",
                    borderRadius: "15px",
                  }}
                >
                  <ListItem>
                    <ListItemIcon>
                      <FitnessCenterIcon style={{ color: "white" }} />
                    </ListItemIcon>
                    <h4>{pack.PackageName}</h4>
                  </ListItem>
                </div>
                <ListItem button style={{ paddingLeft: "30px" }}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={pack.PackageDescriprion} />
                </ListItem>
                <ListItem button style={{ paddingLeft: "30px" }}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={pack.PackagePeriod + " months"} />
                </ListItem>
                <ListItem button style={{ paddingLeft: "30px" }}>
                  <ListItemIcon></ListItemIcon>
                  <ListItemText primary={pack.PackagePrice + "LKR"} />
                </ListItem>
                <div style={{ textAlign: "center", paddingBottom: "10px" }}>
                  <Link to={{ pathname: "/payment", data: pack._id }}>
                    <button type="button" class="btn btn-success">
                      Join Now
                    </button>
                  </Link>
                </div>
              </div>
            </List>
          </div>
        ))}
      </div>
    );
  }
}
