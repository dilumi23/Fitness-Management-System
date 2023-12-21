import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pic1 from "../Images/no_pic.jpg";
import "../assets/css/styles.css";
import Moment from "moment";

export default class InstructorProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      instructorId: "",
      name: "",
      dob: Moment(new Date()).format("DD-MM-YYYY"),
      gender: "Male",
      address: "",
      phone: null,
      email: "",
      password: "",
      instructors: [],
    };
  }

  componentDidMount() {
    axios
      .get(
        process.env.REACT_APP_BACKEND_URL +
          "/api/instructors/" +
          this.props.match.params.id
      )
      .then((response) => {
        this.setState({
          instructorId: response.data.instructorID,
          name: response.data.name,
          dob: Moment(response.data.dob).format("DD-MM-YYYY"),
          gender: response.data.gender,
          address: response.data.address,
          phone: response.data.phone,
          email: response.data.email,
          password: response.data.password,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div class="container emp-profile">
          <form method="post">
            <div class="row">
              <div class="col-md-6">
                <div class="profile-head">
                  <h5>{this.state.name}</h5>
                  <h6>Gym Instructor</h6>
                  <p class="proile-rating">
                    <span>Fitness Club</span>
                  </p>
                  <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        id="home-tab"
                        data-toggle="tab"
                        href="#home"
                        role="tab"
                        aria-controls="home"
                        aria-selected="true"
                      >
                        About
                      </a>
                    </li>
                    <li class="nav-item">
                      <a
                        class="nav-link"
                        id="profile-tab"
                        data-toggle="tab"
                        href="#profile"
                        role="tab"
                        aria-controls="profile"
                        aria-selected="false"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-md-2">
                <Link
                  to={"/update/" + this.props.match.params.id}
                  className="btn btn-primary"
                >
                  Edit
                </Link>
              </div>
            </div>
            <div class="row">
              <div class="col-md-8">
                <div class="tab-content profile-tab" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div class="row">
                      <div class="col-md-6">
                        <label>Instructor Id</label>
                      </div>
                      <div class="col-md-6">
                        <p>{this.state.instructorId}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Name</label>
                      </div>
                      <div class="col-md-6">
                        <p>{this.state.name}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>DOB</label>
                      </div>
                      <div class="col-md-6">
                        <p>{this.state.dob}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Profession</label>
                      </div>
                      <div class="col-md-6">
                        <p>Gym Instructor</p>
                      </div>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div class="row">
                      <div class="col-md-6">
                        <label>Phone</label>
                      </div>
                      <div class="col-md-6">
                        <p>{this.state.phone}</p>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-md-6">
                        <label>Email</label>
                      </div>
                      <div class="col-md-6">
                        <p>{this.state.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
