import React, { Component } from "react";
import Background from "./image/pic2.jpg";
import axios from "axios";

export default class UserRegistration extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      mobileNo: "",
      gender: "Male",
      address: "",
      password: "",
      password2: "",
      status: "",
      token: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    //reset the state after 9 seconds
    this.interval = setInterval(() => this.setState({ status: "" }), 4000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleChange(event) {
    this.setState({ gender: event.target.value });
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    if (nam === "mobileNo") {
      // if (!Number(val)) {
      //   alert("Your mobile number must include only digits");
      // }
    }
    this.setState({ [nam]: val });
  };

  async onSubmit(e) {
    e.preventDefault();

    if (!Number(this.state.mobileNo)) {
      alert("Your mobile number must include only digits");
    }

    if (this.state.password !== this.state.password2) {
      this.setState({
        status: "Password Mismatch",
      });

      return false;
    } else {
      this.setState({
        status: "Password matched",
      });

      const user = {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        mobileNo: this.state.mobileNo,
        gender: this.state.gender,
        address: this.state.address,
        password: this.state.password,
        password2: this.state.password2,
      };

      console.log(user);

      await axios
        .post(process.env.REACT_APP_BACKEND_URL + "/api/users/", user)
        .then(async (res) => {
          console.log("token is " + res.data.token);

          console.log(res.data);

          this.setState({
            firstName: "",
            lastName: "",
            email: "",
            mobileNo: "",
            gender: "Male",
            address: "",
            password: "",
            password2: "",
          });

          window.location = "/userLogin";
        })
        .catch((error) => {
          console.log(error);
          alert(error);
        });
    }
  }

  render() {
    return (
      <div class="container">
        <div class="card shadow-lg o-hidden border-0 my-5">
          <div class="card-body p-0">
            <div class="row">
              <div class="col-lg-5 d-none d-lg-flex">
                <div
                  class="flex-grow-1 bg-login-image"
                  style={{
                    // border: "2px solid blue",
                    backgroundImage: `url(${Background})`,
                    backgroundRepeat: "no-repeat" /* Do not repeat the image*/,
                    backgroundSize: "cover",
                    boxShadow: "10px 7px 10px rgba(110, 107, 107, 0.548)",
                  }}
                ></div>{" "}
              </div>
              <div class="col-lg-7">
                <div class="p-5">
                  <div class="text-center">
                    <h4 class="text-dark mb-4">Create an Account!</h4>
                  </div>
                  <form class="user" onSubmit={this.onSubmit}>
                    <div class="form-group row">
                      <div class="col-sm-6 mb-3 mb-sm-0">
                        <input
                          onChange={this.onChange}
                          class="form-control form-control-user"
                          type="text"
                          id="firstName"
                          placeholder="First Name"
                          value={this.state.firstName}
                          name="firstName"
                          required
                        />
                      </div>
                      <div class="col-sm-6">
                        <input
                          onChange={this.onChange}
                          class="form-control form-control-user"
                          type="text"
                          id="lastName"
                          placeholder="Last Name"
                          value={this.state.lastName}
                          name="lastName"
                          required
                        />
                      </div>
                    </div>
                    <div class="form-group row">
                      <label>Gender</label>
                      <div class="col-sm-6">
                        <select
                          value={this.state.gender}
                          name="gender"
                          id="gender"
                          onChange={this.handleChange}
                        >
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                        </select>
                      </div>
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-6">
                        <input
                          class="form-control form-control-user"
                          type="text"
                          id="mobileNo"
                          placeholder="Mobile Number"
                          name="mobileNo"
                          required
                          value={this.state.mobileNo}
                          onChange={this.myChangeHandler}
                          //onChange = {this.onChange}
                        />
                      </div>
                    </div>
                    <div class="form-group">
                      <input
                        class="form-control form-control-user"
                        type="email"
                        id="email"
                        aria-describedby="emailHelp"
                        placeholder="Email Address"
                        name="email"
                        onChange={this.onChange}
                        value={this.state.email}
                        required
                      />
                    </div>
                    <div class="form-group">
                      <input
                        class="form-control form-control-user"
                        type="address"
                        id="address"
                        aria-describedby="addresslHelp"
                        placeholder="Address"
                        name="address"
                        onChange={this.onChange}
                        value={this.state.address}
                        required
                      />
                    </div>
                    <div class="form-group row">
                      <div class="col-sm-6 mb-3 mb-sm-0">
                        <input
                          class="form-control form-control-user"
                          type="password"
                          id="password"
                          placeholder="Password"
                          name="password"
                          onChange={this.onChange}
                          value={this.state.password}
                          required
                        />
                      </div>
                      <div class="col-sm-6">
                        <input
                          class="form-control form-control-user"
                          type="password"
                          id="password2"
                          placeholder="Repeat Password"
                          onChange={this.onChange}
                          value={this.state.password2}
                          name="password2"
                          required
                        />
                      </div>

                      <div class="col-sm-12">
                        <p style={{ color: "#c44233" }}>{this.state.status}</p>
                      </div>
                    </div>

                    {/* <div class="form-group row">
                      <div class="col-sm-6">
                        <input
                          type="file"
                          id="profImage"
                          name="profImage"/>.
                      </div>
                      </div> */}

                    <button
                      class="btn btn-primary btn-block text-white btn-user"
                      id="signup"
                      name="signup"
                      type="submit"
                    >
                      Sign Up
                    </button>
                  </form>
                  <div class="text-center">
                    <a class="small" href="userlogin">
                      Already have an account? Login!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
